export enum CONTEXT {
  API_AUTH = '/api/auth/',
  API_EQUIPOS = '/api/equipo/',
  API_DEPORTES = '/api/deporte/',
  API_DEPORTES_POSICIONES_USUARIOS = '/api/deporte-posicion-usuario/',
  API_ESTADISTICAS_DETALLADAS_USUARIOS = '/api/estadistica-detallada-usuario/',
  API_RANGOS_EDAD = '/api/rango-edad/',
  API_USUARIOS = '/api/usuario/',
  API_TIPOS_PARTIDOS = '/api/tipo-partido/',
  API_NIVELES_HABILIDAD = '/api/nivel-habilidad/',
  API_TIPOS_EMPAREJAMIENTOS = '/api/tipo-emparejamiento/',
  API_CANCHAS = '/api/cancha/'
}

export enum ENDPOINT {
  AUTH_REGISTER = 'register',
  AUTH_LOGIN = 'login',
  AUTH_CHECK_STATUS = 'check-status',
}
