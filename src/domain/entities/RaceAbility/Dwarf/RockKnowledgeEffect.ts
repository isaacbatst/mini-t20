import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddContextualModifierToSkill} from '../../Action/AddContextualModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import type {InGameContextInterface} from '../../Context/InGameContextInterface';
import {ContextualModifier} from '../../Modifier/ContextualModifier/ContextualModifier';
import type {ModifierCondition} from '../../Modifier/ContextualModifier/ContextualModifiersListInterface';
import type {BuildingSheetInterface} from '../../Sheet/BuildingSheetInterface';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbilityName} from '../RaceAbilityName';

export class RockKnowledgeEffect extends PassiveEffect {
	static readonly condition: ModifierCondition = {
		description: 'testes devem ser realizados no subterrâneo',
		verify: (context: InGameContextInterface) => context.getCurrentLocation().isUnderground,
	};

	static get skillModifier() {
		return 2;
	}

	constructor() {
		super(RaceAbilityName.rockKnowledge);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new ContextualModifier(this.source, RockKnowledgeEffect.skillModifier, RockKnowledgeEffect.condition);
		dispatch(new ChangeVision({source: this.source, vision: Vision.dark}));
		dispatch(new AddContextualModifierToSkill({modifier, skill: SkillName.perception}));
		dispatch(new AddContextualModifierToSkill({modifier, skill: SkillName.survival}));
	}
}
