export const $$ = selector => document.querySelectorAll(selector)
export const $ = selector => document.querySelector(selector)
export const isNodeSelect = el => el.nodeName === 'SELECT'
export const isNodeCheckbox = el => el.nodeName === 'INPUT' && el.type === 'checkbox'

const updateSelectValue = (el, value) => {
  const optionsToSelect = el.querySelector(`option[value="${value}"`)
  if (!optionsToSelect) return console.warn('Opción escogida no se encontró')
  optionsToSelect.setAttribute('selected', '')
}
export const setFormControlValue = (el, value) => {
  const isSelect = isNodeSelect(el)
  const isCheckbox = isNodeCheckbox(el)

  if (isSelect) updateSelectValue(el, value)
  else if (isCheckbox) el.checked = value
  else el.value = value
}
