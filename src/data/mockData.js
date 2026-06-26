export const trucks = [
  { name: "2022 Ford E-450", type: "26 ft Box Truck", status: "Verified Digital Twin", utilization: 74 },
  { name: "2020 Freightliner M2", type: "24 ft Box Truck", status: "Measurement Review", utilization: 62 }
];

export const cargo = [
  { name: "Standard Pallet", dims: "48 × 40 × 52 in", weight: "880 lbs", qty: 6 },
  { name: "Appliance Crate", dims: "36 × 34 × 72 in", weight: "420 lbs", qty: 2 },
  { name: "Furniture Bundle", dims: "80 × 38 × 42 in", weight: "310 lbs", qty: 1 }
];

export const partialOpportunities = [
  {
    id: 1,
    title: "Pickup: Edison, NJ",
    route: "Adds 18 miles",
    payout: "$285",
    freight: "2 standard pallets",
    weight: "1,420 lbs",
    dims: "48 × 40 × 46 in each",
    fit: "Fits in remaining rear-right capacity",
    confidence: "94% fit confidence"
  },
  {
    id: 2,
    title: "Pickup: Linden, NJ",
    route: "Adds 9 miles",
    payout: "$160",
    freight: "1 appliance crate",
    weight: "390 lbs",
    dims: "36 × 34 × 60 in",
    fit: "Requires unload sequence change",
    confidence: "82% fit confidence"
  }
];
