# Anglesey mark research

This file records research candidates before they are added to the live mark database.

## Verification rule

A named fishing venue is not automatically an official verified mark. The app must not publish exact fishing coordinates, access details, species records or fishing advice as verified unless those details have been independently checked.

## Current candidates

### Moelfre
- Fishing venue documented by Turners Tackle.
- Independent Anglesey tourism information also identifies Moelfre as a shore-fishing location.
- Further independent geographic checking is still required before the app assigns verified coordinates to a specific fishing platform/mark.
- Sources:
  - https://turnerstackle.co.uk/north-west-sea-fishing-marks/anglesey/moelfre/
  - https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/

### Penmon Point
- Fishing venue documented by Turners Tackle.
- Independent Anglesey tourism information identifies Black Point near Penmon as a shore-fishing location.
- Further checking is required before assigning exact verified fishing coordinates.
- Sources:
  - https://turnerstackle.co.uk/north-west-sea-fishing-marks/anglesey/penmon-point/
  - https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/

### Cymyran Beach / Cymyran Bay
- Shore-fishing location documented by Anglesey tourism information.
- Further checking is required before assigning exact verified fishing coordinates or publishing detailed access information as verified.
- Sources:
  - https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/
  - https://wheresthefish.uk/wales/isle-of-anglesey/cymyran-bay

## Important

These candidates are deliberately not yet in data/marks.json as verified marks. No coordinates have been guessed or copied from an approximate map position.

Next step: independently verify each candidate's specific fishing position, current access, and any species information before publication.


## Cross-check update — 11 October 2026

### Penmon Point — strong candidate; retain as separate mark
- Fishing in Wales identifies Penmon Point as a rough-ground fishing venue and lists mackerel, pollack, whiting, codling, bass, flatfish, dogfish, dab, wrasse and conger: https://fishingwales.net/fishing-locations/penmon-point/
- Turners Tackle provides more detailed mark notes and a seasonal mackerel window, but these are angler-guide reports rather than guaranteed catches: https://turnerstackle.co.uk/north-west-sea-fishing-marks/anglesey/penmon-point/
- Visit Anglesey confirms Black Point, a car park at the Point and a coastal walking network; the approach road is a toll road: https://www.visitanglesey.co.uk/en-gb/explore/landscape/aberlleiniog-llangoed-and-penmon
- Anglesey County Council's coastal-path information also describes a walking approach to the Point: https://www.visitanglesey.co.uk/asset-library/english/coastal-path-descriptions/coastal-path-description-section-6-pentraeth-beaumaris.pdf
- Decision: no exact fishing position coordinates have been added. The venue is sufficiently corroborated as a candidate, but before live publication choose a defensible venue-level map point, label it approximate, and ensure the access notes distinguish the paid road/car park from the walk-in alternative. Do not use the heritage site's What3Words as a fishing-position location.

### Cymyran Bay — established shore-fishing candidate; access needs clear wording
- Holidays Anglesey identifies Cymyran Beach near RAF Valley as a shore-fishing location and reports possible bass, grey mullet, flounder, other flatfish and rays. It also warns of strong currents: https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/
- Where's The Fish describes Cymyran Bay as a sandy beach venue, with possible bass, rays, dogfish and flatfish: https://wheresthefish.uk/wales/isle-of-anglesey/cymyran-bay
- Visit Anglesey's official coastal-path route description confirms a waymarked walking route reaches Traeth Cymyran by the RAF Valley perimeter and continues along the shore: https://www.visitanglesey.co.uk/en-gb/explore/walk/coastal-path-aberffraw-to-four-mile-bridge
- The area is part of the Beddmanarch and Cymyran SSSI; this is relevant to responsible access: https://www.visitanglesey.co.uk/en-gb/explore/wildlife/beddmanarch-bay-and-the-penrhos-coastal-park
- Decision: strong candidate for a beach mark, but don't imply vehicle access directly to the fishing position. Access should describe the public coastal path/foot approach, current signs and nature-conservation considerations. Exact parking and a suitable venue-level map point still need a further check.

### Moelfre — existing live record reviewed, do not duplicate
- The current live record anglesey-moelfre is already present at approximate venue-midpoint coordinates 53.35208, -4.23523, with sources and a checked date of 5 October 2026.
- Independent sources support Moelfre as a genuine shore-angling venue: Fishing in Wales lists numerous species and parking near the beach; Turners Tackle describes the rocky mark, uneven/slippery ground and the need to walk from parking: https://fishingwales.net/fishing-locations/moelfre/ and https://turnerstackle.co.uk/north-west-sea-fishing-marks/anglesey/moelfre/
- Holidays Anglesey independently identifies the coastal-path approach past the lifeboat station: https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/
- The existing record's broad species list is consistent with those fishing sources. Its access/parking wording is deliberately general, which is safer than claiming every rocky position is easy to reach.
- Decision: keep the existing record; no duplicate to add. In a later quality pass, consider clarifying that the coordinates are a venue midpoint, not the exact rock platform, and that conditions and access differ between harbour and outer rocks.

## Current decision
- Penmon Point: corroborated candidate, not yet live.
- Cymyran Bay: corroborated candidate, not yet live.
- Moelfre: existing record reviewed; no duplicate.
- No new marks or coordinates have been written to data/marks.json in this review.
