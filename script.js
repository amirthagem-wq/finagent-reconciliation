/**
 * Sort It — script.js (v2, Dark Forest Edition)
 * Enhanced: category filters, surprise-me, share verdict, history stats,
 * keyboard shortcut (/), verdict colour hints on search cards, log badge.
 * Data is embedded — no server needed for file:// in Chrome/Edge.
 */
'use strict';

const ITEMS_DATA = {"version":"1.0","region":"Generic English-speaking, UK-leaning defaults.","items":[{"id":"newspaper","name":"Newspaper","synonyms":["newsprint","broadsheet","tabloid","printed paper","magazine supplement"],"materials":["paper"],"questions":[],"direct_verdict":"recycle","verdicts":{"recycle":{"verdict":"recycle","reason":"Dry newspaper is one of the cleanest recyclables. Paper mills turn it into new paper or cardboard within weeks.","confidence":"high","did_you_know":"Recycling one tonne of newspapers saves around 17 trees and 26,000 litres of water compared to virgin wood pulp.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"glossy-magazine","name":"Glossy magazine or catalogue","synonyms":["magazine","catalogue","brochure","glossy paper","flyer","leaflet","junk mail","newsletter"],"materials":["coated paper"],"questions":[],"direct_verdict":"recycle","verdicts":{"recycle":{"verdict":"recycle","reason":"Glossy magazines recycle with ordinary paper. The shiny coating is mineral-based (kaolin clay), not plastic — it washes away in the pulping process.","confidence":"high","did_you_know":"Despite what many people assume, glossy paper's sheen is clay, not a plastic film. It causes no problems at a standard paper mill.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"cardboard-box","name":"Cardboard box","synonyms":["cardboard","corrugated cardboard","moving box","shipping box","delivery box","amazon box","brown box"],"materials":["cardboard"],"questions":[{"id":"q1","text":"Is the cardboard clean and dry — free of food residue and not wet?","hint":"Wet or food-soiled cardboard breaks down during the pulping process, contaminating an entire bale. Soggy cardboard from a leak also counts.","yes":"recycle","no":"general-waste"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"Flatten it first to save space. Clean corrugated cardboard has among the highest recycling rates of any material.","confidence":"high","did_you_know":"Cardboard fibres can be recycled up to seven times before they become too short to bind together. After that they are composted.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"general-waste":{"verdict":"general-waste","reason":"Wet or food-soiled cardboard contaminates the paper pulp stream. Even small amounts of moisture can raise rejection rates for a whole bale.","confidence":"high","did_you_know":"If only part of the box is soiled (e.g. a greasy corner), tear off the clean sections and recycle those — every bit helps.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"pizza-box","name":"Pizza box","synonyms":["pizza carton","pizza packaging","takeaway pizza box","pizza container"],"materials":["cardboard"],"questions":[{"id":"q1","text":"Is the box visibly greasy or does it have food stuck to it?","hint":"Grease soaks into cardboard fibres permanently. It cannot be separated during paper pulping, so even a small greasy patch contaminates a whole batch.","yes":"general-waste","no":"recycle"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"A clean pizza box is fully recyclable. If only the base is greasy, tear off the clean lid and recycle that part alone.","confidence":"high","did_you_know":"Pizza boxes are the most commonly contaminated item found in UK cardboard recycling. The clean lid is always worth saving.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"general-waste":{"verdict":"general-waste","reason":"Grease bonds permanently with cardboard fibres and cannot be removed in the recycling process.","confidence":"high","did_you_know":"The clean top of a pizza box can still be recycled — tear the lid off and put that half in the recycling bin.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"disposable-coffee-cup","name":"Disposable coffee cup","synonyms":["takeaway cup","paper coffee cup","hot drink cup","café cup","paper cup","to-go cup"],"materials":["cardboard","polyethylene plastic liner"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Standard cups have a thin plastic lining fused to the paper that requires specialist equipment to separate. Most kerbside collection systems cannot handle them.","confidence":"high","did_you_know":"Many coffee chains have in-store cup-recycling collection points where specialist processors handle them. The cup is not for your kerbside bin.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"egg-carton-cardboard","name":"Egg carton (cardboard)","synonyms":["egg box","cardboard egg box","egg tray"],"materials":["moulded cardboard fibre"],"questions":[{"id":"q1","text":"Is the carton clean and dry (no raw egg residue, no cracks)?","hint":"A lightly soiled carton is borderline; if in doubt, compost it. A clean, dry carton can go in recycling.","yes":"recycle","no":"compost"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"Clean cardboard egg cartons are fully recyclable with cardboard and paper.","confidence":"high","did_you_know":"Egg cartons are made from low-grade recycled pulp — they close the recycling loop very efficiently.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"compost":{"verdict":"compost","reason":"A soiled egg carton composts readily with food waste — it is ideal 'brown' material for balancing a compost heap.","confidence":"high","did_you_know":"Cardboard egg cartons absorb moisture well, making them useful compost-bin material even when egg-stained.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"glass-bottle","name":"Glass bottle or jar","synonyms":["wine bottle","beer bottle","glass bottle","spirit bottle","jam jar","pickle jar","pasta sauce jar","honey jar","sauce bottle"],"materials":["glass"],"questions":[],"direct_verdict":"recycle","verdicts":{"recycle":{"verdict":"recycle","reason":"Rinse briefly and recycle. Glass is 100% recyclable, indefinitely, with no quality loss. Remove the lid and recycle it separately.","confidence":"high","did_you_know":"Every tonne of recycled glass saves 314 kg of CO₂ and 1.2 tonnes of raw materials. A glass bottle can be recycled and back on shelf in 30 days.","source":"British Glass (britglass.org.uk), accessed 2024"}}},{"id":"broken-glass","name":"Broken glass","synonyms":["smashed glass","broken bottle","shattered glass","glass shards","broken window"],"materials":["glass"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Broken glass is a safety hazard for sorting workers. Wrap it securely in several layers of newspaper or cardboard before placing in general waste.","confidence":"high","did_you_know":"Flat glass (windows, mirrors) has a different composition from bottle glass and is not accepted in bottle banks. Large pieces can go to a household recycling centre.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"pyrex-wine-glass","name":"Wine glass, Pyrex, or oven dish","synonyms":["wine glass","pyrex","oven dish","drinking glass","tumbler","casserole dish","baking dish","crystal glass","glass bowl"],"materials":["borosilicate glass","tempered glass","lead crystal"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Pyrex, wine glasses, and oven dishes are treated or borosilicate glass with a higher melting point than bottle glass. Even one piece mixed into a bottle-glass batch will cause the whole batch to crack during manufacture.","confidence":"high","did_you_know":"One Pyrex dish in a tonne of recycled bottle glass can ruin an entire batch. The two types are visually identical but physically incompatible.","source":"British Glass (britglass.org.uk), accessed 2024"}}},{"id":"aluminium-can","name":"Aluminium can","synonyms":["drinks can","soda can","beer can","fizzy drink can","coke can","lager can","energy drink can"],"materials":["aluminium"],"questions":[],"direct_verdict":"recycle","verdicts":{"recycle":{"verdict":"recycle","reason":"Give it a quick rinse. Aluminium is endlessly recyclable — recycling it uses 95% less energy than smelting new aluminium from bauxite ore.","confidence":"high","did_you_know":"A recycled aluminium can is back on a supermarket shelf within 60 days. The metal never degrades no matter how many times it is recycled.","source":"Alupro (alupro.org.uk), accessed 2024"}}},{"id":"steel-tin-can","name":"Steel food tin","synonyms":["food tin","baked beans can","soup can","tomato tin","tuna tin","tinned food","steel can"],"materials":["steel"],"questions":[],"direct_verdict":"recycle","verdicts":{"recycle":{"verdict":"recycle","reason":"Rinse and recycle. Steel cans are magnetic, making them easy to separate automatically at sorting facilities.","confidence":"high","did_you_know":"Steel is the most recycled material on the planet by volume. The UK recycles around 75% of its steel cans.","source":"Alupro (alupro.org.uk), accessed 2024"}}},{"id":"aerosol-can","name":"Aerosol can","synonyms":["spray can","deodorant","hairspray","spray paint","air freshener","shaving foam can"],"materials":["aluminium","steel"],"questions":[{"id":"q1","text":"Is the can completely empty — does nothing come out when you press the nozzle?","hint":"Even a small amount of pressurised gas remaining makes an aerosol potentially explosive at a sorting facility. When in doubt, class it as not empty.","yes":"recycle","no":"special-facility"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"Empty aerosol cans are recyclable metal. Do not crush or puncture them — just place as-is in your recycling bin.","confidence":"high","did_you_know":"Aerosol cans are made from the same aluminium or steel as food tins and drinks cans. The nozzle and cap are usually recyclable too.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"special-facility":{"verdict":"special-facility","reason":"A pressurised aerosol is a fire and explosion risk at sorting facilities. Take it to a household waste recycling centre (tip).","confidence":"high","did_you_know":"Most household recycling centres have a dedicated bay for pressurised containers. Never put a non-empty aerosol in any kerbside bin.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"kitchen-foil","name":"Kitchen foil","synonyms":["aluminium foil","tin foil","cooking foil","baking foil","foil wrap","foil tray"],"materials":["aluminium"],"questions":[{"id":"q1","text":"Is the foil clean, or can you wash off the residue quickly?","hint":"A light rinse is worth doing — clean foil has real recycling value. Heavily charred or greasy foil where residue cannot be removed should go in general waste.","yes":"recycle","no":"general-waste"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"Scrunch clean foil into a ball roughly the size of a golf ball before recycling. Loose small pieces can fall through sorting machinery.","confidence":"high","did_you_know":"Foil is pure aluminium — as recyclable as a drinks can. Scrunching prevents it blowing around the recycling truck and sorting plant.","source":"Alupro (alupro.org.uk), accessed 2024"},"general-waste":{"verdict":"general-waste","reason":"Food residue on foil contaminates the aluminium scrap stream and cannot be cleaned during the recycling process.","confidence":"high","did_you_know":"Even a quick rinse under the tap changes the classification — clean foil is high-value; soiled foil is landfill.","source":"Alupro (alupro.org.uk), accessed 2024"}}},{"id":"plastic-bottle","name":"Plastic bottle","synonyms":["water bottle","fizzy drink bottle","PET bottle","juice bottle","milk bottle","sports drink bottle"],"materials":["PET (plastic #1)","HDPE (plastic #2)"],"questions":[{"id":"q1","text":"Is the bottle empty and rinsed (or at least emptied)?","hint":"Liquid left in bottles can soak into cardboard and paper in the same collection, making those items unrecyclable.","yes":"recycle","no":"rinse-first"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"PET (#1) and HDPE (#2) bottles are among the most-recycled plastics. You can usually leave the cap on — check your local council's preference.","confidence":"high","did_you_know":"Around 25 recycled PET bottles provide enough polyester fibre to make a single fleece jacket.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"rinse-first":{"verdict":"recycle","reason":"Empty it, give it a quick rinse, then recycle. A brief swill is enough — you do not need to remove every trace of residue.","confidence":"high","did_you_know":"Full or half-full bottles add unnecessary weight to collection vehicles and can leak onto paper in the same bin, causing contamination.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"shampoo-bottle","name":"Shampoo or shower gel bottle","synonyms":["shampoo bottle","shower gel bottle","conditioner bottle","body wash","bathroom plastic"],"materials":["HDPE (plastic #2)","PET (plastic #1)"],"questions":[],"direct_verdict":"recycle","verdicts":{"recycle":{"verdict":"recycle","reason":"Empty shampoo and shower gel bottles are typically HDPE or PET — both widely recyclable. Give them a quick rinse before binning.","confidence":"high","did_you_know":"Bathroom plastics are the same recyclable types as kitchen bottles. The main barrier is people assuming they are not recyclable.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"plastic-bag","name":"Plastic carrier bag or film","synonyms":["carrier bag","shopping bag","bin liner","polythene bag","cling film","food bag","ziplock bag","freezer bag","bread bag"],"materials":["low-density polyethylene (LDPE)","soft plastic"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Soft plastics wrap around sorting machinery and cause costly shutdowns. They must not go in kerbside recycling. Many supermarkets have a dedicated soft-plastic drop-off point.","confidence":"high","did_you_know":"Most major UK supermarkets accept bags, cling film, bread bags, and other soft plastics at in-store collection points for specialist recycling.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"polystyrene-tray","name":"Polystyrene (EPS) tray or packaging","synonyms":["styrofoam","foam tray","meat tray","EPS","foam packaging","takeaway tray","polystyrene cup"],"materials":["expanded polystyrene (EPS)"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Expanded polystyrene is not accepted in any kerbside recycling. It is 95% air, has very low scrap value, and clogs sorting machinery.","confidence":"high","did_you_know":"Specialist EPS recycling points do exist (often at packaging or furniture retailers). Search 'EPS recycling near me' to find the closest one.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"black-plastic-tray","name":"Black plastic tray","synonyms":["black plastic container","ready meal tray","black food tray","microwave tray","dark plastic"],"materials":["black-dyed polypropylene or PET"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Black plastic contains carbon black pigment that absorbs the infra-red light used by optical sorting machines, making it undetectable. It passes through the system unsorted and ends up in landfill.","confidence":"high","did_you_know":"Some manufacturers now use detectable dark-green or brown pigments instead, but carbon black remains common. If in doubt: black plastic = general waste.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"crisp-packet","name":"Crisp packet or snack wrapper","synonyms":["chip bag","snack bag","crisp bag","foil pouch","snack wrapper","biscuit wrapper","sweet wrapper"],"materials":["multilayer metallised film (plastic + foil laminate)"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Crisp packets are layers of different materials bonded together that cannot be separated in standard recycling systems. No kerbside bin accepts them.","confidence":"high","did_you_know":"Some snack brands run take-back schemes (e.g. via TerraCycle). Check the brand's website for collection-point details.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"battery","name":"Battery","synonyms":["AA battery","AAA battery","9V battery","C battery","D battery","alkaline battery","lithium battery"],"materials":["mixed metals","cadmium","lead","lithium","zinc","manganese"],"questions":[],"direct_verdict":"special-facility","verdicts":{"special-facility":{"verdict":"special-facility","reason":"Batteries contain heavy metals and corrosive chemicals that contaminate soil and water. Almost all supermarkets and electronics retailers have a free drop-off point.","confidence":"high","did_you_know":"Lithium-ion batteries (from phones, laptops, tools) are a leading cause of fires at waste facilities. If a battery is swollen or leaking, contact your local council for safe disposal advice.","source":"Environment Agency (GOV.UK), gov.uk/guidance/batteries, accessed 2024"}}},{"id":"led-bulb","name":"LED or CFL light bulb","synonyms":["light bulb","energy saving bulb","CFL","fluorescent bulb","LED light","lightbulb","strip light"],"materials":["glass","metals","electronics","mercury (CFL only)"],"questions":[],"direct_verdict":"special-facility","verdicts":{"special-facility":{"verdict":"special-facility","reason":"LED and CFL bulbs contain electronic components; CFL bulbs also contain mercury. They require specialist recycling at a household recycling centre or retailer drop-off.","confidence":"high","did_you_know":"Old-style incandescent bulbs (now withdrawn from UK sale) are not recyclable and go in general waste. LED and CFL bulbs should always go to a specialist point.","source":"Environment Agency (GOV.UK), accessed 2024"}}},{"id":"electronics","name":"Small electrical or electronic item","synonyms":["phone","smartphone","tablet","laptop","charger","cable","headphones","e-waste","computer","keyboard","toaster","kettle","blender","hairdryer"],"materials":["mixed: plastics, metals, circuit boards, rare earth elements"],"questions":[],"direct_verdict":"special-facility","verdicts":{"special-facility":{"verdict":"special-facility","reason":"Electronic waste (WEEE) must go to a designated facility. Under UK law, any retailer selling electrical goods must accept old equivalents for recycling — no purchase required.","confidence":"high","did_you_know":"A tonne of mobile phones contains more gold than a tonne of gold ore. Recovering these materials through e-waste recycling is called urban mining.","source":"Environment Agency (GOV.UK) — Waste Electrical and Electronic Equipment (WEEE), accessed 2024"}}},{"id":"clothes","name":"Old clothes or textiles","synonyms":["clothing","t-shirt","jeans","shoes","fabric","textiles","towel","bedsheets","curtains","bags"],"materials":["textiles (cotton, polyester, wool, mixed)"],"questions":[{"id":"q1","text":"Are the items in reasonable condition — wearable, or at least usable as rags?","hint":"Torn, stained, or worn-out items still have value as industrial rags or insulation fibre. Most textile banks accept them regardless of condition.","yes":"donate","no":"textile-bank"}],"verdicts":{"donate":{"verdict":"special-facility","reason":"Donate to a charity shop, clothes exchange, or a friend. Good-condition items deserve a second life before entering any recycling stream.","confidence":"high","did_you_know":"Extending a garment's life by just 9 months reduces its carbon, water, and waste footprint by 20–30%.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"textile-bank":{"verdict":"special-facility","reason":"Put them in a textile bank. Worn-out clothes are shredded into industrial rags or insulation fibre — nothing goes to waste.","confidence":"high","did_you_know":"Most supermarket car parks have a textile bank alongside bottle banks and general recycling. Shoes, belts, and bags are usually accepted too.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"tetra-pak","name":"Tetra Pak or drinks carton","synonyms":["milk carton","juice carton","Tetra Pak","drink carton","long-life milk","carton","oat milk carton","soup carton"],"materials":["cardboard","aluminium foil layer","polyethylene layer"],"questions":[],"direct_verdict":"check-local","verdicts":{"check-local":{"verdict":"check-local","reason":"Cartons are made of cardboard, aluminium, and plastic fused together. Whether they are recyclable depends entirely on whether your local council has a specialist hydrapulper to separate these layers. Many councils do, but not all.","confidence":"moderate","did_you_know":"Tetra Pak cartons can be separated into usable wood fibre, aluminium, and polyethylene — but only with specialist equipment. Always check your local council's A–Z guide.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"toothpaste-tube","name":"Toothpaste tube","synonyms":["toothpaste","squeezable tube","tube packaging","paste tube"],"materials":["laminated plastic and aluminium"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Most toothpaste tubes are a laminate of plastic and aluminium that cannot be separated in standard recycling. Not accepted in kerbside bins.","confidence":"high","did_you_know":"Colgate operates a dedicated toothpaste tube recycling programme in the UK via TerraCycle. Check the Colgate website for the nearest drop-off point.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"wet-wipes","name":"Wet wipes","synonyms":["baby wipes","face wipes","makeup wipes","cleaning wipes","moist towelette","antibacterial wipe"],"materials":["non-woven polyester or polypropylene (plastic fibre)"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Wet wipes are made from plastic fibres. They must never be flushed — they are the primary cause of sewer blockages in the UK. Bin them in general waste.","confidence":"high","did_you_know":"Even wipes labelled 'flushable' do not break down in the sewer system. They are a major cause of fatbergs — solid masses that block urban sewers and cost millions to remove.","source":"Water UK (water.org.uk), accessed 2024"}}},{"id":"paper-towel","name":"Paper towel or kitchen roll","synonyms":["kitchen roll","paper towel","hand towel","kitchen tissue","paper napkin","tissue paper"],"materials":["short recycled paper fibre"],"questions":[{"id":"q1","text":"Has the paper towel been used (absorbed liquid, cleaned up food, or used with cleaning products)?","hint":"Used paper towels have fibres that are too short and contaminated to recycle again. The paper pulping process cannot clean them.","yes":"compost","no":"recycle"}],"verdicts":{"compost":{"verdict":"compost","reason":"Used paper towels are too contaminated to recycle, but they compost readily. Put them in your food waste caddy or home compost bin.","confidence":"high","did_you_know":"Paper towels used to mop up cooking oil or food can still go in food waste — fats and carbon both break down in composting.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"recycle":{"verdict":"recycle","reason":"Unused, dry paper towels are recyclable. In practice this is uncommon — most are used before disposal.","confidence":"high","did_you_know":"Kitchen roll is made from the shortest recycled paper fibres. After one use those fibres are too short to go around the recycling loop again.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"coffee-grounds","name":"Coffee grounds","synonyms":["ground coffee","used coffee","coffee dregs","filter coffee","espresso grounds","coffee pod contents"],"materials":["organic matter"],"questions":[],"direct_verdict":"compost","verdicts":{"compost":{"verdict":"compost","reason":"Coffee grounds are nitrogen-rich organic matter. Put them in your food waste caddy, compost heap, or worm bin. They also repel slugs in the garden.","confidence":"high","did_you_know":"Coffee grounds are mildly acidic and make excellent fertiliser for acid-loving plants such as blueberries, roses, and azaleas.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"food-scraps","name":"Food scraps or peelings","synonyms":["fruit peel","vegetable peel","banana skin","leftovers","eggshells","onion skin","food waste","cooked food","raw food"],"materials":["organic matter"],"questions":[],"direct_verdict":"compost","verdicts":{"compost":{"verdict":"compost","reason":"Food scraps go in your food waste caddy (council collection) or a home compost bin. Never put them in recycling or general waste if a food waste collection is available.","confidence":"high","did_you_know":"Food in landfill produces methane — a greenhouse gas around 80 times more potent than CO₂ over 20 years. Composting or anaerobic digestion avoids this almost entirely.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"thermal-receipt","name":"Thermal till receipt","synonyms":["receipt","till receipt","cash register receipt","shop receipt","printed receipt"],"materials":["thermal paper (BPA or BPS chemical coating)"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Most receipts are printed on thermal paper coated with BPA or BPS — hormone-disrupting chemicals that contaminate the paper pulp stream if mixed with recyclables.","confidence":"high","did_you_know":"You can identify thermal paper by scratching it with a fingernail — it leaves a dark grey mark. This coating makes it non-recyclable.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"bubble-wrap","name":"Bubble wrap","synonyms":["packing bubbles","air bubble packaging","packing material","foam wrap"],"materials":["low-density polyethylene (LDPE)","soft plastic"],"questions":[],"direct_verdict":"general-waste","verdicts":{"general-waste":{"verdict":"general-waste","reason":"Bubble wrap is a soft plastic. It wraps around sorting machinery and must not go in kerbside recycling. It can go in a supermarket soft-plastic collection.","confidence":"high","did_you_know":"Bubble wrap is the same LDPE material as carrier bags and can go in the same supermarket soft-plastic recycling collection point.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}},{"id":"medicine-packaging","name":"Medicine packaging or blister packs","synonyms":["blister pack","pill packaging","medicine box","tablet packaging","foil pill strip","prescription packaging"],"materials":["aluminium foil","PVC plastic","cardboard (outer box)"],"questions":[{"id":"q1","text":"Is it just the cardboard outer box (no foil blister strips inside)?","hint":"Cardboard medicine boxes are recyclable. The foil-and-plastic blister strips that hold the tablets are a different story.","yes":"recycle","no":"check-local"}],"verdicts":{"recycle":{"verdict":"recycle","reason":"Clean cardboard medicine boxes are fully recyclable with paper and card.","confidence":"high","did_you_know":"Remove any paper leaflets and recycle those too. The cardboard and leaflet can go in the same paper recycling bin.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"},"check-local":{"verdict":"check-local","reason":"Blister packs are a laminate of aluminium foil and PVC. Some pharmacies run take-back schemes; kerbside acceptance varies widely by council.","confidence":"moderate","did_you_know":"Some pharmacy chains partner with TerraCycle to accept blister packs in-store. Ask at your local pharmacy counter.","source":"WRAP (Waste & Resources Action Programme), wrap.ngo, accessed 2024"}}}]};


// ── Category mapping ────────────────────────────────────────────────
const CAT = {
  newspaper:'paper', 'glossy-magazine':'paper', 'cardboard-box':'paper',
  'pizza-box':'paper', 'egg-carton-cardboard':'paper', 'paper-towel':'paper',
  'thermal-receipt':'paper',
  'glass-bottle':'glass', 'broken-glass':'glass', 'pyrex-wine-glass':'glass',
  'aluminium-can':'metal', 'steel-tin-can':'metal', 'aerosol-can':'metal',
  'kitchen-foil':'metal', battery:'metal',
  'plastic-bottle':'plastic', 'shampoo-bottle':'plastic', 'plastic-bag':'plastic',
  'polystyrene-tray':'plastic', 'black-plastic-tray':'plastic', 'crisp-packet':'plastic',
  'bubble-wrap':'plastic', 'toothpaste-tube':'plastic',
  'coffee-grounds':'organic', 'food-scraps':'organic',
  'disposable-coffee-cup':'special', 'wet-wipes':'special', electronics:'special',
  'led-bulb':'special', clothes:'special', 'tetra-pak':'special',
  'medicine-packaging':'special',
};
const CAT_ICON = { paper:'📄', glass:'🫙', metal:'🥫', plastic:'🧴', organic:'🌿', special:'⚡' };
const V_ICON  = { recycle:'♻️', compost:'🌱', 'general-waste':'🗑️', 'special-facility':'🏭', 'check-local':'📍' };
const V_LABEL = { recycle:'Recycle', compost:'Compost', 'general-waste':'General waste', 'special-facility':'Special facility', 'check-local':'Check local rules' };

// CSS key for verdict (maps to --v-* vars)
function vKey(v){ return {recycle:'recycle',compost:'compost','general-waste':'waste','special-facility':'special','check-local':'local'}[v]||'waste'; }

// ── App state ────────────────────────────────────────────────────────
let items = [];
const state = { item:null, currentQ:null, qPath:[], verdictKey:null };
let activeFilter = 'all';

// ── Init ─────────────────────────────────────────────────────────────
function init() {
  items = ITEMS_DATA.items;
  renderHome();
  bindEvents();
  showScreen('home');
}

// ── Screen management ────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el('screen-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.target === name || (name !== 'history' && b.dataset.target === 'home'))
  );
  window.scrollTo(0,0);
}

// ── Home ─────────────────────────────────────────────────────────────
function renderHome() {
  const hist  = loadHistory();
  const streak = calcStreak(hist);
  const learned = new Set(hist.map(h => h.id)).size;
  const statsEl = el('stats-bar');

  if (learned > 0) {
    statsEl.innerHTML =
      `<span><strong>${learned}</strong> item${learned!==1?'s':''} learned</span>` +
      `<span class="stats-sep">·</span>` +
      `<span><strong>${streak}</strong> day streak</span>`;
  } else {
    statsEl.innerHTML = `<span style="color:var(--tx-3)">Sort an item to start your log</span>`;
  }

  // Nav badge
  const badge = el('log-count');
  badge.textContent = hist.length;
  badge.hidden = hist.length === 0;

  // Recent
  renderRecent(hist);
  renderDailyTip();
}

function renderRecent(hist) {
  const wrap = el('recent-items');
  if (!hist.length) { wrap.innerHTML = ''; return; }

  const seen = new Set();
  const recent = [];
  for (const h of [...hist].reverse()) {
    if (!seen.has(h.id)) { seen.add(h.id); recent.push(h); }
    if (recent.length >= 5) break;
  }

  wrap.innerHTML =
    `<div class="recent-label">Recently saved</div>` +
    `<div class="recent-list">` +
    recent.map(h =>
      `<div class="recent-item">
        <span class="recent-name">${esc(h.name)}</span>
        <span class="v-pill vc--${h.verdict}" style="color:var(--v-${vKey(h.verdict)})">
          ${V_ICON[h.verdict]||''} ${V_LABEL[h.verdict]||h.verdict}
        </span>
      </div>`
    ).join('') +
    `</div>`;
}

// ── Events ───────────────────────────────────────────────────────────
function bindEvents() {
  el('search-input').addEventListener('input', handleSearch);
  el('search-input').addEventListener('search', handleSearch);

  // Category filter chips
  document.querySelectorAll('.filter-chip').forEach(chip =>
    chip.addEventListener('click', () => {
      activeFilter = chip.dataset.cat;
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      handleSearch();
    })
  );

  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      if (btn.dataset.target === 'history') { renderHistory(); showScreen('history'); }
      else { renderHome(); showScreen('home'); }
    })
  );
  el('logo-link').addEventListener('click', e => { e.preventDefault(); renderHome(); showScreen('home'); });

  // Tree
  el('back-to-home').addEventListener('click', () => { renderHome(); showScreen('home'); });
  el('btn-yes').addEventListener('click', () => answer('yes'));
  el('btn-no').addEventListener('click',  () => answer('no'));

  // Verdict
  el('back-from-verdict').addEventListener('click', backFromVerdict);
  el('btn-save').addEventListener('click', saveLesson);
  el('btn-share').addEventListener('click', shareVerdict);
  el('btn-search-again').addEventListener('click', () => { renderHome(); showScreen('home'); });

  // History
  el('btn-print').addEventListener('click', printSheet);
  el('btn-clear').addEventListener('click', clearHistory);

  // Surprise Me
  el('btn-surprise').addEventListener('click', surpriseMe);

  // Keyboard: / to focus search, Esc to clear
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== el('search-input')) {
      e.preventDefault();
      renderHome(); showScreen('home');
      setTimeout(() => el('search-input').focus(), 40);
    }
    if (e.key === 'Escape') { el('search-input').value = ''; handleSearch(); }
  });
}

