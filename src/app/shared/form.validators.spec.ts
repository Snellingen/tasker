import { FormControl } from '@angular/forms';
import { ValidateDateInFuture, ValidatePriority, ValidDate } from './form.validators';

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

    it('should return null for a valid priority "None"', () => {
      const control = new FormControl('None');
      const result = ValidatePriority(control);
      expect(result).toBeNull();
    });

    it('should return an error object for an invalid priority', () => {
      const control = new FormControl('InvalidPriority');
      const result = ValidatePriority(control);
      expect(result).toEqual({ invalidPriority: true });
    });

    it('should return null for a valid priority "high" (case insensitive)', () => {
      const control = new FormControl('high');
      const result = ValidatePriority(control);
      expect(result).toBeNull();
    });
  });

  describe('ValidDate', () => {
    it('should return null for a valid date', () => {
      const control = new FormControl(new Date().toISOString());
      const result = ValidDate(control);
      expect(result).toBeNull();
    });

    it('should return an error object for an invalid date', () => {
      const control = new FormControl('InvalidDate');
      const result = ValidDate(control);
      expect(result).toEqual({ invalidDate: true });
    });
  })
});