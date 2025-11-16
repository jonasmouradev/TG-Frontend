module.exports = {
  types: [
    {
      value: 'test: :test_tube:',
      name: 'test: 🧪 Indica qualquer tipo de criação ou alteração de códigos de teste',
    },
    {
      value: 'feat: :sparkles:',
      name: 'feat: ✨ Indica o desenvolvimento de uma nova feature ao projeto',
    },
    {
      value: 'refactor: :recycle:',
      name: 'refactor: ♻️  Sem impacto de na lógica e regra de negócio. Ex.: Melhoria após code-review',
    },
    {
      value: 'style: :art:',
      name: 'style: 🎨 Empregado quando há mudanças de formatação e estilo do código',
    },
    {
      value: 'fix: :bug:',
      name: 'fix: 🐛 Utilizado quando há correção de erros que estão gerando bugs no sistema',
    },
    {
      value: 'hotfix: :ambulance:',
      name: 'hotfix: 🚑 Correção de bug a partir da branch main/master',
    },
    {
      value: 'chore: :see_no_evil:',
      name: 'chore: 🙈 Mudanças que não afetam o sistema ou arquivos de testes. Ex.: Adicionar mais extensões de arquivos ao .gitignore',
    },
    {
      value: 'docs: :bulb:',
      name: 'docs: 💡 Mudanças de documentação',
    },
    {
      value: 'build: :rocket:',
      name: 'build: 🚀 Mudanças e arquivos de build como docker ou pacotes no package.json',
    },
    {
      value: 'perf: :zap:',
      name: 'perf: ⚡ Mudanças a fim de melhorar performance',
    },
    {
      value: 'revert: :rewind:',
      name: 'revert: ⏪ Reverter commit anterior',
    },
    {
      value: 'release: :bookmark:',
      name: 'release: 🔖 Nova versão do pacote ou nova tag',
    },
    {
      value: 'incineration: :fire:',
      name: 'incineration: 🔥 Remoção de funcionalidade',
    },
    {
      value: 'literals: :speech_balloon:',
      name: 'literals: 💬 Mudanças em texto literal',
    },
    {
      value: 'progress: :construction:',
      name: 'progress: 🚧 Envio de alterações em progresso, não completas',
    },
  ],
  allowBreakingChanges: ['feat', 'fix'],
  allowTicketNumber: true,
  isTicketNumberRequired: true,
  ticketNumberPrefix: '[TG-',
  ticketNumberSuffix: ']',
  skipQuestions: ['body', 'footer'],
  skipEmptyScopes: true,
  subjectSeparator: ' ',
  subjectLimit: 70,
};
