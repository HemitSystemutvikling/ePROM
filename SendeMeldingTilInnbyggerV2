# SENDE MELDING TIL INNBYGGER

Hvis man har behov for å sende sensitiv informasjon til pasienten kan man sende dette via ePROM.

Utsending av melding kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.

Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for ePROM

### Sende melding klient-side

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

**Parametere – Ut**

* notificationChannel – The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure }` 

**Metode**

POST

### Sende melding server-side

**API**

Tilgjenglig som NuGet pakke

NuGet repository: [https://hemit.myget.org/F/hemitpublic/api/v3/index.json](https://hemit.myget.org/F/hemitpublic/api/v3/index.json)

Navn: Hemit. Proms. Integration

Eksempelkode (C#)

``` 
[HttpPost]
public JsonResult SendMessageToCitizen(string nationalId, DocumentCollection documentCollection)
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

    var result = Api.SendMessageToCitizen(

promsApiBaseUrl, 
apikey, 
nationalId, 
senderInfo, 
messageInfo, 
documentCollection, 
notificationPriorityList); 

    if (result.HasErrors)
    {
        Response.StatusCode = result.ErrorStatusCode.Value;
        Response.Write(result.ErrorJson);
        return null;
    }

    return Json(new { 

notificationChannel = result. NotificationChannel }); 
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

promsApiBaseUrl skal være https://proms2.hemit.org/PromsWebApi

**Parametere – Ut**

* SendMessageToCitizenResult

 * notificationChannel – The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure }` 

### Feilsituasjoner

Hvis responsen resulterer i `"notificationChannel": "0"` er det ikke sendt noe melding til innbygger. Dette skjer hvis ePROM ikke kan nå innbygger via helsenorge, digipost. Dette er også tilfelle hvis fødselsnummeret ikke eksisterer.

Ellers kan følgende feilsituasjoner oppstå:

* 504 GatewayTimeout, "Timeout while waiting for response from Helsenorge"
* 502 BadGateway, "Unable to communicate with Helsenorge. No message sent."
* 400 BadRequest("Main document in MessageToCitizen is missing")
* 400 BadRequest($"apiKey '{formOrder.apiKey}' doesn't exists")
* 400 BadRequest($"No form with id='{formOrder.formId}' exists")

