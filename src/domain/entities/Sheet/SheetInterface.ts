import type {TriggerEvent} from '../Ability/TriggeredEffect';
import type {BuildStepInterface} from '../BuildStep';
import {type SheetInventoryInterface} from './SheetInventoryInterface';
import type {TriggeredEffectMap} from '../Map';
import {type SheetAbilitiesInterface} from './SheetAbilitiesInterface';
import {type SheetAttributesInterface} from './SheetAttributesInterface';
import {type SheetDefenseInterface} from './SheetDefenseInterface';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';
import {type SheetOriginInterface} from './SheetOriginInterface';
import {type SheetPointsInterface} from './SheetPointsInterface';
import {type SheetPowersInterface} from './SheetPowersInterface';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {type SheetRaceInterface} from './SheetRaceInterface';
import {type SheetRoleInterface} from './SheetRoleInterface';
import {type SheetSkillsInterface} from './SheetSkillsInterface';
import {type SheetSpellsInterface} from './SheetSpellsInterface';
import {type SheetVisionInterface} from './SheetVisionInterface';
import {type SheetSizeInterface} from './SheetSizeInterface';
import {type EquipmentName} from '../Inventory/Equipment/EquipmentName';
import {type CharacterAttack} from '../Character/CharacterAttack';

export type SheetTriggeredEffects = Record<TriggerEvent, TriggeredEffectMap>;

export type SheetInterface = {
	pushBuildSteps(...buildSteps: BuildStepInterface[]): void;
	getAttacks(): Map<EquipmentName, CharacterAttack>;
	getBuildSteps(): BuildStepInterface[];
	getLevel(): number;
	getSheetAbilities(): SheetAbilitiesInterface;
	getSheetOrigin(): SheetOriginInterface;
	getSheetLifePoints(): SheetPointsInterface;
	getMaxLifePoints(): number;
	getSheetManaPoints(): SheetPointsInterface;
	getMaxManaPoints(): number;
	getSheetSkills(): SheetSkillsInterface;
	getSheetAttributes(): SheetAttributesInterface;
	getSheetSpells(): SheetSpellsInterface;
	getSheetInventory(): SheetInventoryInterface;
	getSheetPowers(): SheetPowersInterface;
	getSheetDefense(): SheetDefenseInterface;
	getSheetVision(): SheetVisionInterface;
	getSheetRace(): SheetRaceInterface;
	getSheetRole(): SheetRoleInterface;
	getSheetProficiencies(): SheetProficienciesInterface;
	getSheetDisplacement(): SheetDisplacementInterface;
	getSheetSize(): SheetSizeInterface;
};

