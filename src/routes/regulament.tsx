import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  Search, 
  ChevronDown, 
  Compass, 
  ShieldAlert, 
  Lock, 
  Star, 
  Eye, 
  MessageSquare, 
  ArrowLeft, 
  Calendar,
  AlertTriangle,
  Flame,
  User,
  Info,
  Clock,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { getPageViews, incrementPageViews } from "@/lib/api/metrics.server";

export const Route = createFileRoute("/regulament")({
  head: () => ({
    meta: [
      { title: "REGULAMENTE & TERMENI — FLOW ROMÂNIA" },
      { name: "description", content: "Regulamentele oficiale, condițiile de joc și regulamentul de jafuri pentru comunitatea de roleplay FLOW ROMÂNIA." },
      { property: "og:title", content: "REGULAMENTE & TERMENI — FLOW ROMÂNIA" },
      { property: "og:description", content: "Regulamentele oficiale și condițiile comunității FLOW ROMÂNIA." },
    ],
  }),
  component: RegulamentPage,
});

type RuleItem = {
  title: string;
  pedeapsa: string;
  description: string;
  details: string[];
};

type RuleCategory = {
  id: string;
  name: string;
  icon: any;
  description: string;
  rules: RuleItem[];
};

// 1. Existing general rules structure (Cap. 1 Gameplay, Cap. 2 OOC)
const regulamenteData: RuleCategory[] = [
  {
    id: "gameplay",
    name: "Reguli Gameplay (Cap. 1)",
    icon: Compass,
    description: "Normele oficiale legate de comportamentul în joc, mecanicile de Roleplay, interacțiuni și limite administrative.",
    rules: [
      {
        title: "1. Meta-Gaming [MG]",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] între 3 și 7 zile",
        description: "Folosirea informațiilor Out-Of-Character (OOC) în scopuri și acțiuni In-Character (IC).",
        details: [
          "DEFINIȚIE: Este atunci când folosești informațiile OOC în scopuri/situații IC.",
          "EXEMPLU: Mă uit pe live-ul unui youtuber și observ că este la casa Nr. 25 din Vinewood și mai apoi merg și eu acolo să apar pe live."
        ]
      },
      {
        title: "2. Power-Gaming [PG]",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] între 1 și 3 zile",
        description: "Efectuarea unui roleplay exagerat, nerealist sau refuzul de a oferi șanse egale celorlalți.",
        details: [
          "DEFINIȚIE: Este atunci când faci un roleplay mult prea exagerat care în viața reală nu se poate realiza sau atunci când nu oferi șanse egale celorlalți participanți la roleplay.",
          "EXEMPLU ACCIDENT / ANIMATII: Anulezi 'animațiile' la trusă, adrenalină, bandaj etc."
        ]
      },
      {
        title: "3. Mixing [MX]",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] între 3 și 7 zile",
        description: "Transmiterea de informații din mediul IC în mediul OOC și invers.",
        details: [
          "DEFINIȚIE: Este atunci când transmiți informații IC-OOC, mai simplu, atunci când spui lucruri IC pe un chat OOC și invers.",
          "EXEMPLU 1: Îi spui unui prieten pe discord că îi vinzi o mașină.",
          "EXEMPLU 2: Deschiderea / Vorbitul OOC în IC."
        ]
      },
      {
        title: "4. Random Deathmatch [RDM]",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 1 și 3 zile",
        description: "Uciderea sau atacarea unui alt jucător fără un motiv de Roleplay bine întemeiat.",
        details: [
          "DEFINIȚIE: Este atunci când omori pe cineva fără un motiv Roleplay bine întemeiat.",
          "EXEMPLU: Vezi o persoană pe stradă iar tu o omori pentru că nu îți place cum este îmbrăcată."
        ]
      },
      {
        title: "5. Vehicle Deathmatch [VDM]",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 1 și 3 zile",
        description: "Călcarea intenționată a unui jucător cu un vehicul, fără motiv valid.",
        details: [
          "DEFINIȚIE: Este atunci când calci pe cineva cu mașina intenționat fără un motiv Roleplay bine întemeiat.",
          "EXEMPLU: Vezi o persoană pe stradă iar tu o calci cu mașina.",
          "NOTĂ EXCEPȚIE: Este permisă călcarea cuiva cu mașina ca ultimă cale de scăpare dintr-o situație de viață și de moarte."
        ]
      },
      {
        title: "6. Character-Kill [CK]",
        pedeapsa: "Moartea permanentă a caracterului și ștergerea averii (VIP restituit în coins)",
        description: "Moartea completă a personajului IC, pierderea identității și începerea unei vieți noi.",
        details: [
          "DEFINIȚIE: Este atunci când caracterul tău IC 'moare', unde identitatea și informațiile tale IC se pierd și vei începe un caracter nou.",
          "SITUAȚII DE ACORDARE CK:",
          "- Atunci când un jucător trădează o organizație.",
          "- Atunci când un jucător încalcă condițiile impuse de sindicat IC.",
          "- Atunci când un jucător face un roleplay complex din care se deduce că a primit CK (se aruncă de pe o clădire, este împușcat în cap de aproape etc., fiind obligat să ruleze pe /me 'moare').",
          "- Atunci când un jucător se omoară singur, intenționat, în roleplay-ul cu poliția, ca mai apoi să primească respawn și să scape de aceștia (Dacă jucătorul este omorât de altcineva, atunci nu se acordă).",
          "- Atunci când un jucător este prins că abuzează de un BUG sau a folosit HACK pentru a obține bani și bunuri.",
          "NOTĂ VEHICULE / CASE VIP: Toate mașinile și casele VIP vor fi restituite jucătorului sub formă de COINS (valută premium).",
          "NOTĂ DOVEZI: Pentru a se acorda CK este absolut necesară o filmare clară de la începutul acțiunii până la sfârșit!"
        ]
      },
      {
        title: "7. Player-Kill [PK] (Nerespectare PK)",
        pedeapsa: "BAN [CU DREPT] 1 zi",
        description: "Regula privind nerespectarea respawn-ului și reîntoarcerea în acțiunea precedentă.",
        details: [
          "DEFINIȚIE: Este atunci când îți primești respawn și ajungi la spital. După PK, ești nevoit să uiți absolut toate informațiile din roleplay-ul precedent (locație, atacatori, motive).",
          "NERESPECTARE PK: Încălcarea acestei reguli prin revenirea imediată sau folosirea informațiilor din acțiunea în care ai murit se sancționează conform tabelului."
        ]
      },
      {
        title: "8. Olympic Swim [OS]",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] 1 zi",
        description: "Înotul excesiv pe distanțe lungi fără a obosi sau a simula oboseala fizică.",
        details: [
          "DEFINIȚIE: Este atunci când înoți o distanță foarte mare fără să obosești.",
          "REGULI:",
          "- Este PERMIS să înoți perioade lungi DOAR daca ești echipat cu un costum de scafandru complet.",
          "- Este INTERZIS să te arunci în apă pentru a scăpa de anumite persoane sau polițiști care te urmăresc fără a avea un costum de scafandru."
        ]
      },
      {
        title: "9. No-Fear [NF]",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] între 1 și 3 zile",
        description: "Nesimularea fricii în situații în care viața personajului tău este pusă în pericol direct.",
        details: [
          "DEFINIȚIE: Este atunci când nu simulezi frica în situații în care ar trebui să îți fie teamă de moarte sau vătămare.",
          "EXEMPLU: Un jucător îndreaptă arma direct spre tine de la un metru, iar tu în loc să te supui începi să dai cu pumnii în el sau să fugi."
        ]
      },
      {
        title: "10. Cop-Fear [CF]",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] între 1 și 3 zile",
        description: "Nesimularea fricii sau a respectului minim față de forțele de ordine (Polițiști).",
        details: [
          "DEFINIȚIE: Reprezintă momentul în care nu simulezi frica normală și respectul față de polițiști.",
          "EXEMPLU / COP-BAITING: Începi să iei la mișto polițiștii pentru că te plictisești, îi înjuri fără motiv sau accelerezi în fața secției ca să te urmărească (se consideră Cop-Bait)."
        ]
      },
      {
        title: "11. Rob and Kill [RK]",
        pedeapsa: "BAN [CU DREPT] 1 zi",
        description: "Jefuirea unui alt jucător urmată imediat de uciderea acestuia fără un motiv RP adițional.",
        details: [
          "DEFINIȚIE: Este atunci când jefuiești un jucător și apoi alegi să îl omori fără un motiv suplimentar de roleplay major.",
          "ATENȚIE: Stația și telefonul luate de la victimă nu se iau în considerare pentru a evita sancțiunea!"
        ]
      },
      {
        title: "12. Drop and Kill [DK]",
        pedeapsa: "BAN [CU DREPT] 1 zi",
        description: "Forțarea unui jucător să își arunce bunurile pe jos, urmată de uciderea acestuia.",
        details: [
          "DEFINIȚIE: Este atunci când pui un jucător să arunce iteme pe jos din inventar și apoi îl omori.",
          "ATENȚIE: Stația și telefonul luate sau aruncate nu se iau în considerare pentru a anula regula!"
        ]
      },
      {
        title: "13. Comportament de Bombardier",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] 1 zi",
        description: "Înjosirea sau comportamentul agresiv OOC ascuns sub pretextul jocului, jignirea pe străzi fără motiv.",
        details: [
          "DEFINIȚIE: Este atunci când te comporți neadecvat, înjosind diverși jucători fără niciun motiv de roleplay.",
          "- Atunci când înjuri oameni pe stradă fără motiv sau context.",
          "- Atunci când te comporți urât cu un jucător doar pentru că are o mașină mai ieftină sau este nou pe server."
        ]
      },
      {
        title: "14. Reguli privind Joburile și Departamentele",
        pedeapsa: "Joburi --> WARN | Departamente --> În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 3 și 7 zile",
        description: "Obligațiile generale ale angajaților de la joburile legale și regulile stricte de non-corupție pentru Poliție/SMURD.",
        details: [
          "- Este INTERZIS să practici un job legal fără uniforma respectivă (dacă jobul deține una).",
          "- Este INTERZIS să practici un job fără mașina destinata acestuia.",
          "- Este INTERZIS să faci ilegalități în timp ce ești echipat sau practici un job legal.",
          "- Ești OBLIGAT să ai un comportament civilizat și decent la orice job legal.",
          "- Este INTERZIS să faci acțiuni ilegale ca și medic sau polițist, atât ON-DUTY cât și OFF-DUTY (se consideră CORUPȚIE severă și se sancționează drastic).",
          "- Este INTERZIS să te pui ON-DUTY în joc fără să pornești pontajul pe serverul de Discord.",
          "- Este INTERZIS să fentezi pontajul sau să stai AFK în timp ce ești ON-DUTY.",
          "- Este INTERZIS să te pui ON-DUTY doar pentru a farma salariul pasiv.",
          "- Ești OBLIGAT ca atunci când te pui OFF-DUTY să arunci tot echipamentul de stat (Arme, Veste, Truse, etc.) și să te asiguri că pontajul este oprit complet."
        ]
      },
      {
        title: "15. Despre CONDUS NON-ROLEPLAY",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] între 1 și 3 zile",
        description: "Reguli stricte de viteză pe teren offroad, utilizarea manevrelor de pitstop și deplasarea prin canale.",
        details: [
          "- Este INTERZIS să mergi pe un drum offroad (pământ, iarbă) cu mai mult de 60km/h (Excepție: în urmăriri limita maximă este de 100km/h).",
          "- Este INTERZIS să mergi pe un drum extreme-offroad (munte, stânci) cu mai mult de 60km/h indiferent de situație sau urmărire.",
          "- Este INTERZIS să conduci offroad sau extreme offroad cu un vehicul care nu este conceput pentru asta (ex: mașini sport, supercars).",
          "- Este INTERZIS să intri intenționat în alte mașini fără un motiv de Roleplay.",
          "- Este INTERZIS să efectuezi manevra de pitstop la o viteză mai mare de 150km/h.",
          "- Este INTERZIS să faci pitstop în interiorul orașului Los Santos (datorită riscului ridicat de a lovi civili/clădiri).",
          "- Este PERMIS să faci pitstop doar cu anumite clase de vehicule (CLASA B, C, LOWRIDER, MAFIE, POLITIE).",
          "- Este PERMIS să faci pitstop în oraș doar în intervalul orar 00:00 - 06:00 (când străzile sunt goale).",
          "DEFINIȚIE PITSTOP: Intrarea în spatele sau lateralul unei mașini pentru a o opri sau dezechilibra.",
          "- Este INTERZIS să aterizezi elicoptere în alte locuri decât Helipads (excepție fac elicopterele SMURD/Poliție în misiuni).",
          "- Este INTERZIS să aterizezi avioane în afara aeroporturilor existente pe hartă.",
          "- Este INTERZIS să mergi pe nisip (plajă) cu orice alt vehicul în afară de ATV.",
          "- Este PERMIS să faci blocaje rutiere doar cu mașini valide de pitstop, având obligația de a lăsa o cale de scăpare (nu blocați tot drumul).",
          "- Este INTERZIS ca civilii sau mafioții să facă blocaje pe autostradă.",
          "- Este PERMIS să mergi prin canale/tunele doar cu un vehicul din categoria extreme offroad (ex: SUV-uri mari, 4x4)."
        ]
      },
      {
        title: "16. Acțiuni ce implică Vehicule",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] 1 zi",
        description: "Norme privind interacțiunile cu vehiculele pe timp de roleplay.",
        details: [
          "- Este INTERZIS să te arunci cu mașina intenționat în apă.",
          "- Este INTERZIS să te arunci cu motorul în apă fără a avea echipat costum de scafandru.",
          "- Este INTERZIS să furi mașini aparținând medicilor (SMURD) sau poliției fără un motiv extrem de bine întemeiat de Roleplay.",
          "- Este INTERZIS să îți parchezi mașina sau să scoți un alt vehicul din garaj în timpul unei urmăriri active.",
          "- Este INTERZIS să te urci în mașina unui alt jucător fără permisiunea sau aprobarea acestuia.",
          "- Este INTERZIS să obligi un jucător să te piloteze sau să te conducă spre insula Cayo Perico."
        ]
      },
      {
        title: "17. Roleplay-ul de Jefuit",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] între 1 și 3 zile",
        description: "Limite de ore, programul oficial pentru jafuri în Los Santos și Cayo Perico, precum și zonele permise.",
        details: [
          "- Limita de ore: Este PERMIS să jefuiești indiferent de numărul de ore.",
          "- Interval Oraș (Los Santos): Este PERMIS să jefuiești DOAR în intervalul orar 20:00 - 08:00.",
          "- Interval Cayo Perico: Este PERMIS să jefuiești DOAR în intervalul orar 18:00 - 12:00.",
          "- Zone permise: Este OBLIGATORIU să jefuiești DOAR în zone roșii și rău famate (excepție fac jafurile de afaceri și bancomate).",
          "- Medici & Polițiști: Este STRICT INTERZIS să jefuiești medici sau polițiști ON-DUTY.",
          "- Joburi legale: Este STRICT INTERZIS să jefuiești persoane care efectuează un job legal active în acele momente.",
          "- Bunuri jefuibile: Este PERMIS să jefuiești doar ceea ce victima are fizic în inventar asupra ei la acel moment.",
          "- Bunuri exceptate: Este INTERZIS să jefuiești bunuri care provin din practicarea unui job legal sau echipamente oficiale ale mafiilor dacă nu aveți grad de mafie (le puteți cere să le arunce pe jos în schimb).",
          "- Abuzuri interzise: Este STRICT INTERZIS să obligi victima să își scoată alte mașini din garaj, să scoată bani de la bancă sau iteme din depozite/seifuri private.",
          "INFORMAȚIE ZONE: Toate zonele nemarcate pe hartă în Los Santos sunt considerate ZONE VERZI (sigure), iar toate zonele nemarcate din afara Los Santos-ului sunt considerate ZONE ROȘII!",
          "ATENȚIE: Acordați o atenție deosebită limitelor. Dacă jefuiți fix la granița unei zone roșii, acțiunea poate fi anulată complet în urma unui Ticket dacă un membru Staff consideră că s-a făcut abuz."
        ]
      },
      {
        title: "18. Despre SCAM (Înșelăciuni)",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 1 și 7 zile",
        description: "Limitele maxime ale înșelăciunilor în bani sau bunuri și regulile tranzacțiilor private.",
        details: [
          "- Suma maximă: Este STRICT INTERZIS să dai scam la o sumă mai mare de 7.500$ în bunuri sau bani.",
          "- Muncă neplătită: Este STRICT INTERZIS să pui o persoană să lucreze pentru tine (ex: farmat) și la final să nu îi plătești suma promisă.",
          "- Contracte legale: Este STRICT INTERZIS să dai scam în baza unui contract de cumpărare, schimb între vehicule, iteme legale sau locuințe.",
          "- Înțelegeri verbale: Este PERMIS să dai scam dacă cealaltă persoană acceptă să îți dea banii separat, fără utilizarea unui contract securizat din joc.",
          "- Servicii neplătite: Este STRICT INTERZIS să beneficiezi de servicii oferite contra cost de alți jucători și apoi să refuzi plata."
        ]
      },
      {
        title: "19. Acțiuni Ilegale Neconforme",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] între 1 și 7 zile",
        description: "Norme privind utilizarea armelor în public și răpirile de cetățeni.",
        details: [
          "- Este STRICT INTERZIS să tragi cu arma într-o zonă publică aglomerată.",
          "- Este INTERZIS să răpești persoane dintr-o zonă publică.",
          "- Este INTERZIS să răpești pe cineva dacă nu sunteți cel puțin 2 membri în vehiculul atacatorilor.",
          "- Este PERMIS să tragi pe autostradă doar dacă acțiunea RP de urmărire/conflict a început într-o zonă roșie.",
          "- Este STRICT INTERZIS să furi mașini în zone foarte populate."
        ]
      },
      {
        title: "20. Luarea de Oostatici (Ostatec)",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 1 și 3 zile",
        description: "Motivele valide pentru a lua un ostatec, limita de timp și sumele maxime permise.",
        details: [
          "- Motiv valid: Este STRICT INTERZIS să luați un ostatec fără ca aceasta să fie ultima voastră cale de scăpare dintr-o situație RP majoră.",
          "- Limită de timp: Este INTERZIS să țineți o persoană ostatică mai mult de 1 oră fără să solicitați răscumpărarea ei.",
          "- Răscumpărare maximă: Este INTERZIS să cereți mai mult de 300.000$ pe un ostatic (în bunuri sau bani). ATENȚIE! Este strict interzis să cereți bani direct de la Departamentul de Poliție.",
          "- Cerințe nerealiste: Este INTERZIS să cereți lucruri imposibile, absurde sau exagerate OOC din partea poliției sau negociatorului.",
          "- Respectarea înțelegerii: Este OBLIGATORIU ca ambele părți să își respecte cuvântul dat în urma negocierilor.",
          "- Dreptul de a ucide ostatecul: Dacă cerințele negociate sunt refuzate în mod repetat și nejustificat, aveți dreptul de a ucide ostatecul."
        ]
      },
      {
        title: "21. Revenge-Kill [RK]",
        pedeapsa: "BAN [CU DREPT] 1 zi",
        description: "Uciderea sau atacarea persoanei care te-a omorât anterior, încălcând starea de PK.",
        details: [
          "DEFINIȚIE: Reprezintă momentul în care tu nu rolezi corespunzător PK-ul primit, ducându-te imediat după respawn din spital să cauți și să omori persoana care te-a ucis anterior pentru a te răzbuna."
        ]
      },
      {
        title: "22. Roleplay Scârbos",
        pedeapsa: "BAN [CU DREPT / FARA DREPT] 7 zile",
        description: "Restricții severe privind comportamentele dezgustătoare, sexuale sau violente.",
        details: [
          "DEFINIȚIE: Abuzul sexual (violul, hărțuirea sexuală gravă, canibalismul, necrofilia, pedofilia) și alte tipuri de Roleplay extrem de dezgustător sau deranjant sunt permise pe server DOAR cu acordul OOC explicit al tuturor părților implicate înainte de începerea acțiunii!"
        ]
      },
      {
        title: "23. Reguli Civili / Mafii Direct",
        pedeapsa: "BAN [FARA DREPT] între 1 zi și 3 zile",
        description: "Interdicția de sprijin reciproc între tabere diferite în confruntările cu Poliția.",
        details: [
          "- Este STRICT INTERZIS ca membrii de mafii să intervină în ajutorul civililor sau invers, civilii să intervină în ajutorul mafioților, în timpul conflictelor sau urmăririlor cu poliția.",
          "- EXCEPȚIE: Singurele excepții permise sunt în timpul Jafurilor majore organizate de comun acord și pe insula Cayo Perico."
        ]
      }
    ]
  },
  {
    id: "ooc",
    name: "Reguli OOC (Cap. 2)",
    icon: ShieldAlert,
    description: "Normele Out-Of-Character privind comportamentul comunitar, regulile tehnice, utilizarea bug-urilor și acumularea de sancțiuni.",
    rules: [
      {
        title: "1. Suferințe OOC",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] 1 zi",
        description: "Interzicerea persiflărilor, batjocurii OOC sau ironiilor aduse altor jucători.",
        details: [
          "DEFINIȚIE: Este STRICT INTERZIS să faceți orice fel de suferințe pe chat-ul jocului, pe Discord sau stații.",
          "EXEMPLE INTERZISE: Mesaje de tipul 'Sunteți prea slabi', 'Când o să ajungeți voi la nivelul nostru?', sau spamarea numărătorilor pe chat după ce ați ucis pe cineva."
        ]
      },
      {
        title: "2. Post-Hunt",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 1 și 7 zile",
        description: "Vânătoarea de greșeli minore pentru a depune plângeri.",
        details: [
          "- Este STRICT INTERZIS să 'vânați' alți jucători pentru a le face tichet la fiecare greșeală minoră de roleplay.",
          "- Drept de reclamație: Este PERMIS să faci tichet unui jucător doar dacă ai fost participant direct în acel Roleplay.",
          "- Limită de timp: Reclamațiile trebuie depuse în maxim 24 de ore de la producerea incidentului."
        ]
      },
      {
        title: "3. Acumulare Ban-uri / Warn-uri",
        pedeapsa: "3 Warns = Ban 7 zile | 5 Bans = Ban Permanent",
        description: "Efectele cumulării sancțiunilor pe termen lung pe server.",
        details: [
          "- Warn-uri: La acumularea a 3 warn-uri (avertismente), contul va fi sancționat automat cu BAN temporar de 7 zile.",
          "- Ban-uri temporare: La acumularea a 5 ban-uri temporare, contul primește BAN PERMANENT."
        ]
      },
      {
        title: "4. Injurii / Jigniri OOC",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] 1 zi",
        description: "Interzicerea totală a limbajului vulgar în mediul Out-Of-Character.",
        details: [
          "- Este STRICT INTERZIS să înjurați, jigniți sau să aveți un comportament vulgar OOC la adresa unui alt membru al comunității.",
          "- Mediul IC: Este PERMIS să folosiți injurii ușoare sau medii în joc (IC) DOAR dacă acestea sunt justificate de un conflict de roleplay bine stabilit."
        ]
      },
      {
        title: "5. Hack / Software Terț",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT]",
        description: "Utilizarea programelor de tip cheats, aimbot, wallhack sau exploit-uri externe.",
        details: [
          "- Este STRICT INTERZIS să folosiți orice formă de HACK, script dăunător sau program terț care vă oferă avantaje nedrepte pe server."
        ]
      },
      {
        title: "6. Folosire '/cara' Abuziv",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 1 și 7 zile",
        description: "Preluarea fizică a altor caractere fără nicio interacțiune verbală prealabilă.",
        details: [
          "- Este STRICT INTERZIS să luați persoane pe sus folosind comanda `/cara` fără a fi avut o interacțiune de roleplay consistentă."
        ]
      },
      {
        title: "7. Amenințări",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT / FARA DREPT] 1 zi",
        description: "Pretinderea de funcții administrative sau amenințarea jucătorilor cu acțiuni ale echipei Staff.",
        details: [
          "- Este STRICT INTERZIS să pretindeți că dețineți funcții în staff, că aveți relații speciale cu fondatorii.",
          "- Amenințarea altor jucători cu mesaje de tipul 'Îți iei ban în 5 minute' este total interzisă!"
        ]
      },
      {
        title: "8. Acțiune Teroristă Neconformă",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT]",
        description: "Reguli stricte privind planificarea actelor de terorism în oraș.",
        details: [
          "- Este STRICT INTERZIS să organizați acțiuni cu caracter terorist fără permisiunea scrisă a unui Head of Staff sau Management."
        ]
      },
      {
        title: "9. Ban-Evade",
        pedeapsa: "BAN PERMANENT [FARA DREPT]",
        description: "Ocolirea sancțiunilor active prin crearea sau logarea de pe alte conturi.",
        details: [
          "DEFINIȚIE: Este atunci când un membru staff ți-a oferit o sancțiune pe comunitate (ban), iar tu încerci să intri cu alt cont pentru a ocoli pedeapsa."
        ]
      },
      {
        title: "10. Troll",
        pedeapsa: "În funcție de gravitate BAN [CU DREPT / FARA DREPT] între 3 și 30 zile",
        description: "Intrarea pe server cu unicul scop de a strica jocul altora, fără intenție de roleplay.",
        details: [
          "DEFINIȚIE: Este atunci când nu dorești să faci un roleplay serios, iar pe server ai unicul scop de a-ți bate joc de reguli și de a deranja jucătorii."
        ]
      },
      {
        title: "11. Reclama IC / OOC",
        pedeapsa: "BAN PERMANENT [FARA DREPT]",
        description: "Promovarea directă sau indirectă a altor comunități sau servicii concurente.",
        details: [
          "- Este STRICT INTERZIS să faceți orice formă de reclamă adusă altor servere de FiveM, comunități de Discord sau servicii neafiliate FLOW."
        ]
      },
      {
        title: "12. Bug-Abuse",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT] + CK (dacă este cazul)",
        description: "Exploatarea problemelor tehnice sau a erorilor de script pentru avantaje personale.",
        details: [
          "- Este STRICT INTERZIS să abuzați de bug-urile sau erorile pe care le descoperiți pe server.",
          "- Ești OBLIGAT să raportezi imediat orice bug descoperit prin deschiderea unui tichet pe serverul oficial de Discord."
        ]
      },
      {
        title: "13. Tranzacții OOC",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT] + CK",
        description: "Vânzarea sau cumpărarea de bunuri din joc în schimbul banilor reali.",
        details: [
          "DEFINIȚIE: Este atunci când oferi bunuri IC în schimbul unor beneficii OOC (bani reali, conturi, paysafe, etc.)."
        ]
      },
      {
        title: "14. Disconnect in Roleplay",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] 3 zile",
        description: "Ieșirea voluntară de pe server în timpul unui roleplay activ sau urmăriri.",
        details: [
          "- Este STRICT INTERZIS să vă deconectați de pe server în timp ce sunteți implicați într-o acțiune activă de Roleplay."
        ]
      },
      {
        title: "15. Nerespectare reguli în timpul folosirii armelor de foc",
        pedeapsa: "BAN [CU DREPT / FARA DREPT] 14 zile",
        description: "Obligația absolută de a înregistra video acțiunile în care sunt implicate arme.",
        details: [
          "- Ești OBLIGAT să deții o înregistrare video clară în timp ce POSEZI sau FOLOSEȘTI orice armă de foc pe server."
        ]
      },
      {
        title: "16. Ascundere Dovezi",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT]",
        description: "Refuzul intenționat de a prezenta filmările cerute de echipa de administrare.",
        details: [
          "- Reprezintă momentul în care un jucător refuză în mod intenționat să prezinte dovezile solicitate de un membru Staff."
        ]
      },
      {
        title: "17. Account Sharing",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT] + CK",
        description: "Împărțirea sau logarea pe contul tău de joc de către o altă persoană fizică.",
        details: [
          "- Partajarea conturilor este total interzisă în orice scop administrativ sau personal."
        ]
      },
      {
        title: "18. Comportament cu Fetele",
        pedeapsa: "BAN PERMANENT [CU DREPT / FARA DREPT]",
        description: "Reguli stricte privind respectul față de jucătoarele comunității.",
        details: [
          "- Comportamentul cu fetele trebuie să fie unul exemplar și respectuos. Este strict interzis să hărțuiți fetele pe server."
        ]
      },
      {
        title: "19. AFK / Refuz Roleplay",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] 1 zi",
        description: "Statul intenționat AFK sau ignorarea acțiunilor de joc desfășurate în jurul tău.",
        details: [
          "- Este INTERZIS să stați AFK în zonele active sau în timpul unei acțiuni RP."
        ]
      },
      {
        title: "20. Despre Bunele Maniere",
        pedeapsa: "În funcție de gravitate WARN sau BAN [CU DREPT] 1 zi",
        description: "Păstrarea ordinii și respectarea rândurilor în zonele administrative din joc.",
        details: [
          "- Atunci când se formează cozi la diverse puncte din joc, aveți obligația de a le respecta civilizat."
        ]
      },
      {
        title: "21. Multiple Accounts",
        pedeapsa: "BAN PERMANENT [FARA DREPT] pe toate conturile",
        description: "Deținerea și utilizarea mai multor conturi de joc active pe serverul FLOW.",
        details: [
          "- Reprezintă momentul în care un jucător posedă și utilizează mai mult de un singur cont înregistrat pe serverul FLOW."
        ]
      }
    ]
  }
];

