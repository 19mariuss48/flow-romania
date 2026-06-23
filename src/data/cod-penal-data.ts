export type LawArticle = { id: string; category: string; categoryLabel: string; title: string; description: string; amenda: string; inchisoare: string; };

export const articlesData: LawArticle[] = [
  {
    "id": "(1)01",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Vatamare corporala",
    "description": "Vatamarea corporala este fapta prin care o persoana produce alteia o leziune sau afectare a sanatatii ori integritatii corporale. Gravitatea se stabileste in functie de consecintele produse asupra victimei.",
    "amenda": "1.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(1)02",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Vatamare corporala grava",
    "description": "Vatamarea corporala grava este fapta prin care o persoana produce alteia o leziune severa sau afectare grava. Gravitatea rezulta din consecinte serioase asupra victimei.",
    "amenda": "3.000$",
    "inchisoare": "80 minute"
  },
  {
    "id": "(1)03",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Asalt",
    "description": "Asaltul este fapta prin care o persoana agreseaza fizic alta persoana sau ii ameninta integritatea. Scopul poate fi vatamarea sau intimidarea victimei.",
    "amenda": "1.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(1)04",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Rapire",
    "description": "Rapirea este fapta prin care o persoana ia sau retine alta persoana fara consimtamantul acesteia. Scopul poate fi santaj, constrangere sau obtinerea unui folos.",
    "amenda": "2.000$",
    "inchisoare": "90 minute"
  },
  {
    "id": "(1)05",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Tortura",
    "description": "Tortura este fapta prin care o persoana provoaca altuia dureri fizice sau suferinte psihice intense. Scopul poate fi pedepsirea, intimidarea sau obtinerea de informatii.",
    "amenda": "3.500$",
    "inchisoare": "120 minute"
  },
  {
    "id": "(1)06",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Tentativa de omor",
    "description": "Tentativa de omor este fapta prin care o persoana incearca sa omoare alta persoana, dar nu reuseste. Intenta si actiunile dovedesc vointa de a cauza moartea victimei.",
    "amenda": "2.500$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(1)07",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Ucidere din culpa",
    "description": "Ucidere din culpa este fapta prin care o persoana cauzeaza moartea altei persoane din neglijenta sau imprudenta, fara intentie.",
    "amenda": "2.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(1)08",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Crima",
    "description": "Crima este fapta prin care o persoana ucide cu intentie alta persoana. Aceasta implica vointa clara de a provoca moartea victimei.",
    "amenda": "4.000$",
    "inchisoare": "120 minute"
  },
  {
    "id": "(1)09",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Terorism",
    "description": "Terorismul este fapta prin care o persoana sau un grup comite acte violente pentru a provoca teroare in randul populatiei sau a forta autoritatile sa actioneze.",
    "amenda": "10.000$",
    "inchisoare": "150 minute"
  },
  {
    "id": "(1)10",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Amenintari",
    "description": "Amenintarile sunt fapte prin care o persoana isi manifesta intentia de a provoca rau altei persoane. Scopul poate fi intimidarea sau constrangerea victimei.",
    "amenda": "1.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(1)11",
    "category": "contra-persoanei",
    "categoryLabel": "Contra Persoanelor",
    "title": "Santaj",
    "description": "Santajul este fapta prin care o persoana constrange alta persoana sa faca sau sa nu faca ceva, amenintand cu divulgarea unor informatii sau alte prejudicii. Scopul este obtinerea unui folos sau avantaj.",
    "amenda": "500$",
    "inchisoare": "30 minute"
  },
  {
    "id": "(2)01",
    "category": "ordine-publica",
    "categoryLabel": "Ordinea Publica",
    "title": "Perturbarea ordinii si linistii publice",
    "description": "Perturbarea ordinii si linistii publice este fapta prin care o persoana tulbura linistea comunitatii prin zgomot, scandal sau comportament agresiv.",
    "amenda": "1.000$",
    "inchisoare": "25 minute"
  },
  {
    "id": "(2)02",
    "category": "ordine-publica",
    "categoryLabel": "Ordinea Publica",
    "title": "Esecul de a parasii un loc",
    "description": "Esecul de a parasi un loc este fapta prin care o persoana refuza sau intarzie sa plece de la un loc unde prezenta sa este interzisa sau deranjanta. Aceasta poate provoca tulburari sau pericol pentru altii.",
    "amenda": "500$",
    "inchisoare": "15 minute"
  },
  {
    "id": "(2)03",
    "category": "ordine-publica",
    "categoryLabel": "Ordinea Publica",
    "title": "Esecul de a parasii o institutie a statului",
    "description": "Esecul de a parasi o institutie a statului este fapta prin care o persoana refuza sau intarzie sa paraseasca cladirea unei institutii publice atunci cand i se solicita.",
    "amenda": "1.500$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(2)04",
    "category": "ordine-publica",
    "categoryLabel": "Ordinea Publica",
    "title": "Nuditatea",
    "description": "Nuditatea este expunerea corpului in public intr-un mod indecent sau ofensator. Scopul poate fi provocarea, ofensarea sau tulburarea ordinii publice.",
    "amenda": "3.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(3)01",
    "category": "convietuire-sociala",
    "categoryLabel": "Convietuire Sociala",
    "title": "Limbaj vulgar",
    "description": "Limbajul vulgar este folosirea de cuvinte obscene sau injurioase in public.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(3)02",
    "category": "convietuire-sociala",
    "categoryLabel": "Convietuire Sociala",
    "title": "Denigrarea",
    "description": "Denigrarea este fapta prin care o persoana raspandeste informatii false sau jignitoare despre alta persoana. Scopul este afectarea reputatiei sau prestigiului victimei.",
    "amenda": "500$",
    "inchisoare": "10 minute"
  },
  {
    "id": "(3)03",
    "category": "convietuire-sociala",
    "categoryLabel": "Convietuire Sociala",
    "title": "Calomnia",
    "description": "Calomnia este fapta prin care o persoana raspandeste in mod intentionat minciuni despre alta persoana, acuzand-o de fapte ilegale. Scopul este de a-i prejudicia reputatia sau imaginea.",
    "amenda": "500$",
    "inchisoare": "15 minute"
  },
  {
    "id": "(3)04",
    "category": "convietuire-sociala",
    "categoryLabel": "Convietuire Sociala",
    "title": "Instigarea la ura",
    "description": "Instigarea la ura este fapta prin care o persoana indeamna sau provoaca altii sa urasca, discrimineze sau violeze pe cineva din cauza rasei, religiei, nationalitatii sau altor criterii.",
    "amenda": "1.000$",
    "inchisoare": "20 minute"
  },
  {
    "id": "(3)05",
    "category": "convietuire-sociala",
    "categoryLabel": "Convietuire Sociala",
    "title": "Instigarea la suicid",
    "description": "Instigarea la suicid este fapta prin care o persoana determina sau incurajeaza alta persoana sa isi ia viata. Scopul poate fi controlarea, manipularea sau provocarea victimei. - Daca ati comis mai multe infractiuni din acest capitol, se va aplica pedeapsa corespunzatoare celei mai grave dintre ele. Totusi, ofiterul responsabil va comunica toate faptele savarsite.",
    "amenda": "2.500$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(4)01",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Acoperirea fetei",
    "description": "Acoperirea fetei este fapta prin care o persoana isi ascunde chipul in public, pentru a-si impiedica identificarea. Scopul poate fi comiterea de infractiuni sau evitarea controlului autoritatilor.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(4)02",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Jocuri de noroc",
    "description": "Jocurile de noroc in public sunt activitati in care o persoana pariaza bani sau bunuri intr-un loc accesibil publicului.",
    "amenda": "75.000$",
    "inchisoare": "-"
  },
  {
    "id": "(4)03",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Prostitutie",
    "description": "Prostitutia este activitatea prin care o persoana ofera servicii sexuale contra cost. Scopul este obtinerea unui beneficiu material sau financiar.",
    "amenda": "10.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(4)04",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Viol",
    "description": "Violul este fapta prin care o persoana constrange alta persoana sa intrețină acte sexuale prin violență, amenințare sau lipsă de consimțământ",
    "amenda": "25.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(4)05",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Urmarirea unei persoane fara aprobare / imputernicire",
    "description": "Urmarirea unei persoane fara aprobare este fapta prin care cineva insista sau urmareste alta persoana fara consimtamantul acesteia. Scopul poate fi intimidarea, hartuirea sau controlul victimei.",
    "amenda": "1.000$",
    "inchisoare": "35 minute"
  },
  {
    "id": "(4)06",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Urmarirea unei autospeciale fara aprobare / imputernicire",
    "description": "Urmarirea unei autospeciale fara aprobare este fapta prin care o persoana urmareste sau insoteste ilegal o autospeciala a autoritatilor.",
    "amenda": "1.500$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(4)07",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Fapte de Proxenetism",
    "description": "Faptele de proxenetism sunt actiuni prin care o persoana faciliteaza sau promoveaza prostitutia altcuiva pentru a obtine un beneficiu. Scopul este castigul financiar sau material prin exploatarea altor persoane.",
    "amenda": "50.000$",
    "inchisoare": "400 minute"
  },
  {
    "id": "(4)08",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Uz de substante ilegale",
    "description": "Uzul de substante ilegale este fapta prin care o persoana consuma droguri sau alte substante interzise de lege. Scopul poate fi obtinerea de efecte psihoactive sau recreative.",
    "amenda": "4.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(4)09",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Complicitate la o fapta penala",
    "description": "Complicitatea la o fapta penala este fapta prin care o persoana ajuta, incurajeaza sau sprijina pe altcineva sa comita o infractiune. Scopul este facilitarea savarsirii faptei de catre autorul principal.",
    "amenda": "1.000$",
    "inchisoare": "1/2 din sentinta principalului inculpat"
  },
  {
    "id": "(4)10",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Producerea sau detinerea de substante ilegale",
    "description": "Producerea sau detinerea de substante ilegale este fapta prin care o persoana fabrica sau pastreaza droguri sau alte substante interzise de lege. Scopul poate fi consumul personal, vanzarea sau distribuirea acestora.",
    "amenda": "7.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(4)11",
    "category": "moralitate-publica",
    "categoryLabel": "Moralitate Publica",
    "title": "Testosteron",
    "description": "Testosteronul, ca substanta controlata, este considerat ilegal daca este detinut sau folosit fara prescriptie medicala. - Daca ati comis mai multe infractiuni din acest capitol, se va aplica pedeapsa corespunzatoare celei mai grave dintre ele. Totusi, ofiterul responsabil va comunica toate faptele savarsite.",
    "amenda": "4.000$",
    "inchisoare": "30 minute"
  },
  {
    "id": "(5)01",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Furt Auto",
    "description": "Furtul auto este fapta prin care o persoana ia un vehicul fara consimtamantul proprietarului. Scopul este obtinerea ilegala a autoturismului sau a unui beneficiu material.",
    "amenda": "2.000$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(5)02",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Furt Autospeciale",
    "description": "Furtul autospecialelor este fapta prin care o persoana ia o autospeciala a autoritatilor fara consimtamant. Scopul este obtinerea ilegala a vehiculului sau obstructionarea activitatii institutiilor.",
    "amenda": "2.500$",
    "inchisoare": "45 minute"
  },
  {
    "id": "(5)03",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Vandalism",
    "description": "Vandalismul este fapta prin care o persoana distruge, deterioreaza sau modifica fara permisiune bunuri apartinand altora. Scopul poate fi provocarea de pagube, intimidarea sau exprimarea unui mesaj",
    "amenda": "1.000$",
    "inchisoare": "30 minute"
  },
  {
    "id": "(5)04",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Furt",
    "description": "Furtul este fapta prin care o persoana ia fara drept si pe ascuns bunuri apartinand altei persoane. Scopul este obtinerea unui beneficiu material sau castig patrimonial.",
    "amenda": "1.500$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(5)05",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Furt de Carduri Bancare",
    "description": "Furtul de carduri bancare este fapta prin care o persoana obtine sau foloseste ilegal cardul unei alte persoane.",
    "amenda": "2.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(5)06",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Jaf (Talharie)",
    "description": "Jaful este fapta prin care o persoana ia bunuri de la alta persoana folosind violenta sau amenintari. Scopul este obtinerea ilegala a unui beneficiu material.",
    "amenda": "4.000$",
    "inchisoare": "120 minute"
  },
  {
    "id": "(5)07",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Jaf Banca / Bijuterie / Casino / Depozit",
    "description": "Jaful la banca, bijuterie, casino sau depozit este fapta prin care o persoana ia bani sau bunuri de valoare folosind violenta sau amenintari. Scopul este obtinerea ilegala a unui castig material.",
    "amenda": "7.500$",
    "inchisoare": "500 minute"
  },
  {
    "id": "(5)08",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Bani Nemarcati",
    "description": "Banii nemarcati sunt sume de bani obtinute sau detinute fara ca provenienta lor sa fie identificata legal. Folosirea sau posesia lor poate constitui infractiune daca se dovedeste ca provin din activitati ilegale.",
    "amenda": "1.500$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(5)09",
    "category": "contra-proprietatii",
    "categoryLabel": "Contra Proprietatilor",
    "title": "Incalcarea proprietatii private",
    "description": "Incalcarea proprietatii private este fapta prin care o persoana patrunde sau foloseste fara drept terenuri, cladiri sau bunuri apartinand altora.",
    "amenda": "2.000$",
    "inchisoare": "30 minute"
  },
  {
    "id": "(6)01",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Abuzul Liniei de Urgenta",
    "description": "Abuzul liniei de urgenta este fapta prin care o persoana foloseste in mod nejustificat numerele de urgenta. Scopul poate fi gluma, hartuire sau obtinerea de avantaje nepermise.",
    "amenda": "5.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(6)02",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Esecul identificarii",
    "description": "Esecul identificarii este fapta prin care o persoana refuza sau impiedica sa fie identificata de autoritati. Scopul poate fi evitarea raspunderii sau a controlului legal.",
    "amenda": "2.000$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(6)03",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Codul Muncii (Licente/Atestate)",
    "description": "Codul muncii (licente/atestate) se refera la obligatia angajatilor de a detine licente sau atestate necesare pentru desfasurarea legala a activitatii.",
    "amenda": "5.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(6)04",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Intimidarea unui martor / unei victime",
    "description": "Intimidarea unui martor sau a unei victime este fapta prin care o persoana ameninta sau constrange pe cineva implicat intr-un proces. Scopul este influentarea declaratiilor sau impiedicarea participarii la justitie.",
    "amenda": "1.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(6)05",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Obstructia unui ofiter",
    "description": "Obstructia unui ofiter este fapta prin care o persoana impiedica sau ingreuneaza actiunile unui politist sau alt functionar de ordine publica.",
    "amenda": "2.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(6)06",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Fals in declaratii",
    "description": "Falsul in declaratii este fapta prin care o persoana furnizeaza informatii neadevarate autoritatilor sau intr-un document oficial. Scopul este inselarea sau obtinerea unui avantaj nejustificat.",
    "amenda": "2.500$",
    "inchisoare": "120 minute"
  },
  {
    "id": "(6)07",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Ultraj",
    "description": "Ultrajul este fapta prin care o persoana insulta, jigneste sau agreseaza autoritatea publica sau o persoana aflata in exercitarea unei functii.",
    "amenda": "4.000$",
    "inchisoare": "30 minute"
  },
  {
    "id": "(6)08",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Rezistenta la arest",
    "description": "Rezistenta la arest este fapta prin care o persoana opune rezistenta fizica sau violenta autoritatilor in momentul retinerii sau arestarii. Scopul este evitarea capturarii sau sanctionarii.",
    "amenda": "3.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(6)09",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Dare de mita",
    "description": "Darea de mita este fapta prin care o persoana ofera bani, bunuri sau avantaje unui ofiter pentru a obtine un folos nelegal.",
    "amenda": "5.500$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(6)10",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Evadarea din custodie",
    "description": "Evadarea din custodie este fapta prin care o persoana scapa sau incearca sa scape din supravegherea unui ofiter sau a unei persoane autorizate.",
    "amenda": "5.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(6)11",
    "category": "justitie",
    "categoryLabel": "Impotriva Justitiei",
    "title": "Evadarea din penitenciar",
    "description": "Evadarea din penitenciar este fapta prin care o persoana iese sau incearca sa iasa dintr-o unitate de detentie fara permisiune. Scopul este evitarea executarii pedepsei sau a controlului legal. - Daca ati comis mai multe infractiuni din acest capitol, se va aplica pedeapsa corespunzatoare celei mai grave dintre ele. Totusi, ofiterul responsabil va comunica toate faptele savarsite.",
    "amenda": "3.000$",
    "inchisoare": "Extinde pedeapsa cu 100 minute"
  },
  {
    "id": "(7)01",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Posesia unei arme albe",
    "description": "Posesia unei arme albe este fapta prin care o persoana detine cutite, pumnale sau alte obiecte similare fara drept legal.",
    "amenda": "3.000$",
    "inchisoare": "60 minute"
  },
  {
    "id": "(7)02",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Indreptarea unei arme asupra unui obiect / individ",
    "description": "Indreptarea unei arme asupra unui obiect sau individ este fapta prin care o persoana directioneaza o arma spre alta persoana sau bunuri. Scopul poate fi intimidarea, amenintarea sau pregatirea comiterii unei infractiuni.",
    "amenda": "1.000$",
    "inchisoare": "20 minute"
  },
  {
    "id": "(7)03",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Posesia unei arme de foc de calibru mic",
    "description": "Posesia unei arme de foc de calibru mic este fapta prin care o persoana detine ilegal o arma de foc usoara.",
    "amenda": "4.000$",
    "inchisoare": "120 minute"
  },
  {
    "id": "(7)04",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Posesia unei arme automate de foc",
    "description": "Posesia unei arme automate de foc este fapta prin care o persoana detine ilegal o arma de foc automata.",
    "amenda": "5.000$",
    "inchisoare": "180 minute"
  },
  {
    "id": "(7)05",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Posesia de explozibil",
    "description": "Posesia de explozibil este fapta prin care o persoana detine materiale explozive fara drept legal. Scopul poate fi comiterea de infractiuni sau provocarea de pagube.",
    "amenda": "20.000$",
    "inchisoare": "200 minute"
  },
  {
    "id": "(7)06",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Trafic de munitie",
    "description": "Traficul de munitie este fapta prin care o persoana vinde, cumpara sau transporta munitie fara drept legal.",
    "amenda": "2.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(7)07",
    "category": "arme",
    "categoryLabel": "Controlul Armelor",
    "title": "Trafic de armament",
    "description": "Traficul de armament este fapta prin care o persoana vinde, cumpara sau transporta arme fara drept",
    "amenda": "8.000$",
    "inchisoare": "180 minute"
  },
  {
    "id": "(8)01A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Viteza Legala [Clasa A / VIP]",
    "description": "Viteza legala este limita maxima de viteza permisa pe un drum, stabilita prin lege sau indicatoare rutiere. Limite maxime sunt: Localitate: 60km/h ; Drum National: 100km/h ; Autostrada: 150km/h",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)01B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Viteza Legala [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)01C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Viteza Legala [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)01D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Viteza Legala [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)01E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Viteza Legala [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)02",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Parcare Ilegala",
    "description": "Parcarea ilegala este fapta prin care o persoana stationeaza vehiculul intr-un loc nepermis sau restrictionat.",
    "amenda": "3.500$",
    "inchisoare": "-"
  },
  {
    "id": "(8)03",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Traversare ilegala",
    "description": "Traversarea ilegala este fapta prin care o persoana traverseaza strada nerespectand regulile de circulatie sau locurile special amenajate.",
    "amenda": "1.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)04A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Conducere imprudenta [Clasa A / VIP]",
    "description": "Conducerea imprudenta este fapta prin care o persoana conduce un vehicul nerespectand regulile de circulatie, masurile de siguranta sau agresiv.",
    "amenda": "10.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)04B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Conducere imprudenta [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)04C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Conducere imprudenta [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "9.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)04D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Conducere imprudenta [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "4.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)04E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Conducere imprudenta [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "8.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)05",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Claxonare excesiva",
    "description": "Claxonarea excesiva este folosirea repetata sau inutila a claxonului.",
    "amenda": "5.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)06",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Acoperirea fetei la volan",
    "description": "Acoperirea fetei la volan este fapta prin care soferul isi ascunde chipul, de exemplu cu masca, in timp ce conduce.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)07",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Utilizarea NOS-ului pe drumurile publice",
    "description": "Utilizarea NOS-ului pe drumurile publice este fapta prin care un sofer foloseste sistemul de injectie de oxid nitros pentru a creste viteza vehiculului.",
    "amenda": "10.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)08A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Geamuri fumurii [Clasa A / VIP]",
    "description": "Geamurile fumurii sunt folosite pentru a reduce vizibilitatea in interiorul vehiculului. Pe drumurile publice, utilizarea lor poate impiedica controlul autoritatilor si pune in pericol siguranta rutiera.",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)08B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Geamuri fumurii [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)08C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Geamuri fumurii [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)08D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Geamuri fumurii [Clasa Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)08E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Geamuri fumurii [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)09A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Neoane [Clasa A / VIP]",
    "description": "Neoanele la vehicul sunt lumini decorative instalate sub sau in jurul masinii. Utilizarea lor pe drumurile publice fara respectarea regulilor poate distrage atentia altor participanti la trafic si este interzisa.",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)09B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Neoane [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)09C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Neoane [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)09D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Neoane [Clasa Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)09E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Neoane [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)10A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea culorii rosii a semaforului [Clasa A / VIP]",
    "description": "Nerespectarea culorii rosii a semaforului este fapta prin care un sofer trece intersectionarea desi semaforul indica stop.",
    "amenda": "7.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)10B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea culorii rosii a semaforului [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)10C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea culorii rosii a semaforului [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)10D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea culorii rosii a semaforului [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "1.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)10E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea culorii rosii a semaforului [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)11A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Folosirea telefonului in timpul condusului [Clasa A / VIP]",
    "description": "Folosirea telefonului in timpul condusului este fapta prin care soferul utilizeaza telefonul mobil in timp ce conduce. Scopul sau efectul poate fi distragerea atentiei si cresterea riscului de accidente.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)11B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Folosirea telefonului in timpul condusului [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "500$",
    "inchisoare": "-"
  },
  {
    "id": "(8)11C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Folosirea telefonului in timpul condusului [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)11D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Folosirea telefonului in timpul condusului [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "500$",
    "inchisoare": "-"
  },
  {
    "id": "(8)11E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Folosirea telefonului in timpul condusului [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "1.500$",
    "inchisoare": "-"
  },
  {
    "id": "(8)12A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Claxon neconform [Clasa A / VIP]",
    "description": "Claxon neconform se refera la folosirea unui claxon modificat sau neomologat, care produce sunete diferite de cele legale.",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)12B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Claxon neconform [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)12C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Claxon neconform [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)12D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Claxon neconform [Clasa Moto / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)12E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Claxon neconform [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)13A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea marcajelor rutiere [Clasa A / VIP]",
    "description": "Nerespectarea marcajelor rutiere este fapta prin care un sofer ignora liniile, sagetile sau alte semne trasate pe drum. Scopul sau efectul poate fi tulburarea traficului si punerea in pericol a sigurantei rutiere.",
    "amenda": "7.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)13B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea marcajelor rutiere [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)13C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea marcajelor rutiere [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)13D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea marcajelor rutiere [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "1.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)13E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea marcajelor rutiere [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)14A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Anvelope de iarna [Clasa A / VIP]",
    "description": "Anvelopele de iarna sunt cauciucuri special concepute pentru conditii de drum cu gheata, zapada sau temperaturi scazute. Nerespectarea obligativitatii lor poate creste riscul de accidente si atrage sanctiuni legale.",
    "amenda": "10.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)14B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Anvelope de iarna [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)14C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Anvelope de iarna [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "9.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)14D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Anvelope de iarna [Clasa Moto / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "4.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)14E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Anvelope de iarna [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)15A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea prioritatii [Clasa A / VIP]",
    "description": "Nerespectarea prioritatii este fapta prin care un sofer nu acorda trecerea altor vehicule sau pietoni conform regulilor de circulatie.",
    "amenda": "6.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)15B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea prioritatii [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "1.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)15C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea prioritatii [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)15D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea prioritatii [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "1.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)15E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea prioritatii [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "4.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)16A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnelor ofiterului [Clasa A / VIP]",
    "description": "Nerespectarea semnelor ofiterului este fapta prin care un sofer ignora indicatiile unui politist sau alt functionar de ordine publica.",
    "amenda": "8.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)16B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnelor ofiterului [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)16C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnelor ofiterului [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)16D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnelor ofiterului [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)16E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnelor ofiterului [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)17A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnalelor acustice si luminoase [Clasa A / VIP]",
    "description": "Nerespectarea semnalelor acustice si luminoase este fapta prin care un sofer nu acorda prioritate vehiculelor de interventie sau nu respecta avertizarile luminoase si sonore.",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)17B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnalelor acustice si luminoase [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)17C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnalelor acustice si luminoase [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)17D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnalelor acustice si luminoase [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)17E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea semnalelor acustice si luminoase [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)18A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Instalatie de lumini neconforma [Clasa A / VIP]",
    "description": "Instalatia de lumini neconforma este folosirea unor lumini neomologate sau modificate pe vehicul. Scopul sau efectul poate fi distragerea atentiei, tulburarea traficului si incalcarea normelor rutiere.",
    "amenda": "8.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)18B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Instalatie de lumini neconforma [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)18C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Instalatie de lumini neconforma [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)18D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Instalatie de lumini neconforma [Clasa Moto / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)18E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Instalatie de lumini neconforma [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)19A",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea indicatoarelor rutiere [Clasa A / VIP]",
    "description": "Nerespectarea indicatoarelor rutiere este fapta prin care un sofer ignora semnele de circulatie de pe drum.",
    "amenda": "7.000$",
    "inchisoare": "-"
  },
  {
    "id": "(8)19B",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea indicatoarelor rutiere [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "2.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)19C",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea indicatoarelor rutiere [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)19D",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea indicatoarelor rutiere [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "1.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(8)19E",
    "category": "contraventii-rutiere",
    "categoryLabel": "Contraventii Rutiere",
    "title": "Nerespectarea indicatoarelor rutiere [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica. - Daca ati comis mai multe infractiuni din acest capitol, se va aplica pedeapsa corespunzatoare celei mai grave dintre ele. Totusi, ofiterul responsabil va comunica toate faptele savarsite.",
    "amenda": "5.000$ + Confiscarea permisului de conducere",
    "inchisoare": "-"
  },
  {
    "id": "(9)01A",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Condusul fara permis de conducere [Clasa A / VIP]",
    "description": "Condusul fara permis de conducere este fapta prin care o persoana conduce un vehicul fara a detine dreptul legal.",
    "amenda": "12.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(9)01B",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Condusul fara permis de conducere [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(9)01C",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Condusul fara permis de conducere [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "11.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(9)01D",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Condusul fara permis de conducere [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "6.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(9)01E",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Condusul fara permis de conducere [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "10.000$",
    "inchisoare": "70 minute"
  },
  {
    "id": "(9)02A",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Evadarea de un ofiter cu un autovehicul [Clasa A / VIP]",
    "description": "Evadarea de un ofiter cu un autovehicul este fapta prin care o persoana fuge de controlul autoritatilor conducand masina.",
    "amenda": "17.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)02B",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Evadarea de un ofiter cu un autovehicul [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "12.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)02C",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Evadarea de un ofiter cu un autovehicul [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "16.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)02D",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Evadarea de un ofiter cu un autovehicul [Clasa Moto / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "11.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)02E",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Evadarea de un ofiter cu un autovehicul [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "15.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)03A",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Parasirea locului accidentului sau a unei scene [Clasa A / VIP]",
    "description": "Parasirea locului accidentului sau a unei scene este fapta prin care o persoana pleaca de la locul unui eveniment fara a-si indeplini obligatiile legale.",
    "amenda": "10.000$",
    "inchisoare": "80 minute"
  },
  {
    "id": "(9)03B",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Parasirea locului accidentului sau a unei scene [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$",
    "inchisoare": "80 minute"
  },
  {
    "id": "(9)03C",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Parasirea locului accidentului sau a unei scene [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "9.000$",
    "inchisoare": "80 minute"
  },
  {
    "id": "(9)03D",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Parasirea locului accidentului sau a unei scene [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "4.000$",
    "inchisoare": "80 minute"
  },
  {
    "id": "(9)03E",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Parasirea locului accidentului sau a unei scene [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "8.000$",
    "inchisoare": "80 minute"
  },
  {
    "id": "(9)04A",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Conducerea sub influenta substantelor psihoactive [Clasa A / VIP]",
    "description": "Conducerea sub influenta substantelor psihoactive este fapta prin care o persoana conduce un vehicul dupa ce a consumat droguri sau alte substante care afecteaza perceptia si reflexele.",
    "amenda": "9.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(9)04B",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Conducerea sub influenta substantelor psihoactive [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "4.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(9)04C",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Conducerea sub influenta substantelor psihoactive [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "8.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(9)04D",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Conducerea sub influenta substantelor psihoactive [Clasa Moto / Job / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "3.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(9)04E",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Conducerea sub influenta substantelor psihoactive [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "7.000$",
    "inchisoare": "50 minute"
  },
  {
    "id": "(9)05A",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Curse ilegale [Clasa A / VIP]",
    "description": "Cursele ilegale sunt competitii de viteza organizate pe drumuri publice fara autorizatie. Scopul este obtinerea de adrenalina sau castiguri materiale, punand in pericol siguranta altor participanti la trafic.",
    "amenda": "20.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)05B",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Curse ilegale [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "15.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)05C",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Curse ilegale [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "19.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)05D",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Curse ilegale [Clasa Moto / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "14.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)05E",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Curse ilegale [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "18.000$",
    "inchisoare": "100 minute"
  },
  {
    "id": "(9)06A",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Scoaterea placutelor de inmatriculare [Clasa A / VIP]",
    "description": "Scoaterea placutelor de inmatriculare este fapta prin care o persoana indeparteaza ilegal numerele de identificare ale unui vehicul. Scopul poate fi evitarea identificarii sau comiterea de infractiuni.",
    "amenda": "10.000$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(9)06B",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Scoaterea placutelor de inmatriculare [Clasa B / C]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "5.000$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(9)06C",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Scoaterea placutelor de inmatriculare [Clasa Lowrider / Classic]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "9.000$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(9)06D",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Scoaterea placutelor de inmatriculare [Clasa Moto / Utilitare]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "4.000$",
    "inchisoare": "40 minute"
  },
  {
    "id": "(9)06E",
    "category": "infractiuni-rutiere",
    "categoryLabel": "Infractiuni Rutiere",
    "title": "Scoaterea placutelor de inmatriculare [Clasa Muscle]",
    "description": "Identic cu prevederile anterioare pentru clasa specifica.",
    "amenda": "8.000$",
    "inchisoare": "40 minute"
  }
];
