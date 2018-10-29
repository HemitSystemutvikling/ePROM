## Oversikt over teskter brukt til SMS og Epost

### Tekst i SMS
Du har mottatt pasientskjema på {promsPublicWebBaseUrl}. Data brukes til å forbedre helsetjenesten. Hilsen Nasjonal pasientrapportering.


## Tekst i Epost
Du har nå fått et pasientskjema vi ønsker du skal besvare. 
Dette skjemaet er en del av Nasjonal pasientrapportering.<br/>
<br/>
Svarfrist: {expirydate.ToLocalTime().ToShortDateString()}.<br/>
<br/>
Lenke til skjema: {new Uri(promsPublicWebBaseUrl).Append("Form/Edit/").AbsoluteUri + formOrderId}<br/>
<br/>

<strong>Identifisering</strong><br/>
BankID brukes som sikker innlogging og er den mest anvendelige elektroniske identifikasjonen i Norge. Denne er godkjent også for sensitive data.
<br/><br/>
<strong>Om Nasjonal pasientrapportering</strong><br/>
Pasientrapporterte resultater (PROMS) inkluderer spørreskjemaer som vurderer helse og livskvalitet fra pasientens perspektiv. 
Disse tilbakemeldingene inngår i medisinske kvalitetsregistre som har til formål å vurdere og forbedre kvaliteten på behandling som gis på norske sykehus.
<br/><br/>
Du kan lese mer om Nasjonal pasientrapportering og de nasjonale kvalitetsregistre her:<br/>
https://www.kvalitetsregistre.no/nasjonal-pasientrapportering
<br/><br/>
Hilsen,<br/>
Nasjonal pasientrapportering<br/>

{GetLogo()}
</div>
