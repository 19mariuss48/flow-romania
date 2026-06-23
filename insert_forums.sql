-- Curatam intai forumurile vechi (daca le-ai creat) ca sa nu ai duplicate
DELETE FROM forums WHERE slug IN ('politia-romana', 'spitalul-general', 'politia-academie', 'politia-reclamatii', 'spital-aplicatii', 'spital-reclamatii');

SET @admin_id = (SELECT id FROM profiles LIMIT 1);
SET @cat_ic_id = (SELECT id FROM forum_categories WHERE title LIKE '%ic%' LIMIT 1);
SET @cat_ooc_id = (SELECT id FROM forum_categories WHERE title LIKE '%ooc%' LIMIT 1);

-- Cream cele 4 Subforumuri cerute exact ca in poze (Academia si Reclamatii pt Politie, Aplicatii si Reclamatii pt Medici)
INSERT IGNORE INTO forums (id, category_id, title, slug, description, icon, threads_count, posts_count, order_index, created_at)
VALUES 
(UUID(), @cat_ic_id, 'Politia Romana - Academie', 'politia-academie', 'Aplicații pentru Academia de Poliție', '👮', 1, 0, 1, CURRENT_TIMESTAMP),
(UUID(), @cat_ic_id, 'Politia Romana - Biroul de Reclamatii', 'politia-reclamatii', 'Depuneri de reclamații împotriva agenților', '📋', 1, 0, 2, CURRENT_TIMESTAMP),
(UUID(), @cat_ic_id, 'Spitalul General - APLICATII [ CV ]', 'spital-aplicatii', 'Aplicații pentru personalul medical', '🚑', 1, 0, 3, CURRENT_TIMESTAMP),
(UUID(), @cat_ic_id, 'Spitalul General - Biroul de Reclamatii', 'spital-reclamatii', 'Reclamații pentru Spitalul General', '📋', 1, 0, 4, CURRENT_TIMESTAMP);

-- Extragem ID-urile lor dupa inserare
SET @forum_p_academie = (SELECT id FROM forums WHERE slug = 'politia-academie' LIMIT 1);
SET @forum_p_reclamatii = (SELECT id FROM forums WHERE slug = 'politia-reclamatii' LIMIT 1);
SET @forum_m_aplicatii = (SELECT id FROM forums WHERE slug = 'spital-aplicatii' LIMIT 1);
SET @forum_m_reclamatii = (SELECT id FROM forums WHERE slug = 'spital-reclamatii' LIMIT 1);

-- Stergem thread-urile vechi ca sa inlocuim cu modelele noi corecte
DELETE FROM forum_threads WHERE title IN (
  '[Model] Politia Romana - Aplicatie ( Curriculum Vitae (CV) )',
  '[Model] Spitalul General - Aplicatie ( Curriculum Vitae (CV) )',
  'Informatii Biroul de Reclamatii'
);

