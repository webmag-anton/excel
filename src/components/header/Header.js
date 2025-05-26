import {ExcelComponent} from '../../core/ExcelComponent'
import {changeTitle} from '../../redux/actions'
import {defaultTitle} from '../../constants'
import {ActiveRoute} from '../../core/routes/ActiveRoute'
import {$} from '../../core/dom'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type='text' class='input' value=${JSON.stringify(title)}>

      <div>
        <div class='button' data-button='remove'>
          <span class='material-icons' data-button='remove'>delete</span>
        </div>
        <div class='button' data-button='exit'>
          <span class='material-icons' data-button='exit'>exit_to_app</span>
        </div>
      </div>
    `
  }

  onInput(event) {
    this.$dispatch(changeTitle(event.target.value))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure you want to delete this table?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
