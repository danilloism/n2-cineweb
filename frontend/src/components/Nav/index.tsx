import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          <i className="bi bi-film me-2"></i>
          CineWeb
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarItems"
          aria-controls="navbarItems"
          aria-expanded="false"
          aria-label="Expandir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarItems"
        >
          <ul className="navbar-nav mr-auto ms-auto">
            <li className="nav-item">
              <Link
                to="/filmes"
                className="nav-link text-white"
              >
                <i className="bi bi-film me-1"></i>
                Filmes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/salas"
                className="nav-link text-white"
              >
                <i className="bi bi-door-closed me-1"></i>
                Salas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sessoes"
                className="nav-link text-white"
              >
                <i className="bi bi-calendar2-event me-1"></i>
                Sessões
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
