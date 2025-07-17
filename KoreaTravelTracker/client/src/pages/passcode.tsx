import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Button,
  Container,
  Fade
} from '@mui/material';
import { FlightTakeoff, Backspace } from '@mui/icons-material';

interface PasscodeProps {
  onSuccess: () => void;
}

export default function Passcode({ onSuccess }: PasscodeProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  
  const correctCode = '0513';
  
  useEffect(() => {
    if (code.length === 4) {
      if (code === correctCode) {
        onSuccess();
      } else {
        setError(true);
        setIsShaking(true);
        setTimeout(() => {
          setCode('');
          setError(false);
          setIsShaking(false);
        }, 600);
      }
    }
  }, [code, onSuccess]);

  const handleNumberPress = (num: string) => {
    if (code.length < 4) {
      setCode(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #F2F2F7 0%, #E5E5EA 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 2, sm: 3 }
    }}>
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Card 
            elevation={0}
            sx={{
              borderRadius: { xs: '24px', sm: '32px' },
              backdropFilter: 'blur(40px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              transform: isShaking ? 'translateX(-10px)' : 'translateX(0)',
              transition: 'transform 0.1s ease-in-out',
              animation: isShaking ? 'shake 0.6s ease-in-out' : 'none',
              '@keyframes shake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
              }
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              {/* Header */}
              <Box sx={{ 
                textAlign: 'center', 
                mb: { xs: 4, sm: 5 }
              }}>
                <FlightTakeoff sx={{ 
                  fontSize: { xs: '3rem', sm: '4rem' }, 
                  color: '#007AFF',
                  mb: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(0, 122, 255, 0.3))'
                }} />
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.75rem', sm: '2.25rem' },
                    color: '#1C1C1E',
                    mb: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Korea Stay Tracker
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 500
                  }}
                >
                  Enter passcode to continue
                </Typography>
              </Box>

              {/* Code Display */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: { xs: 1, sm: 1.5 },
                mb: { xs: 4, sm: 5 }
              }}>
                {[0, 1, 2, 3].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      borderRadius: { xs: '16px', sm: '20px' },
                      border: `2px solid ${error ? '#FF3B30' : code.length > index ? '#007AFF' : 'rgba(0, 0, 0, 0.1)'}`,
                      backgroundColor: code.length > index ? 'rgba(0, 122, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: code.length === index ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: code.length > index ? '0 4px 16px rgba(0, 122, 255, 0.2)' : 'none'
                    }}
                  >
                    {code.length > index && (
                      <Box
                        sx={{
                          width: { xs: 8, sm: 10 },
                          height: { xs: 8, sm: 10 },
                          borderRadius: '50%',
                          backgroundColor: '#007AFF'
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>

              {/* Error Message */}
              {error && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#FF3B30',
                    textAlign: 'center',
                    mb: 3,
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  Incorrect passcode. Try again.
                </Typography>
              )}

              {/* Number Pad */}
              <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 3 }}>
                {numbers.slice(0, 9).map((num) => (
                  <Grid key={num} size={4}>
                    <Button
                      onClick={() => handleNumberPress(num)}
                      disabled={code.length >= 4}
                      sx={{
                        width: '100%',
                        height: { xs: 60, sm: 70 },
                        borderRadius: { xs: '16px', sm: '20px' },
                        fontSize: { xs: '1.5rem', sm: '1.75rem' },
                        fontWeight: 600,
                        color: '#1C1C1E',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 122, 255, 0.1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(0, 122, 255, 0.15)'
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                          boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)'
                        },
                        '&:disabled': {
                          opacity: 0.5,
                          cursor: 'not-allowed'
                        }
                      }}
                    >
                      {num}
                    </Button>
                  </Grid>
                ))}
                {/* Center the 0 button */}
                <Grid size={4}></Grid>
                <Grid size={4}>
                  <Button
                    onClick={() => handleNumberPress('0')}
                    disabled={code.length >= 4}
                    sx={{
                      width: '100%',
                      height: { xs: 60, sm: 70 },
                      borderRadius: { xs: '16px', sm: '20px' },
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                      fontWeight: 600,
                      color: '#1C1C1E',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0, 122, 255, 0.15)'
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)'
                      },
                      '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed'
                      }
                    }}
                  >
                    0
                  </Button>
                </Grid>
                <Grid size={4}></Grid>
              </Grid>

              {/* Backspace Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={handleBackspace}
                  disabled={code.length === 0}
                  sx={{
                    minWidth: { xs: 120, sm: 140 },
                    height: { xs: 50, sm: 60 },
                    borderRadius: { xs: '16px', sm: '20px' },
                    backgroundColor: 'rgba(255, 59, 48, 0.1)',
                    color: '#FF3B30',
                    border: '1px solid rgba(255, 59, 48, 0.2)',
                    backdropFilter: 'blur(20px)',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 59, 48, 0.2)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 16px rgba(255, 59, 48, 0.2)'
                    },
                    '&:disabled': {
                      opacity: 0.4,
                      cursor: 'not-allowed'
                    }
                  }}
                  startIcon={<Backspace sx={{ fontSize: '1.25rem' }} />}
                >
                  Clear
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}