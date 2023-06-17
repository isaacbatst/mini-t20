import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export abstract class SimpleWeapon extends OffensiveWeapon {
	abstract override name: SimpleWeaponName;

	constructor() {
		super(Proficiency.simple);
	}
}
