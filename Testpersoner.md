# Testpersoner

ePROM i testmiljøet integrerer med Helsenorge sine testmiljøer, og i alle miljø bortsett fra PROD er det **DEN NYE PERSONTJENESTEN** som benyttes.

For verifisering mot helsenorge kan alle fødselsnummmer i DEN NYE PERSONTJENESTEN benyttes, forutsatt at testpasienten har gitt samtykke på helsenorge. Samtykke gis ved første gangs innlogging til helsenorge. Velg samtykkenivå = Full:

![eprom](img/ePROM_samtykke_lite.png)

Når samtykke er gitt vil skjemabestillinger leveres som en skjemaoppgave til pasienten i innboksen på helsenorge.

D-nummer kan også benyttes på helsenorge

## Innlogging i IdPorten

Ved innlogging i IdPorten i test, velg alternativ **TestID på nivå høyt**. Fyll deretter inn fødselsnummer i feltet "Personidentifikator (syntetisk)" og trykk Autentiser. Man er da innlogget tilsvarende bankID nivå 4.

<img width="949" height="865" alt="GitHub_IdPorten" src="https://github.com/user-attachments/assets/e8209f3f-0f3b-41eb-a4e5-2fdee04164e1" />


### Kontaktregisteret

Kontaktinformasjon i kontaktregisteret må oppdateres med jevne mellomrom. Dersom testpasienten ikke har oppdatert kontaktinformasjon siste 18 mnd regnes den som ikke digitalt aktiv selv om samtykke er gitt på helsenorge.

Ved innlogging på IdPorten får man derfor fra tid til annen spørsmål om kontaktinformasjon. Denne må fylles ut med telefonnummer og e-post, men dette må ikke være reell informasjon med mindre man ønsker å motta varslinger fra testmiljøet, f.eks. når testpasienten mottar nye skjemaoppgaver. 

[Tilbake](./Integrasjonsguide)

