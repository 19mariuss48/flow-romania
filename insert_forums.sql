-- 1. Stergem categoriile 'Departamente' si 'Staff' pe care le-am creat gresit anterior
DELETE FROM forum_categories WHERE slug IN ('departamente', 'staff');

-- 2. Seteaza user-ul tau de admin pentru a asocia topicurile cu tine
SET @admin_id = (SELECT id FROM profiles LIMIT 1);

-- 3. Cautam Categoriile Tale (Flow Romania IC si Flow Romania OOC)
SET @cat_ic_id = (SELECT id FROM forum_categories WHERE title LIKE '%ic%' LIMIT 1);
SET @cat_ooc_id = (SELECT id FROM forum_categories WHERE title LIKE '%ooc%' LIMIT 1);

-- 4. Mutam Forumurile (Poliția Română, Spitalul General) in categoria Flow Romania IC
UPDATE forums SET category_id = @cat_ic_id WHERE slug IN ('politia-romana', 'spitalul-general');

-- In caz ca nu existau deja, le cream si le bagam direct in IC
INSERT IGNORE INTO forums (id, category_id, title, slug, description, icon, threads_count, posts_count, order_index, created_at)
VALUES 
(UUID(), @cat_ic_id, 'Poliția Română', 'politia-romana', 'Aplicații, regulamente și anunțuri Poliția Română', '🚓', 2, 0, 1, CURRENT_TIMESTAMP),
(UUID(), @cat_ic_id, 'Spitalul General', 'spitalul-general', 'Aplicații, regulamente și anunțuri Spitalul General', '🚑', 2, 0, 2, CURRENT_TIMESTAMP);

-- 5. Pentru STAFF: Mutam topicurile de aplicatii/regulament pe forumul "Staff Flow" pe care il ai deja in categoria OOC
SET @forum_politie_id = (SELECT id FROM forums WHERE slug = 'politia-romana' LIMIT 1);
SET @forum_medici_id = (SELECT id FROM forums WHERE slug = 'spitalul-general' LIMIT 1);
SET @forum_staff_id = (SELECT id FROM forums WHERE title LIKE '%staff%' LIMIT 1);

-- Stergem versiunile mai vechi ale threadurilor sa fim siguri
DELETE FROM forum_threads WHERE title IN (
  'Regulament Poliția Română', 
  'Model Aplicație Poliția Română', 
  'Regulament Spitalul General (SMURD)', 
  'Model Aplicație Spitalul General', 
  'Regulament Echipa Staff', 
  'Model Aplicație Staff'
);

