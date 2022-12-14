import { assert, describe, it } from 'vitest';
import { validateLength, validationNumberRange } from './validation';

describe('validation', () => {
  it('validate CVV', () => {
    assert.equal(validateLength('4589', 3), 'Must be 3 characters');
    assert.equal(validateLength('93', 3), 'Must be 3 characters');
    assert.equal(validateLength('943', 3), '');
  });

  it('validationNumberRange', () => {
    assert.equal(validationNumberRange(4, 1, 12), '');
    assert.equal(
      validationNumberRange(-1, 1, 12),
      'Must be a number between 1 and 12',
    );
    assert.equal(
      validationNumberRange(13, 1, 12),
      'Must be a number between 1 and 12',
    );
  });

  it('validate Card Number', () => {
    assert.equal(validateLength('4589', 16), 'Must be 16 characters');
    assert.equal(validateLength('93', 16), 'Must be 16 characters');
    assert.equal(validateLength('943', 16), 'Must be 16 characters');
    assert.equal(validateLength('9431234567891234', 16), '');
  });
});
