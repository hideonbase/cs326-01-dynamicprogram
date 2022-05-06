--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

ALTER TABLE ONLY public.fav DROP CONSTRAINT fav_house_fkey;
ALTER TABLE ONLY public.fav DROP CONSTRAINT fav_customer_fkey;
ALTER TABLE ONLY public.fav DROP CONSTRAINT unique_house_customer;
ALTER TABLE ONLY public.house DROP CONSTRAINT house_pkey;
ALTER TABLE ONLY public.fav DROP CONSTRAINT fav_pkey;
ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_username_key;
ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
ALTER TABLE public.house ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.fav ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.customer ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.house_id_seq;
DROP TABLE public.house;
DROP SEQUENCE public.fav_id_seq;
DROP TABLE public.fav;
DROP SEQUENCE public.customer_id_seq;
DROP TABLE public.customer;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(50) NOT NULL
);


--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;


--
-- Name: fav; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fav (
    id integer NOT NULL,
    house integer,
    customer integer
);


--
-- Name: fav_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.fav_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fav_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.fav_id_seq OWNED BY public.fav.id;


--
-- Name: house; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house (
    id integer NOT NULL,
    title character varying(50),
    image character varying(200),
    rent numeric,
    address character varying(200)
);


--
-- Name: house_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_id_seq OWNED BY public.house.id;


--
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);


--
-- Name: fav id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fav ALTER COLUMN id SET DEFAULT nextval('public.fav_id_seq'::regclass);


--
-- Name: house id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house ALTER COLUMN id SET DEFAULT nextval('public.house_id_seq'::regclass);


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customer (id, username, password) FROM stdin;
2	user002	1234567890
4	user001	1234567890
5	user003	1234567890
\.


--
-- Data for Name: fav; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fav (id, house, customer) FROM stdin;
7	3	4
9	2	4
\.


--
-- Data for Name: house; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.house (id, title, image, rent, address) FROM stdin;
1	House A	/imgs/1.jpg	100	2699 Front St NE, Boardman, OR 97818
2	House B	/imgs/2.jpg	200	101 Front St NE, Boardman, OR 97818
3	House C	/imgs/3.jpg	300	202 NW 1st St
4	House D	/imgs/4.jpg	400	200 City Center Cir, Boardman, OR 97818
\.


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customer_id_seq', 5, true);


--
-- Name: fav_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fav_id_seq', 9, true);


--
-- Name: house_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.house_id_seq', 4, true);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: customer customer_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_username_key UNIQUE (username);


--
-- Name: fav fav_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fav_pkey PRIMARY KEY (id);


--
-- Name: house house_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house
    ADD CONSTRAINT house_pkey PRIMARY KEY (id);


--
-- Name: fav unique_house_customer; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT unique_house_customer UNIQUE (house, customer);


--
-- Name: fav fav_customer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fav_customer_fkey FOREIGN KEY (customer) REFERENCES public.customer(id);


--
-- Name: fav fav_house_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fav_house_fkey FOREIGN KEY (house) REFERENCES public.house(id);


--
-- PostgreSQL database dump complete
--

