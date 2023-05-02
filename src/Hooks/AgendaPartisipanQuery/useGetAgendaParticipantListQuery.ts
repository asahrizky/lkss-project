import { useQuery } from "@tanstack/react-query";

import { getAgendaParticipantList } from "~/Services/agendaParticipant.service";
import { AgendaParticipantInterface } from "~/Types/AgendaParticipant";
import { FilterType } from "~/Types/Request";
import { BaseListResponse } from "~/Types/Response";

export default function useGetAgendaParticipantListQuery(
  agendaId?: string,
  search?: string
) {
  let filters: FilterType[] = [];
  const enabledFetch = !!agendaId;

  if (agendaId) {
    filters.push({
      field: "agendaId",
      type: "string",
      comparisonOperator: "eq",
      value: agendaId,
    });
  }

  if (search) {
    filters.push({
      field: "name",
      type: "string",
      comparisonOperator: "like",
      value: search,
    });
  }

  return useQuery<BaseListResponse<AgendaParticipantInterface>, any>(
    ["/agenda-participant/filter", agendaId, search],
    () =>
      getAgendaParticipantList({
        filters,
      }),
    {
      enabled: enabledFetch,
    }
  );
}
