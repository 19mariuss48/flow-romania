import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
        title: "1. Nu faceti META-GAMING [MG]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand folosesti informatiile OOC in scopuri/situatii IC.",
          "EX: Ma uit le live-ul unui youtuber si observ ca este la casa Nr. 25 din vinewood si mai apoi merg si eu acolo sa apar pe live."
        ]
      },
      {
        title: "2. Nu faceti POWER-GAMING [PG]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand faci un roleplay mult prea exagerat care in viata reala nu se poate realiza sau atunci cand nu oferi sanse egale celorlalti participanti la roleplay.",
          "EX: Anulezi 'animatiile' la trusa, adrenalina, bandaj etc."
        ]
      },
      {
        title: "3. Nu faceti MIXING [MX]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand transmiti informatii IC-OOC, mai simplu, atunci cand spui lucruri IC pe un chat OOC si invers.",
          "EX: Ii spui unui prieten pe discord ca ii vinzi o masina.",
          "EX: Deschiderea/Vorbitul OOC in IC"
        ]
      },
      {
        title: "4. Nu faceti RANDOM DEATHMATCH [RDM]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand omori pe cineva fara un motiv Roleplay bine intemeiat.",
          "EX: Vezi o persoana pe strada iar tu o omori pentru ca nu iti place cum e imbracata."
        ]
      },
      {
        title: "5. Nu faceti VEHICLE DEATHMATCH [VDM]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand calci pe cineva cu masina intentionat fara un motiv Roleplay bine intemeiat. (Este permisa calcarea cuiva cu masina ca ultima cale de scapare)",
          "EX: Vezi o persoana pe strada iar tu o calci cu masina."
        ]
      },
      {
        title: "6. Despre CHARACTER-KILL [CK]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand caracterul tau IC 'moare', unde identitatea si informatiile tale IC se pierd si vei incepe un caracter nou.",
          "PENTRU A SE ACORDA UN CK TREBUIE SA SE INDEPLINEASCA UNA DINTRE SITUATIILE DE MAI JOS:",
          "- Atunci cand un jucator tradeaza o organizatie.",
          "- Atunci cand un jucator incalca conditiile impuse de sindicat IC.",
          "- Atunci cand un jucator face un roleplay complex din care se deduce ca a primit CK (Se arunca de pe o cladire, este impuscat, etc. fiind obligat sa roleaze pe /me 'moare').",
          "- Atunci cand un jucator se omoara singur, intentionat, in roleplay-ul cu politia, ca mai apoi sa primeasca respawn si sa scape de acestia (Daca jucatorul este omorat de altcineva atunci nu se acorda).",
          "- Atunci cand un jucator este prins ca abuzeaza de un BUG sau a folosit HACK pentru a obtine bani si bunuri.",
          "TOATE MASINILE / CASELE VIP VOR FI RESTITUITE SUB FORMA DE COINS.",
          "PENTRU A SE ACORDA ESTE NEVOIE DE O FILMARE DE LA INCEPUTUL ACTIUNII PANA LA SFARSIT!"
        ]
      },
      {
        title: "7. Despre PLAYER-KILL [PK]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand iti primesti respawn si ajungi la spital. Dupa PK, esti nevoit sa uiti informatiile din roleplayul precedent."
        ]
      },
      {
        title: "8. Nu faceti OLYMPIC SWIM [OS]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand inoti o distanta foarte mare fara sa obosesti.",
          "- Este PERMIS sa innoti perioade lungi DOAR daca esti echipat cu un costum de scafandru.",
          "- Este INTERZIS sa te arunci in apa pentru a scapa de anumite persoane ce te urmaresc fara a avea un costum de scafandru."
        ]
      },
      {
        title: "9. Nu faceti NO-FEAR [NF]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand nu simulezi frica in situatii in care ar trebui sa iti fie.",
          "EX: Un player indreapta arma spre tine iar tu incepi sa dai cu pumnii in el."
        ]
      },
      {
        title: "10. Nu faceti COP-FEAR [CF]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Reprezinta momentul in care nu simulezi frica fata de politisti.",
          "EX: Incepi sa iei la misto politistii ca te plictisesti, sau ii atragi sa te urmareasca unde se considera cop-bait."
        ]
      },
      {
        title: "11. Nu faceti ROB AND KILL [RK]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand jefuiesti un player si apoi il omori. ATENTIE! Statia si telefonul nu se iau in considerare!"
        ]
      },
      {
        title: "12. Nu faceti DROP AND KILL [DK]",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand pui un player sa arunce iteme si apoi il omori. ATENTIE! Statia si telefonul nu se iau in considerare!"
        ]
      },
      {
        title: "13. Nu fiti Bombardieri",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand te comporti neadecvat, injosind diversi playeri fara motiv.",
          "- Atunci cand injuri oameni pe strada fara motiv.",
          "- Atunci cand te comporti urat cu un player doar pentru ca are o masina mai ieftina ca a ta."
        ]
      },
      {
        title: "14. Reguli privind Joburile si Departamentele",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa practici un job fara uniforma respectiva (daca are).",
          "- Este INTERZIS sa practici un job fara masina destinata acestuia (daca are).",
          "- Este INTERZIS sa faci ilegalitati la un job legal.",
          "- Esti OBLIGAT sa ai un comportament decent la orice job legal.",
          "- Este INTERZIS sa faci actiuni ilegale ca si medic/politist atat ON-DUTY cat si OFF-DUTY, considerandu-se CORUPTIE.",
          "- Este INTERZIS sa te pui ON-DUTY in-game fara sa ai pontajul pornit si pe discord, considerandu-se CORUPTIE.",
          "- Este INTERZIS sa fentezi pontajul, considerandu-se CORUPTIE.",
          "- Este INTERZIS sa te pui ON-DUTY pentru salariu, considerandu-se CORUPTIE.",
          "- Esti OBLIGAT ca atunci cand te pui OFF-DUTY sa arunci tot echipamentul (Arme,Veste,Truse,Etc.) si sa te asiguri ca pontajul este oprit atat pe discord cat si in-game, in caz contrat considerandu-se CORUPTIE."
        ]
      },
      {
        title: "15. Despre CONDUS NON-ROLEPLAY",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa mergi pe un drum offroad cu mai mult de 60km/h (Exceptie fiind atunci cand esti urmarit unde limita este de 100).",
          "- Este INTERZIS sa mergi pe un drum extreme-offroad cu mai mult de 60km/h indiferent de situatie.",
          "- Este INTERZIS sa mergi pe un drum offroad/extreme offroad fara un vehicul care sa permita acest lucru.",
          "- Este INTERZIS sa intrii in alte masini fara motiv.",
          "- Este INTERZIS sa faci pitstop la o viteza mai mare de 150km/h.",
          "- Este INTERZIS sa faci pitstop in Los Santos (se presupune ca sunt multe persoane si pot sa fie lovite in urma acestei manevre)",
          "- Este PERMIS sa faci pitstop doar cu anumite clase de masini (CLASA B,C,LOWRIDER,MAFIE,POLITIE).",
          "- Este PERMIS sa faci pitstop in oras doar in intervalul 00:00-6:00 (in acest interval nu exista mai nimeni pe strazi care sa fie ranit).",
          "PITSTOP: ESTE ATUNCI CAND INTRII IN SPATELE / LATERALUL UNEI MASINII PENTRU A O OPRII",
          "- Este INTERZIS sa aterizezi elicoptere altundeva inafara de Helipads (exceptie se face la elicopterele de medici/politie).",
          "- Este INTERZIS sa aterizezi avioane altundeva inafara de aeroporturile existente pe joc.",
          "- Este INTERZIS sa mergeti pe nisip cu orice vehicul inafara de ATV.",
          "- Este PERMIS sa faceti blocaje doar cu un vehicul valid pentru pitstop avand obligatia de a NU bloca tot drumul.",
          "- Este INTERZIS sa faceti blocaje pe autostrada ca civili / mafioti.",
          "- Este PERMIS sa mergeti prin canale/tunele doar cu un vehicul extreme offroad."
        ]
      },
      {
        title: "16. Actiuni ce implica Vehicule",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa te arunci cu masina in apa.",
          "- Este INTERZIS sa te arunci cu motorul in apa fara a avea costum de scafandru si set.",
          "- Este INTERZIS sa furi masini de medici/politie fara un motiv foarte bine intemeiat.",
          "- Este INTERZIS sa iti parchezi masina sau sa scoti alta in timpul unei urmariri.",
          "- Este INTERZIS sa te urci in masina unui player fara aprobarea acestuia.",
          "- Este INTERZIS sa obligi pe cineva sa piloteze / conduca spre cayo."
        ]
      },
      {
        title: "17. Roleplay-ul de Jefuit",
        pedeapsa: "",
        description: "",
        details: [
          "- Este PERMIS sa jefuiesti indiferent de numarul de ore (fiind server-ul la inceput, dam timp tuturor sa se stabileasca pe server, urmand ca minimul sa fie de 50 de ore).",
          "- Este PERMIS sa jefuiesti DOAR in intervalul 20:00-8:00 in Oras.",
          "- Este PERMIS sa jefuiesti DOAR in intervalul 18:00-12:00 pe Cayo.",
          "- Este OBLIGATORIU sa jefuiesti DOAR in zone rosii si raufamate cu exceptia afacerilor si bancomatelor",
          "- Este INTERZIS sa jefuiesti medici/politisti ON-DUTY.",
          "- Este INTERZIS sa jefuiesti persoane ce fac job legal.",
          "- Este PERMIS sa jefuiesti DOAR ceea ce persoana detine pe ea.",
          "- Este PERMIS sa jefuiesti orice tip de item INAFARA de cele care provin dintr-un JOB Legal.",
          "- Este INTERZIS sa jefuiesti bunuri care apartin echipamentului mafiilor oficiale daca nu aveti grad de mafie. Puteti pune persoana sa le arunce in schimb.",
          "- Este INTERZIS sa obligi persoana sa isi scoata alte masini / banii din banca / iteme dintr-un depozit.",
          "ATENTIE! Toate zonele nemarcare cu nicio culoare in LS sunt zone VERZI, iar zonele nemarcate cu nicio culoare inafara LS-ului sunt zone ROSII!",
          "Acordati atentie zonei in care jefuiti, intrucat daca jefuiti fix la limita unei zone rosii Roleplay-ul poate fi anulat in cazul in care se face Ticket, iar membrul staff considera ca asta este alegerea corespunzatoare"
        ]
      },
      {
        title: "18. Despre SCAM",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa dai scam la o suma mai mare de 5000$ in bunuri sau bani (indiferent daca intelegerea este de iteme ilegale).",
          "- Este INTERZIS sa pui o persoana sa lucreze pentru tine iar la final sa nu ii oferi ceea ce i-ai promis.",
          "- Este INTERZIS sa dai scam pe baza unui contract de cumparare / schimb intre masini / iteme legale / locuinte.",
          "- Este PERMIS sa dai scam daca persoana accepta sa dea banii separat fara un contract pentru masina.",
          "- Este INTERZIS sa nu platiti pentru serviciile ce vi se ofera contra cost."
        ]
      },
      {
        title: "19. ACTIUNI ILEGALE",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa tragi intr-o zona publica.",
          "- Este INTERZIS sa rapiti persoane din zona publica (exceptie se face doar daca sunteti deja in vehicul si amenintati persoana cu o arma).",
          "- Este INTERZIS sa rapiti persoane fara sa fiti cel putin 2 in masina.",
          "- Este PERMIS sa trageti pe autostrada doar daca actiunea a inceput dintr-o zona rosie.",
          "- Este INTERZIS sa furi masini in zone populate."
        ]
      },
      {
        title: "20. OSTATIC",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa luati ostatic fara sa fie ultima cale de scapare.",
          "- Este INTERZIS sa tineti pe cineva ostatic fara sa cereti ceva pe el mai mult de 1 ora.",
          "- Este INTERZIS sa cereti mai mult de 300.000$ pe un ostatic in bunuri sau bani. ATENTIE! Nu aveti voie sa cereti o suma de bani la politie.",
          "- Este INTERZIS sa cereti lucruri care sunt imposibile / exagerate.",
          "- Este OBLIGATORIU ca dupa o intelegere pe baza ostaticului sa va tineti de cuvant si sa nu fie o inselaciune la mijloc. Este valabil de ambele parti implicate.",
          "- Daca cerintele sunt refuzate in repetate randuri aveti dreptul de a ucide ostaticul. Daca respectivul are grad in mafie i se va acorda CK, iar daca este civil sau membrul unui departament PK."
        ]
      },
      {
        title: "21. REVENGE-KILL",
        pedeapsa: "",
        description: "",
        details: [
          "- Reprezinta momentul in care tu nu rolezi PK-ul, ducandu-te imediat dupa respawn sa omori pesoana care te-a ucis anterior pentru a te razbuna pe aceasta."
        ]
      },
      {
        title: "22. ROLEPLAY-SCARBOS",
        pedeapsa: "",
        description: "",
        details: [
          "- Abuzul sexual (violul, canibalismul, necrofilia, pedofilia) si alte tipuri de Roleplay dezgustator sunt permise pe server doar cu acordul OOC al ambelor parti implicate in actiune"
        ]
      },
      {
        title: "23. REGULI CARE IMPLICA CIVILII / MAFIILE DIRECT",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS ca mafiotii sa se implice pentru civili sau civilii pentru mafioti in conflictele / urmaririle cu politia. Exceptie este la Jaf si pe Cayo Perico.",
          "EXPLICATIE: PENTRU A SE EVITA SUPERIORITATEA NUMERICA DIN PARTEA MAFIOTILOR SI CIVILILOR."
        ]
      },
    ]
  },
  {
    id: "ooc",
    name: "Reguli OOC (Cap. 2)",
    icon: ShieldAlert,
    description: "Normele Out-Of-Character privind comportamentul comunitar, regulile tehnice, utilizarea bug-urilor și acumularea de sancțiuni.",
    rules: [
      
      {
        title: "24. SUFERINTE",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa faceti orice fel de suferinte precum 'Sunteti prea slabi', 'Cand vreodata sa ajungeti voi aici?', 'Picat 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30'."
        ]
      },
      {
        title: "25. POST-HUNT",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa 'vanati' playerii pentru a le face ticket la orice mica greseala.",
          "- Este PERMIS sa faci ticket unui player DOAR daca ai facut parte la roleplay-ul respectiv sau ai sesizat niste incalcari ale regulamentului considerabile.",
          "- Daca doriti sa faceti o reclamatie aveti maxim 24 de ore pentru a o depune."
        ]
      },
      {
        title: "26. ACUMULARE BAN-URI/WARN-URI",
        pedeapsa: "",
        description: "",
        details: [
          "- La suma de 3 warn-uri se acorda ban 7 zile.",
          "- La suma de 5 ban-uri temporare se acorda BAN PERMANENT.",
          "- La suma de 10 ban-uri temporare se acorda BAN PERMANENT FARA DREPT DE PLATA."
        ]
      },
      {
        title: "27. INJURII/JIGNIRI",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa injurati/jigniti OOC o persoana pe comunitate.",
          "- Este PERMIS sa injurati o persoana IC cu un motiv stabilit tot IC."
        ]
      },
      {
        title: "28. HACK",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa folositi orice forma de HACK pe server."
        ]
      },
      {
        title: "29. FOLOSIRE '/cara' ABUZIV",
        pedeapsa: "",
        description: "",
        details: [
          "- Este STRICT INTERZIS sa luati persoane pe sus cu ajutoru comenzii '/cara' sau orice alta comanda ce va permite acest lucru, fara ca tu sa fi avut orice interactiune cu persona respectiva."
        ]
      },
      {
        title: "30. AMENINTARI",
        pedeapsa: "",
        description: "",
        details: [
          "- Pretinderea ca detineti functii, ca aveti relatii cu membrii din staff-ul server-ului sau amenintari cu interventia membrilor staff-ului sunt strict interzise!"
        ]
      },
      {
        title: "31. ACTIUNI TERORISTE",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa faceti acest tip de Roleplay fara permisiunea unui Head Of Staff +.",
          "- Este responsabilitatea membrului Staff care a aprobat actiunea sa se asigure ca totul decurge fara incalcari ale regulamentului."
        ]
      },
      {
        title: "32. BAN-EVADE",
        pedeapsa: "",
        description: "",
        details: [
          "DEF: Este atunci cand un membru staff ti-a oferit o sanctiune pe comunitate iar tu intrii cu alt cont pentru a scapa de aceasta.",
          "- Este INTERZIS sa faceti orice forma de BAN-EVADE."
        ]
      },
      {
        title: "33. TROLL",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa faceti orice forma de troll.",
          "DEF: Este atunci cand nu doresti sa faci un roleplay sau nu esti capabil sa faci unul iar pe server ai scopul de a-ti bate joc de server/playeri si de a cauta atentie."
        ]
      },
      {
        title: "34. RECLAMA IC / OOC",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa faceti orice forma de reclama indiferent daca este pe chat-ul in-game, nume, etc."
        ]
      },
      {
        title: "35. BUG-ABUSE",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa abuzati de un bug pe care l-ati gasit pe server pentru a va aduce avantaje indiferent daca este legat de joburi, arme, etc.",
          "- Sunteti OBLIGATI sa raportati bug-ul intr-un ticket pe discord.",
          "ATENTIE: se poate sanctiona cu CK daca in urma exploatarii acestuia s-au produs cresteri materiale anormale!"
        ]
      },
      {
        title: "36. TRANZACTII OOC",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa faceti tranzactii OOC.",
          "DEF: Este atunci cand oferi bunuri IC precum case, masini, bani, arme, etc. pe alte beneficii OOC precum bani reali si alte lucruri."
        ]
      },
      {
        title: "37. DISCONNECT IN ROLEPLAY",
        pedeapsa: "",
        description: "",
        details: [
          "- Este INTERZIS sa va deconectati de pe server in timp ce sunteti implicati intr-o actiune Roleplay."
        ]
      },
      {
        title: "38. Reguli in timpul folosirii armelor de foc",
        pedeapsa: "",
        description: "",
        details: [
          "- Sunteti OBLIGATI sa aveti o filmare in timp ce POSEDATI orice arma de foc, pentru confirmarea integritatii corectitudinii a actiunii. TREBUIE PREZENTATA DE CATE ORI VI SE CERE!",
          "- Dovezile trebuie pastrate minim 24 de ore dupa incheierea interactiunii Roleplay."
        ]
      },
      {
        title: "39. ASCUNDERE DOVEZI",
        pedeapsa: "",
        description: "",
        details: [
          "- Aceasta regula reprezinta momentul in care un jucator refuza sa prezinte dovezile solicitate pentru a confirma faptul ca acesta nu a incalcat regulamentul serverului."
        ]
      },
      {
        title: "40. ACCOUNT SHARING",
        pedeapsa: "",
        description: "",
        details: [
          "- Reprezinta momentul in care orice jucator intra cu alt cont decat cel cu care s-a jucat pana acum pe server, ceea ce este total interzis in orice scop."
        ]
      },
      {
        title: "41. COMPORTAMENT CU FETELE",
        pedeapsa: "",
        description: "",
        details: [
          "- Comportamentul cu fetele trebuie sa fie unul adecvat mai exact nu aveti voie sa hartuiti fetele pe server.",
          "- Exista totusi situatii in care va este permis acest lucru intr-o oarecare masura, respectiv va stiti cu fata de mult timp sau va provoaca prima."
        ]
      },
      {
        title: "42. AFK / REFUZ ROLEPLAY",
        pedeapsa: "",
        description: "",
        details: [
          "- Aceasta regula reprezinta momentul in care cineva sta AFK pe joc si atunci cand cineva refuza sa intretina actiuni Roleplay cu un alt jucator, mai pe intelesul tuturor se preface ca nu aude si nu vede nimic."
        ]
      },
      {
        title: "43. DESPRE BUNELE MANIERE",
        pedeapsa: "",
        description: "",
        details: [
          "- Atunci cand se formeaza cozi in diverse locuri, din varii motive, acestea trebuiesc respectate fara a creea haos."
        ]
      },
      {
        title: "44. MULTIPLE ACCOUNTS",
        pedeapsa: "",
        description: "",
        details: [
          "- Reprezinta momentul in care orice jucator poseda mai mult de un cont pe server-ul Flow, ceea ce este STRICT INTERZIS."
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
    content: "Fiecare jucător are dreptul la primirea informațiilor necesare din partea echipei administrative.\n\nÎn cazul în care un jucător consideră că informația / decizia luată de către membrul staff curent este nepotrivită, poate solicita intervenția unui grad superior."
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
                              

                              {/* Rule details list */}
                              <div className="space-y-3 pt-2">
                                {rule.details.map((detail, dIdx) => {
                                  if (detail.startsWith("ATENTIE!")) {
                                    return (
                                      <div key={dIdx} className="flex flex-col gap-4 mt-6 glass border-amber-500/20 bg-amber-500/5 rounded-xl p-5 shadow-lg">
                                        <div className="flex items-start gap-3">
                                          <p className="text-xs md:text-sm text-amber-400 leading-relaxed font-bold whitespace-pre-line font-sans">
                                            ⚠️ {detail}
                                          </p>
                                        </div>
                                        <div className="relative rounded-lg overflow-hidden border border-white/10 mt-4">
                                          <img src="/harta-zone.png" alt="Harta Zone Jaf" className="w-full h-auto object-cover" />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  if (detail.startsWith("Acordati atentie")) {
                                    return (
                                      <div key={dIdx} className="flex items-start gap-3 glass border-rose-500/20 bg-rose-500/5 rounded-xl p-5 mt-2 shadow-lg">
                                        <p className="text-xs md:text-sm text-rose-300 leading-relaxed font-semibold whitespace-pre-line font-sans">
                                          🚨 {detail}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div key={dIdx} className="flex items-start gap-3">
                                      <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
                                        {detail}
                                      </p>
                                    </div>
                                  );
                                })}
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