// ── Search ────────────────────────────────────────────────────────────
function handleSearch() {
  const q = el('search-input').value.trim().toLowerCase();
  const container = el('search-results');
  const noRes = el('no-results');

  let pool = items;
  if (activeFilter !== 'all') pool = items.filter(i => CAT[i.id] === activeFilter);
  const filtered = q ? pool.filter(i => fuzzyMatch(q, i)) : (activeFilter !== 'all' ? pool : []);

  if (!q && activeFilter === 'all') { container.innerHTML = ''; noRes.hidden = true; el('result-count').innerHTML=''; return; }
  if (filtered.length === 0) { container.innerHTML = ''; noRes.hidden = false; el('result-count').innerHTML=''; return; }

  noRes.hidden = true;
  el('result-count').innerHTML = `<strong>${filtered.length}</strong> result${filtered.length!==1?'s':''}${activeFilter!=='all'?' in '+activeFilter:''}`;
  container.innerHTML = filtered.slice(0, 8).map((item, idx) => {
    const hint    = item.direct_verdict || null;
    const vcClass = hint ? `vc--${hint}` : 'vc--mixed';
    const hintTxt = hint ? (V_LABEL[hint]||hint) : 'Depends →';
    const icon    = CAT_ICON[CAT[item.id]] || '📦';
    return `
      <div class="result-card ${vcClass}" role="option" tabindex="0"
           data-id="${item.id}" style="animation-delay:${idx*0.048}s"
           aria-label="${esc(item.name)}, ${hintTxt}">
        <span class="rc-icon" aria-hidden="true">${icon}</span>
        <div class="rc-body">
          <div class="rc-name">${esc(item.name)}</div>
          <div class="rc-mats">${item.materials.join(' · ')}</div>
        </div>
        <span class="rc-hint">${hintTxt}</span>
      </div>`;
  }).join('');

  container.querySelectorAll('.result-card').forEach(card => {
    const activate = () => startItem(card.dataset.id);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') activate(); });
  });
}

