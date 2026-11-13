import React from 'react'
import ReactDOM from 'react-dom/client'
// import axios from 'axios'

import App from './App'
/*Una promesa es un objeto que representa la eventual finalizacion de una operacion asincrona */
// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise) //state : fulfilled -> cumplida
// promise.then(response => console.log(response))

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2) //state: rejected -> rechazada === error

// //para acceder a los datos: controlador de eventos en la promesa
// promise.then(response => {
//   console.log(response)
// })

// axios
//     .get('http://localhost:3001/notes')
//     .then(response => {
//         console.log(typeof response) //como tal el contenido de notes es json pero axios lo convierte automaticamente en un objeto
//         const notes = response.data
//         console.log(notes)
//     })

// axios.get('http://localhost:3001/notes').then(response => {
//     const notes = response.data
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })
//⬆️ mala práctica


ReactDOM.createRoot(document.getElementById('root')).render(<App />)