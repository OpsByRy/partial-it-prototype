export const truckSpec = { name:"2022 Ford E-450 Box Truck", type:"26 ft Box Truck", interiorLength:312, interiorWidth:96, interiorHeight:102, payloadLimit:8900, mpg:10.1, gasPrice:3.42 };
export const existingLoad = { id:"newark-philly", name:"Newark, NJ → Philadelphia, PA", status:"Optimized", revenue:1180, fuelCost:96, miles:94, score:92, utilization:74, weight:3350 };
export const opportunities = [
 { id:"edison", title:"Edison, NJ → Cherry Hill, NJ", route:"Along route", effort:"No rearrangements", revenue:285, fuelCost:18, confidence:96, dims:"2 pallets • 48×40×46", weight:1420 },
 { id:"linden", title:"Linden, NJ → Camden, NJ", route:"Slight detour", effort:"Minimal rearrangements", revenue:310, fuelCost:28, confidence:91, dims:"1 crate • 36×34×60", weight:390 },
 { id:"secaucus", title:"Secaucus, NJ → King of Prussia, PA", route:"Slight detour", effort:"Moderate rearrangements", revenue:420, fuelCost:45, confidence:84, dims:"2 pallets • 48×40×52", weight:1900 },
 { id:"new-brunswick", title:"New Brunswick, NJ → Philly Navy Yard", route:"Along route", effort:"Minimal rearrangements", revenue:260, fuelCost:16, confidence:94, dims:"1 pallet • 48×40×48", weight:760 },
 { id:"jersey-city", title:"Jersey City, NJ → Bensalem, PA", route:"Moderate detour", effort:"No rearrangements", revenue:355, fuelCost:52, confidence:78, dims:"2 appliances", weight:840 },
 { id:"rahway", title:"Rahway, NJ → Conshohocken, PA", route:"Along route", effort:"Moderate rearrangements", revenue:240, fuelCost:12, confidence:82, dims:"Loose freight bundle", weight:510 }
];
export const opportunityRank = {"No rearrangements":1,"Minimal rearrangements":2,"Moderate rearrangements":3,"Heavy rearrangements":4,"Along route":1,"Slight detour":2,"Moderate detour":3};
export const loadLogicPlan = [
 { id:"ATL-0023", label:"ATL", x:16, y:10, z:0, w:48, d:40, h:36, weight:950, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"PHL-0045", label:"PHL", x:68, y:10, z:0, w:48, d:40, h:40, weight:1100, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"TRE-0012", label:"TRE", x:120, y:10, z:0, w:48, d:40, h:48, weight:1000, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"LEX-0033", label:"LEX", x:172, y:10, z:0, w:48, d:40, h:36, weight:925, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"BUF-0066", label:"BUF", x:16, y:54, z:0, w:48, d:40, h:40, weight:1050, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"ALB-0077", label:"ALB", x:68, y:54, z:0, w:48, d:40, h:36, weight:875, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"SYR-0099", label:"SYR", x:120, y:54, z:0, w:48, d:40, h:32, weight:850, layer:0, stackable:true, locked:false, group:"existing" },
 { id:"TOP-1001", label:"TOP", x:68, y:10, z:40, w:48, d:40, h:28, weight:420, layer:1, stackable:false, locked:false, group:"existing", parentId:"PHL-0045" }
];
export const partialItems = [
 { id:"WIL-0101", label:"WIL", x:224, y:10, z:0, w:48, d:40, h:36, weight:900, layer:0, stackable:true, locked:false, group:"new" },
 { id:"HBG-0330", label:"HBG", x:224, y:54, z:0, w:40, d:40, h:40, weight:850, layer:0, stackable:true, locked:false, group:"new" },
 { id:"YRD-0440", label:"YRD", x:172, y:54, z:0, w:48, d:40, h:28, weight:700, layer:0, stackable:true, locked:false, group:"new" },
 { id:"PIT-0550", label:"PIT", x:172, y:54, z:28, w:48, d:40, h:32, weight:950, layer:1, stackable:false, locked:false, group:"new", parentId:"YRD-0440" }
];
export const cargoTemplates = [
 { name:"Standard Pallet", dims:"48 × 40 × 52 in", weight:"880 lbs", rules:"Stackable • Rotatable" },
 { name:"Appliance Crate", dims:"36 × 34 × 72 in", weight:"420 lbs", rules:"Fragile • Do not stack" },
 { name:"Furniture Bundle", dims:"80 × 38 × 42 in", weight:"310 lbs", rules:"Side-load preferred" }
];