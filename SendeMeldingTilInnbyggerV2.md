# SENDE MELDING TIL INNBYGGER V2

*Sist oppdatert 18.10.2023*

## Innholdsfortegnelse

[Sende melding klient-side](#sende-melding-klient-side)

[Sende melding server-side](#sende-melding-server-side)

[Feilsituasjoner](#Feilsituasjoner)

[Mottak av status for forsendelse](#mottak-av-status-for-forsendelse)


API-kallet for å sende sensitiv informasjon er i v2 endret slik at man får respons med en gang, uten å vente på at forsendelsen har gått igjennom til Helsenorge/Digipost. Når forsendelsen er fullført (pasienten har fått beskjed og brevet er tilgjengelig) vil ePROM gjøre et kall mot Bestillersystemet med status for forsendelsen. Bestillersystemet må implementere en service som mottar dette kallet.

Hvis man har behov for å sende sensitiv informasjon til pasienten kan man sende dette via ePROM.

Utsending av melding kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

Utsending av brev / melding til innbygger støtter PDF-filer på opp til 30MB

NB!
I verson v2 av API'et skal ApiKey sendes som en `Authorization` parameter som del av HTTP header:
`headers: {"Authorization": "Basic " + apiKey}` 

## Sende melding klient-side

**URL for Web API kall**
[https://proms.hemitdev.org/promswebapi/api/v2/messagetocitizen]

**Parametere – Inn**

* apiKey - ApiKey of the end user system sending the message
* nationalId  - The national id number of the patient the message is addressing (must be either Norsk fødselsnummer or D-nummer)
* senderInfo - Information about the sender
* messageInfo - Information about the message
* documentCollection – Collection of documents to send to citizen
* notificationPriorityList - List of channels where to send the document to the citizen `{ None | Helsenorge | DigitalMailbox | PhysicalMailbox | Unsecure }` The numeric value can be sent.
* testMode - Optional. Set to true when the message is initiated from ePROM Admin and the status shall not to be returned to the BestillerSystem. Default: false
* paperColorPrint - Optional. Set to true when paper should be printed in color. Default: false

**Parametere – Ut**

* notificationChannel – The channel used to send the document to the citizen `{ None | Helsenorge | DigitalMailbox | PhysicalMailbox | Unsecure }` 
* messageToCitizenId – The Id of the message

**Metode**

POST

## Sende melding server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: [https://hemit.myget.org/F/hemitpublic/api/v3/index.json]

Navn: Hemit.ePROM.Integration

Eksempelkode (C#)

``` 
[HttpPost]
public JsonResult SendMessageToCitizenV2(string nationalId, DocumentCollection documentCollection)
{
// <add key="PromsApiBaseUrl" value="http://proms.hemitdev.org/promswebapi/" />
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
notificationChannel = result.NotificationChannel,
messageToCitizenId = result.messageToCitizenId}); 
}
```

**Parametere - Inn**

* promsApiBaseUrl - The base URL of the PROMS API
* apiKey - ApiKey of the end user system sending the message
* nationalId - The national id number of the patient the message is addressing (must be either Norsk fødselsnummer or D-nummer)
* senderInfo - Information about the sender
* messageInfo - Information about the message
* documentCollection – Collection of documents to send to citizen
* notificationChannel - List of channels where to send the document to the citizen `{ None | Helsenorge | DigitalMailbox | PhysicalMailbox | Unsecure }` The numeric value can be sent.
* testMode - Optional. Set to true when the message is initiated from ePROM Admin and the status shall not to be returned to the BestillerSystem. Default: false
* paperColorPrint - Optional. Set to true when paper should be printed in color. Default: false

promsApiBaseUrl skal være https://proms.hemitdev.org/promswebapi

**Parametere – Ut**

* SendMessageToCitizenResult

 * notificationChannel – The channel used to send the document to the citizen `{ None | Helsenorge | DigitalMailbox | PhysicalMailbox | Unsecure }` 
 * messageToCitizenId – The Id of the message

## Feilsituasjoner

Hvis responsen resulterer i `"notificationChannel": "0"` er det ikke sendt noe melding til innbygger. Dette skjer hvis ePROM ikke kan nå innbygger via helsenorge, digipost. Dette er også tilfelle hvis fødselsnummeret ikke eksisterer.

Ellers kan følgende feilsituasjoner oppstå:

* 504 GatewayTimeout, "Timeout while waiting for response from Helsenorge"
* 502 BadGateway, "Unable to communicate with Helsenorge. No message sent."
* 400 BadRequest("Main document in MessageToCitizen is missing")
* 400 BadRequest($"apiKey '{message.apiKey}' doesn't exists")

## Mottak av status for forsendelse

API-kallet for å sende sensitiv informasjon er i v2 endret slik at man får respons med en gang, uten å vente på at forsendelsen har gått igjennom til Helsenorge/Digipost. Når forsendelsen er fullført (pasienten har fått beskjed og brevet er tilgjengelig) vil ePROM gjøre et kall mot Bestillersystemet med status for forsendelsen. Bestillersystemet må implementere en service som mottar dette kallet.

**URL for Web API kall**

ApiBaseUrl for web API registreres i ePROM Selvbetjeningsmodul under Bestillersystem: [https://proms.hemitdev.org/PromsAdministration/](https://proms.hemitdev.org/PromsAdministration/)

Web API må være tilgjenglig på URL: https:// `<ApiBaseUrl>` /api/MessageToCitizen

F.eks: [https://proms.hemitdev.org/PromsTestregisterServices/api/MessageToCitizen/]

**Parametere - Inn**

* apiKey – ApiKey of the end user system sending the message
* messageToCitizenId – The Id of the message
* notificationChannel – The actual channel used to send the document to the citizen `{ None | Helsenorge | DigitalMailbox | PhysicalMailbox | Unsecure }` 
* sentStatus – Status of the message `{ Sent | Error }` 
  + Sent – The message was successfully sent
  + Error – The message was not successfully sent. For time being, the only reason for this is when the patient cannot be notified because there is no way to make contact.

**Parametere - Ut**

* success – true if the request was processed successfully, otherwise false

For parameter inn og ut kan NuGet pakken *Hemit.ePROM.Integration* benyttes. Bruk da *Hemit.ePROM.Integration.SendMessageToCitizenResult* for parameter inn og *Hemit.ePROM.Integration.SendMessageToCitizenResponse* for parameter ut

**Metode**

PUT

Eksempel request fra Proms (JSON)

``` 
{
    "apiKey" : "",
    "messageToCitizenId" : "184738d0-3c39-e611-9c2a-34e6d72e03c7",
    "notificationChannel" : "Helsenorge",
    "sentStatus" : "Sent"
}
```

