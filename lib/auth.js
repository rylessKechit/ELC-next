import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          
          console.log('Tentative de connexion pour:', credentials.email);
          
          // Trouver l'utilisateur par email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            console.log('Utilisateur non trouvé');
            return null;
          }
          
          // Vérifier si l'utilisateur existe et le mot de passe est correct
          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            console.log('Mot de passe incorrect');
            return null;
          }
          
          // Mise à jour de la dernière connexion
          user.lastLogin = new Date();
          await user.save();
          
          console.log('Authentification réussie pour:', user.email);
          
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
  
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};