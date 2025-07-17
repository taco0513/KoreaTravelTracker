import { BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type Stay } from "@shared/schema";
import { differenceInDays, format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export default function StatsSection() {
  const { data: stays = [] } = useQuery<Stay[]>({
    queryKey: ["/api/stays"],
  });

  const calculateDuration = (entryDate: string, exitDate: string) => {
    const entry = new Date(entryDate);
    const exit = new Date(exitDate);
    return differenceInDays(exit, entry) + 1;
  };

  // Calculate monthly breakdown for the past 12 months
  const getMonthlyBreakdown = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      
      const monthStays = stays.filter(stay => {
        const entryDate = new Date(stay.entryDate);
        const exitDate = new Date(stay.exitDate);
        
        // Check if the stay overlaps with this month
        return (entryDate <= monthEnd && exitDate >= monthStart);
      });

      const totalDays = monthStays.reduce((sum, stay) => {
        const stayStart = new Date(stay.entryDate);
        const stayEnd = new Date(stay.exitDate);
        
        // Calculate overlap days with the month
        const overlapStart = stayStart > monthStart ? stayStart : monthStart;
        const overlapEnd = stayEnd < monthEnd ? stayEnd : monthEnd;
        
        const overlapDays = differenceInDays(overlapEnd, overlapStart) + 1;
        return sum + (overlapDays > 0 ? overlapDays : 0);
      }, 0);

      months.push({
        month: format(monthDate, "MMMM yyyy"),
        days: totalDays
      });
    }
    
    return months.filter(m => m.days > 0).slice(-3); // Show last 3 months with stays
  };

  const monthlyBreakdown = getMonthlyBreakdown();

  return null;
}
