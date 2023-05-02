import {SkillName} from '../../../Skill';
import {SkillRequirement} from '../../Requirement/SkillRequirement';
import {GeneralPowerName} from '../GeneralPowerName';
import {FightStyle} from './FightStyle';

export class TwoHandsStyle extends FightStyle {
	constructor() {
		super(
			GeneralPowerName.twoHandsStyle,
		);
		this.addRequirement(new SkillRequirement(SkillName.fight));
	}
}