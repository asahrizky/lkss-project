import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAgenda } from "~/Services/agenda.service";

export default function useDeleteAgendaMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteAgenda, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/agenda/filter"], {
        exact: false,
        predicate: (key) => key.queryKey[0] === "/agenda/filter",
      });
    },
  });
}
