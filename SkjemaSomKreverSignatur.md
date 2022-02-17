# SKJEMA SOM KREVER SIGNATUR

*Sist oppdatert 17.02.2022*

## Bruksområde ##

Signering er ikke nødvendig for å bekrefte pasientens identitet ved levering av skjema, den blir bekreftet ved innlogging. 

Signering krever en ekstra innlogging med bankID eller tilsvarende og oppfattes fra pasientens side unødvendig å måtte gjøre dette to ganger i løpet av prosessen med å fylle ut og levere skjema. Derfor er det viktig å begrense bruken av signering.

## Bestilling ##

Skjema som krever signatur bestilles av Bestillersystem på vanlig måte (se [BESTILLING AV SKJEMA](BestillingAvSkjemaV2)). 

Med i bestillingen sendes to parametre:
 - mustBeSigned: angir at skjema skal signeres hvis true
 - signingText: signeringstekst som vises til pasienten

*NB! Skjema som krever signatur kan ikke bestilles med engangskode. Pasienten **må** logge inn med BankId (eller tilsvarende nivå 4-innlogging) ved utfylling.*

## Utfylling ##

Skjema som krever signatur fylles ut på samme måte som andre skjema av pasienten. Ved levering trykker pasienten på knappen *Signér og levere* i stedet for *Levere* som for andre skjema. Pasienten blir da tatt gjennom signeringsstegene før skjemaet blir levert.

![Signér og levere](img/esignering2.png)

## Mottak ##

Skjema som krever signatur leveres tilbake til Bestillersystem på vanlig måte (se [RETUR AV UTFYLT SKJEMA](ReturAvUtfyltSkjema)), men med en ekstra parameter *signedFormId*. Dette er en id som kan brukes av Bestillersystem for å laste ned det signerte dokumentet. Det signerte dokumentet er en PDF-fil av det utfylte skjemaet samt en elektronisk signatur.

*NB! Bestillersystem er ansvarlig for at det signerte dokumentet blir lastet ned og at det blir oppbevart på en sikker måte. Det signerte dokumentet vil være tilgjengelig for nedlasting gjennom ePROM i minimum 30 dager.*

### Nedlasting av det signerte dokumentet ###

GET request mot: `<PromsApiBaseUrl>` /api/ExternalDocument/ `<SignedFormId>` 

`<PromsApiBaseUrl>` skal være *https://proms2.hemit.org/PromsWebApi*

**Send med ApiKey i request headeren**

``` 
Header name: authorization
Header value: Basic <ApiKey>
```


[Tilbake](./Integrasjonsguide)
