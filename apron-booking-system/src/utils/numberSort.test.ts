import { describe, expect, it } from 'vitest';
import { numberSort } from './numberSort';

describe('numberSort', () => {
  it('sorts numbers in ascending order', () => {
    expect(numberSort(1, 2)).toBe(-1);
    expect(numberSort(2, 1)).toBe(1);
    expect(numberSort(1, 1)).toBe(0);
  });
});
