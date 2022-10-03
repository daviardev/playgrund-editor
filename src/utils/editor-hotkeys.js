import * as monaco from 'monaco-editor'
import { $ } from '../utils/dom.js'

export const initEditorHoykeys = ({ htmlEditor, jsEditor, cssEditor }) => {
  const editors = [htmlEditor, jsEditor, cssEditor]

  editors.forEach(editor => {
    editor.addAction({
      id: 'open-settings',
      label: 'Open Settings',
      keybindgs: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_COMMA
      ],

      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,

      run: function (editor) {
        $('#settings').removeAttribute('hidden')
        $('#editor').setAttribute('hidden', '')
      }
    })
  })
}
