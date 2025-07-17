import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateStaySchema, type UpdateStay, type Stay } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface EditStayModalProps {
  stay: Stay;
  onClose: () => void;
}

export default function EditStayModal({ stay, onClose }: EditStayModalProps) {
  const { toast } = useToast();

  const form = useForm<UpdateStay>({
    resolver: zodResolver(updateStaySchema),
    defaultValues: {
      id: stay.id,
      entryDate: stay.entryDate,
      exitDate: stay.exitDate,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateStay) => {
      const response = await apiRequest("PUT", `/api/stays/${stay.id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stays"] });
      onClose();
      toast({
        title: "Success",
        description: "Stay entry updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update stay entry.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UpdateStay) => {
    // No future date validation - allow both past and future stays
    mutation.mutate(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Edit Stay Entry
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">Entry Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exitDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">Exit Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
                >
                  {mutation.isPending ? "Updating..." : "Update Stay"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
