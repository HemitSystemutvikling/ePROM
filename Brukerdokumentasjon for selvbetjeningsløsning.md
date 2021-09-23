# Brukerdokumentasjon for selvbetjeningsløsning

*Sist oppdatert 23.09.2021*

[Skjemakatalog](#skjemakatalog)

[Informasjon til pasienten](#informasjon-til-pasienten)

[Skjemainformasjon](#skjemainformasjon)

[Bestillersystemer](#bestillersystemer)

[Skjemastatistikk](#skjemastatistikk)

[Brukeradministrasjon](#brukeradministrasjon)


## Hovedmeny
Dashboard for ePROM. Trykk på PROMS Administrasjon eller Hovedmeny øverst til venstre for å komme hit fra hvilken som helst side
 
![ePROM_admin_dashboard](img/ePROM_admin_dashboard.PNG)


## Skjemakatalog
Oversikt over tilgjengelige skjema og mulighet for å administrere eksisterende og opprette nye skjema.

![ePROM_admin_skjemakatalog](img/ePROM_admin_skjemakatalog.png)

Skjema som er tilgjengelige for alle bestillersystemer ligger under *Felles*, skjema som kun er tilgjengelig for eget bestillersystem ligger under *Mine*. Det er mulig å søke opp skjema ved å skrive inn hele eller deler av navnet.

Under søkefeltet er det også mulig å filtrere listen basert på skjemastatus. Trykk på knappene for å skjule og vise skjema med den aktuelle statusen.

Id brukes av bestillersystem ved skjemabestilling for å angi hvilket skjema som skal bestilles.

Status kan være enten Kladd, Publisert eller Trukket tilbake. Skjema kan bare redigeres så lenge de er i Kladd status. Når de har blitt Publisert kan de ikke lenger redigeres, men kan trekkes tilbake. Et skjema som er trukket tilbake kan publiseres på nytt, men kan ikke redigeres. Dette for å hindre at et skjema som er eller har vært publisert kan endres. Skal et skjema endres etter at det er publisert må det opprettes en ny versjon av det.

Skjemaene har følgende mulige aksjoner i de ulike statusene
*	Kladd – Publiser, Rediger, Slett, Ny versjon, Forhåndsvis, Last ned
*	Publisert – Trekk tilbake, Ny versjon, Forhåndsvis, Last ned
*	Trukket tilbake – Publiser, Ny versjon, Forhåndsvis, Last ned

Forklaring aksjoner
*	Ny versjon – Kopierer et eksisterende skjema for å lage en ny versjon, og gjøre endringer på det
*	Last ned – Laster ned en zip-fil med filer for bruk i bestillersystemet. Inneholder skjemadefinisjon og ressursfiler (xsd og resx filer)



## Informasjon til pasienten
Oversikt over tilgjengelige *Informasjon til pasienten* og mulighet for å administrere eksisterende og opprette nye *Informasjon til pasienten*.
*Informasjon til pasienten* er et følgebrev som pasienten kan få sammen med skjemaet, med utfyllende informasjon om skjemaet, hvem som er avsender, hva som er hensikten og målet med henvendelsen, instrukser om hvordan skjemaet skal fylles ut osv.

![ePROM_admin_informasjonTilPasienten](img/ePROM_admin_informasjonTilPasienten.png)

*Informasjon til pasienten* som er tilgjengelige for alle bestillersystemer ligger under Felles, *Informasjon til pasienten* som kun er tilgjengelig for eget bestillersystem ligger under Mine. Mulig å søke opp *Informasjon til pasienten* ved å skrive inn hele eller deler av navnet. 



## Skjemainformasjon
Skjemainformasjon er informasjon om hvilke skjema som er knyttet til hvilke følgebrev.
Her defineres også informasjon om selve skjemabestillingen, det vil si informasjonen pasienten skal få i skjemaoppgaven eller brevet til helsenorge, digipost eller eBoks. 

![ePROM_admin_skjemainformasjon](img/ePROM_admin_skjemainformasjon.png)


### Skjemainformasjon - Opprett ny kobling

![ePROM_admin_skjemainformasjon_edit](img/ePROM_admin_skjemainformasjon_edit.png)

- Velg Skjema som denne skjemainformasjonen skal gjelde for
- Velg *Informasjon til pasienten* (følgebrev) som skal kobles sammen med dette skjemaet
- Fyll ut informasjon om skjemabestilling. Forhåndsvisningen til høyre viser hvordan skjemaoppgaven/brevet vil se ut i hhv helsenorge og digipost


## Bestillersystemer
Info om eget bestillersystem

![ePROM_admin_bestillersystemer](img/ePROM_admin_bestillersystemer.png)

*API nøkkel* brukes av bestillersystem ved skjemabestilling for å identifisere seg selv
API base URL angir url til mottakssystemet for bestillersystemet



### Bestillersystemer - Endre

![ePROM_admin_bestillersystem_edit](img/ePROM_admin_bestillersystem_edit.png)

*Navn - ikke sensitiv*

*Telefon* er telefonnummeret til kontaktperson for bestillersystemet. Sendes med til mottaker av bestillingen (pasienten)

*E-post* er e-post adressen til kontaktperson for bestillersystemet. Dersom denne skal sendes med i kontaktinformasjon til pasienten må det aktiveres av administrator. E-post vil aldri vist på helsenorge, kun andre kanaler.

*Trykk* på *Generer* for å generere en ny *API nøkkel*. Denne må i tilfelle også samtidig endres i bestillersystemet. Trykk på *Slett* for å fjerne API nøkkel og gjøre det umulig for bestillersystemet å sende inn flere skjemabestillinger. Generes ny API nøkkel kan bestillersystemet sende inn skjemabestillinger ingjen.



## Skjemastatistikk
Viser oversikt over antall skjemabestillinger og antall utfylte skjema per skjematype. 
 - Mulig å søke på statistikk for periode basert på dato
 - Mulig å laste ned resultat av søk til excel
![ePROM_admin_skjemastatistikk](img/ePROM_admin_skjemastatistikk.png)



## Brukeradministrasjon
Oversikt over brukere. Mulig å administrere bestillersystemets egne brukere

![ePROM_admin_brukeradministrasjon](img/ePROM_admin_brukeradministrasjon.png)
