import {SpellFactory} from '../../../../../Spell';
import {type ArcanistLineage} from './ArcanistLineage';
import {ArcanistLineageFactory} from './ArcanistLineageFactory';
import {ArcanistLineageFaerie} from './ArcanistLineageFaerie';

export class ArcanistLineageFactoryFaerie extends ArcanistLineageFactory {
	override make(): ArcanistLineage {
		if (!this.sorcererLineageFaerieExtraSpell) {
			throw new Error('MISSING_FAERIE_EXTRA_SPELL');
		}

		const spell = SpellFactory.make(this.sorcererLineageFaerieExtraSpell);
		return new ArcanistLineageFaerie(spell);
	}
}
