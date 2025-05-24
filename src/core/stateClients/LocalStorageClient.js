import {storage} from '../utils'

function storagePageName(param) {
  return `excel:${param}`
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storagePageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(storage(this.name))
  }
}