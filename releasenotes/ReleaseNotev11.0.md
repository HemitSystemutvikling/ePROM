# Endringer i ePROM v11.0
*Dato: september*

### Innbyggerpålogging
- Ved utfylling av pasientskjema via helsenorge benyttes Helsenorge OIDC som støtter SSO med helsenorge app'en
- Ved utfylling av pasientskjema via Digipost benyttes ID--porten OIDC og støtter SSO med bl.a. Digipost app'en
- Pasientskjema: Knapper som er disablet er fjernet slik at  det skal bli mer intuitivt å navigere i skjemaene
- Samleskjema: "Skjul progressbar" på Samleskjema skjuler tellingen men vises ikonene
- Pasientskjema på Android: Fiks slik at utfylling av tallfelt ikke gir "Ugyldig tegn"
- Pasientskjema: Fiks på visning av slider.

### ePROM admin
- Skjemabygger: for felttype tekstområde er det mulig å legge til lenker, vha syntaks #a#https://www.www.www#a#
- ePROM-rapport: fiks av minneproblem ved generering av rapporten

### Papirskjema
- 

### Teknisk
- Hangfire:
  - Jobbene skal kjøre i henhold til lokalt tid på serveren
  - Fiks av ryddejobb, som sletter utgåtte skjema, slik at en restart ikke sletter dobbelt
- Feilretting: Hvis bestillersystem sender bestilling til en død person vil ePROM videresende svar fra helsenorge "Personen kan ikke nås"
- Forhåndsvisning av skjema og meldinger: URL endret til f.eks.
  - Pasientskjema: https://pasientrapportering.nhn.no/proms/preview/form/...
  - Skjemainformasjon: https://pasientrapportering.nhn.no/proms/preview/message/...
- Svar på papirskjema
  - Brev leses fra Digipost bolkvis for å unngå timeout
- Proms STS brukes ikke lengre i forbindelse med innbyggerpålogging 


[Tilbake](./Releaselist)
