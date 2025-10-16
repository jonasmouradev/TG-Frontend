# Copilot Instructions for TG-Frontend

## Project Overview

This is a recruitment and selection system frontend built with React, TypeScript, and Vite. The project focuses on providing a specialized platform for technology recruitment, with features like candidate recommendation, selection process customization, and interactive dashboards.

## Tech Stack

- **React 19** with TypeScript
- **Vite** with SWC for fast builds
- **Styled Components** for component styling
- **Tailwind CSS** for utility-first styling
- **React Router v7** for routing
- **React Hook Form** with Zod for form validation
- **Zustand** for state management
- **Axios** for API calls
- **i18next** for internationalization
- **Vitest** and Testing Library for testing
- **ESLint** and **Prettier** for code quality

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check first)
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run coverage` - Run tests with coverage
- `npm run commit` - Create conventional commits with Commitizen

## Code Style and Conventions

### TypeScript

- Always use TypeScript for new files
- Prefer interfaces over types for object shapes
- Use strict type checking
- Avoid using `any` - use `unknown` or specific types instead

### React Components

- Use functional components with hooks
- Prefer named exports for components
- Use `.tsx` extension for component files
- Keep components in feature-based directories under `src/features/`
- Shared components go in `src/shared/components/`

### Styling

- Use Tailwind CSS utility classes as the primary styling method
- Use Styled Components for complex component-specific styles
- Follow the component structure in `src/shared/components/ui/`
- Use the theme system with `next-themes` for dark/light mode support

### File Organization

```
src/
├── features/          # Feature-based modules
├── shared/            # Shared components, utilities, services
│   ├── components/    # Reusable UI components
│   ├── services/      # API services and utilities
│   ├── utils/         # Helper functions
│   └── types/         # Shared TypeScript types
├── routes/            # Route definitions
├── styles/            # Global styles and themes
└── types/             # Global type definitions
```

### Commit Messages

- Use conventional commits format: `type(scope): message`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Run `npm run commit` to use Commitizen for guided commits
- Commits are validated with Commitizen and Husky pre-commit hooks

### Testing

- Write tests using Vitest and Testing Library
- Test files should be named `*.test.ts` or `*.test.tsx`
- Place tests close to the code they test
- Focus on testing user interactions and component behavior
- Use `@testing-library/user-event` for user interactions

### API Integration

- API calls should be made through services in `src/shared/services/`
- Use Axios interceptors for common request/response handling
- Handle errors consistently using try-catch blocks
- Use environment variables for API endpoints

### Forms

- Use React Hook Form for form management
- Use Zod for schema validation
- Use `@hookform/resolvers` to integrate Zod with React Hook Form
- Keep form components composable and reusable

### State Management

- Use Zustand for global state management
- Keep state as local as possible - only lift to global when necessary
- Use React Context for theme and i18n state

### Internationalization

- Use i18next for all user-facing text
- Translation keys should be organized by feature
- Always provide both English and Portuguese translations

## Best Practices

1. **Component Design**: Keep components small, focused, and reusable
2. **Type Safety**: Leverage TypeScript's type system for better code quality
3. **Performance**: Use React.memo, useMemo, and useCallback when appropriate
4. **Accessibility**: Follow WCAG guidelines, use semantic HTML, and ARIA attributes
5. **Error Handling**: Implement proper error boundaries and user feedback
6. **Code Quality**: Run lint before committing, fix warnings when possible
7. **Git Workflow**: Create meaningful commits, use feature branches
8. **Documentation**: Document complex logic and public APIs

## Common Patterns

### Creating a New Feature Component

```typescript
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

### Creating a Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

### Making API Calls

```typescript
import api from '@/shared/services/api';

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
```

## Things to Avoid

- Don't use `var` - use `const` or `let`
- Don't use default exports for components (use named exports)
- Don't put business logic in components - extract to hooks or services
- Don't commit console.logs or debugging code
- Don't ignore TypeScript errors - fix them
- Don't inline large objects or arrays - extract to constants
- Don't use `any` type unless absolutely necessary
- Don't modify node_modules or package-lock.json manually

## When Helping with Code

1. Always maintain existing code style and patterns
2. Follow the established file structure
3. Write type-safe code with proper TypeScript annotations
4. Include proper error handling
5. Consider performance implications
6. Keep accessibility in mind
7. Provide meaningful variable and function names
8. Add comments only when necessary to explain complex logic
9. Run linter and tests before suggesting code is complete
10. Follow the principle of least surprise - code should be predictable

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
