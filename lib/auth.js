import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb-client";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Email ou mot de passe manquant");
            return null;
          }

          // Connexion à MongoDB
          const client = await clientPromise;
          const db = client.db();
          
          // Récupérer l'utilisateur par email
          const user = await db.collection('users').findOne({ 
            email: credentials.email 
          });
          
          if (!user) {
            console.log(`Utilisateur avec l'email ${credentials.email} non trouvé`);
            return null;
          }
          
          // Vérifier le mot de passe avec bcrypt.compare
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordValid) {
            console.log("Mot de passe invalide");
            return null;
          }
          
          // Authentification réussie
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      }
    })
  ],
  
  // Configuration de la session
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },
  
  // Pages personnalisées - IMPORTANT: ne pas inclure le domaine en production
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  
  // Configuration pour la production
  secret: process.env.NEXTAUTH_SECRET,
  
  // URLs pour la production
  url: process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000',
  
  // Callbacks pour personnaliser les tokens et sessions
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.role = token.role;
      }
      return session;
    },
    
    // Important: Callback de redirection pour éviter les boucles
    async redirect({ url, baseUrl }) {
      // Si l'URL commence par "/", c'est une URL relative
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Si l'URL est sur le même domaine, l'autoriser
      if (new URL(url).origin === baseUrl) return url;
      // Sinon, rediriger vers le dashboard par défaut
      return `${baseUrl}/admin/dashboard`;
    }
  },
  
  debug: process.env.NODE_ENV === 'development',
};