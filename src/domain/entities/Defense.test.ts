import {Defense} from './Defense';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';

describe('Defense', () => {
	it('should calc defense total', () => {
		const defense = new Defense();

		expect(defense.getTotal(0, 0, 0)).toBe(10);
	});

	it('should calc defense total with other modifier', () => {
		const defense = new Defense();

		defense.modifierOthers.add({source: GeneralPowerNameEnum.dodge, value: 2});

		expect(defense.getTotal(0, 0, 0)).toBe(12);
	});
});
