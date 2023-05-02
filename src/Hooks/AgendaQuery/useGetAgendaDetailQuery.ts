import { useQuery } from "@tanstack/react-query";

import { getAgendaDetail } from "~/Services/agenda.service";

export default function useGetAgendaDetailQuery(selectedAgendaId?: string) {
  return useQuery(
    [`/agenda/${selectedAgendaId}`],
    () => getAgendaDetail(selectedAgendaId),
    {
      enabled: !!selectedAgendaId,
    }
  );
}
