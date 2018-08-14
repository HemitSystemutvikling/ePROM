# ePROMS Integrasjonsguide 
### v1.13

*Gjelder v2.0 av PROMS*

*Sist oppdatert 06.08.2018*

### Innhold


# GENERELT

## Pasientløsning PROMS
For å se / fylle ut de bestilte skjemaene kan man finne de igjen i pasientløsningen:

[https://proms2.hemit.org/Proms](https://proms2.hemit.org/Proms)

Her finner man alle skjema som er bestilt og man kan f.eks. teste innsending av skjemaer. Pålogging med BankID eller engangskode.


## Testpersoner
PROMS i testmiljøet integrerer med Helsenorge og Digipost sine testmiljøer. For å teste integrasjonen mellom PROMS, Helsenorge og Digipost har vi tilgang til fødselsnummer med BankID. Midlertidig tilgang til disse fås ved henvendelse til Hemit.


## Distribusjonsregler
Vha. parameteren **DistributionRule** kan man bestemme hvordan pasientskjemaet skal distribueres til pasienten. Varslingskanalene er definert i parameteren **NotificationChannel**

Default **DistributionRule** er *Basic* og betyr at PROMS først sjekker om pasienten er tilgjengelig på Helsenorge. Hvis ikke sjekkes det om pasienten har sikker digital postkasse. Hvis **DistributionRule** er satt til *AllowUnsecure* sjekkes det om pasienten er registrert i Difi Kontaktregister med epostadresse eller mobilnummer. Hvis **DistributionRule** er satt til *NoDistribution* sendes det ikke ut varsling til pasienten. Dette kan benyttes hvis Bestillersystemet skal gi engangskode til pasienten. *BasicOrPaper* og *AllowUnsecureOrPaper* er samme som hhv *Basic* og *AllowUnsecure*, men med papir som siste utvei. *PaperOnly* sender kun på papir.

### DistributionRule
```
0 = Basic
1 = AllowUnsecure
2 = NoDistribution
3 = BasicOrPaper
4 = AllowUnsecureOrPaper
5 = PaperOnly
```

### NotificationChannel
```
0 = None
1 = Helsenorge
2 = DigitalMailbox
3 = Unsecure
4 = PhysicalMailbox
```

# BESTILLING AV SKJEMA

Bestilling av skjema kan gjøres både fra server-side og fra klient-side. Ved kall fra server-side kan man benytte seg av et API utviklet av Hemit og distribuert som NuGet pakke for å forenkle oppkoblingen.
Alle URL’ene som er oppgitt i dette dokumentet går mot integrasjonsmiljøet for PROMS

## Bestilling klient-side

**Eksempelkode (javascript)**
```javascript
function placeFormOrder() {
    var url = 'https://proms2.hemit.org/PromsWebApi/api/v2/formorder'; // Demo server
    var apiKey = ""; // The ApiKey for your system
    var formId = "1bc5f9f0-2607-49eb-94f0-6af955bbd79a"; // RAND-12
    var nationalId = "26073941651"; // the national ID of the patient (Norsk fødselsnummer or D-nummer)
    var expiryDate = new Date(new Date().getTime() + (86400000 * 7)); // add 7 days
    var reminderDate = new Date(new Date().getTime() + (86400000 * 6)); // add 6 days
    var metadata = JSON.stringify({ age: 76 });
    var dontStoreCompletedFormInPha = false;
    var distributionRule = "Basic"; 

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: { "Authorization": "Basic " + apiKey },
        data: JSON.stringify({ formId, nationalId, expiryDate, reminderDate, metadata, dontStoreCompletedFormInPha, distributionRule }),
        success: function (data) {
            alert("formOrderId: " + data.id + "\nsingleUseCode: " + data.singleUseCode + "\nloginUrl: " + data.loginUrl + "\npreferred notificationChannel: " + data.notificationChannel);
        },
        error: function () {
            alert("Error!");
        }
    });
}
```

**URL for Web API kall**

[https://proms2.hemit.org/PromsWebApi/api/v2/formorder]

