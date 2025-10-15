# Endringer i ePROM v13.5
*xxxx 2025*

### Generelt
- Ny versjon av `Hemit.ePROM.Integration`: [*Hemit.ePROM.Integration v13.5.0*] --TODO
    - Ny tjeneste `GetResidentsActivePiForDefinitionV2Async`som henter en liste med innbyggere sine personverninnstillinger
       - Request: `GetResidentsActivePiForDefinitionRequestV2` der 
            - `PagingReference`: Skal være med i request. Start med verdien “0”. Nye kall må gjøres med mottatt pagingReference så lenge denne er større enn verdien “0”
            - `PvkId`: id til personvernsinnstillingen man ønsker liste for
       - Response: `GetResidentsActivePiForDefinitionResponse`
            - `PagingReference`: Dersom den har verdien 0, trenger det ikke å gjøres flere kall. Dersom annen verdi, må det gjøres etterfølgende kall med angitt pagingReference.
            - `Id`: GUID for den personverninnstilling definisjon det ble spurt på.
            - `Name`: Navn på den forespurte personverndefinisjonen.
            - `PartKode`: Kortnavn som identifisere det aktuelle register/screeningprogram/forskningsprosjekt som eier den aktuelle personverninnstilling.
            - `Type`: Type personverninnstilling
            - `PersonvernInnstillinger`: En liste med alle de innbygger som har en aktiv instans (aktiv reservasjon, samtykke eller tilgangsbegrensning)

### Teknisk
- Hangfire jobb for å rydde i HelsenorgeTask-tabellen

### Feilretting
- Rettet opp datoformat på DigiPost 
