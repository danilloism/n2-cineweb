import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export const HomePage = () => {
  return (
    <div className="container-fluid">
      <div
        className="hero-section py-5"
        style={{
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 className="display-4 mb-4">
            <i className="bi bi-film me-3"></i>
            CineWeb
          </h1>
          <p className="lead mb-0">
            Sistema de Gestão de Cinema - Gerenciar filmes, salas e sessões
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <Card>
            <i
              className="bi bi-film"
              style={{
                fontSize: '3rem',
                color: '#667eea',
                marginBottom: '1rem',
              }}
            ></i>
            <Link to="/filmes">
              <h5 className="card-title">Gerenciar Filmes</h5>
            </Link>
            <p className="card-text">
              Cadastre, visualize e remova filmes da programação do cinema.
            </p>
          </Card>

          <Card>
            <i
              className="bi bi-door-closed"
              style={{
                fontSize: '3rem',
                color: '#667eea',
                marginBottom: '1rem',
              }}
            ></i>
            <Link to="/salas">
              <h5 className="card-title">Gerenciar Salas</h5>
            </Link>
            <p className="card-text"></p>

            <p className="card-text">
              Configure as salas do cinema com número e capacidade de lugares.
            </p>
          </Card>

          <Card>
            <i
              className="bi bi-calendar2-event"
              style={{
                fontSize: '3rem',
                color: '#667eea',
                marginBottom: '1rem',
              }}
            ></i>
            <Link to="/sessoes">
              <h5 className="card-title">Agendar Sessões</h5>
            </Link>

            <p className="card-text">
              Crie agendamentos de sessões e gerencie a venda de ingressos.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
