
# Hva består et skjema av?

For at et skjema skal kunne anses å være ferdig (klart til PROD) må følgende ting være definert:

- Skjema
- Følgebrev
- Skjemainformasjon

Bestillersystemet (registeret) må ta stilling til dette, og det er utviklers ansvar å sørge for at dette kommer på plass.

## Skjema

Skjema defineres i skjemabyggeren. Her defineres felter og regler. Et skjema kan i denne sammenhengen være et enkelt skjema eller et samleskjema (en samling med enkeltskjema)

Hvert skjema har en unik ID som må oppgis når skjema skal kopieres fra et miljø til et annet


## Følgebrev

Følgebrev endres/opprettes under punktet "Informasjon til pasienten" i ePROM admin

Følgebrevet er det som vises på toppen av skjemaet når det åpnes i skjemautfylleren. Det kan inneholde utfyllende informasjon om skjemaets innhold, hvem som er avsender og hva resultate skal brukes til. Et følgebrev kan brukes av mange ulike skjema, men et skjema kan kun ha ett følgebrev. 

## Skjemainformasjon

Skjemainformasjon endres/opprettes under punktet "Skjemainformasjon" i ePROM admin

Her defineres hvilket følgebrev som skal brukes til et skjema. Skjemainformasjon inneholder også detaljer om selve skjemabestillingen, det vil si hvilken informasjon pasienten skal få i skjemaoppgaven eller brevet til helsenorge, digipost eller eBoks, samt innhold i sms/epost-varsel fra helsenorge. Dette kan man se i en forhåndsvisning.

For både skjemainformasjon og følgebrev gjelder at dersom et skjema inngår i et samleskjema, er det samleskjemaets følgebrev og skjemainformasjon som benyttes.

## Flytting av skjema mellom miljø

Når skjema skal flyttes (eksporteres og importeres) mellom miljø må skjemaets ID oppgis. Hvis det er et samleskjema holder det å oppgi ID til samleskjemaet. Eksport/import-funksjonen inkluderer både skjema, følgebrev og skjemainformasjon, samt underliggende skjema hvis det er snakk om det samleskjema.

