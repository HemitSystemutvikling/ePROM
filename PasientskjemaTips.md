# Tips til bygging av pasientskjema

## Hvilke enheter er det som benyttes?

Tall fra helsenorge viser at mellom 70 og 80% av alle skjemautfyllinger skjer ved hjelp av mobile enheter, hovedsaklig mobiltelefon. Det vil si at vi ikke kan anta at pasienten har tastatur, stor skjerm og mus tilgjengelig på utfyllingstidspunktet.

ePROM vil automatisk tilpasse visningen av skjemaet til den enheten pasienten bruker, men det er likevel lurt å tenke på hvilke felttyper som brukes og hvordan disse presenteres. 

## Hva er samleskjema?

Samleskjema er en samling av enkeltskjema som sendes til pasienten i en samlet utsendelse.

Det anbefales at alle skjema som sendes til pasienten er samleskjema. Det gir bedre oversikt og oppdeling for brukeren og også mindre behov for scrolling i et langt enkeltskjema med mange spørsmål. Det gir også mulighet til å gjenbruke standardskjematyper som f.eks. RAND12 eller EQ5D. Disse ligger under katalogen "Felles" i Skjemakatalogen.

## Hvilke felttyper finnes?

- *Valgfelt* kan vises som radioknapper eller nedtrekksmeny. 
- *Tallfelt* kan vises som et inputfelt eller slider/skala. 
- *Datofelt* kan vises som 
  - Dato
  - Dato og tidspunkt
  - Måned og år
  - År
- *Avkrysningsfelt*  
- *Flervalgsfelt* - Ved å plassere flere *Avkrysningsfelt* i samme gruppe, kan disse vises som et flervalgsfelt
- *Tekstfelt* kan vises som tekstboks eller tekstområde
- *Metadata* (beskrevet [her](Skjemabygger#metadata))
- *Metadatatekst* (beskrevet [her](Skjemabygger#metadata))

Hvordan felter skal vises styres under Innstillinger på hvert enkelt felt, med unntak av flervalgsfelt som defineres på gruppenivå.

## Hvilken felttype bør brukes når?

### Generelt for alle felter 
- alle felter må ha et feltnavn og en tittel (tittel kan ikke være på gruppenivå)
- det er mulig å sette styling på feltnavnet (bold og italic)
- obligatoriske felter markeres med * foran feltnavnet (se forhåndsvisning)

### Valgfelt

For et valgfelt er det kun mulig å velge ett (1) alternativ som svar på et spørsmål

For valgfelt finnes to visningsalternativer: 
 - _radioknapper_: anbefales alltid dersom spørsmålet har 2-5 alternativer, og bør være førstevalg 
 - _nedtrekksliste_: anbefales kun i tilfeller med ~ 6 eller flere alternativer.

__Beste praksis er alltid å prøve radioknapper først, før nedtrekksliste velges - spesielt med tanke på mobile enheter__

### Flervalgfelt

Flervalgsfelt brukes i tilfeller der pasienten kan velge 0 til mange alternativ som svar på et spørsmål.

I skjemabyggeren opprettes flervalgsfelt ved å legge til en ny gruppe og krysse av for "Flersvarsfelt" under innstillinger på gruppen. Deretter legges de ønskede alternativene til som avkrysningsbokser i gruppen.

__NB: Gruppen kan ikke inneholde andre typer felt enn avkrysningsbokser.__ Hvis man ønsker å ha regler på avkrysningsboksene for skjuling/visning av andre typer felter, må disse feltene ligge utenfor flervalgsfelt-gruppen.


Fordelen med flervalgsfelt er
 - avkrysningsboksene er plassert tettere og oppfattes dermed av brukeren som svar på ett spørsmål, og ikke som separate spørsmål
 - alle avkrysningsboksene i et flervalgsfelt telles som ett spørsmål i framdriftsvisningen

### Tallfelt

For tallfelt finnes to visningsalternativer:
 - Inputfelt
 - slider/skala

Alle tallfelt kan konfigureres med en min og max-verdi.

#### Slider

Ved bruk av slider anbefales at denne vises i horisontal retning, så lenge maksimal verdi <= 10. 

Dersom slideren har min-verdi på 0 eller 1 vil pasienten også få opp en tilhørende inputfelt hvor verdien kan tastes inn (forutsetter at "Skjul tallverdier" ikke er satt). Det kan være nyttig for pasienter som synes det er vanskelig å krysse av på riktig sted på slideren.

Dersom det er behov for en fullstendig visuell analog skala (uten tall i slideren) velges "Skjul tallverdier" under innstillingene på feltet. Da vil slideren vises uten tall, og pasienten vil ikke se hvilken verdi som blir valgt. Det er mulig å sette på beskrivende tekst i hver ende av slideren.

#### Inputfelt

Ved bruk av inputfelt er det mulig å angi om tallet skal være et heltall eller et desimaltall med opptil 4 desimaler

### Datofelt

Ved bruk av dato med måned og år er det den 1. i måneden som blir satt som reell dato i bakgrunnen, og det er denne datoen som returneres til bestillersystemet.

Ved bruk av dato med kun år er det 1. januar i det aktuelle året som blir satt som reell dato, og det er denne datoen som returneres til bestillersystemet.

### Tekstfelt

Tekstfelt er fritekstfelt uten validering.

Tekstfelt kan vises som tekstboks (én linje) eller tekstområde (6 linjer). Tekstområde brukes f.eks. til kommentarfelt, og bør bare brukes der det er forventet med lengre tekst/flere setninger.


[Tilbake](Skjemabygger)


