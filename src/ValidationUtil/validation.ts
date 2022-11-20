export const validateLength = (value: string, length: number) => {
  if (value.length !== length) {
    return `Must be at least ${length} characters`;
  }
  return true;
};

// validate required
export const validateRequired = (value: string) => {
  if (!value) {
    return "Required";
  }
  return true;
};

export const validationNumbersOnly = (value: string | number) => {
  if (isNaN(Number(value))) {
    return "Must be a number";
  }
  return true;
};

export const validationNumberRange = (
  value: string | number,
  min: number | string,
  max: number | string
) => {
  if (isNaN(Number(value)) || Number(value) < min || Number(value) > max) {
    return `Must be a number between ${min} and ${max}`;
  }
  return true;
};

export const validateCVC = (value: string) => {
  if (isNaN(Number(value))) {
    return "Must be a number";
  }
  return true;
};

export const validateCardNumber = (value: string) => {
  if (isNaN(Number(value)) || value.length !== 16) {
    return "Must be a number of 16 digits";
  }
  return true;
};

export const validateName = (value: string) => {
  if (value.length < 1) {
    return "Name should be at least 1 character";
  }
  return true;
};
