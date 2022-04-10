import { CSSAttr, CSSClass, CSSId } from '../types/css-selectors'


/**
 * [E].querySelector
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

/**
 * [E].querySelectorAll
 */
export function queryAll<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): NodeListOf<HTMLElementTagNameMap[K]>

export function queryAll(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): NodeListOf<HTMLElement>

export function queryAll<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): K extends keyof HTMLElementTagNameMap
  ? NodeListOf<HTMLElementTagNameMap[K]>
  : NodeListOf<HTMLElement>

export function queryAll(
  selector: CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelectorAll(selector)
}
