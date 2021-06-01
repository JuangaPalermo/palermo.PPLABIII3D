import Anuncio_Auto from "./auto.js";

const autos = JSON.parse(localStorage.getItem("lista")) || [];

//#region events

window.addEventListener("DOMContentLoaded", () => {
  document.forms[0].addEventListener("submit", handlerSubmit);

  document.addEventListener("click", handlerClick);
  if (autos.length > 0) {
    handlerLoadList(autos);
  }
});

//#endregion

//#region spinner region

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "image spinner");
  document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner() {
  document.getElementById("spinner-container").innerHTML = "";
}

//#endregion

//#region handlers

function handlerSubmit(e) {
  e.preventDefault();
  const frm = e.target;

  if (frm.id.value) {
    const AutoEditado = new Anuncio_Auto(
      parseInt(frm.id.value),
      frm.titulo.value,
      frm.transaccion.value,
      frm.descripcion.value,
      frm.precio.value,
      frm.cantPuertas.value,
      frm.cantKMs.value,
      frm.potencia.value
    );
    if (confirm("Confirma modificacion?")) {
      agregarSpinner();

      setTimeout(() => {
        modificarAutomovil(AutoEditado);
        eliminarSpinner();
      }, 2000);
    }
  } else {
    const nuevoAuto = new Anuncio_Auto(
      Date.now(),
      frm.titulo.value,
      frm.transaccion.value,
      frm.descripcion.value,
      frm.precio.value,
      frm.cantPuertas.value,
      frm.cantKMs.value,
      frm.potencia.value
    );
    agregarSpinner();
    setTimeout(() => {
      altaAutomovil(nuevoAuto);
      eliminarSpinner();
    }, 2000);
  }
  limpiarFormulario(frm);
}

function handlerLoadList(e) {
  renderizarLista(crearTabla(autos), document.getElementById("divLista"));
}

function handlerClick(e) {
  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    console.log(id);
    cargarFormulario(id);
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);

    if (confirm("Confirma la Baja?")) {
      agregarSpinner();
      setTimeout(() => {
        let indice = autos.findIndex((el) => el.id == id);
        autos.splice(indice, 1);
        almacenarDatos(autos);
        console.log("Se elimino el Automovil");
        eliminarSpinner();
      }, 2000);
    }
    limpiarFormulario(document.forms[0]);
  }
}

//#endregion

//#region creacion del objeto

function altaAutomovil(a) {
  autos.push(a);
  almacenarDatos(autos);
  handlerLoadList();
}

function modificarAutomovil(a) {
  let index = autos.findIndex((elem) => {
    return elem.id == a.id;
  });

  autos.splice(index, 1, a);
  almacenarDatos(autos);
}

function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  handlerLoadList(data);
}

//#endregion

//#region creacion de la tabla

///crea la tabla completa
function crearTabla(items) {
  const tabla = document.createElement("table");

  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));

  return tabla;
}

///crea el thead dinamicamente
function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

///crea el tbody dinamicamente
function crearTbody(items) {
  const tbody = document.createElement("tbody");

  items.forEach((item) => {
    const tr = document.createElement("tr");
    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = item[key];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  return tbody;
}
//#endregion

//#region gestion de la lista

function renderizarLista(lista, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (lista) {
    contenedor.appendChild(lista);
  }
}

//#endregion

//#region gestion del form

function limpiarFormulario(frm) {
  frm.reset();
  document.getElementById("btnEliminar").classList.add("hidden");
  document.getElementById("btnSubmit").value = "Ingresar Automovil";
  document.forms[0].id.value = "";
}

function cargarFormulario(id) {
  const {
    titulo,
    transaccion,
    descripcion,
    precio,
    cantPuertas,
    cantKMs,
    potencia,
  } = autos.filter((p) => p.id === parseInt(id))[0];

  const frm = document.forms[0];

  frm.titulo.value = titulo;
  frm.transaccion.value = transaccion;
  frm.descripcion.value = descripcion;
  frm.precio.value = precio;
  frm.cantPuertas.value = cantPuertas;
  frm.cantKMs.value = cantKMs;
  frm.potencia.value = potencia;
  frm.id.value = id;

  document.getElementById("btnSubmit").value = "Modificar Automovil";
  document.getElementById("btnEliminar").classList.remove("hidden");
}

//#endregion
