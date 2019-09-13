
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
API'et er laget for å gi mulighet for bruke ePROM med 3dje-parts skjemautfyllere. 


# HANDLINGER
API'et tilbyr metoder for å hente ut alle skjemabestillinger av en gitt skjematype, hente ut data fra metadatafeltet til en gitt skjemabestilling og levere skjema.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

## Autentisering
API'et er beskyttet av OpenID Connect med hybrid-flyt slik at brukere kan holde på en pålogging over lengre tid, noe som feks er tilfelle når en mobil-app skal koble mot API'et.

Eksempel (C#)
```cs
// create a redirect URI using an available port on the loopback address.
// requires the OP to allow random ports on 127.0.0.1 - otherwise set a static port
var browser = new SystemBrowser(7014);
string redirectUri = string.Format($"http://127.0.0.1:{browser.Port}");

var options = new OidcClientOptions
{
	Authority = "https://helseid-sts.test.nhn.no/",
	ClientId = "no.hemit.hild-dev",
	RedirectUri = redirectUri,
	Scope = "openid profile helseid://scopes/identity/pid helseid://scopes/identity/security_level hemit/hild-dev/*",
	FilterClaims = false,
	Browser = browser,
	ClientSecret = "K6fIZ69LMlaGvput10FoAYWtsWvFU2pyM7zj8zvtiwRVvZHIR8WBU5j6Gc46kN8v",
	Flow = OidcClientOptions.AuthenticationFlow.Hybrid
};

var oidcClient = new OidcClient(options);

// Log in to get access token
var loginResult = await oidcClient.LoginAsync(new LoginRequest());
var currentAccessToken = loginResult.AccessToken;

// Create API client
var epromApiClient = new HttpClient();
epromApiClient.SetBearerToken(currentAccessToken)

// Call API using the client
var result = await epromApiClient.GetAsync(...);
```

## Hent skjemabestillinger for skjematype
Ved å sende med skjematypens FormId filtrerer man skjemabestillingene for den innloggede personen slik at FormOrderId til denne personens skjemabestillinger av gitte type blir hentet ut. API'et tilbyr ikke å hente ut alle skjemabestillinger for en person uavhengig av skjematypen.

API kall, GET request:

```
*<API_ROOT>*/api/formorders?formId=*\<FormId>*
```

Returnerer liste med skjemabestillinger:
```
[*\<FormOrderId1>*, *\<FormOrderId2>*, *\<FormOrderId3>*, *...*]
```

### Feilkoder
400 BadRequest - FormId er ikke angitt

## Hent skjemabestillingens metadata
Ved å sende med skjemabestillingens FormOrderId kan man hente ut Metadata angitt i skjemabestillingen.

API kall, GET request:

```
*<API_ROOT>*/api/formorders/*\<FormOrderId>*
```

Returnerer skjema metadata:
```
{
	"morgendose": 1,
	"kveldsdose": 5,
	"...": "..."
}
```

### Feilkoder
404 NotFound - finner ikke skjemabestilling med angitt FormOrderId

## Lever skjema
Utfyllt skjema for en skjemabestillingen leveres ved å sende med skjemabestillingens id (FormOrderId) og skjemaets data.

API kall, PUT request:

```
*<API_ROOT>*/api/formorders/*\<FormOrderId>*
```

Data som skal levereres sendes med i body:
```
{
	"vekt": 70,
	"kommentar": "En liten kommentar fra pasienten",
	"...": "..."
}
```

Returnerer status på levering:
200 OK hvis leveringen gikk om den skulle

### Feilkoder
404 NotFound - finner ikke skjemabestilling med angitt FormOrderId
502 BadGateway - problemer ved levering av skjemadata videre til intern ePROM
