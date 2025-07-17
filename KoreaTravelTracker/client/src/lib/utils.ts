import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import { type Stay } from "@shared/schema";
import { differenceInDays, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useStayData() {
  const { data: stays = [] } = useQuery<Stay[]>({
    queryKey: ["/api/stays"],
    retry: false,
  });

  const calculateStats = () => {
    if (stays.length === 0) {
      return {
        daysUsed: 0,
        daysRemaining: 183,
        progressPercentage: 0
      };
    }

    const today = new Date();
    const oneYearAgo = subDays(today, 365);

    // Calculate days used within the rolling 365-day period
    let daysUsed = 0;

    stays.forEach(stay => {
      const entryDate = new Date(stay.entryDate);
      const exitDate = new Date(stay.exitDate);

      // Check if stay overlaps with the rolling 365-day period
      if (entryDate <= today && exitDate >= oneYearAgo) {
        // Calculate the overlap period
        const overlapStart = entryDate > oneYearAgo ? entryDate : oneYearAgo;
        const overlapEnd = exitDate < today ? exitDate : today;
        
        const overlapDays = differenceInDays(overlapEnd, overlapStart) + 1;
        daysUsed += overlapDays > 0 ? overlapDays : 0;
      }
    });

    const daysRemaining = Math.max(0, 183 - daysUsed);
    const progressPercentage = (daysUsed / 183) * 100;

    return {
      daysUsed,
      daysRemaining,
      progressPercentage
    };
  };

  const stats = calculateStats();

  return { stats };
}
