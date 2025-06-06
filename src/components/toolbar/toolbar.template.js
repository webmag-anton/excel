function toButton({icon, active, value}) {
  const meta = `
    data-type='button'
    data-value='${JSON.stringify(value)}'
  `

  return `
    <div 
      class='button ${active ? 'active' : ''}'
      ${meta}
    >
      <span 
        class='material-icons'
        ${meta}
      >
        ${icon}
      </span>
    </div>
  `
}

export function createToolbar(s) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: s['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: s['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: s['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: s['fontWeight'] === 'bold',
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: s['fontStyle'] === 'italic',
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underline',
      active: s['textDecoration'] === 'underline',
      value: {textDecoration: s['textDecoration'] === 'underline'
          ? 'none'
          : 'underline'
      }
    }
  ]

  return buttons.map(toButton).join('')
}