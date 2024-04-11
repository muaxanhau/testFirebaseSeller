import dayjs from 'dayjs';
import {values} from 'values';

type DataType = Date | string | number;

const now = () => new Date(Date.now());

/**
 * convert Date to string with formatter
 * @param date Date
 * @param formatter Ex: 'DD-MM-YYYY'
 * @returns date string
 */
const getDay = (date: DataType, formatter = values.defaultDayFormatter) =>
  dayjs(date).format(formatter);

/**
 * convert Date to string with formatter
 * @param date Date
 * @param formatter Ex: 'HH:mm:ss'
 * @returns time string
 */
const getTime = (date: DataType, formatter = values.defaultTimeFormatter) =>
  dayjs(date).format(formatter);

/**
 * convert Date to string with formatter
 * @param date Date
 * @param formatter Ex: 'DD-MM-YYYY HH:mm:ss'
 * @returns day with time string
 */
const getDayTime = (
  date: DataType,
  formatter = values.defaultDayTimeFormatter,
) => dayjs(date).format(formatter);

export const dateUtil = {
  now,
  getDay,
  getTime,
  getDayTime,
};
