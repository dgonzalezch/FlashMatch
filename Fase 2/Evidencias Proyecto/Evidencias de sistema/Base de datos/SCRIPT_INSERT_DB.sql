-- Tabla deportes
INSERT INTO deporte (nombre_deporte, cantidad_min_jugadores, cantidad_max_jugadores, icono) VALUES
('Fútbol 11', 11, 22, 'football-outline'),
('Fútbol 7', 7, 14, 'football-outline'),
('Fútbol 5', 5, 10, 'football-outline');

INSERT INTO rango_edad (edad_minima, edad_maxima, descripcion) VALUES
(18, 25, '18 - 25 años'),
(26, 35, '26 - 35 años'),
(36, 45, '36 - 45 años'),
(46, 55, '46 - 55 años'),
(56, 120, '56 años o más');

INSERT INTO nivel_habilidad (nombre_nivel_habilidad, descripcion) VALUES
('Principiante', 'Jugadores con poca experiencia en el deporte'),
('Intermedio', 'Jugadores con experiencia moderada y habilidades decentes'),
('Avanzado', 'Jugadores con habilidades avanzadas y experiencia considerable'),
('Profesional', 'Jugadores con experiencia profesional en el deporte');

INSERT INTO deporte_posicion (deporte_id, nombre_deporte_posicion) VALUES
((SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), 'Portero'),
((SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), 'Defensa'),
((SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), 'Centrocampista'),
((SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), 'Delantero');

INSERT INTO tipo_emparejamiento (nombre_tipo_emparejamiento, descripcion) VALUES
('Usuarios', 'Emparejamientos con solo usuarios'),
('Equipos', 'Emparejamientos con solo equipos');

INSERT INTO tipo_partido (nombre_tipo_partido, descripcion) VALUES
('Entretención', 'Partido informal o amistoso con el fin de divertirse y pasar el rato'),
('Entrenamiento', 'Partido utilizado para mejorar habilidades y practicar'),
('Competitivo', 'Partido oficial o de torneo con el objetivo de ganar y competir');

INSERT INTO material_cancha (nombre_material_cancha, descripcion) VALUES
('Pasto Natural', 'Superficie de pasto natural, ideal para juegos profesionales y competiciones.'),
('Paso Sintético', 'Superficie sintética que imita el pasto natural, utilizada en campos más modernos y bajo mantenimiento.'),
('Pavimento', 'Superficie de cemento o asfalto, típica en canchas urbanas y multifuncionales.');

INSERT INTO parametro_rendimiento (nombre_parametro_rendimiento, deporte_id) VALUES
('Velocidad', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11')),
('Resistencia', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11')),
('Táctica', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11')),
('Técnica', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'));

INSERT INTO deporte_posicion_usuario (usuario_id, deporte_id, deporte_posicion_id) VALUES
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_deporte_posicion FROM deporte_posicion WHERE nombre_deporte_posicion = 'Portero'));

INSERT INTO estadistica_detallada_usuario (usuario_id, deporte_id, parametro_rendimiento_id, parametro_valor) VALUES
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Velocidad'), 90),  -- Velocidad
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Resistencia'), 90),  -- Resistencia
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Táctica'), 90),  -- Resistencia
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Técnica'), 90);  -- Resistencia

INSERT INTO titulo_perfil (nombre_titulo, descripcion) VALUES
('Novato', 'Jugó su primer partido'),
('Experto', 'Jugó más de 100 partidos');
