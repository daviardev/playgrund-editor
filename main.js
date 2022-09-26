import './style.css'

// Selectores de id de los textarea

const $ = selector => document.querySelector(selector)

const $js = $("#js")
const $css = $("#css")
const $html = $("#html")

// Eventos para que se actualice el doc del html, css y js

$js.addEventListener("input", Update)
$css.addEventListener("input", Update)
$html.addEventListener("input", Update)

function Update () {
    const html = CreateHTML()
    $("iframe").setAttribute("srcdoc", html)
}

// Crea estructura de html cada vez que se cree un documento nuevo

const CreateHTML = () => {
    const html = $html.value
    const css = $css.value
    const js = $js.value

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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