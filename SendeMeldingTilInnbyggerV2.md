# SENDE MELDING TIL INNBYGGER V2

*Sist oppdatert 12.12.2019*

## Innholdsfortegnelse

[Sende melding klient-side](#sende-melding-klient-side)

[Sende melding server-side](#sende-melding-server-side)

[Feilsituasjoner](#Feilsituasjoner)

[Mottak av status for forsendelse](#mottak-av-status-for-forsendelse)


API-kallet for å sende sensitiv informasjon er i v2 endret slik at man får respons med en gang, uten å vente på at forsendelsen har gått igjennom til Helsenorge/Digipost. Når forsendelsen er fullført (pasienten har fått beskjed og brevet er tilgjengelig) vil ePROM gjøre et kall mot Bestillersystemet med status for forsendelsen. Bestillersystemet må implementere en service som mottar dette kallet.

Hvis man har behov for å sende sensitiv informasjon til pasienten kan man sende dette via ePROM.

Utsending av melding kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

NB!
I verson v2 av API'et skal ApiKey sendes som en `Authorization` parameter som del av HTTP header:
`headers: {"Authorization": "Basic " + apiKey}` 

## Sende melding klient-side

**URL for Web API kall**
[https://proms2.hemit.org/PromsWebApi/api/messagetocitizen](https://proms2.hemit.org/PromsWebApi/api/messagetocitizen)

**Parametere – Inn**

* apiKey - ApiKey of the end user system placing the order
* formId - The form to place an order for
* nationalId  - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* senderInfo - Information about the sender
* messageInfo - Information about the message
* documentCollection – Collection of documents to send to citizen
* notificationChannel - The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure }` Tallverdien kan sendes.
* testMode - Optional. Set to true when the order is created from ePROM Admin and the form answer shall not to be returned to the BestillerSystem. Default: false

**Parametere – Ut**

* notificationChannel – The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure }` 

**Metode**

POST

## Sende melding server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: [https://hemit.myget.org/F/hemitpublic/api/v3/index.json](https://hemit.myget.org/F/hemitpublic/api/v3/index.json)

Navn: Hemit.Proms.Integration

Eksempelkode (C#)

``` 
[HttpPost]
public JsonResult SendMessageToCitizenV2(string nationalId, DocumentCollection documentCollection)
{
// <add key="PromsApiBaseUrl" value="http://mrsdev.helsemn.no/PromsWebApi/" />
var promsApiBaseUrl = ConfigurationManager. AppSettings["PromsApiBaseUrl"]; 
var apikey = ConfigurationManager. AppSettings["ApiKey"]; 
var messageInfo = new MessageInfo {

    title = "Ikkesensitiv tittel på melding",
    description = "Beskrivelse av melding",
    merknad = "Helseundersøkelsene i Nord Trøndelag - HUNT"

}; 
var senderInfo = new SenderInfo {

    organisationName = "Navn på organisasjon",
    organisationNr = "Organisasjon nr"

}; 
var notificationPriorityList = new List<NotificationChannel>
{

    NotificationChannel.Helsenorge,
    NotificationChannel.DigitalMailbox

}; 

    var result = Api.SendMessageToCitizenV2(

promsApiBaseUrl, 
apikey, 
nationalId, 
senderInfo, 
messageInfo, 
documentCollection, 
notificationPriorityList,
false); 

    if (result.HasErrors)
    {
        Response.StatusCode = result.ErrorStatusCode.Value;
        Response.Write(result.ErrorJson);
        return null;
    }

    return Json(new { 
notificationChannel = result.NotificationChannel }); 
}
```

**Parametere - Inn**

* promsApiBaseUrl - The base URL of the PROMS API
* apiKey - ApiKey of the end user system placing the order
* nationalId - The national id number of the patient the ordered form is addressing (must be either Norsk fødselsnummer or D-nummer)
* senderInfo - Information about the sender
* messageInfo - Information about the message
* documentCollection – Collection of documents to send to citizen
* notificationChannel - The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure }` Tallverdien kan sendes.
* testMode - Optional. Set to true when the order is created from ePROM Admin and the form answer shall not to be returned to the BestillerSystem. Default: false

promsApiBaseUrl skal være https://proms2.hemit.org/PromsWebApi

**Parametere – Ut**

* SendMessageToCitizenResult

 * notificationChannel – The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure }` 

## Feilsituasjoner

Hvis responsen resulterer i `"notificationChannel": "0"` er det ikke sendt noe melding til innbygger. Dette skjer hvis ePROM ikke kan nå innbygger via helsenorge, digipost. Dette er også tilfelle hvis fødselsnummeret ikke eksisterer.

Ellers kan følgende feilsituasjoner oppstå:

* 504 GatewayTimeout, "Timeout while waiting for response from Helsenorge"
* 502 BadGateway, "Unable to communicate with Helsenorge. No message sent."
* 400 BadRequest("Main document in MessageToCitizen is missing")
* 400 BadRequest($"apiKey '{formOrder.apiKey}' doesn't exists")
* 400 BadRequest($"No form with id='{formOrder.formId}' exists")


## Mottak av status for forsendelse

API-kallet for å sende sensitiv informasjon er i v2 endret slik at man får respons med en gang, uten å vente på at forsendelsen har gått igjennom til Helsenorge/Digipost. Når forsendelsen er fullført (pasienten har fått beskjed og brevet er tilgjengelig) vil ePROM gjøre et kall mot Bestillersystemet med status for forsendelsen. Bestillersystemet må implementere en service som mottar dette kallet.

**URL for Web API kall**

ApiBaseUrl for web API registreres i ePROM Selvbetjeningsmodul under Bestillersystem: [https://proms2.hemit.org/PromsAdministration/](https://proms2.hemit.org/PromsAdministration/)

Web API må være tilgjenglig på URL: https:// `<ApiBaseUrl>` /api/MessageToCitizen

F.eks: [https://mrsdev.helsemn.no/PromsTestregisterServices/api/MessageToCitizen/](https://mrsdev.helsemn.no/PromsTestregisterServices/api/MessageToCitizen/)

**Parametere - Inn**

* apiKey – ApiKey of the end user system placing the order
* formOrderId – The Id of the formOrder
* notificationChannel – The actual channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure | PhysicalMailbox }` 
* formOrderStatus – Status of the formOrder `{ Ordered | Error }` 
  + Ordered – The formOrder was successful
  + Error – The formOrder was not successfull. For time being, the only reason for this is when the patient cannot be notified because there is no way to make contact.

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
    "formOrderStatus" : "Ordered"
}
```

