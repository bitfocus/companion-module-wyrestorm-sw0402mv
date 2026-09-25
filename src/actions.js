export const OUTPUT_CHOICES = [
	{ id: '1', label: 'Output 1' },
	{ id: '2', label: 'Output 2' },
]

export const INPUT_CHOICES = [
	{ id: '1', label: 'Input 1' },
	{ id: '2', label: 'Input 2' },
	{ id: '3', label: 'Input 3' },
	{ id: '4', label: 'Input 4' },
	{ id: '5', label: '4K QV' },
	{ id: '6', label: '2K QV' },
]

export const MODE_CHOICES = [
	{ id: '5', label: 'MV L' },
	{ id: '4', label: 'MV R' },
	{ id: '3', label: 'MV T' },
	{ id: '2', label: 'MV B' },
]

/**
 * @param {import("./main.js").default} instance
 * @returns {import("@companion-module/base").CompanionActionDefinitions}
 */
export function getActions(instance) {
	return {
		route: {
			name: 'Route inputs',
			options: [
				{ type: 'dropdown', label: 'Output', id: 'out', default: '1', choices: OUTPUT_CHOICES },
				{ type: 'dropdown', label: 'Input', id: 'inp', default: '1', choices: INPUT_CHOICES },
			],
			callback: async ({ options }) => instance.sendCommand(`VB${options.out}${options.inp}`),
		},
		mode: {
			name: 'Multiviewer mode',
			options: [{ type: 'dropdown', label: 'Mode', id: 'mode', default: '5', choices: MODE_CHOICES }],
			callback: async ({ options }) => instance.sendCommand(`VB3${options.mode}`),
		},
		refresh: {
			name: 'Refresh',
			options: [],
			callback: async () => instance.sendCommand('REFRESH'),
		},
	}
}
