import { Rule } from "./rule.js";
/*************************************
 * UUID FORMAT: 36 (alphanumeric)characters long
 *              8-4-4-4-12
 *************************************/
export const isUUID: Rule = (uuid: string) => {
  const isValidUuid =
    /^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/.test(
      uuid,
    );
  if (!isValidUuid) {
    return {
      message: "Invalid uuid",
    };
  }
  return null;
};
