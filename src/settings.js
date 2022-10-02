import { $$ } from './utils/dom.js'
import { getState } from './state.js'

const $settings = $$('#settings [data-for]')

const {
  updateSettings,
  ...settings
} = getState()

$settings.forEach(el => {
    const settingKey = el.getAttribute('data-for')
    const actualSettingValue = settings[settingKey]
    const isSelect = el.nodeName === 'SELECT'
    const isCheckbox = el.nodeName === 'INPUT' && el.type === 'checkbox'

    if (isSelect) {
      const optionsToSelect = el.querySelector(`option[value="${actualSettingValue}"`)
      if (!optionsToSelect) return console.warn('[settings] Opción escogida no se encontró')
      optionsToSelect.setAttribute('selected', '')
    }

    if (isCheckbox) el.checked = actualSettingValue
    else el.value = actualSettingValue

    el.addEventListener('change', ({ target }) => {
        const { checked, value } = target
        const settingKey = target.getAttribute('data-for')
        const isNumber = target.getAttribute('type') === 'number'

        let settingValue = typeof checked === 'boolean' ? checked : value
        if (isNumber) settingValue = +value

        updateSettings({
          key: settingKey,
          value: settingValue
        })
    })
})