import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgenda } from "~/Services/agenda.service";

export default function useCreateAgendaMutation() {
  const queryClient = useQueryClient();

  return useMutation(createAgenda, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/agenda/filter"], {
        exact: false,
        predicate: (key) => key.queryKey[0] === "/agenda/filter",
      });
    },
  });
}
