import '../style.css'
import './utils/aside.js'
import './grid.js'

import { $ } from './utils/dom.js'
import { events } from './events'
import { getState } from './state.js'
import { createEditor } from './editor.js'
import { encode, decode } from 'js-base64'
import { initEditorHoykeys } from './utils/editor-hotkeys.js'

console.log(getState())

import debounce from './utils/debounce.js'

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

const { pathname } = window.location

const [decodeHtml, decodeCss, decodeJs] = pathname.slice(1).split('%7C')

const html = decodeHtml ? decode(decodeHtml) : ''
const css = decodeCss ? decode(decodeCss) : ''
const js = decodeJs ? decode(decodeJs) : ''

const htmlEditor = createEditor({ domElement: $html, language: 'html', value: html })
const jsEditor = createEditor({ domElement: $js, language: 'javascript', value: js })
const cssEditor = createEditor({ domElement: $css, language: 'css', value: css })

events.on('settings:change', e => {
  
})

const MS_UPDATE_DEBOUCED_TIME = 200
const debounceUpdate = debounce(update, MS_UPDATE_DEBOUCED_TIME)

htmlEditor.focus()
htmlEditor.onDidChangeModelContent(debounceUpdate)
cssEditor.onDidChangeModelContent(debounceUpdate)
jsEditor.onDidChangeModelContent(debounceUpdate)

initEditorHoykeys({ htmlEditor, cssEditor, jsEditor })

const htmlForPreview = createHtml({ html, css, js })
$('iframe').setAttribute('srcdoc', htmlForPreview)

function update () {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

// internal expand API,
function createHtml ({ html, css, js }) {
  return `
    <!DOCTYPE html>
    <html lang='es'>
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script type='module'>
          ${js}
        </script>
      </body>
    </html>`
}