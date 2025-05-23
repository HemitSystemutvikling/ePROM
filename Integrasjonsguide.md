# Integrasjonsguide

*Sist oppdatert 18.10.2023*

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

[https://proms.hemitdev.org/proms](https://proms.hemitdev.org/proms)

Her finner man alle skjema som er bestilt og man kan f.eks.teste innsending av skjemaer. Pålogging med BankID eller engangskode.

## Pasienter

Noen forutsetninger må være oppfylt for at personer skal kunne motta skjema og brev fra ePROM. Les mer om disse [her](Personer)

### Testpasienter til verifisering
Test-PREG benyttes i alle miljø, foruten PROD. 

[Mer om testpersoner](Testpersoner)

## Asynkron kommunikasjon

ePROM baserer seg på asynkron kommunikasjon med Bestillersystem. Dette gjelder både for bestilling av skjema og sending av melding til innbygger.
Se sekvensdiagram for [bestilling av skjem](img/bestilling_av_pasientskjema_asynkront.png) og [retur av skjemasvar](img/retur_av_skjemasvar_asynkront.png)

## Verifisering av integrasjon

Verifisering av integrasjonen er beskrevet [her](IntegrasjonVerifikasjon). Det er et krav at dette utføres for alle nye integrasjoner.

## nuget-pakke
Følgende nuget-pakke er tilgjengelig for integrasjon med ePROM: [*Hemit.ePROM.Integration v13.1.0*](https://dev.azure.com/hemit/Hemit%20offentlig/_artifacts/feed/Hemit_public_packages/NuGet/Hemit.ePROM.Integration/overview/13.1.0)

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
