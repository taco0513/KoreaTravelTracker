import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertStaySchema, type InsertStay } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";

export default function AddStayForm() {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const { control, handleSubmit, reset, setError, formState: { errors } } = useForm<InsertStay>({
    resolver: zodResolver(insertStaySchema),
    defaultValues: {
      entryDate: "",
      exitDate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertStay) => {
      const response = await apiRequest("POST", "/api/stays", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stays"] });
      reset();
      setSnackbar({
        open: true,
        message: "Stay entry added successfully",
        severity: "success"
      });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: error.message || "Failed to add stay entry",
        severity: "error"
      });
    },
  });

  const onSubmit = (data: InsertStay) => {
    // No future date validation - allow both past and future stays
    mutation.mutate(data);
  };

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
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2.5, sm: 3 } }}>
            <Add sx={{ 
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
              Add Stay Entry
            </Typography>
          </Box>
          
          <Typography variant="body2" sx={{ 
            mb: { xs: 1.5, sm: 2 },
            color: '#8E8E93',
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            lineHeight: 1.4
          }}>
            Add past completed stays or future planned stays to track your 183-day visa limit
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3 } }}>
            <Controller
              name="entryDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Entry Date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.entryDate}
                  helperText={errors.entryDate?.message}
                />
              )}
            />

            <Controller
              name="exitDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Exit Date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.exitDate}
                  helperText={errors.exitDate?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={mutation.isPending}
              startIcon={<Add />}
              size="large"
              sx={{ 
                py: 1.75,
                px: 3,
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(145deg, #007AFF, #5AC8FA)',
                boxShadow: '0 6px 20px rgba(0, 122, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(145deg, #0051D5, #007AFF)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 122, 255, 0.4)',
                },
                '&:disabled': {
                  background: 'linear-gradient(145deg, #8E8E93, #AEAEB2)',
                  transform: 'none',
                  boxShadow: '0 2px 8px rgba(142, 142, 147, 0.2)',
                }
              }}
            >
              {mutation.isPending ? "Adding..." : "Add Stay Entry"}
            </Button>
          </Box>
        </CardContent>
      </Card>

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
