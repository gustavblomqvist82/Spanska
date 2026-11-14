# Källor och licenser

## Orddata för spelen

**Källa:** Institutet för språk och folkminnen (Isof), Språkrådet, med medverkan av Álvaro Eljach. (2020). *Lexin: Svensk-spanskt lexikon* (version 1). Datafilen `swe_spa.xml` anger lexikonversion `2010-07-07`. Lexikonet har särskilt fokus på amerikansk spanska och innehåller svenska uppslagsord med spanska översättningar.

- [Lexin-dataset och nedladdning hos Isof](https://sprakresurser.isof.se/lexin/spanska/)
- [Datasetpost med citering och licens](https://researchdata.se/sv/catalogue/dataset/ext0289-1)
- [Licenstext: Creative Commons Erkännande 4.0 Internationell (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.sv)
- Källa till ordposter i lexikonfilen: [swe_spa.xml](https://sprakresurser.isof.se/lexin/spanska/swe_spa.xml)

### Attribution och bearbetning

Ordlistan i `wordbank.js` är ett urval och en bearbetning av Lexin-materialet. Uppslagsord och översättningsalternativ har hämtats från Lexin; en lämplig översättning har valts för varje spelkort. Vi har lagt till projektets egna ID:n, ämnesområden och nivåetiketter, samt normaliserat svensk versalisering för visning. Varje post som lämnas ut av ordliste-API:t har `sourceEntryId`, Lexins `Word/@ID`, för spårning tillbaka till källfilen. Bearbetningen innebär inte att Isof eller Språkrådet står bakom hemsidan.

Lexin-ordlistan återanvänds enligt **CC BY 4.0**. Ange upphovsperson/källa, länka till licensen och markera ändringar. Sidfoten anger källan, licensen och att urval/spelmetadata har lagts till. Denna sida beskriver ändringarna närmare. Licensen gäller källmaterialet; webbplatsens övriga kod och egen text får inte automatiskt samma licens.

### Språklig användning och regional variation

Lexin är ett tvåspråkigt lexikon och ett ord kan ha flera översättningar beroende på betydelse och sammanhang. Spelordlistan väljer en variant för varje kort. Till exempel är `pescado` valt för *fisk* i matsammanhang och `plátano` är det Spanien-märkta alternativet i Lexins post för *banan*. Lexins spanska har särskilt fokus på amerikansk spanska, men enskilda val kan vara märkta för andra regioner. Webbplatsen bör därför inte beskriva ordlistan som enhetligt spansk från ett enda land. Lägg till regional märkning när en skillnad är relevant för spelet.

Spanska substantiv, pronomen och adjektiv kan böjas efter genus, numerus och sammanhang; spelens kort visar en grundform och ska inte läsas som att den formen alltid passar i en mening.

## Lektionsfraser och redaktionella exempel

Exemplen (`¡Hola!`, `¿Qué tal?`, `gracias` och `muchas gracias`) är redaktionella exempel, inte poster från spelordlistan. De förekom i den första lektionen; den nuvarande startsidan visar `¡Hola!` som dagens fras och nämner `¿Qué tal?` i gloskortets tillgängliga beskrivning. Använd följande referenser för betydelse och kommunikativ användning:

- [Instituto Cervantes: Plan Curricular, funktioner på nivå A1–A2](https://cvc.cervantes.es/ENSENANZA/biblioteca_ele/plan_curricular/niveles/05_funciones_inventario_a1-a2.htm) innehåller exempel på hälsningsfrasen `Hola, ¿qué tal?` och svar med `gracias`. Vid kontroll 2026-11-14 omdirigerade sidan till en tillfällig underhållssida; uppgifterna stämmer med sidans indexerade innehåll.
- [Real Academia Española: DLE, hola](https://dle.rae.es/hola) beskriver användningen av `hola` som hälsning.
- [Real Academia Española: DLE, gracias](https://dle.rae.es/gracia) beskriver `gracias` som ett uttryck för tacksamhet.

Beskrivningarna på hemsidan är egna, förenklade svenska förklaringar. Kontrollera dem på nytt om fraserna eller deras kontext ändras.

## Skolans styrdokument och svårighetsgrader

- [Skolverket: kursplan i moderna språk, GRGRMSP01](https://www.skolverket.se/undervisning/grundskolan/kursplaner-for-grundskolan/subjects/GRGRMSP01) är referens för framtida skolanknuten progression. Kursplanen beskriver centralt innehåll och kriterier vid angivna årskursgränser; webbplatsens spel och nivåer är inte Skolverkets bedömning eller betyg.
- [Europarådet: Common European Framework of Reference for Languages (CEFR)](https://www.coe.int/en/web/common-european-framework-reference-languages) beskriver den europeiska referensramen för språk.

I den nuvarande ordlistan är `level: 'A1'` en **egen, grov spelmetadataetikett**. Ordposterna har inte individuellt validerats mot CEFR:s A1-deskriptorer, och etiketten visar inte att en spelare uppnått A1. Quizets val `Lätt`, `Medel`, `Svår` och `Expert` styr spelets frågeformat; de är inte CEFR-nivåer, skolår eller betyg. Om spelen senare ska påstå att de tränar eller mäter en viss nivå behöver varje nivå få dokumenterade lärandemål och uppgifter som faktiskt prövar dessa färdigheter.

## Gemensam ordlista för spelen

Ordlistan används av spelen via `window.HolaWordBank` i `wordbank.js`. Tillgängliga metoder:

```js
HolaWordBank.getWords({ topic: 'mat och dryck', level: 'A1' });
HolaWordBank.getWord('vatten');
HolaWordBank.getRandomWord({ level: 'A1', excludeId: 'vatten' });
HolaWordBank.getDistractors('vatten', 3, { topic: 'mat och dryck' });
```

`getWords` och slumpmetoderna returnerar nya objekt, så spel kan sortera eller ändra sina kopior utan att ändra den gemensamma ordlistan. Varje objekt innehåller `id`, `sourceEntryId`, `swedish`, `spanish`, `partOfSpeech`, `topic` och `level`.


## Egna övningsexempel: meningsbyggnad och stavning

### Meningsuppbyggnad

Meningsbyggnadsspelets meningar och svenska ledtrådar är redaktionella exempel skrivna för webbplatsen. De är inte hämtade från en extern text eller korpus. Orden och grammatikformerna valdes för övningens egna steg. RAE och ASALE:s [Nueva gramática de la lengua española](https://www.rae.es/sites/default/files/Sala_prensa_Dosier_Gramatica_2009.pdf) och [Diccionario de la lengua española (DLE)](https://dle.rae.es/) används som språkstöd; inga formuleringar återges som citat. De fyra svårighetsstegen är webbplatsens egna och motsvarar inte officiella skolår eller betyg.

Exempelparen i spelet:

1. `Yo como pan` — Jag äter bröd.
2. `Ella bebe agua` — Hon dricker vatten.
3. `El niño lee libros` — Pojken läser böcker.
4. `Nosotros vemos gatos` — Vi ser katter.
5. `La niña come una manzana roja` — Flickan äter ett rött äpple.
6. `Mi hermano estudia español hoy` — Min bror studerar spanska i dag.
7. `Nosotros caminamos por el parque` — Vi promenerar genom parken.
8. `El perro pequeño duerme aquí` — Den lilla hunden sover här.
9. `¿Dónde vive tu hermana?` — Var bor din syster?
10. `No quiero café ahora` — Jag vill inte ha kaffe nu.
11. `¿Qué hacen ustedes mañana?` — Vad gör ni i morgon?
12. `Mis amigos nunca llegan tarde` — Mina vänner kommer aldrig sent.
13. `Se lo doy cuando llega` — Jag ger det till honom när han kommer.
14. `Quiero que me cuentes la verdad` — Jag vill att du berättar sanningen för mig.
15. `Aunque llueve, nosotros vamos al mercado` — Även om det regnar går vi till marknaden.
16. `La película que vimos ayer fue muy divertida` — Filmen som vi såg i går var mycket rolig.

### Stavningsövningens ordlista

Stavningsspelets ord är ett redaktionellt urval av övningsord, separat från Lexin-baserade poster i `wordbank.js`. Stavningarna kontrolleras mot RAE/ASALE:s [Diccionario de la lengua española (DLE)](https://dle.rae.es/), med ordlänkar nedan. RAE:s [Ortografía de la lengua española](https://www.rae.es/diccionario-estudiante/docs/ortografia.pdf) beskriver bland annat tilde, diéresis, b/v och g/j samt att uttalet av c, s och z varierar mellan regionala varieteter. Spelets etiketter beskriver stavningsmönster; de innebär inte att dessa bokstäver uttalas olika i alla spansktalande områden.

- **Nybörjare:** [sol](https://dle.rae.es/sol), [mar](https://dle.rae.es/mar), [pan](https://dle.rae.es/pan), [flor](https://dle.rae.es/flor), [luz](https://dle.rae.es/luz), [casa](https://dle.rae.es/casa).
- **Lätt:** [queso](https://dle.rae.es/queso), [parque](https://dle.rae.es/parque), [guitarra](https://dle.rae.es/guitarra), [amiga](https://dle.rae.es/amiga), [pequeño](https://dle.rae.es/peque%C3%B1o), [guerra](https://dle.rae.es/guerra).
- **Medel:** [árbol](https://dle.rae.es/%C3%A1rbol), [también](https://dle.rae.es/tambi%C3%A9n), [zapato](https://dle.rae.es/zapato), [jirafa](https://dle.rae.es/jirafa), [ventana](https://dle.rae.es/ventana), [canción](https://dle.rae.es/canci%C3%B3n), [sopa](https://dle.rae.es/sopa), [gato](https://dle.rae.es/gato).
- **Avancerad:** [vergüenza](https://dle.rae.es/verg%C3%BCenza), [pingüino](https://dle.rae.es/ping%C3%BCino), [averiguación](https://dle.rae.es/averiguaci%C3%B3n), [desagüe](https://dle.rae.es/desag%C3%BCe), [antigüedad](https://dle.rae.es/antig%C3%BCedad), [lingüística](https://dle.rae.es/ling%C3%BC%C3%ADstica).

Uppläsningen begärs via webbläsarens talsyntes med språktaggen `es-MX`, i linje med Lexin-ordlistans huvudsakliga fokus på amerikansk spanska. Tillgängliga röster och uttal varierar mellan webbläsare och enheter; spelet visar därför också ordets rätta stavning efter kontroll.
