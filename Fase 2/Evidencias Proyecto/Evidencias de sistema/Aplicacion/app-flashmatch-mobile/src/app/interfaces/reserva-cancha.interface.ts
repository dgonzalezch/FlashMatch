export interface ReservaCancha {
  id_reserva_cancha: string
  fecha_hora_reserva: string
  estado: string
  comentario: string
  fecha_solicitud: string
  cancha: Cancha
  partido: Partido
}

export interface Cancha {
  id_cancha: string
  nombre_cancha: string
  precio_por_hora: string
  ubicacion: string
  latitud: string
  longitud: string
  descripcion: string
  disponible: boolean
  creado_en: string
}

export interface Partido {
  id_partido: string
  fecha_partido: string
  descripcion: string
  estado: string
  partido_privado: boolean
  fecha_expiracion_reserva: string
  jugadores_actuales: number
  jugadores_requeridos: number
  creado_en: string
  creador: Creador
}

export interface Creador {
  id_usuario: string
  nombre: string
  apellido: string
  rut: string
  fecha_nacimiento: string
  correo: string
  telefono: string
  ubicacion: string
  latitud: string
  longitud: string
  imagen_perfil: any
  roles: string[]
  activo: boolean
  creado_en: string
}
