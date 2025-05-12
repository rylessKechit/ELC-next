import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Ajouter des logs pour le débogage
  console.log("Middleware exécuté pour le chemin:", pathname);
  
  // Vérifier si la page est une page d'administration
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    try {
      console.log("Vérification du token pour l'accès à l'administration");
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET || "un-secret-temporaire-pour-dev"
      });
      
      console.log("Token obtenu:", token ? "Oui" : "Non");
      
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      if (!token) {
        console.log("Utilisateur non autorisé, redirection vers /admin/login");
        const url = new URL('/admin/login', request.url);
        // Ajouter l'URL de redirection pour revenir à la page d'origine après la connexion
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        return NextResponse.redirect(url);
      }
      
      // Si l'utilisateur est un chauffeur et essaie d'accéder à une page réservée aux admins
      if (token.role === 'driver' && (
        pathname.startsWith('/admin/users') || 
        pathname.startsWith('/admin/settings')
      )) {
        console.log("Chauffeur tente d'accéder à une page admin, redirection vers /admin/dashboard");
        // Rediriger vers le tableau de bord
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } catch (error) {
      console.error("Erreur dans le middleware:", error);
      // En cas d'erreur, rediriger vers la page de login par sécurité
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Si tout est en ordre, continuer
  console.log("Accès autorisé pour:", pathname);
  return NextResponse.next();
}

// Ne pas appliquer le middleware à ces chemins
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};