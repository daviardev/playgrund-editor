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

// Selectores de id de los textarea


const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

// Eventos para que se actualice el doc del html, css y js

$js.addEventListener('input', Update)
$css.addEventListener('input', Update)
$html.addEventListener('input', Update)

function Update () {
    const html = $html.value
    const css = $css.value
    const js = $js.value

    // Generar URL al escribir código
    const hashedCode = ` ${ window.btoa(html) } | ${ window.btoa(css) } | ${ window.btoa(js) } `
    window.history.replaceState(null, null, `/${hashedCode}`)

    
    const htmlForPreview = CreateHTML({ html, css, js })
    $('iframe').setAttribute('srcdoc', htmlForPreview)
}

// Crea estructura de html cada vez que se cree un documento nuevo

const CreateHTML = ({ html, css, js }) => {
    return `
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <style>
            ${ css }
        </style>
    </head>
    <body>
    <script>
        ${ js }
    </script>
    ${ html }
</body>
</html>
    `
}