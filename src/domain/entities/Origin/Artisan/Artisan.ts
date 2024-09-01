import {OriginPowerName} from '../../Power';
import {type SerializedSheetEquipment} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Origin} from '../Origin';
import {type SerializedOriginBenefit, type SerializedOriginPowerBasic, type OriginBenefit} from '../OriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export class Artisan extends Origin<SerializedOrigins['artisan']> {
	static readonly originName = OriginName.artisan;
	static equipments = 'Instrumentos de ofício (qualquer), um item que você possa fabricar de até T$ 50.';
	static skills: SkillName[] = [SkillName.craft, SkillName.will];
	static generalPowers = [];
	static originPower = OriginPowerName.fruitsOfLabor;

	readonly name = Artisan.originName;

	constructor(chosenBenefits: Array<OriginBenefit<SerializedOrigins['artisan']['originPower']>>) {
		super(chosenBenefits, {
			skills: Artisan.skills,
			generalPowers: Artisan.generalPowers,
			originPower: Artisan.originPower,
		}, []);
	}

	override serialize(): {name: OriginName.artisan; equipments: SerializedSheetEquipment[]; chosenBenefits: Array<SerializedOriginBenefit<SerializedOriginPowerBasic<OriginPowerName.fruitsOfLabor>>>} {
		return {
			name: this.name,
			equipments: this.serializeEquipments(),
			chosenBenefits: this.serializeBenefits(),
		};
	}
}
