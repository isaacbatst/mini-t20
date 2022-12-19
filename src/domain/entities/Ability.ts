import type {CharacterInterface} from './Character';

export type AbilityEffectType = 'active' | 'passive';

export abstract class Ability {
	constructor(
		readonly name: string,
		readonly effectType: AbilityEffectType,
	) {}

	abstract apply(character: CharacterInterface): void;
}
