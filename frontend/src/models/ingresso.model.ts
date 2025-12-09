import { z } from 'zod';

export const IngressoSchema = z.object({
  id: z.string().optional(),
  sessaoId: z.string().min(1, 'Sessão é obrigatória'),
  tipo: z.enum(['inteira', 'meia']),
  valor: z.number().min(0, 'Valor não pode ser negativo'),
});

export type Ingresso = z.infer<typeof IngressoSchema>;