-- 6. Inserare Regulament Politie
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_politie_id, @admin_id, 'Regulament', 'Regulament Poliția Română',
  '# REGULAMENT: POLITIA LOS SANTOS\n\n- Orice abatere de la acestea poate duce la consecinte.\n- Orice reclamatie se face pe Discord in sectiunea dedicata.\n\n## CAP. 1 [CERINTE GENERALE]:\n\n(1.1). Membrii Departamentului de Politie LS trebuie sa cunoasca si sa respecte cu strictete regulile generale ale serverului si departamentului.\n\n(1.2). Se impune un comportament matur, respectuos si profesionist, atat in Roleplay cat si in afara lui.\n\n(1.3). Este obligatorie folosirea unui limbaj decent si evitarea comportamentului sfidator fata de toti cei din jur.\n\n(1.4). Este STRICT INTERZIS abuzul de functie sau folosirea rangului pentru avantaje personale.\n\n(1.5). Odata intrat in Departamentului de Politie LS este obligatoriu ramanerea in acesta timp de minim 14 de zile.\n\n(1.6). Coruptia este STRICT INTERZISA si este sanctionata DRASTIC.\n\n(1.7). Cat timp esti ON-DUTY, pontajul trebuie pornit si pe Discord.\n\n(1.8). Aveti dreptul la 10 minute de pauza odata la o ora de pontaj. (daca stati ON-DUTY 2 ore NU aveti dreptul la 20 de minute consecutive de pauza)\n\n(1.9). Cat timp sunteti ON-DUTY este OBLIGATORIU sa fi spalat si ingrijit.\n\n(2.0). Fentarea pontajului este STRICT INTERZISA! Daca ai fost prins de mai mult de 3 ori intr-o singura luna, o sa primesti OUT!\n\n## CAP. 2 [COMPORTAMENT IC]:\n\n(2.1). Tunsorile indecente sau culorile stridente ale parului sunt INTERZISE in departament!\n\n(2.2). Tatuajele faciale sunt INTERZISE, iar intrarea in departament va poate fi respinsa din aceasta cauza!\n\n(2.3). Orice actiune trebuie sa respecte conceptele de realism, logica si fairplay.\n\n(2.4). Este obligatorie identificarea inainte de orice interactiune cu un civil: "Grad si nume... din cadrul Departamentului de Politie Los Santos".\n\n(2.5). Folosirea excesiva a fortei este INTERZISA daca suspectul coopereaza.\n\n(2.6). Orice folosire a armamentului letal / nonletal trebuie justificata si luata gradual.\n\n## CAP. 3 [INTERACTIUNI SI PROCEDURI]:\n\n(3.1). Fiecare actiune de control, arest, perchezitie sau urmarire trebuie sa fie bazata pe un motiv valid.\n\n(3.2). Este STRICT INTERZIS sa efectuati o perchezitie unei persoane daca aceasta nu are fata acoperita sau detineti informatii cu dovada ca respectivul este suspect.\n\n(3.3). Se interzice arestarea fara dovezi (bodycam, martori, dovezi clare).\n\n(3.4). Folosirea bodycam-ului este obligatorie cat timp sunteti ON-DUTY.\n\n(3.5). Perchezitia si confiscarea trebuie anuntate si efectuate in mod direct.\n\n(3.6). Cofiscarea obiectelor legale este STRICT INTERZISA.\n\n(3.7). Cofiscarea obiectelor ilegale trebuie efectuata STRICT in incinta unei Sectii de Politie dupa ce procesarea suspectului a inceput.\n\n## CAP. 4 [PATRULARE SI ORGANIZARE]:\n\n(4.1). Patrularea se minim in echipe de 2 agenti (in limita posibilitatilor).\n\n(4.2). Comunicarea se face prin radio [2] / dispecer (/d).\n\n(4.3). Este interzisa folosirea sirenelor fara un motiv bine intemeiat.\n\n(4.4). Autoutilitarele de politie se folosesc doar in interesul departamentului, fiind INTERZISA folosirea lor OFF-DUTY.\n\n(4.5). Fiecare agent trebuie sa urmeze comenzile superiorului in cadrul ierarhiei.\n\n(4.6). Este INTERZISA folosirea masinilor personale ON-DUTY, fara aprobare din partea unui grad superior (INSPECTOR+).\n\n## CAP. 5 [ECHIPAMENT]:\n\n(5.1). Se interzice folosirea armelor grele (SMG, alte arme automate) fara ordin sau scenariu valid (unde folosirea lor este necesara pentru siguranta tuturor celor din jur).\n\n(5.2). Dotarile se externalizeaza doar din HQ, conform rangului.\n\n(5.3). Este STRICT INTERZIS sa pastrezi echipamentul din dotare atunci cand esti OFF-DUTY.\n\n(5.4). Folosirea uniformei conforma gradului este OBLIGATORIE atat timp cat esti ON-DUTY.\n\n## CAP. 6 [IERARHIE SI COMENZI]:\n\n(6.1). Respectarea ierarhie este obligatorie (Cadet -> Agent -> Agent Principal -> ASP -> Inspector -> Sub-Comisar -> Comisar -> Comisar Sef-> Chestor General etc.).\n\n(6.2). Deciziile superiorilor se respecta, chiar daca nu esti de acord.\n\n(6.3). Raportarile (aresturi, misiuni, infractiuni, etc.) trebuie completate conform formatului dat de conducere.',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- 7. Inserare Model Aplicatie Politie
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_politie_id, @admin_id, 'Informații', 'Model Aplicație Poliția Română',
  '**Model Aplicație Poliția Română**\n\nPentru a aplica in cadrul Departamentului de Poliție, creați un topic nou în această secțiune respectând modelul de mai jos.\nTitlul topicului trebuie să fie: `Aplicație Poliție - Nume Prenume`\n\n**INFORMAȚII OUT OF CHARACTER (OOC)**\n* Nume și Prenume (Real):\n* Vârsta reală:\n* Link profil Steam:\n* Discord ID (ex: nume#1234):\n* Câte ore jucate ai pe server?:\n\n**INFORMAȚII IN CHARACTER (IC)**\n* Nume și Prenume caracter:\n* Vârsta caracterului:\n* CNP caracter:\n* Ai mai făcut parte din vreo facțiune anterior?:\n* De ce dorești să te alături departamentului? (minim 50 cuvinte):\n* Ai citit regulamentul departamentului?:\n* Alte precizări:\n\n**Reguli:**\n1. Nu copiați aplicații de pe alte servere.\n2. Asigurați-vă că respectați cerințele minime.',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- 8. Inserare Regulament Medici
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_medici_id, @admin_id, 'Regulament', 'Regulament Spitalul General (SMURD)',
  '# REGULAMENT SPITALUL GENERAL\n\n## CAP. 1 [OBLIGAȚII GENERALE]\n\n(1.1). Membrii Departamentului Medical sunt obligați să respecte regulamentul serverului și regulamentul departamentului.\n\n(1.2). Se impune un comportament matur, respectuos și profesionist în orice situație.\n\n(1.3). Menținerea unui cazier curat este obligatorie pe toată durata șederii în departament.\n\n(1.4). Respectarea ordinelor superiorilor este obligatorie.\n\n## CAP. 2 [ACTIVITATE ON-DUTY]\n\n(2.1). In timpul serviciului este obligatorie purtarea uniformei și a insignei.\n\n(2.2). Membrii trebuie să aibă asupra lor echipamentul aferent gradului deținut.\n\n(2.3). Stația radio trebuie să fie pornită permanent și utilizată corespunzător.\n\n(2.4). Pontajul trebuie deschis la intrarea în tură și închis la finalizarea acesteia.\n\n(2.5). Se utilizează exclusiv vehiculele Departamentului Medical.\n\n(2.6). Toate apelurile trebuie anunțate și preluate corespunzător.\n\n## CAP. 3 [INTERVENȚII]\n\n(3.1). Medicul NU are voie să intervină în schimburi de focuri, conflicte active sau altercații în desfășurare.\n\n(3.2). In situațiile periculoase se contactează imediat Poliția.\n\n(3.3). Este interzisă deplasarea la jafuri fără solicitarea organelor de poliție.\n\n(3.4). Medicul NU are voie să patruleze împreună cu Poliția.\n\n(3.5). După finalizarea unei intervenții, zona trebuie părăsită dacă nu mai este nevoie de prezența personalului medical.\n\n## CAP. 4 [INTERDICȚII]\n\n(4.1). Corupția este STRICT INTERZISĂ.\n\n(4.2). Este interzisă utilizarea uniformei, echipamentului sau vehiculelor departamentului OFF-DUTY.\n\n(4.3). Este interzisă practicarea unui alt job cât timp faceți parte din Departamentul Medical.\n\n(4.4). Este interzisă desfășurarea activităților ilegale ON-DUTY sau OFF-DUTY.\n\n(4.5). Este interzisă divulgarea informațiilor interne ale departamentului.\n\n(4.6). Este interzisă deținerea sau manipularea armelor cât timp faceți parte din departament.\n\n(4.7). Este interzisă staționarea AFK mai mult de 5 minute/oră în timpul serviciului.\n\n## CAP. 5 [PONTAJ]\n\n(5.1). Fiecare membru trebuie să își îndeplinească norma minimă de activitate aferentă gradului său.\n\n(5.2). Lipsa activității sau neîndeplinirea pontajului poate duce la sancțiuni administrative.\n\n(5.3). Absențele de la ședințe sau activități obligatorii trebuie motivate.\n\n## CAP. 6 [CODURI DE ASISTENȚĂ]\n\n(6.1). Cadrele medicale au dreptul de a utiliza doar Codul 78 pentru solicitarea de sprijin.\n\n(6.2). Codurile 0 și 4 sunt rezervate exclusiv Departamentului de Poliție.\n\n(6.3). Solicitările de ajutor trebuie efectuate clar și profesional pe stație.\n\n## CAP. 7 [SANCȚIUNI]\n\n(7.1). Nerespectarea regulamentului poate fi sancționată cu Avertisment, Faction Warn, Amendă, Down sau Demitere.\n\n(7.2). Acumularea a 3 Faction Warn-uri duce la demitere automată.\n\n(7.3). Neprezentarea la ședințele obligatorii poate fi sancționată.\n\n(7.4). Membrii sancționați nu pot beneficia de promovări până la expirarea sancțiunilor active.',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- 9. Inserare Model Aplicatie Medici
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_medici_id, @admin_id, 'Informații', 'Model Aplicație Spitalul General',
  '**Model Aplicație Spitalul General (SMURD)**\n\nPentru a aplica in cadrul departamentului, creați un topic nou în această secțiune respectând modelul de mai jos.\nTitlul topicului trebuie să fie: `Aplicație Medic - Nume Prenume`\n\n**INFORMAȚII OUT OF CHARACTER (OOC)**\n* Nume și Prenume (Real):\n* Vârsta reală:\n* Link profil Steam:\n* Discord ID:\n* Ore jucate pe server:\n\n**INFORMAȚII IN CHARACTER (IC)**\n* Nume și Prenume caracter:\n* Vârsta caracterului:\n* Experiență în domeniu?:\n* De ce dorești să te alături departamentului medical? (minim 50 cuvinte):\n* Ești dispus să lucrezi în ture de noapte?:\n* Ai citit regulamentul?:\n\n**Reguli:**\n1. Răspundeți sincer la toate întrebările.\n2. Respectați formatul impus.',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- 10. Inserare Regulament Staff (adaugat pe forum_staff_id, adica pe Staff Flow-ul tau deja existent)
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_staff_id, @admin_id, 'Regulament', 'Regulament Echipa Staff',
  '# REGULAMENT STAFF\n\n**1. Profesionalism**\nFiecare membru staff trebuie să dea dovadă de profesionalism în orice situație.\n\n**2. Corectitudine**\nSancțiunile trebuie acordate corect, conform regulamentului serverului, fără a favoriza anumiți jucători.\n\n**3. Respect**\nRespectul față de jucători și față de colegii din staff este obligatoriu.\n\n**4. Activitate**\nPentru a-ți menține gradul, trebuie să îndeplinești norma de tickete și activitate stabilită de conducere.\n\n**5. Confidențialitate**\nInformațiile din interiorul echipei staff nu se divulgă jucătorilor (chat-uri interne, log-uri, decizii luate în ședințe).',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- 11. Inserare Model Aplicatie Staff
INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
VALUES (
  UUID(), @forum_staff_id, @admin_id, 'Informații', 'Model Aplicație Staff',
  '**Model Aplicație Funcție Administrativă (Staff)**\n\nPentru a aplica pentru o funcție în staff, creați un topic cu titlul: `Aplicație Helper - Nume`\n\n**FORMAT APLICAȚIE:**\n* Nume și Prenume (Real):\n* Vârsta reală:\n* Link profil Steam:\n* Discord ID:\n* Ore jucate pe server (minim 100):\n* Nume Caracter (IC):\n* Experiență anterioară de Staff? (Detaliază):\n* De ce dorești să intri în echipa staff? (minim 100 cuvinte):\n* Ești capabil să recunoști când greșești și să accepți criticile?:\n* În ce intervale orare poți fi activ pe server/discord?:\n\n**Atenție:**\n* Aplicațiile făcute în bătaie de joc sau care nu respectă modelul vor fi respinse automat.\n* Nu faceți cereri de citire a aplicației pe discord/în joc, se sancționează cu respingerea ei.',
  1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);