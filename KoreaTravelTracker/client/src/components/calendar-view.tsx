import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
  Chip,
  Tooltip
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  CalendarMonth
} from '@mui/icons-material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type Stay } from '@shared/schema';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, subDays } from 'date-fns';

export default function CalendarView() {
  // Initialize with 2 months after today as the default end date
  const today = new Date();
  const defaultEndDate = new Date(today);
  defaultEndDate.setMonth(today.getMonth() + 2);
  
  const [endDate, setEndDate] = useState(defaultEndDate);
  
  const { data: stays = [] } = useQuery<Stay[]>({
    queryKey: ["/api/stays"],
  });

  const navigateMonths = (direction: 'prev' | 'next') => {
    setEndDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getRollingMonths = () => {
    const months = [];
    // Calculate how many months to show (keeping 16 for layout)
    for (let i = 15; i >= 0; i--) {
      const monthDate = new Date(endDate);
      monthDate.setMonth(endDate.getMonth() - i);
      months.push(monthDate);
    }
    return months;
  };

  const getStaysForDay = (day: Date) => {
    return stays.filter(stay => {
      const entryDate = new Date(stay.entryDate);
      const exitDate = new Date(stay.exitDate);
      // Include entry date by checking if day equals entry date OR is within the interval
      return isSameDay(day, entryDate) || isWithinInterval(day, { start: entryDate, end: exitDate });
    });
  };

  const getDayColor = (day: Date) => {
    const today = new Date();
    const yearAgoFromToday = subDays(today, 365);
    
    // Check if day is within the critical 365-day window ending today
    const isWithinCriticalWindow = day >= yearAgoFromToday && day <= today;
    
    // Always show yellow background for 365-day window, transparent otherwise
    return isWithinCriticalWindow ? 'rgba(255, 235, 59, 0.15)' : 'transparent';
  };

  const hasStayOnDay = (day: Date) => {
    return getStaysForDay(day).length > 0;
  };

  const getWeekdays = () => {
    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  };

  const getCalendarDaysForMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const firstDayOfMonth = monthStart.getDay();
    
    // Create array with empty slots for previous month days and actual month days
    const calendarDays: (Date | null)[] = [];
    
    // Add empty slots for days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    
    // Add actual month days
    monthDays.forEach(day => {
      calendarDays.push(day);
    });
    
    // Pad to complete weeks (42 total cells = 6 weeks)
    while (calendarDays.length < 42) {
      calendarDays.push(null);
    }

    return calendarDays;
  };



  const renderMiniMonth = (monthDate: Date) => {
    const allCalendarDays = getCalendarDaysForMonth(monthDate);

    return (
      <Card 
        key={format(monthDate, 'yyyy-MM')}
        elevation={0}
        sx={{ 
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          height: '100%'
        }}
      >
        <CardContent className="pt-[4px] pb-[4px]" sx={{ 
          p: { xs: 0.75, sm: 1.5 }, 
          pt: 0,
          pb: 0
        }}>
          {/* Month Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            mb: { xs: 0.5, sm: 1 },
            borderTop: { xs: '2px solid', sm: '3px solid' },
            borderTopColor: 'primary.main',
            pt: { xs: 0.25, sm: 0.5 }
          }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600, 
                color: 'primary.main',
                fontSize: { xs: '0.7rem', sm: '0.875rem' }
              }}
            >
              {format(monthDate, 'MMM yyyy')}
            </Typography>
          </Box>

          {/* Weekday Headers */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: { xs: 0.125, sm: 0.25 }, 
            mb: { xs: 0.25, sm: 0.5 } 
          }}>
            {getWeekdays().map((day, index) => (
              <Box 
                key={`${day}-${index}`}
                sx={{ 
                  textAlign: 'center',
                  py: { xs: 0.125, sm: 0.25 }
                }}
              >
                <Typography variant="caption" sx={{ 
                  fontSize: { xs: '0.5rem', sm: '0.6rem' }, 
                  fontWeight: 500, 
                  color: 'rgba(0, 0, 0, 0.3)' 
                }}>
                  {day}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Calendar Days */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
            {allCalendarDays.map((day, index) => {
              // If day is null (empty slot), render empty cell
              if (!day) {
                return (
                  <Box
                    key={`empty-${index}`}
                    sx={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                );
              }

              const isToday = isSameDay(day, new Date());
              const dayColor = getDayColor(day);
              const hasStay = hasStayOnDay(day);

              return (
                <Tooltip
                  key={`${format(monthDate, 'yyyy-MM')}-${index}`}
                  title={
                    hasStay 
                      ? `${day > new Date() ? 'Planned stay' : 'Past stay'} on ${format(day, 'MMM d, yyyy')}`
                      : ''
                  }
                  arrow
                >
                  <Box
                    sx={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: dayColor,
                      cursor: hasStay ? 'pointer' : 'default',
                      minHeight: { xs: '20px', sm: '24px' },
                      position: 'relative',
                      border: isToday ? '2px solid' : 'none',
                      borderColor: isToday ? 'error.main' : 'transparent',
                      '&:hover': hasStay ? {
                        backgroundColor: 'primary.light',
                        opacity: 0.8
                      } : {}
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: hasStay ? 'white' : 'text.primary',
                        fontWeight: isToday ? 600 : 400,
                        fontSize: { xs: '0.55rem', sm: '0.65rem' },
                        zIndex: 2,
                        position: 'relative'
                      }}
                    >
                      {format(day, 'd')}
                    </Typography>
                    
                    {/* Different indicators for past vs future stays */}
                    {hasStay && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60%',
                          height: '60%',
                          backgroundColor: day > new Date() ? 'rgba(0, 122, 255, 0.8)' : 'rgba(244, 67, 54, 0.8)',
                          borderRadius: '50%',
                          zIndex: 1
                        }}
                      />
                    )}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card 
      elevation={0}
      sx={{
        borderRadius: { xs: '20px', sm: '24px' },
        backdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      <CardContent className="pt-[4px] pb-[4px]" sx={{ p: { xs: 1.5, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <CalendarMonth sx={{ mr: 1, color: 'primary.main', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
            <Typography variant="h6" component="h2" sx={{ 
              fontWeight: 500, 
              fontSize: { xs: '1rem', sm: '1.25rem' } 
            }}>
              Rolling Calendar
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            <IconButton 
              onClick={() => navigateMonths('prev')} 
              size="small"
              sx={{ 
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  backgroundColor: 'rgba(0, 122, 255, 0.2)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                },
                p: { xs: 0.75, sm: 1 }
              }}
            >
              <ChevronLeft sx={{ 
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, 
                color: '#007AFF' 
              }} />
            </IconButton>
            <Box 
              sx={{ 
                minWidth: { xs: 180, sm: 250 }, 
                textAlign: 'center',
                cursor: 'pointer',
                p: { xs: 0.75, sm: 1.25 },
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                }
              }}
              onClick={() => {
                const today = new Date();
                const resetDate = new Date(today);
                resetDate.setMonth(today.getMonth() + 2);
                setEndDate(resetDate);
              }}
            >
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '0.8rem', sm: '1rem' },
                color: '#1C1C1E',
                letterSpacing: '-0.01em'
              }}>
                {(() => {
                  const startMonth = new Date(endDate);
                  startMonth.setMonth(endDate.getMonth() - 15);
                  return `${format(startMonth, 'MMM yyyy')} - ${format(endDate, 'MMM yyyy')}`;
                })()}
              </Typography>
            </Box>
            <IconButton 
              onClick={() => navigateMonths('next')} 
              size="small"
              sx={{ 
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  backgroundColor: 'rgba(0, 122, 255, 0.2)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                },
                p: { xs: 0.75, sm: 1 }
              }}
            >
              <ChevronRight sx={{ 
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, 
                color: '#007AFF' 
              }} />
            </IconButton>
          </Box>
        </Box>

        {/* Rolling Calendar Grid - Responsive layout */}
        <Grid container spacing={{ xs: 0.75, sm: 1.5 }}>
          {getRollingMonths().map(monthDate => (
            <Grid key={format(monthDate, 'yyyy-MM')} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
              {renderMiniMonth(monthDate)}
            </Grid>
          ))}
        </Grid>

        {/* Legend */}
        <Box sx={{ 
          mt: { xs: 2, sm: 3 }, 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, sm: 2 }, 
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          <Typography variant="caption" color="text.secondary" sx={{ 
            fontSize: { xs: '0.65rem', sm: '0.75rem' } 
          }}>
            Legend:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box 
              sx={{ 
                width: { xs: 10, sm: 12 }, 
                height: { xs: 10, sm: 12 }, 
                backgroundColor: 'rgba(255, 235, 59, 0.15)',
                borderRadius: 0.5,
                border: '1px solid rgba(255, 235, 59, 0.3)'
              }} 
            />
            <Typography variant="caption" sx={{ 
              fontSize: { xs: '0.6rem', sm: '0.75rem' } 
            }}>365-day window</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box 
              sx={{ 
                width: { xs: 10, sm: 12 }, 
                height: { xs: 10, sm: 12 }, 
                backgroundColor: 'rgba(244, 67, 54, 0.8)',
                borderRadius: '50%'
              }} 
            />
            <Typography variant="caption" sx={{ 
              fontSize: { xs: '0.6rem', sm: '0.75rem' } 
            }}>Past stays</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box 
              sx={{ 
                width: { xs: 10, sm: 12 }, 
                height: { xs: 10, sm: 12 }, 
                backgroundColor: 'rgba(0, 122, 255, 0.8)',
                borderRadius: '50%'
              }} 
            />
            <Typography variant="caption" sx={{ 
              fontSize: { xs: '0.6rem', sm: '0.75rem' } 
            }}>Future stays</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box 
              sx={{ 
                width: { xs: 10, sm: 12 }, 
                height: { xs: 10, sm: 12 }, 
                border: '1px solid',
                borderColor: 'error.main',
                borderRadius: 0.5
              }} 
            />
            <Typography variant="caption" sx={{ 
              fontSize: { xs: '0.6rem', sm: '0.75rem' } 
            }}>Today</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Yellow highlights the critical 365-day window • Red circles show stay days that overlap on the yellow background
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}