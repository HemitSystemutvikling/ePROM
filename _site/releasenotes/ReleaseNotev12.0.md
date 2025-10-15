# Endringer i ePROM v12.0
Dato: 06.desember 2023

### Generelt
- Bedre tilbakemelding til bruker ved visning av pasientskjema
  - når skjema ikke er tilgjengelig ennå
  - når skjema allerede er levert
  - når det oppstår feil, f.eks. feil innlogget bruker forsøker å åpne skjema 
- Validering av dato- og tallfelt i skjema
  - rettet feil slik at valideringsregler fungerer for Samleskjema, ikke kun for enkeltskjema
- Støtte for reservasjon mot forskning/sekundærbruk for skjema og brev (helsenorge)
  - gjelder bestillersystem som er markert som forskning i ePROM admin, bl.a. alle eFORSK bestillersystem.  

### ePROM admin
- For testbestillinger i PROD maskeres fødselsnummeret

### Teknisk
- Oppdatert autentisering mot helsenorge REST API
- Overgang til bruk av FHIR Task for skjemaoppgaver i helsenorge
- Melding til innbygger: Støtte for reservasjon mot forskning/sekundærbruk
- Hangfire: Optimalisering av køhåndtering for å enda bedre tåle store skjemabestillinger
- Hangfire: Jobber skal kjøre etter lokal tid på server
- Forbedret håndtering av asynkron ferdigstilling av skjemaoppgaver mot helsenorge
- BestillingsAPI v1 tas ut av bruk (formsorder/api)
  - Gyldig API er formorder/v2/api
- Optimalisering av CleanUpExpiredFormOrdersRecurringJob for å unngå minnelekkasje
- Optimalisering av CreateMonthlyMRSReportRecurringJob for å frigi minne etter avsluttet kjøring

[Tilbake](./Releaselist)
