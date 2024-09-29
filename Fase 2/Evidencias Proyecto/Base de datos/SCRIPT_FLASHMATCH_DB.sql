-- EXTENSION pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- DROP DE TABLAS
DROP TABLE IF EXISTS usuarios_titulos CASCADE;
DROP TABLE IF EXISTS titulos_perfil CASCADE;
DROP TABLE IF EXISTS opiniones_valoraciones CASCADE;
DROP TABLE IF EXISTS mensajes CASCADE;
DROP TABLE IF EXISTS notificaciones CASCADE;
DROP TABLE IF EXISTS invitaciones CASCADE;
DROP TABLE IF EXISTS participacion_usuarios_partidos CASCADE;
DROP TABLE IF EXISTS partidos CASCADE;
DROP TABLE IF EXISTS miembros_equipo CASCADE;
DROP TABLE IF EXISTS disponibilidad_usuarios CASCADE;
DROP TABLE IF EXISTS reservas_horarios CASCADE;
DROP TABLE IF EXISTS imagenes_canchas CASCADE;
DROP TABLE IF EXISTS dias_no_laborables CASCADE;
DROP TABLE IF EXISTS disponibilidad_horarios_canchas CASCADE;
DROP TABLE IF EXISTS canchas CASCADE;
DROP TABLE IF EXISTS estadisticas_detalladas_usuarios CASCADE;
DROP TABLE IF EXISTS parametros_rendimiento CASCADE;
DROP TABLE IF EXISTS documentos_identidad CASCADE;
DROP TABLE IF EXISTS rangos_edad CASCADE;
DROP TABLE IF EXISTS niveles_habilidad CASCADE;
DROP TABLE IF EXISTS deportes CASCADE;
DROP TABLE IF EXISTS equipos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(9) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(15) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    clave TEXT NOT NULL,
    roles TEXT[] DEFAULT ARRAY['usuario'],
    imagen_perfil TEXT,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de rangos de edad
CREATE TABLE rangos_edad (
    id_rango UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descripcion VARCHAR(50) UNIQUE NOT NULL,
    edad_minima INT NOT NULL,
    edad_maxima INT NOT NULL
);

-- Tabla de niveles de habilidad
CREATE TABLE niveles_habilidad (
    id_nivel UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descripcion VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de deportes
CREATE TABLE deportes (
    id_deporte UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_deporte VARCHAR(100) UNIQUE NOT NULL,
    icono TEXT NOT NULL
);

-- Tabla de canchas
CREATE TABLE canchas (
    id_cancha UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_cancha VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255),
    id_deporte UUID REFERENCES deportes(id_deporte),
    precio_por_hora NUMERIC(10, 2) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    latitud DECIMAL(10, 8) CHECK (latitud BETWEEN -90 AND 90),
    longitud DECIMAL(11, 8) CHECK (longitud BETWEEN -180 AND 180),
    id_administrador UUID REFERENCES usuarios(id_usuario)
);

