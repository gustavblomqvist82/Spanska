/*
 * Shared Swedish–Spanish word data for every game on this site.
 * The selected headword/translation pairs are adapted from Lexin (see SOURCES.md).
 * The API stays intentionally small and framework-free so any game can reuse it.
 */
(function (global) {
  'use strict';

  const entries = [
    { id: 'hej', swedish: 'Hej', spanish: '¡Hola!', partOfSpeech: 'interjektion', topic: 'hälsningar', level: 'A1' },
    { id: 'vatten', swedish: 'Vatten', spanish: 'agua', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'hund', swedish: 'Hund', spanish: 'perro', partOfSpeech: 'substantiv', topic: 'djur', level: 'A1' },
    { id: 'katt', swedish: 'Katt', spanish: 'gato', partOfSpeech: 'substantiv', topic: 'djur', level: 'A1' },
    { id: 'hus', swedish: 'Hus', spanish: 'casa', partOfSpeech: 'substantiv', topic: 'hem', level: 'A1' },
    { id: 'bok', swedish: 'Bok', spanish: 'libro', partOfSpeech: 'substantiv', topic: 'skola', level: 'A1' },
    { id: 'äpple', swedish: 'Äpple', spanish: 'manzana', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'mjölk', swedish: 'Mjölk', spanish: 'leche', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'vän', swedish: 'Vän', spanish: 'amigo', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'bröd', swedish: 'Bröd', spanish: 'pan', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'sol', swedish: 'Sol', spanish: 'sol', partOfSpeech: 'substantiv', topic: 'natur', level: 'A1' },
    { id: 'ja', swedish: 'Ja', spanish: 'sí', partOfSpeech: 'interjektion', topic: 'vardagsord', level: 'A1' },
    { id: 'nej', swedish: 'Nej', spanish: 'no', partOfSpeech: 'interjektion', topic: 'vardagsord', level: 'A1' },
    { id: 'kvinna', swedish: 'Kvinna', spanish: 'mujer', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'man', swedish: 'Man', spanish: 'hombre', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'barn', swedish: 'Barn', spanish: 'niño', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'familj', swedish: 'Familj', spanish: 'familia', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'mamma', swedish: 'Mamma', spanish: 'mamá', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'pappa', swedish: 'Pappa', spanish: 'papá', partOfSpeech: 'substantiv', topic: 'människor', level: 'A1' },
    { id: 'mat', swedish: 'Mat', spanish: 'comida', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'frukost', swedish: 'Frukost', spanish: 'desayuno', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'ost', swedish: 'Ost', spanish: 'queso', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'ris', swedish: 'Ris', spanish: 'arroz', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'kyckling', swedish: 'Kyckling', spanish: 'pollo', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'fisk', swedish: 'Fisk', spanish: 'pescado', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'kaffe', swedish: 'Kaffe', spanish: 'café', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'te', swedish: 'Te', spanish: 'té', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'banan', swedish: 'Banan', spanish: 'plátano', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'apelsin', swedish: 'Apelsin', spanish: 'naranja', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'socker', swedish: 'Socker', spanish: 'azúcar', partOfSpeech: 'substantiv', topic: 'mat och dryck', level: 'A1' },
    { id: 'stad', swedish: 'Stad', spanish: 'ciudad', partOfSpeech: 'substantiv', topic: 'platser', level: 'A1' },
    { id: 'skola', swedish: 'Skola', spanish: 'escuela', partOfSpeech: 'substantiv', topic: 'platser', level: 'A1' },
    { id: 'butik', swedish: 'Butik', spanish: 'tienda', partOfSpeech: 'substantiv', topic: 'platser', level: 'A1' },
    { id: 'bil', swedish: 'Bil', spanish: 'automóvil', partOfSpeech: 'substantiv', topic: 'transport', level: 'A1' },
    { id: 'tåg', swedish: 'Tåg', spanish: 'tren', partOfSpeech: 'substantiv', topic: 'transport', level: 'A1' },
    { id: 'tid', swedish: 'Tid', spanish: 'tiempo', partOfSpeech: 'substantiv', topic: 'vardagsord', level: 'A1' },
    { id: 'dag', swedish: 'Dag', spanish: 'día', partOfSpeech: 'substantiv', topic: 'tid', level: 'A1' },
    { id: 'natt', swedish: 'Natt', spanish: 'noche', partOfSpeech: 'substantiv', topic: 'tid', level: 'A1' },
    { id: 'vecka', swedish: 'Vecka', spanish: 'semana', partOfSpeech: 'substantiv', topic: 'tid', level: 'A1' },
    { id: 'stor', swedish: 'Stor', spanish: 'grande', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'liten', swedish: 'Liten', spanish: 'pequeño', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'bra', swedish: 'Bra', spanish: 'bueno', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'dålig', swedish: 'Dålig', spanish: 'malo', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'vacker', swedish: 'Vacker', spanish: 'bello', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'glad', swedish: 'Glad', spanish: 'contento', partOfSpeech: 'adjektiv', topic: 'känslor', level: 'A1' },
    { id: 'trött', swedish: 'Trött', spanish: 'cansado', partOfSpeech: 'adjektiv', topic: 'känslor', level: 'A1' },
    { id: 'varm', swedish: 'Varm', spanish: 'caliente', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'kall', swedish: 'Kall', spanish: 'frío', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'snabb', swedish: 'Snabb', spanish: 'rápido', partOfSpeech: 'adjektiv', topic: 'beskrivningar', level: 'A1' },
    { id: 'jag', swedish: 'Jag', spanish: 'yo', partOfSpeech: 'pronomen', topic: 'människor', level: 'A1' },
    { id: 'du', swedish: 'Du', spanish: 'tú', partOfSpeech: 'pronomen', topic: 'människor', level: 'A1' },
    { id: 'vi', swedish: 'Vi', spanish: 'nosotros', partOfSpeech: 'pronomen', topic: 'människor', level: 'A1' },
    { id: 'röd', swedish: 'Röd', spanish: 'rojo', partOfSpeech: 'adjektiv', topic: 'färger', level: 'A1' },
    { id: 'blå', swedish: 'Blå', spanish: 'azul', partOfSpeech: 'adjektiv', topic: 'färger', level: 'A1' },
    { id: 'grön', swedish: 'Grön', spanish: 'verde', partOfSpeech: 'adjektiv', topic: 'färger', level: 'A1' },
    { id: 'svart', swedish: 'Svart', spanish: 'negro', partOfSpeech: 'adjektiv', topic: 'färger', level: 'A1' },
    { id: 'vit', swedish: 'Vit', spanish: 'blanco', partOfSpeech: 'adjektiv', topic: 'färger', level: 'A1' },
    { id: 'regn', swedish: 'Regn', spanish: 'lluvia', partOfSpeech: 'substantiv', topic: 'natur', level: 'A1' },
    { id: 'öga', swedish: 'Öga', spanish: 'ojo', partOfSpeech: 'substantiv', topic: 'kroppen', level: 'A1' },
    { id: 'hand', swedish: 'Hand', spanish: 'mano', partOfSpeech: 'substantiv', topic: 'kroppen', level: 'A1' },
    { id: 'huvud', swedish: 'Huvud', spanish: 'cabeza', partOfSpeech: 'substantiv', topic: 'kroppen', level: 'A1' },
    { id: 'hjärta', swedish: 'Hjärta', spanish: 'corazón', partOfSpeech: 'substantiv', topic: 'kroppen', level: 'A1' }
  ];

  // IDs refer to Word/@ID in the Lexin XML snapshot (Version 2010-07-07).
  // Keep them with returned records so future games can trace each selected entry.
  const sourceEntryIds = {
    hej: '6181', vatten: '18603', hund: '6428', katt: '7664', hus: '6447', bok: '1974',
    äpple: '19570', mjölk: '10096', vän: '19128', bröd: '2298', sol: '15193', ja: '7272',
    nej: '10607', kvinna: '8691', man: '9644', barn: '1177', familj: '3845', mamma: '9641',
    pappa: '11603', mat: '9765', frukost: '4539', ost: '11442', ris: '13099', kyckling: '8715',
    fisk: '4096', kaffe: '7467', te: '16755', banan: '1124', apelsin: '562', socker: '15181',
    stad: '15545', skola: '14346', butik: '2383', bil: '1713', tåg: '17680', tid: '16878',
    dag: '2664', natt: '10527', vecka: '18626', stor: '15757', liten: '9138', bra: '2111',
    dålig: '3306', vacker: '18406', glad: '5580', trött: '17497', varm: '18565', kall: '7495',
    snabb: '15014', jag: '7278', du: '3214', vi: '18719', röd: '13464', blå: '1910',
    grön: '5867', svart: '16222', vit: '18912', regn: '12814', öga: '19621', hand: '6086',
    huvud: '6473', hjärta: '6353'
  };

  const copy = (entry) => ({ ...entry, sourceEntryId: sourceEntryIds[entry.id] });
  const matches = (value, expected) => expected == null || (Array.isArray(expected) ? expected.includes(value) : value === expected);
  const getWords = (filters = {}) => entries
    .filter((entry) => matches(entry.topic, filters.topic) && matches(entry.level, filters.level) && matches(entry.partOfSpeech, filters.partOfSpeech))
    .map(copy);
  const getWord = (id) => {
    const entry = entries.find((candidate) => candidate.id === id);
    return entry ? copy(entry) : null;
  };
  const getRandomWord = (filters = {}) => {
    const candidates = getWords(filters).filter((entry) => entry.id !== filters.excludeId);
    return candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;
  };
  const getDistractors = (correctId, count = 3, filters = {}) => {
    const candidates = getWords(filters).filter((entry) => entry.id !== correctId);
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    return candidates.slice(0, Math.max(0, count));
  };

  global.HolaWordBank = Object.freeze({
    version: '1.0.0',
    source: 'Lexin: Svensk-spanskt lexikon (Institutet för språk och folkminnen / Språkrådet), CC BY 4.0',
    getWords,
    getWord,
    getRandomWord,
    getDistractors
  });
})(window);