// 2. New Terms and Conditions data
const termeniData = [
  {
    title: "1. Introducere",
    content: "Fiecare jucător care se conectează la server este total de acord cu termenii și condițiile impuse, iar orice abatere duce la interzicerea accesului definitiv pe comunitate."
  },
  {
    title: "2. Acceptarea regulamentului intern",
    content: "Fiecare jucător declară că a luat la cunoștință toate prevederile care aparțin regulamentului intern.\n\nNerespectarea regulamentului atrage răspunderea pe cont propriu al jucătorului și poate duce la aplicarea de sancțiuni de tip avertismente, restricționarea provizorie și chiar permanentă.\n\nDezvoltatorii pot actualiza regulamentul periodic, iar modificările sunt anunțate pe server-ul de Discord. Este datoria fiecărui jucător să verifice anunțurile des pentru a fi la curent cu noile modificări."
  },
  {
    title: "3. Accesarea server-ului",
    content: "Accesarea server-ului este permisă tuturor jucătorilor în orice moment în care acesta este online și nu întâmpină o mentenanță (când modul whitelist este activ).\n\nExistă momente în care server-ul se poate restricționa provizoriu jucătorilor noi datorită deficitului de personal în acel moment.\n\nPersonalul server-ului nu este responsabil pentru defecțiunile prezente datorită platformei CFX."
  },
  {
    title: "4. Monitorizarea și înregistrarea activității",
    content: "Toate acțiunile jucătorilor realizate pe server sunt monitorizate și înregistrate sub formă de log-uri.\n\nEchipa administrativă își rezervă dreptul de a accesa și utiliza aceste înregistrări în orice moment, în scopul verificării activității jucătorilor și al stabilirii eventualelor abateri de la regulament."
  },
  {
    title: "5. Ascundere dovezi / informații",
    content: "Orice jucător este obligat să prezinte informațiile și dovezile cerute de către echipa administrativă în orice moment.\n\nDovezile trebuie păstrate cel puțin 24H."
  },
  {
    title: "6. Limitarea răspunderii",
    content: "Utilizarea server-ului se realizează pe propria răspundere a jucătorului.\n\nEchipa administrativă și Dezvoltatorii nu sunt responsabili pentru eventuale probleme de sănătate fizică sau psihică apărute în urma utilizării server-ului."
  },
  {
    title: "7. Informații cu privire la achiziții",
    content: "Fiecare achiziție efectuată de către un jucător este voluntară și nerambursabilă.\n\nComunitatea Flow nu se ocupă direct cu procesarea plăților, acestea se efectuează doar pe platforma externă TEBEX."
  },
  {
    title: "8. Dreptul la informație și asistență superioară",
    content: "Fiecare jucător are dreptul la primirea informațiilor necesare din partea echipei administrative.\n\nÎn cazul în care un jucător consideră că informația / decizia luată de către administratorul curent este nepotrivită, poate solicita intervenția unui grad superior."
  },
  {
    title: "9. Verificarea integrității sistemului",
    content: "Pentru a asigura integritatea corectitudinii jucătorilor, echipa administrativă își rezervă dreptul de a verifica și de a confirma că un sistem nu prezintă programe interzise.\n\nOrice tool / hack / program care aduce avantaje neautorizate față de ceilalți jucători este interzis.\n\nOrice abatere este considerată ascundere dovezi și informații."
  }
];

