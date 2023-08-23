import {DiceRoll} from '../Dice/DiceRoll';
import {Attack} from './Attack';
import {Critical} from './Critical';

describe('Attack', () => {
	it('should calculate regular roll result', () => {
		const damage = new DiceRoll(1, 6);
		const critical = new Critical(20, 2);
		const attack = new Attack(damage, critical, 'default');
		const fakeRandom = {get: vi.fn(() => 1)};
		const result = attack.roll(fakeRandom);
		expect(result.damage.rolls).toEqual([1]);
		expect(result.damage.discartedRolls).toEqual([]);
		expect(result.damage.total).toEqual(1);
	});

	it('should calculate critical roll 20/x2', () => {
		const damage = new DiceRoll(1, 6);
		const critical = new Critical(20, 2);
		const attack = new Attack(damage, critical, 'default');
		const fakeRandom = {get: vi.fn().mockReturnValueOnce(20).mockReturnValue(1)};
		const result = attack.roll(fakeRandom);
		expect(result.damage.rolls).toEqual([1, 1]);
		expect(result.damage.discartedRolls).toEqual([]);
		expect(result.damage.total).toEqual(2);
	});

	it('should calculate critical roll 19/x3', () => {
		const damage = new DiceRoll(1, 6);
		const critical = new Critical(19, 3);
		const attack = new Attack(damage, critical, 'default');
		const fakeRandom = {get: vi.fn().mockReturnValueOnce(19).mockReturnValue(1)};
		const result = attack.roll(fakeRandom);
		expect(result.damage.rolls).toEqual([1, 1, 1]);
		expect(result.damage.discartedRolls).toEqual([]);
		expect(result.damage.total).toEqual(3);
		expect(result.test.total).toEqual(19);
	});
});
