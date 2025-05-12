import NextAuth from "next-auth";
import { authOptions } from '@/lib/auth';

// Exporter le handler NextAuth avec les options de configuration
const handler = NextAuth(authOptions);

// Exporter les méthodes GET et POST pour la route d'API
export { handler as GET, handler as POST };