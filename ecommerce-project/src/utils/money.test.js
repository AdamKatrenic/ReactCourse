import { it, expect, describe } from 'vitest';
import { formantMoney } from './money';

describe('formantMoney', () => {
    it('formats 1999 cents as $19.99', () => {
    expect(formantMoney(1999)).toBe('$19.99');
});

it('displays 2 decimals', () => {
    expect(formantMoney(1090)).toBe('$10.90');
    expect(formantMoney(100)).toBe('$1.00');
});
});

