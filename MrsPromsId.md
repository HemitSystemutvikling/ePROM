## Finn ID på en Proms-bestilling i MRS

I forbindelse med feilsøking på spesifikke pasientskjema i ePROM tengs ID på selve proms-bestillingen.

Hvis man vet hvilket MRS-skjemaet asom proms-bestillingen er bestilt på kan man finne bestillingsID på følgende måte: 

* Finn Id på Hovedskjemaet som prom er bestilt på.
* Under PROMS-fanen:
  * Last ned Datadump av PROM bestillinger (Knappen «Last ned alle bestillinger til excel (råformat»)
* I datadumpen
  * I kolonne «TargetFormId» finn Id fra Hovedskjemaet.
  * I første kolonne «Id» er bestillingsid, som vi trenger
