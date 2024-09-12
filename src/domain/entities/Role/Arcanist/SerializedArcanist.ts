import {type GeneralPowerName} from '../../Power';
import {type Attribute} from '../../Sheet';
import {type SpellName} from '../../Spell';
import {type RoleName} from '../RoleName';
import {type ArcanistLineageDraconicDamageType, type ArcanistLineageType, type ArcanistPathName} from './ArcanistPath';

export type SerializedArcanistPath = SerializedArcanistWizard | SerializedArcanistSorcerer | SerializedArcanistMage;

export type SerializedArcanist<
	P = SerializedArcanistPath> = {
		name: RoleName.arcanist;
		path: P;
		initialSpells: SpellName[];
	};

export type SerializedArcanistMage = {
	name: ArcanistPathName.mage;
	extraSpell: SpellName;
};

export type SerializedArcanistWizard = {
	name: ArcanistPathName.wizard;
};

export type SerializedArcanistLineage = SerializedArcanistLineageDraconic | SerializedArcanistLineageFaerie | SerializedArcanistLineageRed;

export type SerializedArcanistSorcerer<L = SerializedArcanistLineage> = {
	name: ArcanistPathName.sorcerer;
	lineage: L;
};

export type SerializedArcanistLineageDraconic = {
	type: ArcanistLineageType.draconic;
	damageType: ArcanistLineageDraconicDamageType;
};

export type SerializedArcanistLineageFaerie = {
	type: ArcanistLineageType.faerie;
	extraSpell: SpellName;
};

export type SerializedArcanistLineageRed = {
	type: ArcanistLineageType.red;
	extraPower: GeneralPowerName;
	customTormentaAttribute: Attribute;
};
