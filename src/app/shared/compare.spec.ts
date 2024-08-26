import { compareDate, comparePriority, compareCompleted, compareString } from './compare';

describe('Compare Functions', () => {
  describe('compareDate', () => {
    it('should return -1 when a is before b and isAsc is true', () => {
      const result = compareDate(new Date('2021-01-01'), new Date('2021-01-02'), true);
      expect(result).toBe(-1);
    });

    it('should return 1 when a is after b and isAsc is true', () => {
      const result = compareDate(new Date('2021-01-02'), new Date('2021-01-01'), true);
      expect(result).toBe(1);
    });

    it('should return 1 when a is before b and isAsc is false', () => {
      const result = compareDate(new Date('2021-01-01'), new Date('2021-01-02'), false);
      expect(result).toBe(1);
    });

    it('should return -1 when a is after b and isAsc is false', () => {
      const result = compareDate(new Date('2021-01-02'), new Date('2021-01-01'), false);
      expect(result).toBe(-1);
    });
  });

  describe('comparePriority', () => {
    it('should return -1 when a is higher priority than b and isAsc is true', () => {
      const result = comparePriority('High', 'Medium', true);
      expect(result).toBe(-1);
    });

    it('should return 1 when a is lower priority than b and isAsc is true', () => {
      const result = comparePriority('Low', 'Medium', true);
      expect(result).toBe(1);
    });

    it('should return 1 when a is higher priority than b and isAsc is false', () => {
      const result = comparePriority('High', 'Medium', false);
      expect(result).toBe(1);
    });

    it('should return -1 when a is lower priority than b and isAsc is false', () => {
      const result = comparePriority('Low', 'Medium', false);
      expect(result).toBe(-1);
    });

    it('should return 0 if a is undefined and b is not', () => {
      const result = comparePriority(undefined, 'Medium', true);
      expect(result).toBe(0);
    });

    it('should return -1 when a is None priority is compared to High priority and isAsc is false', () => {
      const result = comparePriority('None', 'High', false);
      expect(result).toBe(-1);
    });
  });

  describe('compareCompleted', () => {
    it('should return 0 when a and b are both true', () => {
      const result = compareCompleted(true, true, true);
      expect(result).toBe(0);
    });

    it('should return 0 when a and b are both false', () => {
      const result = compareCompleted(false, false, true);
      expect(result).toBe(0);
    });

    it('should return 1 when a is true and b is false and isAsc is true', () => {
      const result = compareCompleted(true, false, true);
      expect(result).toBe(1);
    });

    it('should return -1 when a is false and b is true and isAsc is true', () => {
      const result = compareCompleted(false, true, true);
      expect(result).toBe(-1);
    });

    it('should return -1 when a is true and b is false and isAsc is false', () => {
      const result = compareCompleted(true, false, false);
      expect(result).toBe(-1);
    });

    it('should return 1 when a is false and b is true and isAsc is false', () => {
      const result = compareCompleted(false, true, false);
      expect(result).toBe(1);
    });
  });

  describe('compareString', () => {
    it('should return -1 when a is less than b and isAsc is true', () => {
      const result = compareString('apple', 'banana', true);
      expect(result).toBe(-1);
    });

    it('should return 1 when a is greater than b and isAsc is true', () => {
      const result = compareString('banana', 'apple', true);
      expect(result).toBe(1);
    });

    it('should return 1 when a is less than b and isAsc is false', () => {
      const result = compareString('apple', 'banana', false);
      expect(result).toBe(1);
    });

    it('should return -1 when a is greater than b and isAsc is false', () => {
      const result = compareString('banana', 'apple', false);
      expect(result).toBe(-1);
    });
  });
});