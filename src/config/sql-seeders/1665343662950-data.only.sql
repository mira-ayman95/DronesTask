--
-- PostgreSQL database dump
--

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
-- Data for Name: drones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.drones (id, "serialNum", model, weight, state, battery, "createdAt", "updatedAt") FROM stdin;
1	serialNum4	lightWeight	300	idle	100	2022-10-06 23:41:36.528136	2022-10-06 23:41:36.528136
2	serialNum5	lightWeight	300	idle	100	2022-10-06 23:41:42.072205	2022-10-06 23:41:42.072205
3	serialNum6	lightWeight	300	idle	100	2022-10-06 23:41:46.58001	2022-10-06 23:41:46.58001
4	serialNum2	lightWeight	300	idle	10	2022-10-06 20:20:47.979071	2022-10-06 20:20:47.979071
5	serialNum1	lightWeight	300	loaded	100	2022-10-06 20:17:29.871953	2022-10-07 13:13:24.008766
6	serialNum3	lightWeight	300	loading	100	2022-10-06 23:41:30.115356	2022-10-07 18:04:16.97778
7	kokomkaka	cruiserWeight	500	idle	100	2022-10-07 22:46:40.343369	2022-10-07 22:46:40.343369
8	serialNum10	lightWeight	300.30	idle	100	2022-10-08 13:55:01.838842	2022-10-08 13:55:01.838842
9	serialNum	lightWeight	300	loaded	100	2022-10-06 20:14:11.034033	2022-10-08 16:35:58.826645
\.

--
-- Data for Name: medications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medications (id, weight, "createdAt", "updatedAt", name, code, image, "droneId") FROM stdin;
1	50	2022-10-09 19:36:53.907796	2022-10-09 19:36:53.907796	brofin	79878	zane-lee-VvTVkc_p-eg-unsplash.jpg	1
2	40	2022-10-09 19:36:53.907796	2022-10-09 19:36:53.907796	pascoban	6578906	zane-lee-VvTVkc_p-eg-unsplash.jpg	1
3	25	2022-10-09 19:37:30.451383	2022-10-09 19:37:30.451383	panadol	456789	zane-lee-VvTVkc_p-eg-unsplash.jpg	1
4	97	2022-10-09 19:37:30.451383	2022-10-09 19:37:30.451383	augmanten	123456	zane-lee-VvTVkc_p-eg-unsplash.jpg	1
5	100	2022-10-09 19:38:03.931965	2022-10-09 19:38:03.931965	allvent	147852	zane-lee-VvTVkc_p-eg-unsplash.jpg	2
6	56	2022-10-09 19:38:03.931965	2022-10-09 19:38:03.931965	phenadon	963258	zane-lee-VvTVkc_p-eg-unsplash.jpg	2
\.
--
-- Name: drones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.drones_id_seq', 10, true);

--
-- PostgreSQL database dump complete
--

