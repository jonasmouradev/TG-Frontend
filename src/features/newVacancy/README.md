# NewVacancy Feature Structure

This feature follows the established project architecture pattern with the following structure:

## Folder Organization

- **components/** - UI components specific to this feature
  - `Form/` - Compound form component with sub-components
  - `Section/` - Collapsible section component
  - `index.ts` - Barrel export for all components

- **hooks/** - Custom React hooks
  - `useNewVacancy.ts` - Main hook for vacancy form logic
  - `index.ts` - Barrel export for all hooks

- **pages/** - Page components
  - `NewVacancy.tsx` - Main page component
  - `index.ts` - Barrel export for all pages

- **types/** - TypeScript type definitions
  - `vacancy.ts` - Vacancy-related type definitions
  - `index.ts` - Barrel export for all types

- **consts/** - Constants and configurations
  - `processTemplates.ts` - Pre-defined process templates
  - `index.ts` - Barrel export for all constants

- **schemas/** - Validation schemas
  - `vacancySchemas.ts` - Zod schemas for form validation
  - `index.ts` - Barrel export for all schemas

- **services/** - API service functions
  - `createVacancyService.ts` - Service for creating vacancies
  - `index.ts` - Barrel export for all services

- **locale/** - Internationalization files
  - `pt.json` - Portuguese translations
  - `en.json` - English translations

- **index.ts** - Main barrel export that re-exports everything and provides default export for lazy loading

## Usage

Import from the feature using barrel exports:

```typescript
import { NewVacancy, useNewVacancy, processTemplates } from '@/features/newVacancy';
// or for lazy loading
const NewVacancy = lazy(() => import('@/features/newVacancy'));
```
