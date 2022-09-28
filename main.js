import './style.css'
import Split from 'split-grid'

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

$html.addEventListener('input', update)
$css.addEventListener('input', update)
$js.addEventListener('input', update)

function init () {
  const { pathname } = window.location

  const [decodeHtml, decodeCss, decodeJs] = pathname.slice(1).split('%7C')

  const html = window.atob(decodeHtml)
  const css = window.atob(decodeCss)
  const js = window.atob(decodeJs)

  $html.value = html
  $css.value = css
  $js.value = js

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

function update () {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedCode = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

const createHtml = ({ html, css, js }) => {
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
      </body>
      <script>
        ${js}
      </script>
    </html>
  `  
}

init()