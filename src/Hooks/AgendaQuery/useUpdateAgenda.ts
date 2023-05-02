import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAgenda } from "~/Services/agenda.service";
import { AgendaPayloadInterface } from "~/Types/Agenda";

export default function useUpdateAgendaMutation(selectedAgendaId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: AgendaPayloadInterface) =>
      updateAgenda(selectedAgendaId, payload),
    {
      onSuccess: () => {
        // 1
        queryClient.invalidateQueries(["/agenda/filter"], {
          exact: false,
          predicate: (key) => key.queryKey[0] === "/agenda/filter",
        });

        // 2.
        queryClient.invalidateQueries([`/agenda/${selectedAgendaId}`]);
      },
    }
  );
}
