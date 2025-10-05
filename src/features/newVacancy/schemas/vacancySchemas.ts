// src/features/createJob/schemas/jobSchemas.ts
import { z } from 'zod';

export const Step1Schema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
});

export const Step2Schema = z.object({
  requirements: z.array(z.string().min(2, 'O requisito não pode estar vazio')),
});

export const Step3Schema = z.object({
  questions: z.array(z.string().min(5, 'A pergunta deve ser mais descritiva')),
});

export const FullJobSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);

export type FullJobType = z.infer<typeof FullJobSchema>;
