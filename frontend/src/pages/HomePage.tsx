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
            Bem-vindo ao CineWeb
          </h1>
          <p className="lead mb-0">
            Sistema de Gestão de Cinema - Gerenciar filmes, salas e sessões
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i
                  className="bi bi-film"
                  style={{
                    fontSize: '3rem',
                    color: '#667eea',
                    marginBottom: '1rem',
                  }}
                ></i>
                <h5 className="card-title">Gerenciar Filmes</h5>
                <p className="card-text">
                  Cadastre, visualize e remova filmes da programação do cinema.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i
                  className="bi bi-door-closed"
                  style={{
                    fontSize: '3rem',
                    color: '#667eea',
                    marginBottom: '1rem',
                  }}
                ></i>
                <h5 className="card-title">Gerenciar Salas</h5>
                <p className="card-text">
                  Configure as salas do cinema com número e capacidade de
                  lugares.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i
                  className="bi bi-calendar2-event"
                  style={{
                    fontSize: '3rem',
                    color: '#667eea',
                    marginBottom: '1rem',
                  }}
                ></i>
                <h5 className="card-title">Agendar Sessões</h5>
                <p className="card-text">
                  Crie agendamentos de sessões e gerencie a venda de ingressos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="alert alert-info mt-5">
          <h5>
            <i className="bi bi-info-circle me-2"></i>
            Como usar o CineWeb
          </h5>
          <ul className="mb-0">
            <li>Use a barra de navegação no topo para acessar os módulos</li>
            <li>Comece cadastrando filmes e salas</li>
            <li>Depois, agende sessões selecionando um filme e uma sala</li>
            <li>Na listagem de sessões, você pode vender ingressos</li>
            <li>
              Certifique-se de que o json-server está rodando na porta 3000
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
