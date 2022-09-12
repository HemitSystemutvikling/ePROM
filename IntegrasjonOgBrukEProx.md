# ePROX 

## Integrasjon

Integrasjon mot ePROX skjer på samme måte som mot ePROM, med unntak av adressen. Integrasjonsguide for ePROM finnes [her](Integrasjonsguide.md)

## Bruk av ePROX

### Ordliste:

Aktiv bestilling: 
- Bestilling med status bestilt hvor bestillingsdato ikke er foreldet
- Bestilling med status utløpt hvor bestillingsdato ikke er foreldet
- Bestilling med status besvart hvor svar ikke er sendt tilbake til alle som kan tenkes å få svar

Relevant dato: 
- dato for relevant hendelse for denne pasienten. Det kan være innleggelsesdato, operasjonsdato, ulykkesdato e.l. Denne kan brukes til å avgjøre om ny skjemabestilling skal utføres, eller om eventuelle eksisterende svar er av relevant for registere som gjør ny bestilling. F.eks. vil det ikke alltid være interessant å motta eksisterende svar som ble fylt ut FØR dato for ny hendelse.

## Bestilling og svar

### Bestilling uten relevant dato

En standard bestilling gjøres på samme måte som en bestilling mot ePROM. ePROX vil gjøre følgende for å avgjøre om det skal genereres en bestilling mot ePROM, eller om ny bestilling kan kobles til en eksisterende bestilling i ePROX:
- dersom samme register bestiller samme skjema på samme pasient to eller flere ganger, trigges ny bestilling mot ePROM, selv om det allerede finnes aktive bestillinger på samme pasient og skjema. 
- dersom det finnes en eller flere aktive bestillinger, på samme pasient og samme skjema men fra annet register, skal det ikke trigges en ny bestilling mot ePROM, men bestillingene skal kobles sammen i ePROX. Den nye bestillingen vil kobles til den bestillingen med nyest bestillingsdato og få samme status som denne (bestilt, besvart, utløpt).
- dersom det ikke finnes en aktiv bestilling, på samme pasient og samme skjema, skal det trigges en ny bestilling mot ePROM




### Bestilling med relevant dato 
