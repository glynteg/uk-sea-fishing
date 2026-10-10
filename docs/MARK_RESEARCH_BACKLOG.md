# Fishing mark research backlog

This is a working list of candidate venues to check against the live mark database before adding anything. Candidates in this document are NOT automatically verified app marks.

## Process

1. Check `data/marks.json` for an existing venue or nearby duplicate.
2. Use British Sea Fishing and Sea Angler as fishing-specific evidence, and The Beach Guide for geographic context. Seek independent official access/parking information where available.
3. Record exactly what each source supports. Do not assume a source that identifies a beach verifies every fishing position, access route, parking arrangement or species claim.
4. Add to the live database only when the location and essential details have adequate supporting evidence. Use approximate venue midpoints only when explicitly labelled as such.
5. Seasonal species notes should describe typical patterns, not guaranteed catches. For magazine catch reports, distinguish the useful seasonal pattern from a claim about current catches; only record a year when needed to interpret the source.

## First research batch: Hampshire and West Sussex

### Hill Head / Hill Head Sea Wall — Hampshire
- Initial lead: fishing-specific venue guide describes a shore mark at Hill Head.
- Cross-check: British Sea Fishing's South East England guide and current local access information should be reviewed before publication.
- Candidate source: https://fishingspots.org.uk/spots/hill-head-hampshire.html
- British Sea Fishing regional guide: https://britishseafishing.co.uk/south-east-england/
- Status: candidate; check exact fishing position, current access/parking, species claims and duplicate proximity before adding.

### Eastney Beach — Hampshire
- Initial lead: fishing-specific guide describes the beach and access from the Southsea seafront.
- Cross-check: British Sea Fishing regional guide and official local coastal/access information.
- Candidate source: https://wheresthefish.uk/south-east/hampshire/eastney-beach
- British Sea Fishing regional guide: https://britishseafishing.co.uk/south-east-england/
- Status: candidate; check current access/parking, boundaries and species claims before adding.

### Langstone Harbour / harbour entrance — Hampshire
- Fishing is documented by the harbour authority, which also publishes important rules and navigation/safety information.
- Official fishing information: https://www.langstoneharbour.org.uk/fish-and-fishing
- Official navigation information: https://www.langstoneharbour.org.uk/navigation
- Status: candidate area, not one single exact mark. Separate specific shore positions only where public access and fishing permission are confirmed. Review current bass and other restrictions before publishing advice.

### Bracklesham Bay — West Sussex
- British Sea Fishing describes Bracklesham Bay and nearby East/West Wittering as fishing venues and lists reported species.
- Fishing-specific source: https://britishseafishing.co.uk/south-east-england/
- Additional venue guide: https://wheresthefish.uk/south-east/west-sussex/bracklesham-bay
- Geographic context: https://www.thebeachguide.co.uk/south-east-england/west-sussex/west-wittering-east-head-map.htm
- Status: candidate; check exact map position, access/parking, seasonal claims and duplicates before adding.

### East Wittering Beach — West Sussex
- British Sea Fishing groups East Wittering with the Bracklesham Bay and West Wittering shore area.
- Fishing-specific source: https://britishseafishing.co.uk/south-east-england/
- Additional venue guide: https://wheresthefish.uk/south-east/west-sussex/town/east-wittering
- Geographic context: https://www.thebeachguide.co.uk/south-east-england/west-sussex/west-wittering-east-head-map.htm
- Status: candidate; check whether this should be a distinct mark or linked venue and verify access/parking before adding.

### West Wittering Beach / East Head — West Sussex
- Fishing-specific source: https://britishseafishing.co.uk/south-east-england/
- Geographic context and map: https://www.thebeachguide.co.uk/south-east-england/west-sussex/west-wittering-east-head-map.htm
- Status: candidate; check access restrictions, parking, conservation designations and whether East Head should be a separate mark before adding.

## North Wales / Anglesey follow-up

The current database already contains Anglesey marks including Benllech Bay, Cemlyn Beach, Red Wharf Bay, Beaumaris Pier, Moelfre and Holyhead Breakwater, plus Garth Pier in Bangor and several Conwy coast marks. Check for nearby duplicates before expanding these areas.

### Moelfre
- Fishing venue: https://turnerstackle.co.uk/north-west-sea-fishing-marks/anglesey/moelfre/
- Independent regional context: https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/
- Status: already represented in live data; review evidence and current access rather than adding a duplicate.

### Penmon Point
- Fishing venue: https://turnerstackle.co.uk/north-west-sea-fishing-marks/anglesey/penmon-point/
- Independent regional context: https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/
- Status: candidate; check exact fishing position, current access, species evidence and duplicates before adding.

### Cymyran Beach / Cymyran Bay
- Regional context: https://www.holidaysanglesey.co.uk/activities/shore-fishing-on-anglesey/
- Additional venue guide: https://wheresthefish.uk/wales/isle-of-anglesey/cymyran-bay
- Status: candidate; check exact fishing position, access and species evidence before adding.

## Seasonal species and catch-report notes

