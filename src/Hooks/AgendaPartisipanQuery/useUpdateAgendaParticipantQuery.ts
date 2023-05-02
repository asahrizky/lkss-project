import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAgendaParticipant } from "~/Services/agendaParticipant.service";
import { AgendaParticipantPayloadInterface } from "~/Types/AgendaParticipant";

export default function useUpdateAgendaMutation(selectedAgendaId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: AgendaParticipantPayloadInterface) =>
      updateAgendaParticipant(selectedAgendaId, payload),
    {
      onSuccess: () => {
        // 1
        queryClient.invalidateQueries(["/agenda-participant/filter"], {
          exact: false,
          predicate: (key) => key.queryKey[0] === "/agenda-participant/filter",
        });

        // 2.
        queryClient.invalidateQueries([`/agenda/${selectedAgendaId}`]);
      },
    }
  );
}
