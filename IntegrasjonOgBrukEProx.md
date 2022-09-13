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

## Bestilling med relevant dato (metadata) 
Relevant dato sendes med som metadata til bestillingen. Relevant dato kan være innleggelsesdato, operasjonsdato, ulykkesdato e.l. Når relevant dato er inkludert benyttes denne til å finne aktive bestillinger.

Det er to ulike metadataparametre som kan brukes: __RelevantDateCreateNew__ og __RelevantDateDontCreate__

### __RelevantDateCreateNew__: relevant dato som trigger ny bestilling
1) Finne aktiv bestilling**: samme metode som for standard bestilling, men ePROX vil kun hente ut aktive bestillinger med bestillingsdato som er nyere enn relevant dato.

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det trigges en ny bestilling mot ePROM

_Bruksscenario: en pasient med flere tidligere hjerteinfarkt opplever et nytt hjerteinfarkt i mai, men hadde allerede fylt ut skjema knyttet til tidligere hendelse i februar samme år._ 

I dette tilfellet ønsker ikke registeret nødvendigvis å motta det eksisterende svaret fordi det er utdatert, men det kan hende de ønsker å gjøre en ny bestilling mot ePROM. ePROX vil trigge ny bestilling dersom det ikke finnes aktive bestillinger som tilfredsstiller kravene.


### __RelevantDateDontCreate__: relevant dato som ikke trigger ny bestilling 
1) Finne aktiv bestilling**: samme metode som for standard bestilling, men ePROX vil kun hente ut aktive bestillinger med bestillingsdato som er nyere enn relevant dato. 

2) Trigge ny bestilling mot ePROM: dersom det ikke finnes noen aktive bestillinger i punkt 1 vil det __IKKE__ trigges en ny bestilling mot ePROM

_Bruksscenario: skjema blir etterregistrert i registeret, slik at fristen for utsending allerede er utløpt i det skjemaet blir registrert._

I dette tilfellet ønsker registeret å motta eksisterende svar om det finnes i ePROX og det ikke er utdatert, men ikke gjøre en ny bestilling mot ePROM om det ikke finnes. ePROX vil ikke trigge ny bestilling dersom det ikke finnes aktive bestillinger som tilfredsstiller kravene.


### **Hva er en aktiv bestilling?

En aktiv bestilling er en bestilling med en av følgende statuser: 
- Bestilling med status bestilt, uløpt eller besvart hvor bestillingsdato ikke er foreldet (mindre enn 365 dager gammel)


### Unntak ved flere bestillinger fra samme register 

Dersom det gjøres flere bestillinger på samme pasient og samme skjema fra __samme register__, vil dette trigge ny bestilling mot ePROM. 

Det vil si at det kan være flere aktive bestillinger på samme pasient og samme skjema. En ny bestilling fra et annet register vil kobles til den aktive bestillingen med nyest bestillingsdato.





