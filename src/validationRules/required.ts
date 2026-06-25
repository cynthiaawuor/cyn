import { Rule } from "./rule.js";

export const isRequired: Rule = (value: string) => {
  const hasWhiteSpace = value.trim() === "";
  if (!value || hasWhiteSpace) {
    return {
      message: "Value is required",
    };
  }
  return null;
};
