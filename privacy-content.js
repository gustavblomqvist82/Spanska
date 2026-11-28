(function(root){
  const paragraphs=[
    "Webbplatsen behandlar användarnamn, smeknamn, kontots användar-id, vårdnadshavarens intyg om samtycke samt quizresultat och tidpunkt. Lösenord skickas till Supabase Auth för inloggning och lagras där enligt Supabases hantering. De sparas inte i klartext i webbplatsens egna tabeller. Konton använder en intern teknisk adress av typen @konto.invalid.",
    "Uppgifterna används för inloggning, familjehantering och för att spara övningsresultat. Föräldrakontot kan skapa barnkonton. Teknisk drift kan medföra loggar hos våra driftleverantörer.",
    "Kontakt för frågor eller begäran om radering: spanskasidan.kontakt@gmail.com.",
    "IMY beskriver särskilda regler när barns personuppgifter behandlas med stöd av samtycke. För barn under 13 år ska vårdnadshavaren lämna samtycke. Vårt formulärintyg verifierar inte vårdnadshavarens identitet; lösningen behöver därför ses över före bred publik användning.",
    "Vårdnadshavaren ansvarar för att läsa denna information före kontoskapande. Föräldern kan radera barnkonton och hela familjekontot i kontosidan. Begäran om registerutdrag hanteras via kontaktadressen."
  ];
  root.HolaPrivacy={
    render:function(target){
      target.replaceChildren();
      paragraphs.forEach(function(text){const p=document.createElement("p");p.textContent=text;target.append(p);});
      const sourceP=document.createElement("p");
      sourceP.append("Se ");
      const imy=document.createElement("a");imy.href="https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/introduktion-till-gdpr/personuppgifter/personuppgifter-om-barn/";imy.textContent="IMY:s information om barns personuppgifter";sourceP.append(imy," och ");
      const sources=document.createElement("a");sources.href="SOURCES.md";sources.textContent="övriga källor";sourceP.append(sources,".");
      target.append(sourceP);
    }
  };
})(window);