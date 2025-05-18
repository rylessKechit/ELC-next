// lib/auth.js - Configuration NextAuth corrigée
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "votre@email.com" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await dbConnect();
          
          // Trouver l'utilisateur par email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }

          // Vérifier le statut de l'utilisateur
          if (user.status !== 'active') {
            return null;
          }
          
          // Vérifier le mot de passe
          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            return null;
          }
          
          // Mise à jour de la dernière connexion
          user.lastLogin = new Date();
          await user.save();
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
    updateAge: 60 * 60, // Mise à jour chaque heure
  },
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Lors de la connexion initiale
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      
      // Mise à jour du token si nécessaire
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Transférer les informations du token vers la session
      if (token) {
        session.user.id = token.userId;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Si l'URL est relative, la préfixer avec baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Si l'URL est sur le même domaine, l'autoriser
      if (new URL(url).origin === baseUrl) return url;
      
      // Sinon, rediriger vers le dashboard
      return `${baseUrl}/admin/dashboard`;
    }
  },
  
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  
  // Configuration critique pour la production
  secret: process.env.NEXTAUTH_SECRET,
  
  // Debug uniquement en développement
  debug: process.env.NODE_ENV === 'development'
};