
## Verifisering av integrasjoner i testmiljø

Verifisering av integrasjonen tar utgangspunkt i at alt er implementert som beskrevet i integrasjonsguiden som finnes [her](Integrasjonsguide). 

__NB:__ Følgende punkter __skal__ verifiseres i testmiljø for alle nye integrasjoner:

### 1) Bestilling av skjema:
- verifiser at bestilling blir sendt til ePROM uten feilmelding
- verifiser mottak av status på bestilling 
  - verifiser at skjema blir bestilt til forventet varslingskanal 
- Mål: ingen feilsituasjoner eller duplikate meldinger

### 2) Utfylling av skjema
- logg inn som testperson på helsenorge og besvar skjema 
  - verifiser at skjema vises som forventet og har forventet oppførsel   
  - verifiser at følgebrev vises som forventet
  - verifiser at ev metadata fungerer etter hensikten
  - verifiser at skjemaoppgave vises som forventet
  - verifiser at kopi av skjema blir lagret/ikke lagret som forventet avhengig av spesifikasjonen (etter levering)
- Mål: skjema, følgebrev og skjemaoppgave fungerer etter spesifikasjonene

### 3) Retur av skjema til bestillersystemet
- verifiser mottak av skjemasvar
- Mål: bestillersystemet mottar svaret. Ingen feilsituasjoner. Ingen duplikate meldinger.

#### Spesialtilfeller
  - _på vegne av:_ verifiser at informasjon om dette vises i skjemaoppgave og i inne i skjemaet, og at den som fyller ut skjema ikke mottar kopi
  - _signering:_ verifiser at skjema blir bestilt med signering, at det må signeres før levering og at nedlasting av signert dokument fungerer

## Testmiljø

### Test

ePROM admin: [https://proms.hemitdev.org/PromsAdministration](https://proms.hemitdev.org/PromsAdministration)

ePROM skjemautfyller: [https://proms.hemitdev.org/proms](https://proms.hemitdev.org/proms) (bl.a. for skjema med engangskode)

ePROM bestillingsAPI: [https://proms.hemitdev.org/promswebapi/api/v2/formorder](https://proms.hemitdev.org/promswebapi/api/v2/formorder)

Helsenorge test: [https://tjenester.hn2.test.nhn.no/?pnr=[pnr]](https://tjenester.hn2.test.nhn.no/?pnr=[pnr])

### QA

ePROM skjemautfyller: [https://pasientrapportering.qa.nhn.no/proms/](https://pasientrapportering.qa.nhn.no/proms/) (bl.a. for skjema med engangskode)

ePROM bestillingsAPI: [https://pasientrapportering.qa.nhn.no/webapi/api/v2/formorder](https://pasientrapportering.qa.nhn.no/webapi/api/v2/formorder)

Helsenorge QA: [https://tjenester.hn.qa.nhn.no/](https://tjenester.hn.qa.nhn.no/)

### Testpersoner Helsenorge (test og QA)

**Testperson som kan benyttes til verifikasjon: 01039494104**

Pnr over brukes med BankID i IdPorten med følgende innloggingsdetaljer:

Engangspassord: otp

Personlig kode: qwer1234

Denne har samtykket på helsenorge i test og QA, men kan også være i bruk av andre bestillersystemer.

[Tilbake](./)
