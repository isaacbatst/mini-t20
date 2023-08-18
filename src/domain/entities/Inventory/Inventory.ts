import {type Character} from '../Character';
import type {EquipmentName} from './Equipment';
import type {Equipment} from './Equipment/Equipment';
import {InventoryEquipment} from './InventoryEquipment';

export class Inventory {
	equipments = new Map<EquipmentName, InventoryEquipment>();
	money = 0;

	addEquipment(equipment: Equipment) {
		this.equipments.set(equipment.name, new InventoryEquipment(equipment));
	}

	toggleEquippedItem(name: EquipmentName, character: Character) {
		const item = this.equipments.get(name);

		if (item) {
			item.toggleEquipped(character);
		}
	}

	addMoney(amount: number) {
		this.money += amount;
	}

	removeMoney(amount: number) {
		this.money -= amount;
	}

	getItem(name: EquipmentName) {
		return this.equipments.get(name);
	}

	getEquipments() {
		return this.equipments;
	}

	getWieldedItems(): EquipmentName[] {
		return Array.from(this.equipments.values())
			.filter(item => item.getIsEquipped() && item.equipment.isWieldable)
			.map(item => item.equipment.name);
	}

	getMoney(): number {
		return this.money;
	}
}
