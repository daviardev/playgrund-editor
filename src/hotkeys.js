import hotkeys from "hotkeys-js";

hotkeys('ctrl+a,ctrl+b,b,r,f', function (event, handler) {
    switch (handler.key) {
        case 'ctrl+a': window.alert('Precionaste la combinación de ctrl + a')
        break
        case 'ctrl+b': window.alert('Precionaste la combinación de ctrl + b')
          break
        case 'r': window.alert('Precionaste la tecla r')
          break
        case 'f': window.alert('Precionaste la tecla f')
          break
        default: window.alert(event)
    }
})