function fuzzyMatch(q, item) {
  return [item.name, ...item.synonyms, ...item.materials].join(' ').toLowerCase().includes(q);
}

// ── Decision tree ─────────────────────────────────────────────────────
function startItem(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  state.item = item; state.qPath = [];

  if (item.direct_verdict) {
    state.verdictKey = item.direct_verdict;
    showVerdict(item.direct_verdict);
    return;
  }
  state.currentQ = item.questions[0].id;
  renderTree();
  showScreen('tree');
}

function renderTree() {
  const item = state.item;
  el('item-name').textContent = item.name;
  el('material-chips').innerHTML = item.materials.map(m => `<span class="chip">${esc(m)}</span>`).join('');
  showQuestion(state.currentQ);
}

function showQuestion(qid) {
  const q = state.item.questions.find(q => q.id === qid);
  if (!q) return;
  const qIdx = state.item.questions.findIndex(q => q.id === qid);
  el('q-number').textContent = `Question ${state.qPath.length + 1} of ${state.item.questions.length}`;
  el('question-text').textContent = q.text;
  el('question-hint').textContent = q.hint;
  el('tree-progress').innerHTML = state.item.questions.map((_,i) => {
    const cls = i < state.qPath.length ? 'dot done' : i === qIdx ? 'dot active' : 'dot';
    return `<span class="${cls}"></span>`;
  }).join('');
  state.currentQ = qid;
}

