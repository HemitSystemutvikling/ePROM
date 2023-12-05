# Reservasjon mot forskning/sekundærbruk på helsenorge 

## På helsenorge

På helsenorge har innbyggere mulighet til å reservere seg mot henvendelser som ikke er knyttet til helsehjelp, f.eks. forskning og helseundersøkelser

Dette gjøres under Profil og innstillinger/Personverninnstillinger/Hvordan vil du bruke helsenorge/Reservasjon mot henvendelser knyttet til andre formål enn helsehjelp (plassering *kan* endre seg). Se bildet under:

![image](https://github.com/HemitSystemutvikling/ePROM/assets/45993495/fe666a49-c5e7-44cf-8411-065cad7c6534)

Dersom innbyggeren har reservert seg betyr det at skjemaoppgaver og brev (melding til innbygger) som omfattes av dette IKKE skal sendes til innbyggeren på helsenorge, selv om innbyggeren er aktiv og har samtykket til bruk av helsenorge.

## I ePROM admin

På bestillersystemet markerer man hvorvidt henvendelser er relatert til forskning eller ikke:

![image](https://github.com/HemitSystemutvikling/ePROM/assets/45993495/41ff6093-c78d-4ca6-a41b-8e986a6356b3)


## Bestilling av skjema eller brev 

Dersom et bestillersystem er markert som forskning vil det ikke være mulig å sende skjema eller brev til pasienten via helsenorge fra dette bestillersystemet. 
Dersom man forsøker å bestille et skjema eller brev, vil ePROM motta følgende melding fra helsenorge `Patient is not digital active, try next notification channel. NegativeAppRecCode = X99, NegativeAppRecText = Annen feil - 002125: Innbygger har reservert seg mot henvendelser for sekundærbruk.` 

Deretter vil ePROM forsøke andre kanaler, avhengig av hvilken distribusjonsregel som er brukt.
Det vil si at selv om innbyggeren er reservert mot forskning på helsenorge, kan vedkommende likevel motta henvendelser på digipost, epost/sms eller fysisk post, da disse kanalene ikke er omfattet av reservasjonen og heller ikke har tilsvarende reservasjonsmulighet per i dag.


Dersom ePROM ikke finner noen aktuelle kanaler vil bestillersystemet få følgende status fra ePROM: `Unable to notify patient. NotificationChannel: None`. Det vil si at bestillersystemet ikke får vite hvorfor innbyggeren ikke kan nås (f.eks. at det skyldes reservasjon).  

[Tilbake](./)
