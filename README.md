# Input Validation Engine

A simple reusable TypeScript validation library with no external validation dependencies. It validates values against the existing rules and returns validation results that tell you exactly what failed and why.

---

## What This Library Does

This library provides a single `validate()` function and a set of rules that can be mixed and matched on any value.

Instead of returning `true` or `false`, every validation call returns a structured object that tells you:

- Whether the value is valid
- Which rules failed
- Why each rule failed

---

## Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:cynthiaawuor/cyn.git
cd cyn
npm install
```

To use the library inside another project in the same workspace, import directly from the `src/` folder during development

---

## Running Tests

Run the full test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Each validation rule has its own test file inside the `tests/` directory with at least 5 edge-case tests per rule.

---

## Basic Usage

```typescript
import cyn from "./index.js";

const result = cyn.validate("user@example.com", [cyn.isRequired, cyn.isEmail]);

console.log(result);
```

Output:

```json
{
  "valid": true,
  "value": "user@example.com",
  "errors": []
}
```

---

## Available Rules

| Rule               | Description                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `isRequired`       | Fails for empty strings, whitespace-only strings, `null`, and `undefined`                                 |
| `isEmail`          | Validates email address format                                                                            |
| `isPhoneNumber`    | Validates E.164 international phone number format                                                         |
| `isURL`            | Validates URLs with all protocols i.e `http://` or `https://` or `mailto:`                                |
| `isISODate`        | Validates ISO 8601 date. it does not validate datetime strings for now                                    |
| `isUUID`           | Validates UUID v4 format                                                                                  |
| `isStrongPassword` | Validates password strength against rules i.e min 8 charcters, an uppercase, lowercase, special character |

### `isRequired`

Fails for any value that is empty, whitespace-only, `null`, or `undefined`.

```typescript
validate("", [isRequired]); // fails
validate("   ", [isRequired]); // fails — whitespace only
validate("hello", [isRequired]); // passes
```

### `isEmail`

Validates that a value looks like a properly formatted email address. Rejects values missing `@`, missing a domain, missing a local part, or containing spaces.

```typescript
validate("user@example.com", [isEmail]); // passes
validate("userexample.com", [isEmail]); // fails — no @
validate("user@", [isEmail]); // fails — no domain
```

### `isPhoneNumber`

Validates E.164 international phone number format. Numbers must start with `+`, followed by a country code and subscriber number, with no spaces or letters.

Valid format: `+[country code][number]` — e.g. `+254712345678`

```typescript
validate("+254712345678", [isPhoneNumber]); // passes
validate("0712345678", [isPhoneNumber]); // fails — no leading +
validate("+254 712 345 678", [isPhoneNumber]); // fails — contains spaces
```

Minimum length is 5 digits after `+`. Maximum length is 15 digits (per E.164 standard).

### `isURL`

Validates that a value is a properly formatted URL. A bare domain like `example.com` without a protocol will fail.

```typescript
validate("https://example.com", [isURL]); // passes
validate("http://example.com", [isURL]); // passes
validate("example.com", [isURL]); // fails — no protocol
validate("not a url", [isURL]); // fails
```

> **Design decision:** URLs without a protocol are rejected because accepting them would require guessing the intended protocol, which is unsafe in a validation context.

### `isISODate`

Validates ISO 8601 date and datetime strings. The following formats are supported:

| Format                | Example      | Supported |
| --------------------- | ------------ | --------- |
| Date only             | `2026-06-19` | ✅        |
| Non-ISO date          | `19-06-2026` | ❌        |
| Invalid calendar date | `2026-99-99` | ❌        |

```typescript
validate("2026-06-19", [isISODate]); // passes
validate("2026-06-19T10:30:00Z", [isISODate]); // fails
validate("19-06-2026", [isISODate]); // fails
validate("not-a-date", [isISODate]); // fails
```

### `isUUID`

Validates UUID format (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`). Only alphanumeric characters and correct hyphen placement are accepted.

```typescript
validate("550e8400-e29b-41d4-a716-446655440000", [isUUID]); // passes
validate("550e8400-e29b-41d4-a716", [isUUID]); // fails — too short
validate("zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz", [isUUID]); // fails — invalid characters
```

### `isStrongPassword`

Validates that a password meets minimum security requirements. **All rules are checked together** — the error response lists every requirement that failed, not just the first one.

Requirements:

- At least 8 characters
- At least 1 uppercase letter
- At least 1 digit
- At least 1 special character (e.g. `!@#$%^&*`)

```typescript
validate("weak", [isStrongPassword]); // fails — multiple rules
validate("StrongPass1!", [isStrongPassword]); // passes
```

---

## Validation Result Format

Every call to `validate()` returns a `ValidationResult` object with the following shape:

```typescript
interface ValidationResult {
  valid: boolean;
  value: string;
  errors: ValidationErrorMessage[];
}

interface ValidationErrorMessage {
  message: string; // the error message
}
```

### Successful result

```json
{
  "valid": true,
  "value": "user@example.com",
  "errors": []
}
```

### Failed result

```json
{
  "valid": false,
  "value": "",
  "errors": [
    { "message": "Value is required" },
    {
      "message": "Invalid email address."
    }
  ]
}
```

---

## Using Multiple Rules

Pass an array of rules as the second argument. All rules are checked, and every failure is reported:

```typescript
import cyn from "./index.js";

const result = cyn.validate("", [cyn.isRequired, cyn.isEmail]);

console.log(result);
```

Output:

```json
{
  "valid": false,
  "value": "",
  "errors": [
    { "message": "Value is required" },
    {
      "message": "Invalid email address."
    }
  ]
}
```