function answer(choice) {
  const q = state.item.questions.find(q => q.id === state.currentQ);
  if (!q) return;
  const nextKey = q[choice];
  state.qPath.push(state.currentQ);
  const nextQ = state.item.questions.find(q => q.id === nextKey);
  if (nextQ) { showQuestion(nextKey); }
  else { state.verdictKey = nextKey; showVerdict(nextKey); }
}

function backFromVerdict() {
  if (state.qPath.length > 0) {
    const prev = state.qPath.pop();
    state.currentQ = prev;
    showQuestion(prev);
    showScreen('tree');
  } else {
    renderHome(); showScreen('home');
  }
}

// ── Verdict ───────────────────────────────────────────────────────────
function showVerdict(key) {
  const verdict = state.item.verdicts[key];
  if (!verdict) return;
  const v = verdict.verdict;
  const ck = vKey(v);

  // Banner background tints
  const bgMap  = { recycle:'rgba(51,232,106,0.13)', compost:'rgba(255,181,42,0.13)', 'general-waste':'rgba(142,168,154,0.09)', 'special-facility':'rgba(127,170,255,0.13)', 'check-local':'rgba(255,120,120,0.13)' };
  const glowMap= { recycle:'rgba(51,232,106,0.28)',  compost:'rgba(255,181,42,0.28)',  'general-waste':'rgba(142,168,154,0.14)', 'special-facility':'rgba(127,170,255,0.28)',  'check-local':'rgba(255,120,120,0.28)'  };

  const banner = el('verdict-banner');
  banner.style.background = bgMap[v] || 'var(--surf-2)';

  const glow = el('verdict-glow');
  glow.style.background = `radial-gradient(circle, ${glowMap[v]||'transparent'} 0%, transparent 70%)`;

  const labelEl = el('verdict-label');
  labelEl.textContent = V_LABEL[v] || v;
  labelEl.style.color = `var(--v-${ck})`;

  el('verdict-banner-icon').textContent = V_ICON[v] || '❓';
  el('verdict-item-name').textContent   = state.item.name;
  el('verdict-reason').textContent      = verdict.reason;
  el('did-you-know').textContent        = verdict.did_you_know;
  el('verdict-source').textContent      = verdict.source;
  el('saved-msg').textContent = '';

  const saveBtn = el('btn-save');
  saveBtn.disabled = false;
  saveBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1v7M5 6l2.5 2 2.5-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 11v1.5a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> Save to log`;

  // Confidence ring
  const ringWrap = el('conf-ring-wrap');
  ringWrap.innerHTML = buildConfRing(verdict.confidence);

  showScreen('verdict');
  renderRelatedItems(state.item);
}

// ── Daily tip (rotates by day of year) ───────────────────────────────
function renderDailyTip() {
  const tipEl = el('daily-tip');
  if (!items.length) { tipEl.hidden = true; return; }
  const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  const pool = items.filter(i => {
    const v = Object.values(i.verdicts)[0];
    return v && v.did_you_know;
  });
  const item = pool[doy % pool.length];
  const fact = Object.values(item.verdicts)[0].did_you_know;
  tipEl.hidden = false;
  tipEl.innerHTML =
    `<span class="daily-tip-icon">💡</span>
     <div>
       <div class="daily-tip-label">Today's fact</div>
       <div class="daily-tip-text">${esc(fact)}</div>
       <div class="daily-tip-item">— ${esc(item.name)}</div>
     </div>`;
}

// ── Related items on verdict ──────────────────────────────────────────
function renderRelatedItems(currentItem) {
  const wrap = el('related-items');
  const currentCat = CAT[currentItem.id];
  const related = items
    .filter(i => i.id !== currentItem.id && CAT[i.id] === currentCat)
    .slice(0, 4);

  if (!related.length) { wrap.hidden = true; return; }
  wrap.hidden = false;
  wrap.innerHTML =
    `<div class="related-label">Related items to check</div>` +
    `<div class="related-list">` +
    related.map(i => {
      const hint = i.direct_verdict;
      const color = hint ? `var(--v-${vKey(hint)})` : 'var(--tx-2)';
      return `<button class="related-chip" data-id="${i.id}" style="--rc:${color}">
                <span style="color:${color}">${CAT_ICON[CAT[i.id]]||'📦'}</span>
                ${esc(i.name)}
              </button>`;
    }).join('') +
    `</div>`;
  wrap.querySelectorAll('.related-chip').forEach(btn =>
    btn.addEventListener('click', () => startItem(btn.dataset.id))
  );
}

function buildConfRing(conf) {
  const pct  = { high:100, moderate:68, ambiguous:38 }[conf] || 70;
  const r=25, sw=3.5, sz=62, cx=31, cy=31;
  const circ = +(2*Math.PI*r).toFixed(1);
  const dash = +(pct/100*circ).toFixed(1);
  const gap  = +(circ-dash).toFixed(1);
  const lbl  = { high:'High', moderate:'Good', ambiguous:'Verify' }[conf] || '';
  return `
    <svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" style="display:block">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--surf-3)" stroke-width="${sw}"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--acc)" stroke-width="${sw}"
        stroke-dasharray="0 ${circ}" stroke-linecap="round"
        style="transform-origin:center;transform:rotate(-90deg);
               animation:ring-fill 1s 0.25s cubic-bezier(0.4,0,0.2,1) forwards"
        data-dash="${dash}" data-gap="${gap}"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none">
      <span style="font-size:0.63rem;font-weight:700;color:var(--tx-1);line-height:1">${pct}%</span>
      <span style="font-size:0.52rem;color:var(--tx-3);text-transform:uppercase;letter-spacing:0.04em">${lbl}</span>
    </div>`;
}

// Animate ring after render (can't use CSS keyframes with data attrs easily)
document.addEventListener('animationstart', e => {
  if (e.animationName === 'ring-fill') {
    const circle = e.target;
    const dash = circle.dataset.dash, gap = circle.dataset.gap;
    if (dash) circle.style.strokeDasharray = `${dash} ${gap}`;
  }
}, true);

// ── Save & Share ──────────────────────────────────────────────────────
function saveLesson() {
  const verdict = state.item.verdicts[state.verdictKey];
  if (!verdict) return;
  const hist  = loadHistory();
  const today = todayStr();
  if (hist.some(h => h.id === state.item.id && h.date === today)) {
    el('saved-msg').textContent = '✓ Already saved today'; return;
  }
  hist.push({ id:state.item.id, name:state.item.name, verdict:verdict.verdict, date:today });
  localStorage.setItem('sortit_history', JSON.stringify(hist));

  const saveBtn = el('btn-save');
  saveBtn.disabled = true;
  saveBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5l4 4 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Saved`;
  el('saved-msg').textContent = '✓ Added to your log';

  const badge = el('log-count');
  badge.textContent = hist.length; badge.hidden = false;
}

