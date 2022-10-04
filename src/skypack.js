import debounce from './utils/debounce.js'
import { $ } from './utils/dom.js'

const apiUrl = 'https://api.skypack.dev/v1'
const cdnUrl = 'https://cdn.skypack.dev'

const $searchResults = $('#skypack .search-results')
const $searchResultsList = $searchResults.querySelector('ul')
const $searchResultsMessage = $('#skypack .search-results-message')
const $skypackSearch = $('#skypack input[type="search"]')
$skypackSearch.addEventListener('input', debounce(handleSearch, 200))

async function handleSearch () {
  const $searchInput = $skypackSearch

  $searchResults.classList.remove('hidden')
  $searchResultsList.innerHTML = ''

  let results = []

  const searchTerm = $searchInput.value.toLowerCase()

  if (searchTerm === '' || searchTerm.trim() === '') {
    $searchResults.classList.add('hidden')
    results = []
    return
  }

  $searchResultsMessage.innerHTML = 'Buscando...'

  results = await fetchPackages(searchTerm)

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    const $li = document.createElement('li')
    $li.title = result.description

    $li.innerHTML = `
        <strong>${result.name}</strong>
        <small>${result.description}</small>
    `

    $li.addEventListener('click', () => handlePackageSelected(result.name))

    $searchResultsList.appendChild($li)
  }

  $searchResultsMessage.innerHTML = `${results.length} resultados de "${searchTerm}"`
  $searchResults.classList.remove('hidden')
}

async function fetchPackages (packageName) {
  const response = await fetch(`${apiUrl}/search?q=${packageName}&p=1`)
  const data = await response.json()
  return data.results.map((result) => {
    return {
      name: result.name,
      description: result.description
    }
  })
}

function handlePackageSelected (packageName) {
  window.postMessage({ package: packageName, url: `${cdnUrl}/${packageName}` })
}