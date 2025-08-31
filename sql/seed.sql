-- ARTISTI
INSERT INTO public.artist(nume, prenume, email, adresa, telefon) VALUES
('Brancusi', 'Constantin', 'brancusi@exemplu.com', 'Str. Artelor 1', '+40 721 111 111'),
('Kandinsky', 'Wassily', 'kandinsky@ex.com', 'Str. Culorilor 2', '+49 151 222 222'),
('Miro', 'Joan', 'miro@ex.com', 'C. Miró 3', '+34 666 333 333'),
('Picasso', 'Pablo', 'picasso@ex.com', 'Rue des Arts 4', '+33 612 444 444'),
('Monet', 'Claude', 'monet@ex.com', 'Rue des Nymphéas 5', '+33 612 555 555'),
('Dali', 'Salvador', 'dali@ex.com', 'Portlligat 6', '+34 666 666 666'),
('Rothko', 'Mark', 'rothko@ex.com', 'NY Ave 7', '+1 212 777 7777'),
('Pollock', 'Jackson', 'pollock@ex.com', 'E Hampton 8', '+1 631 888 8888'),
('Hokusai', 'Katsushika', 'hokusai@ex.com', 'Edo 9', '+81 90 9999 9999'),
('Michelangelo', 'Buonarroti', 'michelangelo@ex.com', 'Via Arte 10', '+39 347 101 0101'),
('Van Gogh', 'Vincent', 'vangogh@ex.com', 'Zundert 11', '+31 6 111 222 33'),
('Chagall', 'Marc', 'chagall@ex.com', 'Vitebsk 12', '+375 29 333 444'),
('Klee', 'Paul', 'klee@ex.com', 'Bern 13', '+41 78 555 666'),
('O''Keeffe', 'Georgia', 'okeeffe@ex.com', 'Santa Fe 14', '+1 505 222 3333'),
('Modigliani', 'Amedeo', 'modigliani@ex.com', 'Livorno 15', '+39 347 202 0202');

-- COLECTII
INSERT INTO public.colectie(nume) VALUES
('Abstract'), ('Modern'), ('Minimal'), ('Clasic'), ('Avangard'), ('Pop'), ('Impresionist'), ('Surreal');

-- CATEGORII
INSERT INTO public.categorie(nume) VALUES
('Pictura'), ('Sculptura'), ('Instalatie'), ('Gravura'), ('Acuarela'), ('Fotografie'), ('Colaj'), ('Digital'), ('Ceramica'), ('Textil');

-- LEGATURA categorie <-> colectie
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Abstract' AND g.nume='Acuarela';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Abstract' AND g.nume='Colaj';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Abstract' AND g.nume='Pictura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Abstract' AND g.nume='Sculptura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Abstract' AND g.nume='Textil';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Avangard' AND g.nume='Acuarela';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Avangard' AND g.nume='Ceramica';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Avangard' AND g.nume='Colaj';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Avangard' AND g.nume='Digital';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Avangard' AND g.nume='Gravura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Clasic' AND g.nume='Ceramica';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Clasic' AND g.nume='Gravura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Clasic' AND g.nume='Pictura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Impresionist' AND g.nume='Fotografie';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Impresionist' AND g.nume='Gravura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Impresionist' AND g.nume='Instalatie';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Impresionist' AND g.nume='Pictura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Minimal' AND g.nume='Ceramica';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Minimal' AND g.nume='Colaj';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Minimal' AND g.nume='Digital';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Minimal' AND g.nume='Pictura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Minimal' AND g.nume='Sculptura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Modern' AND g.nume='Ceramica';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Modern' AND g.nume='Sculptura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Modern' AND g.nume='Textil';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Pop' AND g.nume='Ceramica';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Pop' AND g.nume='Colaj';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Pop' AND g.nume='Instalatie';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Pop' AND g.nume='Pictura';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Surreal' AND g.nume='Colaj';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Surreal' AND g.nume='Fotografie';
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie FROM public.colectie c, public.categorie g
WHERE c.nume='Surreal' AND g.nume='Sculptura';

