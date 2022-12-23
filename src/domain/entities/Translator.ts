import type {Attribute} from './Attributes';
import type {PowerName} from './Power/PowerName';
import type {Proficiency} from './Proficiency';
import type {RaceName} from './Race/RaceName';
import type {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import type {RoleAbilityName} from './Role/RoleAbilityName';
import type {RoleName} from './Role/RoleName';
import type {SkillName} from './Skill/SkillName';
import {StringHelper} from './StringHelper';
import type {Vision} from './Vision';

export type Translatable = Attribute
| RaceAbilityName | SkillName | PowerName | RaceName | Proficiency
| Vision | RoleName | RoleAbilityName;

export class Translator {
	static getAttributeTranslation(attribute: Attribute, capitalized = true) {
		const translatedAttribute = Translator.attributesTranslation[attribute];

		if (capitalized) {
			return StringHelper.capitalize(translatedAttribute);
		}

		return translatedAttribute;
	}

	static getAbilityTranslation(ability: RaceAbilityName) {
		return Translator.abilitiesTranslation[ability];
	}

	static getSkillTranslation(skill: SkillName) {
		return Translator.skillsTranslation[skill];
	}

	static getVisionTranslation(vision: Vision) {
		return Translator.visionsTranslation[vision];
	}

	static getRaceTranslation(race: RaceName) {
		return Translator.racesTranslation[race];
	}

	static getRoleTranslation(role: RoleName) {
		return Translator.rolesTranslation[role];
	}

	static getPowerTranslation(power: PowerName) {
		return Translator.powersTranslation[power];
	}

	static getProficiencyTranslation(proficiency: Proficiency) {
		return Translator.proficienciesTranslation[proficiency];
	}

	static getTranslation(string: Translatable) {
		return Translator.translation[string];
	}

	private static readonly attributesTranslation: Record<Attribute, string> = {
		charisma: 'carisma',
		constitution: 'constituição',
		dexterity: 'destreza',
		intelligence: 'inteligência',
		strength: 'força',
		wisdom: 'sabedoria',
	};

	private static readonly abilitiesTranslation: Record<RaceAbilityName, string> = {
		rockKnownledge: 'Conhecimento das Rochas',
		versatile: 'Versátil',
		slowAndAlways: 'Devagar e Sempre',
		hardAsRock: 'Duro como pedra',
	};

	private static readonly skillsTranslation: Record<SkillName, string> = {
		acrobatics: 'Acrobacia',
		animalHandling: 'Adestramento',
		fight: 'Luta',
		perception: 'Percepção',
		reflexes: 'Reflexos',
		survival: 'Sobrevivência',
		aim: 'Pontaria',
		animalRide: 'Cavalgar',
		athletics: 'Atletismo',
		craft: 'Ofício',
		fortitude: 'Fortitude',
		initiative: 'Iniciativa',
		intimidation: 'Intimidação',
		war: 'Guerra',
		cheat: 'Enganação',
		diplomacy: 'Diplomacia',
		intuition: 'Intuição',
		investigation: 'Investigação',
		knowledge: 'Conhecimento',
		mysticism: 'Misticismo',
		nobility: 'Nobreza',
		will: 'Vontade',
	};

	private static readonly powersTranslation: Record<PowerName, string> = {
		dodge: 'Esquiva',
		swordAndShieldStyle: 'Esttilo Espada e Escudo',
		twoHandsStyle: 'Estilo de Duas Mãos',
		archer: 'Arqueiro',
	};

	private static readonly visionsTranslation: Record<Vision, string> = {
		default: 'Visão padrão',
		penumbra: 'Visão na penumbra',
		dark: 'Visão no escuro',
	};

	private static readonly racesTranslation: Record<RaceName, string> = {
		dwarf: 'Anão',
		human: 'Humano',
	};

	private static readonly rolesTranslation: Record<RoleName, string> = {
		warrior: 'Guerreiro',
		arcanist: 'Arcanista',
	};

	private static readonly proficienciesTranslation: Record<Proficiency, string> = {
		exotic: 'armas exóticas',
		fire: 'armas de fogo',
		heavyArmor: 'armaduras pesadas',
		lightArmor: 'armaduras leves',
		martial: 'armas marciais',
		shield: 'escudos',
		simple: 'armas simples',
	};

	private static readonly roleAbilitiesTranslation: Record<RoleAbilityName, string> = {
		specialAttack: 'Ataque Especial',
		warriorPower: 'Poder de Guerreiro',
	};

	private static readonly translation: Record<Translatable, string> = {
		...Translator.attributesTranslation,
		...Translator.abilitiesTranslation,
		...Translator.skillsTranslation,
		...Translator.powersTranslation,
		...Translator.visionsTranslation,
		...Translator.racesTranslation,
		...Translator.rolesTranslation,
		...Translator.proficienciesTranslation,
		...Translator.roleAbilitiesTranslation,
	};
}
