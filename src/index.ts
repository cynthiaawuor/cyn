import validate from "./validate.js";
import { isISODate } from "./validationRules/date.js";
import { isEmail } from "./validationRules/email.js";
import { isStrongPassword } from "./validationRules/password.js";
import { isPhoneNumber } from "./validationRules/phone.js";
import { isRequired } from "./validationRules/required.js";
import { isURL } from "./validationRules/url.js";
import { isUUID } from "./validationRules/uuid.js";

const cyn = {
  isEmail,
  isRequired,
  isURL,
  isPhoneNumber,
  validate,
  isISODate,
  isUUID,
  isStrongPassword,
};

export default cyn;
