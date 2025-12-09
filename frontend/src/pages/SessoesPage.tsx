import { useState } from 'react';
import { ZodError } from 'zod';
import { type Ingresso, IngressoSchema } from '../models/ingresso.model';
import { type Sessao, SessaoSchema } from '../models/sessao.model';
import {
  sessaoService,
  filmeService,
  salaService,
  ingressoService,
} from '../services/api.service';
import { useQuery } from '@tanstack/react-query';
import { TopoCadastro } from '../components/common/TopoCadastro';
import { AlertaSucesso } from '../components/common/AlertaSucesso';

export const SessoesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showIngressoModal, setShowIngressoModal] = useState(false);
  const [sessaoSelecionada, setSessaoSelecionada] = useState<Sessao | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [tipoIngresso, setTipoIngresso] = useState<'inteira' | 'meia'>(
    'inteira'
  );
  const [formData, setFormData] = useState({
    filmeId: '',
    salaId: '',
    horarioExibicao: '',
  });

  const { status: statusCarregamentoSalas, data: salas } = useQuery({
    queryKey: ['salas'],
    queryFn: salaService.getAll,
  });

  const { status: statusCarregamentoFilmes, data: filmes } = useQuery({
    queryKey: ['filmes'],
    queryFn: filmeService.getAll,
  });

  const dependenciasCarregadas =
    statusCarregamentoFilmes === 'success' &&
    statusCarregamentoSalas === 'success';

  const {
    status: statusCarregamentoSessoes,
    data: sessoes,
    refetch: carregarDados,
  } = useQuery({
    queryKey: ['sessoes'],
    queryFn: sessaoService.getAll,
    enabled: dependenciasCarregadas,
    select: dados =>
      dados.map(s => {
        const filme = filmes?.find(f => f.id === s.filmeId);
        const sala = salas?.find(sa => sa.id === s.salaId);

        return {
          ...s,
          numeroSala: sala?.numero,
          tituloFilme: filme?.titulo,
        };
      }),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    console.log(formData);
    try {
      const novaSessao = SessaoSchema.parse({
        filmeId: formData.filmeId,
        salaId: formData.salaId,
        horarioExibicao: new Date(formData.horarioExibicao),
      });

      await sessaoService.create(novaSessao);
      setSuccessMessage('Sessão agendada com sucesso!');
      setFormData({
        filmeId: '',
        salaId: '',
        horarioExibicao: '',
      });
      setShowForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      carregarDados();
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

  const handleDelete = async (id: string | undefined) => {
    if (id && window.confirm('Tem certeza que deseja deletar esta sessão?')) {
      try {
        await sessaoService.delete(id);
        carregarDados();
      } catch (error) {
        console.error('Erro ao deletar sessão:', error);
      }
    }
  };

  const handleVenderIngresso = (sessao: Sessao) => {
    setSessaoSelecionada(sessao);
    setShowIngressoModal(true);
  };

  const handleConfirmarIngresso = async () => {
    if (!sessaoSelecionada?.id) return;

    try {
      const filmeSelecionado = filmes?.find(
        f => f.id === sessaoSelecionada.filmeId
      );
      let valor = 0;

      if (filmeSelecionado) {
        valor = tipoIngresso === 'inteira' ? 50 : 25;
      }

      const novoIngresso: Ingresso = {
        sessaoId: sessaoSelecionada.id,
        tipo: tipoIngresso,
        valor: valor,
      };

      const validado = IngressoSchema.parse(novoIngresso);
      await ingressoService.create(validado);

      setSuccessMessage(
        `Ingresso ${tipoIngresso} vendido com sucesso! Valor: R$ ${valor.toFixed(
          2
        )}`
      );
      setShowIngressoModal(false);
      setSessaoSelecionada(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao vender ingresso:', error);
    }
  };

  return (
    <div className="container-fluid py-4">
      <TopoCadastro
        titulo="Sessões"
        tituloBotaoCadastro="Agendar Sessão"
        codigoIcone="bi-calendar2-event"
        botaoCadastroVisivel={dependenciasCarregadas}
        onCadastrarClick={() => setShowForm(!showForm)}
      />

      {successMessage && (
        <AlertaSucesso
          msg={successMessage}
          onCloseClick={() => setSuccessMessage('')}
        />
      )}

      {showForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Agendar Nova Sessão</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Filme *</label>
                  <select
                    className={`form-control ${
                      errors.filmeId ? 'is-invalid' : ''
                    }`}
                    name="filmeId"
                    value={formData.filmeId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um filme...</option>
                    {filmes?.map(filme => (
                      <option
                        key={filme.id}
                        value={filme.id}
                      >
                        {filme.titulo}
                      </option>
                    ))}
                  </select>
                  {errors.filmeId && (
                    <div className="invalid-feedback d-block">
                      {errors.filmeId}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Sala *</label>
                  <select
                    className={`form-control ${
                      errors.salaId ? 'is-invalid' : ''
                    }`}
                    name="salaId"
                    value={formData.salaId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma sala...</option>
                    {salas?.map(sala => (
                      <option
                        key={sala.id}
                        value={sala.id}
                      >
                        Sala {sala.numero} (Cap: {sala.capacidade})
                      </option>
                    ))}
                  </select>
                  {errors.salaId && (
                    <div className="invalid-feedback d-block">
                      {errors.salaId}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Data e Hora da Sessão *</label>
                <input
                  type="datetime-local"
                  className={`form-control ${
                    errors.horarioExibicao ? 'is-invalid' : ''
                  }`}
                  name="horarioExibicao"
                  value={formData.horarioExibicao}
                  onChange={handleChange}
                />
                {errors.horarioExibicao && (
                  <div className="invalid-feedback d-block">
                    {errors.horarioExibicao}
                  </div>
                )}
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Agendar
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

      {statusCarregamentoSessoes === 'success' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Filme</th>
                <th>Sala</th>
                <th>Data/Hora</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sessoes?.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    Nenhuma sessão agendada
                  </td>
                </tr>
              ) : (
                sessoes?.map(sessao => (
                  <tr key={sessao.id}>
                    <td>
                      <i className="bi bi-film me-2"></i>
                      {sessao.tituloFilme}
                    </td>
                    <td>
                      <i className="bi bi-door-closed me-2"></i>
                      Sala {sessao.numeroSala}
                    </td>
                    <td>
                      {new Date(sessao.horarioExibicao).toLocaleDateString(
                        'pt-BR'
                      )}{' '}
                      às{' '}
                      {new Date(sessao.horarioExibicao).toLocaleTimeString(
                        'pt-BR',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleVenderIngresso(sessao)}
                      >
                        <i className="bi bi-ticket me-1"></i>
                        Vender Ingresso
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(sessao.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showIngressoModal && sessaoSelecionada && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vender Ingresso</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowIngressoModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">
                  <strong>Filme:</strong> {sessaoSelecionada.tituloFilme}
                </p>
                <p className="mb-3">
                  <strong>Sala:</strong> {sessaoSelecionada.numeroSala}
                </p>
                <div className="mb-3">
                  <label className="form-label">Tipo de Ingresso:</label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipoIngresso"
                        id="inteira"
                        value="inteira"
                        checked={tipoIngresso === 'inteira'}
                        onChange={() => setTipoIngresso('inteira')}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inteira"
                      >
                        Inteira - R$ 50,00
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipoIngresso"
                        id="meia"
                        value="meia"
                        checked={tipoIngresso === 'meia'}
                        onChange={() => setTipoIngresso('meia')}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="meia"
                      >
                        Meia - R$ 25,00
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowIngressoModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleConfirmarIngresso}
                >
                  Confirmar Venda
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
