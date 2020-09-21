
import data from '../data.json'

export let getDocument = (collection, name) =>
data[collection] &&
data[collection].filter(page => page.name === name)[0]

export let getDocuments = collection => data[collection] || []