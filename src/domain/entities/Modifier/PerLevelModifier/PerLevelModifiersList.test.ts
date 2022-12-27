import {Level} from '../../Levels';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {RoleName} from '../../Role/RoleName';
import {PerLevelModifier} from './PerLevelModifier';
import {PerLevelModifiersList} from './PerLevelModifiersList';
import {PerLevelModifiersListTotalCalculator} from './PerLevelModifiersListTotalCalculator';

describe('PerLevelModifiersList', () => {
	it('should calculate total', () => {
		const list = new PerLevelModifiersList();
		list.add(new PerLevelModifier(RoleName.arcanist, 6, true, new Set(['intelligence'])));
		list.add(new PerLevelModifier(RoleAbilityName.arcanistSpells, 1, false));
		const calculator = new PerLevelModifiersListTotalCalculator(
			{charisma: 0, constitution: 0, dexterity: 0, intelligence: 2, strength: 0, wisdom: 0},
			Level.levelThree,
		);
		expect(list.getTotal(calculator)).toBe(26);
	});
});
