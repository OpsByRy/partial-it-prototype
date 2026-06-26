export const truckSpec = { name:"30' Box Truck", type:"30 ft Box Truck", interiorLength:360, interiorWidth:96, interiorHeight:102, payloadLimit:12000, mpg:8.7, gasPrice:3.42 };
export const existingLoad = { id:"newark-philly", name:"Newark, NJ → Philadelphia, PA", status:"Optimized", revenue:1180, fuelCost:96, miles:94, score:92, utilization:74, weight:3350 };
export const opportunities = [
 { id:"edison", loadId:"PL-2026-001", title:"Edison, NJ → Cherry Hill, NJ", route:"Along route", effort:"No rearrangements", revenue:285, fuelCost:18, confidence:96, dims:"2 pallets • 48×40×46", weight:1420 },
 { id:"linden", loadId:"PL-2026-002", title:"Linden, NJ → Camden, NJ", route:"Slight detour", effort:"Minimal rearrangements", revenue:310, fuelCost:28, confidence:91, dims:"1 crate • 36×34×60", weight:390 },
 { id:"secaucus", loadId:"PL-2026-003", title:"Secaucus, NJ → King of Prussia, PA", route:"Slight detour", effort:"Moderate rearrangements", revenue:420, fuelCost:45, confidence:84, dims:"2 pallets • 48×40×52", weight:1900 },
 { id:"new-brunswick", loadId:"PL-2026-004", title:"New Brunswick, NJ → Philly Navy Yard", route:"Along route", effort:"Minimal rearrangements", revenue:260, fuelCost:16, confidence:94, dims:"1 pallet • 48×40×48", weight:760 },
 { id:"jersey-city", loadId:"PL-2026-005", title:"Jersey City, NJ → Bensalem, PA", route:"Moderate detour", effort:"No rearrangements", revenue:355, fuelCost:52, confidence:78, dims:"2 appliances", weight:840 },
 { id:"rahway", loadId:"PL-2026-006", title:"Rahway, NJ → Conshohocken, PA", route:"Along route", effort:"Moderate rearrangements", revenue:240, fuelCost:12, confidence:82, dims:"Loose freight bundle", weight:510 }
];
export const opportunityRank = {"No rearrangements":1,"Minimal rearrangements":2,"Moderate rearrangements":3,"Heavy rearrangements":4,"Along route":1,"Slight detour":2,"Moderate detour":3};
export const loadLogicPlan = [
 { id:"P001", loadId:"FTL-2026-014", label:"P001", type:"pallet", length:48, width:40, height:36, weight:950, stackable:true, maxStackWeight:1600, canRotate:true, orientation:0, x:24, y:8, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"P002", loadId:"FTL-2026-014", label:"P002", type:"pallet", length:48, width:40, height:40, weight:1100, stackable:true, maxStackWeight:1600, canRotate:true, orientation:0, x:78, y:8, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"P003", loadId:"FTL-2026-014", label:"P003", type:"pallet", length:48, width:40, height:48, weight:1000, stackable:true, maxStackWeight:1500, canRotate:true, orientation:0, x:132, y:8, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"P004", loadId:"FTL-2026-014", label:"P004", type:"pallet", length:48, width:40, height:36, weight:925, stackable:true, maxStackWeight:1600, canRotate:true, orientation:0, x:186, y:8, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"CR001", loadId:"FTL-2026-014", label:"CR001", type:"crate", length:56, width:42, height:46, weight:1050, stackable:true, maxStackWeight:1200, canRotate:true, orientation:0, x:24, y:52, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"P005", loadId:"FTL-2026-014", label:"P005", type:"pallet", length:48, width:40, height:36, weight:875, stackable:true, maxStackWeight:1600, canRotate:true, orientation:0, x:86, y:52, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"C001", loadId:"FTL-2026-014", label:"C001", type:"carton stack", length:48, width:40, height:32, weight:850, stackable:true, maxStackWeight:900, canRotate:true, orientation:0, x:140, y:52, z:0, locked:false, group:"existing", status:"optimized" },
 { id:"C002", loadId:"FTL-2026-014", label:"C002", type:"carton stack", length:48, width:40, height:28, weight:420, stackable:false, maxStackWeight:0, canRotate:true, orientation:0, x:78, y:8, z:40, locked:false, group:"existing", status:"optimized", parentId:"P002" }
];
export const partialItems = [
 { id:"P006", loadId:"PL-2026-001", label:"P006", type:"pallet", length:48, width:40, height:36, weight:900, stackable:true, maxStackWeight:1400, canRotate:true, orientation:0, x:254, y:8, z:0, locked:false, group:"new", status:"incoming" },
 { id:"D001", loadId:"PL-2026-001", label:"D001", type:"drum pallet", length:40, width:40, height:40, weight:850, stackable:true, maxStackWeight:1000, canRotate:false, orientation:0, x:254, y:52, z:0, locked:false, group:"new", status:"incoming" },
 { id:"A001", loadId:"PL-2026-001", label:"A001", type:"appliance", length:48, width:40, height:28, weight:700, stackable:true, maxStackWeight:950, canRotate:true, orientation:0, x:308, y:52, z:0, locked:false, group:"new", status:"incoming" },
 { id:"C003", loadId:"PL-2026-001", label:"C003", type:"carton stack", length:48, width:40, height:32, weight:950, stackable:false, maxStackWeight:0, canRotate:true, orientation:0, x:308, y:52, z:28, locked:false, group:"new", status:"incoming", parentId:"A001" }
];
export const cargoTemplates = [
 { name:"Standard Pallet", dims:"48 × 40 × 52 in", weight:"880 lbs", rules:"Stackable • Rotatable" },
 { name:"Appliance Crate", dims:"36 × 34 × 72 in", weight:"420 lbs", rules:"Fragile • Do not stack" },
 { name:"Furniture Bundle", dims:"80 × 38 × 42 in", weight:"310 lbs", rules:"Side-load preferred" }
];
