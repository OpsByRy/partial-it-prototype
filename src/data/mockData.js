export const routeLoads = [
  { id: "newark-philly", name: "Newark → Philly Partial", status: "Optimized", revenue: 1180, fuelCost: 96, miles: 94, gasPrice: 3.42, mpg: 10.1, score: 92, pallets: 5, open: "2 pallet positions" },
  { id: "elizabeth", name: "Elizabeth Warehouse Pickup", status: "Draft", revenue: 740, fuelCost: 61, miles: 58, gasPrice: 3.42, mpg: 10.1, score: null, pallets: 4, open: "Needs optimization" }
];

export const opportunityRank = {
  "No rearrangements": 1,
  "Minimal rearrangements": 2,
  "Moderate rearrangements": 3,
  "Heavy rearrangements": 4,
  "Along route": 1,
  "Slight detour": 2,
  "Moderate detour": 3
};

export const opportunities = [
  { id: "edison", title: "Edison, NJ → Cherry Hill, NJ", revenue: 285, fuelCost: 18, route: "Along route", effort: "No rearrangements", dims: "2 pallets • 48×40×46", weight: "1,420 lbs", confidence: 96 },
  { id: "linden", title: "Linden, NJ → Camden, NJ", revenue: 310, fuelCost: 28, route: "Slight detour", effort: "Minimal rearrangements", dims: "1 crate • 36×34×60", weight: "390 lbs", confidence: 91 },
  { id: "secaucus", title: "Secaucus, NJ → King of Prussia, PA", revenue: 420, fuelCost: 45, route: "Slight detour", effort: "Moderate rearrangements", dims: "2 pallets • 48×40×52", weight: "1,900 lbs", confidence: 84 },
  { id: "new-brunswick", title: "New Brunswick, NJ → Philly Navy Yard", revenue: 260, fuelCost: 16, route: "Along route", effort: "Minimal rearrangements", dims: "1 pallet • 48×40×48", weight: "760 lbs", confidence: 94 },
  { id: "jersey-city", title: "Jersey City, NJ → Bensalem, PA", revenue: 355, fuelCost: 52, route: "Moderate detour", effort: "No rearrangements", dims: "2 appliances", weight: "840 lbs", confidence: 78 },
  { id: "rahway", title: "Rahway, NJ → Conshohocken, PA", revenue: 240, fuelCost: 12, route: "Along route", effort: "Moderate rearrangements", dims: "Loose freight bundle", weight: "510 lbs", confidence: 82 }
];

export const baseCargo = [
  { id: "P1", label: "P1", x: 14, y: 20, w: 58, h: 48, z: 48, weight: 880, locked: false },
  { id: "P2", label: "P2", x: 78, y: 20, w: 58, h: 48, z: 52, weight: 900, locked: false },
  { id: "P3", label: "P3", x: 142, y: 20, w: 58, h: 48, z: 48, weight: 840, locked: false },
  { id: "CR1", label: "CRATE", x: 14, y: 82, w: 78, h: 58, z: 72, weight: 420, locked: false },
  { id: "FB1", label: "FURN", x: 100, y: 82, w: 88, h: 52, z: 42, weight: 310, locked: false }
];

export const optimizedCargo = [
  { id: "P1", label: "P1", x: 14, y: 18, w: 58, h: 48, z: 48, weight: 880, locked: false },
  { id: "P2", label: "P2", x: 78, y: 18, w: 58, h: 48, z: 52, weight: 900, locked: false },
  { id: "P3", label: "P3", x: 142, y: 18, w: 58, h: 48, z: 48, weight: 840, locked: false },
  { id: "CR1", label: "CRATE", x: 14, y: 76, w: 78, h: 58, z: 72, weight: 420, locked: false },
  { id: "FB1", label: "FURN", x: 98, y: 76, w: 88, h: 52, z: 42, weight: 310, locked: false }
];

export const lockedExistingCargo = optimizedCargo.map(c => ({ ...c, locked: true }));
export const partialCargo = [
  { id: "NP1", label: "NEW P1", x: 206, y: 88, w: 58, h: 48, z: 46, weight: 710, locked: false, newLoad: true },
  { id: "NP2", label: "NEW P2", x: 206, y: 142, w: 58, h: 48, z: 46, weight: 710, locked: false, newLoad: true }
];
