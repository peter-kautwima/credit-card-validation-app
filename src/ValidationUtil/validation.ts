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
