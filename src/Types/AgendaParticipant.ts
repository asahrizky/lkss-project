import { Dayjs } from "dayjs";
import { Url } from "url";

export interface AgendaParticipantInterface {
  $id: string;
  name: string;
  address: string;
  nik: string;
  birthDate: string | null;
  birthPlace: string;
  photo: Url;
  agendaId: string;
  participantType: string;
  participantTitle: string;
  agenda: null;
  createdDate: string | Date;
  createdBy: string;
  modifiedDate: string | Date | null;
  modifiedBy: string | null;
  id: string;
}

export interface AgendaParticipantPayloadInterface
  extends AgendaParticipantInterface {}