-- PRODUSE
INSERT INTO public.produs(nume, material, pret, stoc, id_artist, id_colectie) VALUES
('Vortex', 'Sticla', 5794.84, 1, (SELECT id_artist FROM public.artist WHERE email='chagall@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Nocturn', 'Hartie', 1317.12, 12, (SELECT id_artist FROM public.artist WHERE email='kandinsky@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Eter', 'Digital', 8428.97, 11, (SELECT id_artist FROM public.artist WHERE email='michelangelo@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Flux', 'Ulei', 578.46, 7, (SELECT id_artist FROM public.artist WHERE email='klee@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Zenit', 'Ulei', 8147.22, 3, (SELECT id_artist FROM public.artist WHERE email='rothko@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Orizont', 'Ceramica', 6093.65, 11, (SELECT id_artist FROM public.artist WHERE email='miro@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Pop')),
('Pulse', 'Sticla', 2108.89, 8, (SELECT id_artist FROM public.artist WHERE email='chagall@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Astra', 'Digital', 6087.05, 17, (SELECT id_artist FROM public.artist WHERE email='chagall@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Echo', 'Bronz', 4472.13, 8, (SELECT id_artist FROM public.artist WHERE email='modigliani@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Umbra', 'Sticla', 8030.67, 1, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Abstract')),
('Lumen', 'Sticla', 3900.89, 2, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Pop')),
('Arc', 'Marmura', 6278.35, 12, (SELECT id_artist FROM public.artist WHERE email='modigliani@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Prisma', 'Bronz', 2626.63, 7, (SELECT id_artist FROM public.artist WHERE email='chagall@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Fractal', 'Digital', 4155.86, 18, (SELECT id_artist FROM public.artist WHERE email='rothko@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Pop')),
('Nova', 'Marmura', 9475.0, 4, (SELECT id_artist FROM public.artist WHERE email='hokusai@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Sigma', 'Ulei', 7216.56, 3, (SELECT id_artist FROM public.artist WHERE email='miro@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Ritm', 'Panza', 5726.42, 12, (SELECT id_artist FROM public.artist WHERE email='rothko@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Aura', 'Hartie', 2500.72, 17, (SELECT id_artist FROM public.artist WHERE email='okeeffe@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Abstract')),
('Spiral', 'Ulei', 6523.99, 17, (SELECT id_artist FROM public.artist WHERE email='klee@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Vector', 'Sticla', 1193.01, 13, (SELECT id_artist FROM public.artist WHERE email='miro@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Forme', 'Acrilic', 9068.18, 8, (SELECT id_artist FROM public.artist WHERE email='hokusai@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Val', 'Hartie', 8683.07, 20, (SELECT id_artist FROM public.artist WHERE email='monet@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Dinamic', 'Bronz', 3646.09, 5, (SELECT id_artist FROM public.artist WHERE email='hokusai@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Abstract')),
('Matric', 'Digital', 3180.86, 0, (SELECT id_artist FROM public.artist WHERE email='kandinsky@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Pop')),
('Neon', 'Lemn', 2388.88, 7, (SELECT id_artist FROM public.artist WHERE email='modigliani@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Quartz', 'Ulei', 6993.34, 2, (SELECT id_artist FROM public.artist WHERE email='klee@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Nadir', 'Bronz', 6318.67, 17, (SELECT id_artist FROM public.artist WHERE email='miro@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Zen', 'Hartie', 8307.25, 13, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Nexus', 'Lemn', 3880.58, 20, (SELECT id_artist FROM public.artist WHERE email='dali@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Focus', 'Hartie', 4371.4, 7, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Cerc rosu', 'Sticla', 346.67, 17, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Coloana mini', 'Acrilic', 813.79, 20, (SELECT id_artist FROM public.artist WHERE email='brancusi@exemplu.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Delta', 'Ulei', 8615.68, 10, (SELECT id_artist FROM public.artist WHERE email='kandinsky@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Magma', 'Lemn', 6404.94, 6, (SELECT id_artist FROM public.artist WHERE email='hokusai@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Iris', 'Digital', 5537.58, 7, (SELECT id_artist FROM public.artist WHERE email='klee@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Torus', 'Panza', 1930.33, 3, (SELECT id_artist FROM public.artist WHERE email='vangogh@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Impresionist')),
('Cometa', 'Sticla', 4110.46, 14, (SELECT id_artist FROM public.artist WHERE email='okeeffe@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Abstract')),
('Halo', 'Ulei', 716.73, 10, (SELECT id_artist FROM public.artist WHERE email='klee@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Onda', 'Marmura', 1941.37, 17, (SELECT id_artist FROM public.artist WHERE email='pollock@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Stellar', 'Panza', 1865.61, 14, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Pulsar', 'Ceramica', 7705.01, 17, (SELECT id_artist FROM public.artist WHERE email='kandinsky@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Abstract')),
('Miroir', 'Hartie', 7966.86, 2, (SELECT id_artist FROM public.artist WHERE email='modigliani@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Glint', 'Bronz', 3949.97, 15, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Impresionist')),
('Blaze', 'Acrilic', 1689.36, 0, (SELECT id_artist FROM public.artist WHERE email='rothko@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Shard', 'Ceramica', 2817.08, 17, (SELECT id_artist FROM public.artist WHERE email='vangogh@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Gleam', 'Bronz', 1925.55, 6, (SELECT id_artist FROM public.artist WHERE email='brancusi@exemplu.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Abstract')),
('Stanza', 'Sticla', 684.5, 18, (SELECT id_artist FROM public.artist WHERE email='pollock@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Glyph', 'Acrilic', 9133.28, 2, (SELECT id_artist FROM public.artist WHERE email='okeeffe@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Minimal')),
('Rune', 'Ulei', 5713.58, 7, (SELECT id_artist FROM public.artist WHERE email='rothko@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Drift', 'Digital', 2452.11, 19, (SELECT id_artist FROM public.artist WHERE email='brancusi@exemplu.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern')),
('Glide', 'Panza', 6296.44, 18, (SELECT id_artist FROM public.artist WHERE email='hokusai@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Pop')),
('Dawn', 'Lemn', 2059.82, 10, (SELECT id_artist FROM public.artist WHERE email='picasso@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Avangard')),
('Dusk', 'Panza', 1373.71, 20, (SELECT id_artist FROM public.artist WHERE email='monet@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Mist', 'Sticla', 8836.32, 2, (SELECT id_artist FROM public.artist WHERE email='brancusi@exemplu.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Surreal')),
('Grove', 'Digital', 9485.55, 3, (SELECT id_artist FROM public.artist WHERE email='kandinsky@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Clasic')),
('Flair', 'Hartie', 2629.62, 11, (SELECT id_artist FROM public.artist WHERE email='modigliani@ex.com'), (SELECT id_colectie FROM public.colectie WHERE nume='Modern'));

-- CLIENTI
INSERT INTO public.client(nume, prenume, email, adresa, telefon) VALUES
('Ana', 'Pop', 'ana@exemplu.com', 'Str. Lalelelor 10', '+40 722 100 100'),
('Mihai', 'Ionescu', 'mihai@exemplu.com', 'Bd. Unirii 2', '+40 733 200 200'),
('Ioana', 'Georgescu', 'ioana@ex.com', 'Str. Magnoliei 5', '+40 744 333 444'),
('Andrei', 'Marin', 'andrei@ex.com', 'Calea Dorobanti 12', '+40 755 111 222'),
('Elena', 'Petrescu', 'elena@ex.com', 'Str. Primaverii 8', '+40 766 555 666'),
('Radu', 'Dumitrescu', 'radu@ex.com', 'Str. Fagului 3', '+40 777 777 777'),
('Maria', 'Ilie', 'maria@ex.com', 'Bd. Libertatii 1', '+40 788 888 888'),
('George', 'Stan', 'george@ex.com', 'Str. Bucuresti 20', '+40 799 999 999'),
('Carmen', 'Popa', 'carmen@ex.com', 'Str. Teiului 9', '+40 711 123 456'),
('Adrian', 'Neagu', 'adrian@ex.com', 'Aleea Salcamului 4', '+40 712 234 567'),
('Vlad', 'Dragomir', 'vlad@ex.com', 'Str. Mesteacanului 7', '+40 713 345 678'),
('Daria', 'Stoica', 'daria@ex.com', 'Str. Tineretului 15', '+40 714 456 789'),
('Larisa', 'Popescu', 'larisa@ex.com', 'Bd. Dacia 33', '+40 715 567 890'),
('Paul', 'Serban', 'paul@ex.com', 'Str. Aviatorilor 21', '+40 716 678 901'),
('Bianca', 'Tudor', 'bianca@ex.com', 'Str. Nucului 14', '+40 717 789 012'),
('Razvan', 'Enache', 'razvan@ex.com', 'Str. Horia 6', '+40 718 890 123'),
('Cristina', 'Matei', 'cristina@ex.com', 'Str. Universitatii 1', '+40 719 901 234'),
('Laura', 'Dobre', 'laura@ex.com', 'Str. Eminescu 17', '+40 720 012 345'),
('Tudor', 'Rusu', 'tudor@ex.com', 'Str. Kogalniceanu 11', '+40 721 123 012'),
('Iulia', 'Badea', 'iulia@ex.com', 'Str. Carol 9', '+40 722 234 123');

-- COMENZI
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-05-11', 'Str. Bucuresti 20');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-07-15', 'Aleea Salcamului 4');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-11', 'Str. Nucului 14');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-05-17', 'Str. Eminescu 17');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-06-02', 'Aleea Salcamului 4');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-06-14', 'Str. Universitatii 1');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-30', 'Str. Eminescu 17');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-07-24', 'Calea Dorobanti 12');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-05-03', 'Str. Primaverii 8');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-07-29', 'Calea Dorobanti 12');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-05-10', 'Calea Dorobanti 12');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-05-28', 'Str. Eminescu 17');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-12', 'Str. Teiului 9');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-07-26', 'Str. Carol 9');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-05', 'Str. Mesteacanului 7');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-05', 'Str. Teiului 9');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-06-28', 'Str. Horia 6');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-07-30', 'Bd. Unirii 2');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-20', 'Str. Aviatorilor 21');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-05-17', 'Str. Teiului 9');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-26', 'Str. Lalelelor 10');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-07-20', 'Str. Primaverii 8');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-06-11', 'Str. Teiului 9');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-08-11', 'Str. Nucului 14');
INSERT INTO public.comanda("data", adresa_livrare) VALUES ('2025-06-22', 'Str. Aviatorilor 21');

-- Legare comenzi de clienti
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 0 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='ana@exemplu.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 1 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='mihai@exemplu.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 2 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='ioana@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 3 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='andrei@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 4 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='elena@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 5 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='radu@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 6 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='maria@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 7 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='george@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 8 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='carmen@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 9 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='adrian@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 10 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='vlad@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 11 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='daria@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 12 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='larisa@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 13 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='paul@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 14 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='bianca@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 15 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='razvan@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 16 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='cristina@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 17 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='laura@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 18 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='tudor@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 19 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='iulia@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 20 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='ana@exemplu.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 21 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='mihai@exemplu.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 22 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='ioana@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 23 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='andrei@ex.com'));
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES ((SELECT MIN(id_comanda) + 24 FROM public.comanda),
        (SELECT id_client FROM public.client WHERE email='elena@ex.com'));

-- PRODUSE IN COMENZI
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Vortex'), (SELECT MIN(id_comanda) + 0 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Astra'), (SELECT MIN(id_comanda) + 0 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Zenit'), (SELECT MIN(id_comanda) + 0 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Shard'), (SELECT MIN(id_comanda) + 0 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Torus'), (SELECT MIN(id_comanda) + 1 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Umbra'), (SELECT MIN(id_comanda) + 1 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Zen'), (SELECT MIN(id_comanda) + 1 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Echo'), (SELECT MIN(id_comanda) + 1 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Fractal'), (SELECT MIN(id_comanda) + 2 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Blaze'), (SELECT MIN(id_comanda) + 2 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Sigma'), (SELECT MIN(id_comanda) + 2 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Flair'), (SELECT MIN(id_comanda) + 3 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nadir'), (SELECT MIN(id_comanda) + 3 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Stellar'), (SELECT MIN(id_comanda) + 3 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glyph'), (SELECT MIN(id_comanda) + 3 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nocturn'), (SELECT MIN(id_comanda) + 4 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Arc'), (SELECT MIN(id_comanda) + 4 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glyph'), (SELECT MIN(id_comanda) + 4 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Dawn'), (SELECT MIN(id_comanda) + 5 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Sigma'), (SELECT MIN(id_comanda) + 5 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Aura'), (SELECT MIN(id_comanda) + 5 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Lumen'), (SELECT MIN(id_comanda) + 5 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nova'), (SELECT MIN(id_comanda) + 6 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Prisma'), (SELECT MIN(id_comanda) + 6 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Dusk'), (SELECT MIN(id_comanda) + 6 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nova'), (SELECT MIN(id_comanda) + 7 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nocturn'), (SELECT MIN(id_comanda) + 7 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Val'), (SELECT MIN(id_comanda) + 8 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Aura'), (SELECT MIN(id_comanda) + 8 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Flair'), (SELECT MIN(id_comanda) + 8 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Delta'), (SELECT MIN(id_comanda) + 9 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Quartz'), (SELECT MIN(id_comanda) + 9 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Blaze'), (SELECT MIN(id_comanda) + 9 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Mist'), (SELECT MIN(id_comanda) + 9 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Arc'), (SELECT MIN(id_comanda) + 10 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Halo'), (SELECT MIN(id_comanda) + 10 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Ritm'), (SELECT MIN(id_comanda) + 10 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Dinamic'), (SELECT MIN(id_comanda) + 11 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Stanza'), (SELECT MIN(id_comanda) + 11 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glide'), (SELECT MIN(id_comanda) + 11 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Astra'), (SELECT MIN(id_comanda) + 12 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Neon'), (SELECT MIN(id_comanda) + 12 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Cometa'), (SELECT MIN(id_comanda) + 12 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Prisma'), (SELECT MIN(id_comanda) + 12 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Magma'), (SELECT MIN(id_comanda) + 13 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Dawn'), (SELECT MIN(id_comanda) + 13 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glyph'), (SELECT MIN(id_comanda) + 14 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glint'), (SELECT MIN(id_comanda) + 14 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Prisma'), (SELECT MIN(id_comanda) + 14 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Matric'), (SELECT MIN(id_comanda) + 14 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Forme'), (SELECT MIN(id_comanda) + 15 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glint'), (SELECT MIN(id_comanda) + 15 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Grove'), (SELECT MIN(id_comanda) + 15 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Astra'), (SELECT MIN(id_comanda) + 15 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nadir'), (SELECT MIN(id_comanda) + 16 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Forme'), (SELECT MIN(id_comanda) + 16 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Quartz'), (SELECT MIN(id_comanda) + 16 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Shard'), (SELECT MIN(id_comanda) + 16 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glint'), (SELECT MIN(id_comanda) + 17 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Neon'), (SELECT MIN(id_comanda) + 17 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Blaze'), (SELECT MIN(id_comanda) + 17 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Vector'), (SELECT MIN(id_comanda) + 18 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Quartz'), (SELECT MIN(id_comanda) + 18 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Torus'), (SELECT MIN(id_comanda) + 18 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Mist'), (SELECT MIN(id_comanda) + 18 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glide'), (SELECT MIN(id_comanda) + 19 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Halo'), (SELECT MIN(id_comanda) + 19 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Onda'), (SELECT MIN(id_comanda) + 19 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nexus'), (SELECT MIN(id_comanda) + 20 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Blaze'), (SELECT MIN(id_comanda) + 20 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Fractal'), (SELECT MIN(id_comanda) + 20 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Glint'), (SELECT MIN(id_comanda) + 21 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Orizont'), (SELECT MIN(id_comanda) + 21 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Pulsar'), (SELECT MIN(id_comanda) + 22 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Stellar'), (SELECT MIN(id_comanda) + 22 FROM public.comanda), 3);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Val'), (SELECT MIN(id_comanda) + 22 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Orizont'), (SELECT MIN(id_comanda) + 22 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Umbra'), (SELECT MIN(id_comanda) + 23 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Nocturn'), (SELECT MIN(id_comanda) + 23 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Stellar'), (SELECT MIN(id_comanda) + 24 FROM public.comanda), 1);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Grove'), (SELECT MIN(id_comanda) + 24 FROM public.comanda), 2);
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES ((SELECT id_produs FROM public.produs WHERE nume='Drift'), (SELECT MIN(id_comanda) + 24 FROM public.comanda), 2);

-- FACTURI 1:1 pe comenzi
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 0 FROM public.comanda), 100, 1, '2025-05-11',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 0 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 1 FROM public.comanda), 100, 2, '2025-07-15',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 1 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 2 FROM public.comanda), 100, 3, '2025-08-11',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 2 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 3 FROM public.comanda), 100, 4, '2025-05-17',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 3 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 4 FROM public.comanda), 100, 5, '2025-06-02',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 4 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 5 FROM public.comanda), 100, 6, '2025-06-14',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 5 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 6 FROM public.comanda), 100, 7, '2025-08-30',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 6 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 7 FROM public.comanda), 100, 8, '2025-07-24',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 7 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 8 FROM public.comanda), 100, 9, '2025-05-03',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 8 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 9 FROM public.comanda), 100, 10, '2025-07-29',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 9 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 10 FROM public.comanda), 100, 11, '2025-05-10',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 10 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 11 FROM public.comanda), 100, 12, '2025-05-28',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 11 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 12 FROM public.comanda), 100, 13, '2025-08-12',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 12 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 13 FROM public.comanda), 100, 14, '2025-07-26',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 13 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 14 FROM public.comanda), 100, 15, '2025-08-05',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 14 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 15 FROM public.comanda), 100, 16, '2025-08-05',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 15 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 16 FROM public.comanda), 100, 17, '2025-06-28',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 16 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 17 FROM public.comanda), 100, 18, '2025-07-30',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 17 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 18 FROM public.comanda), 100, 19, '2025-08-20',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 18 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 19 FROM public.comanda), 100, 20, '2025-05-17',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 19 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 20 FROM public.comanda), 100, 21, '2025-08-26',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 20 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 21 FROM public.comanda), 100, 22, '2025-07-20',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 21 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 22 FROM public.comanda), 100, 23, '2025-06-11',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 22 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 23 FROM public.comanda), 100, 24, '2025-08-11',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 23 FROM public.comanda);
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT (SELECT MIN(id_comanda) + 24 FROM public.comanda), 100, 25, '2025-06-22',
       COALESCE(SUM(pc.cantitate * p.pret),0)
