import type {Attributes} from '../Attributes';
import {Human} from './Human';

describe('Human', () => {
	it('should apply +1 to strength, dexterity and constitution', () => {
		const human = new Human([
			'constitution',
			'dexterity',
			'strength',
		]);

		const attributes = human.applyAttributesModifiers({
			strength: 0,
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			wisdom: 0,
		});

		expect(attributes).toEqual<Attributes>({
			charisma: 0,
			constitution: 1,
			dexterity: 1,
			intelligence: 0,
			strength: 1,
			wisdom: 0,
		});
	});

	it('should return attributes modifiers text', () => {
		const human = new Human([
			'charisma',
			'constitution',
			'dexterity',
		]);

		expect(human.attributeModifiersText).toBe('+1 Carisma, +1 Constituição e +1 Destreza.');
	});

	it('should throw error with more than 3 selections', () => {
		expect(() => {
			const human = new Human([
				'constitution',
				'dexterity',
				'strength',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with less than 3 selections', () => {
		expect(() => {
			const human = new Human([
				'constitution',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with repeated attributes', () => {
		expect(() => {
			const human = new Human([
				'constitution',
				'charisma',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});
});
