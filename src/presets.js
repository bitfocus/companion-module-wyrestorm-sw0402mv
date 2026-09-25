import { INPUT_CHOICES, MODE_CHOICES, OUTPUT_CHOICES } from './actions.js'

const INPUT_SHORT_LABELS = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '4KQV ', 6: '2KQV ' }

/** @returns {import("@companion-module/base").CompanionSimplePresetDefinition} */
function simplePreset(name, actionId, options) {
	return {
		type: 'simple',
		name,
		style: {
			text: name,
			size: '18',
			color: 0xffffff,
			bgcolor: 0x000000,
		},
		steps: [{ down: [{ actionId, options }], up: [] }],
		feedbacks: [],
	}
}

export function getPresets() {
	/** @type {import("@companion-module/base").CompanionPresetDefinitions} */
	const presets = {}
	/** @type {import("@companion-module/base").CompanionPresetSection[]} */
	const structure = []

	for (const output of OUTPUT_CHOICES) {
		const ids = []
		for (const input of INPUT_CHOICES) {
			const id = `route_${input.id}_${output.id}`
			presets[id] = simplePreset(`${INPUT_SHORT_LABELS[input.id]}@${output.id}`, 'route', {
				out: output.id,
				inp: input.id,
			})
			ids.push(id)
		}
		structure.push({ id: `output_${output.id}`, name: output.label, definitions: ids })
	}

	const modeIds = []
	for (const mode of MODE_CHOICES) {
		const id = `mode_${mode.id}`
		presets[id] = simplePreset(mode.label, 'mode', { mode: mode.id })
		modeIds.push(id)
	}
	presets.refresh = simplePreset('Refresh', 'refresh', {})

	structure.push({ id: 'multiviewer', name: 'Multiviewer', definitions: [...modeIds, 'refresh'] })

	return { structure, presets }
}
