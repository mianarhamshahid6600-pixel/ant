export const CATEGORIES = [
  {
    id: 'switches-sockets',
    name: 'Switches & Sockets',
    subtitle: 'Art, 6M, Glass & Designer Luxury Series',
    icon: 'ToggleRight',
    count: 24,
    badge: 'Popular',
    description: 'Durable, heat-resistant switches and luxury glass switchboards designed for modern homes and offices.',
    image: '/images/products/art-black.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png'
  },
  {
    id: 'dimmers-regulators',
    name: 'Dimmers & Regulators',
    subtitle: 'Smooth Rotary & Touch Controls',
    icon: 'Sliders',
    count: 8,
    badge: 'Silent Operation',
    description: 'Silent, smooth dimmers and fan speed controllers that let you easily set the perfect room mood.',
    image: '/images/products/lg-series.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/LG.png'
  },
  {
    id: 'smd-downlights',
    name: 'SMD Panels & Downlights',
    subtitle: 'Slim Ceiling Lights & Spotlights',
    icon: 'SunMedium',
    count: 16,
    badge: 'Bright & Clear',
    description: 'Super bright, energy-efficient ceiling lights with 3-in-1 color switching and soft, eye-friendly light.',
    image: '/images/products/smd.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/SMD-2-scaled.jpg'
  },
  {
    id: 'led-bulbs',
    name: 'LED Bulbs & Energy Savers',
    subtitle: 'Standard E27, Pin B22 & High-Power T-Bulbs',
    icon: 'Lightbulb',
    count: 12,
    badge: '85% Energy Saving',
    description: 'Long-lasting LED bulbs that give instant bright light while cutting down your electricity bills.',
    image: '/images/products/bulb.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/LED-BULB-scaled.jpg'
  },
  {
    id: 'fans',
    name: 'Inverter BLDC Fans',
    subtitle: 'Low Electricity (30W) & Classic Fans',
    icon: 'Fan',
    count: 10,
    badge: 'Low Power',
    description: 'Quiet, pure copper ceiling fans that run on just 30 Watts, work longer on UPS, and come with a remote.',
    image: '/images/products/mm-series.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/MM.png'
  },
  {
    id: 'breakers-db',
    name: 'Circuit Breakers & DB Boxes',
    subtitle: 'Single & Double Pole Breakers, Distribution Boxes',
    icon: 'ShieldCheck',
    count: 14,
    badge: 'Tested Safe',
    description: 'Reliable circuit breakers and strong distribution boxes to protect your home wiring from short circuits.',
    image: '/images/products/breaker.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/BREAKER-scaled.jpg'
  },
  {
    id: 'flood-lights',
    name: 'Outdoor Flood Lights',
    subtitle: '50W to 200W Waterproof Lights',
    icon: 'Zap',
    count: 6,
    badge: 'Waterproof IP66',
    description: 'Heavy-duty outdoor lights built to handle rain, dust, and heat. Great for building fronts, gates, and grounds.',
    image: '/images/products/flood-light.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/Flood-light-scaled.jpg'
  }
];

