// Domácí úkol 3
// Generátor seznamu zaměstnanců
// Vstupem je počet osob a věkové pásmo, výstupem je pole objektů
// zaměstnanců s náhodně vybranými údaji.

const MALE_NAMES = [
  "Jan", "Petr", "Jakub", "Tomáš", "Martin", "Pavel", "Jiří", "Lukáš",
  "David", "Michal", "Vojtěch", "Matěj", "Adam", "Filip", "Ondřej",
  "Daniel", "Josef", "František", "Karel", "Václav", "Vratislav",
  "Radek", "Zdeněk", "Miroslav", "Roman",
];

const FEMALE_NAMES = [
  "Jana", "Marie", "Eva", "Hana", "Anna", "Lucie", "Kateřina", "Tereza",
  "Petra", "Lenka", "Veronika", "Martina", "Michaela", "Monika", "Pavla",
  "Alena", "Zuzana", "Eliška", "Nikola", "Klára", "Jiřina", "Barbora",
  "Simona", "Denisa", "Adéla",
];

const MALE_SURNAMES = [
  "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera",
  "Veselý", "Horák", "Němec", "Pokorný", "Pospíšil", "Hájek", "Jelínek",
  "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman",
  "Kolář", "Navrátil", "Čermák", "Urban", "Vaněk", "Blažek", "Kříž",
  "Kratochvíl", "Bartoš", "Polák", "Vlček", "Konečný", "Malý", "Holub",
  "Staněk", "Štěpánek", "Sýkora", "Moravec", "Kovář", "Soukup", "Dušek",
  "Tichý", "Kadlec", "Štěrba", "Michalík", "Adamec", "Mareš", "Brož", "Mach",
];

const FEMALE_SURNAMES = [
  "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková",
  "Kučerová", "Veselá", "Horáková", "Němcová", "Pokorná", "Pospíšilová",
  "Hájková", "Jelínková", "Králová", "Růžičková", "Benešová", "Fialová",
  "Sedláčková", "Doležalová", "Zemanová", "Kolářová", "Navrátilová",
  "Čermáková", "Urbanová", "Vaňková", "Blažková", "Křížová", "Kratochvílová",
  "Bartošová", "Poláková", "Vlčková", "Konečná", "Malá", "Holubová",
  "Staňková", "Štěpánková", "Sýkorová", "Moravcová", "Kovářová", "Soukupová",
  "Dušková", "Tichá", "Kadlecová", "Štěrbová", "Michalíková", "Adamcová",
  "Marešová", "Brožová", "Machová",
];

const WORKLOADS = [10, 20, 30, 40];

// Průměrná délka roku v milisekundách
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Vrátí náhodný prvek z předaného pole.
 * @param {Array} array - Pole prvků, ze kterého se vybírá.
 * @returns {*} Náhodně vybraný prvek pole.
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Náhodně zvolí pohlaví se stejnou pravděpodobností.
 * @returns {string} Řetězec "male" nebo "female".
 */
function randomGender() {
  return Math.random() < 0.5 ? "male" : "female";
}

/**
 * Vybere náhodné křestní jméno odpovídající zadanému pohlaví.
 * @param {string} gender - Pohlaví "male" nebo "female".
 * @returns {string} Náhodně vybrané křestní jméno.
 */
function randomName(gender) {
  return gender === "male"
    ? randomItem(MALE_NAMES)
    : randomItem(FEMALE_NAMES);
}

/**
 * Vybere náhodné příjmení odpovídající zadanému pohlaví.
 * @param {string} gender - Pohlaví "male" nebo "female".
 * @returns {string} Náhodně vybrané příjmení.
 */
function randomSurname(gender) {
  return gender === "male"
    ? randomItem(MALE_SURNAMES)
    : randomItem(FEMALE_SURNAMES);
}

/**
 * Vrátí náhodný pracovní úvazek.
 * @returns {number} Hodnota úvazku v hodinách za týden.
 */
function randomWorkload() {
  return randomItem(WORKLOADS);
}

/**
 * Vygeneruje ISO datum narození tak, aby věk osoby ležel
 * v uzavřeném intervalu od minAge do maxAge.
 * @param {number} minAge - Minimální věk v letech.
 * @param {number} maxAge - Maximální věk v letech.
 * @returns {string} Datum narození ve formátu ISO Date-Time.
 */
function randomBirthdate(minAge, maxAge) {
  const now = Date.now();
  const earliestMs = now - maxAge * MS_PER_YEAR;
  const latestMs = now - minAge * MS_PER_YEAR;
  const birthdateMs = earliestMs + Math.random() * (latestMs - earliestMs);
  return new Date(birthdateMs).toISOString();
}

/**
 * Vygeneruje jeden objekt zaměstnance s náhodnými údaji.
 * @param {object} age - Věkový interval.
 * @param {number} age.min - Minimální věk v letech.
 * @param {number} age.max - Maximální věk v letech.
 * @returns {object} Objekt zaměstnance.
 */
function generateEmployee(age) {
  const gender = randomGender();
  return {
    gender,
    birthdate: randomBirthdate(age.min, age.max),
    name: randomName(gender),
    surname: randomSurname(gender),
    workload: randomWorkload(),
  };
}

/**
 * Vygeneruje seznam zaměstnanců podle zadaných vstupních parametrů.
 * @param {object} dtoIn - Vstupní data pro generátor.
 * @param {number} dtoIn.count - Počet zaměstnanců k vygenerování.
 * @param {object} dtoIn.age - Věkový interval generovaných osob.
 * @param {number} dtoIn.age.min - Minimální věk.
 * @param {number} dtoIn.age.max - Maximální věk.
 * @returns {object[]} Pole objektů zaměstnanců.
 */
export function main(dtoIn) {
  // Krok 1: Inicializace prázdného pole pro výsledek
  const employees = [];

  // Krok 2: Opakované generování jednotlivých zaměstnanců
  for (let i = 0; i < dtoIn.count; i++) {
    employees.push(generateEmployee(dtoIn.age));
  }

  return employees;
}
