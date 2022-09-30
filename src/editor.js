import * as monaco from 'monaco-editor'
import { emmetHTML } from 'emmet-monaco-es'

const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  fontSize: 18,
  fontLigatures: true,
  fontFamily: 'Fira Code',
  theme: 'vs-dark',
  scrollBeyondLastLine: false,
  fixedOverflowWidgets: true,
  roundedSelection: false,
  padding: {
    top: 16
  },
  lineNumbers: false,
  minimap: {
    enabled: false
  }
}

emmetHTML(monaco)

export const createEditor = ({ domElement, language, value }) => {
  return monaco.editor.create(domElement, {
    value,
    language,
    ...COMMON_EDITOR_OPTIONS
  })
}
