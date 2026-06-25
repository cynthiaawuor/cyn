import { Rule } from "./rule.js";

export const isEmail: Rule = (email: string) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return {
      message: "invalid email format",
    };
  }
  return null;
};