// 3. New Robbery Rules data
const jafuriData = {
  tipuri: [
    { name: "Jafuri de tip Heist", items: ["Flecca Heist", "Paleto Heist", "Humane Labs", "Pacific Heist", "Underground Heist", "Casino Heist"] },
    { name: "Jafuri independente", items: ["Bijuterie", "Union Heist"] },
    { name: "Răpirea", items: ["Acțiune de Răpire (Jaf persoane)"] }
  ],
  informatii: [
    "O organizație poate da un singur jaf care face parte din categoria Heist o dată la 24H.",
    "Jafurile independente au cooldown propriu, astfel încât fiecare jaf independent poate fi dat de o organizație o dată la 24H.",
    "Răpirea este singurul jaf care nu are cooldown."
  ],
  participanti: [
    { jaf: "Răpire", min: 4, max: 8 },
    { jaf: "Bijuterie", min: 4, max: 12 },
    { jaf: "Union Heist", min: 4, max: 12 },
    { jaf: "Flecca Heist", min: 6, max: 16 },
    { jaf: "Paleto Heist", min: 6, max: 16 },
    { jaf: "Humane Labs", min: 8, max: 18 },
    { jaf: "Pacific Heist", min: 8, max: 18 },
    { jaf: "Underground Heist", min: 10, max: 20 },
    { jaf: "Casino Heist", min: 10, max: 20 }
  ],
  reguli: [
    "Este INTERZIS să aruncați orice tip de explozibil la baza / pe acoperișul clădirilor sau înăuntrul lor.",
    "Este INTERZIS să blocați căile de acces atât înăuntrul clădirii, cât și în incinta acesteia.",
    "Este INTERZIS să aveți mai mult de 8 PIPEBOMB-uri / STICKYBOMB-uri per membrii implicați.",
    "Este INTERZIS să luați OSTATIC, indiferent dacă acțiunea s-a mutat în altă locație.",
    "Este OBLIGATORIU să respectați coada.",
    "Este OBLIGATORIU să respectați cooldown-ul.",
    "Este OBLIGATORIU să respectați numărul de participanți."
  ]
};

