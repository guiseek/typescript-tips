/**
 * Template literal types
 */

export type CSSId = `#${string}`
export type CSSAttr = `[${string}]`
export type CSSClass = `.${string}`

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
  // el4: query(`canvas`),
}
