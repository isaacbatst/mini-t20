import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {type WeaponPurpose, WeaponPurposeMelee} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Cutlass extends MartialWeapon {
	static damage = new DiceRoll(2, 4);
	static critical = new Critical(18);
	static equipmentName: MartialWeaponName = EquipmentName.cutlass;
	static purposes = [new WeaponPurposeMelee()];

	override damage: DiceRoll = Cutlass.damage;
	override critical: Critical = Cutlass.critical;
	override name = Cutlass.equipmentName;
	override purposes = Cutlass.purposes;
}
