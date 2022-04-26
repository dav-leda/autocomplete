
import { arrayNombres } from './arrayNombres.js'

const select = document.querySelector.bind(document)
const create = document.createElement.bind(document)
const nombreInput = select('#nombre')
const lista = select('#lista')
const posibles = select('#posibles')

// Copio los nombres a un nuevo array que va a ser modificado
// cada vez que se agregue un nombre a la lista de presentes
const array = [...arrayNombres].sort();

// Array vacío para guardar los nombres de los presentes:
const presentes = [];

const mostrarPosibles = filtrado => {
  filtrado.forEach( item => {
    let li = create('li');
    li.id = item;
    li.textContent = item;
    posibles.appendChild(li);
    li.onmouseover = () => {
      li.style.background = 'darkgreen'
      li.style.color = 'white'
    }
    li.onmouseleave = () => {
      li.style.background = 'white'
      li.style.color = 'black'
    }
    li.onclick = () => {
      nombreInput.value = item;
      posibles.innerHTML = '';
      nombreInput.focus()
    }
  })
}

const chequearNombres = (letras, event) => {
  if (letras) {
    // 13 es el codigo de la tecla ENTER
    if (event.key == 'Enter' || event.keyCode == 13) {
      agregarAlumno(nombreInput.value)
    } else {
      posibles.innerHTML = '';
      const filtrado = filtrarNombres(array, letras)
      mostrarPosibles(filtrado)
    } 
  } else {
    posibles.innerHTML = ''
  }
}

const agregarAlumno = nombre => {

  // Pasar la primera letra del nombre ingresado a mayúsculas
  const Nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()

  // Solo agrego el nombre a la lista de alumnos
  // si el nombre pertenece a la lista original (array)
  if (array.includes(Nombre)) {
    // Agrego el nombre al array de presentes:
    presentes.push(Nombre)
    // Borro el nombre del array inicial:
    let index = array.indexOf(Nombre)
    array.splice(index, 1)

    // Muestro el nombre en la lista de alunnos:
    mostrarAlumnos(Nombre)

  } else {
    // Si no esta en la lista muestro un mensaje de error:
    posibles.innerHTML = `<p 
    style="color: red; font-size: 12px;">
    ${nombre} no es alumn@.</p>`
  }
}

const mostrarAlumnos = nombre => {
  let li = create('li')
  li.textContent = nombre + ' ✅'
  lista.appendChild(li)
  nombreInput.value = ''
  posibles.innerHTML = ''
  nombreInput.focus()
}

const filtrarNombres = (array, letras) => {
  const filtrado = array.filter(nombre => {
    const nombreMin = nombre.toLowerCase()
    const letrasMin = letras.toLowerCase()
    // Si el nombre empieza con las letras ingresadas
    // el callback retorna true, con lo cual ese nombre pasa el filtro
    return nombreMin.substr(0, letrasMin.length) === letrasMin
  })
  // Retorno la lista filtrada:
  return filtrado
}

nombre.addEventListener('keyup', (event) => {
  // Cada vez que se oprime una letra
  // esta funcion chequea si hay algun nombre
  // que comience con esas letras:
  chequearNombres(nombre.value, event)
})





