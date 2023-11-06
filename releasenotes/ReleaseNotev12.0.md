# Endringer i ePROM v12.0
Dato: november 2023

### Skjemautfyller
- Bedre tilbakemelding til bruker ved visning av pasientskjema
- Validering av dato- og tallfelt for skjema i Samleskjema

### ePROM admin
- 

### Teknisk
- Oppdatert autentisering mot helsenorge REST API
- Overgang til bruk av FHIR Task for skjemaoppgaver i helsenorge
  - Støtte for reservasjon mot forskning/sekundærbruk
- Melding til innbygger: Støtte for reservasjon mot forskning/sekundærbruk
- Hangfire: Optimalisering av køhåndtering for å enda bedre tåle store skjemabestillinger
- Hangfire: Jobber skal kjøre etter lokal tid på server
- Forbedret håndtering av asynkron ferdigstilling av skjemaoppgaver mot helsenorge
- BestillingsAPI v1 tas ut av bruk (formsorder/api)
  - Gyldig API er formorder/v2/api
- Optimalisering av CleanUpExpiredFormOrdersRecurringJob for å unngå minnelekasje
- Optimalisering av CreateMonthlyMRSReportRecurringJob for å frigi minne etter avsluttet kjøring

[Tilbake](./Releaselist)
