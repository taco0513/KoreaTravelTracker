import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  LinearProgress, 
  Alert, 
  Box,
  Chip
} from '@mui/material';
import { 
  CalendarToday, 
  Schedule, 
  Flag, 
  Warning 
} from '@mui/icons-material';
import { useStayData } from "@/lib/utils";

export default function DashboardOverview() {
  const { stats } = useStayData();

  const progressPercentage = (stats.daysUsed / 183) * 100;
  const showWarning = progressPercentage >= 70;

  return (
    <Box sx={{ mb: 4 }}>
      {/* Warning Progress Card - Show at top when warning is active */}
      {stats.daysRemaining < 30 && (
        <Card 
          elevation={0} 
          sx={{ 
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: '20px', sm: '24px' },
            border: '2px solid #FF9500',
            background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.15) 0%, rgba(255, 59, 48, 0.08) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 12px 40px rgba(255, 149, 0, 0.25), 0 6px 20px rgba(255, 149, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 59, 48, 0.05) 100%)',
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-30%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 149, 0, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 0,
            }
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 }, position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.25, sm: 1.5 } }}>
              <Warning sx={{ 
                mr: { xs: 1, sm: 1.25 }, 
                color: '#FF9500', 
                fontSize: { xs: '1.25rem', sm: '1.5rem' } 
              }} />
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 700,
                  color: '#FF6D00',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  letterSpacing: '-0.01em'
                }}
              >
                Visa Limit Warning
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ 
              mb: { xs: 2, sm: 2.5 }, 
              color: '#E65100', 
              fontWeight: 500,
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              lineHeight: 1.3
            }}>
              You're approaching the 183-day annual limit!
            </Typography>
            <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{
                  height: { xs: 8, sm: 10 },
                  borderRadius: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #FF9500 0%, #FF3B30 100%)',
                    boxShadow: '0 2px 8px rgba(255, 149, 0, 0.4)',
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{
                color: '#E65100',
                fontSize: { xs: '0.8rem', sm: '0.85rem' },
                fontWeight: 500
              }}>
                {stats.daysUsed} / 183 days used
              </Typography>
              <Chip
                label={`${stats.daysRemaining} days left`}
                sx={{
                  backgroundColor: '#FF9500',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  padding: { xs: '6px 12px', sm: '8px 16px' },
                  height: 'auto',
                  borderRadius: { xs: '12px', sm: '16px' },
                  boxShadow: '0 4px 12px rgba(255, 149, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Normal Progress Card - Show first when not in warning state */}
      {stats.daysRemaining >= 30 && (
        <Card 
          elevation={0} 
          sx={{ 
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: '20px', sm: '24px' },
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
              <Schedule sx={{ 
                mr: { xs: 1, sm: 1.5 }, 
                color: '#007AFF', 
                fontSize: { xs: '1.5rem', sm: '1.75rem' } 
              }} />
              <Typography variant="h6" component="h3" sx={{ 
                fontWeight: 700, 
                color: '#1C1C1E',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                letterSpacing: '-0.01em'
              }}>
                Progress Tracking
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ 
              mb: 3,
              color: '#8E8E93',
              fontSize: '0.9rem',
              lineHeight: 1.4
            }}>
              Days used in rolling 365-day period
            </Typography>
            <Box sx={{ mb: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{
                  height: 10,
                  borderRadius: 8,
                  backgroundColor: 'rgba(142, 142, 147, 0.12)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #007AFF 0%, #5AC8FA 100%)',
                    boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)',
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ 
                color: '#8E8E93',
                fontSize: '0.9rem',
                fontWeight: 500
              }}>
                {stats.daysUsed} / 183 days used
              </Typography>
              <Chip
                label={`${stats.daysRemaining} days left`}
                sx={{
                  backgroundColor: '#007AFF',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  height: 'auto',
                  borderRadius: '14px',
                  boxShadow: '0 3px 10px rgba(0, 122, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        {/* Days Used Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card 
            elevation={0}
            sx={{
              borderRadius: { xs: '16px', sm: '20px' },
              backdropFilter: 'blur(40px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                minHeight: { xs: '50px', sm: '60px' }
              }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ 
                    mb: { xs: 0.25, sm: 0.5 },
                    color: '#8E8E93',
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                    textTransform: 'uppercase'
                  }}>
                    Used
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ 
                    fontWeight: 800, 
                    color: '#1C1C1E',
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 0.85
                  }}>
                    {stats.daysUsed}
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: { xs: 36, sm: 40 }, 
                  height: { xs: 36, sm: 40 }, 
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)', 
                  borderRadius: { xs: '10px', sm: '12px' }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 3px 12px rgba(0, 122, 255, 0.25)',
                }}>
                  <CalendarToday sx={{ 
                    color: 'white', 
                    fontSize: { xs: 16, sm: 18 },
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
                  }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Days Remaining Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card 
            elevation={0}
            sx={{
              borderRadius: { xs: '18px', sm: '20px' },
              backdropFilter: 'blur(40px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(52, 199, 89, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(52, 199, 89, 0.2)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                minHeight: { xs: '50px', sm: '60px' }
              }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ 
                    mb: { xs: 0.25, sm: 0.5 },
                    color: '#8E8E93',
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                    textTransform: 'uppercase'
                  }}>
                    Remaining
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ 
                    fontWeight: 800, 
                    color: '#34C759',
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 0.85
                  }}>
                    {stats.daysRemaining}
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: { xs: 36, sm: 40 }, 
                  height: { xs: 36, sm: 40 }, 
                  background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)', 
                  borderRadius: { xs: '10px', sm: '12px' }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 3px 12px rgba(52, 199, 89, 0.25)',
                }}>
                  <Schedule sx={{ 
                    color: 'white', 
                    fontSize: { xs: 16, sm: 18 },
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
                  }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Annual Limit Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card 
            elevation={0}
            sx={{
              borderRadius: { xs: '18px', sm: '20px' },
              backdropFilter: 'blur(40px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(142, 142, 147, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(142, 142, 147, 0.2)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                minHeight: { xs: '50px', sm: '60px' }
              }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ 
                    mb: { xs: 0.25, sm: 0.5 },
                    color: '#8E8E93',
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                    textTransform: 'uppercase'
                  }}>
                    Limit
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ 
                    fontWeight: 800, 
                    color: '#1C1C1E',
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 0.85
                  }}>
                    183
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: { xs: 36, sm: 40 }, 
                  height: { xs: 36, sm: 40 }, 
                  background: 'linear-gradient(135deg, #8E8E93 0%, #AEAEB2 100%)', 
                  borderRadius: { xs: '10px', sm: '12px' }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 3px 12px rgba(142, 142, 147, 0.25)',
                }}>
                  <Flag sx={{ 
                    color: 'white', 
                    fontSize: { xs: 16, sm: 18 },
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
                  }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


    </Box>
  );
}
