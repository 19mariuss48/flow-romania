import { Compass, ShieldAlert } from "lucide-react";

export const regulamenteData = [
  {
    "id": "gameplay",
    "name": "Reguli Gameplay (Cap. 1)",
    "icon": Compass,
    "description": "Normele oficiale legate de comportamentul \u00een joc, mecanicile de Roleplay, interac\u021biuni \u0219i limite administrative.",
    "rules": [
      {
        "title": "1. Nu faceti META-GAMING [MG]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand folosesti informatiile OOC in scopuri/situatii IC.",
          "EX: Ma uit le live-ul unui youtuber si observ ca este la casa Nr. 25 din vinewood si mai apoi merg si eu acolo sa apar pe live."
        ]
      },
      {
        "title": "2. Nu faceti POWER-GAMING [PG]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand faci un roleplay mult prea exagerat care in viata reala nu se poate realiza sau atunci cand nu oferi sanse egale celorlalti participanti la roleplay.",
          "EX: Anulezi 'animatiile' la trusa, adrenalina, bandaj etc."
        ]
      },
      {
        "title": "3. Nu faceti MIXING [MX]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand transmiti informatii IC-OOC, mai simplu, atunci cand spui lucruri IC pe un chat OOC si invers.",
          "EX: Ii spui unui prieten pe discord ca ii vinzi o masina.",
          "EX: Deschiderea/Vorbitul OOC in IC"
        ]
      },
      {
        "title": "4. Nu faceti RANDOM DEATHMATCH [RDM]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand omori pe cineva fara un motiv Roleplay bine intemeiat.",
          "EX: Vezi o persoana pe strada iar tu o omori pentru ca nu iti place cum e imbracata."
        ]
      },
      {
        "title": "5. Nu faceti VEHICLE DEATHMATCH [VDM]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand calci pe cineva cu masina intentionat fara un motiv Roleplay bine intemeiat. (Este permisa calcarea cuiva cu masina ca ultima cale de scapare)",
          "EX: Vezi o persoana pe strada iar tu o calci cu masina."
        ]
      },
      {
        "title": "6. Despre CHARACTER-KILL [CK]",
        "pedeapsa": "",
        "description": "",
        "details": [
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
        "title": "7. Despre PLAYER-KILL [PK]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand iti primesti respawn si ajungi la spital. Dupa PK, esti nevoit sa uiti informatiile din roleplayul precedent."
        ]
      },
      {
        "title": "8. Nu faceti OLYMPIC SWIM [OS]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand inoti o distanta foarte mare fara sa obosesti.",
          "- Este PERMIS sa innoti perioade lungi DOAR daca esti echipat cu un costum de scafandru.",
          "- Este INTERZIS sa te arunci in apa pentru a scapa de anumite persoane ce te urmaresc fara a avea un costum de scafandru."
        ]
      },
      {
        "title": "9. Nu faceti NO-FEAR [NF]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand nu simulezi frica in situatii in care ar trebui sa iti fie.",
          "EX: Un player indreapta arma spre tine iar tu incepi sa dai cu pumnii in el."
        ]
      },
      {
        "title": "10. Nu faceti COP-FEAR [CF]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Reprezinta momentul in care nu simulezi frica fata de politisti.",
          "EX: Incepi sa iei la misto politistii ca te plictisesti, sau ii atragi sa te urmareasca unde se considera cop-bait."
        ]
      },
      {
        "title": "11. Nu faceti ROB AND KILL [RK]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand jefuiesti un player si apoi il omori. ATENTIE! Statia si telefonul nu se iau in considerare!"
        ]
      },
      {
        "title": "12. Nu faceti DROP AND KILL [DK]",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand pui un player sa arunce iteme si apoi il omori. ATENTIE! Statia si telefonul nu se iau in considerare!"
        ]
      },
      {
        "title": "13. Nu fiti Bombardieri",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand te comporti neadecvat, injosind diversi playeri fara motiv.",
          "- Atunci cand injuri oameni pe strada fara motiv.",
          "- Atunci cand te comporti urat cu un player doar pentru ca are o masina mai ieftina ca a ta."
        ]
      },
      {
        "title": "14. Reguli privind Joburile si Departamentele",
        "pedeapsa": "",
        "description": "",
        "details": [
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
        "title": "15. Despre CONDUS NON-ROLEPLAY",
        "pedeapsa": "",
        "description": "",
        "details": [
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
        "title": "16. Actiuni ce implica Vehicule",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa te arunci cu masina in apa.",
          "- Este INTERZIS sa te arunci cu motorul in apa fara a avea costum de scafandru si set.",
          "- Este INTERZIS sa furi masini de medici/politie fara un motiv foarte bine intemeiat.",
          "- Este INTERZIS sa iti parchezi masina sau sa scoti alta in timpul unei urmariri.",
          "- Este INTERZIS sa te urci in masina unui player fara aprobarea acestuia.",
          "- Este INTERZIS sa obligi pe cineva sa piloteze / conduca spre cayo."
        ]
      },
      {
        "title": "17. Roleplay-ul de Jefuit",
        "pedeapsa": "",
        "description": "",
        "details": [
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
        "title": "18. Despre SCAM",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa dai scam la o suma mai mare de 5000$ in bunuri sau bani (indiferent daca intelegerea este de iteme ilegale).",
          "- Este INTERZIS sa pui o persoana sa lucreze pentru tine iar la final sa nu ii oferi ceea ce i-ai promis.",
          "- Este INTERZIS sa dai scam pe baza unui contract de cumparare / schimb intre masini / iteme legale / locuinte.",
          "- Este PERMIS sa dai scam daca persoana accepta sa dea banii separat fara un contract pentru masina.",
          "- Este INTERZIS sa nu platiti pentru serviciile ce vi se ofera contra cost."
        ]
      },
      {
        "title": "19. ACTIUNI ILEGALE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa tragi intr-o zona publica.",
          "- Este INTERZIS sa rapiti persoane din zona publica (exceptie se face doar daca sunteti deja in vehicul si amenintati persoana cu o arma).",
          "- Este INTERZIS sa rapiti persoane fara sa fiti cel putin 2 in masina.",
          "- Este PERMIS sa trageti pe autostrada doar daca actiunea a inceput dintr-o zona rosie.",
          "- Este INTERZIS sa furi masini in zone populate."
        ]
      },
      {
        "title": "20. OSTATIC",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa luati ostatic fara sa fie ultima cale de scapare.",
          "- Este INTERZIS sa tineti pe cineva ostatic fara sa cereti ceva pe el mai mult de 1 ora.",
          "- Este INTERZIS sa cereti mai mult de 300.000$ pe un ostatic in bunuri sau bani. ATENTIE! Nu aveti voie sa cereti o suma de bani la politie.",
          "- Este INTERZIS sa cereti lucruri care sunt imposibile / exagerate.",
          "- Este OBLIGATORIU ca dupa o intelegere pe baza ostaticului sa va tineti de cuvant si sa nu fie o inselaciune la mijloc. Este valabil de ambele parti implicate.",
          "- Daca cerintele sunt refuzate in repetate randuri aveti dreptul de a ucide ostaticul. Daca respectivul are grad in mafie i se va acorda CK, iar daca este civil sau membrul unui departament PK."
        ]
      },
      {
        "title": "21. REVENGE-KILL",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Reprezinta momentul in care tu nu rolezi PK-ul, ducandu-te imediat dupa respawn sa omori pesoana care te-a ucis anterior pentru a te razbuna pe aceasta."
        ]
      },
      {
        "title": "22. ROLEPLAY-SCARBOS",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Abuzul sexual (violul, canibalismul, necrofilia, pedofilia) si alte tipuri de Roleplay dezgustator sunt permise pe server doar cu acordul OOC al ambelor parti implicate in actiune"
        ]
      },
      {
        "title": "23. REGULI CARE IMPLICA CIVILII / MAFIILE DIRECT",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS ca mafiotii sa se implice pentru civili sau civilii pentru mafioti in conflictele / urmaririle cu politia. Exceptie este la Jaf si pe Cayo Perico.",
          "EXPLICATIE: PENTRU A SE EVITA SUPERIORITATEA NUMERICA DIN PARTEA MAFIOTILOR SI CIVILILOR."
        ]
      }
    ]
  },
  {
    "id": "ooc",
    "name": "Reguli Ooc (Cap. 2)",
    "icon": ShieldAlert,
    "description": "Normele Out-Of-Character privind comportamentul comunitar, regulile tehnice, utilizarea bug-urilor \u0219i acumularea de sanc\u021biuni.",
    "rules": [
      {
        "title": "24. SUFERINTE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa faceti orice fel de suferinte precum 'Sunteti prea slabi', 'Cand vreodata sa ajungeti voi aici?', 'Picat 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30'."
        ]
      },
      {
        "title": "25. POST-HUNT",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa 'vanati' playerii pentru a le face ticket la orice mica greseala.",
          "- Este PERMIS sa faci ticket unui player DOAR daca ai facut parte la roleplay-ul respectiv sau ai sesizat niste incalcari ale regulamentului considerabile.",
          "- Daca doriti sa faceti o reclamatie aveti maxim 24 de ore pentru a o depune."
        ]
      },
      {
        "title": "26. ACUMULARE BAN-URI/WARN-URI",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- La suma de 3 warn-uri se acorda ban 7 zile.",
          "- La suma de 5 ban-uri temporare se acorda BAN PERMANENT.",
          "- La suma de 10 ban-uri temporare se acorda BAN PERMANENT FARA DREPT DE PLATA."
        ]
      },
      {
        "title": "27. INJURII/JIGNIRI",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa injurati/jigniti OOC o persoana pe comunitate.",
          "- Este PERMIS sa injurati o persoana IC cu un motiv stabilit tot IC."
        ]
      },
      {
        "title": "28. HACK",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa folositi orice forma de HACK pe server."
        ]
      },
      {
        "title": "29. FOLOSIRE '/cara' ABUZIV",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este STRICT INTERZIS sa luati persoane pe sus cu ajutoru comenzii '/cara' sau orice alta comanda ce va permite acest lucru, fara ca tu sa fi avut orice interactiune cu persona respectiva."
        ]
      },
      {
        "title": "30. AMENINTARI",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Pretinderea ca detineti functii, ca aveti relatii cu membrii din staff-ul server-ului sau amenintari cu interventia membrilor staff-ului sunt strict interzise!"
        ]
      },
      {
        "title": "31. ACTIUNI TERORISTE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa faceti acest tip de Roleplay fara permisiunea unui Head Of Staff +.",
          "- Este responsabilitatea membrului Staff care a aprobat actiunea sa se asigure ca totul decurge fara incalcari ale regulamentului."
        ]
      },
      {
        "title": "32. BAN-EVADE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "DEF: Este atunci cand un membru staff ti-a oferit o sanctiune pe comunitate iar tu intrii cu alt cont pentru a scapa de aceasta.",
          "- Este INTERZIS sa faceti orice forma de BAN-EVADE."
        ]
      },
      {
        "title": "33. TROLL",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa faceti orice forma de troll.",
          "DEF: Este atunci cand nu doresti sa faci un roleplay sau nu esti capabil sa faci unul iar pe server ai scopul de a-ti bate joc de server/playeri si de a cauta atentie."
        ]
      },
      {
        "title": "34. RECLAMA IC / OOC",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa faceti orice forma de reclama indiferent daca este pe chat-ul in-game, nume, etc."
        ]
      },
      {
        "title": "35. BUG-ABUSE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa abuzati de un bug pe care l-ati gasit pe server pentru a va aduce avantaje indiferent daca este legat de joburi, arme, etc.",
          "- Sunteti OBLIGATI sa raportati bug-ul intr-un ticket pe discord.",
          "ATENTIE: se poate sanctiona cu CK daca in urma exploatarii acestuia s-au produs cresteri materiale anormale!"
        ]
      },
      {
        "title": "36. TRANZACTII OOC",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa faceti tranzactii OOC.",
          "DEF: Este atunci cand oferi bunuri IC precum case, masini, bani, arme, etc. pe alte beneficii OOC precum bani reali si alte lucruri."
        ]
      },
      {
        "title": "37. DISCONNECT IN ROLEPLAY",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Este INTERZIS sa va deconectati de pe server in timp ce sunteti implicati intr-o actiune Roleplay."
        ]
      },
      {
        "title": "38. Reguli in timpul folosirii armelor de foc",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Sunteti OBLIGATI sa aveti o filmare in timp ce POSEDATI orice arma de foc, pentru confirmarea integritatii corectitudinii a actiunii. TREBUIE PREZENTATA DE CATE ORI VI SE CERE!",
          "- Dovezile trebuie pastrate minim 24 de ore dupa incheierea interactiunii Roleplay."
        ]
      },
      {
        "title": "39. ASCUNDERE DOVEZI",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Aceasta regula reprezinta momentul in care un jucator refuza sa prezinte dovezile solicitate pentru a confirma faptul ca acesta nu a incalcat regulamentul serverului."
        ]
      },
      {
        "title": "40. ACCOUNT SHARING",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Reprezinta momentul in care orice jucator intra cu alt cont decat cel cu care s-a jucat pana acum pe server, ceea ce este total interzis in orice scop."
        ]
      },
      {
        "title": "41. COMPORTAMENT CU FETELE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Comportamentul cu fetele trebuie sa fie unul adecvat mai exact nu aveti voie sa hartuiti fetele pe server.",
          "- Exista totusi situatii in care va este permis acest lucru intr-o oarecare masura, respectiv va stiti cu fata de mult timp sau va provoaca prima."
        ]
      },
      {
        "title": "42. AFK / REFUZ ROLEPLAY",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Aceasta regula reprezinta momentul in care cineva sta AFK pe joc si atunci cand cineva refuza sa intretina actiuni Roleplay cu un alt jucator, mai pe intelesul tuturor se preface ca nu aude si nu vede nimic."
        ]
      },
      {
        "title": "43. DESPRE BUNELE MANIERE",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Atunci cand se formeaza cozi in diverse locuri, din varii motive, acestea trebuiesc respectate fara a creea haos."
        ]
      },
      {
        "title": "44. MULTIPLE ACCOUNTS",
        "pedeapsa": "",
        "description": "",
        "details": [
          "- Reprezinta momentul in care orice jucator poseda mai mult de un cont pe server-ul Flow, ceea ce este STRICT INTERZIS."
        ]
      }
    ]
  }
];

