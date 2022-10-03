import './grid.js'
import '../style.css'
import './settings.js'
import './skypack.js'
import './utils/aside.js'

import { $ } from './utils/dom.js'
import { subscribe } from './state.js'
import { capitalize } from './utils/string.js'
import { createEditor } from './editor.js'
import { encode, decode } from 'js-base64'
import { initEditorHoykeys } from './utils/editor-hotkeys.js'

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

window.onmessage = ({ data }) => {
  if (Object.prototype.toString.call(data) === '[object Object]' && Object.keys(data).includes('package')) {
    jsEditor.setValue(`import ${capitalize(data.package)} from '${data.url}';\n${jsEditor.getValue()}`)
  }
}

subscribe(state => {
  const editors = [htmlEditor, jsEditor, cssEditor]
  editors.forEach(editor => {
    const { minimap, ...restOfOptions } = state

    const newOptions = {
      ...restOfOptions,
      minimap: {
        enabled: minimap
      }
    }
    editor.updateOptions({
      ...editor.getRawOptions(),
      ...newOptions
    })
  })
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
