# Endringer i ePROM v13.1 - _Under utvikling_
*Mai 2024*

### Generelt
- Representasjon på helsenorge
  - "På vegne av" funksjonalitet er ikke lenger aktiv mot helsenorge.  
    Hvis det kommer en [bestilling av skjema med "På vegne av" (tilordnet onBehalfOfNationalId)](../BestillingAvSkjemaV2) vil skjema bli sendt til onBehalfOfNationalId hvis denne personen kan representeres på Helsenorge. Hvis personen ikke kan kontaktes på helsenorge vil [vanlig "På vegne av" rutine](../PaVegneAvFlyt) følges mot de andre distribueringskanalene.
  - Ved besvarelse av skjema så vil informasjon om utfyller legges ved når besvarelsen videresendes til bestillersystemet. Se [RETUR AV UTFYLT SKJEMA](../ReturAvUtfyltSkjema)

### Feilretting
- Brevutsending på papir
  - DigDir sin avtale med posten er ikke lenger gyldig, de har nå avtale med skatteetaten så vi flytter også over til den.

### Teknisk
- Papirskjema
  - Byttet ut komponentet for generering av QR koder på papirskjema.
  - Forbedringer relatert til verifisering av tolkningsmal.
- Separerer logikk for brevutsending og skjemautsending  

### Diverse
- UI forbedringer i administrator modul.
- Logging av brukeraktivitet i administrator modul.
- Ny nuget integrasjonspakke er tilgjengelig: [*Hemit.ePROM.Integration v10.0.0*-BYTT UT DENNE](https://dev.azure.com/hemit/Hemit%20offentlig/_artifacts/feed/Hemit_public_packages/NuGet/Hemit.ePROM.Integration/overview/10.0.0)


[Tilbake](./Releaselist) 