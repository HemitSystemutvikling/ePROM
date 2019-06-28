# Skjemabygger v2.4

*Sist oppdatert 28.06.2019*

### Innholdsfortegnelse

[GENERELT](#generelt)

[METADATA](#metadata)

[SPESIALTILPASNING](#spesialtilpasning)

# GENERELT

# METADATA
Metadata kan sendes med en skjemabestilling både for å kontrollere oppførsel til andre komponenter og for å vise informasjon spesifikk for en skjemabestilling i skjemaet. Metadata kan brukes både i selve skjemaet og i "Informasjon til pasienten" knyttet mot skjemaet.

## Informasjon til pasienten
For å vise metadata i "Informasjon til pasienten" legger man inn denne teksten:

[_METADATANAVN_]


**Eksempel**

Man ønsker en tekst basert på hvilket sykehus pasienten var innlagt på. Dette kan legges inn i "Informasjon til pasienten":

*I forbindelse med ditt opphold på [_SYKEHUSNAVN_] ønsker vi at du svarer på noen spørsmål.*

Dette vil for pasienten se slik ut:

*I forbindelse med ditt opphold på St. Olavs hospital  ønsker vi at du svarer på noen spørsmål.*

Metadatafeltet i skjemabestillingen vil da være:
```
JSON.stringify({ sykehusnavn: "St. Olavs hospital" })
```


# SPESIALTILPASNING

