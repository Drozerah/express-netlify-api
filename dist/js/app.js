document.addEventListener('DOMContentLoaded', (event) => {

  // refs
  const display = document.getElementById('fetched-response')
  // get page location origin
  const origin = window.location.origin
  // set api endpoints
  const api = {
    products: `${origin}/api/v1/products`,
  }
  // fetch api by endpoint
  // then update given HTMLElement text content
  const fetchAPI = (url, HTMLElement) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // inject response to HTMLElement
        HTMLElement.innerHTML = JSON.stringify(data, 2, ' ')
        // highlight HTMLElement
        hljs.highlightElement(HTMLElement)
        // add .active selector to HTMLElement parent Element
        HTMLElement.parentElement.classList.add('active')
      })
      .catch((error) => {
        // print error
        console.error(error)
      })
  }
  // handle click events
  // fetch data
  document
    .getElementById('fetch-products')
    .addEventListener('click', (e) => {
      e.preventDefault()
      fetchAPI(api.products, display)
    })
  document
    .getElementById('fetch-products-by-id')
    .addEventListener('click', (e) => {
      e.preventDefault()
      const procuctId = e.target.dataset.id
      const url = `${api.products}/${procuctId}`
      console.log(`=> ${url}`) // !DEBUG
      fetchAPI(url, display)
    })
  document
    .getElementById('fetch-products-by-id-error')
    .addEventListener('click', (e) => {
      e.preventDefault()
      const procuctId = e.target.dataset.id
      const url = `${api.products}/${procuctId}`
      console.log(`=> ${url}`) // !DEBUG
      fetchAPI(url, display)
    })
})