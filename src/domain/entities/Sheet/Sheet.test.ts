import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import {LeatherArmor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/LeatherArmor';
import {Dagger} from '../Inventory/Equipment/Weapon/OfensiveWeapon/Dagger';
import {LongSword} from '../Inventory/Equipment/Weapon/OfensiveWeapon/LongSword';
import {Acolyte} from '../Origin/Acolyte';
import {AnimalsFriend} from '../Origin/AnimalsFriend';
import type {Origin} from '../Origin/Origin';
import {OriginBenefitGeneralPower} from '../Origin/OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../Origin/OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../Origin/OriginBenefitSkill';
import {PointsMaxCalculatorFactory} from '../Points/PointsMaxCalculatorFactory';
import {OneWeaponStyle} from '../Power/GeneralPower/FightStyle/OneWeaponStyle';
import {GeneralPowerName} from '../Power/GeneralPower/GeneralPowerName';
import {IronWill} from '../Power/GeneralPower/IronWill';
import {SpecialFriend} from '../Power/OriginPower/SpecialFriend';
import {Dwarf} from '../Race/Dwarf/Dwarf';
import {Human} from '../Race/Human/Human';
import {VersatileChoicePower} from '../Race/Human/Versatile/VersatileChoicePower';
import {VersatileChoiceSkill} from '../Race/Human/Versatile/VersatileChoiceSkill';
import type {Race} from '../Race/Race';
import {ArcanistBuilder} from '../Role/Arcanist/ArcanistBuider';
import {ArcanistPathMage} from '../Role/Arcanist/ArcanistPath/ArcanistPathMage';
import type {Role} from '../Role/Role';
import {RoleAbilityName} from '../Role/RoleAbilityName';
import {Warrior} from '../Role/Warrior/Warrior';
import {SkillName} from '../Skill/SkillName';
import {ArcaneArmor} from '../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../Spell/MentalDagger/MentalDagger';
import {Proficiency} from './Proficiency';
import type {Sheet} from './Sheet';
import {SheetBuilder} from './SheetBuilder';
import {Vision} from './Vision';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		let sheet: Sheet;
		let role: Role;
		let race: Race;
		let sheetBuilder: SheetBuilder;
		let origin: Origin;
		beforeAll(() => {
			const choices = [
				new VersatileChoiceSkill(SkillName.acrobatics),
				new VersatileChoicePower(new OneWeaponStyle()),
			];
			race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			role = new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]);
			sheetBuilder = new SheetBuilder();
			origin = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitSkill(SkillName.cure)]);
			sheet = sheetBuilder
				.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
				.chooseRace(race)
				.chooseRole(role)
				.chooseOrigin(origin)
				.trainIntelligenceSkills([])
				.addInitialEquipment({
					simpleWeapon: new Dagger(),
					armor: new LeatherArmor(),
					martialWeapon: new LongSword(),
					money: 24,
				})
				.build();
		});

		it('should choose race', () => {
			expect(sheet.getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(sheet.getDisplacement()).toBe(9);
		});

		it('should have default vision', () => {
			expect(sheet.getVision()).toBe(Vision.default);
		});

		it('should have versatile power', () => {
			const powers = sheet.getPowers();
			expect(powers.general.has(GeneralPowerName.oneWeaponStyle)).toBeTruthy();
		});

		it('should have versatile skill trained', () => {
			const skills = sheet.getSkills();
			expect(skills.acrobatics.getIsTrained()).toBeTruthy();
		});

		it('should choose role', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			const calculator = PointsMaxCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel());
			expect(sheet.getLifePoints().getMax(calculator)).toBe(21);
		});

		it('should have role skills trained', () => {
			const skills = sheet.getSkills();
			expect(skills.fight.getIsTrained()).toBeTruthy();
			expect(skills.aim.getIsTrained()).toBeTruthy();
			expect(skills.fortitude.getIsTrained()).toBeTruthy();
			expect(skills.athletics.getIsTrained()).toBeTruthy();
		});

		it('should have role abilities', () => {
			const abilities = sheet.getAbilities();
			expect(abilities.role.has(RoleAbilityName.specialAttack)).toBeTruthy();
		});

		it('should have origin power', () => {
			const powers = sheet.getPowers();
			expect(powers.general.has(GeneralPowerName.ironWill)).toBeTruthy();
		});

		it('should have origin skill trained', () => {
			const skills = sheet.getSkills();
			expect(skills.cure.getIsTrained()).toBeTruthy();
		});

		it('should have origin equipments', () => {
			expect(sheet.getInventory().equipments.has(EquipmentName.priestCostume)).toBeTruthy();
			expect(sheet.getInventory().equipments.has(EquipmentName.sacredSymbol)).toBeTruthy();
		});

		it('should have default initial equipments.has(', () => {
			expect(sheet.getInventory().equipments.has(EquipmentName.backpack)).toBeTruthy();
			expect(sheet.getInventory().equipments.has(EquipmentName.sleepingBag)).toBeTruthy();
			expect(sheet.getInventory().equipments.has(EquipmentName.travelerCostume)).toBeTruthy();
		});

		it('should have chosen weapo', () => {
			expect(sheet.getInventory().equipments.has(EquipmentName.dagger)).toBeTruthy();
		});

		it('should have chosen martial weapon', () => {
			expect(sheet.getInventory().equipments.has(EquipmentName.longSword)).toBeTruthy();
		});

		it('should have chosen armor', () => {
			expect(sheet.getInventory().equipments.has(EquipmentName.leatherArmor)).toBeTruthy();
		});

		it('should have initial money', () => {
			expect(sheet.getMoney()).toBe(24);
		});
	});

	describe('Dwarf Arcanist', () => {
		let sheet: Sheet;
		let role: Role;
		let race: Race;
		let sheetBuilder: SheetBuilder;
		let origin: Origin;

		beforeAll(() => {
			role = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
			race = new Dwarf();
			sheetBuilder = new SheetBuilder();
			origin = new AnimalsFriend([new OriginBenefitSkill(SkillName.animalHandling), new OriginBenefitOriginPower(new SpecialFriend(SkillName.religion))], EquipmentName.horse);
			sheet = sheetBuilder
				.setInitialAttributes({charisma: 0, constitution: 0, dexterity: 0, intelligence: 2, strength: 0, wisdom: 0})
				.chooseRace(race)
				.chooseRole(role)
				.chooseOrigin(origin)
				.trainIntelligenceSkills([SkillName.initiative, SkillName.athletics])
				.addInitialEquipment({
					simpleWeapon: new Dagger(),
					money: 20,
				})
				.build();
		});

		it('should choose race', () => {
			expect(sheet.getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(sheet.getDisplacement()).toBe(6);
		});

		it('should have dark vision', () => {
			expect(sheet.getVision()).toBe(Vision.dark);
		});

		it('should choose class', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			const calculator = PointsMaxCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel());
			expect(sheet.getLifePoints().getMax(calculator)).toBe(13);
		});

		it('should have role skills trained', () => {
			const skills = sheet.getSkills();
			expect(skills.mysticism.getIsTrained()).toBeTruthy();
			expect(skills.will.getIsTrained()).toBeTruthy();
			expect(skills.knowledge.getIsTrained()).toBeTruthy();
			expect(skills.diplomacy.getIsTrained()).toBeTruthy();
		});

		it('should have basic proficiencies', () => {
			expect(sheet.getProficiencies()).toContain(Proficiency.simple);
			expect(sheet.getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});

	describe('Human Warrior - Missing fight skill for one weapon style', () => {
		it('should throw UNFILLED_POWER_REQUIREMENTS error', () => {
			const choices = [
				new VersatileChoiceSkill(SkillName.acrobatics),
				new VersatileChoicePower(new OneWeaponStyle()),
			];
			const race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			const role = new Warrior([SkillName.intimidation, SkillName.aim, SkillName.athletics]);
			const sheetBuilder = new SheetBuilder();
			const origin = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitSkill(SkillName.cure)]);
			expect(() => {
				sheetBuilder
					.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
					.chooseRace(race)
					.chooseRole(role)
					.chooseOrigin(origin)
					.trainIntelligenceSkills([])
					.addInitialEquipment({
						simpleWeapon: new Dagger(),
						armor: new LeatherArmor(),
						martialWeapon: new LongSword(),
						money: 24,
					})
					.build();
			}).toThrow('UNFULFILLED_REQUIREMENT');
		});
	});
});
