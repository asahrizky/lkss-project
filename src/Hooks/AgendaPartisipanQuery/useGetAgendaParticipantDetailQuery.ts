import { useQuery } from "@tanstack/react-query";

import { getAgendaParticipantDetail } from "~/Services/agendaParticipant.service";

export default function useGetAgendaParticipantDetailQuery(
  selectedAgendaId?: string
) {
  return useQuery(
    [`/agenda-participant/${selectedAgendaId}`],
    () => getAgendaParticipantDetail(selectedAgendaId),
    {
      enabled: !!selectedAgendaId,
    }
  );
}
