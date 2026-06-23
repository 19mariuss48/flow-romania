-- 1. Stergem forumurile "Academie" si "Reclamatii" pe care le-am creat gresit ca forumuri (tu vrei sa fie topice)
DELETE FROM forums WHERE slug IN ('politia-academie', 'politia-reclamatii', 'spital-aplicatii', 'spital-reclamatii');

SET @admin_id = (SELECT id FROM profiles LIMIT 1);
SET @cat_ic_id = (SELECT id FROM forum_categories WHERE title LIKE '%ic%' LIMIT 1);
SET @cat_ooc_id = (SELECT id FROM forum_categories WHERE title LIKE '%ooc%' LIMIT 1);

-- 2. Cream doar forumurile de baza: Politia Romana si Spitalul General in IC
INSERT IGNORE INTO forums (id, category_id, title, slug, description, icon, threads_count, posts_count, order_index, created_at)
VALUES 
(UUID(), @cat_ic_id, 'Poliția Română', 'politia-romana', 'Aplicații, regulamente și anunțuri Poliția Română', '🚓', 2, 0, 1, CURRENT_TIMESTAMP),
(UUID(), @cat_ic_id, 'Spitalul General', 'spitalul-general', 'Aplicații, regulamente și anunțuri Spitalul General', '🚑', 2, 0, 2, CURRENT_TIMESTAMP);

-- Extragem ID-urile lor
SET @forum_politie = (SELECT id FROM forums WHERE slug = 'politia-romana' LIMIT 1);
SET @forum_medici = (SELECT id FROM forums WHERE slug = 'spitalul-general' LIMIT 1);
SET @forum_staff = (SELECT id FROM forums WHERE title LIKE '%staff%' LIMIT 1);

-- 3. Stergem topicele vechi cu textul gresit (Markdown/HTML)
DELETE FROM forum_threads WHERE title LIKE '%[Model]%' OR title LIKE '%Biroul de Reclamatii%' OR title LIKE '%Aplicație%';

