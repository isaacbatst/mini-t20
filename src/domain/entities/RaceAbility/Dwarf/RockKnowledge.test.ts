import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import {InGameContext} from '../../InGameContext';
import {ConditionalModifier} from '../../Modifier/ConditionalModifier';
import type {ConditionVerify} from '../../ModifierList';
import type {ActionPayload} from '../../SheetActions';
import {SheetFake} from '../../SheetFake';
import {SkillName} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbilityName} from '../RaceAbilityName';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new SheetFake();
		rockKnowledge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ChangeVision({
			source: RaceAbilityName.rockKnowledge,
			vision: Vision.dark,
		}));
	});

	it('should dispatch +2 perception bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new SheetFake();
		rockKnowledge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddOtherModifierToSkill({
			modifier: new ConditionalModifier(RaceAbilityName.rockKnowledge, 2, {description: 'testes devem ser realizados no subterrâneo', verify: expect.any(Function) as ConditionVerify}),
			skill: SkillName.perception,
		})));
	});

	it('should dispatch +2 survival bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new SheetFake();
		rockKnowledge.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddOtherModifierToSkill({
			skill: SkillName.survival,
			modifier: new ConditionalModifier(RaceAbilityName.rockKnowledge, 2, {description: 'testes devem ser realizados no subterrâneo', verify: expect.any(Function) as ConditionVerify}),
		})));
	});

	it('should not activate bonus in game context outside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new SheetFake();
		rockKnowledge.apply(sheet);
		const [_, secondStep, thirdStep] = sheet.progressionSteps;

		const verifyPerception = (secondStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).modifier.condition!.verify;
		const verifySurvival = (thirdStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).modifier.condition!.verify;

		expect(verifySurvival(new InGameContext({isUnderground: false}))).toBe(false);
		expect(verifyPerception(new InGameContext({isUnderground: false}))).toBe(false);
	});

	it('should activate bonus in game context inside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new SheetFake();
		rockKnowledge.apply(sheet);
		const [_, secondStep, thirdStep] = sheet.progressionSteps;

		const verifyPerception = (secondStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).modifier.condition!.verify;
		const verifySurvival = (thirdStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).modifier.condition!.verify;

		expect(verifySurvival(new InGameContext({isUnderground: true}))).toBe(true);
		expect(verifyPerception(new InGameContext({isUnderground: true}))).toBe(true);
	});
});
