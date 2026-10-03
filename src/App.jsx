import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { StoreProvider } from './context/Store';
import Header from './components/Header';
import Footer from './components/Footer';
import Dialogs from './components/Dialogs';

import NotFoundPage from './pages/NotFoundPage';
import './App.css';
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const ModelPage = lazy(() => import('./pages/ModelPage'));
const UsedDetailPage = lazy(() => import('./pages/UsedDetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const CreditIndexPage = lazy(() => import('./pages/CreditIndexPage'));
const CreditProgramPage = lazy(() => import('./pages/CreditProgramPage'));
const TaxiPage = lazy(() => import('./pages/TaxiPages'));
const InsurancePage = lazy(() => import('./pages/InsurancePage'));
const SelectionPage = lazy(() => import('./pages/SelectionPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const TrimPage = lazy(() => import('./pages/TrimPage'));
const ModelCreditPage = lazy(() => import('./pages/ModelCreditPage'));
const TaxiDetailPage = lazy(() => import('./pages/TaxiDetailPage'));
const theme = createTheme({
  palette: { primary: { main: '#ca0000' }, text: { primary: '#262626' } },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiAccordion: {
      styleOverrides: { root: { boxShadow: 'none', border: '1px solid #eeeeee', '&::before': { display: 'none' } } },
    },
  },
});
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'ABC AUTO — ' + (pathname === '/' ? 'Автосалон' : pathname.split('/').filter(Boolean).join(' · '));
  }, [pathname]);
  return null;
}
function Layout() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Suspense
          fallback={
            <div className="container route-loading" role="status">
              Загрузка…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider>
        <ScrollToTop />
        <a className="skip-link" href="#main-content">
          Перейти к содержимому
        </a>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="used" element={<CatalogPage category="used" />} />
            <Route path="used/:id" element={<UsedDetailPage />} />
            <Route path="brands/:brand" element={<BrandPage />} />
            <Route path="model/:id" element={<ModelPage />} />
            <Route path="model/:id/trim/:trim" element={<TrimPage />} />
            <Route path="model/:id/credit" element={<ModelCreditPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="credit" element={<CreditIndexPage />} />
            <Route path="credit/:slug" element={<CreditProgramPage />} />
            <Route path="offers" element={<CreditIndexPage offers />} />
            <Route path="insurance" element={<InsurancePage />} />
            <Route path="taxi" element={<TaxiPage />} />
            <Route path="taxi/:id" element={<TaxiDetailPage />} />
            <Route path="taxi/:id/trim/:trim" element={<TaxiDetailPage />} />
            <Route path="selection" element={<SelectionPage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="collections/:slug" element={<CollectionPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="contact" element={<Navigate to="/contacts" replace />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
            <Route path="privacy" element={<LegalPage />} />
            <Route path="terms" element={<LegalPage terms />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Dialogs />
      </StoreProvider>
    </ThemeProvider>
  );
}