-- ==========================================
-- POLITIA ROMANA - THREADURI (Fara **, Fara HTML)
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_politie, @admin_id, 'Informații', '[Model] Politia Romana - Aplicatie ( Curriculum Vitae (CV) )',
  'Pentru a aplica în cadrul Departamentului de Poliție, creați un topic nou și copiați modelul de mai jos:\n\nINFORMATII GENERALE [IC]\n- Nume: \n- Prenume: \n- Varsta: \n- Sex [M/F]: \n- Inaltime: \n- Adresa: \n- Nationalitate: \n- Numar de telefon: \n\nPROFIL PERSONAL\n- Considerati ca aveti un comportament civic si respectati legile orasului Los Santos?: \n- Aveti afectiuni fizice sau probleme medicale? Daca da, va rugam sa specificati:\n- Suferiti de afectiuni cronice? Daca da, va rugam sa specificati: \n- Considerati ca eventualele afectiuni medicale va pot afecta performanta in cadrul Departamentului de Politie?: \n- Ati consumat sau detinut substante interzise in ultimul an? Daca da, va rugam sa specificati: \n- Ati primit sanctiuni contraventionale sau amenzi? Daca da, mentionati motivul: \n- Detineti un permis de conducere valabil?: \n- Ati fost vreodata arestat pentru comiterea unei crime? Daca da, explicati circumstantele: \n- Ati fost vreodata arestat pentru alte infractiuni? Daca da, oferiti detalii: \n- Puteti comunica eficient, atat verbal cat si in scris, in limba romana?: \n- Cunoasteti si alte limbi straine in afara de limba romana? Daca da, specificati nivelul si limbile cunoscute: \n\nINFORMATII PROFESIONALE\n- Ati mai depus anterior o cerere de angajare la Departamentul de Politie?: \n- Daca da, specificati si rezultatul primit din partea Diviziei de Recrutare si Munca: \n- Ati mai aplicat anterior la alte institutii sau agentii ale statului?: \n- Daca da, mentionati institutia si rezultatul aplicatiei: \n- Enumerati alte locuri de munca sau experiente profesionale anterioare: \n\nMOTIVARE SI ARGUMENTARE PROFESIONALA\n- Care sunt motivele pentru care doriti sa va alaturati Departamentului de Politie din Los Santos? (Argumenteaza in minim 50 de cuvinte): \n- Care considerati ca sunt calitatile si abilitatile care va diferentiaza de ceilalti candidati? (Argumenteaza in minim 50 de cuvinte): \n\nINFORMATII OOC\n- Prenume: \n- Varsta (Minim 15 ani): \n- Username Discord: \n- Din ce oras sau localitate proveniti?: \n- De cat timp jucati GTA V?: \n- De cat timp jucati pe serverul Flow?: \n- Care este numarul total de ore jucate în joc? (minim 50 ore): \n- Care este ID-ul dumneavoastră din joc?: \n- Ati citit si inteles informatiile legate de aplicatie?: \n- Ati citit si inteles regulamentul Departamentului de Politie?: \n- Confirmati ca nu veti avea comportament corupt, atat IC cat si OOC?: \n- Confirmati ca, in cazul acceptarii in Departamentul de Politie, veti respecta o perioada minima de activitate de 2 saptamani?: \n- Confirmati ca intelegeti ca nerespectarea celor doua puncte de mai sus poate duce la sanctiuni sau ban provizoriu?: \n- Alte informatii suplimentare pe care doriti sa le mentionati?:',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
),
(
  UUID(), @forum_politie, @admin_id, 'Informații', 'Biroul de Reclamatii',
  'DEPARTAMENTUL DE POLITIE LOS SANTOS\nBIROUL DE RECLAMATII\n\nPoliția Los Santos încurajează cetățenii să raporteze orice nereguli constatate în activitatea organelor de poliție, să transmită sugestii constructive sau să solicite sprijin pentru organizarea de evenimente.\nNe angajăm să menținem o colaborare transparentă și eficientă, în beneficiul siguranței și bunăstării comunității.\n\nCererile de audiență pot fi depuse prin completarea formularului disponibil aici: Formular',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- ==========================================
-- SPITALUL GENERAL - THREADURI (Fara **, Fara HTML)
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_medici, @admin_id, 'Informații', '[Model] Spitalul General - Aplicatie ( Curriculum Vitae (CV) )',
  'Pentru a aplica în cadrul Departamentului Medical, creați un topic nou și copiați modelul de mai jos:\n\nINFORMATII GENERALE [IC]\n- Nume: \n- Prenume: \n- Varsta: \n- Sex [M/F]: \n- Inaltime: \n- Adresa: \n- Nationalitate: \n- Numar de telefon: \n\nPROFIL PERSONAL\n- Considerati ca aveti un comportament civic si respectati legile orasului Los Santos?: \n- Aveti afectiuni fizice sau probleme medicale? Daca da, va rugam sa specificati:\n- Suferiti de afectiuni cronice? Daca da, va rugam sa specificati: \n- Considerati ca eventualele afectiuni medicale va pot afecta performanta in cadrul Departamentului Medical?: \n- Ati consumat sau detinut substante interzise in ultimul an? Daca da, va rugam sa specificati: \n- Detineti un permis de conducere valabil?: \n- Ati fost vreodata arestat pentru comiterea unei crime? Daca da, explicati circumstantele: \n- Ati fost vreodata arestat pentru alte infractiuni? Daca da, oferiti detalii: \n- Puteti comunica eficient, atat verbal cat si in scris, in limba romana?: \n- Cunoasteti si alte limbi straine in afara de limba romana? Daca da, specificati nivelul si limbile cunoscute: \n\nINFORMATII PROFESIONALE\n- Ati mai depus anterior o cerere de angajare la Departamentului Medical?: \n- Daca da, specificati si rezultatul primit din partea Diviziei de Recrutare si Munca: \n- Ati mai aplicat anterior la alte institutii sau agentii ale statului?: \n- Daca da, mentionati institutia si rezultatul aplicatiei: \n- Enumerati alte locuri de munca sau experiente profesionale anterioare: \n\nMOTIVARE SI ARGUMENTARE PROFESIONALA\n- Care sunt motivele pentru care doriti sa va alaturati Departamentului Medical din Los Santos? (Argumenteaza in minim 50 de cuvinte): \n- Care considerati ca sunt calitatile si abilitatile care va diferentiaza de ceilalti candidati? (Argumenteaza in minim 50 de cuvinte): \n\nINFORMATII OOC\n- Prenume: \n- Varsta (Minim 14 ani): \n- Username Discord: \n- Din ce oras sau localitate proveniti?: \n- De cat timp jucati GTA V?: \n- De cat timp jucati pe serverul Flow?: \n- Care este numarul total de ore jucate în joc? (minim 50 ore): \n- Care este ID-ul dumneavoastră din joc?: \n- Ati citit si inteles informatiile legate de aplicatie?: \n- Ati citit si inteles regulamentul Departamentului Medical?: \n- Confirmati ca nu veti avea comportament corupt, atat IC cat si OOC?: \n- Confirmati ca, in cazul acceptarii in Departamentul Medical, veti respecta o perioada minima de activitate de 1 saptamana?: \n- Confirmati ca intelegeti ca nerespectarea celor doua puncte de mai sus poate duce la sanctiuni sau ban provizoriu?: \n- Alte informatii suplimentare pe care doriti sa le mentionati?:',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
),
(
  UUID(), @forum_medici, @admin_id, 'Informații', 'Biroul de Reclamatii',
  'SPITALUL GENERAL LOS SANTOS\nBIROUL DE RECLAMATII\n\nSpitalul General Los Santos încurajează cetățenii să raporteze orice nereguli constatate în activitatea organelor medicale, să transmită sugestii constructive sau să solicite sprijin pentru organizarea de evenimente.\nNe angajăm să menținem o colaborare transparentă și eficientă, în beneficiul siguranței și sănătății comunității.\n\nCererile de audiență pot fi depuse prin completarea formularului disponibil aici: Formular',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- ==========================================
-- STAFF - MODEL APLICATIE (Fara **, Fara HTML)
-- ==========================================
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_staff, @admin_id, 'Informații', '[Model] Aplicatie Functie Administrativa (Staff)',
  'Pentru a aplica pentru o funcție în staff, creați un topic nou cu modelul de mai jos:\n\nINFORMATII PERSONALE\n- Nume: \n- Prenume: \n- Descriere (In minim 50 de cuvinte): \n- Cat timp poti acorda acestei functii pe zi in medie?: \n- De ce consideri ca meriti aceasta functie?: \n- Esti de acord ca orice greseala facuta se va functiona ca atare?: \n- Cat de bine cunosti regulamentul?: \n\nINFORMATII ADITIONALE\n- ID: \n- Username Discord: \n- Ore jucate (pe cont): \n- De cat timp te joci FiveM?: \n- De cat timp te joci pe Server?: \n- Avere estimata: ',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);