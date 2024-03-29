# Nytt i ePROM v7.0
*Dato: 17.02.2022*

### ePROM pasientskjema
__NB Endringer i pasientskjema blir gjeldende for alle eksisterende skjema__

* Telling av spørsmål i pasientskjema teller nå alle spørsmål, ikke bare obligatoriske spørsmål
* Forsiden på samleskjema viser framdrift for alle underskjema
  * Viser om et underskjema har obligatoriske spørsmål   
  * Viser hvor mange spørsmål som er besvart og hvor mange spørsmål det er totalt på hvert enkelt underskjema
  * Viser når hvert enkelt underskjema er klart for levering. Dette krever som minimum at skjema har vært åpnet og at obligatoriske spørsmål er besvart
  * Tilpasset visning for underskjema uten spørsmål. Disse blir markert med eget ikon
* Mulighet for å minimere lange følgebrev (Informasjon til pasienten)
  * Følgebrev er alltid åpent første gang skjema åpnes 
* Hovedspørsmål blir ikke lenger formattert i bold som default
* Støtte for skjema på nynorsk (språkkode nn) i tillegg til bokmål og engelsk (gjelder nye skjema)

### ePROM admin
* Statistikk over utsendte skjema
  * Standardrapport for inneværende år, forrige år, forrige måned eller inneværende måned (for alle bestillersystem)
  * Egendefinert rapport (per bestillersystem)
    * Rapporten viser utsendte og besvarte skjema fordelt på varslingskanaler 
* Statistikk over utsendt brev
  * Standardrapport for inneværende år, forrige år, forrige måned eller inneværende måned (for alle bestillersystem)
 
### Teknisk
* Metadata som sendes med i en bestilling fra et bestillersystem blir validert ved mottak
  * Feilmelding sendes tilbake til bestillersystemet dersom metadata er ugyldig  

### Dokumentasjon
* Krav om verifikasjon ved integrasjon
* Tips til å lage gode pasientskjema 

[Tilbake](./Releaselist)