export const termeniData = [
  {
    "title": "1. Introducere",
    "content": "Fiecare jucator care se conecteaza la server este total de acord cu termenii si conditiile impuse iar orice abatere duce la interzicerea accesului definitiv pe comunitate."
  },
  {
    "title": "2. Acceptarea regulamentului intern",
    "content": "Fiecare jucator declara ca a luat la cunostinta toate prevederile care apartin regulamentului intern.\n\nNerespectarea regulamentului atrage raspunderea pe cont propriu al jucatorului si poate duce la aplicarea de sanctiuni de tip avertismente, restrictionarea provizorie si chiar permanenta.\n\nDezvoltatorii pot actualiza regulamentul periodic iar modificarile sunt anuntate pe server-ul de Discord. Este datoria fiecarui jucator sa verifice anunturile des pentru a fi la curent cu noile modificari."
  },
  {
    "title": "3. Accesarea server-ului",
    "content": "Accesarea server-ului este permisa tuturor jucatorilor in orice moment in care acesta este online si nu intampina o mentenanta (cand modul whitelist este activ).\n\nExista momente in care server-ul se poate restrictiona provizoriu jucatorilor noi datorita deficitului de personal in acel moment.\n\nPersonalul server-ului nu este responsabil pentru defectiuniile prezente datorita platformei CFX."
  },
  {
    "title": "4. Monitorizarea si inregistrarea activitatii",
    "content": "Toate actiuniile jucatorilor realizate pe server sunt monitorizate si inregistrate sub forma de log-uri.\n\nEchipa administrativa isi rezerva dreptul de a accesa si utiliza aceste inregistrari in orice moment, in scopul verificarii activitatii jucatorilor si al stabilirii eventualelor abateri de la regulament."
  },
  {
    "title": "5. Ascundere dovezi / informatii",
    "content": "Orice jucator este obligat sa prezinte informatiile si doveziile cerute de catre echipa administrativa in orice moment.\n\nDovezile trebuie pastrate cel putin 24H."
  },
  {
    "title": "6. Limitarea raspunderii",
    "content": "Utilizarea server-ului se realizeaza pe propria raspundere a jucatorului.\n\nEchipa administrativa si Dezvoltatorii nu sunt responsabili pentru eventuale probleme de sanatate fizica sau psihica aparute in urma utilizarii server-ului."
  },
  {
    "title": "7. Informatii cu privire la achizitii",
    "content": "Fiecare achizitie efectuata de catre un jucator este voluntara si nerambursabila.\n\nComunitatea Flow nu se ocupa direct cu procesarea platilor, acestea se efectueaza doar pe platforma externa TEBEX."
  },
  {
    "title": "8. Dreptul la informatie si asistenta superioara",
    "content": "Fiecare jucator are dreptul la primirea informatiilor necesare din partea echipei administrative.\n\nIn cazul in care un jucator considera ca informatia / decizia luata de catre administratorul curent este nepotrivita, poate solicita interventia unui grad superior."
  },
  {
    "title": "9. Verificarea integritatii sistemului",
    "content": "Pentru a asigura integritatea corectitudinii jucatorilor, echipa administrativa isi rezerva dreptul de a verifica si de a confirma ca un sistem nu prezinta programe interzise.\n\nOrice tool / hack / program care aduce avantaje neautorizate fata de ceilalti jucatori este interzis.\n\nOrice abatere este considerata ascundere dovezi si informatii."
  }
];

