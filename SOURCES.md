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

## Lektionsfraser

Den första lektionens exempel (`¡Hola!`, `¿Qué tal?`, `gracias` och `muchas gracias`) är korta redaktionella exempel, inte poster från spelordlistan. Använd följande referenser för betydelse och kommunikativ användning:

- [Instituto Cervantes: Plan Curricular, funktioner på nivå A1–A2](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/05_funciones_inventario_a1-a2.htm) innehåller exempel på hälsningsfrasen `Hola, ¿qué tal?` och svar med `gracias`.
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
