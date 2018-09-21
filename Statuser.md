TargetFormId =  GUID til bestillingerskjema
TargetFormTypeId =  1 er hovedskjema, 2 er oppfølgingsskjema
CreatedFormId = når PROMS kommer tilbake fra pasient er dette skjema GUIDen den fikk
Code =  koden som ble generert for å logge seg ved utfylling av skjema

OrderStatus:
0 = bestilt
1 = besvart
2 = utgått
3 = feilet

ErrorCode:
0 = ingen feil
1 = ukjent feil (bør ikke skje)
2 = tidligere  bestilt
3 = Person er ikke digitalt aktiv eller har ikke sikker digital postkasse
4 = Ekstern feil (bør ikke skje)
5 = Intern feil (bør ikke skje)
6 = pasient er død
7 = Feil fra PROMS server (bør ikke skje)

NotificationChannel
0= pasient har ikke fått beskjed, det vil si engangskode eller feilet bestilling
1 = helsenorge
2 = digital mailbox
3 = fysisk brev
4 = epost eller sms

UniqueId = internt ID for å forhindre dobbeltbestillinger, trenger ikke tenke på denne

DistributionRule:
0 = skjema bestilt via sikker kanal, helsenorge eller digital mailbox –
1 = tillater usikker utsendelse, sms eller epost 
2 = sendes ikke til pasient, må levere kode manuelt
