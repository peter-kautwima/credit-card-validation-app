import { assert, describe, expect, it } from "vitest";
import {
  validateLength,
  validationNumberRange,
  validationNumbersOnly,
} from "./validation";

describe("validation", () => {
  it("validate CVV", () => {
    assert.equal(validateLength("4589", 3), "Must be at 3 characters");
    assert.equal(validateLength("93", 3), "Must be at 3 characters");
    assert.equal(validateLength("943", 3), "");
  });

  it("validationNumbersOnly", () => {
    assert.equal(validationNumbersOnly("8698"), "");
    assert.equal(validationNumbersOnly(8979), "");
    assert.equal(validationNumbersOnly("kjh876j87"), "Must be a number");
  });

  it("validationNumberRange", () => {
    assert.equal(validationNumberRange(4, 1, 12), "");
    assert.equal(
      validationNumberRange(-1, 1, 12),
      "Must be a number between 1 and 12"
    );
    assert.equal(
      validationNumberRange(13, 1, 12),
      "Must be a number between 1 and 12"
    );
  });

  it("validate CVC", () => {
    assert.equal(validationNumbersOnly("8698"), "");
    assert.equal(validationNumbersOnly(8979), "");
    assert.equal(validationNumbersOnly("kjh876j87"), "Must be a number");
  });

  it("validate Card Number", () => {
    assert.equal(validateLength("4589", 16), "Must be at least 16 characters");
    assert.equal(validateLength("93", 16), "Must be at least 16 characters");
    assert.equal(validateLength("943", 16), "Must be at least 16 characters");
    assert.equal(validateLength("9431234567891234", 16), "");
  });
});
