# Testes da Página de Login

Este documento descreve os casos de teste implementados para a página de login (`SignInPage.tsx`).

## Configuração dos Testes

### Dependências

- **Vitest**: Framework de testes
- **@testing-library/react**: Para renderização e interação com componentes
- **@testing-library/jest-dom**: Para matchers adicionais
- **@testing-library/user-event**: Para simulação de eventos do usuário

### Configuração

- `vitest.config.ts`: Configuração do Vitest com suporte ao jsdom
- `src/tests/setup.ts`: Configuração global dos testes com jest-dom

## Casos de Teste Implementados

### 1. Renderização Inicial

**Objetivo**: Verificar se todos os elementos da interface são renderizados corretamente.

- ✅ **deve renderizar todos os elementos da página**
  - Verifica a presença do título, campos de input, botão e link de cadastro
- ✅ **deve renderizar a imagem de background**
  - Confirma que a imagem de fundo é exibida com o src correto
- ✅ **deve renderizar o componente Toaster**
  - Verifica se o componente de notificações está presente

### 2. Interações do Formulário

**Objetivo**: Testar as interações básicas com os campos do formulário.

- ✅ **deve permitir digitar no campo de email**
  - Simula a digitação e verifica se o valor é atualizado
- ✅ **deve permitir digitar no campo de senha**
  - Simula a digitação no campo de senha
- ✅ **deve ter o campo de senha do tipo password**
  - Confirma que o campo de senha está configurado corretamente

### 3. Submissão do Formulário

**Objetivo**: Verificar se o formulário é submetido corretamente.

- ✅ **deve chamar signIn com dados válidos ao submeter o formulário**
  - Preenche o formulário e clica no botão de submissão
  - Verifica se a função `signIn` é chamada com os parâmetros corretos
- ✅ **deve submeter o formulário ao pressionar Enter**
  - Testa a submissão via tecla Enter

### 4. Validação de Formulário

**Objetivo**: Testar as validações implementadas com Zod.

- ✅ **deve validar email inválido**
  - Tenta submeter com email em formato inválido
  - Confirma que a submissão é bloqueada
- ✅ **deve validar senha muito curta**
  - Tenta submeter com senha menor que 6 caracteres
  - Confirma que a validação impede a submissão
- ✅ **não deve submeter formulário com campos vazios**
  - Tenta submeter sem preencher os campos
  - Verifica que a validação funciona

### 5. Estados de Carregamento

**Objetivo**: Verificar o comportamento durante o processo de login.

- ✅ **deve mostrar estado de carregamento quando isLoading é true**
  - Simula estado de carregamento
  - Verifica se o botão mostra "Entrando..." e fica desabilitado
- ✅ **deve mostrar texto normal quando não está carregando**
  - Confirma o estado normal do botão

### 6. Navegação

**Objetivo**: Testar a navegação para outras páginas.

- ✅ **deve navegar para página de cadastro ao clicar no link**
  - Clica no link "Cadastre-se"
  - Verifica se a navegação é chamada corretamente

### 7. Testes de Acessibilidade

**Objetivo**: Garantir que o componente atende padrões de acessibilidade.

- ✅ **deve ter estrutura semântica adequada**
  - Verifica a presença de elementos semânticos (heading, inputs, buttons)
- ✅ **campos devem ter placeholders apropriados**
  - Confirma que os campos têm placeholders descritivos

### 8. Testes de Integração

**Objetivo**: Testar fluxos completos de uso.

- ✅ **deve funcionar o fluxo completo de login bem-sucedido**
  - Simula um login completo com sucesso
- ✅ **deve lidar com erro de login**
  - Testa o comportamento quando o login falha

### 9. Testes de Edge Cases

**Objetivo**: Testar cenários especiais.

- ✅ **deve lidar com caracteres especiais no email e senha**
  - Testa com caracteres especiais válidos
  - Confirma que são aceitos corretamente

## Mocks Utilizados

### Hook useAuth

```typescript
vi.mock('@/features/auth/hooks', () => ({
  useAuth: vi.fn(),
}));
```

### React Router

```typescript
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
}));
```

### Sonner (Toasts)

```typescript
vi.mock('sonner', () => ({
  Toaster: () => <div data-testid="toaster" />,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
```

## Como Executar os Testes

```bash
# Executar todos os testes
npm test

# Executar apenas os testes da página de login
npm test -- src/tests/auth/pages/SignInPage.test.tsx

# Executar com coverage
npm run coverage
```

## Estatísticas dos Testes

- **Total de testes**: 19
- **Grupos de teste**: 9
- **Taxa de sucesso**: 100%
- **Cobertura**: Formulário, validação, navegação, estados de loading, acessibilidade

## Considerações Técnicas

1. **Validação com Zod**: Os testes verificam que as validações do schema impedem submissões inválidas
2. **React Hook Form**: A integração com react-hook-form é testada através das interações do usuário
3. **Estados de Loading**: O comportamento assíncrono é testado através de mocks
4. **Acessibilidade**: Uso de roles e queries semânticas para garantir acessibilidade
5. **User Experience**: Testes focam na experiência do usuário final

## Próximos Passos

Para expandir os testes, considere adicionar:

1. Testes de performance com grandes volumes de dados
2. Testes de compatibilidade com diferentes navegadores
3. Testes de responsividade
4. Testes end-to-end com Cypress
5. Testes de acessibilidade com ferramentas especializadas
