import {type SpellSchool, type LearnableSpellType, type Spell, type SpellCircle, type SpellName} from '../Spell';
import {type SerializedSheetSpell, type SerializedSheetLearnedCircles} from './SerializedSheet';

export type SpellMap = Map<SpellName, Spell>;
export type SheetLearnedCircles = Record<LearnableSpellType, Set<SpellCircle>>;
export type SheetLearnedSchools = Record<LearnableSpellType, Set<SpellSchool>>;

export type SheetSpellsInterface = {
	learnCircle(circle: SpellCircle, type: LearnableSpellType, schools?: Set<SpellSchool>): void;
	learnSpell(spell: Spell, needsCircle?: boolean, needsSchool?: boolean): void;
	getLearnedCircles(): SheetLearnedCircles;
	getSpells(): SpellMap;
	serializeLearnedCircles(): SerializedSheetLearnedCircles;
	serializeSpells(): SerializedSheetSpell[];
	getLearnedSchools(): SheetLearnedSchools;
};

