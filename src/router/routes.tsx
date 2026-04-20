import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import { ApplicationPage } from '../pages/ApplicationPage';
import ApplicationsListPage from '../pages/ApplicationsListPage';
import { Layout } from '../components/Layout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/application/:id" element={<ApplicationPage />} />
          <Route path="/applications" element={<ApplicationsListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
