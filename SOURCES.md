# Källor och licenser

## Orddata för spelen

**Källa:** Institutet för språk och folkminnen (Isof), Språkrådet, med medverkan av Álvaro Eljach. (2020). *Lexin: Svensk-spanskt lexikon* (version 1). Datafilen `swe_spa.xml` anger lexikonversion `2010-07-07`. Lexikonet har särskilt fokus på amerikansk spanska och innehåller svenska uppslagsord med spanska översättningar.

- [Lexin-dataset och nedladdning hos Isof](https://sprakresurser.isof.se/lexin/spanska/)
- [Datasetpost med citering och licens](https://researchdata.se/sv/catalogue/dataset/ext0289-1)
- [Licenstext: Creative Commons Erkännande 4.0 Internationell (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.sv)
- Källa till ordposter i lexikonfilen: `https://sprakresurser.isof.se/lexin/spanska/swe_spa.xml`

### Attribution

Ordlistan i `wordbank.js` är ett urval och en bearbetning av Lexin-materialet. Uppslagsord och översättningsalternativ har hämtats från Lexin; en lämplig översättning har valts för varje spelkort. Vi har lagt till stabila ID:n, ämnesområden och nivåetiketter, samt normaliserat svensk versalisering för visning. Varje post som lämnas ut av ordliste-API:t har `sourceEntryId`, Lexins `Word/@ID`, för spårning tillbaka till källfilen. Bearbetningen innebär inte att Isof eller Språkrådet står bakom hemsidan.

Lexin-ordlistan återanvänds enligt **CC BY 4.0**. Ange upphovsperson/källa, länka till licensen och markera ändringar. Licensen gäller källmaterialet; webbplatsens övriga kod och egen text får inte automatiskt samma licens.

### Språklig användning

Lexin är ett tvåspråkigt lexikon och ett ord kan ha flera översättningar beroende på betydelse och sammanhang. Spelordlistan väljer en variant för varje kort. Till exempel är `pescado` valt för *fisk* i matsammanhang och `plátano` är det Spanien-märkta alternativet i Lexins post för *banan*. Spanska substantiv, pronomen och adjektiv kan böjas efter genus, numerus och sammanhang; spelens kort visar en grundform och ska inte läsas som att den formen alltid passar i en mening.

Ordlistan är gemensam för spel via `window.HolaWordBank` i `wordbank.js`. Tillgängliga metoder:

```js
HolaWordBank.getWords({ topic: 'mat och dryck', level: 'A1' });
HolaWordBank.getWord('vatten');
HolaWordBank.getRandomWord({ level: 'A1', excludeId: 'vatten' });
HolaWordBank.getDistractors('vatten', 3, { topic: 'mat och dryck' });
```

`getWords` och slumpmetoderna returnerar nya objekt, så spel kan sortera eller ändra sina kopior utan att ändra den gemensamma ordlistan. Varje objekt innehåller `id`, `sourceEntryId`, `swedish`, `spanish`, `partOfSpeech`, `topic` och `level`.

