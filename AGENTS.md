# Agent Guidelines for Strats

## Build/Lint/Test Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (TypeScript check + Vite build)
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build
- No test commands configured

## Code Style Guidelines

- Use TypeScript with strict typing - all files in `src/` should be `.ts` or `.tsx`
- Import paths use `@/` alias for `src/` directory
- Function components: named exports with `function` keyword (e.g., `export function Button()`)
- Props: use interface intersection with React component props (e.g., `React.ComponentProps<"button"> & {...}`)
- Styling: Tailwind CSS with class-variance-authority for component variants
- State management: React Query (@tanstack/react-query) for server state
- UI components: Radix UI primitives with custom styling
- Error handling: React Error Boundary for component-level errors
- File organization: UI components in `components/ui/`, business logic in `hooks/`, utilities in `lib/`
- Naming: camelCase for variables/functions, PascalCase for components/types
- Use `cn()` utility from `@/lib/utils` for conditional class names
- Double quotes for strings, semicolons required
- Optional chaining and nullish coalescing where appropriate
