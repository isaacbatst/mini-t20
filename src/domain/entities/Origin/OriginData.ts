import {type EquipmentName} from '../Inventory';
import {type GeneralPowerName, type OriginPowerName} from '../Power';
import {type SkillName} from '../Skill';
import {type OriginName} from './OriginName';

type OriginDataParams = {
	equipments: string;
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
	originName: OriginName;
};

export class OriginData {
	readonly equipments: string;
	readonly skills: SkillName[];
	readonly generalPowers: GeneralPowerName[];
	readonly originPower: OriginPowerName;

	constructor(params: OriginDataParams) {
		this.equipments = params.equipments;
		this.skills = params.skills;
		this.generalPowers = params.generalPowers;
		this.originPower = params.originPower;
	}
}