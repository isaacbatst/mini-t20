import {type GrantedPowerMap, type GeneralPowerMap, type OriginPowerMap, type RolePowerMap} from '../Map';
import {type GeneralPowerInterface} from '../Power/GeneralPower/GeneralPower';
import {type GrantedPower} from '../Power/GrantedPower/GrantedPower';
import {type OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import {type RolePowerInterface} from '../Role/RolePower';
import {type TranslatableName} from '../Translator';
import {type SheetPowersInterface, type SheetPowersMap} from './SheetPowersInterface';
import {type TransactionInterface} from './TransactionInterface';

export class SheetPowers implements SheetPowersInterface {
	constructor(
		private readonly powers: SheetPowersMap = {
			general: new Map(),
			origin: new Map(),
			role: new Map(),
			granted: new Map(),
		},
	) {}

	pickGeneralPower(power: GeneralPowerInterface, transaction: TransactionInterface, source: TranslatableName): void {
		power.addToSheet(transaction, source);
		this.powers.general.set(power.name, power);
	}

	pickRolePower(power: RolePowerInterface, transaction: TransactionInterface, source: TranslatableName): void {
		power.addToSheet(transaction, source);
		this.powers.role.set(power.name, power);
	}

	pickOriginPower(power: OriginPowerInterface, transaction: TransactionInterface, source: TranslatableName): void {
		power.addToSheet(transaction, source);
		this.powers.origin.set(power.name, power);
	}

	pickGrantedPower(power: GrantedPower, transaction: TransactionInterface, source: TranslatableName): void {
		power.addToSheet(transaction, source);
		this.powers.granted.set(power.name, power);
	}

	getGeneralPowers(): GeneralPowerMap {
		return this.powers.general;
	}

	getOriginPowers(): OriginPowerMap {
		return this.powers.origin;
	}

	getRolePowers(): RolePowerMap {
		return this.powers.role;
	}

	getGrantedPowers(): GrantedPowerMap {
		return this.powers.granted;
	}
}
