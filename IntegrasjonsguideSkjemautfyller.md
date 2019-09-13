
# Integrasjonsguide for skjemautfyller

*Sist oppdatert 13.09.2019*

### Innholdsfortegnelse

[GENERELT](#generelt)

[HANDLINGER](#handlinger)

[Autentisering](#autentisering)

[Hent skjemabestillinger for skjematype](#hent-skjemabestillinger-for-skjematype)

[Hent skjemabestilling](#hent-skjemabestilling)

[Lever skjema](#lever-skjema)

[Feilsituasjoner](#feilsituasjoner)



# GENERELT



# HANDLINGER

API'et tilbyr metoder for å hente ut alle skjemabestillinger av en gitt skjematype, hente ut data fra metadatafeltet til en gitt skjemabestilling og levere skjema.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

## Autentisering




## Hent skjemabestillinger for skjematype
Ved å sende med skjematypens FormId filtrerer man skjemabestillingene for den innloggede personen slik at FormOrderId til denne personens skjemabestillinger av gitte type blir hentet ut. API'et tilbyr ikke å hente ut alle skjemabestillinger for en person uavhengig av skjematypen.

API kall, GET request:

*<API_ROOT>*/api/formorders?formId=*\<FormId>*

Returnerer liste med skjemabestillinger:
 [*\<FormOrderId1>*, *\<FormOrderId2>*, *\<FormOrderId3>*, *...*]

### Feilkoder
400 BadRequest - FormId er ikke angitt

## Hent skjemabestillingens metadata
Ved å sende med skjemabestillingens FormOrderId kan man hente ut Metadata angitt i skjemabestillingen.

API kall, GET request:

*<API_ROOT>*/api/formorders/*\<FormOrderId>*

Returnerer skjema metadata:
{
	"morgendose": 1,
	"kveldsdose": 5,
	"...": "..."
}

### Feilkoder
404 NotFound - finner ikke skjemabestilling med angitt FormOrderId

## Lever skjema
Utfyllt skjema for en skjemabestillingen leveres ved å sende med skjemabestillingens id (FormOrderId) og skjemaets data.

API kall, PUT request:

*<API_ROOT>*/api/formorders/*\<FormOrderId>*

Data som skal levereres sendes med i body:
{
	"vekt": 70,
	"kommentar": "En liten kommentar fra pasienten",
	"...": "..."
}

Returnerer status på levering:
200 OK hvis leveringen gikks om den skulle

### Feilkoder
404 NotFound - finner ikke skjemabestilling med angitt FormOrderId
502 BadGateway - problemer ved levering av skjemadata videre til intern ePROM
