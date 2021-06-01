class Anuncio {
  constructor(id, titulo, transaccion, descripcion, precio) {
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

export default class Anuncio_Auto extends Anuncio {
  constructor(
    id,
    titulo,
    transaccion,
    descripcion,
    precio,
    cantPuertas,
    cantKMs,
    potencia
  ) {
    super(id, titulo, transaccion, descripcion, precio);
    this.cantPuertas = cantPuertas;
    this.cantKMs = cantKMs;
    this.potencia = potencia;
  }
}
