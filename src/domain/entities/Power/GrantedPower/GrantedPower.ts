import {Power} from '../Power';
import {type GrantedPowerName} from './GrantedPowerName';

export abstract class GrantedPower extends Power {
	constructor(override name: GrantedPowerName) {
		super(name, 'granted');
	}
}
