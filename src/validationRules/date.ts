import { Rule } from "./rule.js";

/*******************************
 * ISO 8601 Date Format: YY-MM-DD
 *
 * *****************************
 */
export const isISODate: Rule = (dateStr: string) => {
  const isValidDate = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
    dateStr,
  );
  if (!isValidDate) {
    return {
      message: "Invalid date format",
    };
  }
  return null;
};
