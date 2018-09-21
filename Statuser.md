### MRS

### Beskrivelse av PROMS bestillinger i MRS
I et MRS register er en oversikt over utførte PROMS-bestillinger tilgjengelig for nedlasting til excel ved å klikke på knappen "Last ned alle bestillinger til excel (råformat)". Her følger en beskrivelse av råformatet.

* **TargetFormId** =  GUID til bestillingerskjema
* **TargetFormTypeId** =  1 er hovedskjema, 2 er oppfølgingsskjema
* **CreatedFormId** = når PROMS kommer tilbake fra pasient er dette skjema GUIDen den fikk
* **Code** =  koden som ble generert for å logge seg ved utfylling av skjema
* **UniqueId** = internt ID for å forhindre dobbeltbestillinger, trenger ikke tenke på denne

### OrderStatus:
Statuskoder for en bestilling:
* 0 = bestilt
* 1 = besvart
* 2 = utgått
* 3 = feilet

### ErrorCode:
Feilkoder som kan oppstå ved en bestillingen:
* 0 = ingen feil
* 1 = ukjent feil (bør ikke skje)
* 2 = tidligere  bestilt
* 3 = Person er ikke digitalt aktiv eller har ikke sikker digital postkasse
* 4 = Ekstern feil (bør ikke skje)
* 5 = Intern feil (bør ikke skje)
* 6 = pasient er død
* 7 = Feil fra PROMS server (bør ikke skje)

### NotificationChannel
Mottaker er varslet via en av følgende kanaler:
* 0 = pasient har ikke fått beskjed, det vil si engangskode eller feilet bestilling
* 1 = helsenorge
* 2 = digital postkasse
* 3 = usikker kanal, epost eller sms
* 4 = fysisk brev

### DistributionRule:
Pasientskjemaet er distribuert med en av følgende regler:
* 0 = *default* - varsling via sikker kanal, helsenorge eller digital postkasse
* 1 = varsling via usikker kanal, epost eller sms, eller *default*
* 2 = varsling sendes ikke, engangskode må ev. leveres manuelt
* 3 = skjema som fysisk brev, eller *default*
* 4 = varsling via usikker kanal, skjema som fysisk brev, eller *default*
* 5 = skjema som fysisk brev
