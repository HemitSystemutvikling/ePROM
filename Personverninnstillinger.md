# PERSONVERNINNSTILLINGER

*Sist oppdatert 15.06.2020*

## Innholdsfortegnelse

[Sjekk personverninnstilling klient-side](#sjekk-personverninnstilling-klient-side)

[Sjekk personverninnstilling server-side](#sjekk-personverninnstilling-server-side)

[Feilsituasjoner](#feilsituasjoner)

[Mottak av status for bestillingen](#mottak-av-status-for-bestillingen)


Endring av personverninnstilling og sjekk av status på denne kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

NB!
ApiKey skal sendes som en `Authorization` parameter og er en del av HTTP header:
`headers: {"Authorization": "Basic " + apiKey}` 

## Sjekk personverninnstilling klient-side

**Eksempelkode (javascript)**

``` javascript
function sjekkPersonverninnstilling() {
    var url = 'https://proms2.hemit.org/PromsWebApi/api/getpersonverninnstilling'; // Demo server
    var apiKey = ""; // ApiKey of the end user system performing the requeset
    var nationalId = "26073941651"; The national id of the citizen.
    var type = 0; // Reservasjon

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Basic " + apiKey
        },
        data: JSON.stringify({
            nationalId,
            type
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

[https://proms2.hemit.org/PromsWebApi/api/getpersonverninnstilling]

**Parametere - Inn**

* nationalId  - The national id of the person to get PersonvernInnstilling for.
* type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`

**Parametere – Ut**

* nationalId - The national id of the citizen.
* type - The type of the PersonvernInnstilling. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`
* id – The guid of the PersonvernInnstilling.
* name – The name of the PersonvernInnstilling.
* status – The status of the PersonvernInnstilling.`{ IkkeAktiv | Aktiv }`.

**Metode**

POST

**Swagger**

https://proms2.hemit.org/PromsWebApi/swagger/ui/index#!/PersonvernInnstilling/PersonvernInnstilling_GetPersonvernInnstillingAsync

## Sjekk personverninnstilling server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: https://hemit.pkgs.visualstudio.com/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages%40Local/nuget/v3/index.json

Navn: Hemit.Proms.Integration

**Eksempelkode (C#)**

``` javascript
private async Task GetReservasjon(PatientInRegistryDataContract patient)
{
    var response = await Hemit.Proms.Integration.Api
        .GetPersonvernInnstillingAsync(
            ConfigurationManager.AppSettings["PromsApiBaseUrl"], 
            ConfigurationManager.AppSettings["PromsApiKey"], 
            patient.DecryptedPID,
            PersonvernInnstillingType.Reservasjon);

    if (!response.HasErrors)
    {
        var status = response.Status == PersonvernInnstillingStatus.Aktiv
            ? ReservationStatus.Reservert
            : ReservationStatus.IkkeReserervert;
    }
}
```

``` javascript
private async Task UpdateReservasjon(PatientInRegistryDataContract patient, PersonvernInnstillingStatus personvernInnstillingStatus)
{
    var response = await Hemit.Proms.Integration.Api
        .SetPersonvernInnstillingAsync(
            ConfigurationManager.AppSettings["PromsApiBaseUrl"], 
            ConfigurationManager.AppSettings["PromsApiKey"], 
            patient.DecryptedPID,
            PersonvernInnstillingType.Reservasjon,
            personvernInnstillingStatus);

    if (!response.HasErrors)
    {
        var newStatus = personvernInnstillingStatus == PersonvernInnstillingStatus.Aktiv
            ? ReservationStatus.Reservert
            : ReservationStatus.IkkeReserervert;
    }
}
```

**Parametere - Inn**

* PromsApiBaseUrl - The base URL of the PROMS API
* ApiKey - ApiKey of the end user system performing the requeset (sendes som `Authorization` parameter og er en del av HTTP header)
* NationalId - The national id of the person to get PersonvernInnstilling for.
* Type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`.

PromsApiBaseUrl skal være https://proms2.hemit.org/PromsWebApi

**Parametere – Ut**

* NationalId - The national id of the citizen.
* Type - The type of the PersonvernInnstilling. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`.
* Id -The guid of the PersonvernInnstilling.
* Name - The name of the PersonvernInnstilling.
* Status - The status of the PersonvernInnstilling.

## Feilsituasjoner

**Respons**
Ok (200) - Alt OK.
Bad Request (400) - Feil i forespørsel. Skjer...
* Hvis NationalId ikke er angitt eller har en lengde som er forskjellig fra 11.
* Hvis Type ikke er angitt.
Unauthorized (401) - Feil i ApiKey.
Internal Server Error (500) - Alle feil som ikke fanges opp på annen måte.
Bad Gateway (502) - Hvis noe feiler mot PVK. Feilmelding fra PVK returneres som JSON: `{ statusCode, status, message}`

## Sjekk personverninnstilling klient-side

**Eksempelkode (javascript)**

``` javascript
function sjekkPersonverninnstilling() {
    var url = 'https://proms2.hemit.org/PromsWebApi/api/getpersonverninnstilling'; // Demo server
    var apiKey = ""; // ApiKey of the end user system performing the requeset
    var nationalId = "26073941651"; The national id of the citizen.
    var type = 0; // Reservasjon

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Basic " + apiKey
        },
        data: JSON.stringify({
            nationalId,
            type
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

[https://proms2.hemit.org/PromsWebApi/api/getpersonverninnstilling]

**Parametere - Inn**

* nationalId  - The national id of the person to get PersonvernInnstilling for.
* type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`

**Parametere – Ut**

* nationalId - The national id of the citizen.
* type - The type of the PersonvernInnstilling. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`
* id – The guid of the PersonvernInnstilling.
* name – The name of the PersonvernInnstilling.
* status – The status of the PersonvernInnstilling.`{ IkkeAktiv | Aktiv }`.

**Metode**

POST

**Swagger**

https://proms2.hemit.org/PromsWebApi/swagger/ui/index#!/PersonvernInnstilling/PersonvernInnstilling_GetPersonvernInnstillingAsync

## Sjekk personverninnstilling server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: https://hemit.pkgs.visualstudio.com/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages%40Local/nuget/v3/index.json

Navn: Hemit.Proms.Integration

**Eksempelkode (C#)**

``` javascript
private async Task GetReservasjon(PatientInRegistryDataContract patient)
{
    var response = await Hemit.Proms.Integration.Api
        .GetPersonvernInnstillingAsync(
            ConfigurationManager.AppSettings["PromsApiBaseUrl"], 
            ConfigurationManager.AppSettings["PromsApiKey"], 
            patient.DecryptedPID,
            PersonvernInnstillingType.Reservasjon);

    if (!response.HasErrors)
    {
        var status = response.Status == PersonvernInnstillingStatus.Aktiv
            ? ReservationStatus.Reservert
            : ReservationStatus.IkkeReserervert;
    }
}
```

``` javascript
private async Task UpdateReservasjon(PatientInRegistryDataContract patient, PersonvernInnstillingStatus personvernInnstillingStatus)
{
    var response = await Hemit.Proms.Integration.Api
        .SetPersonvernInnstillingAsync(
            ConfigurationManager.AppSettings["PromsApiBaseUrl"], 
            ConfigurationManager.AppSettings["PromsApiKey"], 
            patient.DecryptedPID,
            PersonvernInnstillingType.Reservasjon,
            personvernInnstillingStatus);

    if (!response.HasErrors)
    {
        var newStatus = personvernInnstillingStatus == PersonvernInnstillingStatus.Aktiv
            ? ReservationStatus.Reservert
            : ReservationStatus.IkkeReserervert;
    }
}
```

**Parametere - Inn**

* PromsApiBaseUrl - The base URL of the PROMS API
* ApiKey - ApiKey of the end user system performing the requeset (sendes som `Authorization` parameter og er en del av HTTP header)
* NationalId - The national id of the person to get PersonvernInnstilling for.
* Type - The type of the PersonvernInnstilling to get. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`.

PromsApiBaseUrl skal være https://proms2.hemit.org/PromsWebApi

**Parametere – Ut**

* NationalId - The national id of the citizen.
* Type - The type of the PersonvernInnstilling. `{ Reservasjon | Samtykke | Tilgangsbegrensning }`. Tallverdien kan sendes. Foreløpig støttes kun `Reservasjon`.
* Id -The guid of the PersonvernInnstilling.
* Name - The name of the PersonvernInnstilling.
* Status - The status of the PersonvernInnstilling.

## Feilsituasjoner

**Respons**
Ok (200) - Alt OK.
Bad Request (400) - Feil i forespørsel. Skjer...
* Hvis NationalId ikke er angitt eller har en lengde som er forskjellig fra 11.
* Hvis Type ikke er angitt.
Unauthorized (401) - Feil i ApiKey.
Internal Server Error (500) - Alle feil som ikke fanges opp på annen måte.
Bad Gateway (502) - Hvis noe feiler mot PVK. Feilmelding fra PVK returneres som JSON: `{ statusCode, status, message}`
