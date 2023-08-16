import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class TauricAxe extends ExoticWeapon {
	static damage = new DiceRoll(2, 8);
	static critical = new Critical(20, 3);
	static equipmentName: ExoticWeaponName = EquipmentName.tauricAxe;

	override damage: DiceRoll = TauricAxe.damage;
	override critical: Critical = TauricAxe.critical;
	override name = TauricAxe.equipmentName;
}
