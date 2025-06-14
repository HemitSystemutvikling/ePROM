# Endringer i ePROM v13.1
*Mai 2025*

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
- Ny nuget integrasjonspakke er tilgjengelig: [*Hemit.ePROM.Integration v13.1.0*](https://dev.azure.com/hemit/Hemit%20offentlig/_artifacts/feed/Hemit_public_packages/NuGet/Hemit.ePROM.Integration/overview/13.1.0)


[Tilbake](./Releaselist) 