# RETUR AV UTFYLT SKJEMA

*Sist oppdatert 18.10.2023*

Når pasienten har fylt ut et skjema sendes skjemaet tilbake til Bestillersystemet.

Bestillersystemet må implementere en service som mottar skjemadataene.

### Mottak

**URL for Web API kall**

ApiBaseUrl for web API registreres i ePROM Selvbetjeningsmodul under Bestillersystem: [https://proms.hemitdev.org/PromsAdministration/](https://proms.hemitdev.org/PromsAdministration/)

Web API må være tilgjenglig på URL: https:// `<ApiBaseUrl>` /api/PromsFormOrder

F.eks: [https://mrsdev.helsemn.no/PromsTestregisterServices/api/PromsFormOrder](https://mrsdev.helsemn.no/PromsTestregisterServices/api/PromsFormOrder)

**Parametere - Inn**

* apiKey – ApiKey of the end user system placing the order
* formOrderId – The Id of the formOrder
* formData - The form data of returned form
* formOrderStatus – Status of the returned formOrder `{ Completed | Expired }` 
* signedFormId – The Id of the signed form if form has been signed
* timestamp – Date and time when the form was submitted
* scannedPaperId – The Id of the scanned paper form if form distributed as paper
* formDataWarnings – A list for form data of returned form with validate warnings
* notificationChannel - The channel used to notify the patient about the form order `{ None | Helsenorge | DigitalMailbox | Unsecure | PhysicalMailbox }` 
* isPatientInitiated -  If the order is initiated by a patient
* patientInitiatedValues - Information about the patient initiated order
  + formId - The Id of the form ordered
  + nationalId - The national id number of the patient ordered the form
  + orderTimestamp - Timestamp when order was initiated
  + orderTimestampUTC - Timestamp when order was initiated in UTC
* formOrderEventLog – Log of events for the form
  + eventType – Events `{ FormOpened | QuestionAccessed | SigningStarted | SigningCancelled | SigningError | SigningCompleted | FormDelivered }`
  + questionId – Id of the question
  + timestampUtc - Timestamp of event

**Parametere - Ut**

* success – true if the request was processed successfully, otherwise false

For parameter inn og ut kan NuGet pakken *Hemit.ePROM.Integration* benyttes. Bruk da *Hemit.ePROM.Integration.PromsFormOrderRequest* for parameter inn og *Hemit.ePROM.Integration.PromsFormOrderResponse* for parameter ut

**Metode**

PUT

Eksempel request fra Proms (JSON)
NB! formData sendes som stringified JSON-object

``` 
{
    "apiKey" : "",
    "formOrderId" : "184738d0-3c39-e611-9c2a-34e6d72e03c7",
    "formData" : '{"HealthGeneral":1,"HealthLimitingActivities":1,"HealthLimitingFloors":1,"PhysicalHealthLessDone":1,"PhysicalHealthLimitingActivity":1,"EmotionalIssuesLessDone":1,"EmotionalIssuesLimitingActivity":1,"LastFourWeeksPain":2,"LastFourWeeksRelaxed":2,"LastFourWeeksSurplusOfEnergy":2,"LastFourWeeksDepressed":2,"LastFourWeeksSocial":1}',
    "formOrderStatus" : "Completed",
    "signedFormId":"00000000-0000-0000-0000-000000000000",
    "timestamp":"2019-05-03T00:00:00+02:00",
    "scannedPaperId":"00000000-0000-0000-0000-000000000000",
    "formDataWarnings":[{"fieldName":"Key","warning":"Value"},{"fieldName":"Key2","warning":"Value2"}],
    "formOrderEventLog" : [{
        eventType: "FormOpened",
        timestampUtc: "2021-05-07 09:17:51.220"
    },{
        eventType: "QuestionAccessed",
        questionId: "HealthGeneral",
        timestampUtc: "2021-05-07 09:18:09.627"
    }]
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
