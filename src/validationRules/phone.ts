import { Rule } from "./rule.js";

export const isPhoneNumber: Rule = (phoneNumber: string) => {
  /**************************
   * E.164 number format follows the format:
   * + : at the beginning
   * country code: from 1 to 3 numbers
   * subscriber number: 0-9
   * NB: The total digits should be 15 excluding the plus sign
   * **************************/
  const isValidPhoneNumber = /^\+[1-9]\d{5,14}/.test(phoneNumber);
  if (!isValidPhoneNumber) {
    return {
      message: "Invalid phone number",
    };
  }
  return null;
};
