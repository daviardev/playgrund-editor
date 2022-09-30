import './style.css'
import Split from 'split-grid'
import { encode, decode }from 'js-base64'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'

self.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') {
      return new HtmlWorker()
    }
    if (label === 'javascript') {
      return new JsWorker()
    }
    if (label === 'css') {
      return new CssWorker()
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

const html = decodeHtml ? decode(decodeHtml) : ''
const css = decodeCss ? decode(decodeCss) : ''
const js = decodeJs ? decode(decodeJs) : ''

const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  fontSize: 18,
  theme: 'vs-dark'
}

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: 'html',
  ...COMMON_EDITOR_OPTIONS
})

const jsEditor = monaco.editor.create($js, {
  value: js,
  language: 'javascript',
  ...COMMON_EDITOR_OPTIONS
})

const cssEditor = monaco.editor.create($css, {
  value: css,
  language: 'css',
  ...COMMON_EDITOR_OPTIONS
})

htmlEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)

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