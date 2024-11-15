-- Crear base de datos
CREATE DATABASE flashmatch_db;

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.evaluacion_jugador CASCADE;
DROP TABLE IF EXISTS public.notificacion CASCADE;
DROP TABLE IF EXISTS public.usuario_partido CASCADE;
DROP TABLE IF EXISTS public.nivel_habilidad CASCADE;
DROP TABLE IF EXISTS public.tipo_partido CASCADE;
DROP TABLE IF EXISTS public.partido CASCADE;
DROP TABLE IF EXISTS public.reserva_cancha CASCADE;
DROP TABLE IF EXISTS public.material_cancha CASCADE;
DROP TABLE IF EXISTS public.imagen_cancha CASCADE;
DROP TABLE IF EXISTS public.disponibilidad_cancha CASCADE;
DROP TABLE IF EXISTS public.cancha CASCADE;
DROP TABLE IF EXISTS public.deporte_posicion_usuario CASCADE;
DROP TABLE IF EXISTS public.rango_edad CASCADE;
DROP TABLE IF EXISTS public.equipo CASCADE;
DROP TABLE IF EXISTS public.estadistica_detallada_usuario CASCADE;
DROP TABLE IF EXISTS public.usuario CASCADE;
DROP TABLE IF EXISTS public.parametro_rendimiento CASCADE;
DROP TABLE IF EXISTS public.deporte_posicion CASCADE;
DROP TABLE IF EXISTS public.deporte CASCADE;
DROP TABLE IF EXISTS public.tipo_emparejamiento CASCADE;

-- Tabla deporte
CREATE TABLE deporte (
    id_deporte UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_deporte VARCHAR(100) NOT NULL UNIQUE,
    cantidad_max_jugadores INTEGER NOT NULL,
    cantidad_min_jugadores INTEGER NOT NULL,
    descripcion TEXT,
    icono TEXT
);

-- Tabla deporte_posicion
CREATE TABLE deporte_posicion (
    id_deporte_posicion UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_deporte_posicion VARCHAR(50) NOT NULL,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE
);

-- Tabla parametro_rendimiento
CREATE TABLE parametro_rendimiento (
    id_parametro_rendimiento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_parametro_rendimiento VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE
);

-- Tabla usuario
CREATE TABLE usuario (
    id_usuario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(9) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL UNIQUE,
    clave TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP NOT NULL DEFAULT now(),
    ubicacion VARCHAR(200),
    latitud NUMERIC(20,16),
    longitud NUMERIC(20,16),
    tipo_partido_id UUID REFERENCES tipo_partido(id_tipo_partido),
    nivel_habilidad_id UUID REFERENCES nivel_habilidad(id_nivel_habilidad),
    rango_edad_id UUID REFERENCES rango_edad(id_rango_edad)
);

-- Tabla estadistica_detallada_usuario
CREATE TABLE estadistica_detallada_usuario (
    id_estadistica_detallada UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    parametro_rendimiento_id UUID REFERENCES parametro_rendimiento(id_parametro_rendimiento) ON DELETE CASCADE,
    parametro_valor NUMERIC(5,2) NOT NULL
);

-- Tabla equipo
CREATE TABLE equipo (
    id_equipo UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_equipo VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    rango_edad_id UUID REFERENCES rango_edad(id_rango_edad) ON DELETE CASCADE,
    creador_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    latitud NUMERIC(20,16),
    longitud NUMERIC(20,16),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP NOT NULL DEFAULT now()
);

-- Tabla rango_edad
CREATE TABLE rango_edad (
    id_rango_edad UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    edad_minima INTEGER NOT NULL,
    edad_maxima INTEGER NOT NULL,
    descripcion TEXT
);

-- Tabla deporte_posicion_usuario
CREATE TABLE deporte_posicion_usuario (
    id_deporte_posicion_usuario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    deporte_posicion_id UUID REFERENCES deporte_posicion(id_deporte_posicion) ON DELETE CASCADE
);

