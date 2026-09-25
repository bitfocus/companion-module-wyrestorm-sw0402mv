import { InstanceBase, InstanceStatus, Regex } from '@companion-module/base'
import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { UpgradeScripts } from './upgrades.js'

export { UpgradeScripts }

export default class WyrestormInstance extends InstanceBase {
	async init(config) {
		this.config = config

		this.setActionDefinitions(getActions(this))
		const { structure, presets } = getPresets()
		this.setPresetDefinitions(structure, presets)

		this.updateStatus(InstanceStatus.Ok)
	}

	async configUpdated(config) {
		this.config = config
	}

	async destroy() {
		this.log('debug', 'destroy')
	}

	/** @returns {import("@companion-module/base").SomeCompanionConfigField[]} */
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will control Wyrestorm SW-0402-MV Multiviewer',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
		]
	}

	async sendCommand(cmd) {
		const url = `http://${this.config.host}/BasicVideoSendCMD.CGI?num=${cmd}`
		try {
			const response = await fetch(url)
			if (!response.ok) {
				this.log('error', `Error from wyrestorm: HTTP ${response.status}`)
				this.updateStatus(InstanceStatus.UnknownError, `HTTP ${response.status}`)
				return
			}
			this.updateStatus(InstanceStatus.Ok)
		} catch (e) {
			this.log('error', `Error from wyrestorm: ${e}`)
			this.updateStatus(InstanceStatus.ConnectionFailure, String(e))
		}
	}
}
