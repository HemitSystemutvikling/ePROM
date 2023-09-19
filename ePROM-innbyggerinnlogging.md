# ePROM innbyggerpålogging (ePROM v11.0)


Fra og med ePROM v11.0 vil innlogging endres for innbyggere som skal fylle ut og levere skjema. For innbyggeren vil dette være usynlig, og alt skal fungere som tidligere. Endringen består i at ePROM vil benytte både helsenorge og IdPorten som OIDC-provider for autentisering av innbyggere. Hvilken provider som brukes avhenger av hvilken varslingskanal som blir brukt.

Dersom skjema blir bestilt med varslingskanal helsenorge, blir lenke til skjemautfylling ``https://pasientrapportering.nhn.no/proms/form/{GUID}``. Dette endepunktet benytter helsenorge sin OIDC-provider

Dersom skjema blir bestilt med annen varslingskanal (digipost/eboks, utfylling via lenke, epost/sms), blir lenke til skjemautfylling ``https://pasientrapportering.nhn.no/proms/formIdp/{GUID}``. Dette endepunktet benytter IdPorten sin OIDC-provider.

Den store fordelen med denne endringen er at innbyggere nå vil slippe å logge inn på nytt når skjema åpnes ved bruk av helsenorge-appen på telefon/nettbrett. Det vil gi en mer brukervennlig opplevelse for mange innbyggere, majoriteten fyller ut skjema vha en mobil enhet og med helsenorge som varslingskanal. Single sign-on fra helsenorge og sikker digital postkasse vil fungere som før.

**NB:** __På alle andre måter blir brukeropplevelsen uendret, med et unntak: I en overgangsperiode etter produksjonssetting vil innbyggere som mottar skjemaoppgave på digipost/eboks bli bedt om å samtykke til bruk av helsenorge for å få tilgang til skjemaet sitt.__ 

__Dersom innbygger ikke ønsker dette, men likevel ønsker å fylle ut skjema, kan de bes om gå direkte til https://www.pasientrapportering.nhn.no/proms og velge "Logg på med BankId (ID-porten) her" nederst på siden. Skjemaet vil da være tilgjengelig for utfylling.__




