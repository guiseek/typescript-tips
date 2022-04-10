import { CSSAttr, CSSClass, CSSId } from './template-literals'

/**
 * Function Overloads
 */
export function query<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): HTMLElementTagNameMap[K]

export function query<K extends keyof HTMLElementTagNameMap>(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): HTMLElement

export function query(selector: string, parent = document.body) {
  return parent.querySelector(selector)
}

const elements = {
  el1: query(`#id`),
  el2: query(`[attr]`),
  el3: query(`.class`),
  el4: query(`canvas`),
}

const element = query<'canvas'>(`#my-canvas`)
