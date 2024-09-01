import {EquipmentAdventure} from '../../Inventory/Equipment/EquipmentAdventure/EquipmentAdventure';
import {EquipmentClothing} from '../../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import {GeneralPowerName} from '../../Power/GeneralPower/GeneralPowerName';
import {OriginPowerName} from '../../Power/OriginPower/OriginPowerName';
import {SkillName} from '../../Skill/SkillName';
import {Origin} from '../Origin';
import type {OriginBenefit} from '../OriginBenefit/OriginBenefit';
import {type SerializedChurchMember} from '../OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export type SerializedChosenChurchMember = {
	name: OriginPowerName.churchMember;
};

export class Acolyte extends Origin<SerializedOrigins['acolyte']> {
	static readonly originName = OriginName.acolyte;
	static equipments = 'Símbolo sagrado, traje de sacerdote.';
	static skills: SkillName[] = [SkillName.cure, SkillName.religion, SkillName.will];
	static generalPowers: GeneralPowerName[] = [GeneralPowerName.medicine, GeneralPowerName.ironWill];
	static originPower = OriginPowerName.churchMember;

	readonly name = Acolyte.originName;

	constructor(chosenBenefits: Array<OriginBenefit<SerializedOrigins['acolyte']['originPower']>>) {
		super(chosenBenefits, {
			skills: Acolyte.skills,
			generalPowers: Acolyte.generalPowers,
			originPower: Acolyte.originPower,
		}, [
			new EquipmentAdventure(EquipmentName.sacredSymbol),
			new EquipmentClothing(EquipmentName.priestCostume),
		]);
	}

	override serialize(): SerializedOrigins['acolyte']['origin'] {
		return {
			name: this.name,
			chosenBenefits: this.serializeBenefits(),
			equipments: this.serializeEquipments(),
		};
	}
}

