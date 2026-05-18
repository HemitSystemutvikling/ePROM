# Endringer i ePROM v13.8.2
*xx.05.2026*  

### Feilretting
- Etter bytte av [DPI-aksesspunktleverandør til Orbyt](https://samarbeid.digdir.no/digital-postkasse/loypemelding-ny-aksesspunktleverandor-digital-post-til-innbygger/3463) returnerer ikke API-et `dpi/messages/in` lenger `id` i svaret. `GetReceiptsAsync()` er oppdatert til å hente receiptId fra `InstanceIdentifier` i `StandardBusinessDocumentHeader` (SBDH) i stedet.


[Tilbake](./Releaselist)
