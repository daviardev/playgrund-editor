import '../style.css'
import { encode, decode } from 'js-base64'
import Split from 'split-grid'

import debounce from './utils/debounce.js'
import { createEditor } from './editor.js'


const $ = selector => document.querySelector(selector)

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

const { pathname } = window.location

const [decodeHtml, decodeCss, decodeJs] = pathname.slice(1).split('%7C')

const html = decodeHtml ? decode(decodeHtml) : ''
const css = decodeCss ? decode(decodeCss) : ''
const js = decodeJs ? decode(decodeJs) : ''

const htmlEditor = createEditor({ domElement: $html, language: 'html', value: html })
const jsEditor = createEditor({ domElement: $js, language: 'javascript', value: js })
const cssEditor = createEditor({ domElement: $css, language: 'css', value: css })

Split({
  columnGutters: [{
    track: 1,
    element: $('.vertical-gutter')
  }],
  rowGutters: [{
    track: 1,
    element: $('.horizontal-gutter')
  }]
})

const MS_UPDATE_DEBOUCED_TIME = 200
const debounceUpdate = debounce(update, MS_UPDATE_DEBOUCED_TIME)

htmlEditor.onDidChangeModelContent(debounceUpdate)
cssEditor.onDidChangeModelContent(debounceUpdate)
jsEditor.onDidChangeModelContent(debounceUpdate)

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
    </html>
  `
}