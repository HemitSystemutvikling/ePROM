# ePROM
ePROM er en nasjonal løsning som gir mulighet for å nå ut til innbyggere på en sikker måte.
Man kan sende pasientskjema for å samle inn pasientrapporterte data og man kan sende ut informasjon.
ePROM løsningen er tilgjengelig for alle registre som er på helsenettet.

## Pasientskjema
Registerene velger fra sine pasienter hvem som skal motta pasientskjema, og bestiller dette via ePROM sitt bestillingsAPI med mottaker sitt personnummer. 
ePROM sjekker om mottaker er tilgjengelig digitalt via helsenorge.no eller digital post (digipost/eboks).
Integrasjon med helsenorge skjer via helsenorge sin tjenestebuss, mens integrasjonen med digital post skjer via DigDir sine tjenesteAPI.
For digital post sjekkes Digdir sitt Kontakt- og reservasjonsregister for ev kontaktopplysninger og hvorvidt innbygger er reservert mot digital kommunikasjon.
Besvarte pasientskjema returneres via ePROM tilbake til registeret. Innbygger mottar en kopi av utfylt skjema på helenorge eller Digipost/eBoks.

For innbyggere som ikke kan nås digitalt tilbyr ePROM en løsning for å sende ut papirskjema.
Papirskjema printes og sendes ut via Posten. Utfylte skjema returneres til en skanne- og tolketjeneste hos Posten, og resultatet returneres digitalt til ePROM, 
og videre tilbake til registeret.

## Informasjon til innbygger
Tilsvarende er det også mulig å sende ut informasjon til innbyggere som en PDF. Utsending skjer også her via helsenorge, digital post og ev fysisk brev.

## ePROM Skjemabygger
ePROM tilbyr en selvbetjeningsløsning der registrene administrere sine egne pasientskjema, inkludert informasjon som sendes med sammen med pasientskjemet og ev følgebrev.
Pasientskjemaene bygger man i ePROM sin skjemabygger. Det er her mulig å aktiver papirskjema ved behov.
ePROM tilbyr også tilgang til noen standardskjema som f.eks. RAND-12 og EQ-5D m.fl.

## eRPOM Skjemautfyller
Innbygger svarer på mottatt pasientskjemaene i ePROM sin skjemautfyller. Skjemautfyller støtter Single-Sign-On pålogging med både helsenorge og Digipost/eBoks.

## PVK
helsenorge tilbyr funksjonalitet der innbyggere kan endre samtykke og reservasjon koblet til et register. ePROM har en integrasjon med helseorge sitt PVK-grensesnitt 
slik at det er mulig for registrene å motta samtykke og reservasjon som innbygger endrer i helsenorge. 
