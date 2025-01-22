# BESTILLING AV SKJEMA V1 - UTGÅTT

*Sist oppdatert 27.08.2019*

## Innholdsfortegnelse

[Bestilling klient-side](#bestilling-klient-side)

[Bestilling server-side](#bestilling-server-side)

[Feilsituasjoner](#feilsituasjoner)


Bestilling av skjema kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

## Bestilling klient-side

**Eksempelkode (javascript)**

``` javascript
function placeFormOrder() {
    var url = 'https://proms.hemitdev.org/PromsWebApi/api/formorder'; // Demo server
    var apiKey = ""; // The ApiKey for your system
    var formId = "1bc5f9f0-2607-49eb-94f0-6af955bbd79a"; // RAND-12
    var nationalId = "26073941651"; // the national ID of the patient (Norsk fødselsnummer or D-nummer)
    var expiryDate = new Date(new Date().getTime() + (86400000 * 7)); // add 7 days
    var reminderDate = new Date(new Date().getTime() + (86400000 * 6)); // add 6 days
    var metadata = JSON.stringify({
        age: 76
    });
    var dontStoreCompletedFormInPha = false;
    var distributionRule = "Basic";
    var physicalAddress = null;
    var testMode = false;

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Basic " + apiKey
        },
        data: JSON.stringify({
            formId,
            nationalId,
            expiryDate,
            reminderDate,
            metadata,
            dontStoreCompletedFormInPha,
            distributionRule,
            physicalAddress,
            testMode
        }),
        success: function(data) {
            alert("formOrderId: " + data.id + "\nsingleUseCode: " + data.singleUseCode + "\nloginUrl: " + data.loginUrl + "\npreferred notificationChannel: " + data.notificationChannel);
        },
        error: function() {
            alert("Error!");
        }
    });
}
```

**URL for Web API kall**

[https://proms.hemitdev.org/PromsWebApi/api/formorder]

**Parametere - Inn**

* apiKey - ApiKey of the end user system placing the order
* formId - The form to place an order for
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* expiryDate - The expiry date of the order
* reminderDate - Optional. The date to send a reminder for the order. If not set or NULL, no reminder will be sent
* metadata - Optional. Metadata to send with the order. Pass metadata, like the patient age, as a parameter to this method using an stringified JSON object (ex. JSON.stringify({ age: 76 }))
* dontStoreCompletedFormInPha - Optional. If true, the completed form will not be stored in the patients "Personlig helsearkiv" (Helsenorge) or sent to secure digital mailbox. Default: false
* distributionRule - Optional. The rule used when deciding how to notify the patient `{ Basic | AllowUnsecure | NoDistribution | BasicOrPaper | AllowUnsecureOrPaper | PaperOnly | HelsenorgeOnly | DigitalMailboxOnly | UnsecureOnly }` . Tallverdien kan sendes. Default: Basic
* physicalAddress - Optional. The address to use when sending to physical mailbox. If none is supplied, the address registered in Folkeregisteret is used. PhysicalAddress is a JSON object in the following format:

``` 
{
    fullName: "Test Testesen",
    addressLine1: "Testeveien 1",
    postalCode: "1234",
    postalPlace: "Testestad"
}
```

* testMode - Optional. Set to true when the order is created from ePROM Admin and the form answer shall not to be returned to the BestillerSystem. Default: false

**Parametere – Ut**

I tillegg til alle inn-parametre:

* id – The id of this form order
* singleUseCode – A code linked to this form order that the patient can use in combination with his date of birth to log in to PROMS to fill out the ordered form. This parameter only has a value when distributionRule is NoDistribution
* loginUrl – URL the patient can use to log in to PROMS to fill out the ordered form
* notificationChannel – The preferred channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure | PhysicalMailbox }` . The actual channel used is first known when PROMS performs the callback, notifying about the status.

**Metode**

POST

## Bestilling server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: https://hemit.myget.org/F/hemitpublic/api/v3/index.json

Navn: Hemit.Proms.Integration

**Eksempelkode (C#)**

``` javascript
[HttpPost]
public JsonResult OrderPromsForm(Guid formId) {
    var form = _context.FormService.GetForm(formId);
    var patient = _context.PatientInRegistryService.GetByFormGuid(formId);

    var promsFormId = _formTypeToPromsFormIdMapping[(FormType) form.FormTypeId];

    var result = Api.CreateFormOrderV2(
        ConfigurationManager.AppSettings["PromsApiBaseUrl"],
        ConfigurationManager.AppSettings["PromsApiKey"],
        promsFormId,
        patient.DecryptedPID,
        DateTime.Now.AddDays(7),
        DateTime.Now.AddDays(6),
        GetMetadata(promsFormId, form, patient) false,
        DistributionRule.AllowUnsecure,
        null,
        false);

    if (result.HasErrors) {
        Response.StatusCode = result.ErrorStatusCode.Value;
        Response.Write(result.ErrorJson);
        return null;
    }

    _promsFormOrderService.Add(result.FormOrderId, form.Id, form.ReshId);

    return Json(new {
        loginUrl = result.LoginUrl,
            singleUseCode = result.SingleUseCode,
            notificationChannel = result.NotificationChannel.ToString()
    });
}
```

**Parametere - Inn**

* promsApiBaseUrl - The base URL of the PROMS API
* apiKey - ApiKey of the end user system placing the order
* formId - The form to place an order for
* nationalId - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* expiryDate - The expiry date of the order
* reminderDate - The date to send a reminder for the order. If NULL, no reminder will be sent
* metadata - Optional. Metadata to send with the order. Pass metadata, like the patient age, as a parameter to this method using an anonymous object (ex.new { age = 23 }).
* dontStoreCompletedFormInPha - Optional. If true, the completed form will not be stored in the patients "Personlig helsearkiv" (Helsenorge) or sent to secure digital mailbox. Default: false
* distributionRule - Optional. The rule used when deciding how to notify the patient `{ Basic | AllowUnsecure | NoDistribution | BasicOrPaper | AllowUnsecureOrPaper | PaperOnly } ` . Tallverdien kan sendes. Default: Basic
* physicalAddress - Optional. The address to use when sending to physical mailbox. If none is supplied, the address registered in Folkeregisteret is used
* testMode - Optional. Set to true when the order is created from ePROM Admin and the form answer shall not to be returned to the BestillerSystem. Default: false

promsApiBaseUrl skal være https://proms.hemitdev.org/PromsWebApi

**Parametere – Ut**

* CreateFormOrderResult
  + FormOrderId – The id of this form order
  + SingleUseCode – A code linked to this form order that the patient can use in combination with his date of birth to log in to PROMS to fill out the ordered form. This parameter only has a value when distributionRule is NoDistribution
  + LoginUrl – URL the patient can use to log in to PROMS to fill out the ordered form
  + NotificationChannel – The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure | PhysicalMailbox }` . The actual channel used is first known when PROMS performs the callback, notifying about the status.

## Feilsituasjoner

Hvis responsen resulterer i "id": "00000000-0000-0000-0000-000000000000" er det ikke generert noe bestilling. Dette skjer hvis fødselsnummeret ikke eksisterer.
Ellers kan følgende feilsituasjoner oppstå:

* BadRequest("The ordered form is not Published")
* BadRequest($"No form with id='{formOrder.formId}' exists")
* BadRequest($"The ordered form needs to be signed. This is not possible when using DistributionRule = 'NoDistribution'.")
* BadRequest($"Form with id='{formOrder.formId}' is not paper enabled")

 

