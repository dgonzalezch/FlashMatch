-- EXTENSION pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- DROP DE TABLAS
DROP TABLE IF EXISTS usuario_titulo CASCADE;
DROP TABLE IF EXISTS titulo_perfil CASCADE;
DROP TABLE IF EXISTS opinion_valoracion CASCADE;
DROP TABLE IF EXISTS mensaje CASCADE;
DROP TABLE IF EXISTS notificacion CASCADE;
DROP TABLE IF EXISTS invitacion CASCADE;
DROP TABLE IF EXISTS participacion_usuario_partido CASCADE;
DROP TABLE IF EXISTS partido CASCADE;
DROP TABLE IF EXISTS miembro_equipo CASCADE;
DROP TABLE IF EXISTS disponibilidad_usuario CASCADE;
DROP TABLE IF EXISTS reserva_horario CASCADE;
DROP TABLE IF EXISTS imagen_cancha CASCADE;
DROP TABLE IF EXISTS dia_no_laborable CASCADE;
DROP TABLE IF EXISTS disponibilidad_horario_cancha CASCADE;
DROP TABLE IF EXISTS cancha CASCADE;
DROP TABLE IF EXISTS estadistica_detallada_usuario CASCADE;
DROP TABLE IF EXISTS deporte_posicion_usuario CASCADE;
DROP TABLE IF EXISTS parametro_rendimiento CASCADE;
DROP TABLE IF EXISTS documento_identidad CASCADE;
DROP TABLE IF EXISTS rango_edad CASCADE;
DROP TABLE IF EXISTS nivel_habilidad CASCADE;
DROP TABLE IF EXISTS deporte CASCADE;
DROP TABLE IF EXISTS equipo CASCADE;
DROP TABLE IF EXISTS tipo_partido CASCADE;
DROP TABLE IF EXISTS tipo_emparejamiento CASCADE;
DROP TABLE IF EXISTS partido_usuario CASCADE;
DROP TABLE IF EXISTS partido_equipo CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

-- Tabla de disponibilidad de horarios de cancha
CREATE TABLE disponibilidad_horario_cancha (
    id_disponibilidad UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE,
    dia_semana INT CHECK (dia_semana BETWEEN 1 AND 7),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT disponibilidad_hora_check CHECK (hora_inicio < hora_fin)
);

-- Tabla de disponibilidad de usuario
CREATE TABLE disponibilidad_usuario (
    id_disponibilidad_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    dia_semana INT CHECK (dia_semana BETWEEN 1 AND 7),  -- 1 = Lunes, 2 = Martes, ..., 7 = Domingo
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT disponibilidad_usuario_hora_check CHECK (hora_inicio < hora_fin)
);

