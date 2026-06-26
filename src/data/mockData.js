export const truck = {
  name: "2022 Ford E-450 Box Truck",
  type: "26 ft Box Truck",
  interior: "312 × 96 × 102 in",
  payloadLimit: 8900,
  floorLength: 312,
  floorWidth: 96,
  interiorHeight: 102,
  mpg: 10.1,
  gasPrice: 3.42
};

export const loads = [
  {
    id: "newark-philly",
    name: "Newark → Philadelphia",
    label: "Partial Load",
    status: "Optimized",
    revenue: 1180,
    fuelCost: 96,
    miles: 94,
    score: 92,
    utilization: 74,
    weight: 3350,
    stops: 3
  },
  {
    id: "elizabeth",
    name: "Elizabeth Warehouse Pickup",
    label: "Draft Load",
    status: "Draft",
    revenue: 740,
    fuelCost: 61,
    miles: 58,
    score: null,
    utilization: 52,
    weight: 2500,
    stops: 2
  }
];

export const opportunityRank = {
  "No rearrangements": 1,
  "Minimal rearrangements": 2,
  "Moderate rearrangements": 3,
  "Heavy rearrangements": 4,
  "Along route": 1,
  "Slight detour": 2,
  "Moderate detour": 3,
  "Heavy detour": 4
};

export const opportunities = [
  { id: "edison", title: "Edison, NJ → Cherry Hill, NJ", route: "Along route", effort: "No rearrangements", revenue: 285, fuelCost: 18, confidence: 96, weight: 1420, dims: "2 pallets • 48×40×46", note: "Drops into rear-right capacity without moving existing freight." },
  { id: "linden", title: "Linden, NJ → Camden, NJ", route: "Slight detour", effort: "Minimal rearrangements", revenue: 310, fuelCost: 28, confidence: 91, weight: 390, dims: "1 appliance crate • 36×34×60", note: "Requires one pallet rotation near rear access zone." },
  { id: "secaucus", title: "Secaucus, NJ → King of Prussia, PA", route: "Slight detour", effort: "Moderate rearrangements", revenue: 420, fuelCost: 45, confidence: 84, weight: 1900, dims: "2 pallets • 48×40×52", note: "Higher revenue but affects unload sequence." },
  { id: "new-brunswick", title: "New Brunswick, NJ → Philly Navy Yard", route: "Along route", effort: "Minimal rearrangements", revenue: 260, fuelCost: 16, confidence: 94, weight: 760, dims: "1 pallet • 48×40×48", note: "Fits with one forward shift." },
  { id: "jersey-city", title: "Jersey City, NJ → Bensalem, PA", route: "Moderate detour", effort: "No rearrangements", revenue: 355, fuelCost: 52, confidence: 78, weight: 840, dims: "2 appliances", note: "No rearrangement, but detour reduces match score." },
  { id: "rahway", title: "Rahway, NJ → Conshohocken, PA", route: "Along route", effort: "Moderate rearrangements", revenue: 240, fuelCost: 12, confidence: 82, weight: 510, dims: "Loose freight bundle", note: "Lower revenue with moderate effort." }
];

export const loadLogicPlan = [
  { id: "P1", label: "P1", type: "Pallet", x: 18, y: 22, w: 58, d: 48, h: 54, weight: 880, group: "existing" },
  { id: "P2", label: "P2", type: "Pallet", x: 84, y: 22, w: 58, d: 48, h: 52, weight: 900, group: "existing" },
  { id: "P3", label: "P3", type: "Pallet", x: 150, y: 22, w: 58, d: 48, h: 48, weight: 840, group: "existing" },
  { id: "C1", label: "CR1", type: "Crate", x: 18, y: 88, w: 78, d: 58, h: 72, weight: 420, group: "existing" },
  { id: "F1", label: "F1", type: "Furniture", x: 106, y: 88, w: 86, d: 52, h: 42, weight: 310, group: "existing" }
];

export const manualExamplePlan = [
  { id: "P1", label: "P1", type: "Pallet", x: 18, y: 22, w: 58, d: 48, h: 54, weight: 880, group: "existing" },
  { id: "P2", label: "P2", type: "Pallet", x: 84, y: 22, w: 58, d: 48, h: 52, weight: 900, group: "existing" },
  { id: "P3", label: "P3", type: "Pallet", x: 150, y: 22, w: 58, d: 48, h: 48, weight: 840, group: "existing" },
  { id: "C1", label: "CR1", type: "Crate", x: 18, y: 88, w: 78, d: 58, h: 72, weight: 420, group: "existing" },
  { id: "F1", label: "F1", type: "Furniture", x: 116, y: 96, w: 86, d: 52, h: 42, weight: 310, group: "existing" }
];

export const partialFreight = [
  { id: "N1", label: "NEW 1", type: "Pallet", x: 224, y: 92, w: 58, d: 48, h: 46, weight: 710, group: "new" },
  { id: "N2", label: "NEW 2", type: "Pallet", x: 224, y: 148, w: 58, d: 48, h: 46, weight: 710, group: "new" }
];

export const cargoTemplates = [
  { name: "Standard Pallet", dims: "48 × 40 × 52 in", weight: "880 lbs", rules: "Stackable • Rotatable" },
  { name: "Appliance Crate", dims: "36 × 34 × 72 in", weight: "420 lbs", rules: "Fragile • Do not stack" },
  { name: "Furniture Bundle", dims: "80 × 38 × 42 in", weight: "310 lbs", rules: "Side-load preferred" }
];
