import { Dayjs } from "dayjs";

export interface AgendaInterface {
  $id: string;
  name: string;
  description: string;
  agendaType: string;
  agendaDate: string | Date | Dayjs;
  location: string;
  djkLetterNumber: string;
  djkLetterNumberDate: string | Date | Dayjs;
  createdDate: string | Date;
  createdBy: string;
  modifiedDate: string | Date | null;
  modifiedBy: string | null;
  id: string;
}

export interface AgendaPayloadInterface extends AgendaInterface {}
