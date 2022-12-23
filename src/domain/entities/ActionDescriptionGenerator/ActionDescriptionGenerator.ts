import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {ModifierCondition} from '../ModifierList';
import type {ActionDescriptionGenerators, ActionInterface, ActionType} from '../SheetActions';
import {Skill} from '../Skill/Skill';
import {StringHelper} from '../StringHelper';
import {Translator} from '../Translator';

export abstract class ActionDescriptionGenerator {
	static generate<T extends ActionType>(
		sheet: BuildingSheetInterface,
		action: ActionInterface<T>,
	): string {
		const generateDescription = ActionDescriptionGenerator.actionToDescriptionGenerate[action.type];
		return generateDescription(sheet, action);
	}

	private static readonly actionToDescriptionGenerate: ActionDescriptionGenerators = {
		setInitialAttributes: (sheet, action) => `Definição inicial de atributos: ${StringHelper.getAttributesText(action.payload.attributes)}.`,
		addOtherModifierToDefense: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} Defesa aplicado ao modificador "outros".${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		addOtherModifierToSkill: (sheet, {payload: {skill, modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} ${Translator.getSkillTranslation(skill)} aplicado ao modificador "outros".${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		applyRaceAbility: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: habilidade ${Translator.getAbilityTranslation(action.payload.ability.name)} aplicada.`,
		applyRaceModifiers(sheet, {payload: {modifiers}}) {
			const modifiersText = StringHelper.getAttributesText(modifiers);
			return `Modificadores de raça aplicados: ${modifiersText}.`;
		},
		addModifierToLifePoints: (sheet, {payload: {modifier}}) => `${Translator.getTranslation(modifier.source)}: ${StringHelper.addNumberSign(modifier.getMaxPossibleValue())} PV.${ActionDescriptionGenerator.getModifierConditionText(modifier.condition)}`,
		changeVision: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getVisionTranslation(action.payload.vision)} recebida.`,
		chooseRace: (sheet, action) => `Raça escolhida: ${Translator.getRaceTranslation(action.payload.race.name)}.`,
		trainSkill: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: perícia ${Translator.getSkillTranslation(action.payload.name)} treinada, bônus de treino ${StringHelper.addNumberSign(Skill.calculateTrainedSkillPoints(sheet.getLevel()))}.`,
		pickGeneralPower: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: poder ${Translator.getPowerTranslation(action.payload.power.name)} escolhido.`,
		pickRolePower: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: ${Translator.getPowerTranslation(action.payload.power.name)}.`,
		changeDisplacement: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: deslocamento alterado para ${action.payload.displacement}m.`,
		chooseRole: (sheet, {payload: {role}}) => `Classe escolhida: ${Translator.getRoleTranslation(role.name)}. ${role.initialLifePoints} PV, ${role.manaPerLevel} PM e ${role.getTotalInitialSkills()} perícias iniciais.`,
		addProficiency: (sheet, {payload: {proficiency, source}}) => `${Translator.getTranslation(source)}: você é proficiente com ${Translator.getProficiencyTranslation(proficiency)}.`,
		applyRoleAbility: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: habilidade ${Translator.getRoleAbilityTranslation(action.payload.ability.name)} adicionada.`,
		learnCircle: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: você pode lançar magias de ${Translator.getSpellCircleTranslation(action.payload.circle)} círculo.`,
		learnSpell: (sheet, action) => `${Translator.getTranslation(action.payload.source)}: você aprendeu a magia ${Translator.getSpellTranslation(action.payload.spell.name)}.`,
	};

	private static getModifierConditionText(condition?: ModifierCondition) {
		return `${condition ? ` Ativação em: ${condition.description}.` : ''}`;
	}
}

