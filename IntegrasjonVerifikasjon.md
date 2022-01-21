
## Verifisering av integrasjoner i testmiljø

Verifisering av integrasjonen tar utgangspunkt i at alt er implementert som beskrevet i integrasjonsguiden som finnes [her](Integrasjonsguide). 

__NB:__ Følgende punkter __skal__ verifiseres i testmiljø for alle nye integrasjoner:

### 1) Bestilling av skjema:
- verifiser at bestilling blir sendt til ePROM uten feilmelding
- verifiser mottak av status på bestilling 
  - verifiser at skjema blir bestilt til forventet varslingskanal 
- Mål: ingen feilsituasjoner eller duplikate meldinger

### 2) Utfylling av skjema
- logg inn som testperson på [helsenorge](https://tjenester-hn-prodkopi-01.int-hn.nhn.no/?pnr=[pnr]) og besvar skjema 
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

ePROM admin: [https://proms2.hemit.org/PromsAdministration](https://proms2.hemit.org/PromsAdministration)

ePROM skjemautfyller: [https://proms2.hemit.org/Proms](https://proms2.hemit.org/Proms) (bl.a. for skjema med engangskode)

ePROM bestillingsAPI: [https://proms2.hemit.org/promswebapi/api/v2/formorder](https://proms2.hemit.org/promswebapi/api/v2/formorder)

Helsenorge: [https://tjenester-hn-prodkopi-01.int-hn.nhn.no/?pnr=[pnr]](https://tjenester-hn-prodkopi-01.int-hn.nhn.no/?pnr=[pnr])

### Testperson Helsenorge
Pnr: 01039494104

Engangskode: otp (for innlogging med ID-porten i test)

Personlig passord: qwer1234 (for innlogging med ID-porten i test)

[Tilbake](./)
