# Skjemabygger

*Sist oppdatert 21.08.2019*

### Innholdsfortegnelse

[GENERELT](#generelt)

[METADATA](#metadata)

[SPESIALTILPASNING](#spesialtilpasning)

# GENERELT
Vha Skjemabygger bygger man pasientskjemaene som skal sendes til pasientene.
Skjemaet bygges med overskrift, informasjon til pasienten og spørsmål.

Spørsmålene setter man opp med de forskjellige felttypene:
- Grupper - brukes for å gruppere spørsmål i bolker
- Valgfelt - brukes når det er flere svaralternativer
- Avkrysningsfelt
- Dato
- Tekstfelt
- Tallfelt
- Tekstområde - brukes som informasjonstekst 
- Metadata - brukes for å kunne motta metadata fra Bestillersystemet ved bestilling

Noen av feltene kan vises på forskjellige måter. F.eks. så kan *Valgfelt* vises som radioknapper eller nedtreksmeny. *Tallfelt* kan vises som et inputfelt eller slider. 

På hvert enkelt felt kan man også sette valideringsregler tilpasset felttypen.
Det er også støtte for å legge inn logikk for skjuling og vising av felt.
Det er et krav om at alle feltnavn må være unike.
Skjemaet kan forhåndsvises underveis ette at det er lagret.

[Opplæringsvideo for bruk av ePROM Skjemabygger](https://youtu.be/3vMOpnLnQ80)

# METADATA
Metadata kan sendes med en skjemabestilling både for å kontrollere oppførsel til andre komponenter og for å vise informasjon spesifikk for en skjemabestilling i skjemaet. Metadata kan brukes både i selve skjemaet og i "Informasjon til pasienten" knyttet til skjemaet. Hvis samme metadatanavn benyttes i skjemaet og i "Informasjon til pasienten" vil dette erstattes av samme verdi.

## Informasjon til pasienten
For å vise metadata i "Informasjon til pasienten" legger man inn denne teksten **(NB! Bruk store bokstaver)**:

[\_METADATANAVN\_]


**Eksempel**

Man ønsker en tekst basert på hvilket sykehus pasienten var innlagt på. Dette kan legges inn i "Informasjon til pasienten":

*I forbindelse med ditt opphold på [\_SYKEHUSNAVN\_] ønsker vi at du svarer på noen spørsmål.*

Dette vil for pasienten se slik ut:

*I forbindelse med ditt opphold på St. Olavs hospital  ønsker vi at du svarer på noen spørsmål.*

Metadatafeltet i skjemabestillingen vil da være:
```javascript
JSON.stringify({ sykehusnavn: "St. Olavs hospital" })
```


# SPESIALTILPASNING
Hvis de eksisterende komponentene i skjemabyggeren ikke tilbyr all funksjonalitet man ønsker kan skjemaet spesialtilpasses ved å legge inn CSS/HTML/javascript. Denne mulighet er kun tilgjengelig for en bruker med rolle Admin ettersom man potensielt kan legge til skadelig kode på denne måten.

**Eksempel**
Kode for å legge inn et bilde av en figur der man kan trykke på forskjellige deler av den. Koden legges inn i "Egendefinert HTML/javascript" på skjemasiden
```
<style>

    #painfigure > p {
        cursor: pointer;
    }
    
    @media (max-width: 767px) {
        #painfigure {
            display: none;
        }
    }
</style>

<script>
(function () {

    angular.module('FormApp.FormController')
        .controller('CustomHtml', function ($scope) {
            $scope.toggleBool = function (key) {
                if (document.getElementsByClassName("formCollection").length > 0) {
					$scope.model._0f68e0df_134c_4b3b_af01_c9b0678ab5ad[key] = !$scope.model._0f68e0df_134c_4b3b_af01_c9b0678ab5ad[key]
				} else {
					$scope.model[key] = !$scope.model[key]
				}
            }
        });

    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        $('.ImageL68').height(650);
    }
    if (navigator.appName == 'Microsoft Internet Explorer') {
        $('.ImageL68').height(650);
    }

document.getElementById("painfigureFieldset").outerHTML = `
<div id="painfigure" ng-controller="CustomHtml">
<svg class="ImageL68" style="max-width:400px"
         viewBox="0 0 210 297"
         version="1.1"
         id="svg8"
         inkscape:version="0.92.2 (5c3e80d, 2017-08-06)"
         sodipodi:docname="strekmann.svg">
        <sodipodi:namedview id="base"
                            pagecolor="#ffffff"
                            bordercolor="#666666"
                            borderopacity="1.0"
                            inkscape:pageopacity="0.0"
                            inkscape:pageshadow="2"
                            inkscape:zoom="0.7"
                            inkscape:cx="-202.04485"
                            inkscape:cy="337.464"
                            inkscape:document-units="mm"
                            inkscape:current-layer="layer1"
                            showgrid="true"
                            inkscape:window-width="1920"
                            inkscape:window-height="1137"
                            inkscape:window-x="1912"
                            inkscape:window-y="-8"
                            inkscape:window-maximized="1"
                            showguides="false"
                            inkscape:snap-object-midpoints="true"
                            inkscape:snap-grids="false"
                            inkscape:snap-to-guides="false"
                            inkscape:snap-midpoints="true"
                            inkscape:measure-start="562.655,1083.89"
                            inkscape:measure-end="562.15,1083.89">
            <inkscape:grid type="xygrid"
                           id="grid1050" />
        </sodipodi:namedview>
        <g inkscape:label="Layer 1"
           inkscape:groupmode="layer"
           id="layer1">
            <ellipse id="path25-9"
                     cx="107.81996"
                     cy="32.729095"
                     rx="26.142803"
                     ry="7.7269926"
                     style="fill:#000000;fill-opacity:0;stroke-width:0.13954401;stroke-miterlimit:4;stroke-dasharray:none" />
            <ellipse style="fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.49283189;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     id="path4544"
                     cx="104.65615"
                     cy="86.951324"
                     rx="29.752815"
                     ry="40.447643" />
            <path style="opacity:0;fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.28192145;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="M 99.913717,125.9867 C 94.008077,124.41077 89.374251,121.25654 85.112414,115.91146 81.164793,110.96048 78.033817,103.9322 76.563666,96.721607 75.476653,91.39018 75.459593,82.08047 76.527066,76.753815 78.105603,68.877028 80.898949,62.606436 85.222823,57.233297 90.986831,50.070543 97.240075,46.80941 105.21069,46.80941 c 4.32343,0 7.63781,0.94839 11.58558,3.315143 7.95235,4.767577 13.40359,13.107631 16.3197,24.968124 0.84352,3.430804 0.90186,4.170325 0.89887,11.395884 -0.003,9.010667 -0.45002,11.757628 -2.98251,18.356819 -4.03964,10.52663 -10.8005,17.76997 -19.29606,20.67311 -2.77029,0.94668 -9.09142,1.197 -11.822555,0.46821 z"
                  id="path4574"
                  inkscape:connector-curvature="0" />
            <path style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:1.07309341;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 104.99924,127.76072 v 16.93863"
                  id="path4610"
                  inkscape:connector-curvature="0" />
            <ellipse ng-click="toggleBool('BpiForanHode')"
                     fill="{{model._0f68e0df_134c_4b3b_af01_c9b0678ab5ad.BpiForanHode  ? '#5f9cc4':'white' }}"
                     stroke="#000000"
                     id="emotionell"
                     cx="104.71119"
                     cy="36.934204"
                     rx="39.283974"
                     ry="7.5304203"
                     inkscape:label="#path4544-3-4-5-3"
                     transform="matrix(0.99996447,0.00842966,0,1,0,0)">
                <title id="title4669">emosjonell</title>
            </ellipse>
            <text ng-click="toggleBool('BpiForanHode')"
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:6.39964342px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.36921015"
                  x="81.689651"
                  y="36.104107"
                  id="EmotionellTekst"
                  transform="scale(0.89293911,1.1198972)"
                  inkscape:label="#text4673"><tspan sodipodi:role="line"
                                                    id="tspan4671"
                                                    x="81.689651"
                                                    y="36.104107"
                                                    style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:6.39964342px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.36921015">BpiForanHode</tspan></text>
            <ellipse ng-click="toggleBool('BpiForanKjeveAnsikt')"
                     fill="{{model._0f68e0df_134c_4b3b_af01_c9b0678ab5ad.BpiForanKjeveAnsikt  ? '#5f9cc4':'white' }}"
                     stroke="#000000"
                     id="Demens"
                     cx="103.68907"
                     cy="23.480265"
                     rx="22.25843"
                     ry="5.6044989"
                     inkscape:label="#path4544-3-4-5-3"
                     inkscape:transform-center-x="3.4373323"
                     inkscape:transform-center-y="6.0573949">
                <title id="title4669-7">Demens</title>
            </ellipse>
            <text ng-click="toggleBool('BpiForanKjeveAnsikt')"
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:6.39964342px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.36921015"
                  x="102.94754"
                  y="22.757971"
                  id="DemensTekst"
                  transform="scale(0.89293911,1.1198972)"
                  inkscape:label="#text4673-9"><tspan sodipodi:role="line"
                                                      id="tspan4671-8"
                                                      x="102.94754"
                                                      y="22.757971"
                                                      style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:6.39964342px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.36921015">BpiForanKjeveAnsikt</tspan></text>
            <path style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:2.08963561;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 104.99967,136.23121 -56.764714,7.50532"
                  id="path4610-7"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="cc" />

            <g id="B_GRUPPE"
               transform="matrix(1.246043,0,0,1.5627494,-21.728445,2.6647528)"
               inkscape:label="#g1280">
                <ellipse ry="15.967237"
                         rx="18.43194"
                         cy="91.543129"
                         cx="164.92023"
                         id="path4544-3"
                         style="fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.24371856;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />

            </g>
            <path style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:2.07646418;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 104.99967,136.23121 56.07891,7.50163"
                  id="path4610-7-4"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="cc" />
            <rect style="opacity:0;fill:#ff00ff;fill-opacity:0;stroke:#000080;stroke-width:1.07309341;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  id="rect1238"
                  width="16.984497"
                  height="20.883762"
                  x="22.564455"
                  y="102.27202" />
            <path style="fill:none;stroke:#000000;stroke-width:1.06751168;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 90.595429,68.938286 h 6.859727"
                  id="path1244"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="cc" />
            <path style="fill:none;stroke:#000000;stroke-width:1.06751168;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 110.75833,68.858006 h 6.85974"
                  id="path1244-1"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="cc" />
            <path style="fill:none;stroke:#000000;stroke-width:1.18891478;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 99.973389,85.099378 4.255791,-8.929345 4.47654,8.771179"
                  id="path1263"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="ccc" />
            <g transform="matrix(1.246043,0,0,1.5627494,-180.10247,2.6512912)"
               id="E_GRUPPE"
               inkscape:label="#g1280-9">
                <ellipse ry="15.967237"
                         rx="18.43194"
                         cy="91.543129"
                         cx="164.92023"
                         id="path4544-3-2"
                         style="fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.24371856;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />

            </g>
            <g transform="matrix(1.246043,0,0,1.5627494,-100.67499,26.876458)"
               id="F_GRUPPE"
               inkscape:label="#g1280-7">
                <ellipse ry="15.967237"
                         rx="18.43194"
                         cy="91.543129"
                         cx="164.92023"
                         id="path4544-3-6"
                         style="fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.24371856;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />

            </g>
            <path style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:1.51524794;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 105.00473,194.97421 v 33.77306"
                  id="path4610-3"
                  inkscape:connector-curvature="0" />
            <path style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:2.72137499;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="M 105.00473,228.74619 72.803524,251.18565"
                  id="path4610-7-0"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="cc" />
            <path style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:2.72036266;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                  d="m 105.0056,228.67786 32.17718,22.43949"
                  id="path4610-7-0-3"
                  inkscape:connector-curvature="0"
                  sodipodi:nodetypes="cc" />
            <g id="C_GRUPPE"
               transform="matrix(1.246043,0,0,1.5627494,-47.313848,117.97605)"
               inkscape:label="#g1280-2">
                <ellipse ry="15.967237"
                         rx="18.43194"
                         cy="91.543129"
                         cx="164.92023"
                         id="path4544-3-3"
                         style="fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.24371856;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />

            </g>
            <g id="D_GRUPPE"
               transform="matrix(1.246043,0,0,1.5627494,-153.7541,118.06286)"
               inkscape:label="#g1280-24">
                <ellipse ry="15.967237"
                         rx="18.43194"
                         cy="91.543129"
                         cx="164.92023"
                         id="path4544-3-4"
                         style="fill:none;fill-opacity:1;stroke:#000080;stroke-width:0.24371856;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />

            </g>
        </g>
    </svg>
</div>
`;

}());
</script>
```


