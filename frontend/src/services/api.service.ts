import axios from 'axios';
import type { Filme } from '../models/filme.model';
import type { Ingresso } from '../models/ingresso.model';
import type { Sala } from '../models/sala.model';
import type { Sessao } from '../models/sessao.model';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const filmeService = {
  getAll: async (): Promise<Filme[]> => {
    const response = await api.get('/filmes');
    return response.data;
  },

  create: async (filme: Filme): Promise<Filme> => {
    const response = await api.post('/filmes', filme);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/filmes/${id}`);
  },
};

export const salaService = {
  getAll: async (): Promise<Sala[]> => {
    const response = await api.get('/salas');
    return response.data;
  },

  create: async (sala: Sala): Promise<Sala> => {
    const response = await api.post('/salas', sala);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/salas/${id}`);
  },
};

export const sessaoService = {
  getAll: async (): Promise<Sessao[]> => {
    const response = await api.get('/sessoes');
    return response.data;
  },

  create: async (sessao: Sessao): Promise<Sessao> => {
    const response = await api.post('/sessoes', sessao);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/sessoes/${id}`);
  },
};

export const ingressoService = {
  getAll: async (): Promise<Ingresso[]> => {
    const response = await api.get('/ingressos');
    return response.data;
  },

  create: async (ingresso: Ingresso): Promise<Ingresso> => {
    const response = await api.post('/ingressos', ingresso);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/ingressos/${id}`);
  },
};
