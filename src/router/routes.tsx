import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { ApplicationPage } from "../pages/ApplicationPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/application/:id" element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
}