FROM public.produs_comanda pc
JOIN public.produs p ON p.id_produs = pc.id_produs
WHERE pc.id_comanda = (SELECT MIN(id_comanda) + 24 FROM public.comanda);

-- RECENZII 
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 1 FROM public.comanda), 4, 'Recomand!', '2025-07-21');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 2 FROM public.comanda), 3, 'Foarte multumit', '2025-08-17');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 3 FROM public.comanda), 5, 'Culori vii', '2025-05-24');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 4 FROM public.comanda), 3, 'Recomand!', '2025-06-04');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 4 FROM public.comanda), 4, 'Unicat frumos', '2025-06-10');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 6 FROM public.comanda), 4, 'Textura interesanta', '2025-09-07');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 7 FROM public.comanda), 4, 'Calitate buna', '2025-07-31');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 8 FROM public.comanda), 5, 'Livrare rapida', '2025-05-11');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 9 FROM public.comanda), 4, 'Foarte multumit', '2025-08-02');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 9 FROM public.comanda), 3, 'Livrare rapida', '2025-08-03');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 10 FROM public.comanda), 3, 'Calitate buna', '2025-05-13');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 11 FROM public.comanda), 3, 'Foarte multumit', '2025-06-03');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 11 FROM public.comanda), 4, 'Arta superba', '2025-06-05');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 12 FROM public.comanda), 4, 'Pret corect', '2025-08-21');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 12 FROM public.comanda), 5, 'Excelent!', '2025-08-21');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 13 FROM public.comanda), 4, 'Livrare rapida', '2025-08-01');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 13 FROM public.comanda), 4, 'Culori vii', '2025-08-03');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 16 FROM public.comanda), 4, 'Excelent!', '2025-07-04');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 16 FROM public.comanda), 4, 'Unicat frumos', '2025-07-08');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 22 FROM public.comanda), 5, 'Textura interesanta', '2025-06-21');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 23 FROM public.comanda), 3, 'Recomand!', '2025-08-13');
INSERT INTO public.recenzie(id_comanda, nota, comentariu, "data")
VALUES ((SELECT MIN(id_comanda) + 24 FROM public.comanda), 3, 'Recomand!', '2025-06-27');