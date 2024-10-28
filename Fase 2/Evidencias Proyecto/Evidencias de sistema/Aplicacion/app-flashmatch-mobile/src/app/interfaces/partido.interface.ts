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
  deporte: Deporte
  nivelHabilidad: NivelHabilidad
  tipoEmparejamiento: TipoEmparejamiento
  rangoEdad: RangoEdad
  tipoPartido: TipoPartido
  reserva: Reserva
  creador: Creador
}

export interface Deporte {
  id_deporte: string
  nombre_deporte: string
  cantidad_min_jugadores: number
  cantidad_max_jugadores: number
  descripcion: any
  icono: string
}

export interface NivelHabilidad {
  id_nivel_habilidad: string
  nombre_nivel_habilidad: string
  descripcion: string
}

export interface TipoEmparejamiento {
  id_tipo_emparejamiento: string
  nombre_tipo_emparejamiento: string
  descripcion: string
}

export interface RangoEdad {
  id_rango_edad: string
  edad_minima: number
  edad_maxima: number
  descripcion: string
}

export interface TipoPartido {
  id_tipo_partido: string
  nombre_tipo_partido: string
  descripcion: string
}

export interface Reserva {
  id_reserva_cancha: string
  fecha_reserva: string
  hora_reserva: string
  estado: string
  comentario: string
  fecha_solicitud: string
  cancha: Cancha
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
  material: Material
}

export interface Material {
  id_material_cancha: string
  nombre_material_cancha: string
  descripcion: string
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
