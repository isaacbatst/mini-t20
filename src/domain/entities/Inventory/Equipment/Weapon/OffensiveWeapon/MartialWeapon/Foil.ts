import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Foil extends MartialWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(18);
	static equipmentName: MartialWeaponName = EquipmentName.foil;

	override damage: DiceRoll = Foil.damage;
	override critical: Critical = Foil.critical;
	override name = Foil.equipmentName;
}
