const isNullOrEmpty = (input: any): input is null =>
  !input ||
  input === undefined ||
  input === '' ||
  input?.length == 0 ||
  (typeof input === 'string' && input.trim().length === 0);
const isArray = (input: unknown): input is unknown[] => Array.isArray(input);
const isObject = (input: unknown): input is Object =>
  input === Object(input) && !isArray(input) && typeof input !== 'function';
const isNumber = (input: string): boolean => /^\d+\.?\d*$/.test(input);
const isUrl = (input: string): boolean => /(http(s?)):\/\//i.test(input);

export const validationUtil = {
  isNullOrEmpty,
  isObject,
  isArray,
  isUrl,
  isNumber,
};
