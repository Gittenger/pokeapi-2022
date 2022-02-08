interface pokemonData {
	id: number,
	name: string,
	base_experience: number,
	height: number,
	weight: number,
	location_area_encounters: string //url
	sprites: [{}],
	types: [{
		type: {
			name: string,
			url: string //url
		}
	}],
	abilities: [{
		ability: {
			name: string,
			url: string //url
		}
	}],
	moves: [{
		move: {
			name: string,
			url: string //url
		}
	}],
	stats: [{
		stat: {
			name: string,
			base_stat: number,
			effort: number
		}
	}],
	held_items: [{
		item: {
			name: string,
			url: string //url
		}
	}],
}

interface abilityData {
	name: string,
	effect_changes?: [],
	flavor_text_entries: [{
		flavor_text: string
	}],
	effect_entries: [{
		effect: string
	}],
	pokemon: [{
		pokemon: {
			name: string,
		}
	}]
}

interface itemData {
	name: string,
	sprites: {
		default: string
	}
}

type encounterDate = [
	{
		location_area: {
			name: string
		}
		,
		version_details: [
			{
				version: {
					name: string
				}
			}
		]
	}
]

interface moveData {
	accuracy: number,
	pp: number,
	power: number,
	damage_class: {
		name: string,
	}
	,
	effect_changes: [],
	stat_changes: [],
	effect_entries: [{effect: string}],
	flavor_text_entries: [{
		flavor_text: string
	}],
	pokemon: [{
		pokemon: {
			name: string,
		}
	}]
}