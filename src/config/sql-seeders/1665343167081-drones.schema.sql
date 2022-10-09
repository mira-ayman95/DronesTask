--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

\c drones

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drone_entity_model_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.drone_entity_model_enum AS ENUM (
    'lightWeight',
    'middleWeight',
    'cruiserWeight',
    'heavyWeight'
);


ALTER TYPE public.drone_entity_model_enum OWNER TO postgres;

--
-- Name: drone_entity_state_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.drone_entity_state_enum AS ENUM (
    'idle',
    'loading',
    'loaded',
    'delivering',
    'delivered',
    'returning'
);


ALTER TYPE public.drone_entity_state_enum OWNER TO postgres;

--
-- Name: drones_model_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.drones_model_enum AS ENUM (
    'lightWeight',
    'middleWeight',
    'cruiserWeight',
    'heavyWeight'
);


ALTER TYPE public.drones_model_enum OWNER TO postgres;

--
-- Name: drones_state_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.drones_state_enum AS ENUM (
    'idle',
    'loading',
    'loaded',
    'delivering',
    'delivered',
    'returning'
);


ALTER TYPE public.drones_state_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: drone_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drone_logs (
    id integer NOT NULL,
    battery integer NOT NULL,
    "droneId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.drone_logs OWNER TO postgres;

--
-- Name: drone_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drone_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drone_logs_id_seq OWNER TO postgres;

--
-- Name: drone_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drone_logs_id_seq OWNED BY public.drone_logs.id;


--
-- Name: drones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drones (
    id integer NOT NULL,
    "serialNum" character varying NOT NULL,
    model public.drones_model_enum NOT NULL,
    weight numeric NOT NULL,
    state public.drones_state_enum DEFAULT 'idle'::public.drones_state_enum NOT NULL,
    battery integer DEFAULT 100 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.drones OWNER TO postgres;

--
-- Name: drones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drones_id_seq OWNER TO postgres;

--
-- Name: drones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drones_id_seq OWNED BY public.drones.id;


--
-- Name: medications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medications (
    id integer NOT NULL,
    weight numeric NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL,
    image character varying NOT NULL,
    "droneId" integer NOT NULL
);


ALTER TABLE public.medications OWNER TO postgres;

--
-- Name: medications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medications_id_seq OWNER TO postgres;

--
-- Name: medications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medications_id_seq OWNED BY public.medications.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- Name: drone_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drone_logs ALTER COLUMN id SET DEFAULT nextval('public.drone_logs_id_seq'::regclass);


--
-- Name: drones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drones ALTER COLUMN id SET DEFAULT nextval('public.drones_id_seq'::regclass);


--
-- Name: medications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medications ALTER COLUMN id SET DEFAULT nextval('public.medications_id_seq'::regclass);


--
-- Name: drones PK_3137fc855d37186eeccd193569f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drones
    ADD CONSTRAINT "PK_3137fc855d37186eeccd193569f" PRIMARY KEY (id);


--
-- Name: drone_logs PK_569068906fcdbaf65742871e245; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drone_logs
    ADD CONSTRAINT "PK_569068906fcdbaf65742871e245" PRIMARY KEY (id);


--
-- Name: medications PK_cdee49fe7cd79db13340150d356; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medications
    ADD CONSTRAINT "PK_cdee49fe7cd79db13340150d356" PRIMARY KEY (id);


--
-- Name: drones UQ_4803efbb0e25e860c3695a00f1b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drones
    ADD CONSTRAINT "UQ_4803efbb0e25e860c3695a00f1b" UNIQUE ("serialNum");


--
-- Name: medications UQ_e7d083f0778f731c0bd1a6fc780; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medications
    ADD CONSTRAINT "UQ_e7d083f0778f731c0bd1a6fc780" UNIQUE (code);


--
-- Name: drone_logs FK_361bfb06894b4c3ff367aac6680; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drone_logs
    ADD CONSTRAINT "FK_361bfb06894b4c3ff367aac6680" FOREIGN KEY ("droneId") REFERENCES public.drones(id);


--
-- Name: medications FK_7e178b4e3e43342eadaf00fc32f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medications
    ADD CONSTRAINT "FK_7e178b4e3e43342eadaf00fc32f" FOREIGN KEY ("droneId") REFERENCES public.drones(id);


--
-- PostgreSQL database dump complete
--