-- ==========================================
-- 1. POLITIE: MODEL APLICATIE
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_p_academie, @admin_id, 'Informații', '[Model] Politia Romana - Aplicatie ( Curriculum Vitae (CV) )',
  'Pentru a aplica în cadrul Departamentului de Poliție, creați un topic nou și copiați modelul de mai jos:\n\n**INFORMATII GENERALE [IC]**\n* **Nume:** \n* **Prenume:** \n* **Varsta:** \n* **Sex [M/F]:** \n* **Inaltime:** \n* **Adresa:** \n* **Nationalitate:** \n* **Numar de telefon:** \n\n**PROFIL PERSONAL**\n* **Considerati ca aveti un comportament civic si respectati legile orasului Los Santos?:** \n* **Aveti afectiuni fizice sau probleme medicale? Daca da, va rugam sa specificati:**\n* **Suferiti de afectiuni cronice? Daca da, va rugam sa specificati:** \n* **Considerati ca eventualele afectiuni medicale va pot afecta performanta in cadrul Departamentului de Politie?:** \n* **Ati consumat sau detinut substante interzise in ultimul an? Daca da, va rugam sa specificati:** \n* **Ati primit sanctiuni contraventionale sau amenzi? Daca da, mentionati motivul:** \n* **Detineti un permis de conducere valabil?:** \n* **Ati fost vreodata arestat pentru comiterea unei crime? Daca da, explicati circumstantele:** \n* **Ati fost vreodata arestat pentru alte infractiuni? Daca da, oferiti detalii:** \n* **Puteti comunica eficient, atat verbal cat si in scris, in limba romana?:** \n* **Cunoasteti si alte limbi straine in afara de limba romana? Daca da, specificati nivelul si limbile cunoscute:** \n\n**INFORMATII PROFESIONALE**\n* **Ati mai depus anterior o cerere de angajare la Departamentul de Politie?:** \n* **Daca da, specificati si rezultatul primit din partea Diviziei de Recrutare si Munca:** \n* **Ati mai aplicat anterior la alte institutii sau agentii ale statului?:** \n* **Daca da, mentionati institutia si rezultatul aplicatiei:** \n* **Enumerati alte locuri de munca sau experiente profesionale anterioare:** \n\n**MOTIVARE SI ARGUMENTARE PROFESIONALA**\n* **Care sunt motivele pentru care doriti sa va alaturati Departamentului de Politie din Los Santos? (Argumenteaza in minim 50 de cuvinte):** \n* **Care considerati ca sunt calitatile si abilitatile care va diferentiaza de ceilalti candidati? (Argumenteaza in minim 50 de cuvinte):** \n\n**INFORMATII OOC**\n* **Prenume:** \n* **Varsta (Minim 15 ani):** \n* **Username Discord:** \n* **Din ce oras sau localitate proveniti?:** \n* **De cat timp jucati GTA V?:** \n* **De cat timp jucati pe serverul Flow?:** \n* **Care este numarul total de ore jucate în joc? (minim 50 ore):** \n* **Care este ID-ul dumneavoastră din joc?:** \n* **Ati citit si inteles informatiile legate de aplicatie?:** \n* **Ati citit si inteles regulamentul Departamentului de Politie?:** \n* **Confirmati ca nu veti avea comportament corupt, atat IC cat si OOC?:** \n* **Confirmati ca, in cazul acceptarii in Departamentul de Politie, veti respecta o perioada minima de activitate de 2 saptamani?:** \n* **Confirmati ca intelegeti ca nerespectarea celor doua puncte de mai sus poate duce la sanctiuni sau ban provizoriu?:** \n* **Alte informatii suplimentare pe care doriti sa le mentionati?:**',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. POLITIE: BIROUL DE RECLAMATII
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_p_reclamatii, @admin_id, 'Informații', 'Informatii Biroul de Reclamatii',
  '<div style="text-align: center;">\n<h3>DEPARTAMENTUL DE POLITIE LOS SANTOS</h3>\n<h3>BIROUL DE RECLAMATII</h3>\n<hr/>\n<p><i>Poliția Los Santos încurajează cetățenii să raporteze orice nereguli constatate în activitatea organelor de poliție, să transmită sugestii constructive sau să solicite sprijin pentru organizarea de evenimente.</i></p>\n<p><i>Ne angajăm să menținem o colaborare transparentă și eficientă, în beneficiul siguranței și bunăstării comunității.</i></p>\n<br/><p>Cererile de audiență pot fi depuse prin completarea formularului disponibil aici: <a href="#" style="color:#3498db; text-decoration: underline;">Formular</a></p>\n</div>',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. MEDICI: MODEL APLICATIE
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_m_aplicatii, @admin_id, 'Informații', '[Model] Spitalul General - Aplicatie ( Curriculum Vitae (CV) )',
  'Pentru a aplica în cadrul Departamentului Medical, creați un topic nou și copiați modelul de mai jos:\n\n**INFORMATII GENERALE [IC]**\n* **Nume:** \n* **Prenume:** \n* **Varsta:** \n* **Sex [M/F]:** \n* **Inaltime:** \n* **Adresa:** \n* **Nationalitate:** \n* **Numar de telefon:** \n\n**PROFIL PERSONAL**\n* **Considerati ca aveti un comportament civic si respectati legile orasului Los Santos?:** \n* **Aveti afectiuni fizice sau probleme medicale? Daca da, va rugam sa specificati:**\n* **Suferiti de afectiuni cronice? Daca da, va rugam sa specificati:** \n* **Considerati ca eventualele afectiuni medicale va pot afecta performanta in cadrul Departamentului Medical?:** \n* **Ati consumat sau detinut substante interzise in ultimul an? Daca da, va rugam sa specificati:** \n* **Detineti un permis de conducere valabil?:** \n* **Ati fost vreodata arestat pentru comiterea unei crime? Daca da, explicati circumstantele:** \n* **Ati fost vreodata arestat pentru alte infractiuni? Daca da, oferiti detalii:** \n* **Puteti comunica eficient, atat verbal cat si in scris, in limba romana?:** \n* **Cunoasteti si alte limbi straine in afara de limba romana? Daca da, specificati nivelul si limbile cunoscute:** \n\n**INFORMATII PROFESIONALE**\n* **Ati mai depus anterior o cerere de angajare la Departamentului Medical?:** \n* **Daca da, specificati si rezultatul primit din partea Diviziei de Recrutare si Munca:** \n* **Ati mai aplicat anterior la alte institutii sau agentii ale statului?:** \n* **Daca da, mentionati institutia si rezultatul aplicatiei:** \n* **Enumerati alte locuri de munca sau experiente profesionale anterioare:** \n\n**MOTIVARE SI ARGUMENTARE PROFESIONALA**\n* **Care sunt motivele pentru care doriti sa va alaturati Departamentului Medical din Los Santos? (Argumenteaza in minim 50 de cuvinte):** \n* **Care considerati ca sunt calitatile si abilitatile care va diferentiaza de ceilalti candidati? (Argumenteaza in minim 50 de cuvinte):** \n\n**INFORMATII OOC**\n* **Prenume:** \n* **Varsta (Minim 14 ani):** \n* **Username Discord:** \n* **Din ce oras sau localitate proveniti?:** \n* **De cat timp jucati GTA V?:** \n* **De cat timp jucati pe serverul Flow?:** \n* **Care este numarul total de ore jucate în joc? (minim 50 ore):** \n* **Care este ID-ul dumneavoastră din joc?:** \n* **Ati citit si inteles informatiile legate de aplicatie?:** \n* **Ati citit si inteles regulamentul Departamentului Medical?:** \n* **Confirmati ca nu veti avea comportament corupt, atat IC cat si OOC?:** \n* **Confirmati ca, in cazul acceptarii in Departamentul Medical, veti respecta o perioada minima de activitate de 1 saptamana?:** \n* **Confirmati ca intelegeti ca nerespectarea celor doua puncte de mai sus poate duce la sanctiuni sau ban provizoriu?:** \n* **Alte informatii suplimentare pe care doriti sa le mentionati?:**',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- ==========================================
-- 4. MEDICI: BIROUL DE RECLAMATII
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_m_reclamatii, @admin_id, 'Informații', 'Informatii Biroul de Reclamatii',
  '<div style="text-align: center;">\n<h3>SPITALUL GENERAL LOS SANTOS</h3>\n<h3>BIROUL DE RECLAMATII</h3>\n<hr/>\n<p><i>Spitalul General Los Santos încurajează cetățenii să raporteze orice nereguli constatate în activitatea cadrelor medicale, să transmită sugestii constructive sau să solicite sprijin.</i></p>\n<p><i>Ne angajăm să menținem o colaborare transparentă și eficientă, în beneficiul siguranței și sănătății comunității.</i></p>\n<br/><p>Cererile pot fi depuse prin completarea formularului disponibil aici: <a href="#" style="color:#3498db; text-decoration: underline;">Formular</a></p>\n</div>',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);