export const jafuriData = {
  "tipuri": [
    {
      "name": "Jafuri de tip Heist",
      "items": [
        "Flecca Heist",
        "Paleto Heist",
        "Humane Labs",
        "Pacific Heist",
        "Casino Heist"
      ]
    },
    {
      "name": "Jafuri independente",
      "items": [
        "Bijuterie",
        "Union Heist"
      ]
    },
    {
      "name": "Rapire",
      "items": [
        "Ac\u021biune de Rapire (Jaf persoane)"
      ]
    }
  ],
  "informatii": [
    "O organizatie poate da un singur jaf care face parte din categoria Heist odata la 24H.",
    "Jafurile independente au cooldown propriu, astfel incat fiecare jaf independent poate fi dat de o organziatie odata la 24H.",
    "Rapirea este singurul jaf care nu are cooldown."
  ],
  "participanti": [
    {
      "jaf": "Rapire",
      "min": 4,
      "max": 8
    },
    {
      "jaf": "Bijuterie",
      "min": 4,
      "max": 12
    },
    {
      "jaf": "Union Heist",
      "min": 4,
      "max": 12
    },
    {
      "jaf": "Flecca Heist",
      "min": 6,
      "max": 16
    },
    {
      "jaf": "Paleto Heist",
      "min": 6,
      "max": 16
    },
    {
      "jaf": "Humane Labs",
      "min": 8,
      "max": 18
    },
    {
      "jaf": "Pacific Heist",
      "min": 8,
      "max": 18
    },
    {
      "jaf": "Underground Heist",
      "min": 10,
      "max": 20
    },
    {
      "jaf": "Casino Heist",
      "min": 10,
      "max": 20
    }
  ],
  "reguli": [
    "Este INTERZIS sa aruncati orice tip de explozibil la baza / pe acoperisul cladiriilor sau inauntru lor.",
    "Este INTERZIS sa blocati caile de acces atat inauntru cladirii, cat si in incinta acesteia.",
    "Este INTERZIS sa aveti mai mult de 8 PIPEBOMB-uri / STICKYBOMB-uri per membrii implicati.",
    "Este INTERZIS sa luati OSTATIC, indiferent daca actiunea s-a mutat in alta locatie.",
    "Este OBLIGATORIU sa respectati coada.",
    "Este OBLIGATORIU sa respectati cooldown-ul.",
    "Este OBLIGATORIU sa respectati numarul de participanti."
  ]
};
