import { NavLink, Outlet } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export function Layout() {
    const { language, setLanguage } = useLanguage();
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__logo">
          <img src="assets/nesto-EN_Primary.png" alt="Nesto logo" />
        </div>

        <nav className="app-header__nav">
            <NavLink to="/" className="app-header__link">
                Products
            </NavLink>

            <NavLink to="/applications" className="app-header__link">
                Applications
            </NavLink>
        </nav>
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "fr")}
            aria-label="Select language"
        >
            <option value="en">EN</option>
            <option value="fr">FR</option>
        </select>
      </header>

      <main className="app__content">
        <Outlet />
      </main>
    </div>
  );
}