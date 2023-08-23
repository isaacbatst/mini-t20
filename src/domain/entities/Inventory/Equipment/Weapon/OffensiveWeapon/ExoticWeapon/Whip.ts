import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class Whip extends ExoticWeapon {
	static damage = new DiceRoll(1, 3);
	static critical = new Critical(19, 2);
	static equipmentName: ExoticWeaponName = EquipmentName.whip;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	override damage: DiceRoll = Whip.damage;
	override critical: Critical = Whip.critical;
	override name = Whip.equipmentName;
	override purposes = Whip.purposes;
}