# Nytt i ePROM v3.1
*Dato: 07.05.2021*

### ePROM
* Pålogget sesjon holdes aktiv under utfylling av pasientskjemaet. Dette for bl.a. unngå feil ved signering
* Signering av skjema: Endret tittel på kopi av skjemasvar som sendes til utfyller
* Viser Norsk helsenett sin kontaktinformasjon for teknisk support
* Fiks for å vise hjelpetekster på mobile enheter
* For pålogget bruker vises også mellomnavn i pasientskjemaet
* Fiks på visning av epostadresse i pasientskjemaet

### ePROM Admin
* Skjemainformasjon:
  * Mer forståelige tekster
  * Forhåndsvisning gjort mer lesbar
  * Viser logo og navn hvis kjent organisasjonsnummer
* Sletting av Samleskjema sletter også koblinger til unserskjema
* Ikke mulig å slette skjema som er koblet til et Samleskjema

### Teknisk
* Kommunikasjon med Difi Kontaktregister over REST API
* Deler av applikasjonen oppdatert fra .NET Core 2.1 til .NET 5.0
* helsenorge
  * Klientpakke oppdatert for helsenorge.messaging
  * Oppgradert meldingstype "DIALOG_INNBYGGER_MELDINGSFORMIDLING" fra v0.8 til v1.0
  * Klientpakke oppdatert for Digipost og Digipost.Signering
