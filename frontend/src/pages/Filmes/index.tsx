import { useState } from 'react';
import { ZodError } from 'zod';
import {
  type CricaoFilme,
  FilmeSchema,
  GeneroFilme,
} from '../../models/filme.model';
import { filmeService } from '../../services/api.service';
import { useQuery } from '@tanstack/react-query';
import { TopoCadastro } from '../../components/common/TopoCadastro';

export const Filmes = () => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    sinopse: '',
    classificacao: '',
    duracao: '',
    genero: '',
    dataInicialExibicao: '',
    dataFinalExibicao: '',
  });

  const {
    status: statusCarregamentoFilmes,
    data: filmes,
    error: erroCarregamentoFilmes,
    refetch: carregarFilmes,
  } = useQuery({
    queryKey: ['filmes'],
    queryFn: filmeService.getAll,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const novoFilme = FilmeSchema.parse({
        titulo: formData.titulo,
        sinopse: formData.sinopse,
        classificacao: formData.classificacao,
        duracao: parseInt(formData.duracao),
        genero: formData.genero,
        dataInicialExibicao: formData.dataInicialExibicao
          ? new Date(formData.dataInicialExibicao)
          : undefined,
        dataFinalExibicao: formData.dataFinalExibicao
          ? new Date(formData.dataFinalExibicao)
          : undefined,
      });

      await filmeService.create(novoFilme);
      setSuccessMessage('Filme cadastrado com sucesso!');
      setFormData({
        titulo: '',
        sinopse: '',
        classificacao: '',
        duracao: '',
        genero: '',
        dataInicialExibicao: '',
        dataFinalExibicao: '',
      });
      setShowForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      carregarFilmes();
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
    if (id && window.confirm('Tem certeza que deseja deletar este filme?')) {
      try {
        await filmeService.delete(id);
        carregarFilmes();
      } catch (error) {
        console.error('Erro ao deletar filme:', error);
      }
    }
  };

  const formatPeriodo = (filme: CricaoFilme) => {
    const periodoInicial = filme.dataInicialExibicao
      ? new Date(filme.dataInicialExibicao).toLocaleDateString('pt-BR')
      : 'indefinido';

    const periodoFinal = filme.dataFinalExibicao
      ? new Date(filme.dataFinalExibicao).toLocaleDateString('pt-BR')
      : 'indefinido';

    return `De ${periodoInicial} à ${periodoFinal}`;
  };

  return (
    <div className="container-fluid py-4">
      <TopoCadastro
        titulo="Filmes"
        tituloBotaoCadastro="Novo Filme"
        codigoIcone="bi-film"
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
                  <label className="form-label">Título *</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.titulo ? 'is-invalid' : ''
                    }`}
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                  />
                  {errors.titulo && (
                    <div className="invalid-feedback d-block">
                      {errors.titulo}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Classificação *</label>
                  <select
                    className={`form-control ${
                      errors.classificacao ? 'is-invalid' : ''
                    }`}
                    name="classificacao"
                    value={formData.classificacao}
                    onChange={handleChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="L">Livre</option>
                    <option value="10">10 anos</option>
                    <option value="12">12 anos</option>
                    <option value="14">14 anos</option>
                    <option value="16">16 anos</option>
                    <option value="18">18 anos</option>
                  </select>
                  {errors.classificacao && (
                    <div className="invalid-feedback d-block">
                      {errors.classificacao}
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Duração (minutos) *</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.duracao ? 'is-invalid' : ''
                    }`}
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                  />
                  {errors.duracao && (
                    <div className="invalid-feedback d-block">
                      {errors.duracao}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Gênero *</label>
                  <select
                    className={`form-control ${
                      errors.genero ? 'is-invalid' : ''
                    }`}
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                  >
                    <option value="">Selecione...</option>
                    {Object.values(GeneroFilme).map(genero => (
                      <option
                        key={genero}
                        value={genero}
                      >
                        {genero}
                      </option>
                    ))}
                  </select>
                  {errors.genero && (
                    <div className="invalid-feedback d-block">
                      {errors.genero}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Sinopse *</label>
                <textarea
                  className={`form-control ${
                    errors.sinopse ? 'is-invalid' : ''
                  }`}
                  name="sinopse"
                  rows={3}
                  value={formData.sinopse}
                  onChange={handleChange}
                ></textarea>
                {errors.sinopse && (
                  <div className="invalid-feedback d-block">
                    {errors.sinopse}
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Data Inicial de Exibição</label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.dataInicialExibicao ? 'is-invalid' : ''
                    }`}
                    name="dataInicialExibicao"
                    value={formData.dataInicialExibicao}
                    onChange={handleChange}
                  />
                  {errors.dataInicialExibicao && (
                    <div className="invalid-feedback d-block">
                      {errors.dataInicialExibicao}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Data Final de Exibição</label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.dataFinalExibicao ? 'is-invalid' : ''
                    }`}
                    name="dataFinalExibicao"
                    value={formData.dataFinalExibicao}
                    onChange={handleChange}
                  />
                  {errors.dataFinalExibicao && (
                    <div className="invalid-feedback d-block">
                      {errors.dataFinalExibicao}
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

      {statusCarregamentoFilmes === 'pending' && (
        <span>Carregando filmes...</span>
      )}
      {statusCarregamentoFilmes === 'success' && (
        <div className="row">
          {filmes.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Nenhum filme cadastrado. Clique em "Novo Filme" para adicionar
                um!
              </div>
            </div>
          ) : (
            filmes.map(filme => (
              <div
                key={filme.id}
                className="col-md-6 col-lg-4 mb-4"
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{filme.titulo}</h5>
                    <p className="card-text text-muted small">
                      {filme.sinopse}
                    </p>
                    <div className="mb-2">
                      <span className="badge bg-info me-2">{filme.genero}</span>
                      <span className="badge bg-secondary me-2">
                        {filme.classificacao}
                      </span>
                      <span className="badge bg-primary">
                        {filme.duracao} min
                      </span>
                    </div>
                    <small className="text-muted d-block mb-2">
                      {formatPeriodo(filme)}
                    </small>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => handleDelete(filme.id)}
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
      {statusCarregamentoFilmes === 'error' && (
        <span>
          Erro desconhecido ao carregar filmes: {erroCarregamentoFilmes.message}
        </span>
      )}
    </div>
  );
};
