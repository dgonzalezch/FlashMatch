export interface Usuario {
  id_usuario: string
  nombre: string
  apellido: string
  rut: string
  fecha_nacimiento: string
  correo: string
  telefono: string
  ubicacion: any
  latitud: any
  longitud: any
  imagen_perfil: any
  roles: string[]
  activo: boolean
  creado_en: string
  equipos: any[]
  deportesPosicionesUsuarios: DeportesPosicionesUsuario[]
}
export interface DeportesPosicionesUsuario {
  id_deporte_posicion: string
  deporte: Deporte
  posicion: Posicion
}

export interface Posicion {
  id_posicion: string
  nombre: string
  deporte: Deporte
}

export interface Deporte {
  id_deporte: string
  nombre_deporte: string
  icono: string
}
