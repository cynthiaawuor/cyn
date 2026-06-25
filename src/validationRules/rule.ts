export type Rule = (value: string) => ValidationErrorMessage | undefined | null;

export interface ValidationErrorMessage {
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  value: string;
  errors: ValidationErrorMessage[];
}

export interface validationOptions {
  coerce?: boolean;
}
