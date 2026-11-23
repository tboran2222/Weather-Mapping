# Wind Maps

Phone web app for the Home, Coon Creek, Sauk 40, Stumptown Rd and McKenna Rd thermal and wind maps.

- Each map pulls a fresh Open-Meteo forecast every time it opens, and again if it has been in the background over 30 minutes.
- The last forecast is saved on the phone, so the maps still work with no signal.
- Stands you add are saved on the phone, separately for each property.

Weather data: Open-Meteo (open-meteo.com), CC BY 4.0. Terrain: USGS 3DEP. Imagery: USGS.

## Wind reliability layer
Layers → Wind reliability colors each ~10 m spot by how far the forecast wind direction can be trusted there (Steady, Shifted, Swirl-prone, Upslope, Drainage, Pooled, Toss-up). It is a port of a separate terrain–wind reference model; the static terrain classes are computed with that model's own Python code, and the phone-side sun/shade and classification match it on 100% of cells in testing. Ridge wind: NWS transport wind (api.weather.gov), falling back to Open-Meteo 80 m wind, then the 10 m forecast. Not yet checked against field readings.
