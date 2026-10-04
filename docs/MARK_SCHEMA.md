# Fishing Mark Data Schema

Each mark must have a clear publication status.

## Status
- `verified` — suitable to display as an official verified mark. A recognised fishing publication (for example *Sea Angler* or *Boat Fishing*) may be used as the verification source for a published mark.
- `historical` — a genuine previously documented fishing mark whose current conditions, access or restrictions have not been confirmed recently. Keep it searchable, label it clearly as historical, and do not present it as currently verified.
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
- Verification should record who/what source was used and when it was checked. Store this date in `source.checked_at` and display it as **Last checked**. Do not add a “next review” date.
- Use `historical` when a genuine older mark has not had its current details confirmed; never invent a last-checked date. If no check date is recorded, display “Last checked: Not recorded”.
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


### Community ratings
- A mark may have a community rating from 1 to 5 stars.
- Ratings are separate from verification status; a rating never makes a mark verified.
- Use `rating.average` and `rating.count` only when real user ratings exist.
- If there are no ratings, display `Not yet rated`; never invent an initial score.
- Future voting should use authenticated users and protection against repeated or abusive votes.

Example: `"rating": { "average": 4.5, "count": 12 }`.
