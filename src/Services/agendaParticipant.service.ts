import { httpClient } from "~/Utils/http-client";

import {
  AgendaParticipantInterface,
  AgendaParticipantPayloadInterface,
} from "~/Types/AgendaParticipant";
import { BaseListResponse, BaseResponse } from "~/Types/Response";
import { RequestFilterInterface } from "~/Types/Request";

export const getAgendaParticipantList = async (
  params: RequestFilterInterface = {}
): Promise<BaseListResponse<AgendaParticipantInterface>> => {
  try {
    const { data } = await httpClient.post(
      "/agenda-participant/filter",
      params
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAgendaParticipantDetail = async (
  id?: string
): Promise<BaseResponse<AgendaParticipantInterface>> => {
  try {
    const { data } = await httpClient.get(`/agenda-participant/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const createAgendaParticipant = async (
  payload: AgendaParticipantInterface
) => {
  try {
    const { data } = await httpClient.post("/agenda-participant", payload);

    if (data?.Succeeded === false) {
      throw new Error(data.Message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateAgendaParticipant = async (
  id: string,
  payload: AgendaParticipantPayloadInterface
): Promise<BaseResponse<string>> => {
  try {
    const { data } = await httpClient.put(`/agenda-participant/${id}`, payload);

    if (data?.Succeeded === false) {
      throw new Error(data.Message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAgendaParticipant = async (id: string) => {
  try {
    const { data } = await httpClient.delete(`/agenda-participant/${id}`);

    if (data?.Succeeded === false) {
      throw new Error(data.Message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
