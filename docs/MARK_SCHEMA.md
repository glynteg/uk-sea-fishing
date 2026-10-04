# Fishing Mark Data Schema

Each mark must have a clear publication status.

## Status
- `verified` — independently checked and suitable to display as an official verified mark.
- `community_unverified` — submitted by an angler and not yet independently checked.
- `rejected` — not suitable for publication.

## Required principles
- Never guess coordinates.
- Never invent a mark name, species, access information or fishing advice.
- A community submission must remain clearly labelled as unverified until checked.
- Verification should record who/what source was used and when it was checked.

## Suggested mark fields

```json
{
  "id": "unique-id",
  "name": "Mark name",
  "status": "verified",
  "location": {
    "latitude": 0,
    "longitude": 0,
    "area": "Named area"
  },
  "description": "Verified description",
  "species": [],
  "tips": [],
  "access": "Verified access information",
  "photos": [],
  "source": {
    "type": "independent_check",
    "reference": "",
    "checked_at": ""
  }
}
```

Coordinates and factual fields must come from a trustworthy source or a documented verification process; placeholder coordinates must never be published as real fishing locations.
