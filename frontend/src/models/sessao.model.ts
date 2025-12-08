import { z } from 'zod';

export const SessaoSchema = z
  .object({
    id: z.number().optional(),
    filmeId: z.number().min(1, 'Filme é obrigatório'),
    salaId: z.number().min(1, 'Sala é obrigatória'),
    horarioExibicao: z.date(),
  })
  .refine(
    sessao => {
      const agora = new Date();
      return sessao.horarioExibicao > agora;
    },
    {
      message: 'A data da sessão não pode ser retroativa',
      path: ['horarioExibicao'],
    }
  );

export type Sessao = z.infer<typeof SessaoSchema>;
