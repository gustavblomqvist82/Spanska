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

- [Instituto Cervantes: Plan Curricular, funktioner på nivå A1–A2](https://cvc.cervantes.es/ENSENANZA/biblioteca_ele/plan_curricular/niveles/05_funciones_inventario_a1-a2.htm) innehåller exempel på hälsningsfrasen `Hola, ¿qué tal?` och svar med `gracias`. Vid kontroll 2026-11-15 omdirigerade sidan till en tillfällig underhållssida; uppgifterna stämmer med sidans indexerade innehåll.
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

Exempelbanken innehåller 15 meningar i vart och ett av webbplatsens fyra egna träningssteg. Samtliga är redaktionella exempel skrivna för webbplatsen:

1. `Yo como pan` — Jag äter bröd.
2. `Ella bebe agua` — Hon dricker vatten.
3. `El niño lee libros` — Pojken läser böcker.
4. `Nosotros vemos gatos` — Vi ser katter.
5. `Tú comes una manzana` — Du äter ett äpple.
6. `Mi madre canta` — Min mamma sjunger.
7. `El gato duerme` — Katten sover.
8. `Nosotros vivimos aquí` — Vi bor här.
9. `Ana abre la puerta` — Ana öppnar dörren.
10. `El profesor habla español` — Läraren talar spanska.
11. `Los niños juegan en el parque` — Barnen leker i parken.
12. `Yo tengo un perro` — Jag har en hund.
13. `Marta escribe una carta` — Marta skriver ett brev.
14. `Ellos comen arroz` — De äter ris.
15. `La casa tiene una ventana` — Huset har ett fönster.
16. `La niña come una manzana roja` — Flickan äter ett rött äpple.
17. `Mi hermano estudia español hoy` — Min bror studerar spanska i dag.
18. `Nosotros caminamos por el parque` — Vi promenerar genom parken.
19. `El perro pequeño duerme aquí` — Den lilla hunden sover här.
20. `El chico prepara una cena deliciosa` — Pojken lagar en utsökt middag.
21. `Mi amiga compra flores en el mercado` — Min vän köper blommor på marknaden.
22. `Los estudiantes trabajan juntos en clase` — Eleverna arbetar tillsammans i klassrummet.
23. `La familia visita a sus abuelos los domingos` — Familjen hälsar på sina morföräldrar på söndagar.
24. `El autobús llega a la estación a las ocho` — Bussen kommer till stationen klockan åtta.
25. `Nosotros desayunamos en la terraza` — Vi äter frukost på terrassen.
26. `Mi padre cocina una sopa caliente` — Min pappa lagar en varm soppa.
27. `La tienda pequeña abre por la tarde` — Den lilla butiken öppnar på eftermiddagen.
28. `Los turistas buscan un hotel cerca del centro` — Turisterna letar efter ett hotell nära centrum.
29. `Ella lleva una chaqueta azul en invierno` — Hon har på sig en blå jacka på vintern.
30. `El partido empieza después de la cena` — Matchen börjar efter middagen.
31. `¿Dónde vive tu hermana?` — Var bor din syster?.
32. `No quiero café ahora` — Jag vill inte ha kaffe nu.
33. `¿Qué hacen ustedes mañana?` — Vad gör ni i morgon?.
34. `Mis amigos nunca llegan tarde` — Mina vänner kommer aldrig sent.
35. `¿Por qué estudias español?` — Varför studerar du spanska?.
36. `No tenemos tiempo esta mañana` — Vi har inte tid i morse.
37. `¿A qué hora sale el tren?` — Vilken tid går tåget?.
38. `Los vecinos nunca hacen ruido por la noche` — Grannarna väsnas aldrig på natten.
39. `Mi hermana no puede venir porque trabaja` — Min syster kan inte komma eftersom hon arbetar.
40. `¿Quién quiere jugar conmigo?` — Vem vill spela med mig?.
41. `No encuentro mis llaves en la mochila` — Jag hittar inte mina nycklar i ryggsäcken.
42. `Cuando hace frío, bebemos té caliente` — När det är kallt dricker vi varmt te.
43. `¿Cuántos libros has leído este mes?` — Hur många böcker har du läst den här månaden?.
44. `No me gusta esperar en la fila` — Jag tycker inte om att stå i kö.
45. `¿Dónde dejaron ustedes las bicicletas?` — Var lämnade ni cyklarna?.
46. `Se lo doy cuando llega` — Jag ger det till honom när han kommer.
47. `Quiero que me cuentes la verdad` — Jag vill att du berättar sanningen för mig.
48. `Aunque llueve, nosotros vamos al mercado` — Även om det regnar går vi till marknaden.
49. `La película que vimos ayer fue muy divertida` — Filmen som vi såg i går var mycket rolig.
50. `Aunque estoy cansado, termino el ejercicio antes de cenar` — Även om jag är trött gör jag klart övningen före middagen.
51. `Mi abuela me cuenta historias que aprendió de su madre` — Min mormor berättar historier för mig som hon lärde sig av sin mamma.
52. `Si tenemos tiempo, visitaremos el museo que está junto al río` — Om vi har tid besöker vi museet som ligger vid floden.
53. `No sabía que tu hermana ya había llegado a casa` — Jag visste inte att din syster redan hade kommit hem.
54. `El libro que me recomendaste explica cómo se prepara este plato` — Boken som du rekommenderade förklarar hur man lagar den här rätten.
55. `Mientras los niños juegan en el jardín, nosotros ponemos la mesa` — Medan barnen leker i trädgården dukar vi bordet.
56. `Quiero saber si puedes ayudarme con la tarea que tenemos para mañana` — Jag vill veta om du kan hjälpa mig med läxan som ska vara klar till i morgon.
57. `La profesora nos pidió que escribiéramos una historia sobre un viaje` — Läraren bad oss skriva en berättelse om en resa.
58. `Después de que termine la película, iremos a buscar algo de comer` — När filmen är slut går vi och letar efter något att äta.
59. `Aunque no conozco bien la ciudad, puedo encontrar la estación` — Även om jag inte känner staden så bra kan jag hitta stationen.
60. `Mi amigo dijo que llamaría cuando llegara a la oficina` — Min vän sa att han skulle ringa när han kom till kontoret.

### Stavningsövningens ordlista

Stavningsspelets ord är ett redaktionellt urval av övningsord, separat från Lexin-baserade poster i `wordbank.js`. Stavningarna kontrolleras mot RAE/ASALE:s [Diccionario de la lengua española (DLE)](https://dle.rae.es/), med ordlänkar nedan. RAE:s [Ortografía de la lengua española](https://www.rae.es/diccionario-estudiante/docs/ortografia.pdf) beskriver bland annat tilde, diéresis, b/v och g/j samt att uttalet av c, s och z varierar mellan regionala varieteter. Spelets etiketter beskriver stavningsmönster; de innebär inte att dessa bokstäver uttalas olika i alla spansktalande områden.

- **Nybörjare:** [sol](https://dle.rae.es/sol), [mar](https://dle.rae.es/mar), [pan](https://dle.rae.es/pan), [flor](https://dle.rae.es/flor), [luz](https://dle.rae.es/luz), [casa](https://dle.rae.es/casa).
- **Lätt:** [queso](https://dle.rae.es/queso), [parque](https://dle.rae.es/parque), [guitarra](https://dle.rae.es/guitarra), [amiga](https://dle.rae.es/amiga), [pequeño](https://dle.rae.es/peque%C3%B1o), [guerra](https://dle.rae.es/guerra).
- **Medel:** [árbol](https://dle.rae.es/%C3%A1rbol), [también](https://dle.rae.es/tambi%C3%A9n), [zapato](https://dle.rae.es/zapato), [jirafa](https://dle.rae.es/jirafa), [ventana](https://dle.rae.es/ventana), [canción](https://dle.rae.es/canci%C3%B3n), [sopa](https://dle.rae.es/sopa), [gato](https://dle.rae.es/gato).
- **Avancerad:** [vergüenza](https://dle.rae.es/verg%C3%BCenza), [pingüino](https://dle.rae.es/ping%C3%BCino), [averiguación](https://dle.rae.es/averiguaci%C3%B3n), [desagüe](https://dle.rae.es/desag%C3%BCe), [antigüedad](https://dle.rae.es/antig%C3%BCedad), [lingüística](https://dle.rae.es/ling%C3%BC%C3%ADstica).

Uppläsningen begärs via webbläsarens talsyntes med språktaggen `es-MX`, i linje med Lexin-ordlistans huvudsakliga fokus på amerikansk spanska. Tillgängliga röster och uttal varierar mellan webbläsare och enheter; spelet visar därför också ordets rätta stavning efter kontroll.


## Konton, barns personuppgifter och teknisk drift

- [Integritetsskyddsmyndigheten (IMY): Personuppgifter om barn](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/introduktion-till-gdpr/personuppgifter/personuppgifter-om-barn/) beskriver bland annat att vårdnadshavares samtycke krävs när en onlinetjänst behandlar personuppgifter med stöd av samtycke för barn under 13 år, samt att informationen ska vara tydlig och begriplig. Webbplatsens registreringsintyg kontrollerar inte i sig vårdnadshavarens identitet.
- [Supabase: API keys](https://supabase.com/docs/guides/getting-started/api-keys) är teknisk referens för publishable keys och secret keys. Secret keys kan kringgå RLS och får därför bara användas på servern.
- [Vercel Functions](https://vercel.com/docs/functions) är teknisk referens för serverfunktionerna i `/api`. Dessa leverantörskällor beskriver teknisk konfiguration, inte utbildningsinnehåll.
