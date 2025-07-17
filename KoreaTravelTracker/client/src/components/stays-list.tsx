import {
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ViewList, 
  Edit, 
  Delete, 
  ArrowForward 
} from '@mui/icons-material';
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Stay } from "@shared/schema";
import { format, differenceInDays } from "date-fns";
import { useState } from "react";

interface StaysListProps {
  onEdit: (stay: Stay) => void;
}

export default function StaysList({ onEdit }: StaysListProps) {
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; stayId: number | null }>({ open: false, stayId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [showAllStays, setShowAllStays] = useState(false);

  const { data: stays = [], isLoading } = useQuery<Stay[]>({
    queryKey: ["/api/stays"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/stays/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stays"] });
      setSnackbar({
        open: true,
        message: "Stay entry deleted successfully",
        severity: "success"
      });
      setDeleteDialog({ open: false, stayId: null });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: error.message || "Failed to delete stay entry",
        severity: "error"
      });
      setDeleteDialog({ open: false, stayId: null });
    },
  });

  const handleDeleteClick = (id: number) => {
    setDeleteDialog({ open: true, stayId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.stayId) {
      deleteMutation.mutate(deleteDialog.stayId);
    }
  };

  const calculateDuration = (entryDate: string, exitDate: string) => {
    const entry = new Date(entryDate);
    const exit = new Date(exitDate);
    return differenceInDays(exit, entry) + 1;
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d, yyyy");
  };

  if (isLoading) {
    return (
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rounded" height={60} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ 
            p: { xs: 2.5, sm: 3 }, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ViewList sx={{ 
                mr: { xs: 1, sm: 1.5 }, 
                color: '#007AFF', 
                fontSize: { xs: '1.5rem', sm: '1.75rem' } 
              }} />
              <Typography variant="h6" component="h2" sx={{ 
                fontWeight: 700,
                color: '#1C1C1E',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                letterSpacing: '-0.01em'
              }}>
                Recent Stays
              </Typography>
            </Box>
            <Chip 
              label={`${stays.length} entries`} 
              size="small" 
              sx={{
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                color: '#007AFF',
                fontWeight: 600,
                border: '1px solid rgba(0, 122, 255, 0.3)',
                borderRadius: '12px'
              }}
            />
          </Box>

          {stays.length === 0 ? (
            <Box sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ 
                color: '#8E8E93',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                lineHeight: 1.5
              }}>
                No stay entries found. Add your first stay above.
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {(showAllStays ? stays : stays.slice(0, 5)).map((stay, index) => (
                <ListItem 
                  key={stay.id}
                  divider={index < (showAllStays ? stays.length : Math.min(stays.length, 5)) - 1}
                  sx={{ 
                    py: { xs: 1.5, sm: 2 },
                    pr: { xs: 10, sm: 12 } // Add right padding to prevent overlap
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 1, sm: 2 }, 
                        mb: 0.5,
                        flexWrap: { xs: 'wrap', sm: 'nowrap' }
                      }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600,
                          color: '#1C1C1E',
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                          {formatDate(stay.entryDate)}
                        </Typography>
                        <ArrowForward sx={{ 
                          fontSize: { xs: 14, sm: 16 }, 
                          color: '#8E8E93' 
                        }} />
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600,
                          color: '#1C1C1E',
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                          {formatDate(stay.exitDate)}
                        </Typography>
                        <Chip 
                          label={`${calculateDuration(stay.entryDate, stay.exitDate)} days`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(0, 122, 255, 0.1)',
                            color: '#007AFF',
                            fontWeight: 600,
                            border: '1px solid rgba(0, 122, 255, 0.3)',
                            borderRadius: '8px',
                            fontSize: { xs: '0.75rem', sm: '0.8rem' }
                          }}
                        />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
                      <IconButton
                        edge="end"
                        onClick={() => onEdit(stay)}
                        size="small"
                        sx={{ 
                          color: '#007AFF',
                          backgroundColor: 'rgba(0, 122, 255, 0.1)',
                          borderRadius: '8px',
                          p: { xs: 0.75, sm: 1 },
                          '&:hover': {
                            backgroundColor: 'rgba(0, 122, 255, 0.2)',
                          }
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteClick(stay.id)}
                        size="small"
                        sx={{ 
                          color: '#FF3B30',
                          backgroundColor: 'rgba(255, 59, 48, 0.1)',
                          borderRadius: '8px',
                          p: { xs: 0.75, sm: 1 },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 59, 48, 0.2)',
                          }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

          {stays.length > 5 && !showAllStays && (
            <Box sx={{ p: { xs: 2, sm: 2.5 }, textAlign: 'center' }}>
              <Button 
                variant="text" 
                endIcon={<ArrowForward />}
                onClick={() => setShowAllStays(true)}
                sx={{ 
                  color: '#007AFF',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                  }
                }}
              >
                View All Stays
              </Button>
            </Box>
          )}
          {showAllStays && stays.length > 5 && (
            <Box sx={{ p: { xs: 2, sm: 2.5 }, textAlign: 'center' }}>
              <Button 
                variant="text" 
                onClick={() => setShowAllStays(false)}
                sx={{ 
                  color: '#007AFF',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                  }
                }}
              >
                Show Less
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, stayId: null })}
      >
        <DialogTitle>Delete Stay Entry</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this stay entry? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, stayId: null })}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
