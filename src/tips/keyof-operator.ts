import { CSSAttr, CSSClass, CSSId } from './template-literals'

/**
 * Keyof Type Operator
 */
export function query<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector) as HTMLElementTagNameMap[K]
}

const elements = {
  el1: query(`#id`),
  el2: query(`[attr]`),
  el3: query(`.class`),
  el4: query(`canvas`),
}