-- Tabla cancha
CREATE TABLE cancha (
    id_cancha UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_cancha VARCHAR(100) NOT NULL UNIQUE,
    ubicacion VARCHAR(255) NOT NULL,
    precio_por_hora NUMERIC(10,2) NOT NULL,
    latitud NUMERIC(20,16) NOT NULL,
    longitud NUMERIC(20,16) NOT NULL,
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    deporte_id UUID REFERENCES deporte(id_deporte) ON DELETE CASCADE,
    material_cancha_id UUID REFERENCES material_cancha(id_material_cancha) ON DELETE CASCADE,
    administrador_cancha_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    creado_en TIMESTAMP NOT NULL DEFAULT now()
);

-- Tabla disponibilidad_cancha
CREATE TABLE disponibilidad_cancha (
    id_disponibilidad UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) NOT NULL,
    prefijo VARCHAR(20) NOT NULL,
    dia_semana INTEGER NOT NULL,
    hora TIME NOT NULL,
    disponible BOOLEAN NOT NULL,
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE
);

-- Tabla imagen_cancha
CREATE TABLE imagen_cancha (
    id_imagen_cancha UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url_imagen TEXT NOT NULL,
    subida_en TIMESTAMP NOT NULL DEFAULT now(),
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE
);

-- Tabla material_cancha
CREATE TABLE material_cancha (
    id_material_cancha UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_material_cancha VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla reserva_cancha
CREATE TABLE reserva_cancha (
    id_reserva_cancha UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fecha_hora_reserva TIMESTAMP NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    comentario TEXT,
    payment_id VARCHAR,
    notificado BOOLEAN NOT NULL DEFAULT FALSE,
    cancha_id UUID REFERENCES cancha(id_cancha) ON DELETE CASCADE,
    partido_id UUID REFERENCES partido(id_partido) ON DELETE CASCADE
);

-- Tabla partido
CREATE TABLE partido (
    id_partido UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fecha_partido TIMESTAMP NOT NULL,
    deporte_id UUID REFERENCES deporte(id_deporte),
    tipo_partido_id UUID REFERENCES tipo_partido(id_tipo_partido),
    creador_id UUID REFERENCES usuario(id_usuario),
    rango_edad_id UUID REFERENCES rango_edad(id_rango_edad),
    nivel_habilidad_id UUID REFERENCES nivel_habilidad(id_nivel_habilidad),
    descripcion TEXT,
    estado VARCHAR(50) NOT NULL DEFAULT 'pendiente_reserva'
);

-- Tabla tipo_partido
CREATE TABLE tipo_partido (
    id_tipo_partido UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_tipo_partido VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla nivel_habilidad
CREATE TABLE nivel_habilidad (
    id_nivel_habilidad UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_nivel_habilidad VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla usuario_partido
CREATE TABLE usuario_partido (
    id_usuario_partido UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipo VARCHAR(1),
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    paymentId VARCHAR,
    usuario_id UUID REFERENCES usuario(id_usuario),
    partido_id UUID REFERENCES partido(id_partido)
);

-- Tabla notificacion
CREATE TABLE notificacion (
    id_notificacion UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mensaje TEXT NOT NULL,
    leido BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT now(),
    usuario_id UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Tabla evaluacion_jugador
CREATE TABLE evaluacion_jugador (
    id_evaluacion_jugador UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_evaluado_id UUID REFERENCES usuario(id_usuario),
    usuario_evaluador_id UUID REFERENCES usuario(id_usuario),
    partido_id UUID REFERENCES partido(id_partido),
    puntuacion INTEGER NOT NULL,
    comentario TEXT,
    fecha_evaluacion TIMESTAMP NOT NULL DEFAULT now()
);

-- Tabla tipo_emparejamiento
CREATE TABLE tipo_emparejamiento (
    id_tipo_emparejamiento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_tipo_emparejamiento VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Crear índices únicos
CREATE UNIQUE INDEX ON usuario (correo);
CREATE UNIQUE INDEX ON usuario (rut);
CREATE UNIQUE INDEX ON equipo (nombre_equipo);
CREATE UNIQUE INDEX ON tipo_partido (nombre_tipo_partido);
CREATE UNIQUE INDEX ON material_cancha (nombre_material_cancha);

-- Relación única adicional en la tabla deporte_posicion_usuario
ALTER TABLE deporte_posicion_usuario
    ADD CONSTRAINT unique_deporte_posicion_usuario UNIQUE (usuario_id, deporte_posicion_id);
