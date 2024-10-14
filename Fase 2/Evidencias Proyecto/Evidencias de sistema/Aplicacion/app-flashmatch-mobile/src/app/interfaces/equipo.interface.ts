export interface Equipo {
  id_equipo: string;
  nombre_equipo: string;
  logo_equipo: string;
  descripcion_equipo: string;
  creado_en: string;
  creador: Creador;
  deporte: Deporte;
  rangoEdad: RangoEdad;
}

export interface Creador {
  id_usuario: string;
  nombre: string;
  apellido: string;
  rut: string;
  fecha_nacimiento: string;
  telefono: string;
  correo: string;
  roles: string[];
  imagen_perfil: any;
  activo: boolean;
  creado_en: string;
}

export interface Deporte {
  id_deporte: string;
  nombre_deporte: string;
  icono: string;
}

export interface RangoEdad {
  id_rango: string;
  descripcion: string;
  edad_minima: number;
  edad_maxima: number;
}
