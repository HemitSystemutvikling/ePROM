# ePROX 

## Integrasjon

Integrasjon mot ePROX skjer på samme måte som mot ePROM, med unntak av adressen. Integrasjonsguide for ePROM finnes [her](Integrasjonsguide.md)

## Bruk av ePROX

Bruk av ePROX baserer seg på at registeret benytter ePROX for alle skjemabestillinger av den aktuelle skjematypen. 

### Ordliste:

Aktiv bestilling: 
- Bestilling med status bestilt hvor bestillingsdato ikke er foreldet
- Bestilling med status utløpt hvor bestillingsdato ikke er foreldet
- Bestilling med status besvart hvor svar ikke er sendt tilbake til alle som kan tenkes å få svar

Relevant dato: 
- dato for relevant hendelse for denne pasienten. Det kan være innleggelsesdato, operasjonsdato, ulykkesdato e.l. Denne blir brukt til å avgjøre om det finnes eksisterende bestillinger i ePROX som den nye bestillingen skal kobles til eller hvorvidt det skal trigges en ny bestilling mot ePROM om det ikke finnnes en eksisterende bestilling i ePROX.

## Bestilling og svar

### Bestilling uten relevant dato

En standard bestilling gjøres på samme måte som en bestilling mot ePROM. ePROX vil gjøre følgende:
- dersom samme register bestiller samme skjema på samme pasient to eller flere ganger, trigges ny bestilling mot ePROM, selv om det allerede finnes aktive bestillinger på samme pasient og skjema. 
- dersom det finnes en eller flere aktive bestillinger, på samme pasient og samme skjema men fra annet register, skal det ikke trigges en ny bestilling mot ePROM, men bestillingene skal kobles sammen i ePROX. Den nye bestillingen vil kobles til den bestillingen med nyest bestillingsdato og få samme status som denne (bestilt, besvart, utløpt).
- dersom det ikke finnes en aktiv bestilling, på samme pasient og samme skjema, skal det trigges en ny bestilling mot ePROM


### Bestilling med relevant dato (metadata) 

Relevant dato sendes med som metadata til bestillingen. I tillegg til å lete etter aktive eksisterende bestillinger vil ePROX sammenligne bestillingsdato på disse bestillingene med relevant dato, og bare hente ut eksisterende bestillinger som er nyere enn denne.

#### Relevant dato som trigger ny bestilling
Et tenkt tilfelle er at en pasient med flere tidligere hjerteinfarkt opplever et nytt hjerteinfarkt i mai, men hadde fylte ut skjema basert på tidligere hendelse i februar. I dette tilfellet ønsker ikke registeret nødvendigvis å motta det eksisterende svaret fordi det er utdatert, men det kan hende de ønsker å gjøre en ny bestilling mot ePROM. I dette tilfelles benyttes _RelevantDateCreateNew_. Denne vil trigge ny bestilling dersom det ikke finnes eksisterende svar som tilfredsstiller kravene.

#### Relevant dato som ikke trigger ny bestilling 
Et annet tenkt tilfelle er at data blir etterregistrert i registeret, slik at fristen for utsending allerede er utløpt i det skjemaet blir registrert. I dette tilfellet ønsker registeret å motta eksisterende svar om det finnes i ePROX og det ikke er utdatert, men ikke gjøre en ny bestilling mot ePROM om det ikke finnes. I dette tilfellet benyttes _RelevantDateDontCreate_. Denne vil ikke trigge ny bestilling mot ePROM dersom det ikke finnes eksisterende svar som tilfredsstiller kravene.







