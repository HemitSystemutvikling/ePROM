# Startguide

*Sist oppdatert 28.01.2022*

## Hvordan komme igang med ePROM

### Opprette bestillersystem og brukere

Ta kontakt på <eprom@hemit.no> for å opprette bestillersystem og brukere til ePROM skjemabygger. Bruker til ePROM skjemabygger er ikke nødvendig dersom bestillersystemet kun skal sende ut brev.

__Følgende informasjon må alltid oppgis:__
- Navn på bestillersystemet
- API base URL for mottakstjenesten
- En kort beskrivelse av bruksområde, inkl: 
  - skjemautsending og/eller brevutsending 

__Følgende informasjon må oppgis i henvendelsen dersom bestillersystemet skal gjøre skjemabestillinger:__
- Telefonnummeret til kontaktperson for bestillersystemet (til bruk av mottaker av skjema, dvs pasienten)

  _- I tillegg er følgende informasjon valgfri:_ 
  -  Egendefinert logo på bestillersystemet. 
  -  E-post-adresse som kontaktinfo for bestillersystemet (ikke anbefalt mtp sensitive data)

__Følgende informasjon blir sendt i retur fra Hemit:__
- API nøkkel
- brukernavn og passord for å benytte skjemabygger (for utsending av skjema)

### Implementere integrasjon mot ePROM i hht [Integrasjonsguiden](Integrasjonsguide)
-	Utsending av skjemabestilling
-	Mottak av skjemabestilling
-	Utsending av brev

### Bygge skjema i ePROM
- Vurdere hvilke skjema som skal brukes
-	Opprette egne skjema eller bruke standardskjema som dekker behovet
-	Opprette samleskjema som består av ett eller flere enkeltskjema, f.eks. et egendefinert skjema sammen med EQ5D
-	Opprette skjemainformasjon og følgebrev til skjemaet
- [Opplæringsvideo for bruk av ePROM Skjemabygger](https://youtu.be/3vMOpnLnQ80)


#### I forbindelse med skjemabygging må registeret må ta stilling til:
- regler for utsending og mottak av skjema
- automatisk eller manuell bestilling av skjema
- purringer og utløpsdato
- hvilke kanaler ønsker man å kontakte pasientene på
- skal skjema signeres av pasienten ved levering
- skal skjema være på engelsk i tillegg til norsk
- skal det være mulig å bestille skjema til verge/foreldre/andre (på vegne av pasienten)

De fleste punktene i listen over konfigurereres direkte i selve registeret, ikke i ePROM. Det er en fordel om registeret har en ePROM-ansvarlig som kan være kontaktpunkt ved henvendelser til og fra Hemit.

[Tilbake](./)
