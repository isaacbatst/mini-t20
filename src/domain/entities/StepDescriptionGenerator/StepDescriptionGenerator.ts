import type {Character} from '../Character';
import {InitialAttributesDefinition} from './InitialAttributesDefinition';
import {RaceAttributeModifiersAppliance} from './RaceAttributeModifiersAppliance';

export enum StepType {
	initialAttributesDefinition = 'initialAttributesDefinition',
	raceAttributesModifiersAppliance = 'raceAttributesModifiersAppliance',
}

export abstract class StepDescriptionGenerator {
	static generate(
		stepType: string,
		character: Character,
	): string {
		if (!this.validateStepType(stepType)) {
			throw new Error('INVALID_STEP_TYPE');
		}

		const generateDescription = StepDescriptionGenerator.stepTypeToGenerateFunction[stepType];

		return generateDescription(character);
	}

	private static readonly stepTypeToGenerateFunction: Record<StepType, (character: Character) => string> = {
		initialAttributesDefinition: InitialAttributesDefinition.generate,
		raceAttributesModifiersAppliance: RaceAttributeModifiersAppliance.generate,
	};

	private static validateStepType(stepType: string): stepType is StepType {
		return stepType in StepType;
	}
}

