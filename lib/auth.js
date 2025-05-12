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
          
          // Vérifier si la collection existe
          const collections = await db.listCollections({ name: 'users' }).toArray();
          if (collections.length === 0) {
            console.log("Collection users non trouvée");
            return null;
          }
          
          // Récupérer l'utilisateur par email
          const user = await db.collection('users').findOne({ 
            email: credentials.email 
          });
          
          if (!user) {
            console.log(`Utilisateur avec l'email ${credentials.email} non trouvé`);
            return null;
          }
          
          console.log("Utilisateur trouvé:", user.email);
          console.log("Comparaison mot de passe en cours...");
          
          // Vérifier le mot de passe avec bcrypt.compare
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          
          console.log("Résultat de la comparaison:", isPasswordValid);
          
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
  
  // Pages personnalisées
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  
  // Clé secrète pour les JWT
  secret: process.env.NEXTAUTH_SECRET || "un-secret-temporaire-pour-dev",
  
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
    }
  },
  
  debug: process.env.NODE_ENV === 'development',
};