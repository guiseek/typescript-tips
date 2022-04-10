# TypeScript Tips

## 4 truques simples e avançados  para obter verificações mais rigorosas com TypeScript

April 10, 2022 

## Template Literal Types

```ts
                👇

type CSSId = `#${string}`
type CSSAttr = `[${string}]`
type CSSClass = `.${string}`

export function query1(
  selector: CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements1 = {
  el1: query1(`#id`),
  el2: query1(`[attr]`),
  el3: query1(`.class`),
  el4: query1(`canvas`), // O argumento do tipo "canvas" não
                         // é atribuível ao parâmetro do tipo:
                         // '`#${string}` | `[${string}]` | `.${string}`'.
}

//  const elements1: {
//    el1: Element | null;
//    el2: Element | null;
//    el3: Element | null;
//    el4: Element | null;
//  }
```

## Keyof Type Operator

```ts
                                 👇

export function query2<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector) as HTMLElementTagNameMap[K]
}

const elements2 = {
  el1: query2(`#id`),
  el2: query2(`[attr]`),
  el3: query2(`.class`),
  el4: query2(`canvas`),
}

// const elements2: {
//    el1: HTMLElement | HTMLObjectElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | ... 63 more ... | HTMLVideoElement;
//    el2: HTMLElement | ... 67 more ... | HTMLVideoElement;
//    el3: HTMLElement | ... 67 more ... | HTMLVideoElement;
//    el4: HTMLCanvasElement;
//  }
```

## Function Overloads

```ts
export function query3<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): HTMLElementTagNameMap[K]

export function query3<K extends keyof HTMLElementTagNameMap>(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): HTMLElement

   👆

export function query3(
  selector: string,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements3 = {
  el1: query3(`#id`),
  el2: query3(`[attr]`),
  el3: query3(`.class`),
  el4: query3(`canvas`),
}

// const elements3 = {
//   el1: HTMLElement,
//   el2: HTMLElement,
//   el3: HTMLElement,
//   el4: HTMLCanvasElement,
// }

const element3 = query3<'canvas'>(`#my-canvas`)

// const element3: HTMLElement

// 🤔
```

## Conditional Types

```ts
export function query4<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): HTMLElementTagNameMap[K]

export function query4(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): HTMLElement

export function query4<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): K extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[K]
  : HTMLElement

   👆

export function query4(
  selector: CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements4 = {
  el1: query4(`#id`),
  el2: query4(`[attr]`),
  el3: query4(`.class`),
  el4: query4(`button`),
}

// const elements4 = {
//   el1: HTMLElement,
//   el2: HTMLElement,
//   el3: HTMLElement,
//   el4: HTMLCanvasElement,
// }

const element4 = query4<'button'>(`#my-button`)

// const element4: HTMLButtonElement
```

## Código completo

```ts
/**
 * Template literal types
 */
type CSSId = `#${string}`
type CSSAttr = `[${string}]`
type CSSClass = `.${string}`

export function query1(
  selector: CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements1 = {
  el1: query1(`#id`),
  el2: query1(`[attr]`),
  el3: query1(`.class`),
  el4: query1(`canvas`), // O argumento do tipo "canvas" não
                         // é atribuível ao parâmetro do tipo:
                         // '`#${string}` | `[${string}]` | `.${string}`'.
}

// 🤔

/**
 * Keyof Type Operator
 */
export function query2<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector) as HTMLElementTagNameMap[K]
}

const elements2 = {
  el1: query2(`#id`),
  el2: query2(`[attr]`),
  el3: query2(`.class`),
  el4: query2(`canvas`),
}

// 🤔

/**
 * Function Overloads
 */
export function query3<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): HTMLElementTagNameMap[K]

export function query3<K extends keyof HTMLElementTagNameMap>(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): HTMLElement

export function query3(
  selector: string,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements3 = {
  el1: query3(`#id`),
  el2: query3(`[attr]`),
  el3: query3(`.class`),
  el4: query3(`canvas`),
}

const element3 = query3<'canvas'>(`#my-canvas`)

// 🤔

/**
 * Conditional Types
 */
export function query4<K extends keyof HTMLElementTagNameMap>(
  selector: K,
  parent?: HTMLElement
): HTMLElementTagNameMap[K]

export function query4(
  selector: CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): HTMLElement

export function query4<K extends keyof HTMLElementTagNameMap>(
  selector: K | CSSId | CSSAttr | CSSClass,
  parent?: HTMLElement
): K extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[K]
  : HTMLElement

export function query4(
  selector: CSSId | CSSAttr | CSSClass,
  parent = document.body
) {
  return parent.querySelector(selector)
}

const elements4 = {
  el1: query4(`#id`),
  el2: query4(`[attr]`),
  el3: query4(`.class`),
  el4: query4(`button`),
}

const element4 = query4<'button'>(`#my-button`)

😃
```