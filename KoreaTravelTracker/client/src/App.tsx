import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Passcode from "@/pages/passcode";
import NotFound from "@/pages/not-found";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Passcode onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF', // iOS Blue
      light: '#5AC8FA',
      dark: '#0051D5',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FF3B30', // iOS Red
      light: '#FF6961',
      dark: '#D70015',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#34C759', // iOS Green
      light: '#30D158',
      dark: '#248A3D'
    },
    warning: {
      main: '#FF9500', // iOS Orange
      light: '#FF9500',
      dark: '#CC7700'
    },
    background: {
      default: '#F2F2F7', // iOS Light Gray
      paper: 'rgba(255, 255, 255, 0.9)'
    },
    error: {
      main: '#FF3B30',
      light: '#FF6961',
      dark: '#D70015'
    },
    grey: {
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
    },
    text: {
      primary: '#1C1C1E', // iOS Label Primary
      secondary: '#8E8E93', // iOS Label Secondary
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.005em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.33,
      color: '#8E8E93',
    },
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          backdrop: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          overflow: 'hidden',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(145deg, #007AFF, #5AC8FA)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(145deg, #0051D5, #007AFF)',
          },
        },
        outlined: {
          borderColor: '#007AFF',
          color: '#007AFF',
          backgroundColor: 'rgba(0, 122, 255, 0.05)',
          '&:hover': {
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            borderColor: '#0051D5',
          },
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 0 0 4px rgba(0, 122, 255, 0.1)',
            },
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          fontSize: '0.875rem',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      },
    },
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
