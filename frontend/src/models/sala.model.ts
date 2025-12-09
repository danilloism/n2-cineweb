import { z } from 'zod';

export const SalaSchema = z.object({
  id: z.string().optional(),
  numero: z.number().min(1, 'Número da sala é obrigatório'),
  capacidade: z.number().min(1, 'Capacidade deve ser maior que 0'),
});

export type Sala = z.infer<typeof SalaSchema>;
