import { Rule } from "./rule.js";

export const isURL: Rule = (url: string) => {
  const validUrl = new URL(url);
  if (!validUrl) {
    return {
      message: "Invalid url",
    };
  }

  return null;
};
