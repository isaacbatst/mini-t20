import {Equipment} from '../Equipment/Equipment';
import {EquipmentName} from '../Equipment/EquipmentName';
import {GeneralPowerName} from '../Power/GeneralPowerName';
import {SkillName} from '../Skill/SkillName';
import {Origin} from './Origin';
import type {OriginBenefit} from './OriginBenefit';
import {OriginName} from './OriginName';

export class Acolyte extends Origin {
	name: OriginName = OriginName.acolyte;

	equipments: Equipment[] = [
		new Equipment(EquipmentName.sacredSymbol),
		new Equipment(EquipmentName.priestCostume),
	];

	constructor(chosenBenefits: OriginBenefit[]) {
		super(chosenBenefits, {
			skills: [SkillName.cure, SkillName.religion, SkillName.will],
			generalPowers: [GeneralPowerName.medicine, GeneralPowerName.ironWill],
		});
	}
}
