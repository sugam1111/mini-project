import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReport, deleteReport, getReports, updateReport } from "../helper";

export function useReportsQuery() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReport,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reports"] }),
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReport,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reports"] }),
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReport,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reports"] }),
  });
}