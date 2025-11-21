# React Hook Form - Implementação

## Visão Geral

O formulário de criação de vagas foi refatorado para usar **React Hook Form** com validação via **Zod**. Isso traz:

- ✅ Validação automática de campos
- ✅ Gerenciamento de estado otimizado
- ✅ Mensagens de erro integradas
- ✅ Performance melhorada
- ✅ Typescript type-safe

## Arquitetura

### 1. Schema de Validação (`schemas/vacancySchemas.ts`)

Define a estrutura e validações do formulário usando Zod:

```typescript
export const vacancyFormSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  location: z.string().min(1, 'Localização é obrigatória'),
  // ... outros campos
});

export type VacancyFormSchema = z.infer<typeof vacancyFormSchema>;
```

### 2. Hook Personalizado (`hooks/useVacancyForm.ts`)

Encapsula a lógica do React Hook Form:

```typescript
export const useVacancyForm = () => {
  const {
    register, // Para inputs não controlados
    handleSubmit, // Wrapper para submit
    control, // Para inputs controlados (Select, etc)
    watch, // Observar mudanças
    setValue, // Setar valores programaticamente
    formState: { errors, isValid, isDirty },
  } = useForm<VacancyFormSchema>({
    resolver: zodResolver(vacancyFormSchema),
    defaultValues: {
      /* valores iniciais */
    },
    mode: 'onChange', // Valida enquanto digita
  });

  // ... lógica de negócio
};
```

### 3. Contexto (`contexts/VacancyFormContext.tsx`)

Compartilha o estado do formulário entre componentes:

```typescript
export const VacancyFormProvider = ({ children }: { children: ReactNode }) => {
  const form = useVacancyForm();
  return <VacancyFormContext.Provider value={form}>{children}</VacancyFormContext.Provider>;
};

export const useVacancyFormContext = () => {
  const context = useContext(VacancyFormContext);
  if (!context) {
    throw new Error('useVacancyFormContext must be used within VacancyFormProvider');
  }
  return context;
};
```

### 4. Uso nos Componentes

#### Input não controlado (text, textarea)

```typescript
export default function BasicInfoSection() {
  const { register, errors } = useVacancyFormContext();

  return (
    <div>
      <Input {...register('title')} placeholder="Título da vaga" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </div>
  );
}
```

#### Select controlado

```typescript
export default function BasicInfoSection() {
  const { formData, updateFormData, errors } = useVacancyFormContext();

  return (
    <Select
      value={formData.contract}
      onValueChange={value => updateFormData({ contract: value as ContractType })}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ContractType.CLT}>CLT</SelectItem>
        {/* ... */}
      </SelectContent>
    </Select>
  );
}
```

#### Arrays dinâmicos (skills, benefits)

```typescript
export default function RequirementsSection() {
  const { formData, updateFormData } = useVacancyFormContext();

  const addSkill = (skill: string) => {
    updateFormData({ requirements: [...formData.requirements, skill] });
  };

  const removeSkill = (skill: string) => {
    updateFormData({ requirements: formData.requirements.filter(s => s !== skill) });
  };
}
```

#### Submit com validação

```typescript
export default function ActionButtons() {
  const { handleSubmit, createVacancy, isValid } = useVacancyFormContext();

  const onSubmit = handleSubmit(async () => {
    if (!isValid) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    await createVacancy();
    toast.success('Vaga criada com sucesso!');
  });

  return <Button onClick={onSubmit}>Publicar</Button>;
}
```

## Vantagens

1. **Validação Automática**: Zod valida os dados antes do submit
2. **Type Safety**: TypeScript infere os tipos do schema
3. **Performance**: Re-renderização otimizada, apenas componentes afetados
4. **Menos Boilerplate**: Não precisa de useState para cada campo
5. **Erro Handling**: Mensagens de erro automáticas e customizáveis
6. **Form State**: `isValid`, `isDirty`, `isSubmitting` disponíveis

## Estrutura de Arquivos

```
newVacancy/
├── contexts/
│   └── VacancyFormContext.tsx      # Provider do formulário
├── hooks/
│   └── useVacancyForm.ts           # Lógica do React Hook Form
├── schemas/
│   ├── index.ts
│   └── vacancySchemas.ts           # Validações Zod
├── components/
│   ├── BasicInfoSection/           # Usa register + updateFormData
│   ├── DescriptionSection/         # Usa register
│   ├── RequirementsSection/        # Usa updateFormData para arrays
│   ├── BenefitsSection/            # Usa updateFormData para arrays
│   └── ActionButtons/              # Usa handleSubmit
└── pages/
    └── NewVacancy.tsx              # Wrap com VacancyFormProvider
```

## Próximos Passos

- [ ] Adicionar Controller para campos mais complexos
- [ ] Implementar validação por etapas (wizard)
- [ ] Adicionar testes unitários para validações
- [ ] Implementar auto-save de rascunho
