import { CSSAttr, CSSClass, CSSId } from './template-literals'

/**
 * Conditional Types
 */
export function query<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): HTMLElementTagNameMap[K]

export function query(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): HTMLElement

export function query<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): K extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[K]
  : HTMLElement

export function query(
  selector: CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements = {
  el1: query(`#id`),
  el2: query(`[attr]`),
  el3: query(`.class`),
  el4: query(`button`),
}

const element = query<'button'>(`#my-button`)
