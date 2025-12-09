import { useState } from 'react';
import { ZodError } from 'zod';
import { SalaSchema } from '../../models/sala.model';
import { salaService } from '../../services/api.service';
import { useQuery } from '@tanstack/react-query';
import { TopoCadastro } from '../../components/common/TopoCadastro';

export const Salas = () => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    numero: '',
    capacidade: '',
  });

  const {
    status: statusCarregamentoSalas,
    data: salas,
    error: erroCarregamentoSalas,
    refetch: carregarSalas,
  } = useQuery({
    queryKey: ['salas'],
    queryFn: salaService.getAll,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const novaSala = SalaSchema.parse({
        numero: parseInt(formData.numero),
        capacidade: parseInt(formData.capacidade),
      });

      await salaService.create(novaSala);
      setSuccessMessage('Sala cadastrada com sucesso!');
      setFormData({
        numero: '',
        capacidade: '',
      });
      setShowForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      carregarSalas();
    } catch (error) {
      if (error instanceof ZodError) {
        const erros: Record<string, string> = {};
        error.issues.forEach(err => {
          const campo = err.path[0]?.toString() || 'geral';
          erros[campo] = err.message;
        });
        setErrors(erros);
      }
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (id && window.confirm('Tem certeza que deseja deletar esta sala?')) {
      try {
        await salaService.delete(id);
        carregarSalas();
      } catch (error) {
        console.error('Erro ao deletar sala:', error);
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      <TopoCadastro
        titulo="Salas"
        tituloBotaoCadastro="Nova Sala"
        codigoIcone="bi-door-closed"
        onCadastrarClick={() => setShowForm(!showForm)}
      />

      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage('')}
          ></button>
        </div>
      )}

      {showForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Número da Sala *</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.numero ? 'is-invalid' : ''
                    }`}
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                  />
                  {errors.numero && (
                    <div className="invalid-feedback d-block">
                      {errors.numero}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Capacidade (lugares) *</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.capacidade ? 'is-invalid' : ''
                    }`}
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                  />
                  {errors.capacidade && (
                    <div className="invalid-feedback d-block">
                      {errors.capacidade}
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {statusCarregamentoSalas === 'pending' && (
        <span>Carregando salas...</span>
      )}

      {statusCarregamentoSalas === 'success' && (
        <div className="row">
          {salas?.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Nenhuma sala cadastrada. Clique em "Nova Sala" para adicionar
                uma!
              </div>
            </div>
          ) : (
            salas?.map(sala => (
              <div
                key={sala.id}
                className="col-md-6 col-lg-4 mb-4"
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Sala {sala.numero}</h5>
                    <p className="card-text">
                      <strong>Capacidade:</strong> {sala.capacidade} lugares
                    </p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => handleDelete(sala.id)}
                    >
                      <i className="bi bi-trash me-2"></i>
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {statusCarregamentoSalas === 'error' && (
        <span>
          Erro desconhecido ao carregar filmes: {erroCarregamentoSalas.message}
        </span>
      )}
    </div>
  );
};
