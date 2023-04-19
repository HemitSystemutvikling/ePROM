# BESTILLING AV SKJEMA V2

*Sist oppdatert 19.04.2023*

## Innholdsfortegnelse

[Bestilling klient-side](#bestilling-klient-side)

[Bestilling server-side](#bestilling-server-side)

[Feilsituasjoner](#feilsituasjoner)

[Mottak av status for bestillingen](#mottak-av-status-for-bestillingen)


API-kallet for bestilling av skjema er i v2 endret slik at man får respons med en gang, uten å vente på at bestillingen har gått igjennom til Helsenorge/Digipost. Når bestillingen er fullført (pasienten har fått beskjed og skjemaet ligger klart til utfylling) vil ePROM gjøre et kall mot Bestillersystemet med status for bestillingen. Bestillersystemet må implementere en service som mottar dette kallet.

Bestilling av skjema kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

NB!
I verson v2 av API'et skal ApiKey sendes som en `Authorization` parameter som del av HTTP header:
`headers: {"Authorization": "Basic " + apiKey}` 

## Bestilling klient-side

**Eksempelkode (javascript)**

``` javascript
function placeFormOrderV2() {
    var url = 'https://proms2.hemit.org/promswebapi/api/v2/formorder'; // Demo server
    var apiKey = ""; // The ApiKey for your system
    var formId = "1bc5f9f0-2607-49eb-94f0-6af955bbd79a"; // RAND-12
    var nationalId = "26073941651"; // the national ID of the patient (Norsk fødselsnummer or D-nummer)
    var expiryDate = new Date(new Date().getTime() + (86400000 * 7)); // add 7 days
    var metadata = JSON.stringify({
        age: 76
    });
    var dontStoreCompletedFormInPha = false;
    var distributionRule = "Basic";
    var mustBeSigned = false;
    var signingText = null;
    var physicalAddress = null;
    var testMode = false;
    var onBehalfOfNationalId = null;

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
            null,
            metadata,
            dontStoreCompletedFormInPha,
            distributionRule,
            mustBeSigned,
            signingText,
            physicalAddress,
            testMode,
            onBehalfOfNationalId
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

[https://proms2.hemit.org/promswebapi/api/v2/formorder]

**Parametere - Inn**

* apiKey - ApiKey of the end user system placing the order (sendes som `Authorization` parameter som del av HTTP header)
* formId - The form to place an order for
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* expiryDate - The expiry date of the order
* reminderDate - Optional. Reminderdate is ignored as helsenorge does not use it.
* metadata - Optional. Metadata to send with the order. Pass metadata, like the patient age, as a parameter to this method using an stringified JSON object (ex. JSON.stringify({ age: 76 }))
* dontStoreCompletedFormInPha - Optional. If true, the completed form will not be stored in the patients "Personlig helsearkiv" (Helsenorge) or sent to secure digital mailbox. Default: false
* distributionRule - Optional. The rule used when deciding how to notify the patient `{ Basic | AllowUnsecure | NoDistribution | BasicOrPaper | AllowUnsecureOrPaper | PaperOnly | HelsenorgeOnly | DigitalMailboxOnly | UnsecureOnly }` . Tallverdien kan sendes. Default: Basic
* mustBeSigned - Optional. Whether the form must be signed
* signingText - Optional. The text displyed for signing
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
* onBehalfOfNationalId - Optional. The national id number of the citizen the form order is regarding. Should only be supplied when the recipient of the form order is someone else than the person the form order is regarding. Ex. when the recipient is the parent of the patient the form order is regarding. **VIKTIG! Se også ["På vegne av"-funksjonalitet og personvern](#på-vegne-av-funksjonalitet-og-personvern)**

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

NuGet repository: https://hemit.pkgs.visualstudio.com/a7f87e1f-3406-4ac2-a2d4-18e789c37706/_packaging/Hemit_public_packages%40Local/nuget/v3/index.json

Navn: Hemit.Proms.Integration  
Version: 3.0

**Eksempelkode (C#)**

``` csharp
[HttpPost]
public async Task<JsonResult> OrderPromsFormV2Async(Guid formId) {
    var form = _context.FormService.GetForm(formId);
    var patient = _context.PatientInRegistryService.GetByFormGuid(formId);

    var promsFormId = _formTypeToPromsFormIdMapping[(FormType) form.FormTypeId];

    var result = await Api.CreateFormOrderV2Async(
        ConfigurationManager.AppSettings["PromsApiBaseUrl"],
        ConfigurationManager.AppSettings["PromsApiKey"],
        promsFormId,
        patient.DecryptedPID,
        DateTime.Now.AddDays(7),
        null,
        GetMetadata(promsFormId, form, patient) false,
        DistributionRule.AllowUnsecure,
        false,
        null,
        null,
        false,
        null);

    if (result.HasErrors) {
        Response.StatusCode = result.ErrorStatusCode.Value;
        Response.Write(result.ErrorJson);
        return null;
    }

    _promsFormOrderService.Add(result.Data.Id, form.Id, form.ReshId);

    return Json(new {
        loginUrl = result.Data.LoginUrl,
        singleUseCode = result.Data.SingleUseCode,
        notificationChannel = result.Data.NotificationChannel.ToString()
    });
}
```

**Parametere - Inn**

* promsApiBaseUrl - The base URL of the PROMS API
* apiKey - ApiKey of the end user system placing the order (sendes som `Authorization` parameter som del av HTTP header)
* formId - The form to place an order for
* nationalId - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* expiryDate - The expiry date of the order
* reminderDate - Reminderdate is ignored as helsenorge does not use it.
* metadata - Optional. Metadata to send with the order. Pass metadata, like the patient age, as a parameter to this method using an anonymous object (ex.new { age = 23 }).
* dontStoreCompletedFormInPha - Optional. If true, the completed form will not be stored in the patients "Personlig helsearkiv" (Helsenorge) or sent to secure digital mailbox. Default: false
* distributionRule - Optional. The rule used when deciding how to notify the patient `{ Basic | AllowUnsecure | NoDistribution | BasicOrPaper | AllowUnsecureOrPaper | PaperOnly | HelsenorgeOnly | DigitalMailboxOnly | UnsecureOnly }` . Tallverdien kan sendes. Default: Basic
* mustBeSigned - Optional. Whether the form must be signed
* signingText - Optional. The text displyed for signing
* physicalAddress - Optional. The address to use when sending to physical mailbox. If none is supplied, the address registered in Folkeregisteret is used
* testMode - Optional. Set to true when the order is created from ePROM Admin and the form answer shall not to be returned to the BestillerSystem. Default: false
* onBehalfOfNationalId - Optional. The national id number of the citizen the form order is regarding. Should only be supplied when the recipient of the form order is someone else than the person the form order is regarding. Ex. when the recipient is the parent of the patient the form order is regarding. **VIKTIG! Se også ["På vegne av"-funksjonalitet og personvern](#på-vegne-av-funksjonalitet-og-personvern)**

promsApiBaseUrl skal være https://proms2.hemit.org/promswebapi

**Parametere – Ut**

* ResponseWrapper&lt;CreateFormOrderV2Response>
  + HasErrors
  + ErrorStatusCode
  + ErrorJson
  + Data  
    + Id – The id of this form order
    + SingleUseCode – A code linked to this form order that the patient can use in combination with his date of birth to log in to PROMS to fill out the ordered form. This parameter only has a value when distributionRule is NoDistribution
    + LoginUrl – URL the patient can use to log in to PROMS to fill out the ordered form
    + NotificationChannel – The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure | PhysicalMailbox }` . The actual channel used is first known when PROMS performs the callback, notifying about the status.

## Feilsituasjoner

Hvis responsen resulterer i "id": "00000000-0000-0000-0000-000000000000" er det ikke generert noe bestilling. Dette skjer hvis fødselsnummeret ikke eksisterer.
Ellers kan følgende feilsituasjoner oppstå:

* BadRequest("The ordered form is not Published")
* BadRequest($"No form with id='{formOrder.formId}' exists")
* BadRequest($"The ordered form needs to be signed. This is not possible when using DistributionRule = 'NoDistribution'.")
* BadRequest($"The ordered form needs to be signed. This is not possible when the form is ordered on behalf of someone.")
* BadRequest($"Form with id='{formOrder.formId}' is not paper enabled")
* BadRequest($"JSON in metadata is not valid: {ex.Message}")
* BadRequest($"nationalId: FH-nummer is not supported as national ID. The national ID must be either Norsk fødselsnummer or D-nummer.")
* BadRequest($"nationalId: H-nummer is not supported as national ID. The national ID must be either Norsk fødselsnummer or D-nummer.")

## Mottak av status for bestillingen

API-kallet for bestilling av skjema er i v2 endret slik at man får respons med en gang, uten å vente på at bestillingen har gått igjennom til Helsenorge/Digipost. Når bestillingen er fullført (pasienten har fått beskjed og skjemaet ligger klart til utfylling) vil ePROM gjøre et kall mot Bestillersystemet med status for bestillingen. Bestillersystemet må implementere en service som mottar dette kallet.

**URL for Web API kall**

ApiBaseUrl for web API registreres i ePROM Selvbetjeningsmodul under Bestillersystem: [https://proms2.hemit.org/PromsAdministration/](https://proms2.hemit.org/PromsAdministration/)

Web API må være tilgjenglig på URL: https:// `<ApiBaseUrl>` /api/PromsFormOrder

F.eks: [https://mrsweb.hemit.org/PromsTestregisterServices/api/PromsFormOrder/]

**Parametere - Inn**

* apiKey – ApiKey of the end user system placing the order
* formOrderId – The Id of the formOrder
* notificationChannel – The actual channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure | PhysicalMailbox }` 
* timestamp - Timestamp when order was initiated
* timestampUtc - Timestamp when order was initiated in UTC format
* formOrderStatus – Status of the formOrder
  + Ordered – The formOrder was successful
  + Error – The formOrder was not successfull. For time being, the only reason for this is when the patient cannot be notified because there is no way to make contact.
* formOrderStatusErrorCode – ErrorCode of the formOrder
  + None – No error code
  + PatientUnreachable - Unable to notify the pasient bye the selected notification channel.

**Parametere - Ut**

* success – true if the request was processed successfully, otherwise false

For parameter inn og ut kan NuGet pakken *Hemit.Proms.Integration* benyttes. Bruk da *Hemit.Proms.Integration.PromsFormOrderRequest* for parameter inn og *Hemit.Proms.Integration.PromsFormOrderResponse* for parameter ut

**Metode**

PUT

Eksempel request fra Proms (JSON)

``` 
{
    "apiKey" : "",
    "formOrderId" : "184738d0-3c39-e611-9c2a-34e6d72e03c7",
    "notificationChannel" : "Helsenorge",
    "timestamp" : "2023-03-29T10:20:10.1804332",
    "timestampUtc" : "2023-03-29T08:20:10.1804332Z",
    "formOrderStatus" : "Ordered",
    "formOrderStatusErrorCode" : "None"
}
{
    "apiKey" : "",
    "formOrderId" : "184738d0-3c39-e611-9c2a-34e6d72e03c7",
    "notificationChannel" : "None",
    "formOrderStatus" : "Error",
    "formOrderStatusErrorCode" : "PatientUnreachable"
}
```

Eksempel response (JSON)

``` 
{
    "success" : true
}
{
    "success" : false
}
```


[Tilbake](./)
