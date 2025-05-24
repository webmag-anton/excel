import {storage} from '../utils'

function storagePageName(param) {
  return `excel:${param}`
}

export class ServerClient {
  constructor(name) {
    this.name = storagePageName(name)
  }

  save(state) {
    return new Promise(resolve => {
      setTimeout(() => {
        storage(this.name, state)
        return Promise.resolve()
      }, 1500)
    })
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name)
      setTimeout(() => resolve(state), 2000)
    })
  }
}