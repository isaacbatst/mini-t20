import type {ActionPayload} from '../Sheet/SheetActions';
import {Action} from './Action';

export class AddOtherModifierToSkill extends Action<'addOtherModifierToSkill'> {
	constructor(
		payload: ActionPayload<'addOtherModifierToSkill'>,
	) {
		super('addOtherModifierToSkill', payload);
	}
}