For each supported area/species combination, record:
- species name;
- typical arrival period, peak period and departure period only where evidence supports them;
- area or individual mark to which the pattern applies;
- source links and the wording/evidence that supports the season;
- confidence (high, medium, low) based on corroboration;
- whether the information is a general seasonal pattern, a dated catch report, or an angler contribution.

Do not treat a monthly magazine publication date as the catch date. A report can support a typical seasonal pattern without claiming that the fish are being caught at the time the article is read. Avoid repeating unsupported season claims from multiple websites when they all appear to derive from one source.

## Important

No candidate in this backlog should appear as a verified mark solely because it is listed here. Confirm the location and essential details, check duplicates, and retain the source evidence when promoting a candidate into `data/marks.json`.


## Cross-check findings (11 October 2026)

### Hill Head — evidence found, but not ready to promote
- A fishing-specific guide describes Hill Head & Sea Wall as a shore venue and attributes the species/access notes to British Sea Fishing: https://fishingspots.org.uk/spots/hill-head-hampshire.html
- A second guide treats Hill Head Harbour Wall as a distinct, more specific structure and explicitly cautions that not every wall, slipway, pontoon or boatyard area should be assumed public: https://wheresthefish.uk/south-east/hampshire/hill-head-harbour-wall
- Decision: do not merge “Hill Head & Sea Wall” and “Hill Head Harbour Wall” into one record without checking exact boundaries. Confirm public standing areas and parking details independently, then choose one venue or two genuinely distinct marks. The species lists in these guides are leads, not proof of current catches.

### Eastney Beach — access evidence corroborated; species still needs careful sourcing
- Fishing-specific guide describes Eastney as a general shore-fishing venue: https://wheresthefish.uk/south-east/hampshire/eastney-beach
- Portsmouth City Council confirms Eastney Beach's location and says there is pay-and-display parking along Southsea Esplanade. It also identifies the beach as a Site of Importance for Nature Conservation and habitat for rare plants and birds: https://www.portsmouth.gov.uk/services/leisure/parks-and-open-spaces/wildlife-and-conservation/eastney-beach-flora-and-fauna
- British Sea Fishing provides regional species context for Portsmouth/Southampton and Langstone Harbour, but does not by itself establish every species at every point along Eastney: https://britishseafishing.co.uk/south-east-england/
- Decision: promising candidate, but record parking as paid and verify exact mark boundaries and any local restrictions before adding. Keep the conservation context in mind when describing access and behaviour.

### Bracklesham Bay and East/West Wittering — fishing and access evidence cross-checked
- British Sea Fishing covers Bracklesham Bay and East/West Wittering together, reporting possible bass, pouting, dogfish, flounder, Dover sole, smooth-hound and thornback ray, with weed conditions affecting fishing: https://britishseafishing.co.uk/south-east-england/
- Chichester District Council confirms coastal recreation including sea fishing, identifies parking at Bracklesham Lane and Marine Drive/East Wittering, and notes that busy-day parking can fill: https://www.chichester.gov.uk/article/24068/Coastal-recreation-byelaws-and-slipways
- Official car-park information: https://www.chichester.gov.uk/carparks
- Beach-guide geographic context: https://www.thebeachguide.co.uk/south-east-england/west-sussex/west-wittering-east-head-map.htm
- Decision: these are credible candidate venues. Before adding, inspect existing nearby coordinates and decide whether Bracklesham, East Wittering and West Wittering/East Head are separate practical fishing marks or linked beach sections. Parking details should link to the council's current page rather than hard-code potentially changing charges.

### Seasonal plaice pattern — source supports spring, not the user's precise three-week offset
- Sea Angler's 16 April 2025 article describes spring plaice fishing on Brighton beaches and marina arms, noting that plaice can be present year-round when conditions suit, with better months in spring and a later autumn run: https://www.seaangler.co.uk/fishing-tips/species/on-the-chase-for-spring-plaice/
- This supports a broad Sussex spring pattern only. It does not establish a precise arrival date for Brighton versus Portsmouth, nor a three-week delay between locations.
- Decision: retain the user's Brighton/Portsmouth timing as an anecdotal lead, not verified seasonal data, until local dated reports or multiple independent sources support the comparison. A monthly magazine's publication date must not be treated as the catch date.

### Langstone Harbour — use official rules, avoid broad unqualified mark
- Official harbour fishing information: https://www.langstoneharbour.org.uk/fish-and-fishing
- Official navigation information: https://www.langstoneharbour.org.uk/navigation
- British Sea Fishing describes Langstone Harbour regionally as a venue for bass and flounder, but the official harbour guidance takes precedence for restrictions and safe access: https://britishseafishing.co.uk/south-east-england/
- Decision: do not add “Langstone Harbour” as a single mark. Identify exact shore positions and verify public access/permission, navigation hazards and current bass restrictions first.

### Next research actions
1. Inspect live mark coordinates and schema for nearby overlap before deciding on Bracklesham / Wittering boundaries.
2. Check exact access and species evidence for Penmon Point and Cymyran Bay, then review Moelfre's existing record rather than duplicating it.
3. Continue finding individual Sea Angler venue pages and dated reports where they provide location-specific seasonal evidence.
