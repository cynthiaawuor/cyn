import {
  Rule,
  ValidationErrorMessage,
  ValidationResult,
} from "./validationRules/rule.js";

export default function validate(
  value: string,
  rules: Rule[],
): ValidationResult {
  const errors: Record<string, ValidationErrorMessage> = {};
  for (let rule of rules) {
    const validationResponse = rule(value);
    if (validationResponse) {
      errors[rule.name] = validationResponse;
    }
  }
  return {
    valid: Object.keys(errors).length === 0,
    value: value,
    errors: Object.values(errors),
  };
}
