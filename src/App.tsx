import { useEffect, useState, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SEOHead from './components/SEOHead';
import PWAInstallBanner from './components/PWAInstallBanner';

const PublicSite = lazy(() => import('./components/PublicSite'));
const UnifiedLogin = lazy(() => import('./components/UnifiedLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ExecutivePortal = lazy(() => import('./components/ExecutivePortal'));
const TelecallerPortal = lazy(() => import('./components/TelecallerPortal'));
const ManagerPortal = lazy(() => import('./components/ManagerPortal'));
const HRPortal = lazy(() => import('./components/HRPortal'));
const EmployeePortal = lazy(() => import('./components/EmployeePortal'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [isAppRoute, setIsAppRoute] = useState(false);
  const [isLoginRoute, setIsLoginRoute] = useState(false);
  const [isEmpRoute, setIsEmpRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const loginMatch = path === '/login' || hash === '#login';
      setIsLoginRoute(loginMatch);
      setIsAppRoute(
        path === '/admin' || hash === '#admin' ||
        loginMatch ||
        path === '/portal' || hash === '#portal'
      );
      setIsEmpRoute(path === '/employee' || hash === '#employee' || path === '/myportal' || hash === '#myportal');
    };
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (isLoginRoute) {
    if (!user) return <Suspense fallback={<PageLoader />}><UnifiedLogin /></Suspense>;
    if (user.role === 'admin') return <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>;
    if (user.role === 'marketing_executive') return <Suspense fallback={<PageLoader />}><ExecutivePortal /></Suspense>;
    if (user.role === 'telecaller') return <Suspense fallback={<PageLoader />}><TelecallerPortal /></Suspense>;
    if (user.role === 'manager') return <Suspense fallback={<PageLoader />}><ManagerPortal /></Suspense>;
    if (user.role === 'hr') return <Suspense fallback={<PageLoader />}><HRPortal /></Suspense>;
    if (user.role === 'employee') return <Suspense fallback={<PageLoader />}><EmployeePortal /></Suspense>;
    return <Suspense fallback={<PageLoader />}><UnifiedLogin /></Suspense>;
  }

  if (isEmpRoute) {
    if (!user) return <Suspense fallback={<PageLoader />}><UnifiedLogin /></Suspense>;
    return <Suspense fallback={<PageLoader />}><EmployeePortal /></Suspense>;
  }

  if (isAppRoute) {
    if (!user) return <Suspense fallback={<PageLoader />}><UnifiedLogin /></Suspense>;
    if (user.role === 'admin') return <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>;
    if (user.role === 'marketing_executive') return <Suspense fallback={<PageLoader />}><ExecutivePortal /></Suspense>;
    if (user.role === 'telecaller') return <Suspense fallback={<PageLoader />}><TelecallerPortal /></Suspense>;
    if (user.role === 'manager') return <Suspense fallback={<PageLoader />}><ManagerPortal /></Suspense>;
    if (user.role === 'hr') return <Suspense fallback={<PageLoader />}><HRPortal /></Suspense>;
    if (user.role === 'employee') return <Suspense fallback={<PageLoader />}><EmployeePortal /></Suspense>;
    return <Suspense fallback={<PageLoader />}><UnifiedLogin /></Suspense>;
  }

  return (
    <>
      <SEOHead />
      <PWAInstallBanner />
      <Suspense fallback={<PageLoader />}>
        <PublicSite />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
