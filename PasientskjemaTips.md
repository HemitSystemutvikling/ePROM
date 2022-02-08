# Tips til bygging av pasientskjema

## Hvilke enheter er det som benyttes?

Tall fra helsenorge viser at mellom 70 og 80% av alle skjemautfyllinger skjer ved hjelp av mobile enheter, hovedsaklig mobiltelefon. Det vil si at vi ikke kan anta at pasienten har tastatur, stor skjerm og mus tilgjengelig på utfyllingstidspunktet.

I skjemabyggingen bør det dermed tas hensyn til at flesteparten av skjemaene fylles ut på mobile enheter. 

## Samleskjema 

Dersom skjema består av flere deler med ulike fokusområder anbefaler vi at skjema bygges som et samleskjema. Det gir bedre oversikt for brukeren og også mindre behov for scrolling i et langt skjema med mange spørsmål.

## Hvilken felttype skal jeg bruke?

### Metadata

Metadata er informasjon som kan sendes med i bestillingen og benyttes i skjemaet og i følgebrevet. 
Et vanlig eksempel er at pasientens kjønn sendes med bestillingen og brukes til å vise/skjule felter i skjemaet automatisk, og pasienten slipper dermed å svare på unødvendige kontrollspørsmål.

### Valgfelt

For et valgfelt er det kun mulig å velge ett (1) alternativ som svar på et spørsmål

For valgfelt finnes to visningsalternativer: 
 - _radioknapper_: anbefales alltid dersom spørsmålet har 2-5 alternativer, og bør være førstevalg 
 - _nedtrekksliste_: anbefales kun i tilfeller med ~ 6 eller flere alternativer.

Beste praksis er alltid å prøve radioknapper først, før nedtrekksliste velges

### Flervalgfelt

Flervalgsfelt brukes i tilfeller der pasienten kan velge 0 til mange alternativ som svar på et spørsmål.

I skjemabyggeren opprettes flervalgsfelt ved å legge til en ny gruppe og krysse av for "Flersvarsfelt" under innstillinger på gruppen
Deretter legges de ønskede alternativene til som avkrysningsbokser i gruppen.
Gruppen kan ikke inneholde andre felt enn avkrysningsbokser.
Fordelen med flervalgsfelt er
 - avkrysningsboksene er plassert tettere og oppfattes dermed av brukeren som svar på ett spørsmål, og ikke som separate spørsmål
 - alle avkrysningsboksene i et flervalgsfelt telles som ett spørsmål i framdriftsvisningen _NB: telling gjelder fra og med ePROM v7.0_

### Tallfelt

For tallfelt finnes to visningsalternativer:
 - tallfelt
 - slider/skala

#### Slider

Ved bruk av slider anbefales at denne vises i horisontal retning, så lenge maksimal verdi <= 10. 
Dersom det er behov for en fullstendig visuell analog skala (uten tall) velges "Skjul tallverdier" under innstillingene på feltet. Da vil slideren vises uten tall, men det er mulig å sette på beskrivende tekst i hver ende.




###





