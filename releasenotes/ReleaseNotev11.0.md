# Endringer i ePROM v11.0
*Dato: 25. september

### Innbyggerpålogging og skjemautfyller
- Ved utfylling av pasientskjema via helsenorge benyttes Helsenorge OIDC som støtter SSO (single-sign on) med helsenorge-appen
- Ved utfylling av pasientskjema via Digipost benyttes ID-porten OIDC som støtter SSO med bl.a. Digipost-appen
- Pasientskjema: Knapper som er disablet er fjernet slik at det skal bli mer intuitivt å navigere i skjema
- Samleskjema: "Skjul progressbar" på Samleskjema skjuler tellingen, men viser ikonene 
- Pasientskjema på Android: Fiks slik at utfylling av tallfelt ikke gir "Ugyldig tegn"
- Pasientskjema: Fiks på visning av slider.

### ePROM admin
- Skjemabygger: for felttype tekstområde er det mulig å legge til lenker, vha syntaks #a#https://www.www.www#a#
- ePROM-rapport: fiks av minneproblem ved generering av rapporten

### Teknisk
- Skjemautfyller (public ePROM) er oppgradert til .NET 6
- Hangfire:
  - Jobbene skal kjøre i henhold til lokalt tid på serveren
  - Fiks av ryddejobb som sletter utgåtte skjema, slik at en restart ikke sletter dobbelt
- Feilretting: Hvis bestillersystem sender bestilling til en død person vil ePROM videresende svar fra helsenorge "Personen kan ikke nås"
- Forhåndsvisning av pasientskjema og skjemainformasjon. URL endret til hhv:
  - Pasientskjema: https://pasientrapportering.nhn.no/proms/preview/form/...
  - Skjemainformasjon: https://pasientrapportering.nhn.no/proms/preview/message/...
- Svar på papirskjema
  - Brev leses fra Digipost bolkvis for å unngå timeout
- Proms STS brukes ikke lengre i forbindelse med innbyggerpålogging 


[Tilbake](./Releaselist)
