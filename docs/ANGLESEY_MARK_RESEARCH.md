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


## Further North Wales / Anglesey candidates — 11 October 2026

The following are fishing-specific venue entries in Fishing in Wales. They are not in the current 37-mark live database by these exact names. Because several lie close together around Rhosneigr, do not create records until the map positions and boundaries show that each is a distinct, useful fishing mark.

### Llanddwyn Bay / Ynys Llanddwyn
- Fishing in Wales describes Llanddwyn Bay as sandy beach fishing and the western end at Llanddwyn Island as a mixed sand-and-rock mark. Reported species include bass, dogfish, flatfish, codling, dab, whiting, rays, coalfish and smoothhound.
- Source: https://fishingwales.net/fishing-locations/llanddwyn-bay/
- Access note: the area is in a nature reserve and an entry fee may apply; the island is a walk west along the beach. Confirm current Newborough Forest / beach access, seasonal restrictions and the correct boundary before adding.
- Status: candidate; no coordinates copied or guessed.

### Porth Trecastell / Cable Bay
- Fishing in Wales identifies a popular rock mark with a small, shallow sandy beach. Reported species include bass, cod, whiting, coalfish, pollack, conger, bullhuss, rays, codling and mackerel.
- Source: https://fishingwales.net/fishing-locations/rhosneigr-porth-trecastell-cable-bay/
- Access note: the guide describes a car park above the beach. Verify current access, parking terms, coastal hazards and any archaeological/conservation constraints before publication.
- Status: candidate.

### Ty Croes
- Fishing in Wales identifies a rock mark fishing onto sand and describes a signed fisherman’s car park and track to the marks.
- Source: https://fishingwales.net/fishing-locations/rhosneigr-ty-croes/
- Access note: access appears to involve a designated parking area and a track; confirm current permission and whether the parking is private/fee-based. Do not imply direct vehicle access to the fishing rocks.
- Status: candidate.

### Traeth Llydan / Broad Beach
- Fishing in Wales describes a mixed sand-and-shingle beach with rocks in places and a car park a short walk away. Species reported include bass, cod, whiting, coalfish, pollack, conger, bullhuss, rays, codling and mackerel.
- Source: https://fishingwales.net/fishing-locations/rhosneigr-traeth-llydan-broad-beach/
- Status: candidate; compare its boundaries with Cymyran Bay and Porth Trecastell to avoid duplicate or overlapping beach records.

### Traeth Crigyll / Rhosneigr Town Beach
- Fishing in Wales describes a small mixed sand-and-rock beach in front of Rhosneigr, with access from Beach Road and parking at the top of the beach. Reported species include bass, cod, whiting, coalfish, pollack, conger, bullhuss, rays, codling and mackerel.
- Source: https://fishingwales.net/fishing-locations/rhosneigr-traeth-crigyll-town-beach/
- Status: candidate; check current access and whether the venue boundary is distinct from the adjacent Traeth Llydan / Cymyran entries.

### Cymyran Bay — additional fishing-specific corroboration
- Fishing in Wales confirms the long mixed sand, rock and shingle beach alongside Valley airfield, and warns that the tidal race at the north end can be dangerous: https://fishingwales.net/fishing-locations/rhosneigr-traeth-cymyran-cymyran-beach/
- This adds a second fishing-specific source alongside the existing Holidays Anglesey and Where's The Fish references. Retain the earlier access and exact-map-point checks.

## North Wales candidate triage
1. **Higher priority:** Penmon Point and Cymyran Bay, because they have multiple fishing sources and identifiable access leads.
2. **Next:** Llanddwyn Bay / Island and Porth Trecastell, with nature-reserve/access checks before publication.
3. **Then:** Ty Croes, Traeth Llydan and Traeth Crigyll, after comparing the clustered Rhosneigr beach boundaries and parking permissions.
4. **Already live:** Moelfre, Benllech Bay, Cemlyn Beach, Red Wharf Bay, Beaumaris Pier, Holyhead Breakwater and Garth Pier. Review existing records rather than duplicating them.

No candidate in this section has been added to data/marks.json. All species lists remain source-reported venue possibilities, not guarantees of current catches.
