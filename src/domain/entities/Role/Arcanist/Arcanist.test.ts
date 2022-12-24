import {LearnSpell} from '../../Action/AddSpell';
import {TrainSkill} from '../../Action/TrainSkill';
import {BuildingSheetFake} from '../../BuildingSheetFake';
import {SkillName} from '../../Skill/SkillName';
import {ArcaneArmor} from '../../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../../Spell/MentalDagger/MentalDagger';
import {SpellRoleName} from '../SpellRole';
import {ArcanistBuilder} from './ArcanistBuider';
import {ArcanistPathMage} from './ArcanistPath/ArcanistPathMage';

describe('Arcanist', () => {
	it('should dispatch proper train skills', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.mysticism,
			source: SpellRoleName.arcanist,
		}));

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.will,
			source: SpellRoleName.arcanist,
		}));

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.knowledge,
			source: SpellRoleName.arcanist,
		}));

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.diplomacy,
			source: SpellRoleName.arcanist,
		}));
	});

	it('should not train with missing chooses', () => {
		expect(() => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train with wrong skills', () => {
		expect(() => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.athletics])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not dispatch profiency add', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);
		expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({type: 'addProficiency'}));
	});

	it('should learn spells', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

		expect(arcanist.spells).toContainEqual(new ArcaneArmor());

		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: SpellRoleName.arcanist,
			spell: new ArcaneArmor(),
		}));

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: SpellRoleName.arcanist,
			spell: new MentalDagger(),
		}));

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: SpellRoleName.arcanist,
			spell: new IllusoryDisguise(),
		}));
	});
});