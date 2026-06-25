import { Rule } from "./rule.js";
/**************************
 * ***strong password format***
At least 8 characters long.
At least 1 uppercase letter.
At least 1 digit.
At least 1 special character.

 * ****************************
 */
export const isStrongPassword: Rule = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*]/.test(password);

  if (!(hasSpecialCharacter && hasNumber && hasUpperCase && minLength)) {
    return {
      message: "Invalid password",
    };
  }
  return null;
};
