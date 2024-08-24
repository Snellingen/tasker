import { FormControl } from '@angular/forms';
import { ValidateDateInFuture, ValidatePriority } from './form.validators';

describe('Form Validators', () => {
  describe('ValidateDateInFuture', () => {
    it('should return null for a date in the future', () => {
      const control = new FormControl(new Date(Date.now() + 10000).toISOString());
      const result = ValidateDateInFuture(control);
      expect(result).toBeNull();
    });

    it('should return an error object for a date in the past', () => {
      const control = new FormControl(new Date(Date.now() - 10000).toISOString());
      const result = ValidateDateInFuture(control);
      expect(result).toEqual({ dateInPast: true });
    });
  });

  describe('ValidatePriority', () => {
    it('should return null for a valid priority "High"', () => {
      const control = new FormControl('High');
      const result = ValidatePriority(control);
      expect(result).toBeNull();
    });

    it('should return null for a valid priority "Medium"', () => {
      const control = new FormControl('Medium');
      const result = ValidatePriority(control);
      expect(result).toBeNull();
    });

    it('should return null for a valid priority "Low"', () => {
      const control = new FormControl('Low');
      const result = ValidatePriority(control);
      expect(result).toBeNull();
    });

    it('should return an error object for an invalid priority', () => {
      const control = new FormControl('InvalidPriority');
      const result = ValidatePriority(control);
      expect(result).toEqual({ invalidPriority: true });
    });
  });
});