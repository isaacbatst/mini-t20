import {type CharacterAttack} from '../Character/CharacterAttack';
import {type CharacterInterface} from '../Character/CharacterInterface';
import {FixedModifiersListTotalCalculator, PerLevelModifiersListTotalCalculator} from '../Modifier';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {type ModifiersMaxTotalCalculators, type ModifiersTotalCalculators} from '../Modifier/Modifiers';
import {Random, type RandomInterface} from '../Random';
import {type Attribute, type Location} from '../Sheet';
import {SkillTotalCalculatorFactory} from '../Skill/SkillTotalCalculatorFactory';
import {CharacterContextAbstract} from './CharacterContextAbstract';
import {type ContextType} from './ContextInterface';

export class SheetPreviewContext extends CharacterContextAbstract {
	override type: ContextType = 'outgame';

	constructor(override character: CharacterInterface) {
		super();
	}

	roll(attack: CharacterAttack, random: RandomInterface = new Random()) {
		return attack.roll(random, this.makeTotalCalculators());
	}

	changeAttackTestAttribute(attack: CharacterAttack, attribute: Attribute) {
		const skillTotalCalculator = SkillTotalCalculatorFactory.make(this.character.getAttributes(), this.character.sheet.getLevel(), this);
		this.character.changeAttackTestAttribute(attack, attribute, skillTotalCalculator);
	}

	getAttacks() {
		const skillTotalCalculator = SkillTotalCalculatorFactory.make(this.character.getAttributes(), this.character.sheet.getLevel(), this);
		return this.character.getAttacks(skillTotalCalculator);
	}

	getAttackTestModifiersMaxTotal(attack: CharacterAttack) {
		return attack.getTestModifiersMaxTotal(this.character.getAttributes(), this.makeMaxTotalCalculators());
	}

	getAttackTestModifiersTotal(attack: CharacterAttack) {
		return attack.getTestModifiersTotal(this.makeTotalCalculators());
	}

	override getCurrentLocation(): Location | undefined {
		return undefined;
	}

	private makeMaxTotalCalculators(): ModifiersMaxTotalCalculators {
		return {
			fixedCalculator: new FixedModifiersListTotalCalculator(this.character.getAttributes()),
			perLevelCalculator: new PerLevelModifiersListTotalCalculator(this.character.getAttributes(), this.character.sheet.getLevel()),
		};
	}

	private makeTotalCalculators(): ModifiersTotalCalculators {
		return {
			...this.makeMaxTotalCalculators(),
			contextCalculator: new ContextualModifiersListTotalCalculator(this, this.character.getAttributes()),
		};
	}
}
