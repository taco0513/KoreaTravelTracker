import { useState } from "react";
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  Grid,
  Button,
  IconButton
} from '@mui/material';
import { FlightTakeoff } from '@mui/icons-material';
import DashboardOverview from "@/components/dashboard-overview";
import AddStayForm from "@/components/add-stay-form";
import StaysList from "@/components/stays-list";
import StatsSection from "@/components/stats-section";
import EditStayModal from "@/components/edit-stay-modal";
import CalendarView from "@/components/calendar-view";
import { useStayData } from "@/lib/utils";
import type { Stay } from "@shared/schema";

export default function Home() {
  const [editingStay, setEditingStay] = useState<Stay | null>(null);
  const { stats } = useStayData();

  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* iOS Style App Bar */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(40px)',
          color: 'text.primary',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderRadius: 0
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
          <FlightTakeoff sx={{ 
            mr: { xs: 1, sm: 2 }, 
            color: '#007AFF', 
            fontSize: { xs: '1.25rem', sm: '1.5rem' } 
          }} />
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '-0.01em',
              color: '#1C1C1E'
            }}
          >
            Korea Stay Tracker
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontSize: '0.875rem'
            }}
          >
            {currentYear}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 }, 
          px: { xs: 2, sm: 3 } 
        }}
      >
        {/* Dashboard Overview */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <DashboardOverview />
        </Box>

        {/* Calendar View */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <CalendarView />
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <AddStayForm />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <StaysList onEdit={setEditingStay} />
          </Grid>
        </Grid>

        {/* Stats Section */}
        <StatsSection />
      </Container>

      {/* Edit Modal */}
      {editingStay && (
        <EditStayModal
          stay={editingStay}
          onClose={() => setEditingStay(null)}
        />
      )}
    </Box>
  );
}
