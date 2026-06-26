# Partial-It CAD Planner Prototype

High-fidelity React/Vite prototype for Partial-It.

## Included

- Mobile-first iOS-style app shell
- CAD-style truck trailer planner
- 3D volume-rendered cargo blocks
- Top, Rear, Side, and 45° Perspective views
- Bounded dragging
- Snap-to-grid behavior
- Rotation
- Collision detection with red invalid cargo
- Locked existing freight for partial load review
- LoadLogic default arrangement
- Manual rearrangement mode
- Optimize Load resets to the LoadLogic default
- Undo/Redo for manual moves and optimization
- New Load intake: upload document or manual pallet entry
- Capacity opportunity ranking
- Revenue, fuel cost, and estimated profit cards
- Scrollable pages

## Deploy to GitHub Pages

If `.github/workflows/deploy.yml` already exists in your repo, you do not need to upload it again.

Upload or replace:

```text
README.md
index.html
package.json
src/
vite.config.js
```

Then commit to `main`. GitHub Actions will redeploy automatically.

If you are creating a fresh repo, upload the `.github` folder too.