-- Tabla de disponibilidad de horarios de canchas
CREATE TABLE disponibilidad_horarios_canchas (
    id_disponibilidad UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_cancha UUID REFERENCES canchas(id_cancha),
    dia_semana INT CHECK (dia_semana BETWEEN 1 AND 7),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- Tabla de disponibilidad de usuarios
CREATE TABLE disponibilidad_usuarios (
    id_disponibilidad_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    dia_semana INT CHECK (dia_semana BETWEEN 1 AND 7),  -- 1 = Lunes, 2 = Martes, ..., 7 = Domingo
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- Tabla de imágenes de canchas
CREATE TABLE imagenes_canchas (
    id_imagen UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_cancha UUID REFERENCES canchas(id_cancha),
    url_imagen TEXT NOT NULL,
    descripcion VARCHAR(255),
    subida_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de equipos
CREATE TABLE equipos (
    id_equipo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_equipo VARCHAR(100) UNIQUE NOT NULL,
    logo_equipo TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_creador UUID REFERENCES usuarios(id_usuario) NOT NULL,
    id_deporte UUID REFERENCES deportes(id_deporte) NOT NULL,
    id_rango UUID REFERENCES rangos_edad(id_rango)
);

-- Tabla de reservas de horarios de canchas
CREATE TABLE reservas_horarios (
    id_reserva UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_cancha UUID REFERENCES canchas(id_cancha),
    id_equipo UUID REFERENCES equipos(id_equipo),
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    reservado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_reserva VARCHAR(20) DEFAULT 'pendiente', -- Estado de la reserva (pendiente, aceptada, rechazada)
    mensaje VARCHAR(255), -- Comentarios o razones del administrador
    UNIQUE (id_cancha, fecha_reserva, hora_inicio)
);

-- Tabla de miembros de equipo
CREATE TABLE miembros_equipo (
    id_miembro_equipo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_equipo UUID REFERENCES equipos(id_equipo),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    rol VARCHAR(50)
);

-- Tabla de días no laborables de canchas
CREATE TABLE dias_no_laborables (
    id_dia_no_laborable UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_cancha UUID REFERENCES canchas(id_cancha),
    fecha DATE NOT NULL,
    motivo TEXT
);

-- Tabla de partidos
CREATE TABLE partidos (
    id_partido UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha_partido TIMESTAMP NOT NULL,
    id_cancha UUID REFERENCES canchas(id_cancha),
    equipo_1_id UUID REFERENCES equipos(id_equipo),
    equipo_2_id UUID REFERENCES equipos(id_equipo),
    estado VARCHAR(50) NOT NULL,
    id_nivel_habilidad UUID REFERENCES niveles_habilidad(id_nivel),
    id_rango UUID REFERENCES rangos_edad(id_rango),
    CHECK (equipo_1_id <> equipo_2_id)
);

-- Tabla de participación de usuarios en partidos
CREATE TABLE participacion_usuarios_partidos (
    id_participacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_partido UUID REFERENCES partidos(id_partido),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    id_equipo UUID REFERENCES equipos(id_equipo),
    fecha_participacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmado BOOLEAN DEFAULT FALSE
);

-- Tabla de notificaciones
CREATE TABLE notificaciones (
    id_notificacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    creada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mensajes
CREATE TABLE mensajes (
    id_mensaje UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_remitente UUID REFERENCES usuarios(id_usuario),
    id_destinatario UUID REFERENCES usuarios(id_usuario),
    contenido TEXT NOT NULL,
    enviado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);

-- Tabla de invitaciones a partidos y equipos
CREATE TABLE invitaciones (
    id_invitacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_remitente UUID REFERENCES usuarios(id_usuario),
    id_destinatario UUID REFERENCES usuarios(id_usuario),
    tipo_invitacion VARCHAR(20) CHECK (tipo_invitacion IN ('equipo', 'partido')) NOT NULL,
    id_equipo UUID REFERENCES equipos(id_equipo),
    id_partido UUID REFERENCES partidos(id_partido),
    mensaje TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente' -- Estado (pendiente, aceptada, rechazada)
);

-- Tabla de opiniones y valoraciones
CREATE TABLE opiniones_valoraciones (
    id_opinion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    id_cancha UUID REFERENCES canchas(id_cancha),
    id_equipo UUID REFERENCES equipos(id_equipo),
    id_usuario_valorado UUID REFERENCES usuarios(id_usuario),
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    tipo_valoracion VARCHAR(20) CHECK (tipo_valoracion IN ('cancha', 'equipo', 'usuario')) NOT NULL
);

-- Tabla de parámetros de rendimiento
CREATE TABLE parametros_rendimiento (
    id_parametro UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_parametro VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    valor_minimo NUMERIC(5, 2) DEFAULT 0.0,
    valor_maximo NUMERIC(5, 2) DEFAULT 100.0
);

-- Tabla de estadísticas detalladas de usuarios
CREATE TABLE estadisticas_detalladas_usuarios (
    id_estadistica_detallada UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    id_parametro UUID REFERENCES parametros_rendimiento(id_parametro),
    parametro_valor NUMERIC(5, 2) NOT NULL CHECK (parametro_valor >= 0 AND parametro_valor <= 100)
);

-- Tabla de títulos de perfil
CREATE TABLE titulos_perfil (
    id_titulo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_titulo VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    criterio_partidos_jugados INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios-títulos
CREATE TABLE usuarios_titulos (
    id_usuario_titulo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    id_titulo UUID REFERENCES titulos_perfil(id_titulo),
    fecha_obtenido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_usuario, id_titulo)
);

-- Tabla de documentos de identidad
CREATE TABLE documentos_identidad (
    id_documento UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    tipo_documento VARCHAR(50) NOT NULL,
    numero_documento VARCHAR(50) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_expiracion DATE,
    archivo_documento TEXT NOT NULL
);

-- INSERT DE INFORMACIÓN INICIAL
INSERT INTO rangos_edad (descripcion, edad_minima, edad_maxima) VALUES 
('18 - 25 años', 18, 25),
('26 - 35 años', 26, 35),
('36 - 45 años', 36, 45),
('46 - 55 años', 46, 55),
('56 años o más', 56, 120);

INSERT INTO niveles_habilidad (descripcion) VALUES 
('Principiante'),
('Intermedio'),
('Avanzado');

INSERT INTO deportes (nombre_deporte, icono) VALUES 
('Fútbol 11', 'ion-icon-futbol'), 
('Fútbol 7', 'ion-icon-futbol'), 
('Fútbol 5', 'ion-icon-futbol');

INSERT INTO titulos_perfil (nombre_titulo, descripcion) VALUES 
('Novato', 'Jugó su primer partido'), 
('Experto', 'Jugó más de 100 partidos');