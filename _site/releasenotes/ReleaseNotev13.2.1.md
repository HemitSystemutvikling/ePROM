# Endringer i ePROM v13.2.1
*juni 2025*

### Teknisk
- Helsenorge [FinnFormidlingskanal API](https://helsenorge.atlassian.net/wiki/spaces/HELSENORGE/pages/1863024641/Finn+formidlingskanal) unntak ved feilkode.
  - Når det spørres på nationalId som ikke helsenorge klarer å finne så returnerer helsenorge feilkode: `FFK-010001`. Endret til at ePROM går videre i stedet for å kaste en exception hvis denne feilkoden oppstår.


[Tilbake](./Releaselist) 