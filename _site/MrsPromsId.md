## Finn ID på en Proms-bestilling i MRS

I forbindelse med feilsøking på spesifikke pasientskjema i ePROM er det behov for å finnes ID på selve proms-bestillingen.

Hvis man vet hvilket MRS-skjema, som proms-bestillingen er bestilt på, kan man finne bestillingsID på følgende måte: 

* I MRS finn Id på Hovedskjemaet som prom er bestilt på.
* Under PROMS-fanen:
  * Last ned Datadump av PROM-bestillinger med Knappen «Last ned alle bestillinger til excel (råformat»)
* I datadumpen
  * I kolonne «TargetFormId» finn Id fra Hovedskjemaet.
  * I første kolonne «Id» er bestillingsID for tilhørende proms-bestilling

Mere informasjon anngående [Administrasjon av PROMS i MRS](MrsPromsAdmin)


## Hvis man har kontakt med pasienten

Hvis man har kontakt med pasienten kan man be om få tilsendt URL til pasientskjemaet som pasienten forsøker å fylle ut.

Eksempel på en slik URL er https://pasientrapportering.nhn.no/proms/Form/Edit/d44bee96-b045-4e78-b499-f3196be85a52

BestillingsID på proms-bestillingen er de 36 siste tegn i denne URL **d44bee96-b045-4e78-b499-f3196be85a52**

Dette vil gjelde uavhengig av om pasienten har mottatt pasientskjemaet via *helsenorge.no*, *Digital post* eller *e-post*
