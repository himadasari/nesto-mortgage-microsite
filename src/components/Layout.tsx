import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
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
      </header>

      <main className="app__content">
        <Outlet />
      </main>
    </div>
  );
}