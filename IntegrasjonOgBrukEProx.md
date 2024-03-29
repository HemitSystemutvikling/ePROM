# ePROX 

## Integrasjon

Integrasjon mot ePROX skjer på samme måte som mot ePROM, med unntak av adresse til bestillings-API. 

Integrasjonsguide for ePROM finnes [her](Integrasjonsguide)

Overordnet skisse og flytdiagram for ePROX finnes [her](Overordnet%20skisse%20eprox)

Bruk av ePROX baserer seg på at registeret benytter ePROX for alle skjemabestillinger av den aktuelle skjematypen. Registre som er knyttet til samme bestilling vil motta samme statusoppdateringer på bestillingen, både når det gjelder bestilling, svar, utløpsdato og feil.

# Testmiljøet

API'et i testmiljøet for å bestille pasientskjema via ePROX er tilgjengelig på internett, i motsetning til prdouksjonsmiljøet som kun vil være tilgjengelig på Helsenettet.

For testmiljøet gjelder følgende URL'er for bestillingsAPI'et:
 
DEV: [https://proms.hemitdev.org/proxywebapidev/api/v2/formorder](https://proms.hemitdev.org/proxywebapidev/api/v2/formorder)

# Regler for bestilling

**Dersom det ikke finnes en aktiv bestilling, opprettes det alltid en ny bestilling. Det gjelder for alle typer bestilling, både med og uten metadata (også hvis CREATE_NEW_ORDER=false).**

## Standard bestilling

En standard bestilling fra registeret til ePROX behandles i tre steg

1) Finne aktiv bestilling*: dersom det finnes en aktiv bestilling, på samme pasient og samme skjema - men fra annet register, skal det ikke trigges en ny bestilling mot ePROM, men bestillingene skal kobles sammen i ePROX. 

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det trigges en ny bestilling mot ePROM

__*En aktiv bestilling er en bestilling med status bestilt, uløpt eller besvart hvor bestillingsdato ikke er eldre enn 365 dager gammel__

### Flere bestillinger fra samme register 

Dersom det gjøres ny bestilling på samme pasient og samme skjema fra __samme register__, vil dette trigge ny bestilling mot ePROM. 

Det vil si at det kan være flere aktive bestillinger på samme pasient og samme skjema. En ny bestilling fra et annet register vil kobles til den aktive bestillingen med nyest bestillingsdato.

## Bestilling med metadata

Det er to ulike metadataparametre som kan brukes: 

- RELEVANT_DATE - Brukes til å avgjøre om en eksisterende, aktiv bestilling ikke er for gammel. Relevant dato kan være innleggelsesdato, operasjonsdato, ulykkesdato e.l. Når relevant dato er inkludert benyttes denne til å finne aktive bestillinger.
- CREATE_NEW_ORDER - Brukes til å avgjøre om det skal genereres en ny bestilling dersom det ikke finnes en eksisterende bestilling å koble til. Dersom true skal det opprettes ny bestilling, dersom false skal det ikke opprettes ny bestilling. Default = true


### _Bruksscenario 1: Det er ønskelig å koble seg til en eksisterende bestilling/svar, men bare hvis den er ny nok. Hvis den ikke finnes eller er for gammel, trigges en ny bestilling._

I dette tilfellet ønsker registeret å motta eksisterende svar dersom det finnes i ePROX og det ikke for gammelt i forhold til relevant dato. Hvis ikke ønsker registeret å gjøre en ny bestilling mot ePROM. Et eksempel på et slikt scenario er f.eks. dersom en pasient opplever en ny hendelse, men allerede har fylt ut skjema knyttet til en annen, tidligere hendelse innenfor samme år.

1) Finne aktiv bestilling**: Dersom det ikke finnes noen aktive bestillinger, blir det opprettet en ny bestilling

2) Finne relevante bestillinger: ePROX vil deretter kun hente ut aktive bestillinger med bestillingsdato som er nyere enn relevant dato.

3) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 2 vil det trigges en ny bestilling mot ePROM


Syntaks: _{"RELEVANT_DATE":"2022-09-22"}_

### _Bruksscenario 2: Det er ønskelig å koble seg til eksisterende bestilling/svar hvis den finnes og er ny nok. Hvis den finnes men er for gammel, trigges ikke en ny bestilling._

I dette tilfellet ønsker registeret å motta eksisterende svar dersom det finnes i ePROX og det ikke er utdatert for denne hendelsen. Imidlertid ønsker de ikke gjøre en ny bestilling mot ePROM dersom svaret finnes, men er utdatert. 


1) Finne aktiv bestilling**: ePROX vil kun hente ut aktive bestillinger med bestillingsdato som er nyere enn relevant dato. 

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det trigge en ny bestilling mot ePROM. Dersom det finnes aktive bestillinger, men disse er for gamle i forhold til relevant dato, vil det __IKKE__ trigges en ny bestilling mot ePROM


Syntaks: _{"RELEVANT_DATE":"2022-09-22.","CREATE_NEW_ORDER":false}_

### _Bruksscenario 3: Det er ønskelig å koble seg til eksisterende bestilling/svar hvis det finnes. Hvis den ikke finnes, trigges ikke ny bestilling mot ePROM._ 

I dette tilfellet ønsker registeret å motta eksisterende svar dersom det finnes i ePROX. Imidlertid ønsker de ikke gjøre en ny bestilling mot ePROM om det ikke finnes svar. Et eksempel på et slikt scenario er hvis hovedskjema i registeret blir etterregistrert, og det er for lenge siden hendelsesdato til at det er aktuelt å trigge en ny bestilling. ePROX vil i dette tilfellet ikke trigge ny bestilling.

Syntaks: _{"CREATE_NEW_ORDER":false}_


### _Bruksscenario 4: Tvinge ny bestilling_

I noen tilfeller er det nødvendig å tvinge gjennom en ny bestilling, uten å ta hensyn til om det allerede finnes en aktiv bestilling. Det kan bl.a. skje dersom man ønsker å bestille skjema på en spesifikk kanal (f.eks. papir). Da er det mulig å benytte CREATE_NEW_ORDER alene.

Syntaks: _{"CREATE_NEW_ORDER":true}_










