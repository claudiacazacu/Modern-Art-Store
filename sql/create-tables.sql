CREATE TABLE IF NOT EXISTS public.artist (
    id_artist INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nume VARCHAR(100) NOT NULL,
    prenume VARCHAR(100),
    telefon VARCHAR(20),
    email VARCHAR(120),
    adresa VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS public.colectie (
    id_colectie INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nume VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.categorie (
    id_categorie INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nume VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.client (
    id_client INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nume VARCHAR(100) NOT NULL,
    prenume VARCHAR(100),
    telefon VARCHAR(20),
    email VARCHAR(120) UNIQUE,
    adresa VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS public.produs(
    id_produs INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_colectie INT REFERENCES public.colectie(id_colectie) ON DELETE SET NULL,
    id_artist INT REFERENCES public.artist(id_artist) ON DELETE SET NULL,
    nume VARCHAR(20) NOT NULL,
    material VARCHAR(20),
    pret NUMERIC(10,2) NOT NULL CHECK (pret >= 0),
    stoc INT NOT NULL DEFAULT 0 CHECK (stoc >= 0)
);

CREATE INDEX IF NOT EXISTS idx_produs_artist   ON public.produs(id_artist);
CREATE INDEX IF NOT EXISTS idx_produs_colectie ON public.produs(id_colectie);

CREATE TABLE IF NOT EXISTS public.comanda (
    id_comanda INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "data" DATE NOT NULL DEFAULT CURRENT_DATE,
    adresa_livrare VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS public.categorie_colectie (
    id_colectie INT NOT NULL REFERENCES public.colectie(id_colectie)  ON DELETE CASCADE,
    id_categorie INT NOT NULL REFERENCES public.categorie(id_categorie) ON DELETE CASCADE,
    PRIMARY KEY (id_colectie, id_categorie)
);

CREATE TABLE IF NOT EXISTS public.produs_comanda (
    id_produs INT NOT NULL REFERENCES public.produs(id_produs)   ON DELETE CASCADE,
    id_comanda INT NOT NULL REFERENCES public.comanda(id_comanda) ON DELETE CASCADE,
    cantitate INT NOT NULL CHECK (cantitate > 0),
    PRIMARY KEY (id_produs, id_comanda)
);

CREATE TABLE IF NOT EXISTS public.comanda_client (
    id_comanda INT NOT NULL REFERENCES public.comanda(id_comanda) ON DELETE CASCADE,
    id_client  INT NOT NULL REFERENCES public.client(id_client) ON DELETE CASCADE,
    PRIMARY KEY (id_comanda, id_client)
);

CREATE TABLE IF NOT EXISTS public.recenzie (
    id_recenzie INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_comanda INT NOT NULL REFERENCES public.comanda(id_comanda) ON DELETE CASCADE,
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentariu VARCHAR(300),
    "data" DATE DEFAULT CURRENT_DATE
);
CREATE INDEX IF NOT EXISTS idx_recenzie_comanda ON public.recenzie(id_comanda);

CREATE TABLE IF NOT EXISTS public.factura (
  id_factura INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_comanda INT NOT NULL UNIQUE REFERENCES public.comanda(id_comanda) ON DELETE CASCADE,
  serie INT NOT NULL,
  numar INT NOT NULL,
  "data" DATE NOT NULL DEFAULT CURRENT_DATE,
  pret NUMERIC(10,2) NOT NULL CHECK (pret >= 0)
);
CREATE UNIQUE INDEX IF NOT EXISTS uk_factura_serie_numar ON public.factura(serie, numar);

DROP VIEW IF EXISTS public.v_produs_simplu;
CREATE VIEW public.v_produs_simplu AS
SELECT id_produs, nume, pret, stoc
FROM public.produs;

DROP VIEW IF EXISTS public.v_raport_vanzari_clienti;
CREATE VIEW public.v_raport_vanzari_clienti AS
SELECT
  cl.id_client,
  cl.nume,
  cl.prenume,
  COUNT(DISTINCT c.id_comanda) AS nr_comenzi,
  COALESCE(SUM(pc.cantitate), 0) AS nr_produse,
  COALESCE(SUM(pc.cantitate * p.pret), 0)::NUMERIC(12,2) AS total_valoare
FROM public.client cl
LEFT JOIN public.comanda_client cc ON cc.id_client = cl.id_client
LEFT JOIN public.comanda c ON c.id_comanda = cc.id_comanda
LEFT JOIN public.produs_comanda pc ON pc.id_comanda = c.id_comanda
LEFT JOIN public.produs p ON p.id_produs = pc.id_produs
GROUP BY cl.id_client, cl.nume, cl.prenume;