import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAgendaParticipant } from "~/Services/agendaParticipant.service";

export default function useDeleteAgendaParticipant() {
  const queryClient = useQueryClient();

  return useMutation(deleteAgendaParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/agenda-participant/filter"], {
        exact: false,
        predicate: (key) => key.queryKey[0] === "/agenda-participant/filter",
      });
    },
  });
}
