# Partial-It Mobile Load Planner v3

Updates:
- Mobile Loads page styled closer to the desktop reference.
- Long trailer proportions based on 312 x 96 x 102 in interior.
- One shared cargo state across Top, Rear, Side, and 3D views.
- Top view accounts for stacked cargo layers.
- Stack-aware validation: red only if same-layer overlap, unsupported overhang, trailer boundary, or internal-clearance violation.
- Rear view is visual-only: open rear trailer, stacked blocks, internal clearance. No graph.
- Smaller 2-inch snap grid.
- Optimize Load restores saved LoadLogic plan; Undo returns to previous manual state.


## v3.1 updates

- Replaced city-style cargo labels with neutral pallet/item identifiers: P1, P2, P3, S1, N1, etc.
- Added partial Load ID numbers to partial-load cards.
- Simplified 45° view to clean volume cubes/cuboids representing parcel volume.
- Reduced visual clutter from extra angled face geometry.
