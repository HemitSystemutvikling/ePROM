# PERSONVERNINNSTILLINGER

*Sist oppdatert 19.09.2023*

## Innholdsfortegnelse

[Sjekk personverninnstilling](#sjekk-personverninnstilling)

[Oppdater personverninnstilling](#oppdater-personverninnstilling)

[Mottak av status for personverninnstilling (replikeringsmelding fra PVK)](#mottak-av-status-for-personverninnstilling-replikeringsmelding-fra-pvk)

## Beskrivelse
Endring av personverninnstilling og sjekk av status på denne kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

NB!
ApiKey skal sendes som en `Authorization` parameter og er en del av HTTP header:
`headers: {"Authorization": "Basic " + apiKey}` 

## Sjekk personverninnstilling

### Klient-side

**Eksempelkode (javascript)**

``` javascript
function sjekkPersonverninnstilling() {
    var url = 'https://proms.hemitdev.org/PromsWebApi/api/v2/getpersonverninnstilling'; // Demo server
    var apiKey = ""; // ApiKey of the end user system performing the requeset
    var nationalId = "26073941651"; The national id of the citizen.
    var type = 0; // Reservasjon
    var pvkId = pvkId; // The guid of the PersonvernInnstilling

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Basic " + apiKey
        },
        data: JSON.stringify({
            nationalId,
            type,
            pvkId
        }),
        success: function(data) {
            alert("nationalId: " + data.nationalId + "\ntype: " + data.type + "\nnid: " + data.id + "\nnname: " + data.name + "\nstatus: " + data.status);
        },
        error: function() {
            alert("Error!");
        }
    });
}
```

**URL for Web API kall**

[https://proms.hemitdev.org/PromsWebApi/api/v2/getpersonverninnstilling]

**Parametere - Inn**

* nationalId  - The national id of the person to get PersonvernInnstilling for.
* type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke }`. Tallverdien kan sendes.
* pvkId - The guid of the PersonvernInnstilling

**Parametere – Ut**

* nationalId - The national id of the citizen.
* type - The type of the PersonvernInnstilling. `{ Reservasjon | Samtykke }`. Tallverdien kan sendes.
* id – The guid of the PersonvernInnstilling.
* name – The name of the PersonvernInnstilling.
* status – The status of the PersonvernInnstilling.`{ IkkeAktiv | Aktiv }`.

**Metode**

POST

**Swagger**

[https://proms.hemitdev.org/PromsWebApi/swagger/ui/index#!/PersonvernInnstilling/PersonvernInnstilling_GetPersonvernInnstillingV2Async](https://proms.hemitdev.org/PromsWebApi/swagger/ui/index#!/PersonvernInnstilling/PersonvernInnstilling_GetPersonvernInnstillingV2Async)

### Server-side

**API**

Tilgjengelig som NuGet pakke

NuGet repository: https://hemit.pkgs.visualstudio.com/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages%40Local/nuget/v3/index.json

Navn: Hemit.Proms.Integration

**Eksempelkode (C#)**

``` csharp
private async Task GetReservasjon(PatientInRegistryDataContract patient)
{
    var response = await Hemit.Proms.Integration.Api
        .GetPersonvernInnstillingV2Async(
            ConfigurationManager.AppSettings["PromsApiBaseUrl"], 
            ConfigurationManager.AppSettings["PromsApiKey"], 
            patient.DecryptedPID,
            patient.PvkId,
            PersonvernInnstillingType.Reservasjon);

    if (!response.HasErrors)
    {
        var status = response.Status == PersonvernInnstillingStatus.Aktiv
            ? ReservationStatus.Reservert
            : ReservationStatus.IkkeReservert;
    }
}
```

**Parametere - Inn**

* PromsApiBaseUrl - The base URL of the PROMS API
* ApiKey - ApiKey of the end user system performing the requeset (sendes som `Authorization` parameter og er en del av HTTP header)
* NationalId - The national id of the person to get PersonvernInnstilling for.
* PvkId - The guid of the PersonvernInnstilling
* Type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke }`. Tallverdien kan sendes.

PromsApiBaseUrl skal være https://proms.hemitdev.org/PromsWebApi

**Parametere – Ut**

* NationalId - The national id of the citizen.
* Type - The type of the PersonvernInnstilling. `{ Reservasjon | Samtykke }`. Tallverdien kan sendes.
* Id -The guid of the PersonvernInnstilling.
* Name - The name of the PersonvernInnstilling.
* Status - The status of the PersonvernInnstilling.

### Feilsituasjoner

**Respons**

Ok (200) - Alt OK.  
Bad Request (400) - Feil i forespørsel. Skjer...
* Hvis NationalId ikke er angitt eller har en lengde som er forskjellig fra 11.
* Hvis Type ikke er angitt.

Unauthorized (401) - Feil i ApiKey.  
Internal Server Error (500) - Alle feil som ikke fanges opp på annen måte.  
Bad Gateway (502) - Hvis noe feiler mot PVK. Feilmelding fra PVK returneres som JSON: `{ statusCode, status, message}`

## Oppdater personverninnstilling

### Klient-side

**Eksempelkode (javascript)**

``` javascript
function oppdaterPersonverninnstilling() {
    var url = 'https://proms.hemitdev.org/PromsWebApi/api/v2/setpersonverninnstilling'; // Demo server
    var apiKey = ""; // ApiKey of the end user system performing the requeset
    var nationalId = "26073941651"; The national id of the person to update the status of PersonvernInnstilling for.
    var type = 0; // Reservasjon
    var status = 1; // Aktiv
    var pvkId = pvkId; // The guid of the PersonvernInnstilling

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Basic " + apiKey
        },
        data: JSON.stringify({
            nationalId,
            pvkId,
            type,
            status
        }),
        success: function(data) {
            alert("instansEndret: " + data.instansEndret);
        },
        error: function() {
            alert("Error!");
        }
    });
}
```

**URL for Web API kall**

[https://proms.hemitdev.org/PromsWebApi/api/v2/setpersonverninnstilling]

**Parametere - Inn**

* nationalId  - The national id of the person to update the status of PersonvernInnstilling for.
* pvkId - The guid of the PersonvernInnstilling
* type - The type of the PersonvernInnstilling to apply change of status to. `{ Reservasjon | Samtykke }`. Tallverdien kan sendes.
* status - The new status of the PersonvernInnstilling. `{ IkkeAktiv | Aktiv }`.

**Parametere – Ut**

* instansEndret - Was the PersonvernInnstilling changed? `{ IkkeEndret | Endret }`.

**Metode**

POST

**Swagger**

[https://proms.hemitdev.org/PromsWebApi/swagger/ui/index#!/PersonvernInnstilling/PersonvernInnstilling_SetPersonvernInnstillingV2Async](https://proms.hemitdev.org/PromsWebApi/swagger/ui/index#!/PersonvernInnstilling/PersonvernInnstilling_SetPersonvernInnstillingV2Async)

### Server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: https://hemit.pkgs.visualstudio.com/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages%40Local/nuget/v3/index.json

Navn: Hemit.Proms.Integration

**Eksempelkode (C#)**

``` csharp
private async Task UpdateReservasjon(PatientInRegistryDataContract patient, PersonvernInnstillingStatus personvernInnstillingStatus)
{
    var response = await Hemit.Proms.Integration.Api
        .SetPersonvernInnstillingAsync(
            ConfigurationManager.AppSettings["PromsApiBaseUrl"], 
            ConfigurationManager.AppSettings["PromsApiKey"], 
            patient.DecryptedPID,
            patient.PvkId,
            PersonvernInnstillingType.Reservasjon,
            personvernInnstillingStatus);

    if (!response.HasErrors)
    {
        var newStatus = personvernInnstillingStatus == PersonvernInnstillingStatus.Aktiv
            ? ReservationStatus.Reservert
            : ReservationStatus.IkkeReservert;
    }
}
```

**Parametere - Inn**

* PromsApiBaseUrl - The base URL of the PROMS API
* ApiKey - ApiKey of the end user system performing the requeset (sendes som `Authorization` parameter og er en del av HTTP header)
* NationalId - The national id of the person to get PersonvernInnstilling for.
* PvkId - The guid of the PersonvernInnstilling
* Type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke }`. Tallverdien kan sendes.
* Status - The new status of the PersonvernInnstilling. `{ IkkeAktiv | Aktiv }`.

PromsApiBaseUrl skal være https://proms.hemitdev.org/PromsWebApi

**Parametere – Ut**

* InstansEndret - Was the PersonvernInnstilling changed? `{ IkkeEndret | Endret }`.

### Feilsituasjoner

**Respons**

Ok (200) - Alt OK.  
Bad Request (400) - Feil i forespørsel. Skjer...
* Hvis NationalId ikke er angitt eller har en lengde som er forskjellig fra 11.
* Hvis Type ikke er angitt.
* Hvis Status ikke er angitt.

Unauthorized (401) - Feil i ApiKey.  
Internal Server Error (500) - Alle feil som ikke fanges opp på annen måte.  
Bad Gateway (502) - Hvis noe feiler mot PVK. Feilmelding fra PVK returneres som JSON: `{ statusCode, status, message}`

## Mottak av status for personverninnstilling (replikeringsmelding fra PVK)

Når innbygger gjør en endring av en personverninnstilling i PVK, sender PVK ut en replikeringsmelding til systemer den er integrert med, deriblandt ePROM, for å informere om endringen. ePROM gjøre ved mottak av en slik replikeringsmelding et kall videre mot angitte Bestillersystem med den nye statusen for personverninnstillingen. Bestillersystemet må implementere en service som mottar dette kallet.

**URL for Web API kall**

ApiBaseUrl for web API registreres i ePROM Selvbetjeningsmodul under Bestillersystem: [https://proms.hemitdev.org/PromsAdministration/](https://proms.hemitdev.org/PromsAdministration/)

Web API må være tilgjenglig på URL: https:// `<ApiBaseUrl>` /api/PersonvernInnstilling

F.eks: [https://mrsdemo.hemitdev.org/PromsTestregisterServices/api/PersonvernInnstilling/](https://mrsdemo.hemitdev.org/PromsTestregisterServices/api/PersonvernInnstilling/)

**Parametere - Inn**

* nationalId – The national id of the person to update.
* id – The guid of the PersonvernInnstilling to update.
* name – The name of the PersonvernInnstilling to update.
* status - The updated status of the PersonvernInnstilling. En verdi fra [Volven 7609](https://volven.no/produkt.asp?id=505635&oid=7609) `( RES | IRES | SAM | ISAM )`. 
**NB!** Dette er ikke samme statusverdier som i [Sjekk personverninnstilling](#sjekk-personverninnstilling) og [Oppdater personverninnstilling](#oppdater-personverninnstilling).

**Parametere - Ut**

* success – Was the update completed successfully?

For parameter inn og ut kan NuGet pakken *Hemit.Proms.Integration* benyttes. Bruk da *Hemit.Proms.Integration.Pvk.SetPersonvernInnstillingInEusRequest* for parameter inn og *Hemit.Proms.Integration.Pvk.SetPersonvernInnstillingInEusResponse* for parameter ut

**Metode**

PUT

**Autentisering**

ApiKey sendes med i header og skal brukes av Bestillersystem for å sikre at det er riktig mottaker

Eksempel request fra Proms (JSON)

``` 
{
    "nationalId" : "26073941651",
    "id" : "b3cda307-154c-4af4-87d3-30567c931924",
    "name" : "Reservasjon mot registrering",
    "status" : "RES"
}
```

## Koder

### Status

``` 
0 = IkkeAktiv
1 = Aktiv
```

### Status (Volven 7609)

``` 
RES
IRES
SAM
ISAM
```

### Type

``` 
0 = Reservasjon
1 = Samtykke
```

### InstansEndret

``` 
0 = IkkeEndret
1 = Endret
```
