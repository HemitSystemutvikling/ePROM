# Endringer i ePROM v13.2
*juni 2024*

### Generelt
- Prioritering av hangfire køer er hovedfokus i denne versjonen.
  - Bestillinger som kommer inn blir prioritert i denne rekkefølgen:
    - Skjemabestillinger (med engangskode).
    - Skjemabestillinger (andre kanaler).
    - Utsending av melding.

### Teknisk
- Database
  - Rydder opp en del duplisering av kode.
  - Optimaliserer noen spørringer.

### Diverse
- Lagt til mulighet for masseutsendng av meldinger i administrator modul.


[Tilbake](./Releaselist) 