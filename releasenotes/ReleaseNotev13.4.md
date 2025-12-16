# Endringer i ePROM v13.4
*16.10.2025*

### Generelt
- Ny versjon av `Hemit.ePROM.Integration`: [*Hemit.ePROM.Integration v13.4.0*](https://dev.azure.com/hemit/Hemit%20offentlig/_artifacts/feed/Hemit_public_packages/NuGet/Hemit.ePROM.Integration/overview/13.4.0)
    - Lagt til `SequenceNumber`, `CreatedDateTimeOffset` og `LastChangedDateTimeOffset` i `GetPersonvernInnstillingResponse` der
        - `SequenceNumber` er hvilket sekvensnummer dette er for innbygger instans av denne personverninnstillingsdefinisjonen
        - `CreatedDateTimeOffset` er tidspunkt for når første instans av innbyggers personverninnstilling ble opprettet
        - `LastChangedDateTimeOffset` er tidspunkt for når innbygger satt personverninnstillingen som denne endringen representerer
- Signering er fjernet fra skjemabygger for skjematyper som ikke er pasientinitiert, da dette ikke er i bruk siden det settes pr. bestilling og ikke pr. skjematype 

### Teknisk
- Oppdaterte Helsenorge-pakkene til siste versjon (6.0.3)

### Feilretting
- Rettet feil som gjorde at skjema enkelte ganger hopper til Levere skjema-knappen før spørsmål over er besvart.
- Rettet feil som gjorde at den månedlige mail-rapporten ikke viste korrekt statistikk.


[Tilbake](./Releaselist) 