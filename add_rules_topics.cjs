const mysql = require('mysql2/promise');
const fs = require('fs');
const crypto = require('crypto');

async function run() {
  const connection = await mysql.createConnection({
    uri: 'mysql://dbpgf35443969:4SEOQ8xA5Ckj77wdN0(4Q9@serverless-europe-west2.sysp0000.db2.skysql.com:4078/flowro',
    ssl: { rejectUnauthorized: false } 
  });
  
  console.log("Connected to the database!");

  const [profiles] = await connection.query('SELECT id FROM profiles LIMIT 1');
  if(profiles.length === 0) {
      console.log("No profiles found!");
      process.exit(1);
  }
  const adminId = profiles[0].id;
  
  const [forums] = await connection.query('SELECT id, slug FROM forums WHERE slug IN ("politia-romana", "spitalul-general")');
  const politiaForum = forums.find(f => f.slug === 'politia-romana')?.id;
  const spitalForum = forums.find(f => f.slug === 'spitalul-general')?.id;
  
  if(!politiaForum || !spitalForum) {
      console.log("Forums not found!");
      process.exit(1);
  }

  const rawPolitia = fs.readFileSync('police_rules.csv', 'utf8');
  const politiaRules = rawPolitia.split('\n').map(l => l.trim().replace(/^"|"$/g, '').replace(/""/g, '"')).join('\n');
  
  const mediciRules = `CAP. 1 [OBLIGAȚII GENERALE]
(1.1). Membrii Departamentului Medical sunt obligați să respecte regulamentul serverului și regulamentul departamentului.

(1.2). Se impune un comportament matur, respectuos și profesionist în orice situație.

(1.3). Menținerea unui cazier curat este obligatorie pe toată durata șederii în departament.

(1.4). Respectarea ordinelor superiorilor este obligatorie.


CAP. 2 [ACTIVITATE ON-DUTY]
(2.1). În timpul serviciului este obligatorie purtarea uniformei și a insignei.

(2.2). Membrii trebuie să aibă asupra lor echipamentul aferent gradului deținut.

(2.3). Stația radio trebuie să fie pornită permanent și utilizată corespunzător.

(2.4). Pontajul trebuie deschis la intrarea în tură și închis la finalizarea acesteia.

(2.5). Se utilizează exclusiv vehiculele Departamentului Medical.

(2.6). Toate apelurile trebuie anunțate și preluate corespunzător.


CAP. 3 [INTERVENȚII]
(3.1). Medicul NU are voie să intervină în schimburi de focuri, conflicte active sau altercații în desfășurare.

(3.2). În situațiile periculoase se contactează imediat Poliția.

(3.3). Este interzisă deplasarea la jafuri fără solicitarea organelor de poliție.

(3.4). Medicul NU are voie să patruleze împreună cu Poliția.

(3.5). După finalizarea unei intervenții, zona trebuie părăsită dacă nu mai este nevoie de prezența personalului medical.
 
CAP. 4 [INTERDICȚII]
(4.1). Corupția este STRICT INTERZISĂ.

(4.2). Este interzisă utilizarea uniformei, echipamentului sau vehiculelor departamentului OFF-DUTY.

(4.3). Este interzisă practicarea unui alt job cât timp faceți parte din Departamentul Medical.

(4.4). Este interzisă desfășurarea activităților ilegale ON-DUTY sau OFF-DUTY.

(4.5). Este interzisă divulgarea informațiilor interne ale departamentului.

(4.6). Este interzisă deținerea sau manipularea armelor cât timp faceți parte din departament.

(4.7). Este interzisă staționarea AFK mai mult de 5 minute/oră în timpul serviciului.

CAP. 5 [PONTAJ]
(5.1). Fiecare membru trebuie să își îndeplinească norma minimă de activitate aferentă gradului său.

(5.2). Lipsa activității sau neîndeplinirea pontajului poate duce la sancțiuni administrative.

(5.3). Absențele de la ședințe sau activități obligatorii trebuie motivate.


CAP. 6 [CODURI DE ASISTENȚĂ]
(6.1). Cadrele medicale au dreptul de a utiliza doar Codul 78 pentru solicitarea de sprijin.

(6.2). Codurile 0 și 4 sunt rezervate exclusiv Departamentului de Poliție.

(6.3). Solicitările de ajutor trebuie efectuate clar și profesional pe stație.


CAP. 7 [SANCȚIUNI]
(7.1). Nerespectarea regulamentului poate fi sancționată cu Avertisment, Faction Warn, Amendă, Down sau Demitere.

(7.2). Acumularea a 3 Faction Warn-uri duce la demitere automată.

(7.3). Neprezentarea la ședințele obligatorii poate fi sancționată.

(7.4). Membrii sancționați nu pot beneficia de promovări până la expirarea sancțiunilor active.`;

  await connection.query('DELETE FROM forum_threads WHERE title LIKE "%Regulament%" AND forum_id IN (?, ?)', [politiaForum, spitalForum]);
  
  await connection.query(`
    INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
    VALUES (?, ?, ?, 'Informații', '[Regulament] Departament Poliție LS', ?, 1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `, [crypto.randomUUID(), politiaForum, adminId, politiaRules]);

  await connection.query(`
    INSERT INTO forum_threads (id, forum_id, user_id, category, title, content, is_pinned, is_locked, views_count, replies_count, created_at, updated_at)
    VALUES (?, ?, ?, 'Informații', '[Regulament] Departament Medical', ?, 1, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `, [crypto.randomUUID(), spitalForum, adminId, mediciRules]);

  console.log("Successfully added the topics!");
  await connection.end();
}

run().catch(console.error);
