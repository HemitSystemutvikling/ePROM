# Endringer i ePROM v13.4
*xxxx 2025*

### Generelt
- Ny versjon av `Hemit.ePROM.Integration`
    - Lagt til `SequenceNumber`, `CreatedDateTimeOffset` og `LastChangedDateTimeOffset` i `GetPersonvernInnstillingResponse` der
        - `SequenceNumber` er hvilket sekvensnummer dette er for innbygger instans av denne personverninnstillingsdefinisjonen
        - `CreatedDateTimeOffset` er tidspunkt for når første instans av innbyggers personverninnstilling ble opprettet
        - `LastChangedDateTimeOffset` er tidspunkt for når innbygger satt personverninnstillingen som denne endringen representerer
- Signering er fjernet fra skjemabygger for skjematyper som ikke er pasientinitiert, da dette ikke er i bruk siden det settes pr. bestilling og ikke pr. skjematype 

### Tekninsk
- Oppdaterte Helsenorge-pakkene til siste versjon (6.0.3)

### Feilretting
- Rettet feil som gjorde at skjema enkelte ganger hopper til Levere skjema-knappen før spørsmål over er besvart.
- Rettet feil som gnorde at den månedlige mail-rapporten ikke viste korrekt statistikk.