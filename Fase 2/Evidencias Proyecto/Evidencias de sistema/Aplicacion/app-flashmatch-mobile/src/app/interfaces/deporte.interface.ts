export interface Root {
  id_deporte: string
  nombre_deporte: string
  icono: string
  equipos: any[]
  deportesPosiciones: DeportesPosiciones[]
}

export interface DeportesPosiciones {
  id_posicion: string
  nombre: string
  deporte: Deporte
}

export interface Deporte {
  id_deporte: string
  nombre_deporte: string
  icono: string
}
