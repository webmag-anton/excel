import {defaultStyles, defaultTitle} from '../constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
}

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
  }
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}