export const PRODUCTS = [
  // Switches & Sockets - Art Series
  {
    id: 'art-black-1',
    name: 'Art Series - Matte Black 1-Gang Switch',
    category: 'switches-sockets',
    series: 'Art Luxury Series',
    price: 680,
    contractorPrice: 520,
    originalPrice: 780,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    image: '/images/products/art-black.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png',
    description: 'Sleek matte black finish that does not catch fingerprints. Built with pure copper terminals and fire-proof material for maximum safety.',
    specs: {
      'Working Voltage': '220V - 250V AC',
      'Current Capacity': '10A / 16A',
      'Material': 'Fire-proof Matte Polycarbonate',
      'Internal Contacts': 'Silver-Nickel Alloy for zero sparks',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Smooth, quiet click', 'Slim modern design', 'Fire-resistant body', 'Easy to install']
  },
  {
    id: 'art-white-1',
    name: 'Art Series - Pure White 2-Gang Switch',
    category: 'switches-sockets',
    series: 'Art Luxury Series',
    price: 740,
    contractorPrice: 580,
    originalPrice: 850,
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewsCount: 98,
    badge: 'Top Rated',
    image: '/images/products/art-white.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-WHITE.png',
    description: 'Clean, glossy white switch that stays white and never turns yellow over the years. Fits all standard wall boxes.',
    specs: {
      'Working Voltage': '220V - 250V AC',
      'Current Capacity': '10A',
      'Material': 'UV-Resistant Virgin Polymer',
      'Internal Contacts': 'Silver-Coated Copper',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Stays white over time', 'Soft push button', 'Standard screw holes', 'Tested for 40,000+ clicks']
  },
  {
    id: 'art-grey-1',
    name: 'Art Series - Space Grey Universal Socket',
    category: 'switches-sockets',
    series: 'Art Luxury Series',
    price: 890,
    contractorPrice: 710,
    originalPrice: 990,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 115,
    badge: 'Contractor Choice',
    image: '/images/products/art-grey.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-gray-web.png',
    description: 'Universal wall socket that fits all 2-pin and 3-pin plugs (Pakistani, UK, US, EU) with built-in child safety shutters.',
    specs: {
      'Working Voltage': '220V - 250V AC',
      'Current Capacity': '13A / 16A Universal',
      'Child Safety': 'Built-in safety shutters prevent accidental shocks',
      'Material': 'Brushed Grey Polycarbonate',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Fits all international plugs', 'Safe for children', 'Firm plug grip', 'Ground/Earth pin included']
  },
  {
    id: 'art-brown-1',
    name: 'Art Series - Walnut Brown 4-Gang Board',
    category: 'switches-sockets',
    series: 'Art Luxury Series',
    price: 1150,
    contractorPrice: 920,
    originalPrice: 1300,
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewsCount: 64,
    badge: 'Luxury Finish',
    image: '/images/products/art-brown.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BROWN.png',
    description: 'Rich dark walnut finish that blends beautifully with wooden doors, wooden wall paneling, and warm home interiors.',
    specs: {
      'Working Voltage': '220V - 250V AC',
      'Current Capacity': '10A per switch',
      'Material': 'Wood-tone Polycarbonate',
      'Size': 'Standard 2-module plate (86mm x 146mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Warm wood appearance', '4 separate switches', 'Strong metal backplate', 'Scratch resistant']
  },

  // 6M Series
  {
    id: '6m-black-1',
    name: '6M Series - Carbon Black 6-Module Plate',
    category: 'switches-sockets',
    series: '6M Architectural Series',
    price: 1450,
    contractorPrice: 1180,
    originalPrice: 1650,
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 88,
    badge: 'Exclusive',
    image: '/images/products/6m-black.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/6m-BLACK.png',
    description: 'Wide switch plate with elegant gold border trim. Lets you combine up to 6 switches, sockets, and dimmers on one board.',
    specs: {
      'Working Voltage': '220V - 250V AC',
      'Slots': '6 Modules (Mix & Match switches, sockets, dimmers)',
      'Finish': 'Matte Carbon with Rose Gold Border',
      'Size': '200mm x 86mm',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Mix and match your buttons', 'Elegant metallic border', 'Heavy-duty steel frame', 'Loved by architects']
  },
  {
    id: '6m-gray-1',
    name: '6M Series - Metallic Grey 6-Module Plate',
    category: 'switches-sockets',
    series: '6M Architectural Series',
    price: 1450,
    contractorPrice: 1180,
    originalPrice: 1650,
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewsCount: 52,
    badge: 'Modern Look',
    image: '/images/products/6m-gray.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/6m-GRAY.png',
    description: 'Modern metallic grey finish that matches contemporary bedroom, drawing room, and office interiors.',
    specs: {
      'Working Voltage': '220V - 250V AC',
      'Slots': '6 Modules Grid',
      'Finish': 'Brushed Metallic Grey',
      'Size': '200mm x 86mm',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['No fingerprint marks', 'Customizable layout', 'Concealed screw finish', 'Durable steel chassis']
  },

  // LG Series Luxury Glass
  {
    id: 'lg-series-1',
    name: 'LG Series - Toughened Glass Luxury Switchboard',
    category: 'switches-sockets',
    series: 'LG Crystal Series Glass',
    price: 1850,
    contractorPrice: 1490,
    originalPrice: 2100,
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 168,
    badge: 'Ultra Luxury',
    image: '/images/products/lg-series.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/LG.png',
    description: 'Premium 4mm real tempered glass face with polished beveled edges and chrome buttons. Water-resistant and easy to wipe clean.',
    specs: {
      'Glass Type': '4mm Toughened Safety Glass',
      'Edge': 'Diamond-polished curved bevel',
      'Current Capacity': '16A / 10A',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Real tempered glass surface', 'Water and stain resistant', 'Never fades or turns dull', 'Chrome push buttons']
  },

  // Rock Series
  {
    id: 'rock-gold-1',
    name: 'Rock Series - Brushed Champagne Gold Switch',
    category: 'switches-sockets',
    series: 'Rock Designer Series',
    price: 980,
    contractorPrice: 790,
    originalPrice: 1120,
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewsCount: 76,
    badge: 'Gold Edition',
    image: '/images/products/rock-gold.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ROCK-Gold.png',
    description: 'Fine brushed champagne gold finish for a rich, royal look in master bedrooms and formal drawing rooms.',
    specs: {
      'Finish': 'Brushed Metallic Champagne Gold',
      'Current Capacity': '10A / 16A',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Brushed gold texture', 'Tarnish-free surface', 'Heavy brass screws', 'Solid click feel']
  },
  {
    id: 'rock-grey-1',
    name: 'Rock Series - Textured Gunmetal Switch',
    category: 'switches-sockets',
    series: 'Rock Designer Series',
    price: 980,
    contractorPrice: 790,
    originalPrice: 1120,
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewsCount: 43,
    badge: 'Textured',
    image: '/images/products/rock-grey.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ROCK-G.png',
    description: 'Durable stone-textured gunmetal switch that resists everyday scratches. Ideal for high-traffic corridors and hallways.',
    specs: {
      'Finish': 'Textured Gunmetal Polymer',
      'Current Capacity': '10A',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Scratch-resistant texture', 'Solid brass contacts', 'Fire-proof body']
  },
  {
    id: 'ms-pearl-1',
    name: 'MS Series - Glossy Pearl White Switch',
    category: 'switches-sockets',
    series: 'MS Classic Series',
    price: 620,
    contractorPrice: 480,
    originalPrice: 720,
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewsCount: 59,
    badge: 'Great Value',
    image: '/images/products/ms-pearl.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/MS-PEARL.png',
    description: 'Shiny pearl white switch offering great durability and clean looks at an affordable wholesale price.',
    specs: {
      'Finish': 'Glossy Pearl Polymer',
      'Current Capacity': '10A',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Shiny glossy finish', 'Smooth push action', 'Budget friendly']
  },
  {
    id: 's1-series-1',
    name: 'S1 Series - Dual USB + Type-C Fast Charger Socket',
    category: 'switches-sockets',
    series: 'S1 Smart Series',
    price: 1350,
    contractorPrice: 1080,
    originalPrice: 1550,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 110,
    badge: 'Fast Charge',
    image: '/images/products/s1-series.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/S1.png',
    description: 'Charge your phones and tablets directly from the wall. Includes a 20W Fast Type-C port, USB port, and a power socket.',
    specs: {
      'Input Voltage': '100V - 250V AC',
      'Type-C Port': '20W Fast Charging (PD Support)',
      'USB Port': '18W Quick Charge (QC 3.0)',
      'Socket Capacity': '13A Universal Socket',
      'Safety': 'Auto-cutoff against over-charging and short-circuit',
      'Warranty': '3 Years Electronics / 10 Years Mechanical'
    },
    features: ['Charge phones without adapter', 'Fast 20W Type-C port', 'Built-in safety chip', 'Fits standard wall box']
  },

  // Dimmers & Regulators
  {
    id: 'dimmer-rotary-1',
    name: 'Silent Rotary Dimmer & Fan Controller (500W)',
    category: 'dimmers-regulators',
    series: 'Pro Control Line',
    price: 920,
    contractorPrice: 740,
    originalPrice: 1080,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Zero Hum',
    image: '/images/products/art-black.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png',
    description: 'Smooth rotary dimmer knob with absolutely zero buzzing or humming noise. Works smoothly with dimmable LED lights and ceiling fans.',
    specs: {
      'Max Power': '500 Watts',
      'Voltage': '220V AC',
      'Dimming Range': 'Smooth 1% to 100%',
      'Works With': 'Dimmable LEDs, SMD Lights, Ceiling Fans',
      'Warranty': '5 Years Warranty'
    },
    features: ['Zero buzzing noise', 'Soft light start', 'Heat protection built-in', 'Matches Art & 6M plates']
  },
  {
    id: 'dimmer-touch-glass',
    name: 'Smart Touch Glass Dimmer & Fan Switch',
    category: 'dimmers-regulators',
    series: 'LG Crystal Series Glass',
    price: 2450,
    contractorPrice: 1950,
    originalPrice: 2800,
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 93,
    badge: 'Touch Glass',
    image: '/images/products/lg-series.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/LG.png',
    description: 'Touch-sensitive glass panel with glowing blue light indicator. Slide your finger to adjust fan speed or dim room lights.',
    specs: {
      'Control Style': 'Touch-sensitive glass slider',
      'Night Light': 'Soft blue LED glow indicator',
      'Power Capacity': '600W Light / 150W Fan',
      'Size': 'Standard 3x3 inches (86mm x 86mm)',
      'Warranty': '3 Years Warranty'
    },
    features: ['Easy to see in dark', 'Remembers last brightness setting', 'Real scratch-proof glass', 'Silent electronic touch']
  },

  // SMD Downlights & Panel Lights
  {
    id: 'smd-slim-12w',
    name: 'Ultra-Slim SMD Downlight 12W (3 Colors in 1)',
    category: 'smd-downlights',
    series: 'OptiGlow Series',
    price: 540,
    contractorPrice: 420,
    originalPrice: 650,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 230,
    badge: '3-in-1 Colors',
    image: '/images/products/smd.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/SMD-2-scaled.jpg',
    description: 'Slim ceiling light that lets you switch between 3 light colors (Warm Golden, Natural Day, Cool White) by toggling your wall switch.',
    specs: {
      'Wattage': '12 Watts',
      'Brightness': '1200 Lumens (Very Bright)',
      'Light Colors': '3000K Warm / 4000K Natural / 6500K White (Selectable)',
      'Ceiling Cutout': '4.5 inches (115mm)',
      'Light Spread': '120° Wide angle',
      'Driver': 'Built-in voltage protector driver',
      'Warranty': '2 Years Replacement Guarantee'
    },
    features: ['3 light colors in single light', 'True natural color rendering', 'Super slim 12mm thickness', 'Eye-friendly flicker-free']
  },
  {
    id: 'smd-slim-18w',
    name: 'High-Brightness SMD Panel Light 18W',
    category: 'smd-downlights',
    series: 'OptiGlow Series',
    price: 780,
    contractorPrice: 610,
    originalPrice: 920,
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewsCount: 165,
    badge: 'Extra Bright',
    image: '/images/products/smd.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/SMD-2-scaled.jpg',
    description: 'Powerful ceiling light for living rooms, drawing rooms, and shops. Heavy aluminum back keeps the light cool for years.',
    specs: {
      'Wattage': '18 Watts',
      'Brightness': '1850 Lumens',
      'Ceiling Cutout': '6 inches (155mm)',
      'Body': 'Die-cast aluminum heat sink',
      'Warranty': '2 Years Replacement'
    },
    features: ['Stays cool under long hours', 'Even light with no dark spots', 'Surge protected']
  },
  {
    id: 'smd-cob-7w',
    name: 'Anti-Glare COB Spotlight 7W (Rotates 360°)',
    category: 'smd-downlights',
    series: 'Architectural Spotlight',
    price: 680,
    contractorPrice: 530,
    originalPrice: 800,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 92,
    badge: 'Accent Focus',
    image: '/images/products/smd.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/SMD-2-scaled.jpg',
    description: 'Deep-set spotlight that focuses light directly on wall art, feature walls, and decorative niches without glaring into your eyes.',
    specs: {
      'Wattage': '7 Watts',
      'Focus Angle': '24° / 36° Tight Spotlight',
      'Adjustment': '30° Tilt & 360° Full Rotation',
      'Ceiling Cutout': '2.5 inches (68mm)',
      'Warranty': '2 Years Replacement'
    },
    features: ['Deep anti-glare design', 'Adjustable aim in any direction', 'High-quality LED chip']
  },

  // LED Bulbs & Eco Lamps
  {
    id: 'bulb-18w',
    name: 'High-Output LED Bulb 18W (Screw & Pin Base)',
    category: 'led-bulbs',
    series: 'EcoPower Series',
    price: 360,
    contractorPrice: 280,
    originalPrice: 450,
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Super Saver',
    image: '/images/products/bulb.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/LED-BULB-scaled.jpg',
    description: 'Bright 18W LED bulb that gives the light of a 150W old bulb while saving 85% electricity. Available in E27 Screw and B22 Pin.',
    specs: {
      'Wattage': '18 Watts',
      'Base': 'E27 Screw or B22 Pin available',
      'Brightness': '1800 Lumens',
      'Lifespan': '25,000 Hours (Approx. 10 years)',
      'Color': 'Cool White Daylight (6500K) / Warm Light (3000K)',
      'Warranty': '1 Year Replacement'
    },
    features: ['85% electricity bill savings', 'Instant bright light', 'Vibration proof', 'Wide 220° light spread']
  },
  {
    id: 'bulb-t-bulb-30w',
    name: 'T-Bulb High-Power Commercial Lamp 30W',
    category: 'led-bulbs',
    series: 'EcoPower Series',
    price: 680,
    contractorPrice: 530,
    originalPrice: 820,
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewsCount: 148,
    badge: 'Heavy Light',
    image: '/images/products/bulb.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/LED-BULB-scaled.jpg',
    description: 'Wide cylinder T-bulb that casts extra broad light across large rooms, shops, kitchens, and commercial halls.',
    specs: {
      'Wattage': '30 Watts',
      'Brightness': '3100 Lumens',
      'Base': 'E27 Screw / B22 Pin',
      'Voltage': '160V - 260V Surge Proof',
      'Warranty': '1 Year Replacement'
    },
    features: ['Wide area coverage', 'Extra bright lumen output', 'Built-in cooling fins']
  },

  // Fans
  {
    id: 'fan-bldc-inverter',
    name: 'Inverter BLDC 30W Energy Saver Ceiling Fan 56"',
    category: 'fans',
    series: 'AeroInverter Series',
    price: 9800,
    contractorPrice: 8400,
    originalPrice: 11500,
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 195,
    badge: '30W Inverter',
    image: '/images/products/mm-series.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/MM.png',
    description: 'Super energy-efficient BLDC fan that uses only 30 Watts at full speed. Runs 3 times longer on UPS or solar battery and comes with wireless remote.',
    specs: {
      'Motor': '100% Pure Copper BLDC Inverter Motor',
      'Electricity Usage': 'Only 30W (Speed 5) / 6W (Speed 1)',
      'Blade Size': '56 Inches (1400mm) High-Air Aluminum Blades',
      'Air Flow': 'Heavy Air Delivery (280 m³/min)',
      'Remote': 'Wireless 6-Speed Remote with Sleep Timer',
      'UPS/Solar Friendly': 'Silent on UPS and inverters, no humming',
      'Warranty': '3 Years Motor & Circuit Warranty'
    },
    features: ['Saves up to 65% on fan electricity bill', 'Completely silent motor', 'Runs 3x longer on UPS/Battery', 'Remote control works through walls']
  },
  {
    id: 'fan-royal-deluxe',
    name: 'Royal Designer Ceiling Fan 56" (Antique Gold)',
    category: 'fans',
    series: 'Royal Designer Series',
    price: 8500,
    contractorPrice: 7200,
    originalPrice: 9900,
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewsCount: 87,
    badge: 'Royal Design',
    image: '/images/products/art-brown.png',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BROWN.png',
    description: 'Decorative ceiling fan with antique gold carvings, wooden tone blades, and heavy pure copper motor for powerful airflow.',
    specs: {
      'Electricity Usage': '70 Watts',
      'Motor Winding': '99.99% Pure Copper',
      'Blade Size': '56 Inches',
      'Color': 'Antique Brushed Gold & Walnut Wood',
      'Warranty': '3 Years Full Warranty'
    },
    features: ['Royal antique design', 'Heavy gauge aluminum blades', 'Double ball bearings for smooth spin']
  },

  // Circuit Breakers & Distribution Boxes
  {
    id: 'breaker-mcb-single',
    name: 'Single Pole Circuit Breaker (MCB 6A to 63A)',
    category: 'breakers-db',
    series: 'SafeGuard Safety Series',
    price: 320,
    contractorPrice: 240,
    originalPrice: 400,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 180,
    badge: 'Certified Safe',
    image: '/images/products/breaker.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/BREAKER-scaled.jpg',
    description: 'Fast-tripping miniature circuit breaker that protects your home appliances and wiring from overloads and short circuits.',
    specs: {
      'Safety Standard': 'IEC/EN 60898-1 Certified',
      'Amperage Ratings': '6A, 10A, 16A, 20A, 32A, 40A, 63A (C-Curve)',
      'Short Circuit Capacity': '6,000 Amperes (6kA)',
      'Type': '1 Pole (Single Phase)',
      'Mounting': 'Standard DIN Rail mount',
      'Warranty': '5 Years Replacement Warranty'
    },
    features: ['Quick trip on short-circuit', 'Clear ON/OFF indicator window', 'Fire-resistant casing', 'Heavy copper contacts']
  },
  {
    id: 'breaker-db-acrylic-12',
    name: 'Smoked Glass Concealed DB Box (12 to 16 Breakers)',
    category: 'breakers-db',
    series: 'SafeGuard Safety Series',
    price: 2400,
    contractorPrice: 1950,
    originalPrice: 2850,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 104,
    badge: 'Heavy Gauge',
    image: '/images/products/breaker.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/BREAKER-scaled.jpg',
    description: 'Heavy steel distribution box with a stylish smoked acrylic door and pure copper neutral and earthing busbars included.',
    specs: {
      'Capacity': 'Holds 12 to 16 Breakers',
      'Box Body': '1.2mm Thick Galvanized Steel with Powder Coating',
      'Door': 'Smoked Tinted Acrylic with magnetic latch',
      'Busbars': 'Pure Copper Earth & Neutral Bars included inside',
      'Size': '320mm x 220mm x 95mm',
      'Warranty': '10 Years Replacement Warranty'
    },
    features: ['Pure copper earth & neutral bars included', 'See breakers through smoked door', 'Plenty of room for neat wiring', 'Sturdy steel build']
  },

  // Flood Lights
  {
    id: 'flood-light-100w',
    name: 'Heavy-Duty LED Flood Light 100W (Waterproof IP66)',
    category: 'flood-lights',
    series: 'LuminaPro Series',
    price: 2850,
    contractorPrice: 2250,
    originalPrice: 3400,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Waterproof IP66',
    image: '/images/products/flood-light.jpg',
    fallbackImage: 'https://primelighting.net/wp-content/uploads/2024/09/Flood-light-scaled.jpg',
    description: 'Heavy outdoor light with strong aluminum body, toughened glass, and lightning surge protection. Built for heavy rain and heat.',
    specs: {
      'Wattage': '100 Watts',
      'Brightness': '10,500 Lumens (Ultra Bright)',
      'Waterproof': 'IP66 Heavy Rain & Dust Proof',
      'Surge Protection': '4,000V Lightning Surge Protection',
      'Color': 'Cool White Daylight (6500K)',
      'Body': 'Die-cast aluminum with cooling fins',
      'Warranty': '2 Years Full Replacement Warranty'
    },
    features: ['180° adjustable steel bracket', 'Lightning and surge protected', 'Rust-proof powder coat', 'Rain and storm proof']
  }
];

export const DISTRIBUTOR_INFO = {
  shopName: 'Alnoor Traders',
  parentBrand: 'Alnoor Lighting & Electricals',
  tagline: 'Wholesale Electrical Switches & Modern Lighting Products',
  phone1: '03146600174',
  phone2: '03246600174',
  whatsappNumber: '923146600174',
  whatsappDisplay: '+92 314 6600174',
  phoneDisplay2: '+92 324 6600174',
  email: 'info@alnoortraders.pk',
  address: 'Bawana Bazar, Bhora Gali St#2, Faisalabad',
  city: 'Faisalabad',
  googleMapsUrl: 'https://www.google.com/maps/place/PRIME+LIGHTS/@31.4188934,73.0566153,14z/data=!4m10!1m3!11m2!2sesQzUjvAR9Em6PX0CDzqhZEp_K4zdg!3e1!3m5!1s0x392243670b16cd61:0xaf9277275354a08d!8m2!3d31.4188934!4d73.0772147!16s%2Fg%2F11jp1v3kw9?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D',
  timings: '10:00 AM – 8:00 PM (Saturday to Thursday, Closed on Friday)',
  timingsShort: '10:00 AM – 8:00 PM (Closed Friday)',
  authorizedBadge: 'Certified Electrical Store Certificate #ANT-2024-901',
  keyStats: [
    { label: 'Original Products', value: '100% Genuine' },
    { label: 'Years in Electricals', value: '15+ Years' },
    { label: 'Contractors & Builders', value: '1,200+' },
    { label: 'Warranty Support', value: 'Up to 10 Yrs' }
  ]
};

export const DEFAULT_CATALOG_SERIES = [
  {
    id: 'art-series',
    title: 'Art Luxury Switch Series',
    subtitle: 'Modern Matte Finish Switches & Universal Sockets',
    cover: '/images/products/art-black.png',
    fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/ART-BLACK.png',
    specs: [
      { label: 'Voltage & Power', value: '220V - 250V AC, 50/60Hz' },
      { label: 'Button Lifespan', value: 'Tested for 40,000+ Clicks' },
      { label: 'Internal Terminals', value: 'Pure Copper with Silver-Nickel Arc Protection' },
      { label: 'Fire Safety', value: 'Flame-Retardant Polycarbonate (Will not catch fire)' },
      { label: 'Standard Size', value: 'Standard 3x3 inches (86mm x 86mm)' }
    ],
    finishes: ['Matte Black', 'Pure White', 'Space Grey', 'Walnut Brown']
  },
  {
    id: '6m-series',
    title: '6M Architectural Grid Series',
    subtitle: 'Wide Switchboards with Rose Gold Trim Border',
    cover: '/images/products/6m-black.png',
    fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/6m-BLACK.png',
    specs: [
      { label: 'Capacity', value: 'Up to 6 Switches / Sockets / Dimmers on one plate' },
      { label: 'Plate Dimensions', value: '200mm Wide x 86mm Height' },
      { label: 'Frame Structure', value: 'Reinforced Steel Backframe' },
      { label: 'Surface Finish', value: 'Anti-Fingerprint Coating with Gold Accent' },
      { label: 'Wall Box Size', value: 'Standard 6M Wall Box' }
    ],
    finishes: ['Carbon Matte Black', 'Slate Metallic Grey']
  },
  {
    id: 'lg-glass',
    title: 'LG Real Glass Series',
    subtitle: '4mm Diamond-Cut Tempered Glass Switchboards',
    cover: '/images/products/lg-series.png',
    fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/LG.png',
    specs: [
      { label: 'Glass Material', value: '4.0mm Real Toughened Safety Glass' },
      { label: 'Edge Profile', value: 'Diamond-polished curved bevel edges' },
      { label: 'Water Resistance', value: 'Water and stain resistant surface' },
      { label: 'Keys / Buttons', value: 'Chrome-Plated Precision Micro Switches' },
      { label: 'Durability', value: 'Never turns yellow or fades' }
    ],
    finishes: ['Crystal Black Glass', 'Crystal White Glass']
  },
  {
    id: 'smd-lighting',
    title: 'OptiGlow Slim SMD Ceiling Lights',
    subtitle: '3-in-1 Color Switching Panels with Built-in Surge Protectors',
    cover: '/images/products/smd.jpg',
    fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/SMD-2-scaled.jpg',
    specs: [
      { label: 'Available Sizes', value: '7W, 12W, 18W, 24W' },
      { label: '3-in-1 Colors', value: 'Warm Golden, Natural Day, Cool Daylight' },
      { label: 'Brightness', value: '100+ Lumens per Watt (Super Bright)' },
      { label: 'Eye Comfort', value: 'Flicker-Free Anti-Glare Lens' },
      { label: 'Voltage Protection', value: 'Surge protected against voltage fluctuations' }
    ],
    finishes: ['Round Slim Ceiling Light', 'Square Slim Ceiling Light', 'Surface Downlight']
  },
  {
    id: 'bldc-fans',
    title: 'AeroInverter BLDC Ceiling Fans',
    subtitle: 'Super Low-Power 30W Inverter Motor with Wireless Remote',
    cover: '/images/products/mm-series.png',
    fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/MM.png',
    specs: [
      { label: 'Motor Type', value: '100% Pure Copper BLDC Inverter Motor' },
      { label: 'Electricity Usage', value: 'Only 30W (Full Speed) vs 80W Standard Fan' },
      { label: 'Blade Size', value: '56 Inches (1400mm) Aerodynamic Aluminum' },
      { label: 'Remote Control', value: '6-Speed Remote with Timer & Reverse Airflow' },
      { label: 'UPS & Solar Friendly', value: 'Runs 3x longer on UPS/Battery without humming' }
    ],
    finishes: ['Matte Black', 'Arctic White', 'Royal Gold & Wood']
  },
  {
    id: 'circuit-breakers',
    title: 'SafeGuard Breakers & DB Boxes',
    subtitle: 'Certified Miniature Circuit Breakers & Acrylic Distribution Boxes',
    cover: '/images/products/breaker.jpg',
    fallbackCover: 'https://primelighting.net/wp-content/uploads/2024/09/BREAKER-scaled.jpg',
    specs: [
      { label: 'Safety Standard', value: 'IEC/EN 60898-1 Certified' },
      { label: 'Short-Circuit Capacity', value: '6,000 Amperes (6kA)' },
      { label: 'Available Sizes', value: '6A, 10A, 16A, 20A, 32A, 63A (Single & Double Pole)' },
      { label: 'Trip Type', value: 'Fast C-Curve Overload Protection' },
      { label: 'DB Box Material', value: 'Thick Galvanized Steel with Smoked Acrylic Door' }
    ],
    finishes: ['Concealed Wall DB Box', 'Surface DB Box (4 to 24 Breakers)']
  }
];

export const DEFAULT_SITE_CONTENT = {
  hero: {
    title: 'Welcome to Alnoor Traders',
    highlight: 'Luxury Switches & Modern Lighting',
    description: 'Supplying genuine electrical switches, tempered glass switchboards, energy-saving LED lights, low-power fans, and safety circuit breakers across Faisalabad and Pakistan at fair wholesale prices.',
    primaryBtnText: 'Shop All Products',
    secondaryBtnText: 'View Catalog'
  },
  about: {
    heading: 'Premier Wholesale Store for Electrical & Modern Lighting',
    description: 'Alnoor Traders has been serving residential builders, industrial contractors, and retail shopkeepers from our central store in Bawana Bazar, Faisalabad.',
    history: 'Founded on integrity, certified product quality, and honest wholesale pricing, Alnoor Traders is the authorized distributor for leading electrical brands.',
    experienceYears: '15+',
    contractorsCount: '1,200+',
    productsCount: '500+'
  }
};

export const DEFAULT_TICKER_SETTINGS = {
  enabled: true,
  phone1: '03146600174',
  phone2: '03246600174',
  deliveryText: 'Free Delivery over Faisalabad',
  whatsappText: 'WhatsApp Order',
  customNotice: '',
  speed: 24
};

export const DEFAULT_PROMOTIONS = {
  enabled: false,
  badge: 'Special Wholesale Offer',
  title: '⚡ Mega Builder & Contractor Discount Week!',
  subtitle: 'Exclusive discounts on bulk switchboard packages, SMD ceiling panels, and safe breakers across Faisalabad.',
  discountPercent: 15,
  btnText: 'Claim Offer on WhatsApp',
  highlightText: 'Free Delivery all over Faisalabad on orders over Rs. 10,000'
};
