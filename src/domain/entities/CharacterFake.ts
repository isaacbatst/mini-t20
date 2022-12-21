import type {Attributes} from './Attributes';
import {BuildingSheetContext} from './BuildingSheetContext';
import type {ActionInterface, ActionType} from './CharacterAction';
import type {SheetInterface} from './SheetInterface';
import type {Context} from './Context';
import type {Modifier, ModifierCondition} from './ModifierOthers';
import type {ProgressionStep} from './ProgressionStep';
import {ProgressionStepFake} from './ProgressionStepFake';
import {RaceFake} from './RaceFake';
import type {RaceInterface} from './RaceInterface';
import {InitialSkillsGenerator} from './Skill/InitialSkillsGenerator';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Translatable} from './Translator';
import {Vision} from './Vision';

export class CharacterFake implements SheetInterface {
	public level = 1;
	public attributes: Attributes = {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	};

	public vision: Vision = Vision.default;
	public context: Context = new BuildingSheetContext();

	readonly progressionSteps: Array<ProgressionStepFake<ActionType>> = [];

	public defenseTotal = 10;
	public race = new RaceFake();
	public skills: Record<SkillNameEnum, Skill> = InitialSkillsGenerator.generate();

	dispatch = jest.fn(<T extends ActionType>(action: ActionInterface<T>) => {
		this.progressionSteps.push(new ProgressionStepFake(action));
	});

	private readonly trainedSkills: SkillNameEnum[] = [];
	private readonly defenseOtherModifiers: Modifier[] = [];

	setVision(vision: Vision): void {
		this.vision = vision;
	}

	getRace(): RaceInterface | undefined {
		return this.race;
	}

	getContext(): Context {
		return this.context;
	}

	getVision(): Vision {
		return this.vision;
	}

	getDefenseTotal(): number {
		return this.defenseTotal;
	}

	getTrainedSkills() {
		return this.trainedSkills;
	}

	getLevel(): number {
		return this.level;
	}

	getSkills(): Record<SkillNameEnum, Skill> {
		return this.skills;
	}

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefenseOtherModifiers() {
		return this.defenseOtherModifiers;
	}

	getSkillTotal(skill: SkillNameEnum): number {
		return this.skills[skill].getTotal(this.attributes, this.level, this.context);
	}

	getSkillTrainingPoints(skill: SkillNameEnum): number {
		return this.skills[skill].getTrainingPoints(this.level);
	}

	private trainSkill(name: SkillNameEnum): void {
		this.trainedSkills.push(name);
	}

	private addOtherModifierToDefense(sourceName: Translatable, value: number, condition?: ModifierCondition): void {
		this.defenseOtherModifiers.push({source: sourceName, value, condition});
	}

	private addOtherModifierToSkill(sourceName: Translatable, value: number, skill: SkillNameEnum, condition?: ModifierCondition): void {
		this.skills[skill].modifierOthers.add({source: sourceName, value, condition});
	}
}
