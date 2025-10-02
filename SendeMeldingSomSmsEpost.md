# SENDE MELDING SOM SMS og EPOST

*Sist oppdatert 18.10.2023*

## Innholdsfortegnelse

[SENDE MELDING SOM SMS](#sende-melding-som-sms)

[SENDE MELDING SOM EPOST](#sende-melding-som-epost)


## SENDE MELDING SOM SMS

Hvis man har behov for å sende korte beskjeder til pasienten kan man sende dette som SMS via ePROM.

**Det er viktig at dette er ikke-sensitiv informasjon.**

Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

### Sende melding klient-side

**Eksempelkode (javascript)**

``` javascript
function sendUnsecureMessageSms() {
    var url = 'https://proms.hemitdev.org/PromsWebApi/api/unsecuremessagesms'; // Demo server
    var apiKey = ""; // The ApiKey for your system
    var smsText = " En ikkeSensitivMelding som ikke er sensitiv "; // Message
    var nationalId = "26073941651"; // the national ID of the patient (Norsk fødselsnummer or D-nummer)
    var phoneNumber = ""; // The mobile number if provided

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            apiKey,
            smsText,
            nationalId,
            phoneNumber
        }),
        success: function(data) {
            alert("success: " + data.Success);
        },
        error: function() {
            alert("Error!");
        }
    });
}
```

**URL for Web API kall**

[https://proms.hemitdev.org/PromsWebApi/api/unsecuremessagesms](https://proms.hemitdev.org/PromsWebApi/api/unsecuremessagesms)

**Parametere - Inn**

* apiKey - ApiKey of the end user system placing the order
* smsText – Nonsensitive message to be sent
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* phoneNumber - Optional. The mobile number if provided

The mobile number if provided One of the parameters nationalId or phoneNumber must be provided.

One of the parameters nationalId or phoneNumber must be provided.

**Parametere – Ut**

* success – true or false, whether sending message was ok

**Metode**

POST

### Sende melding server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: [NuGet repository](https://pkgs.dev.azure.com/hemit/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages/nuget/v3/index.json)

Navn: Hemit.ePROM.Integration

**Eksempelkode (C#)**

``` 
[HttpPost]
public JsonResult SendUnsecureMessageSms(string nationalId)
{
    var promsApiBaseUrl = ConfigurationManager.AppSettings["PromsApiBaseUrl"];
    var smsText = "En ikkeSensitivMelding som ikke er sensitiv";
    var apiKey = ConfigurationManager.AppSettings["PromsApiKey"];
    var response = Api.SendUnsecureMessageSms(promsApiBaseUrl, apiKey, smsText, nationalId);
    if (result.HasErrors)
    {
        Response.StatusCode = result.ErrorStatusCode.Value;
        Response.Write(result.ErrorJson);
        return null;
    }

    return Json(new {success = response.Success});
}
```

**Parametere - Inn**

* apiKey - ApiKey of the end user system placing the order
* smsText – Nonsensitive message to be sent
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* phoneNumber - Optional. The mobile number if provided

One of the parameters nationalId or phoneNumber must be provided.

promsApiBaseUrl skal være https://proms.hemitdev.org/PromsWebApi

**Parametere – Ut**

* SendUnsecureMessageSmsResult
  + success – true og false, whether sending message was ok

 
### Feilsituasjoner

**Følgende feilsituasjoner kan oppstå:**

* BadRequest($"apiKey '{message.apiKey}' doesn't exists")
* BadRequest("Either nationalId or phoneNumber must be specified")

 
## SENDE MELDING SOM EPOST

Hvis man har behov for å sende informasjon til pasienten kan man sende dette som Epost via PROMs.

**Det er viktig at dette er ikke-sensitiv informasjon.**

Bestilling av skjema kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.

Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

 

### Sende melding klient-side

Eksempelkode (javascript)

``` javascript
function sendUnsecureMessageEmail() {
    var url = 'https://proms.hemitdev.org/PromsWebApi/api/unsecuremessageemail'; // Demo server
    var apiKey = ""; // The ApiKey for your system
    var emailTitle = " En ikkeSensitivTittel som ikke er sensitiv "; // Subject
    var emailText = " En ikkeSensitivMelding som ikke er sensitiv "; // Message
    var nationalId = "26073941651"; // the national ID of the patient (Norsk fødselsnummer or D-nummer)
    var emailAddress = ""; // The email address if provided

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            apiKey,
            emailTitle,
            emailText,
            nationalId,
            emailAddress
        }),
        success: function(data) {
            alert("success: " + data.Success);
        },
        error: function() {
            alert("Error!");
        }
    });
}
```

**URL for Web API kall**

[https://proms.hemitdev.org/PromsWebApi/api/unsecuremessageemail](https://proms.hemitdev.org/PromsWebApi/api/unsecuremessageemail)

**Parametere - Inn**

* apiKey - ApiKey of the end user system placing the order
* emailTitle – Nonsensitive subject of email
* emailText – Nonsensitive message to be sent
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* emailAddress - Optional. The email address if provided

One of the parameters nationalId or emailAddress must be provided.

**Parametere – Ut**

* success – true or false, whether sending message was ok

**Metode**

POST

 

### Sende melding server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: [NuGet repository](https://pkgs.dev.azure.com/hemit/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages/nuget/v3/index.json)

Navn: Hemit.ePROM.Integration

Eksempelkode (C#)

``` 
[HttpPost]
public JsonResult SendUnsecureMessageEmail(string nationalId)
{
    var promsApiBaseUrl = ConfigurationManager.AppSettings["PromsApiBaseUrl"];
    var emailTitle = "En ikkeSensitivTittel som ikke er sensitiv";
    var emailText = "En ikkeSensitivMelding som ikke er sensitiv";
    var emailAddress = "";
    var apiKey = ConfigurationManager.AppSettings["PromsApiKey"];
    var response = Api.SendUnsecureMessageEmail(promsApiBaseUrl, apiKey, emailTitle, emailText, nationalId, emailAddress);
    if (result.HasErrors)
    {
        Response.StatusCode = result.ErrorStatusCode.Value;
        Response.Write(result.ErrorJson);
        return null;
    }

    return Json(new {success = response.success});
}
```

**Parametere - Inn**

* apiKey - ApiKey of the end user system placing the order
* emailTitle – Nonsensitive title of the message to be sent
* emailText – Nonsensitive message to be sent
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* emailAddress - Optional. The email address if provided

One of the parameters nationalId or emailAddress must be provided.

promsApiBaseUrl skal være https://proms.hemitdev.org/PromsWebApi

**Parametere – Ut**

* SendUnsecureMessageEmailResult

 * success – true og false, whether sending message was ok

### Feilsituasjoner

Følgende feilsituasjoner kan oppstå:

* BadRequest($"apiKey '{message.apiKey}' doesn't exists")
* BadRequest("Either nationalId or emailAddress must be specified")

