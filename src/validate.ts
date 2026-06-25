import { Rule, ValidationErrorMessage } from "./validationRules/rule.js";

export default function validate(value: string, rules: Rule[]) {
  const errors: Record<string, ValidationErrorMessage> = {};
  for (let rule of rules) {
    const validationResponse = rule(value);
    if (validationResponse) {
      errors[rule.name] = validationResponse;
    }
  }
  return errors;
}
