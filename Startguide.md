# Startguide

*Sist oppdatert 11.11.2021*

## Hvordan komme igang med ePROM

### Implementere integrasjon mot ePROM i hht [Integrasjonsguiden](Integrasjonsguide)
-	Utsending av skjemabestilling
-	Mottak av skjemabestilling

### Opprette bestillersystem

Registeret må registreres som bestillersystem i ePROM. Dette gjøres av HEMIT, og følgende informasjon må oppgis:
- Telefonnummeret til kontaktperson for bestillersystemet. Sendes med til mottaker av bestillingen (pasienten)
- E-post adressen til kontaktperson for bestillersystemet. (Om ønskelig)
- API base URL

Det er også mulig å legge egendefinert logo på bestillersystemet. 

### Bygge skjema i ePROM
- Vurdere hvilke skjema som skal brukes
-	Opprette egne skjema eller bruke standardskjema som dekker behovet
-	Opprette samleskjema som består av flere enkeltskjema, f.eks. et egendefinert skjema sammen med EQ5D
-	Opprette skjemainformasjon og følgebrev til skjemaet
- [Opplæringsvideo for bruk av ePROM Skjemabygger](https://youtu.be/3vMOpnLnQ80)


### Registeret må ta stilling til:
- regler for utsending og mottak av skjema
- automatisk eller manuell bestilling av skjema
- purringer og utløpsdato
- hvilke kanaler ønsker man å kontakte pasientene på
- skal skjema signeres av pasienten ved levering
- skal skjema være på engelsk i tillegg til norsk
- skal det være mulig å bestille skjema til verge/foreldre/andre (på vegne av pasienten)

De fleste punktene i listen over konfigurereres direkte i selve registeret, ikke i ePROM. Det er en fordel om registeret har en person som er ansvarlig for administrasjon av ePROM.

[Tilbake](./)
