# Fishing Mark Data Schema

Each mark must have a clear publication status.

## Status
- `verified` — suitable to display as an official verified mark. A recognised fishing publication (for example *Sea Angler* or *Boat Fishing*) may be used as the verification source for a published mark.
- `community_unverified` — submitted by an angler and not yet independently checked.
- `rejected` — not suitable for publication.

## Verification source types
- `fishing_publication` — named mark published by a recognised specialist fishing magazine or publication.
- `independent_check` — independently checked against reliable information.
- `community_submission` — supplied by an angler and not yet verified.

## Required principles
- Never guess coordinates.
- Never invent a mark name, species, access information or fishing advice.
- A community submission must remain clearly labelled as unverified until checked.
- Verification should record who/what source was used and when it was checked.
- Publication of a mark verifies the published mark itself; it does not automatically verify additional details that were not published.

## Location information

Where reliably established, a mark may contain both latitude/longitude and a What3words location.

```json
{
  "id": "unique-id",
  "name": "Mark name",
  "status": "verified",
  "location": {
    "latitude": 0,
    "longitude": 0,
    "area": "Named area",
    "what3words": "///word.word.word"
  },
  "description": "Verified description",
  "species": [],
  "tips": [],
  "access": "Verified access information",
  "parking": "Verified parking information",
  "parking_cost": "Free / Pay & Display / Permit / Unknown",
  "access_difficulty": "easy / moderate / difficult / unknown",
  "easy_access": false,
  "accessible_access": false,
  "access_what3words": "///word.word.word",
  "photos": [],
  "source": {
    "type": "fishing_publication",
    "publication": "Publication name",
    "reference": "Issue/article/page where available",
    "checked_at": ""
  }
}
```

### Parking and access

Parking and access are first-class mark information. Record them separately when reliable information is available. `easy_access` means the route to the fishing position has been checked as relatively easy. `accessible_access` should only be true when there is reliable evidence that the fishing position and route are suitable for anglers with accessibility needs. Do not infer accessibility from nearby parking alone.

### What3words rule

What3words is an optional precision-location field. It must only be added when the exact location can be reliably established. A What3words address must never be guessed from an approximate mark description.

Coordinates and factual fields must come from a trustworthy source or a documented verification process; placeholder coordinates must never be published as real fishing locations.
