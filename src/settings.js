import { $$ } from './utils/dom.js'
import { setState } from './state.js'

$$('#settings [data-for]').forEach(el => {
    el.addEventListener('change', ({ target }) => {
        const { checked, value } = target
        const settingKey = target.getAttribute('data-for')
        const isNumber = target.getAttribute('type') === 'number'

        let settingValue = typeof checked === 'boolean' ? checked : value
        if (isNumber) settingValue = +value

        setState({
          [settingKey]: settingValue
        })
    })
})