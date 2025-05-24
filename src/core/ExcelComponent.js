import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)

    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store

    this.subscribe = options.subscribe || []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() { // hook
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, cb) {
    const unsub = this.emitter.subscribe(event, cb)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }
  storeChanged(changes) {}
}