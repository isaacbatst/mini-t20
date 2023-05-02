export class Critical {
	constructor(
		readonly threat: number = 20,
		readonly multiplier: number = 2,
	) {
		this.validateThreat(threat);
		this.validateMultiplier(multiplier);
	}

	private validateThreat(threat: number) {
		if (threat < 0) {
			throw new Error('INVALID_NEGATIVE_THREAT');
		}

		if (threat > 20) {
			throw new Error('INVALID_MAX_THREAT_EXCEEDED');
		}
	}

	private validateMultiplier(multiplier: number) {
		if (multiplier < 2) {
			throw new Error('INVALID_MIN_MULTIPLIER');
		}
	}
}
