import { SerializedStyles } from "@emotion/react";
import moment from "moment";
import firebase from "firebase/app";

import { DateType, InputOption, UnknownObject } from "../lib/types";


/**
 * Check if the first parameter is true to render the serialized styles
 * @param valid - The condition to display the css
 * @param value - The css value
 * @returns The css value if the first condition is true
 */
export const conditionalCss = (valid: boolean = false, value: SerializedStyles, elseValue?: SerializedStyles): SerializedStyles | undefined => {
  return valid ? value : elseValue;
};


/**
 * Humanize the string passed in parameters
 * @param str - The string to humanize
 * @returns Humanized string
 */
export const humanize = (str: string): string => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase());
}

/**
 * Format date to human readable
 * @param date - The date to humanize
 * @param removeHours 
 * @returns 
 */
export const formatDate = (date: DateType, removeHours: boolean = false) => {
  if (date instanceof firebase.firestore.Timestamp) {
    date = date.toDate();
  }

  return moment(date).format(`DD/MM/YYYY${removeHours ? "" : " [à] HH[h]mm"}`);
}


/**
 * Format an amount with user preference
 * @param amount - The amount to format
 * @param currency - The currency
 * @returns The formatted amount
 */
export const formatPrice = (amount: number, currency?: string): string => {
  let amountString = (amount / 100).toFixed(2);

  if (amountString.includes(".00")) {
    amountString = amountString.split(".")[0];
  }

  if (currency) {
    const formatter = new Intl.NumberFormat("fr-FR", {
      currency,
      style: "currency",
      useGrouping: true,
    });

    return formatter.format(amount);
  }

  return amountString;
}


/**
 * Format a number to a fixed digit format
 * @param number - The number to format
 * @param digit - The digit to have
 */
export const toFixedDigit = (number: string | number, digit: number = 2): string => {
  const str: string = number.toString();

  return Array(Math.max(0, digit - str.length))
    .fill(0)
    .concat(...str)
    .join("");
};


/**
 * Truncate a text
 * @param text - The text to truncate
 * @param maxLength - The max length of the text
 */
export const truncateString = (text: string = "", maxLength: number = 100): string => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }

  return text;
};


/**
 * Check if the date is expired
 * @param date 
 */
export const isDateExpired = (date?: Date): boolean => {
  if (!date) {
    return true;
  }

  return Date.now() > date.getTime();
}

/**
 * Display an option by its key
 * @param options - List of options
 * @param key - The key to check
 * @param defaultValue - The default value if key does not exists
 * @returns The value of the option
 */
export const displayOptionByKey = (options: InputOption[], key: string | number = "", defaultValue: string = "/") => {
  const keyString: string = key.toString();
  const option: InputOption | undefined = options.find(o => o.key === keyString);

  return option ? option.label : defaultValue;
}

/**
 * Validate an email
 * @param {String} value - The email
 * @returns {Boolean} True if the email is valid
 */
export const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)


interface CompareEntriesOptions {
  strictFalse?: boolean;
}

/**
 * Compare two objects
 * @param objectA - The first object
 * @param objectB - The second object
 * @param options - The options
 * @returns True if objectA is similar to objectB
 */
export const compareEntries = (objectA: unknown, objectB: unknown, options: CompareEntriesOptions = {}): boolean => {
  const {
    strictFalse,
  } = options;

  const hasDifferentValue = !!Object.keys(objectA as UnknownObject).find((key) => {
    const valueA = (objectA as UnknownObject)[key];
    const valueB = (objectB as UnknownObject)[key];

    if (!valueA && !valueB) {
      return strictFalse ? typeof valueA === valueB : false;
    }

    return valueA !== valueB;
  });

  return hasDifferentValue;
}


/**
 * Export an enum to Input Options
 * @param entries - The entries (use Object.entries(MY_ENUM))
 * @returns The input options
 */
export const enumToInputOptions = (entries: [string, unknown][]): InputOption[] => {
  return entries.map((entry) => ({
    label: entry[0],
    key: (entry[1] as string),
  }));
}