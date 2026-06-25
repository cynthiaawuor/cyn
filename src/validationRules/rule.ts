export type Rule = (value: string) => ValidationErrorMessage | undefined | null;

export interface ValidationErrorMessage {
  message: string;
}
