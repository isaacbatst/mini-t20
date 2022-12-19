import {Defense} from './Defense';
import {OtherModifier} from './OtherModifier';

describe('Defense', () => {
	it('should calc defense total', () => {
		const defense = new Defense();

		expect(defense.getTotal(0, 0, 0)).toBe(10);
	});

	it('should calc defense total with other modifier', () => {
		const defense = new Defense();

		defense.addOtherModifiers(new OtherModifier('any-source', 'any-description', 2));

		expect(defense.getTotal(0, 0, 0)).toBe(12);
	});
});
