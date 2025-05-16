import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Ne pas appliquer le middleware aux ressources statiques
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/auth') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Vérifier si la page est une page d'administration
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    try {
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET
      });
      
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      if (!token) {
        const url = new URL('/admin/login', request.url);
        // Ajouter l'URL de redirection SANS encoder doublement
        url.searchParams.set('callbackUrl', request.url);
        return NextResponse.redirect(url);
      }
      
      // Si l'utilisateur est un chauffeur et essaie d'accéder à une page réservée aux admins
      if (token.role === 'driver' && (
        pathname.startsWith('/admin/users') || 
        pathname.startsWith('/admin/settings')
      )) {
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
  return NextResponse.next();
}

// Ne pas appliquer le middleware à ces chemins
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml, etc.
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};