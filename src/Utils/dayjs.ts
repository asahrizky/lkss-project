import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import locale from "antd/locale/id_ID";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Jakarta");

export const FORMAT_DATE = {
  DDMMYY: "DD MMMM YYYY",
  DDMMYY_HHMM: "DD MMMM YYYY HH:mm",
  DDMMYY_HHMMSS: "DD MMMM YYYY HH:mm:ss",
  DDMMYY_HHMMSS_Z: "DD MMMM YYYY HH:mm:ss Z",
  "YYYY-MM-DDTHH:mm:ssZ": "YYYY-MM-DDTHH:mm:ssZ",
};

export const localeData = locale;
export const dayJsConfigured = dayjs;
