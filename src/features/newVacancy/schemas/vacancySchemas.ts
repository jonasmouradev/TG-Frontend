import { z } from 'zod';
import { ContractType, ExperienceLevel, VacancyType, WorkModeType } from '@core/domain';

export const vacancyFormSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  area: z.string().min(3, 'Departamento é obrigatório'),
  location: z.string().min(2, 'Localização é obrigatória'),
  contract: z.nativeEnum(ContractType),
  workMode: z.nativeEnum(WorkModeType),
  type: z.nativeEnum(VacancyType).optional(),
  level: z.nativeEnum(ExperienceLevel).optional(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  questions: z.array(z.string()).default([]),
  salaryRange: z
    .object({
      min: z.number().min(0, 'Salário mínimo deve ser maior ou igual a 0'),
      max: z.number().min(0, 'Salário máximo deve ser maior ou igual a 0'),
    })
    .optional(),
  currency: z.string().optional(),
  publicationDate: z.date().or(z.string()).nullable(),
  expirationDate: z.date().or(z.string()).nullable(),
  stages: z.array(z.any()),
});

export type VacancyFormSchema = z.infer<typeof vacancyFormSchema>;

// Schemas parciais para validação por seções
export const basicInfoSchema = vacancyFormSchema.pick({
  title: true,
  area: true,
  location: true,
  contract: true,
  workMode: true,
});

export const descriptionSchema = vacancyFormSchema.pick({
  description: true,
});

export const requirementsSchema = vacancyFormSchema.pick({
  requirements: true,
});

export const benefitsSchema = vacancyFormSchema.pick({
  benefits: true,
  salaryRange: true,
});
