-- Tabla deportes
INSERT INTO deportes (nombre_deporte, cantidad_min_jugadores, cantidad_max_jugadores, icono) VALUES 
('Fútbol 11', 11, 22, 'football-outline'),
('Fútbol 7', 7, 14, 'football-outline'),
('Fútbol 5', 5, 10, 'football-outline');

-- Tabla rangos_edad
INSERT INTO rangos_edad (edad_minima, edad_maxima, descripcion) VALUES 
(18, 25, '18 - 25 años'),
(26, 35, '26 - 35 años'),
(36, 45, '36 - 45 años'),
(46, 55, '46 - 55 años'),
(56, 120, '56 años o más');

-- Tabla niveles_habilidad
INSERT INTO niveles_habilidad (nombre_nivel_habilidad, descripcion) VALUES 
('Principiante', 'Jugadores con poca experiencia en el deporte'),
('Intermedio', 'Jugadores con experiencia moderada y habilidades decentes'),
('Avanzado', 'Jugadores con habilidades avanzadas y experiencia considerable'),
('Profesional', 'Jugadores con experiencia profesional en el deporte');

-- Tabla deportes_posiciones
INSERT INTO deportes_posiciones (id_deporte, nombre) VALUES
((SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), 'Portero'),
((SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), 'Defensa'),
((SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), 'Centrocampista'),
((SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), 'Delantero');

-- Tabla deportes_posiciones_usuarios
INSERT INTO deportes_posiciones_usuarios (id_usuario, id_deporte, id_posicion) VALUES
((SELECT id_usuario FROM usuarios WHERE rut = '20160253K'), (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_deporte_posicion FROM deportes_posiciones WHERE nombre = 'Portero'));

-- Parámetros para Fútbol 11 (id_deporte = 'uuid_futbol')
INSERT INTO parametros_rendimiento (nombre_parametro, id_deporte) VALUES
('Velocidad', (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11')),
('Resistencia', (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11')),
('Táctica', (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11')),
('Técnica', (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'));

-- Estadísticas para el Usuario 1 en Fútbol (id_usuario = 'uuid_usuario_1', id_deporte = 'uuid_futbol')
INSERT INTO estadisticas_detalladas_usuarios (id_usuario, id_deporte, id_parametro_rendimiento, parametro_valor) VALUES
((SELECT id_usuario FROM usuarios WHERE rut = '20160253K'), (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametros_rendimiento WHERE nombre_parametro = 'Velocidad'), 90),  -- Velocidad
((SELECT id_usuario FROM usuarios WHERE rut = '20160253K'), (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametros_rendimiento WHERE nombre_parametro = 'Resistencia'), 90),  -- Resistencia
((SELECT id_usuario FROM usuarios WHERE rut = '20160253K'), (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametros_rendimiento WHERE nombre_parametro = 'Táctica'), 90),  -- Resistencia
((SELECT id_usuario FROM usuarios WHERE rut = '20160253K'), (SELECT id_deporte FROM deportes WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametros_rendimiento WHERE nombre_parametro = 'Técnica'), 90);  -- Resistencia

-- Tabla titulos_perfil
INSERT INTO titulos_perfil (nombre_titulo, descripcion) VALUES
('Novato', 'Jugó su primer partido'),
('Experto', 'Jugó más de 100 partidos');
