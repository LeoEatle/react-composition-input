import React from 'react'
import { render } from 'react-dom'
import App from './App'

const $root = document.getElementById('root')
console.log('App', App)
render (
    <App />,
    $root
)
