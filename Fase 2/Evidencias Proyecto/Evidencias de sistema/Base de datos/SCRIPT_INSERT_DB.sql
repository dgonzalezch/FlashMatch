INSERT INTO deporte (nombre_deporte, cantidad_min_jugadores, cantidad_max_jugadores, icono) VALUES
('Fútbol 11', 22, 44, 'football-outline'),
('Fútbol 7', 14, 28, 'football-outline'),
('Fútbol 5', 10, 20, 'football-outline');

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
('Pasto Sintético', 'Superficie sintética que imita el pasto natural, utilizada en campos más modernos y bajo mantenimiento.'),
('Pavimento', 'Superficie de cemento o asfalto, típica en canchas urbanas y multifuncionales.');


INSERT INTO pregunta_frecuente (pregunta, respuesta)
VALUES
  ('¿Cómo creo una cuenta?', 'Para crear una cuenta, haga clic en "Registrarse" en la pantalla principal e ingrese su información personal.'),
  ('¿Cómo reservo una cancha?', 'Vaya a la sección de "Reservar" en el menú principal, elija una fecha y hora disponibles, y confirme su reserva.'),
  ('¿Qué hago si olvido mi contraseña?', 'Seleccione "Olvidé mi contraseña" en la pantalla de inicio de sesión y siga las instrucciones para recuperarla.'),
  ('¿Cómo puedo ser un usuario cancha?', 'Contáctate con nuestro equipo al teléfono 800 800 9000 o por medio de nuestro email contacto@flashmatch.cl para solicitar ingresar como un usuario tipo cancha.');


INSERT INTO parametro_rendimiento (nombre_parametro_rendimiento, deporte_id) VALUES
('Velocidad', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11')),
('Resistencia', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11')),
('Táctica', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11')),
('Técnica', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'));

INSERT INTO parametro_rendimiento (nombre_parametro_rendimiento, deporte_id) VALUES
('Velocidad', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 7')),
('Resistencia', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 7')),
('Táctica', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 7')),
('Técnica', (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 7'));

INSERT INTO deporte_posicion_usuario (usuario_id, deporte_id, deporte_posicion_id) VALUES
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_deporte_posicion FROM deporte_posicion WHERE nombre_deporte_posicion = 'Portero'));

INSERT INTO estadistica_detallada_usuario (usuario_id, deporte_id, parametro_rendimiento_id, parametro_valor) VALUES
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Velocidad'), 90),  -- Velocidad
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Resistencia'), 90),  -- Resistencia
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Táctica'), 90),  -- Resistencia
((SELECT id_usuario FROM usuario WHERE rut = '20160253K'), (SELECT id_deporte FROM deporte WHERE nombre_deporte = 'Fútbol 11'), (SELECT id_parametro_rendimiento FROM parametro_rendimiento WHERE nombre_parametro_rendimiento = 'Técnica'), 90);  -- Resistencia

INSERT INTO usuario (
    nombre,
    apellido,
    rut,
    fecha_nacimiento,
    correo,
    telefono,
    clave,
    ubicacion,
    latitud,
    longitud,
    imagen_perfil,
    roles,
    activo,
    distancia_cancha_max,
    creado_en,
    promedio_evaluacion,
    rango_edad_id,
    nivel_habilidad_id,
    tipo_partido_id
) VALUES
-- Usuario 1
('Camila', 'Vargas', '185934720', '1996-04-18', 'camila.vargas@gmail.com', '912345001', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 2
('Matías', 'Fuentes', '204865391', '2002-12-07', 'matias.fuentes@gmail.com', '912345002', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 3
('Sofía', 'Navarrete', '172503948', '1998-06-30', 'sofia.navarrete@gmail.com', '912345003', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 4
('Tomás', 'Cortés', '196723504', '1991-10-13', 'tomas.cortes@gmail.com', '912345004', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 5
('Carolina', 'Espinoza', '205647398', '1993-02-20', 'carolina.espinoza@gmail.com', '912345005', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 6
('Ignacio', 'Rojas', '184052793', '2000-09-09', 'ignacio.rojas@gmail.com', '912345006', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 7
('Elena', 'Bravo', '195062874', '1999-11-11', 'elena.bravo@gmail.com', '912345007', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 8
('Sebastián', 'Reyes', '192847503', '1985-08-17', 'sebastian.reyes@gmail.com', '912345008', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 9
('Isabel', 'Castro', '203975481', '1994-07-25', 'isabel.castro@gmail.com', '912345009', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 10
('Felipe', 'Morales', '189726435', '1992-01-05', 'felipe.morales@gmail.com', '912345010', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de');
-- Usuario 11
('Valentina', 'Silva', '202648930', '1997-03-15', 'valentina.silva@gmail.com', '912345011', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 12
('Pablo', 'Araya', '189467250', '1990-05-28', 'pablo.araya@gmail.com', '912345012', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 13
('Fernanda', 'Pérez', '187920486', '1995-11-23', 'fernanda.perez@gmail.com', '912345013', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 14
('Joaquín', 'Salazar', '203647981', '1998-02-10', 'joaquin.salazar@gmail.com', '912345014', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 15
('Catalina', 'Henríquez', '192457813', '1994-09-17', 'catalina.henriquez@gmail.com', '912345015', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 16
('Francisco', 'Gallardo', '201862534', '1996-01-12', 'francisco.gallardo@gmail.com', '912345016', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 17
('Andrea', 'Cáceres', '185937206', '1992-10-22', 'andrea.caceres@gmail.com', '912345017', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 18
('Gabriel', 'Mora', '191834206', '1990-04-14', 'gabriel.mora@gmail.com', '912345018', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 19
('Lucía', 'Martínez', '189723641', '1989-07-20', 'lucia.martinez@gmail.com', '912345019', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de'),
-- Usuario 20
('Carlos', 'Paredes', '188162507', '1993-12-06', 'carlos.paredes@gmail.com', '912345020', '$2b$10$xeKT65blAdaIq5DBkM.BgeIBqZ3C48OrZbg.EFW8vtgvJnSSkefHG', 'Phillipe Cousteau 12088, 8060238 San Bernardo, Región Metropolitana, Chile', -33.5635951849350800, -70.7017916858408000, NULL, '{jugador}', TRUE, 10, '2024-11-17 17:51:17.665467', 5.00, '217d4eb9-a3d2-4931-a3b3-1a17360566f0', '903342b7-cac9-43d6-9e31-51fb9034c24d', '0fce15c8-2c19-4d01-847b-bef6bdf6b4de');
