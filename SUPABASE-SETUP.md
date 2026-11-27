# Supabase — steg 1

Följ stegen i ordning. Koden aktiveras inte fullt förrän Supabase och Vercel har konfigurerats.

1. Skapa PR-förhandsvisningen och kontrollera den innan merge. **Merge behövs innan Vercel Production uppdateras.**
2. I ett nytt Supabase-projekt: öppna SQL Editor, klistra in hela `supabase/setup.sql` och kör. Om databasen redan är konfigurerad, kör i stället `supabase/migrations/20261127_game_highscores.sql` i SQL Editor för att lägga till topplistorna. RLS aktiveras och endast Vercel-serverfunktionerna använder hemlig nyckel för att skapa konton och spara resultat.
3. I `supabase-config.js`, klistra in Project URL och Publishable key från Supabase Connect/Data API. Dessa två värden är avsedda att synas i webbläsaren. Ersätt platshållarna.
4. I Vercel Project Settings → Environment Variables lägger du till för Production, Preview och Development:
   - `SUPABASE_URL` = samma Project URL
   - `SUPABASE_SECRET_KEY` = Supabase Secret key (börjar ofta med `sb_secret_`). **Bara här; aldrig i HTML, JavaScript eller GitHub.** Denna nyckel går förbi RLS.
   - `PARENT_INVITE_CODE` = en lång, unik kod som ni delar privat med vårdnadshavaren.
5. I Supabase Auth: stäng av offentlig självregistrering (detta skyddar inte den särskilda kontoregistreringen med kod, men förhindrar separata öppna signups). Skapa/aktivera inte konto med adminnyckel i webbläsaren.
6. Efter merge: vänta på Vercel-deploy och prova först föräldrakonto, skapa ett testbarnskonto, logga in som barnet och kontrollera att spelområdet kräver inloggning.

## Viktiga begränsningar i steg 1

- Resultaten sparas med serverns endpoint och Auth-id. Topplistorna visar bästa resultat per barnkonto inom den inloggades familj och använder kontots smeknamn. Quizresultat hämtas från quizserverns verifierade resultat; övriga spel sparar resultat när en 15-uppgiftsrunda eller Ordormens spel är avslutat. Topplistedata kan inte läsas direkt från webbläsaren. Resultatöversikt och export blir ett senare steg. Radering av barnkonto eller föräldrakonto raderar kopplade resultat.
- Källorna och licensnotisen i sidfoten behålls; se `SOURCES.md`. Quizresultatet är en övningspoäng, inte ett skolbetyg.
- Integritetssidan innehåller kontaktadressen spanskasidan.kontakt@gmail.com. Bekräfta att den är rätt och komplettera integritetsinformationen före publik användning. Formulärintyget är inte en fristående verifiering av vårdnadshavare. Beakta detta före bred lansering, särskilt för barn under 13 år.
- Quizfrågorna och rättningen hanteras av serverfunktioner. Klienten kan inte skicka in ett eget poängtal; servern verifierar varje svar och sparar slutresultatet. Frågetext kan fortfarande inspekteras av en tekniskt kunnig användare i webbläsaren.
