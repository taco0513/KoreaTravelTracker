import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { Security, Analytics, Schedule } from '@mui/icons-material';

export default function Landing() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Korea Stay Tracker
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Track your stays in Korea and ensure visa compliance with the 183-day annual limit
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          href="/api/login"
          sx={{ 
            px: 5, 
            py: 2, 
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '18px',
            background: 'linear-gradient(145deg, #007AFF, #5AC8FA)',
            boxShadow: '0 8px 30px rgba(0, 122, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(145deg, #0051D5, #007AFF)',
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 40px rgba(0, 122, 255, 0.5)',
            }
          }}
        >
          Sign In to Continue
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mt: 6 }}>
        <Card 
          elevation={0}
          sx={{
            borderRadius: '24px',
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Box sx={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #34C759, #30D158)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(52, 199, 89, 0.3)'
            }}>
              <Security sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 700,
              color: '#1C1C1E',
              fontSize: '1.25rem',
              letterSpacing: '-0.01em'
            }}>
              Visa Compliance
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#8E8E93',
              fontSize: '0.95rem',
              lineHeight: 1.5
            }}>
              Monitor your 183-day annual limit with rolling calendar tracking
            </Typography>
          </CardContent>
        </Card>

        <Card 
          elevation={0}
          sx={{
            borderRadius: '24px',
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Box sx={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(0, 122, 255, 0.3)'
            }}>
              <Analytics sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 700,
              color: '#1C1C1E',
              fontSize: '1.25rem',
              letterSpacing: '-0.01em'
            }}>
              Smart Analytics
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#8E8E93',
              fontSize: '0.95rem',
              lineHeight: 1.5
            }}>
              Visual dashboard with progress tracking and warning alerts
            </Typography>
          </CardContent>
        </Card>

        <Card 
          elevation={0}
          sx={{
            borderRadius: '24px',
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Box sx={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #FF9500, #FF9500)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(255, 149, 0, 0.3)'
            }}>
              <Schedule sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 700,
              color: '#1C1C1E',
              fontSize: '1.25rem',
              letterSpacing: '-0.01em'
            }}>
              Stay Management
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#8E8E93',
              fontSize: '0.95rem',
              lineHeight: 1.5
            }}>
              Easy entry and exit date tracking with calendar visualization
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}