--
-- PostgreSQL database dump
--

\restrict et6ak8lIVfuzn2lcXqlzu9TCFEUfhN8nVJ9w7yYMdGdRbKnwI9dhS2yZfHVvWKk

-- Dumped from database version 17.6 (Ubuntu 17.6-0ubuntu0.25.04.1)
-- Dumped by pg_dump version 17.6 (Ubuntu 17.6-0ubuntu0.25.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO postgres;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: normativas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.normativas (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    normativa text NOT NULL,
    categoria_id integer,
    subcategoria_id integer,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    numero_acto character varying(50),
    tipo_acto character varying(50),
    fecha_expedicion date,
    dependencia_expide character varying(100),
    epigrafe text,
    estado_acto character varying(30),
    observaciones text
);


ALTER TABLE public.normativas OWNER TO postgres;

--
-- Name: normativas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.normativas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.normativas_id_seq OWNER TO postgres;

--
-- Name: normativas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.normativas_id_seq OWNED BY public.normativas.id;


--
-- Name: subcategorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    categoria_id integer
);


ALTER TABLE public.subcategorias OWNER TO postgres;

--
-- Name: subcategorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subcategorias_id_seq OWNER TO postgres;

--
-- Name: subcategorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategorias_id_seq OWNED BY public.subcategorias.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    rol character varying(50) DEFAULT 'admin'::character varying
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: normativas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.normativas ALTER COLUMN id SET DEFAULT nextval('public.normativas_id_seq'::regclass);


--
-- Name: subcategorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategorias ALTER COLUMN id SET DEFAULT nextval('public.subcategorias_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id, nombre) FROM stdin;
1	Despacho del Gobernador
\.


--
-- Data for Name: normativas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.normativas (id, titulo, normativa, categoria_id, subcategoria_id, fecha_creacion, numero_acto, tipo_acto, fecha_expedicion, dependencia_expide, epigrafe, estado_acto, observaciones) FROM stdin;
1	Decreto 01 de 1999	<p>Asdf123.</p>	1	1	2025-09-08 13:38:06.305506	Decreto 1	Decreto	1999-08-01	Despacho del Gobernador	Decreto de orden de creacion de secretaria general	Vigente	Ninguna
\.


--
-- Data for Name: subcategorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategorias (id, nombre, categoria_id) FROM stdin;
1	Comunicados	1
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password_hash, rol) FROM stdin;
1	Admin	adminjuridica@cundinamarca.gov.co	$2b$10$9II8opf.ZunMmMnN.uGokuSHTN6RYHjFZLk1JxXyf2RoMwBmmyMLy	admin
\.


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_seq', 1, true);


--
-- Name: normativas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.normativas_id_seq', 1, true);


--
-- Name: subcategorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategorias_id_seq', 1, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: categorias categorias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: normativas normativas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.normativas
    ADD CONSTRAINT normativas_pkey PRIMARY KEY (id);


--
-- Name: subcategorias subcategorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: idx_normativas_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_normativas_categoria ON public.normativas USING btree (categoria_id);


--
-- Name: idx_normativas_subcategoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_normativas_subcategoria ON public.normativas USING btree (subcategoria_id);


--
-- Name: idx_normativas_titulo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_normativas_titulo ON public.normativas USING btree (titulo);


--
-- Name: normativas normativas_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.normativas
    ADD CONSTRAINT normativas_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) ON DELETE RESTRICT;


--
-- Name: normativas normativas_subcategoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.normativas
    ADD CONSTRAINT normativas_subcategoria_id_fkey FOREIGN KEY (subcategoria_id) REFERENCES public.subcategorias(id) ON DELETE RESTRICT;


--
-- Name: subcategorias subcategorias_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict et6ak8lIVfuzn2lcXqlzu9TCFEUfhN8nVJ9w7yYMdGdRbKnwI9dhS2yZfHVvWKk

