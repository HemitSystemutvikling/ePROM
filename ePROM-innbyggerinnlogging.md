# ePROM innbyggerpålogging (ePROM v11.0)


Fra og med ePROM v11.0 vil innlogging endres for innbyggere som skal fylle ut og levere skjema. Fra innbyggerens side skjer selve innloggingen på samme måte som tidligere, f.eks. vha BankId (sikkerhetsnivå 4). 

Den store fordelen med denne endringen er at innbyggeren vil slippe å logge inn på nytt når skjema åpnes fra helsenorge-appen på telefon/nettbrett. Det vil gi en mer brukervennlig opplevelse for mange innbyggere, majoriteten fyller ut skjema vha en mobil enhet og via helsenorge. 

**NB:** På alle andre måter blir brukeropplevelsen uendret, med et unntak. I en overgangsperiode etter produksjonssetting vil innbyggere som mottar skjemaoppgave på digipost/eboks bli bedt om å samtykke til bruk av helsenorge for å få tilgang til skjemaet sitt. Dersom innbygger ikke ønsker dette, men likevel ønsker å fylle ut skjema, kan de bes om gå direkte til https://www.pasientrapportering.nhn.no/proms og velge "Logg på med BankId (ID-porten) her" nederst på siden. Skjemaet vil da være tilgjengelig for utfylling.


# Teknisk beskrivelse

ePROM vil benytte både helsenorge og IdPorten som OIDC-provider for autentisering av innbyggere. Hvilken provider som brukes avhenger av hvilken varslingskanal som blir brukt:

Dersom skjema blir bestilt med varslingskanal helsenorge, blir lenke til skjemautfylling ``https://pasientrapportering.nhn.no/proms/form/{GUID}``. Dette endepunktet benytter helsenorge sin OIDC-provider

Dersom skjema blir bestilt med annen varslingskanal (digipost/eboks, utfylling via lenke, epost/sms), blir lenke til skjemautfylling ``https://pasientrapportering.nhn.no/proms/formIdp/{GUID}``. Dette endepunktet benytter IdPorten sin OIDC-provider.

Årsaken til dette er for å kunne støtte single-sign on både fra helsenorge og sikker digital postkasse til ePROM skjemautfyller.

Etter innlogging, uavhengig av OIDC-provider som er brukt, vil innbyggeren ha tilgang til alle sine skjema, da skjemabestilling er knyttet til innbyggerens fødselsnummer.
