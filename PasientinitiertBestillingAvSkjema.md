# PASIENTINITIERT BESTILLING AV SKJEMA

*Sist oppdatert 19.04.2023*

Pasientinitert bestilling av skjema er en mulighet hvor pasienten kan gå via en direktelink for utfylling av et skjema. Identifisering skjer ved at pasienten logger på med BankId.

For at et skjema skal kunne bestilles av pasienten må "Kan bestilles av pasient" (under "Avansert innstilling" i skjemabygger) være huket av, samt at skjemaet må være publisert

URL for pasientbestilling av skjema blir tilgjengelig etter man har lagret skjemaet ("Offentlig url" under "Avansert innstilling")

Det er også mulig å velge om man ønsker at skjema bestilt av pasient må signeres: Huk av "Skjema bestilt av pasient må signeres" under "Avansert innstilling". Forutsetter at "Signering støttes" (under "Avansert innstilling")  er valgt først.

Ved retur av utfyllt skjema sendes pasientens personnummer og skjemaets ID sammen med skjemadataene. I tillegg får isPatientInitiated verdien 'true':

``` 
{
    "...": "...",
    "isPatientInitiated": true,
    "patientInitiatedValues":
    {
        "formId": "1bc5f9f0-2607-49eb-94f0-6af955bbd79a",
        "nationalId": "26073941651",
        "orderTimestamp": "2023-03-29T10:01:49.857"
    }
}
```

[Tilbake](./)
