import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import SignInPage from '@/features/auth/pages/SignInPage';
import { useAuth } from '@/features/auth/hooks';

// Mock do hook useAuth
vi.mock('@/features/auth/hooks', () => ({
  useAuth: vi.fn(),
}));

// Mock do react-router
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
}));

// Mock do sonner para toasts
vi.mock('sonner', () => ({
  Toaster: () => <div data-testid="toaster" />,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Componente wrapper para prover o contexto de roteamento
const SignInPageWrapper = () => (
  <BrowserRouter>
    <SignInPage />
  </BrowserRouter>
);

describe('SignInPage', () => {
  const mockSignIn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      signIn: mockSignIn,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização inicial', () => {
    test('deve renderizar todos os elementos da página', () => {
      render(<SignInPageWrapper />);

      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
      expect(screen.getByText(/ainda não possui uma conta\?/i)).toBeInTheDocument();
    });

    test('deve renderizar a imagem de background', () => {
      render(<SignInPageWrapper />);

      const backgroundImage = screen.getByAltText(/background/i);
      expect(backgroundImage).toBeInTheDocument();
      expect(backgroundImage).toHaveAttribute('src', expect.stringContaining('login_bg.svg'));
    });

    test('deve renderizar o componente Toaster', () => {
      render(<SignInPageWrapper />);

      expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });
  });

  describe('Interações do formulário', () => {
    test('deve permitir digitar no campo de email', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    test('deve permitir digitar no campo de senha', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const passwordInput = screen.getByPlaceholderText(/senha/i);
      await user.type(passwordInput, 'password123');

      expect(passwordInput).toHaveValue('password123');
    });

    test('deve ter o campo de senha do tipo password', () => {
      render(<SignInPageWrapper />);

      const passwordInput = screen.getByPlaceholderText(/senha/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Submissão do formulário', () => {
    test('deve chamar signIn com dados válidos ao submeter o formulário', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    test('deve submeter o formulário ao pressionar Enter', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
  });

  describe('Validação de formulário', () => {
    test('deve validar email inválido', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await user.type(emailInput, 'invalid-email');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      // A validação do Zod deve impedir a submissão
      expect(mockSignIn).not.toHaveBeenCalled();
    });

    test('deve validar senha muito curta', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123'); // Menos de 6 caracteres
      await user.click(submitButton);

      // A validação do Zod deve impedir a submissão
      expect(mockSignIn).not.toHaveBeenCalled();
    });

    test('não deve submeter formulário com campos vazios', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const submitButton = screen.getByRole('button', { name: /entrar/i });
      await user.click(submitButton);

      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });

  describe('Estados de carregamento', () => {
    test('deve mostrar estado de carregamento quando isLoading é true', () => {
      (useAuth as any).mockReturnValue({
        signIn: mockSignIn,
        isLoading: true,
      });

      render(<SignInPageWrapper />);

      expect(screen.getByRole('button', { name: /entrando.../i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrando.../i })).toBeDisabled();
    });

    test('deve mostrar texto normal quando não está carregando', () => {
      render(<SignInPageWrapper />);

      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).not.toBeDisabled();
    });
  });

  describe('Navegação', () => {
    test('deve navegar para página de cadastro ao clicar no link', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const signUpLink = screen.getByRole('button', { name: /ainda não possui uma conta\? cadastre-se/i });
      await user.click(signUpLink);

      expect(mockNavigate).toHaveBeenCalledWith('/signUp');
    });
  });

  describe('Testes de acessibilidade', () => {
    test('deve ter estrutura semântica adequada', () => {
      render(<SignInPageWrapper />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      // O campo de senha não tem role textbox devido ao type="password"
      expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    test('campos devem ter placeholders apropriados', () => {
      render(<SignInPageWrapper />);

      expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    });
  });

  describe('Testes de integração', () => {
    test('deve funcionar o fluxo completo de login bem-sucedido', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ token: 'fake-token' });

      render(<SignInPageWrapper />);

      await user.type(screen.getByPlaceholderText(/e-mail/i), 'user@example.com');
      await user.type(screen.getByPlaceholderText(/senha/i), 'password123');
      await user.click(screen.getByRole('button', { name: /entrar/i }));

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('user@example.com', 'password123');
      });
    });

    test('deve lidar com erro de login', async () => {
      const user = userEvent.setup();
      mockSignIn.mockRejectedValue(new Error('Credenciais inválidas'));

      render(<SignInPageWrapper />);

      await user.type(screen.getByPlaceholderText(/e-mail/i), 'user@example.com');
      await user.type(screen.getByPlaceholderText(/senha/i), 'wrongpassword');
      await user.click(screen.getByRole('button', { name: /entrar/i }));

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('user@example.com', 'wrongpassword');
      });
    });
  });

  describe('Testes de edge cases', () => {
    test('deve lidar com caracteres especiais no email e senha', async () => {
      const user = userEvent.setup();
      render(<SignInPageWrapper />);

      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);

      await user.type(emailInput, 'test+special@example.com');
      await user.type(passwordInput, 'P@ssw0rd!123');
      await user.click(screen.getByRole('button', { name: /entrar/i }));

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('test+special@example.com', 'P@ssw0rd!123');
      });
    });
  });
});
