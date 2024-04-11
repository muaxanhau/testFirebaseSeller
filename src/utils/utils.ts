import {config} from 'config';
import {Linking, Platform} from 'react-native';
import {z} from 'zod';
import {images, valueStyles} from 'values';
import {validationUtil} from './validation.util';
import {AxiosError, AxiosResponse} from 'axios';
import {ErrorResponseBaseModel} from 'models';

const isIos = () => Platform.OS === 'ios';
const isAndroid = () => Platform.OS === 'android';
const osVersion = () => {
  if (Platform.OS === 'ios') {
    const ver = parseFloat(Platform.Version);
    return ver;
  }
  if (Platform.OS === 'android') {
    return Platform.Version;
  }
  return -1;
};
const openSettings = () => {
  if (isIos()) {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

function* generatorIncreaseIndex() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
const generator = generatorIncreaseIndex();

const getUniqueKey = (): string => {
  const {value} = generator.next();
  const uniqueKey = `key-${value}`;
  return uniqueKey;
};

const random = (max = 10, min = 0): number =>
  max < min ? 0 : Math.floor(Math.random() * (max - min)) + min;

const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

/**
 * Round a number to a given number of decimal places, defaulting to 0.
 * @param {number} number - The number to round.
 * @param [fixed=0] - The number of decimal places to round to.
 */
const round = (number: number, fixed = 0): number => -(-number.toFixed(fixed));

const numberOfCharInString = (ch: string, str: string) =>
  (str.match(new RegExp(ch, 'g')) || []).length;

/**
 * add 0 before number in case length of number < totalLength
 * @param num
 * @param totalLength min length 'string' of num
 */
const padWithLeadingZeros = (num: number, totalLength: number) => {
  const numString = num.toString();
  if (numString.length >= totalLength) {
    return numString;
  }

  const zeroFilled = `${'0'.repeat(totalLength)}${numString}`.slice(
    -totalLength,
  );
  return zeroFilled;
};

/**
 * We're going to loop through the array, and for each element, we're going to swap it with a random
 * element in the array
 * @param array - The array to shuffle.
 * @returns A function that takes an array as an argument and returns a shuffled array.
 */
const shuffleArray = <T>(array: Array<T>): Array<T> => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

/**
 * It takes an array, filters it, and returns a new array with only unique values
 * @param {any[]} arr - any[] - The array we want to filter
 */
const uniqueValueArray = <T>(arr: Array<T>): Array<T> =>
  arr.filter((value, index, self) => self.indexOf(value) === index);

/**
 * deep compare anything
 * @param a any
 * @param b any
 * @returns true if a === b otherwise false
 */
const deepCompare = (a: any, b: any): boolean => {
  if (typeof a !== typeof b) {
    return false;
  }

  if (validationUtil.isArray(a) && validationUtil.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((entry, index) => deepCompare(entry, b[index]));
  }

  if (validationUtil.isObject(a)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    return Object.keys(a).every(key => deepCompare(a[key], b[key]));
  }

  if (typeof a === 'function') {
    return true;
  }

  return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * deep clone new item
 * @param item
 * @returns
 */
const deepClone = <T>(item: T): T => {
  if (!item) {
    return item;
  }

  const type = ['boolean', 'number', 'string', 'function'];
  if (type.indexOf(typeof item) > -1) {
    return item;
  }

  if (validationUtil.isArray(item)) {
    const tmpArr = item.map(x => deepClone(x));
    return tmpArr as T;
  }

  if (validationUtil.isObject(item)) {
    let tmpObj = {};
    const keys = Object.keys(item);
    keys.forEach(key => {
      Object.assign(tmpObj, {[key]: deepClone(Object(item)[key])});
    });

    return tmpObj as T;
  }

  return JSON.parse(JSON.stringify(item));
};

/**
 * console.log effect
 * @param message
 * @param type
 */
const log = (
  message: any,
  note?: string,
  type: 'default' | 'danger' | 'warning' | 'highlight' = 'default',
) => {
  if (!config.enableLog) {
    return;
  }

  note?.length && console.log(`%c${note}`, 'color: gray; font-size: 8px');

  if (type === 'default') {
    console.log(message);
    return;
  }
  if (type === 'danger') {
    console.error(message);
    return;
  }
  if (type === 'warning') {
    console.warn(message);
    return;
  }
  if (type === 'highlight') {
    console.log(`%c${message}`, 'color: violet; font-size: larger');
    return;
  }
};
const logResponse = (
  res: AxiosResponse | AxiosError<ErrorResponseBaseModel>,
) => {
  const {config} = res;
  const {method, baseURL, url, headers, params, data: body} = config!;

  let result = '';
  if (res instanceof AxiosError) {
    const {response} = res;
    result = `ERROR: ${response?.data.message.join('\n') || res.message}`;
  } else {
    const {data} = res;
    result = `RESPONSE: ${JSON.stringify(data)}`;
  }

  console.log(
    `==> ${
      method?.toUpperCase() || 'GET'
    } <=====================================================
        \n\t- url: ${baseURL}${url}\n\t- header: ${JSON.stringify(
      headers,
    )}\n\t- params: ${JSON.stringify(params)}\n\t- body: ${JSON.stringify(
      body,
    )}\n\n\t=> ${result}\n_`,
  );
};

/**
 * Sleep is a function that takes a number of milliseconds and returns a promise that resolves after
 * that number of milliseconds.
 * @param {number} ms - number - The number of milliseconds to sleep.
 */
const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(0), ms));

/**
 * It takes a base size, and returns a responsive size based on the current device's height
 * @param {number} size - the size of the font in the root device
 * @returns A function that takes a baseSize and returns a number.
 */
const getResponsiveSize = (size: number): number => {
  const scale = 1.1; // only modify root size here

  const rootWidth = 375; // root device's width (follow design)
  const rootHeight = 812; // root device's height (follow design)

  const ratio = valueStyles.width / rootWidth; // <= or
  // const ratio = valueStyles.height / rootHeight // <= or

  const minSizeRatio = 0.8;
  const maxSizeRatio = 2.1;

  const realSize = round(ratio * size * scale);

  return clamp(realSize, size * minSizeRatio, size * maxSizeRatio);
};

/**
 * percentage of screen width
 * @param percent 0 <= percent <= 100
 * @returns width
 */
const wp = (percent: number) => {
  const screenWidth = valueStyles.width;
  if (percent < 0 || percent > 100) {
    return screenWidth;
  }
  const widthPercent = (screenWidth * percent) / 100;
  return widthPercent;
};
/**
 * percentage of screen height
 * @param percent 0 <= percent <= 100
 * @returns height
 */
const hp = (percent: number) => {
  const screenHeight = valueStyles.height;
  if (percent < 0 || percent > 100) {
    return screenHeight;
  }
  const heightPercent = (screenHeight * percent) / 100;
  return heightPercent;
};

/**
 * make color to opacity color
 * @param hexColorString hex string
 * @param opacity 0 <= opacity <=1
 * @returns
 */
const opacityColor = (hex: string, opacity = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const clr = `rgba(${r},${g},${b},${opacity})`;
  return clr;
};

/**
 * check url
 * @param url url of image
 * @returns
 */
const imageUrl = (url?: string) => {
  const source =
    !!url?.length && validationUtil.isUrl(url) ? {uri: url} : images.null;
  return source;
};

/**
 * ****************************************************************
 * ****************************************************************
 * generic tools
 * ****************************************************************
 * ****************************************************************
 */

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type TransformSchemaToModel<T extends z.Schema> = Prettify<z.infer<T>>;

/**
 * ****************************************************************
 * ****************************************************************
 * export
 * ****************************************************************
 * ****************************************************************
 */

export const utils = {
  isIos,
  isAndroid,
  osVersion,
  openSettings,
  getUniqueKey,
  random,
  clamp,
  round,
  numberOfCharInString,
  padWithLeadingZeros,
  shuffleArray,
  uniqueValueArray,
  deepCompare,
  deepClone,
  log,
  logResponse,
  sleep,
  getResponsiveSize,
  wp,
  hp,
  opacityColor,
  imageUrl,
};

export type {Prettify, TransformSchemaToModel};
