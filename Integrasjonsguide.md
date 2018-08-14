# ePROMS Integrasjonsguide 
### v1.13

*Gjelder v2.0 av PROMS*

*Sist oppdatert 06.08.2018*

### Innhold


# GENERELT

## Pasientløsning PROMS
For å se / fylle ut de bestilte skjemaene kan man finne de igjen i pasientløsningen:

[https://proms2.hemit.org/Proms](https://proms2.hemit.org/Proms)

Her finner man alle skjema som er bestilt og man kan f.eks. teste innsending av skjemaer. Pålogging med BankID eller engangskode.


## Testpersoner
PROMS i testmiljøet integrerer med Helsenorge og Digipost sine testmiljøer. For å teste integrasjonen mellom PROMS, Helsenorge og Digipost har vi tilgang til fødselsnummer med BankID. Midlertidig tilgang til disse fås ved henvendelse til Hemit.


## Distribusjonsregler
Vha. parameteren **DistributionRule** kan man bestemme hvordan pasientskjemaet skal distribueres til pasienten. Varslingskanalene er definert i parameteren **NotificationChannel**

Default **DistributionRule** er *Basic* og betyr at PROMS først sjekker om pasienten er tilgjengelig på Helsenorge. Hvis ikke sjekkes det om pasienten har sikker digital postkasse. Hvis **DistributionRule** er satt til *AllowUnsecure* sjekkes det om pasienten er registrert i Difi Kontaktregister med epostadresse eller mobilnummer. Hvis **DistributionRule** er satt til *NoDistribution* sendes det ikke ut varsling til pasienten. Dette kan benyttes hvis Bestillersystemet skal gi engangskode til pasienten. *BasicOrPaper* og *AllowUnsecureOrPaper* er samme som hhv *Basic* og *AllowUnsecure*, men med papir som siste utvei. *PaperOnly* sender kun på papir.

### DistributionRule
0 = Basic
1 = AllowUnsecure
2 = NoDistribution
3 = BasicOrPaper
4 = AllowUnsecureOrPaper
5 = PaperOnly

### NotificationChannel
0 = None
1 = Helsenorge
2 = DigitalMailbox
3 = Unsecure
4 = PhysicalMailbox

