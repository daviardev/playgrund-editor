import { EventEmitter } from 'eventemitter3'
import { capitalize } from './utils/string.js'
import { downloadSourceCode } from './utils/download.js'

export const __ = new EventEmitter()

let htmlEditor
let jsEditor
let cssEditor

export const initializeEventsController = ({
    htmlEditor: _htmlEditor,
    jsEditor: _JSeditor,
    cssEditor: _cssEditor

}) => {
    htmlEditor = _htmlEditor,
    jsEditor = _JSeditor,
    cssEditor = _cssEditor
}

export const events = {
    ADD_SKYPACK_PACKAGE: 'ADD_SKYPACK_PACKAGE',
    DOWNLOAD_SOURCE_CODE: 'DOWNLOAD_SOURCE_CODE'
}

__.on(events.ADD_SKYPACK_PACKAGE, ({ skypackPackage, url }) => {
    jsEditor.setValue(`import ${capitalize(skypackPackage)} from '${url}';\n${jsEditor.getValue()}`)
})

__.on(events.DOWNLOAD_SOURCE_CODE, () => {
    downloadSourceCode({
        htmlContent: htmlEditor.getValue(),
        cssContent: cssEditor.getValue(),
        jsContent: jsEditor.getValue()
    })
})