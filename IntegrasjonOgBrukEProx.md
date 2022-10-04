# ePROX 

## Integrasjon

Integrasjon mot ePROX skjer på samme måte som mot ePROM, med unntak av adresse til bestillings-API. 

Integrasjonsguide for ePROM finnes [her](Integrasjonsguide)

Overordnet skisse og flytdiagram for ePROX finnes [her](Overordnet%20skisse%20eprox)

Bruk av ePROX baserer seg på at registeret benytter ePROX for alle skjemabestillinger av den aktuelle skjematypen. Registre som er knyttet til samme bestilling vil motta samme statusoppdateringer på bestillingen, både når det gjelder bestilling, svar, utløpsdato og feil.

# Regler for bestilling 

## Standard bestilling

En standard bestilling fra registeret til ePROX behandles i to steg

1) Finne [aktiv bestilling**](#hva-er-en-aktiv-bestilling): dersom det finnes en aktive bestilling, på samme pasient og samme skjema men fra annet register, skal det ikke trigges en ny bestilling mot ePROM, men bestillingene skal kobles sammen i ePROX. 

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det trigges en ny bestilling mot ePROM

### Flere bestillinger fra samme register 

Dersom det gjøres ny bestilling på samme pasient og samme skjema fra __samme register__, vil dette trigge ny bestilling mot ePROM. 

Det vil si at det kan være flere aktive bestillinger på samme pasient og samme skjema. En ny bestilling fra et annet register vil kobles til den aktive bestillingen med nyest bestillingsdato.

## Bestilling med metadata

Det er to ulike metadataparametre som kan brukes: 

- RELEVANT_DATE - Brukes til å avgjøre om en eksisterende, aktiv bestilling er ny nok. Relevant dato kan være innleggelsesdato, operasjonsdato, ulykkesdato e.l. Når relevant dato er inkludert benyttes denne til å finne aktive bestillinger.
- CREATE_NEW_ORDER - Brukes til å avgjøre om det skal genereres en ny bestilling dersom det ikke finnes en eksisterende bestilling å koble til. Dersom true skal det opprettes ny bestilling, dersom false skal det ikke opprettes ny bestilling. Default = true


### _Bruksscenario 1: en pasient med flere tidligere sykehusinnleggelser opplever en ny hendelse, men har allerede fylt ut skjema knyttet til en annen hendelse tidligere samme år._ 

I dette tilfellet ønsker ikke registeret nødvendigvis å motta det eksisterende svaret fordi det er utdatert og/eller urelevant, men det kan hende de ønsker å gjøre en ny bestilling mot ePROM. ePROX vil i dette tilfellet trigge ny bestilling dersom det ikke finnes aktive bestillinger som tilfredsstiller kravene.

1) Finne aktiv bestilling**: ePROX vil kun hente ut aktive bestillinger med bestillingsdato som er nyere enn relevant dato.

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det trigges en ny bestilling mot ePROM


Syntaks: _{"RELEVANT_DATE":"2022-09-22"}_

### _Bruksscenario 2: skjema er blitt etterregistrert og det er ønskelig å se om de finnes eksisterende svar, uten å gjøre ny bestilling._

I dette tilfellet ønsker registeret å motta eksisterende svar dersom det finnes i ePROX og det ikke er utdatert, men ønsker ikke gjøre en ny bestilling mot ePROM om det ikke finnes fordi det er for lenge siden hendelsesdato. ePROX vil i dette tilfellet ikke trigge ny bestilling dersom det ikke finnes aktive bestillinger som tilfredsstiller kravene.


1) Finne aktiv bestilling**: ePROX vil kun hente ut aktive bestillinger med bestillingsdato som er nyere enn relevant dato. 

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det __IKKE__ trigges en ny bestilling mot ePROM


Syntaks: _{"RELEVANT_DATE":"2022-09-22.","CREATE_NEW_ORDER":false}_


### _Bruksscenario 3: Tvinge ny bestilling_

I noen tilfeller er det nødvendig å tvinge gjennom en ny bestilling, uten å ta hensyn til om det allerede finnes en aktiv bestilling. Det kan bl.a. skje dersom man ønsker å bestille skjema på en spesifikk kanal (f.eks. papir). Da er det mulig å benytte CREATE_NEW_ORDER alene.

Syntaks: _{"CREATE_NEW_ORDER":true}_

### **Hva er en aktiv bestilling?

En aktiv bestilling er en bestilling med en av følgende statuser: 
- Bestilling med status bestilt, uløpt eller besvart hvor bestillingsdato ikke er foreldet (mindre enn 365 dager gammel)






