import { SerializedStyles } from "@emotion/react";
import { DateType, InputOption } from "../lib/types";
/**
 * Check if the first parameter is true to render the serialized styles
 * @param valid - The condition to display the css
 * @param value - The css value
 * @returns The css value if the first condition is true
 */
export declare const conditionalCss: (valid: boolean, value: SerializedStyles, elseValue?: SerializedStyles) => SerializedStyles | undefined;
/**
 * Humanize the string passed in parameters
 * @param str - The string to humanize
 * @returns Humanized string
 */
export declare const humanize: (str: string) => string;
/**
 * Format date to human readable
 * @param date - The date to humanize
 * @param removeHours
 * @returns
 */
export declare const formatDate: (date: DateType, removeHours?: boolean) => string;
/**
 * Format an amount with user preference
 * @param amount - The amount to format
 * @param currency - The currency
 * @returns The formatted amount
 */
export declare const formatPrice: (amount: number, currency?: string) => string;
/**
 * Format a number to a fixed digit format
 * @param number - The number to format
 * @param digit - The digit to have
 */
export declare const toFixedDigit: (number: string | number, digit?: number) => string;
/**
 * Truncate a text
 * @param text - The text to truncate
 * @param maxLength - The max length of the text
 */
export declare const truncateString: (text?: string, maxLength?: number) => string;
/**
 * Check if the date is expired
 * @param date
 */
export declare const isDateExpired: (date?: Date) => boolean;
/**
 * Display an option by its key
 * @param options - List of options
 * @param key - The key to check
 * @param defaultValue - The default value if key does not exists
 * @returns The value of the option
 */
export declare const displayOptionByKey: (options: InputOption[], key?: string | number, defaultValue?: string) => string;
/**
 * Validate an email
 * @param {String} value - The email
 * @returns {Boolean} True if the email is valid
 */
export declare const isValidEmail: (value: string) => boolean;
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
export declare const compareEntries: (objectA: unknown, objectB: unknown, options?: CompareEntriesOptions) => boolean;
/**
 * Export an enum to Input Options
 * @param entries - The entries (use Object.entries(MY_ENUM))
 * @returns The input options
 */
export declare const enumToInputOptions: (entries: [string, unknown][]) => InputOption[];
export {};
//# sourceMappingURL=utils.d.ts.map