import { z } from 'zod';

export const SessaoSchema = z
  .object({
    id: z.string().optional(),
    filmeId: z.string().min(1, 'Filme é obrigatório'),
    salaId: z.string().min(1, 'Sala é obrigatória'),
    horarioExibicao: z.date(),
    tituloFilme: z.string().optional(),
    numeroSala: z.number().optional(),
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
