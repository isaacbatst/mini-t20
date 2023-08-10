import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {SheetBuilderError} from '../../../../errors/SheetBuilderError';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';
import {type SkillName} from '../../../Skill';
import {type FixedModifierInterface} from '../../../Modifier';

export class DeformityEffect extends PassiveEffect {
	get description() {
		return 'Todo lefou possui defeitos físicos que, embora desagradáveis, '
		+ 'conferem certas vantagens. Você recebe +2 em '
		+ 'duas perícias a sua escolha. Cada um desses bônus '
		+ 'conta como um poder da '
		+ 'Tormenta (mas não causam perda de Carisma). '
		+ 'Você pode trocar um desses bônus por um poder da Tormenta a sua '
		+ 'escolha (isso também '
		+ 'não causa perda de '
		+ 'Carisma).';
	}

	readonly choices: SkillName[] = [];
	constructor() {
		super(RaceAbilityName.versatile);
	}

	addChoice(newChoice: SkillName) {
		if (this.choices.length >= 2) {
			throw new SheetBuilderError('EXCEEDED_CHOICES_QUANTITY');
		}

		const found = this.choices.find(choice => choice === newChoice);

		if (found) {
			throw new SheetBuilderError('REPEATED_VERSATILE_CHOICE');
		}

		this.choices.push(newChoice);
	}

	apply(transaction: TransactionInterface): void {
		if (this.choices.length !== 2) {
			throw new SheetBuilderError('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			const modifier: FixedModifierInterface = {
				source: RaceAbilityName.deformity,
				type: 'fixed',
				baseValue: 2,
				attributeBonuses: [],
				getAppliableValue: () => 2,
				getTotalAttributeBonuses: () => 0,
				serialize: () => ({
					source: RaceAbilityName.deformity,
					type: 'fixed',
					baseValue: 2,
					appliableValue: 2,
					attributeBonuses: [],
					totalAttributeBonuses: 0,
				}),
			};
			transaction.sheet.getSheetSkills().addFixedModifierTo(choice, modifier);
		});
	}
}
