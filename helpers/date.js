import dayjs, { locale } from "dayjs";
import "dayjs/locale/fr.js";
import * as relativeTime from "dayjs/plugin/relativeTime.js";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

// dayjs.extend(relativeTime).extend(isSameOrBefore).locale("fr");

export const dateFormatted = ({ date, format }) => {
  return dayjs(date).format(format);
};

export const dateToNow = (date) => {
  return dayjs(date).fromNow();
};

export const fromNow = (date) => {
  return dayjs(date).toNow();
};
export const checkIfDateIsBefore = (date) => {
  return "";
  // @todo
  // return dayjs().isSameOrBefore(dayjs(date));
};
