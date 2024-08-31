import {type SerializedOriginPowerBasic, type SerializedOriginPower, type SerializedOriginPowers} from '../../Origin/OriginBenefit/SerializedOriginBenefit';
import type {OriginName} from '../../Origin/OriginName';
import type {PowerInterface} from '../Power';
import {Power} from '../Power';
import {type OriginPowerName} from './OriginPowerName';

export type OriginPowerInterface<S extends SerializedOriginPowers = SerializedOriginPowers> = PowerInterface & {
	source: OriginName;
	name: OriginPowerName;
	serialize(): SerializedOriginPower<S>;
};

export abstract class OriginPower<S extends SerializedOriginPowers = SerializedOriginPowers> extends Power implements OriginPowerInterface<S> {
	abstract source: OriginName;

	constructor(
		override readonly name: OriginPowerName,
	) {
		super(name, 'origin');
	}

	serializeBasic(): SerializedOriginPowerBasic {
		return {
			abilityType: 'power',
			name: this.name,
			effects: this.effects.serialize(),
			type: 'originPower',
		};
	}

	serialize(): SerializedOriginPower<S> {
		return {
			...this.serializeBasic(),
			...this.serializeSpecific(),
		};
	}
	abstract serializeSpecific(): S;
}
