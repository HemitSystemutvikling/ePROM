# Tips til bygging av pasientskjema

## Hvilke enheter er det som benyttes?

Tall fra helsenorge viser at mellom 70 og 80% av alle skjemautfyllinger skjer ved hjelp av mobile enheter, hovedsaklig mobiltelefon. Det vil si at vi ikke kan anta at pasienten har tastatur, stor skjerm og mus tilgjengelig på utfyllingstidspunktet.

I skjemabyggingen bør det dermed tas hensyn til at flesteparten av skjemaene fylles ut på mobile enheter. 

## Skal jeg ha samleskjema?

Det anbefales at alle skjema bygges som samleskjema. Det gir bedre oversikt og oppdeling for brukeren og også mindre behov for scrolling i et langt enkeltskjema med mange spørsmål.

## Hvilke felttyper finnes?

- *Valgfelt* kan vises som radioknapper eller nedtrekksmeny. 
- *Tallfelt* kan vises som et inputfelt eller slider. 
- *Datofelt* kan vises som 
  - Dato
  - Dato og tidspunkt
  - Måned og år
  - År
- *Avkrysningsfelt*  
- *Flervalgsfelt* - Ved å plassere flere *Avkrysningsfelt* i samme gruppe, kan disse vises som et flervalgsfelt
- *Metadata* (beskrevet [her](Skjemabygger#metadata))
- *Metadatatekst* (beskrevet [her](Skjemabygger#metadata))

Hvordan felter skal vises styres under Innstillinger på hvert enkelt felt, med unntak av flervalgsfelt som defineres på gruppenivå.

## Hvilken felttype skal jeg bruke?

### Valgfelt

For et valgfelt er det kun mulig å velge ett (1) alternativ som svar på et spørsmål

For valgfelt finnes to visningsalternativer: 
 - _radioknapper_: anbefales alltid dersom spørsmålet har 2-5 alternativer, og bør være førstevalg 
 - _nedtrekksliste_: anbefales kun i tilfeller med ~ 6 eller flere alternativer.

__Beste praksis er alltid å prøve radioknapper først, før nedtrekksliste velges__

### Flervalgfelt

Flervalgsfelt brukes i tilfeller der pasienten kan velge 0 til mange alternativ som svar på et spørsmål.

I skjemabyggeren opprettes flervalgsfelt ved å legge til en ny gruppe og krysse av for "Flersvarsfelt" under innstillinger på gruppen. Deretter legges de ønskede alternativene til som avkrysningsbokser i gruppen.

__NB: Gruppen kan ikke inneholde andre typer felt enn avkrysningsbokser.__ Hvis man ønsker å ha regler på avkrysningsboksene for skjuling/visning av andre typer felter, må disse feltene ligge utenfor flervalgsfelt-gruppen.


Fordelen med flervalgsfelt er
 - avkrysningsboksene er plassert tettere og oppfattes dermed av brukeren som svar på ett spørsmål, og ikke som separate spørsmål
 - alle avkrysningsboksene i et flervalgsfelt telles som ett spørsmål i framdriftsvisningen

### Tallfelt

For tallfelt finnes to visningsalternativer:
 - tallboks
 - slider/skala

Alle tallfelt kan konfigureres med en min og max-verdi.

#### Slider

Ved bruk av slider anbefales at denne vises i horisontal retning, så lenge maksimal verdi <= 10. 

Dersom slideren har min-verdi på 0 eller 1 vil pasienten også få opp en tilhørende tallboks hvor verdien kan tastes inn (forutsetter at "Skjul tallverdier" ikke er satt). Det kan være nyttig for pasienter som synes det er vanskelig å krysse av på riktig sted på slideren.

Dersom det er behov for en fullstendig visuell analog skala (uten tall i slideren) velges "Skjul tallverdier" under innstillingene på feltet. Da vil slideren vises uten tall, og pasienten vil ikke se hvilken verdi som blir valgt. Det er mulig å sette på beskrivende tekst i hver ende av slideren.

#### Tallboks

Ved bruk av tallboks er det mulig å angi om tallet skal være et heltall eller et desimaltall med opptil 4 desimaler


## Hvordan lager jeg papirskjema?

Papirskjema genereres ved å velge "Papirformat aktivert" under skjemainnstillinger. 

Det er mulig å velge at felter skal skjules og vises kun for papir. Det kan f.eks. være utfyllende hjelpetekst som er nødvendig for papir.
Det er også mulig å angi sideskift etter spesifikke felter i et papirskjema

[Tilbake](Skjemabygger)


