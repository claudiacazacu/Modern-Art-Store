BEGIN;

-- ARTISTI
INSERT INTO public.artist(nume, prenume, email) VALUES
('Brancusi', 'Constantin', 'brancusi@example.com'),
('Kandinsky', 'Wassily', 'kandinsky@example.com');

-- COLECTII
INSERT INTO public.colectie(nume) VALUES ('Abstract'), ('Modern'), ('Minimal');

-- CATEGORII
INSERT INTO public.categorie(nume) VALUES ('Pictura'), ('Sculptura'), ('Instalatie');

-- LEGATURA categorie <-> colectie (alegem prin nume, NU prin id)
INSERT INTO public.categorie_colectie(id_colectie, id_categorie)
SELECT c.id_colectie, g.id_categorie
FROM public.colectie c, public.categorie g
WHERE c.nume='Modern' AND g.nume IN ('Pictura','Sculptura');

-- PRODUSE (id_artist / id_colectie luate prin subselect)
INSERT INTO public.produs(nume, material, pret, stoc, id_artist, id_colectie)
SELECT 'Cerc rosu', 'Acrilic', 1200, 3,
       (SELECT id_artist FROM public.artist  WHERE nume='Kandinsky' LIMIT 1),
       (SELECT id_colectie FROM public.colectie WHERE nume='Abstract'  LIMIT 1);

INSERT INTO public.produs(nume, material, pret, stoc, id_artist, id_colectie)
SELECT 'Coloana mini', 'Bronz', 2500, 2,
       (SELECT id_artist FROM public.artist  WHERE nume='Brancusi' LIMIT 1),
       (SELECT id_colectie FROM public.colectie WHERE nume='Modern'   LIMIT 1);

-- CLIENTI
INSERT INTO public.client(nume, prenume, email, adresa) VALUES
('Ana', 'Pop', 'ana@exemplu.com', 'Str. Lalelelor 10'),
('Mihai', 'Ionescu', 'mihai@exemplu.com', 'Bd. Unirii 2');

-- O COMANDA pentru Ana
INSERT INTO public.comanda("data", adresa_livrare) 
VALUES (CURRENT_DATE, 'Str. Lalelelor 10');

-- Legăm comanda de client (prin email, NU prin id hardcodat)
INSERT INTO public.comanda_client(id_comanda, id_client)
VALUES (
  (SELECT max(id_comanda) FROM public.comanda),
  (SELECT id_client FROM public.client WHERE email='ana@exemplu.com')
);

-- PRODUSE IN COMANDA (luăm produsul prin nume)
INSERT INTO public.produs_comanda(id_produs, id_comanda, cantitate)
VALUES (
  (SELECT id_produs FROM public.produs WHERE nume='Cerc rosu' LIMIT 1),
  (SELECT max(id_comanda) FROM public.comanda),
  2
);

-- FACTURA 1:1
INSERT INTO public.factura(id_comanda, serie, numar, "data", pret)
SELECT max(id_comanda), 100, 1, CURRENT_DATE,
       2 * (SELECT pret FROM public.produs WHERE nume='Cerc rosu' LIMIT 1)
FROM public.comanda;

-- RECENZIE
INSERT INTO public.recenzie(id_comanda, nota, comentariu)
SELECT max(id_comanda), 5, 'Excelent!' FROM public.comanda;

COMMIT;
