# Projektöversikt: Spanska – hemsida

**Syfte:** en svensk webbplats där barn och vuxna kan träna spanska ord, stavning och meningsbyggnad genom korta spel.  
**Produktionsadress:** [https://spanska.vercel.app](https://spanska.vercel.app)  
**Källkod:** GitHub-repot `gustavblomqvist82/Spanska`  
**Kontrollerad mot:** `main`, commit `e20e55bc5ed5787a2784c23c37212964874f2187` (2026-11-28).

## 1. Hur projektet är uppbyggt

Webbplatsen är en liten, ramverksfri webbapp. HTML, CSS och JavaScript ligger i statiska filer; serverfunktionerna ligger under `api/`. `package.json` innehåller Supabase-klienten men ingen byggkedja eller testkommandon.

| Del | Vad den gör |
| --- | --- |
| `index.html` | Startsida, spelmeny, spelpaneler, highscorelistor och inloggningsdialog. En stor del av spelgränssnittet och spelkoden finns här. |
| `login.html`, `register.html` | Inloggning respektive skapande av föräldrakonto. |
| `account.html` | Förälderns hantering av barnkonton och radering. Barnkonton får inte länken ”Mitt konto”. |
| `progress.html` | Privat översikt över spelarens egna resultat i Meningsuppbyggnad. Föräldern kan välja sitt eget konto eller ett av sina barn. |
| `privacy.html`, `privacy-content.js` | Integritetssidan och den gemensamma text som visas i integritetsdialogerna. |
| `wordbank.js` | Delad ordlista för ordspelen, med Lexin-ID och webbplatsens metadata. |
| `sentence-data.js` | Egna exempelmeningar och lärandemål för Meningsuppbyggnad. |
| `api/` | Vercel-serverfunktioner för konton, spelresultat, quiz, privata framsteg och familjehantering. |
| `supabase/` | Databasschema och migreringar. |
| `SOURCES.md` | Full käll- och licensredovisning, ordurval och egna exempel. |

Vercel publicerar de statiska sidorna och kör `api/` som serverfunktioner. Supabase Auth hanterar inloggning; Supabase Database lagrar profiler, quizdata, topplistor och privata övningsförsök. Webbplatsens publika URL är `spanska.vercel.app`.

### Samarbete och ansvar mellan GitHub, Vercel och Supabase

| Tjänst | Huvudansvar i projektet | Äger inte |
| --- | --- | --- |
| **GitHub** | Förvarar versionshanterad källkod och projektinstruktioner. Grenar och pull requests används för ändringar och granskning. `main` är källan för produktionskod. | Kör inte webbplatsen för besökare och lagrar inte konton eller spelresultat. |
| **Vercel** | Hämtar koden från GitHub, bygger/publicerar webbplatsen och kör serverfunktionerna i `api/`. Skapar förhandsvisning för grenar/PR:ar och produktionsdeployment från `main`. Lagrar runtime-inställningar och serverhemligheter som miljövariabler. | Är inte projektets källa till koden eller databasen för användarkonton och resultat. |
| **Supabase** | Hanterar Auth (inloggning och identitet) och Postgres-databasen (profiler, familjerelationer, quizsessioner, resultat, highscores och privata övningsförsök). RLS och tabellbehörigheter skyddar data. | Bygger eller publicerar inte webbplatsens HTML/CSS/JavaScript. |

**När kod ändras:** utvecklaren gör en ändring på en `codex/`-gren och öppnar en PR i GitHub. Vercel känner av grenen/PR:en och bygger en separat Preview-URL. Den kan granskas utan att ändra produktionen. När PR:en uttryckligen slås ihop till `main` skapar GitHub/Vercel-integrationen en ny Production-deployment. En lyckad Preview innebär alltså inte i sig att produktionen har ändrats.

**När en användare använder sidan:**

1. Webbläsaren hämtar sidfiler och `/api/*`-funktioner från Vercel.
2. Klientkoden använder Supabase Project URL och en **publishable key** från `supabase-config.js` för att logga in via Supabase Auth. Sessionen/token används av webbläsaren för inloggade API-anrop.
3. Föräldraregistrering och andra skyddade operationer går till Vercels serverfunktioner. API-anrop från inloggade användare skickar sin bearer-token.
4. Vercel-funktionen validerar token med Supabase Auth, hämtar spelarens profil/roll och utför den tillåtna databasoperationen.
5. Servern returnerar ett begränsat JSON-svar till webbläsaren. GitHub deltar inte i dessa live-anrop.

**Nycklar och gränser:** Project URL och publishable key är avsedda att finnas i webbläsarkoden. `SUPABASE_SECRET_KEY` får bara finnas som Vercel-miljövariabel för serverfunktionerna; den får aldrig läggas i HTML, JavaScript som skickas till webbläsaren eller GitHub. `PARENT_INVITE_CODE` lagras också i Vercels miljö och kontrolleras av servern. Secret key kan gå förbi RLS, därför måste varje API-endpoint först kontrollera identitet, roll och vid behov att barnet tillhör just den föräldern. GitHub förvarar källkod, Vercel kör appen och Supabase ansvarar för användardata — de här rollerna ska inte blandas ihop.

## 2. Konton och föräldrakontroll

### Föräldrakonto

- Skapas med användarnamn, lösenord, inbjudningskod och ett intyg om att användaren är vårdnadshavare.
- Inbjudningskoden kontrolleras av servern mot Vercel-inställningen `PARENT_INVITE_CODE`.
- Föräldern kan skapa barnkonto med eget användarnamn, smeknamn och lösenord.
- Föräldern kan ändra barnets smeknamn och lösenord, ta bort barnkonton och radera hela familjekontot.
- Radering av hela familjekontot kräver att föräldern skriver sitt användarnamn som bekräftelse. Barn och kopplade resultat tas då också bort.
- Kontosidan instruerar föräldern att använda smeknamn i stället för barnets riktiga namn.

### Barnkonto

- Loggar in med eget användarnamn och lösenord.
- Kan spela samma spel som en förälder.
- Ser inte länken eller funktionerna för ”Mitt konto”.
- Kan se sin egen privata övningshistorik, men inte andra spelares privata framsteg.
- Kan visas med sitt smeknamn i gemensamma highscorelistor.

Servern kontrollerar den inloggade användarens roll och familjerelationer. Föräldern kan se sina egna resultat och sina egna barns resultat; en förälder kan inte begära en annan familjs privata historik.

## 3. Spel och hur de fungerar

Alla fyra spelen finns på startsidan. Spelen kräver inloggning; både förälder och barn kan spela. Highscorelistorna ligger bredvid respektive spel och visas för alla inloggade.

### Quiz: spanska ord

- En runda består av 15 frågor.
- Orden väljs och blandas från den gemensamma ordlistan.
- **Lätt:** tre svarsalternativ. **Medel:** fyra alternativ. **Svår:** fyra alternativ som i möjligaste mån väljs från samma ämne. **Expert:** fyra alternativ och växlar mellan svenska→spanska och spanska→svenska.
- Servern skapar frågerundan, sparar facit i en privat quizsession, rättar svaren och räknar resultatet. Klienten skickar inte in ett eget slutresultat.
- Resultatet sparas när rundan är färdig och kan visas på topplistan.

### Ordorm

- En klassisk mask på en spelplan. Svensk ledtråd visas; spelaren styr masken mot rätt spanska översättning.
- Styrning med piltangenter eller WASD; det finns även pekknappar.
- Rätt ord ger poäng och förlänger masken; fel ord krymper den. Krockar kostar liv. Spelet avslutas när liven tar slut.
- Slutpoängen efter game over sparas på Ordormens topplista.
- Orden och felalternativen kommer från den gemensamma ordlistan.

### Meningsuppbyggnad

- Fyra webbplatsegna steg: **Nybörjare, Lätt, Medel, Avancerad**.
- Varje steg har 15 egna meningar. En runda visar alla 15 i slumpad ordning, utan upprepning inom rundan.
- Spelaren får en svensk ledtråd och drar, klickar eller flyttar spanska ordbrickor till rätt ordning.
- Vid fel kan spelaren ändra ordningen och försöka igen. Rundan ger ett resultat av 15.
- Varje nivå visar vad spelaren tränar på. Resultatet är ett övningsresultat, inte ett skolbetyg.
- Rätt och fel försök, nivå, mening och rundor sparas för den privata utvecklingsöversikten.

### Stavning

- Fyra egna steg med stavningsord: Nybörjare, Lätt, Medel och Avancerad.
- Webbläsarens talsyntes läser upp ett spanskt ord. Spelaren skriver ordet och kontrollerar stavningen; spelet visar facit och kan förklara accent eller `ü`.
- Tangentknappar för spanska tecken underlättar på svenskt tangentbord.
- Rundan omfattar 15 uppgifter. De tillgängliga listorna per nivå är kortare än 15 ord, så ord kan återkomma under en runda.
- Resultatet sparas på Stavningens topplista. Uppläsning är talsyntes, inte uttalsbedömning.

## 4. Highscore och privat utveckling

Highscore och privat spelarutveckling är två olika funktioner.

### Highscore

- Varje spel har en topplista med **topp 5**.
- Alla inloggade användare kan se listan, oavsett familj.
- Servern samlar resultat från samtliga spelare, väljer varje spelares bästa resultat i det aktuella spelet och visar smeknamn och poäng. Vid lika poäng används totalpoäng och därefter tidpunkt som sorteringsregler.
- Quizresultat verifieras och sparas av quizservern. De övriga spelens godkända resultat skickas till highscore-endpointen när rundan eller Ordormens spel är klart.
- Utloggade besökare ser inte topplistorna.

### Privat utvecklingsöversikt

- `progress.html` visar antal startade och avslutade Meningsuppbyggnadsrundor, antal övade meningar och rätt/fel svarsförsök per nivå.
- Den visar också meningar spelaren ofta svarar fel respektive rätt på.
- En spelare ser bara sin egen historik. Föräldern kan dessutom välja sina egna barn.
- Den här detaljerade historiken är skild från den gemensamma highscoren. Den är för närvarande implementerad för Meningsuppbyggnad, inte som en samlad historik för alla spel.

## 5. Information, källor och användning

### Lexin-orddata

`wordbank.js` innehåller 62 utvalda svensk-spanska ordposter. Källan är **Lexin: Svensk-spanskt lexikon** från Institutet för språk och folkminnen (Isof) och Språkrådet, med medverkan av Álvaro Eljach (2020), återanvänt enligt **CC BY 4.0**.

- Varje ordpost har ett Lexin `sourceEntryId` så att den går att spåra till källans XML-post.
- Projektet har lagt till egna ID:n, ämnen och grova nivåetiketter samt valt en lämplig översättning för varje spelkort.
- Quiz och Ordorm använder den gemensamma ordlistan.
- `level: A1` är en grov etikett för webbplatsens spelurval. Varje ord har inte validerats mot CEFR-deskriptorerna och etiketten är inte ett uppnått språkbetyg.

### Egna meningar, stavning och fraser

- Meningsuppbyggnadens 60 spanska meningar och svenska ledtrådar är redaktionella exempel skrivna för webbplatsen. De är inte hämtade ur en extern korpus. RAE/ASALE:s grammatik och DLE används som språkstöd.
- Stavningsspelets 26 ord är ett eget urval av övningsord. Stavningar kontrolleras mot RAE:s DLE och stavningsmönster mot RAE:s Ortografía.
- Hälsningsfraserna är redaktionella exempel. Källförteckningen hänvisar till Instituto Cervantes och RAE för betydelse och användning.
- Orddata, meningar, fraser och svårighetsmetadata har olika ursprung. De ska inte beskrivas som en enda datakälla.

### Skolanknytning

Skolverkets kursplan i moderna språk och Europarådets CEFR listas som referenser. Webbplatsens spelsteg är webbplatsens egen träningsprogression. De motsvarar inte officiella skolår, betyg eller certifiering. Resultat ska beskrivas som övningsresultat, aldrig som skolbetyg.

Se `SOURCES.md` för fullständig citering, licenser, Lexin-ID:n, källänkar och bearbetningsbeskrivning.

## 6. Datahantering och säkerhet

- Webbläsaren använder en Supabase Project URL och publishable key. Inloggad API-trafik skickar Supabase-sessionens bearer-token.
- Vercels serverfunktioner validerar sessionen mot Supabase Auth och läser roll/familjerelation från profilen.
- Endast servern får använda `SUPABASE_SECRET_KEY`; nyckeln går förbi Row Level Security (RLS) och får inte läggas i HTML, klient-JavaScript eller GitHub.
- RLS är aktiverat för databastabellerna. Direkta klienträttigheter till privata spel- och highscoredata är spärrade; serverfunktionerna gör behörighetskontrollerna.
- Quizsessionen och dess facit ligger på serversidan. Klienten får frågetext och svarsalternativ.
- Konton använder en intern adress med domänen `@konto.invalid`; lösenord lagras av Supabase Auth, inte i klartext i projektets egna tabeller.
- Övningshistorik och highscores kopplas till profilens Auth-ID. Radering av profil tar bort kopplade resultat genom databasens kaskadradering.

## 7. Projektregler

- GitHub-repot `gustavblomqvist82/Spanska` är källan till aktuell kod. Kontrollera aktuell `main` och öppna PR:ar före ändring.
- Ändringar görs på gren med prefix `codex/`, går via PR mot `main` och förhandsvisas på Vercel.
- Ändra inte `main`, slå inte ihop en PR eller publicera inte manuellt till produktion utan uttryckligt klartecken.
- Köp eller aktivera inte nya betaltjänster utan ägarens uttryckliga tillåtelse.
- Läs `SOURCES.md` före ändringar i orddata eller källhänvisningar. Läs `kom ihåg lista.md` när du planerar eller genomför spel och lärandefunktioner; backlogpunkterna är inte i sig färdiga funktioner.
- Behåll Lexins attribution och CC BY 4.0 när Lexin-poster ändras eller återanvänds. Dokumentera urval och bearbetning.
- Progressionen och metadata för svårighetsgrad är webbplatsens egna. Skolår, betyg och officiella krav får inte blandas ihop med dem.
- Övningar bör träna relevanta språkfärdigheter och berätta vad användaren övar på. Spelresultat är inte skolbetyg.

## 8. Nuvarande avgränsningar och dokumentationsvarningar

1. **Äldre highscore-beskrivningar är inaktuella.** `SUPABASE-SETUP.md` och kommentaren i `supabase/migrations/20261127_game_highscores.sql` beskriver topplistor som familjeprivata. Den aktuella API-koden visar i stället topp 5 bland alla inloggade användare. För den färdiga funktionens beteende gäller `api/highscores.js` och UI-regeln ovan.
2. **Äldre installationssteg nämner inte alla migreringar.** En befintlig databas behöver både `20261127_game_highscores.sql` och `20261128000000_sentence_progress.sql` för funktionerna som finns nu. Produktionsdatabasen hade båda migreringarna applicerade när den här översikten skrevs.
3. **Integritetstexten bör ses över.** Den nuvarande texten nämner bland annat quizresultat och tidpunkt. Systemet lagrar även highscore-resultat för andra spel och rätt/fel-försök i Meningsuppbyggnad. Texten bör beskriva dessa datatyper tydligt innan bredare användning.
4. **Föräldraintyget är inte identitetskontroll.** Registreringen sparar ett intyg och en version av integritetstexten, men verifierar inte att personen faktiskt är vårdnadshavare. Integritetssidan nämner den begränsningen.
5. **Tal och konversation tränas inte färdigt ännu.** Stavning kan spela upp ord med webbläsarens talsyntes, men det finns ingen inspelning, automatisk uttalsrättning eller konversationsövning. Dessa är delar av slutmålet, inte nuvarande funktioner.
6. **Mobilappar ingår inte.** Det här är en webbplats. Särskild mobil-layout och appar för iOS/Android ligger utanför den nuvarande arbetsfasen.
7. `SUPABASE-SETUP.md` säger också att en samlad resultatsida/export hör till ett senare steg; en privat utvecklingssida finns nu för Meningsuppbyggnad. Export och motsvarande framstegsöversikter för de andra spelen återstår.