function shareVerdict() {
  const verdict = state.item.verdicts[state.verdictKey];
  if (!verdict) return;
  const text = `${state.item.name} → ${V_LABEL[verdict.verdict] || verdict.verdict}. "${verdict.reason}" — Sort It`;
  const msgEl = el('saved-msg');

  if (navigator.share) {
    navigator.share({ text }).catch(()=>{});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      msgEl.textContent = '📋 Copied to clipboard!';
      setTimeout(()=>{ if(msgEl.textContent.includes('Copied')) msgEl.textContent=''; }, 3000);
    }).catch(()=>{ msgEl.textContent = 'Could not copy — try selecting the text manually.'; });
  }
}

// ── Surprise Me ────────────────────────────────────────────────────────
function surpriseMe() {
  const pool = activeFilter === 'all' ? items : items.filter(i => CAT[i.id] === activeFilter);
  if (!pool.length) return;
  startItem(pool[Math.floor(Math.random() * pool.length)].id);
}

// ── History ────────────────────────────────────────────────────────────
function renderHistory() {
  const hist  = loadHistory();
  const list  = el('history-list');
  const empty = el('history-empty');

  if (!hist.length) { list.innerHTML = ''; empty.hidden = false; el('history-stats').innerHTML = ''; return; }
  empty.hidden = true;
  renderHistoryStats(hist);

  const groups = {};
  for (const h of [...hist].reverse()) (groups[h.date] = groups[h.date]||[]).push(h);

  list.innerHTML = Object.entries(groups).map(([date, entries]) =>
    `<div class="history-date-group">
       <div class="history-date">${fmtDate(date)}</div>
       ${entries.map(h =>
         `<div class="history-entry">
            <span class="history-entry-name">${esc(h.name)}</span>
            <span class="v-pill vc--${h.verdict}" style="color:var(--v-${vKey(h.verdict)})">
              ${V_ICON[h.verdict]||''} ${V_LABEL[h.verdict]||h.verdict}
            </span>
          </div>`
       ).join('')}
     </div>`
  ).join('');
}

