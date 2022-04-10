import { query, queryAll } from './core/query'
import './style.scss'

const app = document.querySelector('#app')

const form = query<'form'>('#form')

// app.appendChild(form)

const elements = {
  label: query<'label'>('.label', form),
  input: query<'input'>('[id="attr"]', form),
  output: query('output', form),
}

console.log(form, elements);

const forms = queryAll('form')

console.log(forms);
