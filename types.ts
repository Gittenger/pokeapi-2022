interface pokemonData {
	id: number,
	name: string,
	base_experience: number,
	height: number,
	weight: number,
	location_area_encounters: string //url
	sprites: [{}],
	types: [{
		name: string,
		url: string //url
	}],
	abilities: [{
		name: string,
		url: string //url
	}],
	moves: [{
		name: string,
		url: string //url
	}],
	stats: [{
		name: string,
		base_stat: number,
		effort: number
	}],
	held_items: [{
		name: string,
		url: string //url
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
	effect_entries: [{effect: string}],
	flavor_text_entries: [{
		flavor_text: string
	}],
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
	},
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