function renderHistoryStats(hist) {
  const counts = {};
  for (const h of hist) counts[h.verdict] = (counts[h.verdict]||0)+1;
  const order = ['recycle','compost','general-waste','special-facility','check-local'];
  el('history-stats').innerHTML = order
    .filter(v => counts[v])
    .map(v =>
      `<div class="hstat vc--${v}" style="--v-col:var(--v-${vKey(v)})">
         <div class="hstat-num">${counts[v]}</div>
         <div class="hstat-label">${V_ICON[v]} ${V_LABEL[v]}</div>
       </div>`
    ).join('');
}

function clearHistory() {
  if (!confirm('Clear your entire recycling log?')) return;
  localStorage.removeItem('sortit_history');
  renderHistory();
  el('log-count').hidden = true;
}

function printSheet() {
  const hist  = loadHistory();
  const sheet = el('print-sheet');
  const buckets = {};
  const seen  = new Set();
  for (const h of hist) {
    if (seen.has(h.id)) continue; seen.add(h.id);
    (buckets[h.verdict] = buckets[h.verdict]||[]).push(h.name);
  }
  const order = ['recycle','compost','general-waste','special-facility','check-local'];
  sheet.innerHTML =
    `<div class="ps-title">Sort It — My Recycling Cheat Sheet</div>
     <div class="ps-sub">Printed ${new Date().toLocaleDateString()}</div>
     <div class="ps-grid">` +
    order.filter(v=>buckets[v]).map(v =>
      `<div class="ps-item">
         <div class="ps-item-verdict">${V_LABEL[v]}</div>
         ${buckets[v].map(n=>`<div class="ps-item-name">${n}</div>`).join('')}
       </div>`
    ).join('') +
    `</div>`;
  window.print();
}

// ── Helpers ────────────────────────────────────────────────────────────
function loadHistory() {
  try { return JSON.parse(localStorage.getItem('sortit_history')||'[]'); } catch { return []; }
}
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function prevDay(s) {
  const d = new Date(s+'T12:00:00'); d.setDate(d.getDate()-1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function fmtDate(s) {
  return new Date(s+'T12:00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
}
function calcStreak(hist) {
  if (!hist.length) return 0;
  const dates = [...new Set(hist.map(h=>h.date))].sort().reverse();
  const today = todayStr();
  if (dates[0]!==today && dates[0]!==prevDay(today)) return 0;
  let s=1;
  for (let i=1;i<dates.length;i++) { if(dates[i]===prevDay(dates[i-1])) s++; else break; }
  return s;
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function el(id) { return document.getElementById(id); }

document.addEventListener('DOMContentLoaded', init);
