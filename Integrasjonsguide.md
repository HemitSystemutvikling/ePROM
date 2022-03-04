# Integrasjonsguide

*Sist oppdatert 15.11.2021*

### Innholdsfortegnelse

[GENERELT](#generelt)

[BESTILLING AV SKJEMA V2](BestillingAvSkjemaV2)

[PASIENTINITIERT BESTILLING AV SKJEMA](PasientinitiertBestillingAvSkjema)

[RETUR AV UTFYLT SKJEMA](ReturAvUtfyltSkjema)

[SKJEMA SOM KREVER SIGNATUR](SkjemaSomKreverSignatur)

[SENDE MELDING TIL INNBYGGER V2](SendeMeldingTilInnbyggerV2)

[SENDE MELDING SOM SMS/EPOST](SendeMeldingSomSmsEpost)

[PERSONVERNINNSTILLINGER](Personverninnstillinger)


# GENERELT

## Pasientløsning ePROM

For å se / fylle ut de bestilte skjemaene kan man finne de igjen i pasientløsningen:

[https://proms2.hemit.org/Proms](https://proms2.hemit.org/Proms)

Her finner man alle skjema som er bestilt og man kan f.eks.teste innsending av skjemaer. Pålogging med BankID eller engangskode.

## Testpersoner

ePROM i testmiljøet integrerer med Helsenorge og Digipost sine testmiljøer. For å teste integrasjonen mellom ePROM, Helsenorge og Digipost har vi tilgang til fødselsnummer med BankID. Midlertidig tilgang til disse fås ved henvendelse til Hemit på <eprom@hemit.no>.

## Aynkron kommunikasjon

ePROM basserer seg på asynkron kommunikasjon med Bestillersystem. Dette gjelder både for bestilling av skjema og sending av melding til innbygger.
Se eksempel i [sekvensdiagram](img/bestilling_av_pasientskjema_asynkront.png)

## Verifisering av integrasjon

Verifisering av integrasjonen er beskrevet [her](IntegrasjonVerifikasjon). Det er et krav at dette utføres for alle nye integrasjoner.

## nuget-pakke
Følgende nuget-pakke er tilgjengelig for integrasjon med ePROM: [Hemit.ePROM.Integration v5.1.0](https://dev.azure.com/hemit/Hemit%20Public%20Packages/_packaging?_a=package&feed=Hemit_public_packages%40Local&package=Hemit.ePROM.Integration&protocolType=NuGet&version=5.1.0)

## Distribusjonsregler

Vha. parameteren **DistributionRule** kan man bestemme hvordan pasientskjemaet skal distribueres til pasienten. Varslingskanalene er definert i parameteren **NotificationChannel**

Default **DistributionRule** er *Basic* og betyr at ePROM først sjekker om pasienten er tilgjengelig på Helsenorge. Hvis ikke sjekkes det om pasienten har sikker digital postkasse. 

Hvis **DistributionRule** er satt til *AllowUnsecure* sjekkes det om pasienten er registrert i Difi Kontaktregister med epostadresse eller mobilnummer. 

Hvis **DistributionRule** er satt til *NoDistribution* sendes det ikke ut varsling til pasienten. Dette kan benyttes hvis Bestillersystemet skal gi engangskode til pasienten.

*BasicOrPaper* og *AllowUnsecureOrPaper* er samme som hhv *Basic* og *AllowUnsecure*, men med papir som siste utvei.

*PaperOnly*, *HelsenorgeOnly*, *DigitalMailboxOnly* og *UnsecureOnly* sender kun på hhv papir, Helsenorge, sikker digital postkasse og epost/sms.

### DistributionRule

``` 
0 = Basic
1 = AllowUnsecure
2 = NoDistribution
3 = BasicOrPaper
4 = AllowUnsecureOrPaper
5 = PaperOnly
6 = HelsenorgeOnly
7 = DigitalMailboxOnly
8 = UnsecureOnly
```

### NotificationChannel

``` 
0 = None
1 = Helsenorge
2 = DigitalMailbox
3 = Unsecure
4 = PhysicalMailbox
```

### FormOrderStatus

``` 
0 = Completed
1 = Expired
2 = Ordered
3 = Error
4 = PhysicalMailReturned
5 = DigipostDelivered
```

### FormOrderStatusErrorCode

``` 
0 = None
1 = PatientUnreachable
2 = SikkerDigitalPostError
```

### SentStatus

``` 
0 = Sent
1 = Error
```

# Produksjonsmiljøet

API'et for å bestille pasientskjema via ePROM er tilgjengelig på Helsenettet.

For produksjonsmiljøet gjelder følgende URL'er for bestillingsAPI'et:
 
PROD: [https://pasientrapportering.nhn.no/webapi/api/v2/formorder](https://pasientrapportering.nhn.no/webapi/api/v2/formorder)

QA: [https://pasientrapportering.qa.nhn.no/webapi/api/v2/formorder](https://pasientrapportering.qa.nhn.no/webapi/v2/api/formorder)


For produksjonsmiljøet gjelder følgende URL'er for SendeMeldingAPI'et:

PROD: [https://pasientrapportering.nhn.no/webapi/api/v2/MessageToCitizen](https://pasientrapportering.nhn.no/webapi/api/v2/MessageToCitizen)

QA: [https://pasientrapportering.qa.nhn.no/webapi/api/v2/MessageToCitizen](https://pasientrapportering.qa.nhn.no/webapi/api/v2/MessageToCitizen)

[Tilbake](./)
