import {WeaponAttack} from '../Attack/WeaponAttack';
import type {BuildStepInterface} from '../BuildStep';
import {CharacterAttack} from '../Character/CharacterAttack';
import {type ContextInterface, OutOfGameContext} from '../Context';
import {OffensiveWeapon, type EquipmentName} from '../Inventory';
import {type SerializedSheetInterface, SheetSerializer, type SerializedSheetPoints} from './SerializedSheet';
import {type SheetAbilitiesInterface} from './SheetAbilitiesInterface';
import {type SheetAttributesInterface} from './SheetAttributesInterface';
import {type SheetDefenseInterface} from './SheetDefenseInterface';
import {type SheetDevotion} from './SheetDevotion';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';
import type {SheetInterface} from './SheetInterface';
import {type SheetInventoryInterface} from './SheetInventoryInterface';
import {type SheetOriginInterface} from './SheetOriginInterface';
import {type SheetPointsInterface} from './SheetPointsInterface';
import {type SheetPowersInterface} from './SheetPowersInterface';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {type SheetRaceInterface} from './SheetRaceInterface';
import {type SheetResistencesInterface} from './SheetResistencesInterface';
import {type SheetRoleInterface} from './SheetRoleInterface';
import {type SheetSizeInterface} from './SheetSizeInterface';
import {type SheetSkillsInterface} from './SheetSkillsInterface';
import {type SheetSpellsInterface} from './SheetSpellsInterface';
import {type SheetVisionInterface} from './SheetVisionInterface';
export abstract class Sheet implements SheetInterface {
	protected abstract buildSteps: BuildStepInterface[];
	protected abstract level: number;
	protected abstract sheetAbilities: SheetAbilitiesInterface;
	protected abstract sheetOrigin: SheetOriginInterface;
	protected abstract sheetLifePoints: SheetPointsInterface;
	protected abstract sheetManaPoints: SheetPointsInterface;
	protected abstract sheetSkills: SheetSkillsInterface;
	protected abstract sheetAttributes: SheetAttributesInterface;
	protected abstract sheetSpells: SheetSpellsInterface;
	protected abstract sheetInventory: SheetInventoryInterface;
	protected abstract sheetPowers: SheetPowersInterface;
	protected abstract sheetDefense: SheetDefenseInterface;
	protected abstract sheetVision: SheetVisionInterface;
	protected abstract sheetRace: SheetRaceInterface;
	protected abstract sheetRole: SheetRoleInterface;
	protected abstract sheetProficiencies: SheetProficienciesInterface;
	protected abstract sheetDisplacement: SheetDisplacementInterface;
	protected abstract sheetSize: SheetSizeInterface;
	protected abstract sheetDevotion: SheetDevotion;
	protected abstract sheetResistences: SheetResistencesInterface;

	getAttacks(): Map<EquipmentName, CharacterAttack> {
		const attacks = new Map<EquipmentName, CharacterAttack>();
		const equipments = this.sheetInventory.getEquipments();
		equipments.forEach(({equipment}) => {
			if (equipment instanceof OffensiveWeapon) {
				const attack = new CharacterAttack(new WeaponAttack(equipment));
				attacks.set(equipment.name, attack);
			}
		});

		return attacks;
	}

	pushBuildSteps(...buildSteps: BuildStepInterface[]): void {
		this.buildSteps.push(...buildSteps);
	}

	getBuildSteps(): BuildStepInterface[] {
		return this.buildSteps;
	}

	getLevel(): number {
		return this.level;
	}

	getSheetDevotion() {
		return this.sheetDevotion;
	}

	getSheetSize(): SheetSizeInterface {
		return this.sheetSize;
	}

	getSheetAbilities(): SheetAbilitiesInterface {
		return this.sheetAbilities;
	}

	getSheetOrigin(): SheetOriginInterface {
		return this.sheetOrigin;
	}

	getSheetLifePoints(): SheetPointsInterface {
		return this.sheetLifePoints;
	}

	getMaxLifePoints(): number {
		const attributes = this.sheetAttributes.getValues();
		return this.sheetLifePoints.getMax(attributes, this.level);
	}

	getSheetManaPoints(): SheetPointsInterface {
		return this.sheetManaPoints;
	}

	getMaxManaPoints(): number {
		const attributes = this.sheetAttributes.getValues();
		return this.sheetManaPoints.getMax(attributes, this.level);
	}

	getSheetSkills(): SheetSkillsInterface {
		return this.sheetSkills;
	}

	getSheetAttributes(): SheetAttributesInterface {
		return this.sheetAttributes;
	}

	getSheetSpells(): SheetSpellsInterface {
		return this.sheetSpells;
	}

	getSheetInventory(): SheetInventoryInterface {
		return this.sheetInventory;
	}

	getSheetPowers(): SheetPowersInterface {
		return this.sheetPowers;
	}

	getSheetDefense(): SheetDefenseInterface {
		return this.sheetDefense;
	}

	getSheetVision(): SheetVisionInterface {
		return this.sheetVision;
	}

	getSheetRace(): SheetRaceInterface {
		return this.sheetRace;
	}

	getSheetRole(): SheetRoleInterface {
		return this.sheetRole;
	}

	getSheetProficiencies(): SheetProficienciesInterface {
		return this.sheetProficiencies;
	}

	getSheetDisplacement(): SheetDisplacementInterface {
		return this.sheetDisplacement;
	}

	getSheetResistences(): SheetResistencesInterface {
		return this.sheetResistences;
	}

	serialize(context: ContextInterface = new OutOfGameContext()): SerializedSheetInterface {
		const race = this.getSheetRace().getRace();
		const role = this.getSheetRole().getRole();
		const origin = this.getSheetOrigin().getOrigin();
		const powers = this.getSheetPowers();
		return {
			buildSteps: this.getBuildSteps().map(buildStep => buildStep.serialize()),
			level: this.getLevel(),
			displacement: this.getSheetDisplacement().getDisplacement(),
			attributes: this.getSheetAttributes().getValues(),
			defense: this.getSheetDefense().serialize(this, context),
			money: this.getSheetInventory().getMoney(),
			race: race ? race.serialize() : undefined,
			role: role ? role.serialize() : undefined,
			origin: origin ? origin.serialize() : undefined,
			lifePoints: this.getSheetLifePoints().serialize(this, context),
			manaPoints: this.getSheetManaPoints().serialize(this, context),
			equipments: this.getSheetInventory().serialize(),
			generalPowers: powers.serializeGeneralPowers(),
			rolePowers: powers.serializeRolePowers(),
			originPowers: powers.serializeOriginPowers(),
			grantedPowers: powers.serializeGrantedPowers(),
			grantedPowersCount: this.getSheetDevotion().getGrantedPowerCount(),
			learnedCircles: this.getSheetSpells().serializeLearnedCircles(),
			proficiencies: this.getSheetProficiencies().getProficiencies(),
			skills: this.getSheetSkills().serialize(this, context),
			spells: this.getSheetSpells().serializeSpells(),
			tormentaPowersAttribute: this.getSheetAttributes().getTormentaPowersAttribute(),
			vision: this.getSheetVision().getVision(),
			devotion: this.getSheetDevotion().serialize(),
			resistencies: this.getSheetResistences().serialize(this, context),
		};
	}
}
