export const validateLength = (value: string, length: number) => {
  if (value.length !== length) {
    return `Must be ${length} characters`;
  }
  return "";
};

export const validateRequired = (
  name: string,
  values: any,
  errors: any,
  touched: any,
  error: string
) => {
  if (!values[name] && touched[name]) {
    errors[name] = error;
  } else {
    errors[name] = "";
  }
  return errors;
};

export const validationNumbersOnly = (value: string | number) => {
  if (isNaN(Number(value))) {
    return "Must be a number";
  }
  return "";
};

export const validationNumberRange = (
  value: string | number,
  min: number | string,
  max: number | string
) => {
  if (isNaN(Number(value)) || Number(value) < min || Number(value) > max) {
    return `Must be a number between ${min} and ${max}`;
  }
  return "";
};

export const validateCVC = (value: string) => {
  if (isNaN(Number(value))) {
    return "Must be a number";
  }
  return "";
};

export const validateCardNumber = (value: string) => {
  if (isNaN(Number(value)) || value.length !== 16) {
    return "Must be a number of 16 digits";
  }
  return "";
};
