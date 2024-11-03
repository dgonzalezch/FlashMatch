export enum CONTEXT {
  API_AUTH = '/api/auth/',
  API_EQUIPO = '/api/equipo/',
  API_DEPORTE = '/api/deporte/',
  API_DEPORTE_POSICION_USUARIO = '/api/deporte-posicion-usuario/',
  API_ESTADISTICA_DETALLADA_USUARIO = '/api/estadistica-detallada-usuario/',
  API_RANGO_EDAD = '/api/rango-edad/',
  API_USUARIO = '/api/usuario/',
  API_TIPO_PARTIDO = '/api/tipo-partido/',
  API_NIVEL_HABILIDAD = '/api/nivel-habilidad/',
  API_TIPO_EMPAREJAMIENTO = '/api/tipo-emparejamiento/',
  API_CANCHA = '/api/cancha/',
  API_MATERIAL_CANCHA = '/api/material-cancha/',
  API_RESERVA = '/api/reserva/',
  API_PARTIDO = '/api/partido/',
  API_USUARIO_PARTIDO = '/api/usuario-partido/',
  API_MATCHMAKING = '/api/matchmaking/'
}

export enum ENDPOINT {
  AUTH_REGISTER = 'register/',
  AUTH_LOGIN = 'login',
  AUTH_CHECK_STATUS = 'check-status',
  AUTH_CHANGE_PASSWORD = 'change-password',
  RESERVA_CANCHA = 'cancha/',
  JOIN_PARTIDO = 'join',
  CANCHAS_DISPONIBLES = 'disponibles',
  UPLOAD_PROFILE_PICTURE = 'upload-profile-picture/'
}
