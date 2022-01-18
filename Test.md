
## Verifisering av integrasjoner i testmiljø

Følgende punkter må verifiseres i testmiljø for nye integrasjoner

### 1) Bestilling av skjema:
- verifiser mottak av svar på bestilling (synkront)
  - engangskode sendes med dersom notification channel = 0
- verifiser mottak av status på bestilling (asynkront)
  - verifiser at skjema blir bestilt til forventet kanal (riktig notification channel) 
- Mål: ingen feilsituasjoner eller duplikate meldinger

### 2) Utfylling av skjema
- logg inn som testperson og besvar skjema 
  - verifiser at skjema vises som forventet og har forventet oppførsel   
  - verifiser at følgebrev vises som forventet
  - verifiser at ev metadata fungerer etter hensikten
  - _helsenorge:_ verifiser at skjemaoppgave vises som forventet
  - _på vegne av:_ verifiser at informasjon om dette vises i skjemaoppgave og i inne i skjemaet
  - _signering:_ verifiser at skjema må signeres før levering
- Mål: skjema, følgebrev og skjemaoppgave (på helsenorge) fungerer etter spesifikasjonene

### 3) Retur av skjema til bestillersystemet
- verifiser mottak av skjemasvar
- _helsenorge:_ verifiser at kopi av skjema blir lagret/ikke lagret som forventet avhengig av spesifikasjonen
- _signering:_ verifiser nedlasting av signert dokument (for skjema som krever signatur)
- Mål: bestillersystemet mottar svaret. Ingen feilsituasjoner. Ingen duplikate meldinger.

## Testmiljø

ePROM admin: https://proms2.hemit.org/PromsAdministration

ePROM skjemautfyller: https://proms2.hemit.org/Proms (bl.a. for skjema med engangskode)

Helsenorge: https://tjenester-hn-prodkopi-01.int-hn.nhn.no/?pnr=[pnr]

### Testperson Helsenorge
Pnr: 01039494104

Engangskode: otp (for innlogging med ID-porten i test)

Personlig passord: qwer1234 (for innlogging med ID-porten i test)


