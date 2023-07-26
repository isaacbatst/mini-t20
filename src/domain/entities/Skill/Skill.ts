import {SheetBuilderError} from '../../errors/SheetBuilderError';
import {type ContextualModifierInterface} from '../Modifier/ContextualModifier/ContextualModifierInterface';
import {ContextualModifiersList} from '../Modifier/ContextualModifier/ContextualModifierList';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {Attribute} from '../Sheet/Attributes';
import type {SkillTotalCalculator} from './SkillTotalCalculator';

export type SkillParams = {
	attribute: Attribute;
	isTrained?: boolean;
};

export class Skill {
	static calculateTrainedPoints(level = 1) {
		if (level <= 6) {
			return 2;
		}

		if (level <= 14) {
			return 4;
		}

		return 6;
	}

	static calculateTrainingPoints(level = 1, isTrained = false) {
		if (!isTrained) {
			return 0;
		}

		return Skill.calculateTrainedPoints(level);
	}

	static calculateLevelPoints(level: number) {
		return Math.floor(level / 2);
	}

	readonly attribute: Attribute;
	readonly contextualModifiers: ContextualModifiersList = new ContextualModifiersList();
	readonly fixedModifiers: FixedModifiersList = new FixedModifiersList();
	private isTrained: boolean;

	static get repeatedOtherModifierError() {
		return 'REPEATED_OTHER_SKILL_MODIFIER';
	}

	constructor(params: SkillParams) {
		this.isTrained = Boolean(params.isTrained);
		this.attribute = params.attribute;
	}

	addContextualModifier(modifier: ContextualModifierInterface) {
		this.contextualModifiers.add(modifier);
	}

	addFixedModifier(modifier: FixedModifierInterface) {
		this.fixedModifiers.add(modifier);
	}

	train() {
		if (this.isTrained) {
			throw new SheetBuilderError('TRAINING_TRAINED_SKILL');
		}

		this.isTrained = true;
	}

	getIsTrained() {
		return this.isTrained;
	}

	getTotal(
		calculator: SkillTotalCalculator,
	) {
		return calculator.calculate(this);
	}

	getTrainingPoints(level = 1) {
		return Skill.calculateTrainingPoints(level, this.isTrained);
	}
}