-- Tabla de imágenes de cancha
CREATE TABLE imagen_cancha (
    id_imagen UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE,
    url_imagen TEXT NOT NULL,
    descripcion TEXT,
    subida_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de equipo
CREATE TABLE equipo (
    id_equipo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_equipo VARCHAR(100) UNIQUE NOT NULL,
    logo_equipo TEXT,
    ubicacion VARCHAR(255),
    latitud DECIMAL(20, 16) CHECK (latitud BETWEEN -90 AND 90),
    longitud DECIMAL(20, 16) CHECK (longitud BETWEEN -180 AND 180),
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    creador_id UUID REFERENCES usuario(id_usuario) NOT NULL,
    deporte_id UUID REFERENCES deporte(id_deporte) NOT NULL,
    rango_edad_id UUID REFERENCES rango_edad(id_rango_edad) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reservas de horarios de cancha
CREATE TABLE reserva_horario (
    id_reserva UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE,
    equipo_id UUID REFERENCES equipo(id_equipo) ON DELETE CASCADE,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    reservado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_reserva VARCHAR(20) DEFAULT 'pendiente',
    mensaje VARCHAR(255),
    UNIQUE (cancha_id, fecha_reserva, hora_inicio),
    CONSTRAINT reserva_hora_check CHECK (hora_inicio < hora_fin)
);

-- Tabla de miembro de equipo
CREATE TABLE miembro_equipo (
    id_miembro_equipo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipo_id UUID REFERENCES equipo(id_equipo) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    rol VARCHAR(50)
);

-- Tabla de días no laborables de cancha
CREATE TABLE dia_no_laborable (
    id_dia_no_laborable UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    motivo TEXT
);

-- Tabla de deportes
CREATE TABLE deporte (
    id_deporte UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_deporte VARCHAR(100) UNIQUE NOT NULL,
    cantidad_min_jugadores INT NOT NULL,
    cantidad_max_jugadores INT NOT NULL,
    descripcion TEXT,
    icono TEXT NOT NULL
);

-- Tabla de tipos de partidos
CREATE TABLE tipo_partido (
    id_tipo_partido UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_tipo_partido VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla de niveles de habilidad
CREATE TABLE nivel_habilidad (
    id_nivel_habilidad UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_nivel_habilidad VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla de rangos de edad
CREATE TABLE rango_edad (
    id_rango_edad UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edad_minima INT NOT NULL,
    edad_maxima INT NOT NULL,
    descripcion TEXT
);

-- Tabla de tipos de emparejamientos
CREATE TABLE tipo_emparejamiento (
    id_tipo_emparejamiento UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_tipo_emparejamiento VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla de usuario
CREATE TABLE usuario (
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(9) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15) UNIQUE NOT NULL,
    clave TEXT NOT NULL,
    ubicacion VARCHAR(255),
    latitud DECIMAL(20, 16) CHECK (latitud BETWEEN -90 AND 90),
    longitud DECIMAL(20, 16) CHECK (longitud BETWEEN -180 AND 180),
    imagen_perfil TEXT,
    roles TEXT[] DEFAULT ARRAY['usuario'],
    activo BOOLEAN DEFAULT TRUE
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de material de las canchas
CREATE TABLE material_cancha (
    id_material_cancha UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_material_cancha VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla de cancha
CREATE TABLE cancha (
    id_cancha UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_cancha VARCHAR(100) NOT NULL,
    precio_por_hora NUMERIC(10, 2) NOT NULL,
    ubicacion VARCHAR(255),
    latitud DECIMAL(20, 16) CHECK (latitud BETWEEN -90 AND 90),
    longitud DECIMAL(20, 16) CHECK (longitud BETWEEN -180 AND 180),
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    deporte_id UUID REFERENCES deporte(id_deporte),
    material_cancha_id UUID REFERENCES material_cancha(id_material_cancha),
    administrador_cancha_id UUID REFERENCES usuario(id_usuario),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de disponibilidad de cancha
CREATE TABLE disponibilidad_cancha (
    id_disponibilidad UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE,
    dia_semana INT NOT NULL CHECK (dia_semana BETWEEN 1 AND 7),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    CONSTRAINT disponibilidad_hora_check CHECK (hora_inicio < hora_fin)
);

-- Tabla de partidos
CREATE TABLE partido (
    id_partido UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha_partido TIMESTAMP NOT NULL,
    deporte_id UUID REFERENCES deporte(id_deporte) NOT NULL,
    tipo_partido_id UUID REFERENCES tipo_partido(id_tipo_partido) NOT NULL,
    nivel_habilidad_id UUID REFERENCES nivel_habilidad(id_nivel_habilidad) NOT NULL,
    rango_edad_id UUID REFERENCES rango_edad(id_rango_edad) NOT NULL,
    tipo_emparejamiento_id UUID REFERENCES tipo_emparejamiento(id_tipo_emparejamiento) NOT NULL,
    descripcion TEXT,
    cancha_id UUID REFERENCES cancha(id_cancha),
    usuario_creador_id UUID REFERENCES usuario(id_usuario) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relación partido-usuario
CREATE TABLE partido_usuario (
    partido_id UUID REFERENCES partido(id_partido) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    PRIMARY KEY (partido_id, usuario_id)
);

-- Relación partido-equipo
CREATE TABLE partido_equipo (
    partido_id UUID REFERENCES partido(id_partido) ON DELETE CASCADE,
    equipo_id UUID REFERENCES equipo(id_equipo) ON DELETE CASCADE,
    PRIMARY KEY (partido_id, equipo_id)
);

-- Tabla de participación de usuario en partido
CREATE TABLE participacion_usuario_partido (
    id_participacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partido_id UUID REFERENCES partido(id_partido),
    usuario_id UUID REFERENCES usuario(id_usuario),
    equipo_id UUID REFERENCES equipo(id_equipo),
    fecha_participacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmado BOOLEAN DEFAULT FALSE
);

-- Tabla de posiciones asociadas a los deportes
CREATE TABLE deporte_posicion (
    id_deporte_posicion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    nombre_deporte_posicion VARCHAR(50) NOT NULL,
    UNIQUE (deporte_id, nombre_deporte_posicion)
);

-- Tabla que registra las posiciones jugadas por los usuarios en deportes específicos
CREATE TABLE deporte_posicion_usuario (
    id_deporte_posicion_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    deporte_posicion_id UUID REFERENCES deporte_posicion(id_deporte_posicion) ON DELETE CASCADE,
    UNIQUE (usuario_id, deporte_id, deporte_posicion_id)
);

-- Tabla de notificaciones
CREATE TABLE notificacion (
    id_notificacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario),
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE
);

-- Tabla de mensajes
CREATE TABLE mensaje (
    id_mensaje UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    remitente_id UUID REFERENCES usuario(id_usuario),
    destinatario_id UUID REFERENCES usuario(id_usuario),
    contenido TEXT NOT NULL,
    enviado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);

-- Tabla de invitaciones a partidos y equipos
CREATE TABLE invitacion (
    id_invitacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    remitente_id UUID REFERENCES usuario(id_usuario),
    destinatario_id UUID REFERENCES usuario(id_usuario),
    tipo_invitacion VARCHAR(20) CHECK (tipo_invitacion IN ('equipo', 'partido')) NOT NULL,
    equipo_id UUID REFERENCES equipo(id_equipo),
    partido_id UUID REFERENCES partido(id_partido),
    mensaje TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente'
);

-- Tabla de opiniones y valoraciones
CREATE TABLE opinion_valoracion (
    id_opinion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario),
    cancha_id UUID REFERENCES cancha(id_cancha),
    equipo_id UUID REFERENCES equipo(id_equipo),
    usuario_valorado_id UUID REFERENCES usuario(id_usuario),
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    tipo_valoracion VARCHAR(20) CHECK (tipo_valoracion IN ('cancha', 'equipo', 'usuario')) NOT NULL
);

-- Tabla de parámetros de rendimiento
CREATE TABLE parametro_rendimiento (
    id_parametro_rendimiento UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deporte_id UUID REFERENCES deporte(id_deporte),
    nombre_parametro_rendimiento VARCHAR(100) NOT NULL,
    descripcion TEXT,
    UNIQUE (nombre_parametro_rendimiento, deporte_id)
);

-- Tabla de estadísticas detalladas de usuarios
CREATE TABLE estadistica_detallada_usuario (
    id_estadistica_detallada UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    parametro_rendimiento_id UUID REFERENCES parametro_rendimiento(id_parametro_rendimiento) ON DELETE CASCADE,
    parametro_valor NUMERIC(5, 2) NOT NULL CHECK (parametro_valor >= 0 AND parametro_valor <= 100),
    UNIQUE (usuario_id, deporte_id, parametro_rendimiento_id)
);

-- Tabla de títulos de perfil
CREATE TABLE titulo_perfil (
    id_titulo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_titulo VARCHAR(100) UNIQUE NOT NULL,
    criterio_partidos_jugados INT DEFAULT 0,
    descripcion TEXT
);

-- Tabla de usuarios-títulos
CREATE TABLE usuario_titulo (
    id_usuario_titulo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario),
    titulo_id UUID REFERENCES titulo_perfil(id_titulo),
    fecha_obtenido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, titulo_id)
);

-- Tabla de documentos de identidad
CREATE TABLE documento_identidad (
    id_documento UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuario(id_usuario),
    tipo_documento VARCHAR(50) NOT NULL,
    numero_documento VARCHAR(50) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_expiracion DATE,
    archivo_documento TEXT NOT NULL
);
