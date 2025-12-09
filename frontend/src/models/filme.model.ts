import { z } from 'zod';

export enum GeneroFilme {
  Acao = 'Ação',
  Comedia = 'Comédia',
  Terror = 'Terror',
  Drama = 'Drama',
  Suspense = 'Suspense',
  FiccaoCientifica = 'Ficção Científica',
}

export const FilmeSchema = z.object({
  id: z.string().optional(),
  titulo: z.string().min(1, 'Título é obrigatório'),
  sinopse: z.string().min(10, 'Sinopse deve ter no mínimo 10 caracteres'),
  classificacao: z.string().min(1, 'Classificação é obrigatória'),
  duracao: z.number().min(1, 'Duração deve ser um número positivo'),
  genero: z.enum(GeneroFilme),
  dataInicialExibicao: z.coerce.date().optional(),
  dataFinalExibicao: z.coerce.date().optional(),
});

export type Filme = z.infer<typeof FilmeSchema>;
export type CricaoFilme = Omit<Filme, 'id'>;
