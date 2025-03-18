# Endringer i ePROM v13.1 - _Under utvikling_
*April 2024*

### Generelt
- Representasjon på Helsenorge
  - "På vegne av" funksjonalitet er ikke lenger aktiv mot helsenorge.  
    Hvis det kommer ei [bestilling av skjema med "På vegne av" (tilordnet onBehalfOfNationalId)](../BestillingAvSkjemaV2) så vil skjema bli sendt til onBehalfOfNationalId hvis denne personen kan representeres på Helsenorge. Hvis personen ikke kan kontaktes på helsenorge så vil [vanlig "På vegne av" rutine](../PaVegneAvFlyt) følges mot de andre distribueringskanalene.

### Feilretting
- Brevutsending på papir
  - DigDir sin avtale med posten er ikke lenger gyldig, de har nå avtale med skatteetaten så vi flytter også over til den.

### Teknisk
- Papirskjema
  - Byttet ut komponentet for generering av QR koder på papirskjema


[Tilbake](./Releaselist) 