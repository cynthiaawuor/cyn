import {
  Rule,
  ValidationErrorMessage,
  validationOptions,
  ValidationResult,
} from "./validationRules/rule.js";

export default function validate(
  value: string,
  rules: Rule[],
  options: validationOptions = {},
): ValidationResult {
  let cleanedValue = value;
  if (options.coerce) {
    cleanedValue = cleanValue(value);
  }
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
    ...(options.coerce ? { cleanedValue } : {}),
    errors: Object.values(errors),
  };
}

const cleanValue = (value: string): string => {
  return value.trim().toLocaleLowerCase();
};
