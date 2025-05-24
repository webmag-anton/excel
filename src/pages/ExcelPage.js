import {Excel} from '../components/excel/Excel'
import {Header} from '../components/header/Header'
import {Toolbar} from '../components/toolbar/Toolbar'
import {Formula} from '../components/formula/Formula'
import {Table} from '../components/table/Table'
import {createStore} from '../core/store/createStore'
import {rootReducer} from '../redux/rootReducer'
import {Page} from '../core/Page'
import {normalizeInitialState} from '../redux/initialState'
import {StateProcessor} from '../core/stateClients/StateProcessor'
import {LocalStorageClient} from '../core/stateClients/LocalStorageClient'

export class ExcelPage extends Page {
  constructor(params) {
    super(params)

    this.store = null
    this.storeSub = null

    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }

  async getRoot() {
    const state = await this.processor.get()
    this.store = createStore(rootReducer, normalizeInitialState(state))
    this.storeSub = this.store.subscribe(this.processor.listen)

    const store = this.store

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()

    this.storeSub.unsubscribe()
    this.store = undefined
  }
}