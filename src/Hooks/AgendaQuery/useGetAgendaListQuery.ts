import { useQuery } from "@tanstack/react-query";

import { getAgendaList } from "~/Services/agenda.service";

import { FilterType } from "~/Types/Request";
import { BaseListResponse } from "~/Types/Response";
import { AgendaInterface } from "~/Types/Agenda";

export default function useGetAgendaListQuery(search?: string) {
  // 1. Ini buat nampung filter dari search
  let filters: FilterType[] = [];

  // 2. Ini buat ngecek apakah ada search atau tidak, klo ada maka ngepush ke filters
  if (!!search) {
    filters = [
      {
        field: "name",
        type: "string",
        comparisonOperator: "contains",
        value: search,
      },
    ];
  }

  // 3. Ini libary untuk mendukung caching dan data fetching pake react-query bisa dilihat di dokumentasi react-query https://tanstack.com/query/latest/docs/react/quick-start
  return useQuery<BaseListResponse<AgendaInterface>, any>(
    ["/agenda/filter", search],
    () =>
      // 4. Ini buat ngefetch data dari API pake service yang udah dibuat
      getAgendaList({
        filters,
      })
  );
}
