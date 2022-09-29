import './style.css'
import Split from 'split-grid'
import { encode, decode }from 'js-base64'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'

self.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') {
      return new HtmlWorker()
    }
  }
}

const $ = selector => document.querySelector(selector)

Split({
  columnGutters: [{
      track: 1,
      element: $('.gutter-col-1')
  }],
  rowGutters: [{
      track: 1,
      element: $('.gutter-row-1')
  }]
})

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

const { pathname } = window.location

const [decodeHtml, decodeCss, decodeJs] = pathname.slice(1).split('%7C')

const html = decode(decodeHtml)
const css = decode(decodeCss)
const js = decode(decodeJs)

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: 'html',
  fontSize: 18,
  theme: 'vs-dark'
})

// $html.addEventListener('input', update)
htmlEditor.onDidChangeModelContent(update)
$css.addEventListener('input', update)
$js.addEventListener('input', update)

// $html.value = html
$css.value = css
$js.value = js

const htmlForPreview = createHtml({ html, css, js })
$('iframe').setAttribute('srcdoc', htmlForPreview)

function update () {
  const html = htmlEditor.getValue()
  const css = $css.value
  const js = $js.value

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

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
        <script>
          ${js}
        </script>
      </body>
    </html>
  `  
}