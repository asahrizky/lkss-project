import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgendaParticipant } from "~/Services/agendaParticipant.service";

export default function useCreateAgendaParticipantMutation() {
  const queryClient = useQueryClient();

  return useMutation(createAgendaParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/agenda-participant/filter"], {
        exact: false,
        predicate: (key) => key.queryKey[0] === "/agenda-participant/filter",
      });
    },
  });
}
