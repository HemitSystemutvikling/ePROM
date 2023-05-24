# Endringer i ePROM v10.0
*Dato: 01. juni 2023*

### Pasientskjema
- Språk: Forbedring av ordlyd for polske skjema


### ePROM admin
- Bestillersystem: det er mulig å angi på bestillersystemet om det er knyttet til forskning, da det er mulig å reservere seg mot dette på helsenorge
  - Alle eFORSK-bestillersystem er default satt med denne innstillingen
  - Funksjonalitet ennå ikke implementert på helsenorge, så denne er foreløpig ikke i bruk 
- Bestillersystem: forbedring i registrering av partkode, reservasjon og samtykke. Må sette og lagre partkode før det er mulig å registrere reservasjon og/eller samtykke 
- Skjemakatalog: optimalisering ved at admin må velge et spesifikt bestillersystem for å se skjema
- ePROM-rapport: ny rapport viser antall bestillinger per bestillersystem for siste 3 måneder, sortert per måned. Sendes til systemutvikling@hemit.no den 1. i hver måned


### Teknisk
- Hangfire: prioritering av køer med fokus på å få gjennomført alle steg i en enkelt bestilling så raskt som mulig
- Ny integrasjon med digital postkasse: Digitale skjema og brev (både digitale og fysiske) sendes nå via digdir sitt REST API
- Papirskjema: bestilling av papirskjema sendes direkte til digipost/Posten, ikke digdir
- Jobb som leser brev fra Andvord via digipost kjøres en gang i døgnet, tidligere hver halvtime
- Forbedret parsing av XML i brev fra Andvord
- Personiniterte skjema: sender med bestillingsdato-timestamp på format UTC til bestillersystemet 


[Tilbake](./Releaselist)
