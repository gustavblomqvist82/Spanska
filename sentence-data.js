(function(root){
const bank={
  "beginner": {
    "title": "Nybörjare",
    "outcome": "Efter den här nivån kan du bygga korta meningar med subjekt, verb och objekt.",
    "sentences": [
      {
        "id": "beginner-01",
        "es": "Yo como pan",
        "sv": "Jag äter bröd"
      },
      {
        "id": "beginner-02",
        "es": "Ella bebe agua",
        "sv": "Hon dricker vatten"
      },
      {
        "id": "beginner-03",
        "es": "El niño lee libros",
        "sv": "Pojken läser böcker"
      },
      {
        "id": "beginner-04",
        "es": "Nosotros vemos gatos",
        "sv": "Vi ser katter"
      },
      {
        "id": "beginner-05",
        "es": "Tú comes una manzana",
        "sv": "Du äter ett äpple"
      },
      {
        "id": "beginner-06",
        "es": "Mi madre canta",
        "sv": "Min mamma sjunger"
      },
      {
        "id": "beginner-07",
        "es": "El gato duerme",
        "sv": "Katten sover"
      },
      {
        "id": "beginner-08",
        "es": "Nosotros vivimos aquí",
        "sv": "Vi bor här"
      },
      {
        "id": "beginner-09",
        "es": "Ana abre la puerta",
        "sv": "Ana öppnar dörren"
      },
      {
        "id": "beginner-10",
        "es": "El profesor habla español",
        "sv": "Läraren talar spanska"
      },
      {
        "id": "beginner-11",
        "es": "Los niños juegan en el parque",
        "sv": "Barnen leker i parken"
      },
      {
        "id": "beginner-12",
        "es": "Yo tengo un perro",
        "sv": "Jag har en hund"
      },
      {
        "id": "beginner-13",
        "es": "Marta escribe una carta",
        "sv": "Marta skriver ett brev"
      },
      {
        "id": "beginner-14",
        "es": "Ellos comen arroz",
        "sv": "De äter ris"
      },
      {
        "id": "beginner-15",
        "es": "La casa tiene una ventana",
        "sv": "Huset har ett fönster"
      }
    ]
  },
  "easy": {
    "title": "Lätt",
    "outcome": "Efter den här nivån kan du placera enkla beskrivningar och tids- eller platsord i en mening.",
    "sentences": [
      {
        "id": "easy-01",
        "es": "La niña come una manzana roja",
        "sv": "Flickan äter ett rött äpple"
      },
      {
        "id": "easy-02",
        "es": "Mi hermano estudia español hoy",
        "sv": "Min bror studerar spanska i dag"
      },
      {
        "id": "easy-03",
        "es": "Nosotros caminamos por el parque",
        "sv": "Vi promenerar genom parken"
      },
      {
        "id": "easy-04",
        "es": "El perro pequeño duerme aquí",
        "sv": "Den lilla hunden sover här"
      },
      {
        "id": "easy-05",
        "es": "El chico prepara una cena deliciosa",
        "sv": "Pojken lagar en utsökt middag"
      },
      {
        "id": "easy-06",
        "es": "Mi amiga compra flores en el mercado",
        "sv": "Min vän köper blommor på marknaden"
      },
      {
        "id": "easy-07",
        "es": "Los estudiantes trabajan juntos en clase",
        "sv": "Eleverna arbetar tillsammans i klassrummet"
      },
      {
        "id": "easy-08",
        "es": "La familia visita a sus abuelos los domingos",
        "sv": "Familjen hälsar på sina morföräldrar på söndagar"
      },
      {
        "id": "easy-09",
        "es": "El autobús llega a la estación a las ocho",
        "sv": "Bussen kommer till stationen klockan åtta"
      },
      {
        "id": "easy-10",
        "es": "Nosotros desayunamos en la terraza",
        "sv": "Vi äter frukost på terrassen"
      },
      {
        "id": "easy-11",
        "es": "Mi padre cocina una sopa caliente",
        "sv": "Min pappa lagar en varm soppa"
      },
      {
        "id": "easy-12",
        "es": "La tienda pequeña abre por la tarde",
        "sv": "Den lilla butiken öppnar på eftermiddagen"
      },
      {
        "id": "easy-13",
        "es": "Los turistas buscan un hotel cerca del centro",
        "sv": "Turisterna letar efter ett hotell nära centrum"
      },
      {
        "id": "easy-14",
        "es": "Ella lleva una chaqueta azul en invierno",
        "sv": "Hon har på sig en blå jacka på vintern"
      },
      {
        "id": "easy-15",
        "es": "El partido empieza después de la cena",
        "sv": "Matchen börjar efter middagen"
      }
    ]
  },
  "medium": {
    "title": "Medel",
    "outcome": "Efter den här nivån kan du bygga frågor och nekande meningar med vanliga verbböjningar.",
    "sentences": [
      {
        "id": "medium-01",
        "es": "¿Dónde vive tu hermana?",
        "sv": "Var bor din syster?"
      },
      {
        "id": "medium-02",
        "es": "No quiero café ahora",
        "sv": "Jag vill inte ha kaffe nu"
      },
      {
        "id": "medium-03",
        "es": "¿Qué hacen ustedes mañana?",
        "sv": "Vad gör ni i morgon?"
      },
      {
        "id": "medium-04",
        "es": "Mis amigos nunca llegan tarde",
        "sv": "Mina vänner kommer aldrig sent"
      },
      {
        "id": "medium-05",
        "es": "¿Por qué estudias español?",
        "sv": "Varför studerar du spanska?"
      },
      {
        "id": "medium-06",
        "es": "No tenemos tiempo esta mañana",
        "sv": "Vi har inte tid i morse"
      },
      {
        "id": "medium-07",
        "es": "¿A qué hora sale el tren?",
        "sv": "Vilken tid går tåget?"
      },
      {
        "id": "medium-08",
        "es": "Los vecinos nunca hacen ruido por la noche",
        "sv": "Grannarna väsnas aldrig på natten"
      },
      {
        "id": "medium-09",
        "es": "Mi hermana no puede venir porque trabaja",
        "sv": "Min syster kan inte komma eftersom hon arbetar"
      },
      {
        "id": "medium-10",
        "es": "¿Quién quiere jugar conmigo?",
        "sv": "Vem vill spela med mig?"
      },
      {
        "id": "medium-11",
        "es": "No encuentro mis llaves en la mochila",
        "sv": "Jag hittar inte mina nycklar i ryggsäcken"
      },
      {
        "id": "medium-12",
        "es": "Cuando hace frío, bebemos té caliente",
        "sv": "När det är kallt dricker vi varmt te"
      },
      {
        "id": "medium-13",
        "es": "¿Cuántos libros has leído este mes?",
        "sv": "Hur många böcker har du läst den här månaden?"
      },
      {
        "id": "medium-14",
        "es": "No me gusta esperar en la fila",
        "sv": "Jag tycker inte om att stå i kö"
      },
      {
        "id": "medium-15",
        "es": "¿Dónde dejaron ustedes las bicicletas?",
        "sv": "Var lämnade ni cyklarna?"
      }
    ]
  },
  "advanced": {
    "title": "Avancerad",
    "outcome": "Efter den här nivån kan du placera pronomen och bindeord i längre meningar med bisatser.",
    "sentences": [
      {
        "id": "advanced-01",
        "es": "Se lo doy cuando llega",
        "sv": "Jag ger det till honom när han kommer"
      },
      {
        "id": "advanced-02",
        "es": "Quiero que me cuentes la verdad",
        "sv": "Jag vill att du berättar sanningen för mig"
      },
      {
        "id": "advanced-03",
        "es": "Aunque llueve, nosotros vamos al mercado",
        "sv": "Även om det regnar går vi till marknaden"
      },
      {
        "id": "advanced-04",
        "es": "La película que vimos ayer fue muy divertida",
        "sv": "Filmen som vi såg i går var mycket rolig"
      },
      {
        "id": "advanced-05",
        "es": "Aunque estoy cansado, termino el ejercicio antes de cenar",
        "sv": "Även om jag är trött gör jag klart övningen före middagen"
      },
      {
        "id": "advanced-06",
        "es": "Mi abuela me cuenta historias que aprendió de su madre",
        "sv": "Min mormor berättar historier för mig som hon lärde sig av sin mamma"
      },
      {
        "id": "advanced-07",
        "es": "Si tenemos tiempo, visitaremos el museo que está junto al río",
        "sv": "Om vi har tid besöker vi museet som ligger vid floden"
      },
      {
        "id": "advanced-08",
        "es": "No sabía que tu hermana ya había llegado a casa",
        "sv": "Jag visste inte att din syster redan hade kommit hem"
      },
      {
        "id": "advanced-09",
        "es": "El libro que me recomendaste explica cómo se prepara este plato",
        "sv": "Boken som du rekommenderade förklarar hur man lagar den här rätten"
      },
      {
        "id": "advanced-10",
        "es": "Mientras los niños juegan en el jardín, nosotros ponemos la mesa",
        "sv": "Medan barnen leker i trädgården dukar vi bordet"
      },
      {
        "id": "advanced-11",
        "es": "Quiero saber si puedes ayudarme con la tarea que tenemos para mañana",
        "sv": "Jag vill veta om du kan hjälpa mig med läxan som ska vara klar till i morgon"
      },
      {
        "id": "advanced-12",
        "es": "La profesora nos pidió que escribiéramos una historia sobre un viaje",
        "sv": "Läraren bad oss skriva en berättelse om en resa"
      },
      {
        "id": "advanced-13",
        "es": "Después de que termine la película, iremos a buscar algo de comer",
        "sv": "När filmen är slut går vi och letar efter något att äta"
      },
      {
        "id": "advanced-14",
        "es": "Aunque no conozco bien la ciudad, puedo encontrar la estación",
        "sv": "Även om jag inte känner staden så bra kan jag hitta stationen"
      },
      {
        "id": "advanced-15",
        "es": "Mi amigo dijo que llamaría cuando llegara a la oficina",
        "sv": "Min vän sa att han skulle ringa när han kom till kontoret"
      }
    ]
  }
};
if(typeof module!=="undefined"&&module.exports)module.exports=bank;
root.HolaSentenceBank=bank;
})(typeof window!=="undefined"?window:globalThis);
