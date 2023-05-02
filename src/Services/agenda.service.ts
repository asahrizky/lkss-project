import { httpClient } from "~/Utils/http-client";

import { AgendaInterface, AgendaPayloadInterface } from "~/Types/Agenda";
import { BaseListResponse, BaseResponse } from "~/Types/Response";
import { RequestFilterInterface } from "~/Types/Request";

export const getAgendaList = async (
  params: RequestFilterInterface = {}
): Promise<BaseListResponse<AgendaInterface>> => {
  try {
    const { data } = await httpClient.post("/agenda/filter", params);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAgendaDetail = async (
  id?: string
): Promise<BaseResponse<AgendaInterface>> => {
  try {
    const { data } = await httpClient.get(`/agenda/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const createAgenda = async (payload: AgendaPayloadInterface) => {
  try {
    const { data } = await httpClient.post("/agenda", payload);

    if (data?.Succeeded === false) {
      throw new Error(data.Message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateAgenda = async (
  id: string,
  payload: AgendaPayloadInterface
): Promise<BaseResponse<string>> => {
  try {
    const { data } = await httpClient.put(`/agenda/${id}`, payload);

    if (data?.Succeeded === false) {
      throw new Error(data.Message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAgenda = async (id: string) => {
  try {
    const { data } = await httpClient.delete(`/agenda/${id}`);

    if (data?.Succeeded === false) {
      throw new Error(data.Message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// TODO: Tambahin yang lain kalo ada yang butuh di service ini (update, delete, dll)