// Locked announcements list configuration
const lockedTopics = [
  {
    id: "termeni",
    title: "Termeni și Condiții",
    author: "19mariuss48",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    date: "1 iunie 2026",
    replies: "0 replies",
    views: "0 views",
    color: "#6b7280"
  },
  {
    id: "regulament",
    title: "Regulament",
    author: "19mariuss48",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    date: "1 iunie 2026",
    replies: "0 replies",
    views: "0 views",
    color: "#14b8a6"
  },
  {
    id: "jafuri",
    title: "REGULAMENT - Jafuri Organizatii / Jafuri Civili",
    author: "19mariuss48",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    date: "1 iunie 2026",
    replies: "0 replies",
    views: "0 views",
    color: "#3b82f6"
  }
];

function RegulamentPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // States for general regulament sub-view
  const [activeCategory, setActiveCategory] = useState("gameplay");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>({});

  const toggleRule = (categoryKey: string, ruleIndex: number) => {
    const key = `${categoryKey}-${ruleIndex}`;
    setExpandedRules((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const [viewsData, setViewsData] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch initial views
    const loadViews = async () => {
      try {
        const termeniV = await getPageViews({ data: { pageId: "termeni" } });
        const regulamentV = await getPageViews({ data: { pageId: "regulament" } });
        const jafuriV = await getPageViews({ data: { pageId: "jafuri" } });

        const newViews = {
          termeni: termeniV || 0,
          regulament: regulamentV || 0,
          jafuri: jafuriV || 0
        };

        setViewsData(newViews);
      } catch (e) {
        console.error("Eroare la preluarea vizualizarilor din baza de date:", e);
      }
    };
    loadViews();
  }, []);

  const handleSelectTopic = async (topicId: string) => {
    setSelectedTopic(topicId);
    try {
      const newCount = await incrementPageViews({ data: { pageId: topicId } });
      if (newCount) {
        setViewsData(prev => ({ ...prev, [topicId]: newCount }));
      }
    } catch (e) {
      console.error("Eroare la incrementarea vizualizarilor:", e);
    }
  };

  const activeData = regulamenteData.find((c) => c.id === activeCategory) || regulamenteData[0];

  // Filter rules based on search query
  const filteredCategories = regulamenteData.map((cat) => {
    const filteredRules = cat.rules.filter(
      (rule) =>
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...cat, rules: filteredRules };
  });

  const displayData = searchQuery
    ? filteredCategories.find((c) => c.id === activeCategory) || { rules: [] }
    : activeData;

  const totalRulesCount = regulamenteData.reduce((acc, cat) => acc + cat.rules.length, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">ACASĂ</Link>
          <ChevronRight className="h-3 w-3" />
          <span 
            onClick={() => setSelectedTopic(null)} 
            className={`cursor-pointer uppercase ${selectedTopic ? "hover:text-foreground text-muted-foreground" : "text-silver font-semibold"}`}
          >
            REGULAMENTE & CONDITII
          </span>
          {selectedTopic && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-silver font-semibold uppercase">
                {selectedTopic === "termeni" && "Termeni și Condiții"}
                {selectedTopic === "regulament" && "Regulament General"}
                {selectedTopic === "jafuri" && "Regulament Jafuri"}
              </span>
            </>
          )}
        </div>

        {/* 1. INITIAL SUB-FORUM VIEW */}
        {selectedTopic === null && (
          <div className="space-y-12">
            {/* Header Block */}
            <div className="text-center">
              <p className="text-xs tracking-[0.5em] text-silver mb-3">DOCUMENTE OFICIALE COMUNITATE</p>
              <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient uppercase">
                Anunțuri & Regulamente
              </h1>
              <div className="mx-auto mt-6 hairline w-32" />
              <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Citește cu atenție regulile interne, procedurile privind jafurile și termenii de utilizare a platformei FLOW ROMÂNIA.
                Abaterile vor fi sancționate administrativ.
              </p>
            </div>

            {/* Premium IP.Board style locked announcements box */}
            <div className="max-w-5xl mx-auto glass border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
              
              {/* Box Top Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] font-bold text-silver uppercase">Anunțuri Oficiale / Subiecte Importante</span>
                </div>
                <button className="text-[9px] tracking-widest text-silver/60 hover:text-white font-mono bg-white/5 border border-white/5 rounded-md px-3 py-1.5 flex items-center gap-1 transition-colors uppercase">
                  SORT BY <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              {/* Box Rows */}
              <div className="divide-y divide-white/5">
                {lockedTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-white/[0.02] cursor-pointer transition-all duration-300 group"
                  >
                    
                    {/* Left block: Title, icons, metadata */}
                    <div className="flex items-start gap-4 flex-1">
                      
                      {/* Left icon sequence matching picture */}
                      <div className="flex items-center gap-1.5 mt-1 shrink-0">
                        {/* Lock Icon */}
                        <Lock className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-white transition-colors" />
                        
                        {/* Custom IPB circular tree/leaf star tags */}
                        <div className="h-4.5 w-4.5 rounded-full bg-[#1b2f27] border border-[#2b5943]/40 flex items-center justify-center text-emerald-400 text-[10px] font-bold shrink-0 shadow-inner">
                          ♣
                        </div>
                        <div className="h-4.5 w-4.5 rounded-full bg-[#1b2f27] border border-[#2b5943]/40 flex items-center justify-center text-emerald-400 text-[9px] font-bold shrink-0 shadow-inner">
                          ★
                        </div>
                        
                        {/* Bullet point */}
                        <span className="text-silver/40 pl-0.5">•</span>
                      </div>

                      {/* Title & Author */}
                      <div>
                        <h3 className="text-base font-medium text-silver/90 group-hover:text-white transition-colors duration-300 tracking-wide">
                          {topic.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1 font-light">
                          By <span className="text-silver hover:underline font-semibold">{topic.author}</span>, {topic.date}
                        </p>
                      </div>
                    </div>

                    {/* Middle stats */}
                    <div className="flex gap-8 my-4 md:my-0 md:px-12 text-left md:text-right shrink-0">
                      <div className="flex flex-col min-w-[70px]">
                        <span className="text-xs font-semibold text-silver/80 font-mono leading-tight">{topic.replies}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{viewsData[topic.id] || 0} views</span>
                      </div>
                    </div>

                    {/* Right side: Author Profile Avatar & Date */}
                    <div className="flex items-center gap-3 shrink-0 border-t border-white/5 pt-4 md:pt-0 md:border-0">
                      <img src={topic.avatar} alt={topic.author} className="h-9 w-9 rounded-full object-cover border border-white/10 group-hover:border-white/30 transition-colors shadow-lg" />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-silver group-hover:text-white transition-colors">{topic.author}</div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{topic.date}</div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Bottom info widget */}
            <div className="max-w-5xl mx-auto flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-5 text-xs text-muted-foreground">
              <Info className="h-6 w-6 text-silver/60 shrink-0" />
              <p>
                💡 <strong>Sfat util:</strong> Utilizați documentele de mai sus ca referință oficială. În cazul în care faceți o plângere sau un ticket pe Discord, menționarea regulii exacte din capitolele de mai sus vă va asigura soluționarea rapidă a speței.
              </p>
            </div>
          </div>
        )}

        {/* 2. SUB-VIEW: TERMENI SI CONDITII */}
        {selectedTopic === "termeni" && (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header Block with Back button */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="self-start inline-flex items-center gap-1.5 text-xs text-silver hover:text-white font-medium tracking-wider bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA SUBIECTE
              </button>
              
              <div>
                <p className="text-[10px] tracking-[0.4em] text-silver uppercase mb-1 font-mono">Capitolul Administrativ Oficial</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-wide text-silver-gradient">
                  TERMENI ȘI CONDIȚII
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Ultima Actualizare: 1 iunie 2026 · Publicat de 19mariuss48
                </p>
              </div>
            </div>

            {/* Terms List inside custom visual cards */}
            <div className="space-y-6">
              {termeniData.map((term, index) => (
                <div key={index} className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:border-white/10 transition-colors shadow-lg">
                  <h3 className="text-lg font-semibold tracking-wide text-white mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-silver/60" />
                    {term.title}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/85 leading-relaxed font-light whitespace-pre-line leading-loose">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom accept warning card */}
            <div className="glass bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-widest text-rose-400 uppercase">ACORD IMPLICIT OBLIGATORIU</h4>
                <p className="text-xs text-muted-foreground leading-normal">
                  Prin accesarea serverului și portalului FLOW ROMÂNIA, sunteți complet de acord cu termenii de mai sus. Orice tentativă de abuz, ocolire a regulilor sau ascundere de probe va atrage direct banarea permanentă și adăugarea în Blacklist-ul comunității.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. SUB-VIEW: REGULAMENT GENERAL */}
        {selectedTopic === "regulament" && (
          <div className="space-y-10">
            {/* Header Block with Back button */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="self-start inline-flex items-center gap-1.5 text-xs text-silver hover:text-white font-medium tracking-wider bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA SUBIECTE
              </button>
              
              <div>
                <p className="text-[10px] tracking-[0.4em] text-silver uppercase mb-1 font-mono">Reguli de Joc & Conduită OOC</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-wide text-silver-gradient">
                  REGULAMENT JOC & COMUNITATE
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Ultima Actualizare: 1 iunie 2026 · Publicat de 19mariuss48
                </p>
              </div>
            </div>

            {/* Interactive Search Bar */}
            <div className="max-w-2xl mx-auto mb-10 relative">
              <div className="absolute inset-0 -m-1 bg-white/5 rounded-full blur opacity-30 pointer-events-none" />
              <div className="relative glass rounded-full flex items-center px-6 py-1 border-white/10 hover:border-white/20 transition-all duration-300">
                <Search className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Caută o regulă sau un termen specific (ex: MetaGaming, PG, CK, Ostatec)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-0 outline-none w-full py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-muted-foreground hover:text-foreground tracking-widest font-mono font-semibold"
                  >
                    ȘTERGE
                  </button>
                )}
              </div>
            </div>

            {/* Tab & Content layout */}
            <div className="grid lg:grid-cols-4 gap-8 items-start">
              
              {/* Left Sidebar Category Tabs */}
              <div className="space-y-2 lg:col-span-1">
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-4 px-3 font-bold">Capitole</div>
                {regulamenteData.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white/[0.04] border-white/15 text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                          : "bg-transparent border-transparent hover:bg-white/[0.02] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-white/10 text-white" : "bg-white/[0.03] text-muted-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold tracking-wider uppercase block">{cat.name}</span>
                        <span className="text-[9px] text-muted-foreground font-mono">{cat.rules.length} REGULI</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Main Rules Content */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass rounded-2xl p-6 border-white/5 bg-white/[0.01]">
                  <h2 className="text-lg font-light tracking-widest text-silver uppercase mb-1">{activeData.name}</h2>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{activeData.description}</p>
                </div>

                {displayData.rules.length === 0 ? (
                  <div className="glass rounded-2xl p-16 border-white/5 text-center">
                    <ShieldAlert className="h-8 w-8 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-sm font-semibold text-foreground mb-1">Nicio regulă găsită</h3>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      Nu am găsit nicio regulă care să se potrivească termenilor căutați de tine. Încearcă alte cuvinte cheie.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayData.rules.map((rule, idx) => {
                      const key = `${activeCategory}-${idx}`;
                      const isExpanded = !!expandedRules[key];
                      
                      return (
                        <div
                          key={idx}
                          className={`glass rounded-xl border transition-all duration-500 overflow-hidden ${
                            isExpanded 
                              ? "border-white/15 bg-white/[0.03] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]" 
                              : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                          }`}
                        >
                          {/* Accordion Trigger Header */}
                          <button
                            onClick={() => toggleRule(activeCategory, idx)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                          >
                            <div className="space-y-1">
                              <h3 className="text-sm md:text-base font-semibold tracking-wide text-foreground group-hover:text-silver transition duration-300">
                                {rule.title}
                              </h3>
                              <p className="text-xs text-muted-foreground font-light line-clamp-1">{rule.description}</p>
                            </div>
                            <div className={`h-8 w-8 rounded-full border border-white/5 flex items-center justify-center text-silver transition-transform duration-300 ${
                              isExpanded ? "rotate-180 bg-white/5" : "bg-transparent"
                            }`}>
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </button>

                          {/* Accordion Expandable Panel */}
                          {isExpanded && (
                            <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4 animate-fade-in">
                              {/* Penalty badge */}
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 tracking-widest uppercase font-mono">
                                Sancțiune standard / maximă: {rule.pedeapsa}
                              </div>

                              {/* Rule details list */}
                              <div className="space-y-3 pt-2">
                                {rule.details.map((detail, dIdx) => (
                                  <div key={dIdx} className="flex items-start gap-3">
                                    <span className="text-silver text-xs mt-1 shrink-0">•</span>
                                    <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
                                      {detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. SUB-VIEW: REGULAMENT JAFURI */}
        {selectedTopic === "jafuri" && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            {/* Header Block with Back button */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="self-start inline-flex items-center gap-1.5 text-xs text-silver hover:text-white font-medium tracking-wider bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA SUBIECTE
              </button>
              
              <div>
                <p className="text-[10px] tracking-[0.4em] text-silver uppercase mb-1 font-mono">Ghid Activități Ilegale de Grup</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-wide text-silver-gradient">
                  REGULAMENT JAFURI ORGANIZAȚII / CIVILi
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Ultima Actualizare: 1 iunie 2026 · Publicat de 19mariuss48
                </p>
              </div>
            </div>

            {/* Categories & Cooldown section */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column: Types & Groups */}
              <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-5">
                <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                  <Flame className="h-4.5 w-4.5 text-orange-400 animate-pulse" />
                  TIPURI DE ACTIVITĂȚI ILEGALE
                </h3>
                
                <div className="space-y-4">
                  {jafuriData.tipuri.map((tip, index) => (
                    <div key={index} className="space-y-2">
                      <span className="text-[11px] font-bold text-white tracking-widest uppercase font-mono">{tip.name}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {tip.items.map((it, i) => (
                          <span key={i} className="text-[10px] font-medium text-silver bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Time limits / Cooldowns */}
              <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-5">
                <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                  <Clock className="h-4.5 w-4.5 text-blue-400" />
                  COOLDOWN & TIMPI DE RESECȚIE
                </h3>
                
                <div className="space-y-3.5">
                  {jafuriData.informatii.map((inf, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-blue-500/80 mt-1.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {inf}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Participants numeric requirements table */}
            <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-6">
              <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                <User className="h-4.5 w-4.5 text-silver" />
                NUMĂR PARTICIPANȚI ÎNARMACȚI OBLIGATORII
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                      <th className="pb-3 pl-3">Denumire Jaf / Acțiune</th>
                      <th className="pb-3 text-center">Minim Participanți</th>
                      <th className="pb-3 text-center">Maxim Participanți</th>
                      <th className="pb-3 pr-3 text-right">Tip Configurație</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-silver">
                    {jafuriData.participanti.map((p, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 pl-3 font-medium text-white">{p.jaf}</td>
                        <td className="py-3 text-center font-mono text-emerald-400 font-semibold">{p.min} membrii</td>
                        <td className="py-3 text-center font-mono text-rose-400 font-semibold">{p.max} membrii</td>
                        <td className="py-3 pr-3 text-right text-muted-foreground uppercase text-[9px] tracking-wider">
                          {p.max <= 8 ? "Acțiune Mică" : p.max <= 16 ? "Acțiune Medie" : "Acțiune Heist Majoră"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strictest Forbidden Rules list */}
            <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-6">
              <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />
                REGULI & INTERDICȚII SEVERE
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {jafuriData.reguli.map((reg, i) => {
                  const isInterzis = reg.includes("INTERZIS");
                  return (
                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${
                      isInterzis 
                        ? "bg-rose-500/[0.02] border-rose-500/10 text-rose-200/90" 
                        : "bg-emerald-500/[0.02] border-emerald-500/10 text-emerald-200/90"
                    }`}>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isInterzis ? "bg-rose-500/15 text-rose-400" : "bg-emerald-500/15 text-emerald-400"
                      }`}>
                        {isInterzis ? "✕" : "✓"}
                      </div>
                      <p className="text-xs leading-relaxed font-light">
                        {reg}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer block */}
            <div className="glass border-amber-500/10 bg-amber-500/[0.02] rounded-2xl p-5 flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-widest text-amber-500 uppercase">ATENȚIE LA NEGOCIERI</h4>
                <p className="text-xs text-muted-foreground leading-normal">
                  Pentru jafurile majore cu ostatici, asigurați-vă că aveți o comunicare constructivă și respectuoasă cu negociatorul departamentului de poliție. Raportul de participanți va fi monitorizat în mod constant de membrii echipei Staff. Nerespectarea numărului de participanți sau utilizarea mai multor pipebomb-uri decât limita impusă va duce la anularea completă a acțiunii Roleplay.
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}
