import 'whatwg-fetch'
import {fetchConfig} from 'common/js/config'

const fetchRequest = (url, parama) => {
  const options = Object.assign({}, fetchConfig, parama)
  return new Promise((resolve, reject) => {
    fetch(url, options,).then(function(response) {
      if (response.ok) {
        resolve(response.json())
      }
      // handle HTTP response
    })
  })

}

export {
  fetchRequest
}
