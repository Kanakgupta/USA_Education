const course = {
  4: {
    summary: 'Two volumes, eight chapters, and a path built for Grade 4.',
    chapters: [
      ['Place Value & Addition', ['Place value', 'Rounding', 'Add & subtract'], 'Use a place-value chart to see what every digit is worth. When rounding, look at the digit immediately to the right of the place you are rounding to.', 'grid'],
      ['Whole-Number Multiplication', ['Arrays', 'Area models', 'Multi-digit products'], 'An array makes equal groups visible. Split a number into tens and ones, multiply each part, then put the pieces back together.', 'dots'],
      ['Whole-Number Division', ['Equal groups', 'Long division', 'Remainders'], 'Division shares an amount into equal groups. A remainder is what is left after sharing as equally as possible.', 'lines'],
      ['Equations & Word Problems', ['Multi-step plans', 'Variables', 'Factors'], 'A variable is a letter standing in for an unknown number. Use an inverse operation to uncover the missing value.', 'grid'],
      ['Measurement', ['Unit conversions', 'Time and volume', 'Area & perimeter'], 'A conversion changes the unit name but not the amount. Area fills a shape; perimeter travels around its edge.', 'lines'],
      ['Fraction Concepts', ['Equivalent fractions', 'Adding fractions', 'Subtracting fractions'], 'Equivalent fractions name the same amount. When denominators match, the fraction pieces are the same size.', 'fraction'],
      ['Fractions & Decimals', ['Fraction groups', 'Tenths & hundredths', 'Compare decimals'], 'Decimals are another way to show parts of one whole. The first place right of the decimal is tenths; the second is hundredths.', 'fraction'],
      ['Geometry', ['Lines', 'Angles', 'Symmetry'], 'Geometry describes shapes and space. Angles measure turns; a symmetry line creates matching mirror-image halves.', 'lines']
    ]
  },
  5: {
    summary: 'Two volumes, eight chapters, and a path built for Grade 5.',
    chapters: [
      ['Multiplication & Division Problems', ['Equal groups', 'Expressions', 'Factors'], 'Use multiplication for equal groups and comparisons. Parentheses tell you which part to solve first.', 'dots'],
      ['Perimeter & Area', ['Perimeter', 'Area', 'Area models'], 'Perimeter is distance around a shape. Area is the number of square units covering the inside.', 'lines'],
      ['Addition & Subtraction', ['Whole numbers', 'Decimals', 'Place value'], 'Line up digits by their place values. With decimals, the decimal points must line up.', 'grid'],
      ['Angles & Polygons', ['Angles', 'Straight lines', 'Polygons'], 'An angle measures a turn. Polygons are closed shapes made from straight line segments.', 'lines'],
      ['Fraction Addition & Subtraction', ['Equivalent fractions', 'Addition', 'Subtraction'], 'Before adding unlike fractions, rewrite them with equal-size pieces using a common denominator.', 'fraction'],
      ['Volume & Measurement', ['Volume', 'Conversions', 'Layers'], 'Volume is the number of cubic units inside a solid. A rectangular prism has equal layers of cubes.', 'grid'],
      ['Integers & Coordinates', ['Integers', 'Absolute value', 'Coordinate plane'], 'Integers include positive numbers, negative numbers, and zero. Ordered pairs move across, then up or down.', 'lines'],
      ['Advanced Operations', ['Fraction multiplication', 'Long division', 'Decimal operations'], 'Multiply fractions by whole numbers as repeated groups. Check division with multiplication and the remainder.', 'fraction']
    ]
  }
};

const readingCourse = {
  4: {
    chapters: [
      ['Science Inventions', ReadingStories.collections.inventions, ReadingStories.themes.inventions.description],
      ['Great Presidents and People', ReadingStories.collections.presidents, ReadingStories.themes.presidents.description],
      ['Great Business Builders', ReadingStories.collections.business, ReadingStories.themes.business.description],
      ['Historical Events', ReadingStories.collections.history, ReadingStories.themes.history.description]
    ]
  },
  5: {
    chapters: [
      ['World-Changing Inventions', ReadingStories.grade5Collections.inventions, ReadingStories.grade5Themes.inventions.description],
      ['Presidents and American Change', ReadingStories.grade5Collections.presidents, ReadingStories.grade5Themes.presidents.description],
      ['American History in Motion', ReadingStories.grade5Collections.history, ReadingStories.grade5Themes.history.description],
      ['Business Ideas That Changed Daily Life', ReadingStories.grade5Collections.business, ReadingStories.grade5Themes.business.description]
    ]
  }
};

const socialCourse = Object.fromEntries(Object.entries(SocialStudiesCourses).map(([grade, chapters]) => [grade, {
  chapters: chapters.map(chapter => [chapter.title, ['Chapter lesson'], chapter.overview, chapter.facts])
}]));

const readingVisualThemes = Object.freeze({
  'Science Inventions': { label: 'Invent and discover', tags: 'invention,science' },
  'World-Changing Inventions': { label: 'Invent and discover', tags: 'invention,science' },
  'Great Presidents and People': { label: 'People who changed things', tags: 'leader,portrait' },
  'Presidents and American Change': { label: 'Leaders and change', tags: 'leader,america' },
  'Great Business Builders': { label: 'Ideas at work', tags: 'business,store' },
  'Business Ideas That Changed Daily Life': { label: 'Ideas at work', tags: 'business,innovation' },
  'Historical Events': { label: 'A moment in history', tags: 'history,america' },
  'American History in Motion': { label: 'A moment in history', tags: 'history,america' }
});
function visualKey(value) {
  let hash = 2166136261;
  for (const character of value) { hash ^= character.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return hash >>> 0;
}
function readingFallbackImage(topic, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500"><rect width="900" height="500" fill="#0d8b83"/><circle cx="105" cy="92" r="145" fill="#ffd45b"/><circle cx="795" cy="422" r="195" fill="#83c9ef"/><path d="M260 330h380" stroke="#fffefa" stroke-width="12" stroke-linecap="round"/><path d="M345 250l105-95 105 95" fill="none" stroke="#fffefa" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><text x="450" y="310" text-anchor="middle" font-family="Georgia,serif" font-size="42" font-weight="700" fill="#fffefa">${topic}</text><text x="450" y="375" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#173042">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
const inventionArticles = Object.freeze({
  'Wheel': 'Wheel', 'Plow': 'Plough', 'Sailboat': 'Sailboat', 'Compass': 'Compass', 'Paper': 'Paper', 'Printing Press': 'Printing press', 'Mechanical Clock': 'Clock', 'Microscope': 'Microscope', 'Telescope': 'Telescope', 'Steam Engine': 'Steam engine', 'Cotton Gin': 'Cotton gin', 'Battery': 'Electric battery', 'Locomotive': 'Locomotive', 'Telegraph': 'Electrical telegraph', 'Telephone': 'Telephone', 'Light Bulb': 'Incandescent light bulb', 'Camera': 'Camera', 'Radio': 'Radio', 'Airplane': 'Airplane', 'Refrigerator': 'Refrigerator', 'Safety Elevator': 'Elevator', 'Sewing Machine': 'Sewing machine', 'Bicycle': 'Bicycle', 'Zipper': 'Zipper', 'Dishwasher': 'Dishwasher', 'Washing Machine': 'Washing machine', 'Anesthesia': 'Anesthesia', 'Vaccination': 'Vaccination', 'Vaccination Idea': 'Vaccination', 'Penicillin': 'Penicillin', 'Insulin': 'Insulin', 'Transistor': 'Transistor', 'Microchip': 'Integrated circuit', 'Personal Computer': 'Personal computer', 'Internet': 'Internet', 'GPS': 'Global Positioning System', 'Satellite': 'Satellite', 'Laser': 'Laser', 'MRI Scanning': 'Magnetic resonance imaging', 'Pacemaker': 'Artificial cardiac pacemaker', 'Solar Panels': 'Solar panel', 'Wind Turbines': 'Wind turbine', 'Barcode': 'Barcode', '3D Printer': '3D printing', 'Smartphone': 'Smartphone', 'Cloud Computing': 'Cloud computing', 'Robotic Surgery': 'Robot-assisted surgery', 'CRISPR Gene Editing': 'CRISPR', 'Lithium-Ion Batteries': 'Lithium-ion battery', 'Artificial Intelligence': 'Artificial intelligence', 'Modern mRNA Medicines': 'MRNA vaccine', 'Traffic Light': 'Traffic light', 'Computer Mouse': 'Computer mouse', 'Braille': 'Braille'
});
const historyArticles = Object.freeze({
  'Declaration of Independence': 'Flag of the United States', 'U.S. Constitution': 'White House', 'Constitution': 'White House', 'Bill of Rights': 'United States Bill of Rights', 'Louisiana Purchase': 'Louisiana Purchase', 'War of 1812': 'War of 1812', 'Trail of Tears': 'Trail of Tears', 'Texas Joins the United States': 'Texas annexation', 'Oregon Trail': 'Oregon Trail', 'California Gold Rush': 'California gold rush', 'Compromise of 1850': 'Compromise of 1850', 'Civil War Begins': 'American Civil War', 'Emancipation Proclamation': 'Emancipation Proclamation', 'Gettysburg Address': 'Gettysburg Address', 'Reconstruction': 'Reconstruction era', 'Transcontinental Railroad': 'First transcontinental railroad', 'Gilded Age': 'Gilded Age', 'Statue of Liberty': 'Statue of Liberty', 'Statue of Liberty Dedication': 'Statue of Liberty', 'National Park Idea': 'Yellowstone National Park', 'National Park System': 'National Park Service', 'Spanish-American War': 'Spanish–American War', 'Progressive Era': 'Progressive Era', 'Women Win the Vote': 'Nineteenth Amendment to the United States Constitution', 'Great Migration': 'Great Migration (African American)', 'Harlem Renaissance': 'Harlem Renaissance', 'Great Depression': 'Great Depression', 'New Deal': 'New Deal', 'Pearl Harbor': 'Attack on Pearl Harbor', 'GI Bill': 'G.I. Bill', 'Korean War': 'Korean War', 'Brown v. Board of Education': 'Brown v. Board of Education', 'Montgomery Bus Boycott': 'Montgomery bus boycott', 'Civil Rights Act': 'Civil Rights Act of 1964', 'Voting Rights Act': 'Voting Rights Act of 1965', 'Apollo 11 Mission': 'Apollo 11', 'Apollo 11 Moon Landing': 'Apollo 11', 'First Earth Day': 'Earth Day', 'Watergate': 'Watergate scandal', 'Fall of the Berlin Wall': 'Berlin Wall', 'Americans with Disabilities Act': 'Americans with Disabilities Act of 1990', 'Internet Age': 'Internet', 'September 11, 2001': 'September 11 attacks', 'Hurricane Katrina': 'Hurricane Katrina', 'California Statehood': 'California', 'Oregon Statehood': 'Oregon', 'Alaska Statehood': 'Alaska', 'Hawaii Statehood': 'Hawaii', 'Homestead Act': 'Homestead Acts', 'Interstate Highway System': 'Interstate Highway System', 'Immigration Act of 1965': 'Immigration and Nationality Act of 1965', 'Clean Air Act': 'Clean Air Act (United States)', 'Americans with Disabilities Movement': 'Disability rights movement'
});
const companyArticles = Object.freeze({
  'Microsoft': 'Microsoft', 'Apple': 'Apple Inc.', 'Google': 'Google', 'Amazon': 'Amazon (company)', 'Uber': 'Uber', 'Costco': 'Costco', "Trader Joe's": "Trader Joe's", "McDonald's": "McDonald's", 'Walmart': 'Walmart', 'Target': 'Target Corporation', 'Starbucks': 'Starbucks', 'Netflix': 'Netflix', 'Tesla': 'Tesla, Inc.', 'Intel': 'Intel', 'IBM': 'IBM', 'Oracle': 'Oracle Corporation', 'Adobe': 'Adobe Inc.', 'Salesforce': 'Salesforce', 'NVIDIA': 'Nvidia', 'PayPal': 'PayPal', 'Visa': 'Visa Inc.', 'Mastercard': 'Mastercard', 'JPMorgan Chase': 'JPMorgan Chase', 'Bank of America': 'Bank of America', 'Goldman Sachs': 'Goldman Sachs', 'Fidelity': 'Fidelity Investments', 'Charles Schwab': 'Charles Schwab Corporation', 'Shopify': 'Shopify', 'eBay': 'EBay', 'Airbnb': 'Airbnb', 'Spotify': 'Spotify', 'Disney': 'The Walt Disney Company', 'Nike': 'Nike, Inc.', 'Coca-Cola': 'The Coca-Cola Company', 'PepsiCo': 'PepsiCo', 'Home Depot': 'The Home Depot', "Lowe's": "Lowe's", 'IKEA': 'IKEA', 'LEGO': 'Lego', 'FedEx': 'FedEx', 'UPS': 'United Parcel Service', 'Southwest Airlines': 'Southwest Airlines', 'Delta Air Lines': 'Delta Air Lines', 'Toyota': 'Toyota', 'Ford': 'Ford Motor Company', 'Johnson & Johnson': 'Johnson & Johnson', 'Procter & Gamble': 'Procter & Gamble', 'Whole Foods Market': 'Whole Foods Market', 'Khan Academy': 'Khan Academy', 'Wikipedia': 'Wikipedia'
});
function readingKind(chapterTitle) {
  if (chapterTitle === 'Business Ideas That Changed Daily Life') return 'company';
  if (chapterTitle === 'Great Business Builders') return 'generic';
  if (/Invention/.test(chapterTitle)) return 'invention';
  if (/Presidents|People/.test(chapterTitle)) return 'person';
  if (/History|Historical/.test(chapterTitle)) return 'history';
  return 'generic';
}
function readingArticleFor(kind, topic) {
  if (kind === 'invention') return inventionArticles[topic] || topic;
  if (kind === 'history') return historyArticles[topic] || topic;
  if (kind === 'company') return companyArticles[topic] || topic;
  if (kind === 'person') return topic;
  return '';
}
function readingVisualFor(story, chapterTitle) {
  const collection = readingVisualThemes[chapterTitle];
  const topic = story.title.split(':')[0].replace(/^The\s+/i, '').trim();
  const key = visualKey(`${chapterTitle}:${story.title}`);
  const kind = readingKind(chapterTitle);
  const article = readingArticleFor(kind, topic);
  return { label: collection.label, topic, caption: story.title, key, kind, article, fallback: readingFallbackImage(topic, collection.label) };
}
function readingVisualMarkup(story, chapterTitle, compact = false) {
  const visual = readingVisualFor(story, chapterTitle);
  scheduleReadingImageHydration();
  const image = `<img class="reading-topic-image" src="${visual.fallback}" data-image-kind="${visual.kind}" data-image-article="${visual.article}" data-image-key="${visual.key}" data-image-status="fallback" alt="Illustration for ${visual.caption}">`;
  return compact ? `<span class="story-thumbnail">${image}<b>${visual.label}</b></span>` : `<figure class="reading-hero-image ${visual.kind === 'company' ? 'logo-frame' : ''}">${image}<figcaption><span>${visual.label}</span><strong>${visual.caption}</strong></figcaption></figure>`;
}
const readingImageQueue = [];
let activeReadingImageLoads = 0;
let readingImageHydrationPending = false;
let readingImageGeneration = 0;
const usedReadingSources = new Set();
function loadImageElement(src) {
  return new Promise(resolve => { const probe = new Image(); const timer = setTimeout(() => resolve(false), 8000); probe.onload = () => { clearTimeout(timer); resolve(probe.naturalWidth > 0); }; probe.onerror = () => { clearTimeout(timer); resolve(false); }; probe.src = src; });
}
async function wikipediaArticleImage(article) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article.replace(/\s+/g, '_'))}?redirect=true`);
    if (!response.ok) return null;
    const page = await response.json();
    if (page.type !== 'standard') return null;
    return page.originalimage?.source || page.thumbnail?.source || null;
  } catch { return null; }
}
async function companyLogoImage(article) {
  try {
    const props = await (await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles=${encodeURIComponent(article)}&format=json&redirects=1&origin=*`)).json();
    const pages = props.query.pages;
    const qid = pages[Object.keys(pages)[0]]?.pageprops?.wikibase_item;
    if (!qid) return null;
    const entity = await (await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`)).json();
    const file = entity.entities[qid]?.claims?.P154?.[0]?.mainsnak?.datavalue?.value;
    if (!file) return null;
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=640`;
  } catch { return null; }
}
async function resolveReadingImage(image) {
  const kind = image.dataset.imageKind, article = image.dataset.imageArticle;
  const featured = !!image.closest('.reading-hero-image');
  if (kind === 'company') return featured ? { src: await companyLogoImage(article), logo: true } : { src: null, logo: false };
  if (article) return { src: await wikipediaArticleImage(article), logo: false };
  return { src: null, logo: false };
}
function pumpReadingQueue(generation) {
  if (generation !== readingImageGeneration) return;
  while (activeReadingImageLoads < 3 && readingImageQueue.length) {
    const image = readingImageQueue.shift();
    if (!image.isConnected || image.dataset.remoteRequested) continue;
    image.dataset.remoteRequested = 'true';
    activeReadingImageLoads++;
    resolveReadingImage(image).then(async ({ src, logo }) => {
      if (generation === readingImageGeneration && src && !usedReadingSources.has(src) && await loadImageElement(src) && !usedReadingSources.has(src) && image.isConnected) {
        usedReadingSources.add(src);
        image.src = src;
        image.dataset.imageStatus = 'loaded';
        if (logo) image.classList.add('is-logo');
      }
    }).finally(() => { activeReadingImageLoads--; pumpReadingQueue(generation); });
  }
}
function queueReadingImage(image, generation) { if (!image.dataset.remoteRequested) { readingImageQueue.push(image); pumpReadingQueue(generation); } }
function collectReadingImages() { return [...document.querySelectorAll('.reading-topic-image')].filter(image => image.dataset.imageArticle || image.dataset.imageKind === 'company'); }
function resetReadingHydration() { const generation = ++readingImageGeneration; usedReadingSources.clear(); readingImageQueue.length = 0; return generation; }
function hydrateReadingImages() {
  const images = collectReadingImages();
  const generation = resetReadingHydration();
  if (!images.length) return;
  images.filter(image => image.closest('.reading-hero-image')).forEach(image => queueReadingImage(image, generation));
  const thumbnails = images.filter(image => !image.closest('.reading-hero-image'));
  if (!thumbnails.length || !('IntersectionObserver' in window)) { thumbnails.forEach(image => queueReadingImage(image, generation)); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { queueReadingImage(entry.target, generation); observer.unobserve(entry.target); } }), { rootMargin: '320px 0px' });
  thumbnails.forEach(image => observer.observe(image));
}
function forceReadingImageLoad() { setTimeout(() => { const generation = resetReadingHydration(); collectReadingImages().forEach(image => queueReadingImage(image, generation)); }, 0); }
function scheduleReadingImageHydration() {
  if (readingImageHydrationPending) return;
  readingImageHydrationPending = true;
  queueMicrotask(() => { readingImageHydrationPending = false; hydrateReadingImages(); });
}

const LEVEL_NAMES = ['Easy', 'Medium', 'Hard', 'Expert'];
function levelForIndex(index) { return LEVEL_NAMES[Math.min(3, Math.floor(index / 5))]; }
const placeValueQuestions = [
  ['In 582,641, what is the value of the 8?', '80,000', '8,000', '800,000', '800'],
  ['Which number has 7 in the ten-thousands place?', '472,315', '427,315', '427,135', '42,731'],
  ['Write “six hundred three thousand, nineteen” in standard form.', '603,019', '630,019', '603,190', '6,030,019'],
  ['What digit is in the hundreds place in 945,382?', '3', '8', '5', '2'],
  ['Which expanded form equals 408,207?', '400,000 + 8,000 + 200 + 7', '400,000 + 80,000 + 200 + 7', '40,000 + 8,000 + 200 + 7', '400,000 + 8,000 + 20 + 7'],
  ['Which number is greatest?', '561,902', '561,290', '516,902', '561,092'],
  ['In 731,458, the 1 has what value?', '1,000', '100', '10,000', '1'],
  ['What number is 9 hundred-thousands, 2 thousands, and 6 ones?', '902,006', '920,006', '902,060', '900,206'],
  ['Which comparison is true?', '498,201 > 489,999', '498,201 < 489,999', '498,201 = 489,999', '498,201 > 498,210'],
  ['A digit moves from the thousands place to the ten-thousands place. Its value becomes how many times greater?', '10 times', '2 times', '100 times', '1/10 as great'],
  ['What digit is in the ten-thousands place in 273,845?', '7', '2', '3', '8'],
  ['Which number equals 500,000 + 30,000 + 2,000 + 400 + 60 + 7?', '532,467', '532,647', '523,467', '532,476'],
  ['Which of these numbers is greatest?', '245,768', '245,678', '245,687', '245,786'],
  ['Which number is between 450,000 and 460,000?', '455,321', '460,001', '449,999', '461,000'],
  ['In 888,888, what is the value of the 8 in the hundred-thousands place?', '800,000', '80,000', '8,000', '8'],
  ['What is the standard form of 6 hundred-thousands, 4 thousands, 9 hundreds, and 2 ones?', '604,902', '640,902', '604,920', '649,020'],
  ['In 3,456,789, what is the value of the 3?', '3,000,000', '300,000', '30,000', '3,000'],
  ['Which number has an 8 in the millions place?', '8,432,109', '4,832,109', '1,489,320', '4,238,109'],
  ['What is the value of the 5 in 5,672,410?', '5,000,000', '500,000', '50,000', '5,000'],
  ['Which number is read “four million, two hundred six thousand, eleven”?', '4,206,011', '4,260,011', '4,026,011', '4,206,110']
];
const roundingQuestions = [
  ['Round 386,499 to the nearest thousand.', '386,000', '387,000', '386,500', '385,000'],
  ['Round 386,500 to the nearest thousand.', '387,000', '386,000', '386,500', '388,000'],
  ['Round 386,749 to the nearest thousand.', '387,000', '386,000', '386,700', '388,000'],
  ['Round 92,348 to the nearest hundred.', '92,300', '92,400', '92,000', '92,350'],
  ['Round 92,350 to the nearest hundred.', '92,400', '92,300', '92,000', '92,500'],
  ['Round 786,950 to the nearest hundred.', '787,000', '786,900', '786,000', '787,900'],
  ['Round 641,204 to the nearest ten thousand.', '640,000', '650,000', '641,000', '600,000'],
  ['Round 645,204 to the nearest ten thousand.', '650,000', '640,000', '645,000', '700,000'],
  ['Round 9,949 to the nearest thousand.', '10,000', '9,000', '9,900', '11,000'],
  ['Which number rounds to 50,000 when rounded to the nearest ten thousand?', '46,200', '44,999', '55,100', '39,800'],
  ['Round 4,382,910 to the nearest million.', '4,000,000', '5,000,000', '4,500,000', '4,300,000'],
  ['Round 27 to the nearest ten.', '30', '20', '25', '40'],
  ['Round 84 to the nearest ten.', '80', '90', '85', '70'],
  ['Round 715,499 to the nearest ten thousand.', '720,000', '710,000', '715,000', '700,000'],
  ['Round 715,500 to the nearest ten thousand.', '720,000', '710,000', '715,000', '725,000'],
  ['Which number rounds to 200,000 when rounded to the nearest hundred thousand?', '162,340', '149,000', '251,000', '99,999'],
  ['Round 999,650 to the nearest thousand.', '1,000,000', '999,000', '999,600', '1,000,650'],
  ['Round 45,050 to the nearest hundred.', '45,100', '45,000', '45,050', '44,900'],
  ['Which number rounds to 300,000 when rounded to the nearest hundred thousand?', '340,000', '150,000', '449,999', '199,999'],
  ['Round 3,499,999 to the nearest million.', '3,000,000', '4,000,000', '3,500,000', '3,499,000']
];
function fracStr(numerator, denominator) { return `${numerator}/${denominator}`; }
const conceptQuestionBank = {
  'Add & subtract': index => {
    if (index < 5) { const a = 32 + index * 11, b = 21 + index * 9; return [`Find ${a} + ${b}.`, String(a + b), String(a + b + 10), String(a + b - 10), String(a + b + 1)]; }
    if (index < 10) { const t = index - 5, a = 246 + t * 57, b = 175 + t * 41; return [`Find ${a} + ${b}.`, String(a + b), String(a + b + 100), String(a + b - 100), String(a + b + 11)]; }
    if (index < 15) { const t = index - 10, a = 604 + t * 63, b = 258 + t * 37; return [`Find ${a} - ${b}.`, String(a - b), String(a - b + 10), String(a - b - 10), String(a - b + 100)]; }
    const t = index - 15, a = 4200 + t * 173, b = 1385 + t * 97; return [`Find ${a} - ${b}.`, String(a - b), String(a - b + 10), String(a - b - 10), String(a - b + 100)];
  },
  'Arrays': index => {
    if (index < 5) { const rows = 2 + index, cols = 3 + index; return [`How many dots in ${rows} rows of ${cols}?`, String(rows * cols), String(rows * cols + rows), String(rows * cols - cols), String(rows + cols)]; }
    if (index < 10) { const t = index - 5, rows = 4 + t, cols = 6 + t; return [`How many dots in ${rows} rows of ${cols}?`, String(rows * cols), String(rows * cols + 2), String(rows * cols - 2), String(rows * (cols - 1))]; }
    if (index < 15) { const t = index - 10, groups = 5 + t, each = 8 + t; return [`A garden has ${groups} rows with ${each} plants in each row. How many plants?`, String(groups * each), String(groups * each + each), String(groups * each - groups), String(groups + each)]; }
    const t = index - 15, groups = 7 + t, each = 12 + t; return [`A stadium has ${groups} sections with ${each} seats in each section. How many seats?`, String(groups * each), String(groups * each + 10), String(groups * each - 10), String((groups - 1) * each)];
  },
  'Area models': index => {
    if (index < 5) { const a = 20 + index, b = 3 + index; const partA = a * b, wholeA = a + 1; return [`Use an area model to find ${a} × ${b}.`, String(a * b), String(a * b + b), String(a * b - a), String((a - 1) * b)]; }
    if (index < 10) { const t = index - 5, a = 32 + t * 3, b = 4 + t; return [`Use an area model: ${a} × ${b} = ?`, String(a * b), String(a * b + a), String(a * b - b), String(a * b + b)]; }
    if (index < 15) { const t = index - 10, a = 24 + t, b = 12 + t; return [`Find ${a} × ${b} using an area model.`, String(a * b), String(a * b + 10), String(a * b - 10), String((a + 1) * b)]; }
    const t = index - 15, a = 234 + t * 11, b = 4 + Math.floor(t / 2); return [`Use an area model to find ${a} × ${b}.`, String(a * b), String(a * b + 100), String(a * b - 100), String(a * b + 10)];
  },
  'Multi-digit products': index => {
    if (index < 5) { const a = 213 + index * 21, b = 2 + (index % 3); return [`Find ${a} × ${b}.`, String(a * b), String(a * b + 10), String(a * b - 10), String(a * b + 100)]; }
    if (index < 10) { const t = index - 5, a = 1046 + t * 83, b = 3 + (t % 4); return [`Find ${a} × ${b}.`, String(a * b), String(a * b + 100), String(a * b - 100), String(a * b + 1000)]; }
    if (index < 15) { const t = index - 10, a = 14 + t, b = 12 + t; return [`Find ${a} × ${b}.`, String(a * b), String(a * b + 10), String(a * b - 10), String((a + 1) * b)]; }
    const t = index - 15, a = 312 + t * 17, b = 13 + (t % 5); return [`Find ${a} × ${b}.`, String(a * b), String(a * b + 100), String(a * b - 100), String(a * b + 10)];
  },
  'Equal groups': index => {
    if (index < 5) { const groups = 2 + index, quotient = 3 + index; const total = groups * quotient; return [`${total} shared equally into ${groups} groups. How many in each group?`, String(quotient), String(quotient + 1), String(quotient - 1), String(total)]; }
    if (index < 10) { const t = index - 5, groups = 4 + t, quotient = 6 + t; const total = groups * quotient; return [`${total} divided by ${groups} = ?`, String(quotient), String(quotient + 2), String(quotient - 2), String(quotient + 5)]; }
    if (index < 15) { const t = index - 10, groups = 5 + t, quotient = 12 + t, remainder = 1 + (t % 3); const total = groups * quotient + remainder; const altRemainder = remainder > 1 ? remainder - 1 : remainder + 3; return [`${total} shared into ${groups} equal groups leaves what remainder?`, String(remainder), String(remainder + 2), String(altRemainder), String(quotient)]; }
    const t = index - 15, groups = 6 + t; const quotient = 15 + t; const total = groups * quotient; return [`A dividend of ${total} and divisor of ${groups} gives what quotient?`, String(quotient), String(quotient + 3), String(quotient - 3), String(total - groups)];
  },
  'Long division': index => {
    if (index < 5) { const divisor = 2 + index, quotient = 11 + index; const dividend = divisor * quotient; return [`Find ${dividend} ÷ ${divisor}.`, String(quotient), String(quotient + 1), String(quotient - 1), String(dividend)]; }
    if (index < 10) { const t = index - 5, divisor = 3 + t, quotient = 84 + t * 7; const dividend = divisor * quotient; return [`Find ${dividend} ÷ ${divisor}.`, String(quotient), String(quotient + 2), String(quotient - 2), String(quotient + 10)]; }
    if (index < 15) { const t = index - 10, divisor = 4 + t, quotient = 122 + t * 6, remainder = 1 + (t % 3); const dividend = divisor * quotient + remainder; return [`Find ${dividend} ÷ ${divisor}. Give the quotient and remainder.`, `${quotient} R ${remainder}`, `${quotient - 1} R ${remainder}`, `${quotient} R ${remainder + 1}`, `${quotient + 1} R ${remainder}`]; }
    const t = index - 15, divisor = 6 + t, quotient = 1204 + t * 33, remainder = 2 + (t % 4); const dividend = divisor * quotient + remainder; return [`Find ${dividend} ÷ ${divisor}. Give the quotient and remainder.`, `${quotient} R ${remainder}`, `${quotient - 1} R ${remainder}`, `${quotient} R ${remainder + 1}`, `${quotient + 1} R ${remainder}`];
  },
  'Remainders': index => {
    if (index < 5) { const divisor = 4 + index, quotient = 3 + index, remainder = 1 + (index % (divisor - 1)); const dividend = divisor * quotient + remainder; return [`What is the remainder in ${dividend} ÷ ${divisor}?`, String(remainder), String(remainder + 1), String(divisor), String(quotient)]; }
    if (index < 10) { const t = index - 5, divisor = 6 + t, quotient = 9 + t, remainder = 2 + (t % (divisor - 1)); const dividend = divisor * quotient + remainder; return [`What is the remainder in ${dividend} ÷ ${divisor}?`, String(remainder), String(remainder + 2), String(divisor - 1), String(quotient)]; }
    if (index < 15) { const t = index - 10, seats = 6 + t, students = seats * (3 + t) + 1 + (t % (seats - 1)); const vans = Math.ceil(students / seats); return [`${students} students ride in vans holding ${seats} each. How many vans are needed?`, String(vans), String(vans - 1), String(vans + 1), String(seats)]; }
    const t = index - 15, pieces = 6 + t, friends = 4 + t, remainder = pieces % friends, quotient = Math.floor(pieces / friends), altRemainder = remainder + 1 === friends ? remainder - 1 : remainder + 1; return [`${pieces} candies are shared evenly among ${friends} friends. How many candies are left over?`, String(remainder), String(altRemainder), String(friends), String(quotient)];
  },
  'Multi-step plans': index => {
    if (index < 5) { const a = 3 + index, b = 4 + index, c = 2 + index; const result = a * b + c; return [`Find ${a} × ${b}, then add ${c}.`, String(result), String(a * b), String(result + 1), String(result - 1)]; }
    if (index < 10) { const t = index - 5, a = 5 + t, b = 6 + t, c = 3 + t; const result = a * b - c; return [`Find ${a} × ${b}, then subtract ${c}.`, String(result), String(a * b), String(result + 1), String(result - 1)]; }
    if (index < 15) { const t = index - 10, a = 12 + t, b = 8 + t, c = 4; const result = (a + b) / c; return Number.isInteger(result) ? [`Add ${a} and ${b}, then divide by ${c}.`, String(result), String(result + 1), String(result - 1), String(a + b)] : [`Add ${a} and ${b + 1}, then divide by ${c}.`, String((a + b + 1) / c), String((a + b + 1) / c + 1), String((a + b + 1) / c - 1), String(a + b + 1)]; }
    const t = index - 15, boxes = 6 + t, each = 24 + t, given = 15 + t; const result = boxes * each - given; return [`${boxes} boxes hold ${each} pencils each. ${given} pencils are given away. How many remain?`, String(result), String(boxes * each), String(result + 10), String(result - 10)];
  },
  'Variables': index => {
    if (index < 5) { const n = 12 + index * 3, total = n + (18 + index * 2); return [`Solve n + ${18 + index * 2} = ${total}.`, String(n), String(n + 2), String(n - 2), String(total)]; }
    if (index < 10) { const t = index - 5, n = 20 + t * 4, sub = 9 + t * 2, total = n - sub; return [`Solve n - ${sub} = ${total}.`, String(n), String(n + 2), String(n - 2), String(total)]; }
    if (index < 15) { const t = index - 10, factor = 3 + t, n = 6 + t * 2, total = factor * n; return [`Solve ${factor}n = ${total}.`, String(n), String(n + 1), String(n - 1), String(factor)]; }
    const t = index - 15, factor = 2 + t, n = 5 + t, extra = 4 + t, total = factor * n + extra; return [`Solve ${factor}n + ${extra} = ${total}.`, String(n), String(n + 1), String(n - 1), String(total)];
  },
  'Factors': index => {
    if (index < 5) { const values = [12, 18, 20, 24, 30]; const value = values[index]; const factors = [...Array(value).keys()].map(n => n + 1).filter(n => value % n === 0); return [`How many factors does ${value} have?`, String(factors.length), String(factors.length + 1), String(factors.length - 1), String(value)]; }
    if (index < 10) { const values = [15, 21, 27, 33, 45]; const value = values[index - 5]; const factors = [...Array(value).keys()].map(n => n + 1).filter(n => value % n === 0); const isPrime = factors.length === 2; return [`Is ${value} prime or composite?`, isPrime ? 'Prime' : 'Composite', isPrime ? 'Composite' : 'Prime', 'Neither', 'Both']; }
    if (index < 15) { const values = [36, 40, 48, 54, 60]; const value = values[index - 10]; const half = value / 2; return [`Which number is NOT a factor of ${value}?`, String(half + 1), '1', String(value), String(half)]; }
    const values = [72, 84, 96, 108, 120]; const value = values[index - 15]; const factorPair = value / 4; return [`What is the missing factor: 4 × ? = ${value}?`, String(factorPair), String(factorPair + 1), String(factorPair - 1), '4'];
  },
  'Unit conversions': index => {
    if (index < 5) { const feet = 2 + index; return [`Convert ${feet} feet to inches.`, String(feet * 12), String(feet * 12 + 12), String(feet * 12 - 12), String(feet)]; }
    if (index < 10) { const t = index - 5, yards = 3 + t; return [`Convert ${yards} yards to feet.`, String(yards * 3), String(yards * 3 + 3), String(yards * 3 - 3), String(yards)]; }
    if (index < 15) { const t = index - 10, pounds = 2 + t; return [`Convert ${pounds} pounds to ounces.`, String(pounds * 16), String(pounds * 16 + 16), String(pounds * 16 - 16), String(pounds)]; }
    const t = index - 15, feet = 3 + t; return [`Convert ${feet} feet to inches, then add 5 inches.`, String(feet * 12 + 5), String(feet * 12), String(feet * 12 + 15), String(feet * 12 - 5)];
  },
  'Time and volume': index => {
    if (index < 5) { const minutes = 2 + index; return [`Convert ${minutes} minutes to seconds.`, String(minutes * 60), String(minutes * 60 + 60), String(minutes * 60 - 60), String(minutes)]; }
    if (index < 10) { const t = index - 5, kilograms = 2 + t; return [`Convert ${kilograms} kilograms to grams.`, String(kilograms * 1000), String(kilograms * 1000 + 1000), String(kilograms * 1000 - 1000), String(kilograms)]; }
    if (index < 15) { const t = index - 10, gallons = 2 + t; return [`Convert ${gallons} gallons to quarts.`, String(gallons * 4), String(gallons * 4 + 4), String(gallons * 4 - 4), String(gallons)]; }
    const t = index - 15, hours = 2 + t; return [`Convert ${hours} hours to minutes, then subtract 15 minutes.`, String(hours * 60 - 15), String(hours * 60), String(hours * 60 + 15), String(hours * 60 - 30)];
  },
  'Area & perimeter': index => {
    if (index < 5) { const l = 4 + index, w = 3 + index; return [`Find the area of a ${l} by ${w} rectangle.`, String(l * w), String(2 * (l + w)), String(l * w + w), String(l + w)]; }
    if (index < 10) { const t = index - 5, l = 6 + t, w = 4 + t; return [`Find the perimeter of a ${l} by ${w} rectangle.`, String(2 * (l + w)), String(l * w), String(l + w), String(2 * (l + w) + 2)]; }
    if (index < 15) { const t = index - 10, area = (8 + t) * 4, width = 4; return [`Area is ${area} square meters and width is ${width} meters. What is the length?`, String(area / width), String(area / width + 1), String(area / width - 1), String(area)]; }
    const t = index - 15, l = 9 + t, w = 5 + t; return [`A garden is ${l} m by ${w} m. Find its area and perimeter combined (area + perimeter).`, String(l * w + 2 * (l + w)), String(l * w), String(2 * (l + w)), String(l * w - 2 * (l + w))];
  },
  'Equivalent fractions': index => {
    const bases = [[1, 2], [2, 3], [3, 4], [1, 3], [2, 5]];
    if (index < 5) { const [n, d] = bases[index]; return [`Write an equivalent fraction for ${fracStr(n, d)} with denominator ${d * 2}.`, fracStr(n * 2, d * 2), fracStr(n * 2 + 1, d * 2), fracStr(n * 2, d * 2 + 2), fracStr(n, d * 2)]; }
    if (index < 10) { const [n, d] = bases[index - 5]; return [`Write an equivalent fraction for ${fracStr(n, d)} with denominator ${d * 3}.`, fracStr(n * 3, d * 3), fracStr(n * 3 + 1, d * 3), fracStr(n * 3, d * 3 + 3), fracStr(n, d * 3)]; }
    if (index < 15) { const pairs = [[4, 8], [6, 9], [8, 12], [10, 15], [6, 8]]; const [n, d] = pairs[index - 10]; const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); const divisor = gcd(n, d); const simpleN = n / divisor, simpleD = d / divisor; return [`Simplify ${fracStr(n, d)}.`, fracStr(simpleN, simpleD), fracStr(simpleN + 1, simpleD), fracStr(simpleN, simpleD + 1), fracStr(n, d)]; }
    const comparisons = [[[1, 2], [3, 6]], [[2, 3], [6, 9]], [[3, 4], [9, 12]], [[1, 3], [4, 12]], [[2, 5], [6, 15]]]; const [[an, ad], [bn, bd]] = comparisons[index - 15]; return [`Are ${fracStr(an, ad)} and ${fracStr(bn, bd)} equivalent?`, 'Yes', 'No', 'Only sometimes', 'Cannot tell'];
  },
  'Adding fractions': index => {
    if (index < 5) { const d = 8, a = 1 + index, b = 2 + index; return [`Find ${fracStr(a, d)} + ${fracStr(b, d)}.`, fracStr(a + b, d), fracStr(a + b + 1, d), fracStr(a + b, d + 1), fracStr(a, d)]; }
    if (index < 10) { const t = index - 5, d = 10, a = 2 + t, b = 3 + t; return [`Find ${fracStr(a, d)} + ${fracStr(b, d)}.`, fracStr(a + b, d), fracStr(a + b + 1, d), fracStr(a + b, d + 1), fracStr(b, d)]; }
    if (index < 15) { const t = index - 10, d = 6, a = 3 + (t % 3), b = 4 + (t % 2); const sum = a + b; return sum > d ? [`Find ${fracStr(a, d)} + ${fracStr(b, d)}. Write as a mixed number.`, `1 ${fracStr(sum - d, d)}`, fracStr(sum, d), `1 ${fracStr(sum - d + 1, d)}`, fracStr(sum - d, d)] : [`Find ${fracStr(a, d)} + ${fracStr(b, d)}.`, fracStr(sum, d), fracStr(sum + 1, d), fracStr(sum, d + 1), fracStr(a, d)]; }
    const t = index - 15, d = 12, a = 5 + t, b = 5 + t; const sum = a + b; return [`Find ${fracStr(a, d)} + ${fracStr(b, d)}. Write as a mixed number.`, `1 ${fracStr(sum - d, d)}`, fracStr(sum, d), `1 ${fracStr(sum - d + 1, d)}`, fracStr(sum - d, d)];
  },
  'Subtracting fractions': index => {
    if (index < 5) { const d = 8, a = 5 + index % 3, b = 1 + index % 2; return [`Find ${fracStr(a, d)} - ${fracStr(b, d)}.`, fracStr(a - b, d), fracStr(a - b + 1, d), fracStr(a - b, d + 1), fracStr(b, d)]; }
    if (index < 10) { const t = index - 5, d = 10, a = 7 + (t % 3), b = 2 + (t % 4); return [`Find ${fracStr(a, d)} - ${fracStr(b, d)}.`, fracStr(a - b, d), fracStr(a - b - 1, d), fracStr(a - b, d + 1), fracStr(a + 1, d)]; }
    if (index < 15) { const t = index - 10, d = 6 + t * 2, sub = 1 + t; return [`Find 1 - ${fracStr(sub, d)}.`, fracStr(d - sub, d), fracStr(d - sub - 1, d), fracStr(d - sub + 1, d), fracStr(sub, d)]; }
    const t = index - 15, d = 12, a = 11 - t, b = 2 + t; return [`Find ${fracStr(a, d)} - ${fracStr(b, d)}.`, fracStr(a - b, d), fracStr(a - b + 1, d), fracStr(a - b - 1, d), fracStr(a, d)];
  },
  'Fraction groups': index => {
    if (index < 5) { const whole = 2 + index, d = 3; const top = whole; return [`Find ${whole} × ${fracStr(1, d)}.`, fracStr(top, d), fracStr(top + 1, d), fracStr(top, d + 1), String(whole)]; }
    if (index < 10) { const t = index - 5, whole = 3 + t, n = 2, d = 5; const top = whole * n; return [`Find ${whole} × ${fracStr(n, d)}.`, fracStr(top, d), fracStr(top + 1, d), fracStr(top, d + 1), String(whole)]; }
    if (index < 15) { const t = index - 10, whole = 3 + t, n = 2, d = 3; const top = whole * n; const wholes = Math.floor(top / d), remainder = top - wholes * d; const correct = remainder ? `${wholes} ${fracStr(remainder, d)}` : String(wholes); return remainder ? [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes), `${wholes + 1} ${fracStr(remainder, d)}`, fracStr(top, d)] : [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes + 1), String(wholes - 1), fracStr(top, d)]; }
    const t = index - 15, whole = 4 + t, n = 3, d = 4; const top = whole * n; const wholes = Math.floor(top / d), remainder = top - wholes * d; const correct = remainder ? `${wholes} ${fracStr(remainder, d)}` : String(wholes); return remainder ? [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes), `${wholes + 1} ${fracStr(remainder, d)}`, fracStr(top, d)] : [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes + 1), String(wholes - 1), fracStr(top, d)];
  },
  'Tenths & hundredths': index => {
    if (index < 5) { const tenths = 1 + index; return [`Write ${fracStr(tenths, 10)} as a decimal.`, (tenths / 10).toFixed(1), (tenths / 10 + 0.1).toFixed(1), tenths + '.0', '0.0' + tenths]; }
    if (index < 10) { const t = index - 5, hundredths = 12 + t * 7; return [`Write ${fracStr(hundredths, 100)} as a decimal.`, (hundredths / 100).toFixed(2), (hundredths / 100 + 0.01).toFixed(2), (hundredths / 100 - 0.01).toFixed(2), (hundredths / 100 + 0.1).toFixed(2)]; }
    if (index < 15) { const t = index - 10, tenths = 3 + t; const decimal = (tenths / 10).toFixed(1); return [`Write ${decimal} as a fraction.`, fracStr(tenths, 10), fracStr(tenths, 100), fracStr(tenths + 1, 10), fracStr(tenths - 1, 10)]; }
    const t = index - 15, hundredths = 15 + t * 6; const decimal = (hundredths / 100).toFixed(2); return [`Write ${decimal} as a fraction.`, fracStr(hundredths, 100), fracStr(hundredths, 10), fracStr(hundredths + 1, 100), fracStr(hundredths - 1, 100)];
  },
  'Compare decimals': index => {
    if (index < 5) { const a = (0.5 + index * 0.1).toFixed(1), b = (0.3 + index * 0.1).toFixed(1); return [`Compare ${a} and ${b}. Use <, >, or =.`, '>', '<', '=', 'Cannot tell']; }
    if (index < 10) { const t = index - 5, a = '0.' + (6 + t), b = '0.' + (6 + t) + '0'; return [`Compare ${a} and ${b}. Use <, >, or =.`, '=', '<', '>', 'Cannot tell']; }
    if (index < 15) { const t = index - 10; return [`Compare 0.6 and 0.0${6 + t}. Use <, >, or =.`, '>', '<', '=', 'Cannot tell']; }
    const t = index - 15; return [`Compare ${fracStr(3, 4)} and 0.${70 + t}. Use <, >, or =.`, (0.75 > (70 + t) / 100) ? '>' : (0.75 < (70 + t) / 100 ? '<' : '='), (0.75 > (70 + t) / 100) ? '<' : '>', '=', 'Cannot tell'];
  },
  'Lines': index => {
    const tiers = [
      ['Which figure has two endpoints?', 'Line segment', 'Ray', 'Line', 'Angle'],
      ['Which figure has exactly one endpoint?', 'Ray', 'Line segment', 'Line', 'Angle'],
      ['Which figure continues forever in both directions?', 'Line', 'Ray', 'Line segment', 'Point'],
      ['Two lines that never meet are called what?', 'Parallel', 'Perpendicular', 'Intersecting', 'Equal'],
      ['Two lines that meet at a right angle are called what?', 'Perpendicular', 'Parallel', 'Curved', 'Equal'],
      ['A ruler’s edge is an example of which figure?', 'Line segment', 'Ray', 'Point', 'Angle'],
      ['A flashlight beam starting at a bulb is an example of which figure?', 'Ray', 'Line segment', 'Line', 'Point'],
      ['Railroad tracks are an example of what kind of lines?', 'Parallel', 'Perpendicular', 'Intersecting', 'Curved'],
      ['The corner of a piece of paper shows what kind of lines?', 'Perpendicular', 'Parallel', 'Curved', 'Equal'],
      ['A single dot marking a location is called what?', 'Point', 'Line', 'Ray', 'Segment'],
      ['Which figure is named using two endpoints, like AB?', 'Line segment', 'Ray', 'Line', 'Point'],
      ['Which figure is named using an endpoint and one other point, like ray AB?', 'Ray', 'Line segment', 'Line', 'Point'],
      ['Do parallel lines ever cross?', 'No', 'Yes', 'Sometimes', 'Only at the origin'],
      ['What is the angle formed where two perpendicular lines meet?', '90 degrees', '45 degrees', '180 degrees', '60 degrees'],
      ['Which word describes lines that cross at any angle other than 90 degrees?', 'Intersecting', 'Parallel', 'Perpendicular', 'Equal'],
      ['A number line is an example of which figure?', 'Line', 'Line segment', 'Ray', 'Point'],
      ['Two rays that share an endpoint form what figure?', 'Angle', 'Line', 'Segment', 'Point'],
      ['Which figure would you draw with only a start and stop point, no arrows?', 'Line segment', 'Ray', 'Line', 'Angle'],
      ['If two lines are not parallel and not perpendicular, but still cross, what are they called?', 'Intersecting', 'Parallel', 'Perpendicular', 'Curved'],
      ['A tabletop edge meeting a table leg at a square corner shows what?', 'Perpendicular lines', 'Parallel lines', 'Intersecting curves', 'A single ray']
    ];
    return tiers[index];
  },
  'Angles': index => {
    const angles = [20, 45, 60, 89, 90, 91, 120, 150, 179, 180, 15, 75, 88, 92, 135, 170, 30, 55, 95, 160];
    const angle = angles[index % angles.length];
    const kind = angle < 90 ? 'Acute' : angle === 90 ? 'Right' : angle < 180 ? 'Obtuse' : 'Straight';
    const others = ['Acute', 'Right', 'Obtuse', 'Straight'].filter(item => item !== kind);
    return [`Classify a ${angle}° angle.`, kind, others[0], others[1], others[2]];
  },
  'Symmetry': index => {
    const shapes = [['square', 4], ['rectangle', 2], ['isosceles triangle', 1], ['scalene triangle', 0], ['regular hexagon', 6], ['regular pentagon', 5], ['rhombus', 2], ['regular octagon', 8], ['kite', 1], ['parallelogram', 0], ['equilateral triangle', 3], ['regular heptagon', 7], ['regular nonagon', 9], ['regular decagon', 10], ['right triangle', 0], ['isosceles trapezoid', 1], ['scalene trapezoid', 0], ['regular 12-gon', 12], ['oval (ellipse)', 2], ['regular 5-pointed star', 5]];
    const [shape, lines] = shapes[index];
    const wrongs = lines === 0 ? [1, 2, 3] : [lines + 1, lines - 1, lines + 2];
    return [`How many lines of symmetry does a ${shape} have?`, String(lines), ...wrongs.map(String)];
  },
  'Expressions': index => {
    if (index < 5) { const a = 4 + index, b = 2 + index, c = 3; return [`Evaluate (${a} + ${b}) × ${c}.`, String((a + b) * c), String(a + b * c), String(a * b * c), String(a + b + c)]; }
    if (index < 10) { const t = index - 5, a = 3 + t, b = 2, c = 5 + t; return [`Evaluate ${a} + ${b} × ${c}.`, String(a + b * c), String((a + b) * c), String(a * b + c), String(a + b + c)]; }
    if (index < 15) { const t = index - 10, a = 10 + t, b = 3 + t, c = 2; return [`Evaluate (${a} - ${b}) × ${c}.`, String((a - b) * c), String(a - b * c), String((a + b) * c), String(a - b - c)]; }
    const t = index - 15, a = 3 + t, b = 4 + t, c = 2, d = 5; return [`Evaluate ${a} × (${b} + ${c}) - ${d}.`, String(a * (b + c) - d), String(a * b + c - d), String(a * (b + c) + d), String(a * b + c)];
  },
  'Perimeter': index => {
    if (index < 5) { const l = 5 + index, w = 3 + index; return [`Find the perimeter of a ${l} by ${w} rectangle.`, String(2 * (l + w)), String(l * w), String(l + w), String(2 * (l + w) + 1)]; }
    if (index < 10) { const t = index - 5, side = 5 + t; return [`Find the perimeter of a square with side ${side}.`, String(4 * side), String(side * side), String(2 * side), String(4 * side + 1)]; }
    if (index < 15) { const t = index - 10, perimeter = (10 + t) * 2, side = 10 + t; return [`A square has perimeter ${4 * side}. What is the side length?`, String(side), String(side + 1), String(side - 1), String(4 * side)]; }
    const t = index - 15, sides = [4 + t, 5 + t, 6 + t, 3 + t]; return [`A shape has sides ${sides.join(', ')}. Find its perimeter.`, String(sides.reduce((a, b) => a + b, 0)), String(sides.reduce((a, b) => a + b, 0) + 1), String(Math.max(...sides)), String(sides.reduce((a, b) => a + b, 0) - 1)];
  },
  'Area': index => {
    if (index < 5) { const l = 5 + index, w = 3 + index; return [`Find the area of a ${l} by ${w} rectangle.`, String(l * w), String(2 * (l + w)), String(l + w), String(l * w + w)]; }
    if (index < 10) { const t = index - 5, side = 5 + t; return [`Find the area of a square with side ${side}.`, String(side * side), String(4 * side), String(side + side), String(side * side + side)]; }
    if (index < 15) { const t = index - 10, l = 6 + t, w = 4 + t, area = l * w; return [`Area is ${area} square units and length is ${l}. Find the width.`, String(w), String(w + 1), String(w - 1), String(area)]; }
    const t = index - 15, l = 8 + t, w = 6 + t; return [`A rectangle covers ${l * w} square units and has length ${l}. Find the width, then double it.`, String((l * w / l) * 2), String(l * w / l), String(l * w), String(w * 2 + 1)];
  },
  'Whole numbers': index => {
    if (index < 5) { const a = 3421 + index * 512, b = 2109 + index * 341; return [`Find ${a} + ${b}.`, String(a + b), String(a + b + 100), String(a + b - 100), String(a + b + 10)]; }
    if (index < 10) { const t = index - 5, a = 24680 + t * 913, b = 13579 + t * 621; return [`Find ${a} + ${b}.`, String(a + b), String(a + b + 1000), String(a + b - 1000), String(a + b + 100)]; }
    if (index < 15) { const t = index - 10, a = 90000 + t * 731, b = 31000 + t * 419; return [`Find ${a} - ${b}.`, String(a - b), String(a - b + 1000), String(a - b - 1000), String(a - b + 100)]; }
    const t = index - 15, a = 500000 + t * 1123, b = 218000 + t * 647; return [`Find ${a} - ${b}.`, String(a - b), String(a - b + 1000), String(a - b - 1000), String(a - b + 10000)];
  },
  'Decimals': index => {
    if (index < 5) { const a = (1.2 + index * 0.3).toFixed(1), b = (0.5 + index * 0.2).toFixed(1); const sum = (Number(a) + Number(b)).toFixed(1); return [`Find ${a} + ${b}.`, sum, (Number(sum) + 0.1).toFixed(1), (Number(sum) - 0.1).toFixed(1), (Number(sum) + 1).toFixed(1)]; }
    if (index < 10) { const t = index - 5, a = (3.4 + t * 0.11).toFixed(2), b = (0.65 + t * 0.07).toFixed(2); const sum = (Number(a) + Number(b)).toFixed(2); return [`Find ${a} + ${b}.`, sum, (Number(sum) + 0.01).toFixed(2), (Number(sum) - 0.01).toFixed(2), (Number(sum) + 0.1).toFixed(2)]; }
    if (index < 15) { const t = index - 10, a = (8.2 + t * 0.15).toFixed(2), b = (1.75 + t * 0.09).toFixed(2); const diff = (Number(a) - Number(b)).toFixed(2); return [`Find ${a} - ${b}.`, diff, (Number(diff) + 0.01).toFixed(2), (Number(diff) - 0.01).toFixed(2), (Number(diff) + 0.1).toFixed(2)]; }
    const t = index - 15, a = (15.6 + t * 0.21).toFixed(2), b = (4.85 + t * 0.13).toFixed(2); const diff = (Number(a) - Number(b)).toFixed(2); return [`Find ${a} - ${b}.`, diff, (Number(diff) + 0.01).toFixed(2), (Number(diff) - 0.01).toFixed(2), (Number(diff) + 1).toFixed(2)];
  },
  'Straight lines': index => {
    if (index < 5) { const known = 20 + index * 15; return [`Two angles form a straight line. One is ${known}°. What is the other?`, String(180 - known), String(180 - known + 10), String(180 - known - 10), String(known)]; }
    if (index < 10) { const t = index - 5, known = 32 + t * 13; return [`Two angles form a straight line. One is ${known}°. What is the other?`, String(180 - known), String(180 - known + 5), String(180 - known - 5), String(known)]; }
    if (index < 15) { const t = index - 10, a = 40 + t * 7, b = 60 + t * 5; return [`Two angles on a line are ${a}° and ${b}°. What is the third angle if all three make a straight line?`, String(180 - a - b), String(180 - a - b + 5), String(180 - a - b - 5), String(a + b)]; }
    const t = index - 15, a = 25 + t * 9; const correct = 90 - a; return [`An angle of ${a}° sits on a straight line next to a right angle and another angle. What is the third angle?`, String(correct), String(correct + 10), String(correct - 10), String(a)];
  },
  'Polygons': index => {
    const names = ['triangle', 'quadrilateral', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon', 'hendecagon', 'dodecagon'];
    if (index < 10) { const name = names[index], sides = index + 3; return [`How many sides does a ${name} have?`, String(sides), String(sides + 1), String(sides - 1), String(sides + 2)]; }
    const sides = index - 10 + 3, name = names[index - 10]; const others = names.filter(item => item !== name);
    return [`A shape has ${sides} sides. What is it called?`, name, others[index % others.length], others[(index + 3) % others.length], others[(index + 6) % others.length]];
  },
  'Addition': index => {
    const pairs = [[[1, 3], [1, 6]], [[1, 2], [1, 4]], [[2, 3], [1, 6]], [[1, 4], [1, 8]], [[3, 5], [1, 10]], [[1, 2], [1, 3]], [[2, 5], [1, 2]], [[3, 4], [1, 8]], [[1, 3], [1, 4]], [[2, 3], [1, 4]], [[3, 8], [1, 4]], [[5, 6], [1, 3]], [[1, 2], [3, 8]], [[4, 5], [1, 10]], [[1, 6], [2, 3]], [[7, 12], [1, 4]], [[5, 9], [1, 3]], [[3, 10], [2, 5]], [[7, 8], [1, 4]], [[5, 6], [2, 3]]];
    const [[an, ad], [bn, bd]] = pairs[index % pairs.length];
    const commonDenominator = ad === bd ? ad : (ad % bd === 0 ? ad : bd % ad === 0 ? bd : ad * bd);
    const totalNumerator = an * (commonDenominator / ad) + bn * (commonDenominator / bd);
    const whole = Math.floor(totalNumerator / commonDenominator), remainder = totalNumerator - whole * commonDenominator;
    const answer = whole > 0 ? (remainder ? `${whole} ${fracStr(remainder, commonDenominator)}` : String(whole)) : fracStr(totalNumerator, commonDenominator);
    return [`Find ${fracStr(an, ad)} + ${fracStr(bn, bd)}.`, answer, fracStr(totalNumerator + 1, commonDenominator), fracStr(totalNumerator - 1, commonDenominator), fracStr(an + bn, ad + bd)];
  },
  'Subtraction': index => {
    const pairs = [[[3, 4], [1, 4]], [[5, 6], [1, 3]], [[7, 8], [1, 4]], [[2, 3], [1, 6]], [[3, 5], [1, 10]], [[9, 10], [2, 5]], [[5, 8], [1, 4]], [[4, 5], [1, 10]], [[3, 4], [1, 2]], [[7, 9], [1, 3]], [[5, 6], [1, 2]], [[11, 12], [1, 4]], [[7, 10], [1, 5]], [[8, 9], [2, 3]], [[9, 12], [1, 4]], [[5, 8], [1, 8]], [[11, 15], [1, 5]], [[7, 8], [1, 2]], [[9, 10], [1, 5]], [[13, 15], [1, 3]]];
    const [[an, ad], [bn, bd]] = pairs[index % pairs.length];
    const commonDenominator = ad === bd ? ad : (ad % bd === 0 ? ad : bd % ad === 0 ? bd : ad * bd);
    const totalNumerator = an * (commonDenominator / ad) - bn * (commonDenominator / bd);
    return [`Find ${fracStr(an, ad)} - ${fracStr(bn, bd)}.`, fracStr(totalNumerator, commonDenominator), fracStr(totalNumerator + 1, commonDenominator), fracStr(totalNumerator - 1, commonDenominator), fracStr(an - bn, ad - bd || 1)];
  },
  'Volume': index => {
    if (index < 5) { const l = 2 + index, w = 2 + index, h = 2; return [`Find the volume of a ${l} × ${w} × ${h} prism.`, String(l * w * h), String(l * w), String(l + w + h), String(l * w * h + 1)]; }
    if (index < 10) { const t = index - 5, l = 4 + t, w = 3 + t, h = 3; return [`Find the volume of a ${l} × ${w} × ${h} prism.`, String(l * w * h), String(l * w), String(l * w * h + 10), String(l * w * h - 10)]; }
    if (index < 15) { const t = index - 10, volume = (5 + t) * 4 * 3, base = (5 + t) * 4; return [`Volume is ${volume} cubic units and the base is ${base} square units. Find the height.`, String(volume / base), String(volume / base + 1), String(volume / base - 1), String(volume)]; }
    const t = index - 15, l = 6 + t, w = 5 + t, h = 4; return [`Find the volume of a ${l} × ${w} × ${h} prism, then subtract 10.`, String(l * w * h - 10), String(l * w * h), String(l * w * h + 10), String(l * w)];
  },
  'Conversions': index => {
    if (index < 5) { const feet = 2 + index; return [`Convert ${feet} feet to inches.`, String(feet * 12), String(feet * 12 + 12), String(feet * 12 - 12), String(feet)]; }
    if (index < 10) { const t = index - 5, liters = 2 + t; return [`Convert ${liters} liters to milliliters.`, String(liters * 1000), String(liters * 1000 + 1000), String(liters * 1000 - 1000), String(liters)]; }
    if (index < 15) { const t = index - 10, yards = 2 + t; return [`Convert ${yards} yards to inches.`, String(yards * 36), String(yards * 36 + 36), String(yards * 36 - 36), String(yards * 12)]; }
    const t = index - 15, gallons = 2 + t; return [`Convert ${gallons} gallons to cups.`, String(gallons * 16), String(gallons * 16 + 16), String(gallons * 16 - 16), String(gallons * 4)];
  },
  'Layers': index => {
    if (index < 5) { const perLayer = 6 + index, layers = 2 + index; return [`${perLayer} cubes per layer × ${layers} layers = ?`, String(perLayer * layers), String(perLayer * layers + layers), String(perLayer * layers - layers), String(perLayer + layers)]; }
    if (index < 10) { const t = index - 5, perLayer = 10 + t, layers = 3 + t; return [`${perLayer} cubes per layer × ${layers} layers = ?`, String(perLayer * layers), String(perLayer * layers + 10), String(perLayer * layers - 10), String((perLayer - 1) * layers)]; }
    if (index < 15) { const t = index - 10, layers = 3 + t, perLayer = 12 + t, volume = layers * perLayer; return [`Volume is ${volume} cubic units with ${perLayer} cubes per layer. How many layers?`, String(layers), String(layers + 1), String(layers - 1), String(volume)]; }
    const t = index - 15, volume = (14 + t) * 4, layers = 4; return [`Volume is ${volume} cubic units with ${layers} layers. How many cubes per layer?`, String(volume / layers), String(volume / layers + 1), String(volume / layers - 1), String(volume)];
  },
  'Integers': index => {
    const pairs = [[-3, 4], [-8, 2], [-1, -5], [-6, -2], [5, -9], [-4, 3], [-7, -3], [3, -6], [-10, -4], [-9, 5], [-12, 8], [-5, -11], [2, -8], [-9, 6], [-2, -7], [4, -3], [-15, -6], [1, -10], [-6, 5], [-13, -8]];
    const [a, b] = pairs[index];
    const greater = a > b ? a : b, other = a === greater ? b : a;
    const filler = greater === 0 ? 1 : 0;
    let maxAbs = Math.max(Math.abs(a), Math.abs(b));
    if (maxAbs === greater || maxAbs === other || maxAbs === filler) maxAbs += 1;
    return [`Which is greater, ${a} or ${b}?`, String(greater), String(other), String(filler), String(maxAbs)];
  },
  'Absolute value': index => {
    const values = [-5, -8, 3, -12, 7, -20, 15, -1, -30, 9, -6, 11, -25, 2, -18, 6, -40, 13, -3, 17];
    const value = values[index];
    const correct = Math.abs(value);
    return [`Find |${value}|.`, String(correct), String(-correct), String(correct + 1), String(correct - 1)];
  },
  'Coordinate plane': index => {
    const points = [[3, 2], [-2, 4], [-4, -1], [6, -3], [-5, 2], [1, -6], [-3, -4], [5, 1], [-1, 7], [4, -5], [-6, 3], [2, -2], [-7, -3], [8, 4], [-2, -8], [7, -1], [-8, 5], [3, -9], [-4, 6], [9, -2]];
    const [x, y] = points[index];
    const quadrant = x > 0 && y > 0 ? 'I' : x < 0 && y > 0 ? 'II' : x < 0 && y < 0 ? 'III' : x > 0 && y < 0 ? 'IV' : 'on an axis';
    const others = ['I', 'II', 'III', 'IV'].filter(item => item !== quadrant);
    return quadrant === 'on an axis' ? [`In which quadrant is (${x}, ${y})?`, 'On an axis', 'I', 'II', 'III'] : [`In which quadrant is (${x}, ${y})?`, quadrant, others[0], others[1], others[2]];
  },
  'Fraction multiplication': index => {
    if (index < 5) { const n = 1, d = 2 + index, whole = 2; return [`Find ${whole} × ${fracStr(n, d)}.`, fracStr(whole * n, d), fracStr(whole * n + 1, d), fracStr(whole * n, d + 1), String(whole)]; }
    if (index < 10) { const t = index - 5, n = 2, d = 5 + t, whole = 3 + t; const top = whole * n; return [`Find ${whole} × ${fracStr(n, d)}.`, fracStr(top, d), fracStr(top + 1, d), fracStr(top, d + 1), String(whole)]; }
    if (index < 15) { const t = index - 10, n = 3, d = 4, whole = 2 + t; const top = whole * n; const wholes = Math.floor(top / d), remainder = top - wholes * d; const correct = remainder ? `${wholes} ${fracStr(remainder, d)}` : String(wholes); return remainder ? [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes), `${wholes + 1} ${fracStr(remainder, d)}`, fracStr(top, d)] : [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes + 1), String(wholes - 1), fracStr(top, d)]; }
    const t = index - 15, n = 5, d = 6, whole = 3 + t; const top = whole * n; const wholes = Math.floor(top / d), remainder = top - wholes * d; const correct = remainder ? `${wholes} ${fracStr(remainder, d)}` : String(wholes); return remainder ? [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes), `${wholes + 1} ${fracStr(remainder, d)}`, fracStr(top, d)] : [`Find ${whole} × ${fracStr(n, d)}. Write as a mixed number.`, correct, String(wholes + 1), String(wholes - 1), fracStr(top, d)];
  },
  'Decimal operations': index => {
    if (index < 5) { const a = (1.2 + index * 0.4).toFixed(1), whole = 2 + index; const product = (Number(a) * whole).toFixed(1); return [`Find ${a} × ${whole}.`, product, (Number(product) + 0.1).toFixed(1), (Number(product) - 0.1).toFixed(1), (Number(product) + 1).toFixed(1)]; }
    if (index < 10) { const t = index - 5, dividend = (4.5 + t * 0.6).toFixed(1), divisor = 3; const quotient = (Number(dividend) / divisor).toFixed(2); return [`Find ${dividend} ÷ ${divisor}.`, quotient, (Number(quotient) + 0.1).toFixed(2), (Number(quotient) - 0.1).toFixed(2), (Number(quotient) + 1).toFixed(2)]; }
    if (index < 15) { const t = index - 10, a = (1.5 + t * 0.2).toFixed(1), b = (2.4 + t * 0.3).toFixed(1); const product = (Number(a) * Number(b)).toFixed(2); return [`Find ${a} × ${b}.`, product, (Number(product) + 0.1).toFixed(2), (Number(product) - 0.1).toFixed(2), (Number(product) + 1).toFixed(2)]; }
    const t = index - 15, dividend = (2.4 + t * 0.3).toFixed(1), divisor = (0.3 + (t % 3) * 0.1).toFixed(1); const quotient = (Number(dividend) / Number(divisor)).toFixed(1); return [`Find ${dividend} ÷ ${divisor}.`, quotient, (Number(quotient) + 1).toFixed(1), (Number(quotient) - 1).toFixed(1), (Number(quotient) + 0.1).toFixed(1)];
  }
};

let state = { subject: 'math', grade: 4, schoolLevel: 'elementary', chapter: null, concept: null, question: 0, attempts: 0, answers: {}, wrongChoices: {}, processingAnswer: false, sparks: Number(localStorage.getItem('numberQuestSparks') || 0), started: JSON.parse(localStorage.getItem('numberQuestStarted') || '[]'), completedConcepts: JSON.parse(localStorage.getItem('numberQuestCompletedConcepts') || '[]'), sectionRewards: JSON.parse(localStorage.getItem('numberQuestSectionRewards') || '{}'), trophies: JSON.parse(localStorage.getItem('numberQuestTrophies') || '[]') };
const $ = selector => document.querySelector(selector);
function save() { localStorage.setItem('numberQuestSparks', state.sparks); localStorage.setItem('numberQuestStarted', JSON.stringify(state.started)); localStorage.setItem('numberQuestCompletedConcepts', JSON.stringify(state.completedConcepts)); localStorage.setItem('numberQuestSectionRewards', JSON.stringify(state.sectionRewards)); localStorage.setItem('numberQuestTrophies', JSON.stringify(state.trophies)); }
const subjects = [
  { id: 'math', name: 'Mathematics', symbol: '∑', blurb: 'Numbers, shapes, and problem solving', grades: [4, 5] },
  { id: 'science', name: 'Science', symbol: '⚛', blurb: 'Investigate how the world works', grades: [] },
  { id: 'ela', name: 'Reading & Writing', symbol: '✎', blurb: 'Stories, words, and clear ideas', grades: [4, 5] },
  { id: 'social', name: 'Social Studies', symbol: '◍', blurb: 'People, places, regions, and history', grades: [4, 5] }
];
const GRADE_RANGES = { elementary: [1, 2, 3, 4, 5], middle: [6, 7, 8] };
// Source: Fremont Unified School District comprehensive high school course catalog (fremontusd.com/catalog-images/fusd-hs-catalog.html)
const AP_CATALOG = [
  { subject: 'English', courses: ['AP English Language and Composition', 'AP English Literature and Composition'] },
  { subject: 'Mathematics', courses: ['AP Calculus AB', 'AP Calculus BC', 'AP Statistics'] },
  { subject: 'Computer Science', courses: ['AP Computer Science A', 'AP Computer Science Principles', 'AP Cybersecurity'] },
  { subject: 'Science', courses: ['AP Biology', 'AP Chemistry', 'AP Physics 1', 'AP Physics 2', 'AP Physics C', 'AP Environmental Science'] },
  { subject: 'Social Studies', courses: ['AP World History', 'AP U.S. History', 'AP American Government', 'AP Economics', 'AP Human Geography', 'AP Psychology'] },
  { subject: 'World Languages', courses: ['AP Spanish Language and Culture', 'AP Spanish Literature and Culture', 'AP French Language and Culture', 'AP Chinese Language and Culture'] },
  { subject: 'Visual & Performing Arts', courses: ['AP Music Theory', 'AP 2-D Art and Design', 'AP Drawing', 'AP 3-D Art and Design', 'AP Art History'] },
  { subject: 'Capstone', courses: ['AP Seminar'] }
];
function renderApCatalog() {
  $('#apGrid').innerHTML = AP_CATALOG.map(group => `<div class="ap-group"><h3 class="ap-group-title">${group.subject}</h3><ul class="ap-course-list">${group.courses.map(course => `<li class="ap-course-chip">${course}</li>`).join('')}</ul></div>`).join('');
}
function currentGradeRange() { return GRADE_RANGES[state.schoolLevel] || GRADE_RANGES.elementary; }
const subjectContent = { math: course, ela: readingCourse, social: socialCourse };
function subjectById(id) { return subjects.find(item => item.id === id); }
function chaptersFor(subject, grade) { const content = subjectContent[subject]; return content && content[grade] ? content[grade].chapters : null; }
function gradeLabel(grade) { return grade == null ? '' : grade === 'K' ? 'Kindergarten' : `Grade ${grade}`; }
function currentChapter() { return chaptersFor(state.subject, state.grade)[state.chapter]; }
function isReading() { return state.subject === 'ela'; }
function isSocial() { return state.subject === 'social'; }
function currentStory() { return isReading() ? currentChapter()[1][state.concept] : null; }
function socialFacts() { return isSocial() ? currentChapter()[3] : []; }
function currentConceptName() { return isReading() ? currentStory().title : isSocial() ? currentChapter()[0] : currentChapter()[1][state.concept]; }
function missionKey() { return `${state.subject}-${state.grade}-${state.chapter}-${state.concept}`; }
const coinSymbols = Object.freeze({ Diamond: '◆', Gold: '★', Silver: '●', Bronze: '▲' });
const coinRanks = Object.freeze({ Diamond: 4, Gold: 3, Silver: 2, Bronze: 1 });
function sectionRewardKey(chapterIndex = state.chapter, conceptIndex = state.concept) { return `${state.subject}-${state.grade}-${chapterIndex}-${conceptIndex}`; }
function sectionCoin(conceptIndex) { const saved = state.sectionRewards[sectionRewardKey(state.chapter, conceptIndex)]; if (saved) return saved; const concept = chaptersFor(state.subject, state.grade)[state.chapter][1][conceptIndex]; return state.trophies.find(trophy => trophy.concept === concept)?.tier || null; }
function chapterCoin(chapterIndex) { const chapter = chaptersFor(state.subject, state.grade)[chapterIndex]; const coins = chapter[1].map((_, conceptIndex) => state.sectionRewards[sectionRewardKey(chapterIndex, conceptIndex)]).filter(Boolean); if (coins.length !== chapter[1].length) return null; const average = coins.reduce((sum, tier) => sum + coinRanks[tier], 0) / coins.length; return average >= 3.5 ? 'Diamond' : average >= 2.5 ? 'Gold' : average >= 1.5 ? 'Silver' : 'Bronze'; }
function missionItem(item, index) { return { question: item[0], correct: item[1], options: item.slice(1), id: index, level: levelForIndex(index) }; }
const MISSION_LENGTH = 20;
function missionQuestionsFor(grade, chapterIndex, conceptIndex) {
  const chapter = course[grade].chapters[chapterIndex];
  const concept = chapter[1][conceptIndex];
  if (concept === 'Place value') {
    return placeValueQuestions.map(missionItem);
  }
  if (concept === 'Rounding') {
    return roundingQuestions.map(missionItem);
  }
  const generator = conceptQuestionBank[concept];
  const seen = new Set();
  const items = [];
  for (let index = 0; index < MISSION_LENGTH; index++) {
    const item = generator(index);
    const key = item[0].trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(item);
  }
  return items.map(missionItem);
}
function readingQuestionsFor(grade, chapterIndex, storyIndex) { return readingCourse[grade].chapters[chapterIndex][1][storyIndex].questions.map((item, index) => ({ question: item[0], correct: item[1], options: item.slice(1), id: index, level: index < 2 ? 'Easy' : index < 4 ? 'Medium' : 'Hard' })); }
function socialQuestionsFor(grade, chapterIndex) {
  const facts = socialCourse[grade].chapters[chapterIndex][3];
  const optionsFor = (correct, values) => {
    const options = [correct];
    for (const value of values) if (value !== correct && !options.includes(value) && options.length < 4) options.push(value);
    let filler = 1;
    while (options.length < 4) options.push(`A different idea (${filler++})`);
    return options;
  };
  return facts.flatMap(([topic, detail, importance], index) => [
    { question: `Which statement best explains ${topic}?`, correct: detail, options: optionsFor(detail, facts.map(fact => fact[1])), id: index * 2, level: levelForIndex(index * 2) },
    { question: `Why is ${topic} important in this chapter?`, correct: importance, options: optionsFor(importance, facts.map(fact => fact[2])), id: index * 2 + 1, level: levelForIndex(index * 2 + 1) }
  ]);
}
function genericQuestions() { return missionQuestionsFor(state.grade, state.chapter, state.concept); }
function currentQuestions() { return isReading() ? readingQuestionsFor(state.grade, state.chapter, state.concept) : isSocial() ? socialQuestionsFor(state.grade, state.chapter) : genericQuestions(); }
function currentQuestion() { return currentQuestions()[state.question]; }
function completedConceptKey() { return `${state.subject}-${state.grade}-${state.chapter}-${state.concept}`; }
function isConceptComplete(index) { return state.completedConcepts.includes(`${state.subject}-${state.grade}-${state.chapter}-${index}`); }
function answerMarkup(question, complete) { return `<div class="answer-list">${question.options.sort(() => Math.random() - .5).map(answer => `<button class="answer-button" data-answer="${answer}" ${complete ? 'disabled' : ''}>${answer}</button>`).join('')}</div>`; }
function subjectHasContent(id, grade) { return !!chaptersFor(id, grade); }
function gradeHasContent(grade) { return subjects.some(subject => chaptersFor(subject.id, grade)); }
function renderGradeRail() {
  $('#gradeRail').innerHTML = currentGradeRange().map(grade => { const active = gradeHasContent(grade); return `<button class="grade-chip ${grade === state.grade ? 'active' : ''} ${active ? '' : 'soon'}" data-grade="${grade}" ${active ? '' : 'disabled'}>${grade === 'K' ? 'K' : 'Gr ' + grade}</button>`; }).join('');
  document.querySelectorAll('[data-grade]').forEach(button => button.addEventListener('click', () => {
    if (button.disabled) return;
    state.grade = button.dataset.grade === 'K' ? 'K' : Number(button.dataset.grade);
    if (!subjectHasContent(state.subject, state.grade)) state.subject = (subjects.find(subject => chaptersFor(subject.id, state.grade)) || {}).id || subjects[0].id;
    resetToChapters(); renderGradeRail(); renderSubjectTabs(); renderChapters();
  }));
}
function renderSubjectTabs() {
  $('#subjectTabs').innerHTML = subjects.map(subject => {
    const available = subjectHasContent(subject.id, state.grade);
    const muted = subject.id === 'social';
    return `<button class="subject-tab ${subject.id === state.subject ? 'active' : ''} ${available ? '' : 'soon'} ${muted ? 'social-muted' : ''}" data-subject="${subject.id}" ${available ? '' : 'disabled'}><span class="subject-symbol">${subject.symbol}</span><span class="subject-text"><strong>${subject.name}</strong><small>${available ? subject.blurb : 'Coming soon'}</small></span></button>`;
  }).join('');
  document.querySelectorAll('[data-subject]').forEach(button => button.addEventListener('click', () => { if (button.disabled) return; selectSubject(button.dataset.subject); }));
}
function selectSubject(id) { if (!subjectHasContent(id, state.grade)) return; state.subject = id; resetToChapters(); renderSubjectTabs(); renderChapters(); }
function resetToChapters() { state.chapter = null; state.concept = null; $('#emptyState').hidden = false; $('#lessonView').hidden = true; }
function renderChapters() {
  const subject = subjectById(state.subject), chapters = chaptersFor(state.subject, state.grade), label = gradeLabel(state.grade);
  $('#chapterHeading').textContent = `${subject.name}${label ? ' · ' + label : ''}`;
  if (!chapters) {
    $('#emptyState').hidden = true; $('#lessonView').hidden = true; $('#chapterProgress').textContent = '';
    $('#chapterGrid').innerHTML = `<div class="coming-soon"><div class="soon-badge">Coming soon</div><h3>${subject.name}${label ? ' · ' + label : ''} is on the way</h3><p>We are building the platform in phases. Mathematics for Grade 4 and Grade 5 is ready now — choose it from the subject bar to start practicing.</p></div>`;
    return;
  }
  const prefix = `${state.subject}-${state.grade}-`;
  $('#chapterGrid').innerHTML = chapters.map((chapter, index) => { const coin = chapterCoin(index); const detail = isReading() || isSocial() ? chapter[2] : chapter[1].join(' · '); return `<button class="chapter-card ${state.started.includes(prefix + index) ? 'started' : ''} ${coin ? 'chapter-complete' : ''}" data-chapter="${index}"><span class="chapter-number">${coin ? coinSymbols[coin] : index + 1}</span><h3>${chapter[0]}</h3><p>${coin ? `${coin} chapter coin earned` : detail}</p></button>`; }).join('');
  $('#chapterProgress').textContent = `${state.started.filter(item => item.startsWith(prefix)).length} of ${chapters.length} chapters started`;
  document.querySelectorAll('[data-chapter]').forEach(button => button.addEventListener('click', () => startChapter(Number(button.dataset.chapter))));
}
const conceptLessons = {
  'Place value': ['A digit’s place tells its value. In 582,641, the 8 is in the ten-thousands place, so it means 80,000, not 8.', 'Example: moving a 6 from the hundreds place to the thousands place changes its value from 600 to 6,000.', 'Remember: each step left is 10 times greater; each step right is 10 times smaller.', 'grid'],
  'Rounding': ['Rounding gives a nearby, friendly number for estimating. Find the place you are rounding to, then inspect the digit immediately to its right.', 'Example: 386,749 rounded to the nearest thousand is 387,000 because the hundreds digit is 7.', 'Remember: 5 or more rounds up; 4 or less stays down.', 'grid'],
  'Add & subtract': ['Line up digits by place value so ones are under ones, tens under tens, and so on. Regroup when a column needs more or fewer units.', 'Example: in 4,786 + 2,549, 6 + 9 makes 15 ones. Write 5 ones and regroup 1 ten.', 'Remember: check subtraction by adding the difference and the number taken away.', 'grid'],
  'Arrays': ['An array organizes equal groups into rows and columns. It shows why multiplication is a fast way to count equal groups.', 'Example: 3 rows of 4 dots is 3 x 4 = 12 dots.', 'Remember: rows x columns and columns x rows give the same total.', 'dots'],
  'Area models': ['An area model splits a harder multiplication into smaller rectangles. Break a factor into tens and ones, solve each part, then add.', 'Example: 23 x 4 = (20 x 4) + (3 x 4) = 80 + 12 = 92.', 'Remember: include every partial product before adding.', 'dots'],
  'Multi-digit products': ['For multi-digit multiplication, each digit represents a place value. Multiply one place at a time and regroup when needed.', 'Example: 1,426 x 3 is 4,278. Estimate first: 1,400 x 3 is about 4,200, so the answer is reasonable.', 'Remember: a digit in the tens place represents tens, not ones.', 'dots'],
  'Equal groups': ['Division shares a total into equal groups. The dividend is what is shared, the divisor tells the number of groups, and the quotient tells the amount in each group.', 'Example: 84 divided by 6 = 14 means 84 objects make 6 equal groups of 14.', 'Remember: check with divisor x quotient = dividend.', 'dots'],
  'Long division': ['Long division works one place at a time: divide, multiply, subtract, then bring down the next digit.', 'Example: for 864 divided by 4, divide 8 hundreds, then 6 tens, then 4 ones to get 216.', 'Remember: place every quotient digit directly above the digit you divided.', 'lines'],
  'Remainders': ['A remainder is what is left after making equal groups. The context tells you whether to keep it, round up, or ignore it.', 'Example: 29 students in vans of 6 need 5 vans: 29 divided by 6 is 4 remainder 5, and the five students still need a van.', 'Remember: a remainder must always be smaller than the divisor.', 'lines'],
  'Multi-step plans': ['Multi-step problems need more than one operation. Identify what happens first, solve it, and use that answer in the next step.', 'Example: 6 boxes with 24 pencils each, then 17 given away: multiply 6 x 24, then subtract 17.', 'Remember: write a short equation for each step and label the final answer.', 'grid'],
  'Variables': ['A variable is a letter that stands for an unknown number. An equation says the two sides have the same value.', 'Example: n + 36 = 91. Subtract 36 from both sides, so n = 55.', 'Remember: use the inverse operation to undo what happened to the variable.', 'grid'],
  'Factors': ['Factors are whole numbers that multiply to make a product. Multiples are the products made when you multiply a number by whole numbers.', 'Example: factor pairs of 24 include 1 x 24, 2 x 12, 3 x 8, and 4 x 6.', 'Remember: a prime number has exactly two factors; 1 is neither prime nor composite.', 'grid'],
  'Unit conversions': ['A conversion changes the unit name without changing the amount. Start by writing the fact that connects the units.', 'Example: 4 feet x 12 inches per foot = 48 inches.', 'Remember: changing from a larger unit to a smaller unit makes the number larger.', 'lines'],
  'Time and volume': ['Measurement facts connect time, capacity, mass, and length. Choose the conversion that matches the unit in the question.', 'Example: 3 kilograms equals 3,000 grams because each kilogram has 1,000 grams.', 'Remember: write units beside every number so you know what is being counted.', 'lines'],
  'Area & perimeter': ['Perimeter measures the distance around a shape. Area measures the square units covering the inside.', 'Example: a 7 m by 4 m rectangle has perimeter 7 + 4 + 7 + 4 = 22 m and area 7 x 4 = 28 square m.', 'Remember: perimeter uses regular units; area uses square units.', 'lines'],
  'Equivalent fractions': ['Equivalent fractions name the same amount, even though their numbers look different. Multiply or divide the top and bottom by the same number.', 'Example: 1/2 = 2/4 because both numerator and denominator were multiplied by 2.', 'Remember: whatever happens to the numerator must also happen to the denominator.', 'fraction'],
  'Adding fractions': ['Fractions can be added when the denominators match because the pieces are the same size. Add only the numerators.', 'Example: 3/8 + 2/8 = 5/8.', 'Remember: keep the denominator; it tells the size of each piece.', 'fraction'],
  'Subtracting fractions': ['Fractions with matching denominators can be subtracted by taking away the numerators.', 'Example: 7/10 - 3/10 = 4/10, which simplifies to 2/5.', 'Remember: simplify the final fraction when top and bottom share a factor.', 'fraction'],
  'Fraction groups': ['Multiplying a whole number by a fraction means taking repeated groups of that fraction.', 'Example: 3 x 2/5 = 6/5 = 1 1/5.', 'Remember: multiply the whole number by the numerator, then simplify or make a mixed number.', 'fraction'],
  'Tenths & hundredths': ['Decimals are another way to name parts of one whole. The first place after the decimal is tenths, and the second is hundredths.', 'Example: 0.7 means 7/10, while 0.35 means 35/100.', 'Remember: add zeros when comparing, so 0.7 can be written as 0.70.', 'grid'],
  'Compare decimals': ['Compare decimals from left to right, just as you compare whole numbers. Make both numbers have the same number of decimal places first.', 'Example: 0.75 is greater than 0.70 because 75 hundredths is greater than 70 hundredths.', 'Remember: a zero added to the right of a decimal does not change its value.', 'grid'],
  'Lines': ['A line continues forever in both directions, a segment has two endpoints, and a ray begins at one endpoint and continues forever in one direction.', 'Example: railroad tracks are parallel because they never meet; a corner of paper shows perpendicular lines because they meet at a right angle.', 'Remember: look for endpoints and arrowheads to name the figure.', 'lines'],
  'Angles': ['An angle measures a turn between two rays. Its size depends on the opening, not on how long the rays are.', 'Example: 45 degrees is acute, 90 degrees is right, and 120 degrees is obtuse.', 'Remember: compare the opening with a square corner to recognize a right angle.', 'lines'],
  'Symmetry': ['A line of symmetry splits a shape into two matching mirror-image halves. Folding on that line would make the halves match exactly.', 'Example: a square has four lines of symmetry, while a scalene triangle has none.', 'Remember: both sides of a symmetry line must match in size and shape.', 'lines'],
  'Equal groups': ['Equal groups show multiplication or division clearly. Count how many groups there are and how many items are in each.', 'Example: 4 groups of 7 makes 4 x 7 = 28.', 'Remember: multiplication combines equal groups; division shares into equal groups.', 'dots'],
  'Expressions': ['An expression is a math phrase without an equals sign. Parentheses tell you to calculate the inside part first.', 'Example: (8 + 2) x 5 = 10 x 5 = 50.', 'Remember: solve inside parentheses before multiplying or dividing.', 'grid'],
  'Perimeter': ['Perimeter is the distance around the outside edge of a shape. Add all of its side lengths.', 'Example: a 6 by 4 rectangle has perimeter 6 + 4 + 6 + 4 = 20 units.', 'Remember: walk around the shape once and count every side.', 'lines'],
  'Area': ['Area is the flat space inside a shape, measured in square units. A rectangle’s area is length x width.', 'Example: a 6 by 4 rectangle covers 24 square units.', 'Remember: area tiles cover the inside; perimeter traces the outside.', 'lines'],
  'Whole numbers': ['Whole-number addition and subtraction use place value. Arrange numbers vertically and keep each column lined up.', 'Example: 47,891 + 23,109 = 71,000 because the ones, tens, hundreds, and thousands are added in matching columns.', 'Remember: regroup carefully and estimate to check your answer.', 'grid'],
  'Decimals': ['For decimal operations, line up decimal points first so tenths meet tenths and hundredths meet hundredths.', 'Example: 3.40 + 0.65 = 4.05.', 'Remember: zero is a useful placeholder, but never move the decimal point.', 'grid'],
  'Straight lines': ['A straight angle makes a half-turn and measures 180 degrees. Two angles beside each other on a straight line must add to 180.', 'Example: if one angle is 70 degrees, the other is 110 degrees.', 'Remember: check that the pair totals exactly 180 degrees.', 'lines'],
  'Polygons': ['A polygon is a closed, flat shape made only from straight line segments. Its name often tells how many sides it has.', 'Example: a hexagon has 6 sides and 6 vertices.', 'Remember: curved sides or an open gap mean the shape is not a polygon.', 'lines'],
  'Addition': ['To add fractions, rewrite them with a common denominator so all pieces are the same size.', 'Example: 1/3 + 1/6 becomes 2/6 + 1/6 = 3/6 = 1/2.', 'Remember: add numerators only after the denominators match.', 'fraction'],
  'Subtraction': ['To subtract fractions with unlike denominators, rename them using a common denominator first.', 'Example: 3/4 - 1/4 = 2/4 = 1/2.', 'Remember: subtract numerators only when the pieces are the same size.', 'fraction'],
  'Volume': ['Volume counts the cubic units filling a solid box. A rectangular prism has length, width, and height.', 'Example: 4 x 3 x 2 = 24 cubic units.', 'Remember: volume uses three measurements and cubic units.', 'grid'],
  'Conversions': ['Measurement conversions use known unit relationships. Decide whether you are changing to a bigger or smaller unit.', 'Example: 3 feet = 36 inches because 3 x 12 = 36.', 'Remember: use a conversion fact before calculating.', 'lines'],
  'Layers': ['A rectangular prism is built from equal layers of unit cubes. Find the cubes in one layer, then multiply by the number of layers.', 'Example: 12 cubes in each layer x 3 layers = 36 cubic units.', 'Remember: each layer must contain the same number of cubes.', 'grid'],
  'Integers': ['Integers include positive numbers, negative numbers, and zero. A number line shows their order.', 'Example: -3 is three steps left of zero, while 4 is four steps right of zero.', 'Remember: numbers farther right are greater.', 'lines'],
  'Absolute value': ['Absolute value is a number’s distance from zero, so it is never negative.', 'Example: |-5| = 5 because -5 is five steps away from zero.', 'Remember: the bars mean distance, not a negative sign.', 'lines'],
  'Coordinate plane': ['A coordinate plane uses a horizontal x-axis and vertical y-axis. Read an ordered pair x first, then y.', 'Example: to plot (3, -2), move 3 right and then 2 down.', 'Remember: begin every point at the origin, (0, 0).', 'lines'],
  'Fraction multiplication': ['Multiplying a fraction by a whole number is repeated groups of that fraction.', 'Example: 3/4 x 4 = 12/4 = 3.', 'Remember: simplify after multiplying and change improper fractions to mixed numbers when helpful.', 'fraction'],
  'Decimal operations': ['Decimal multiplication and division use place value. Estimate first, then place the decimal so the result makes sense.', 'Example: 2.4 divided by 0.3 = 8 because 24 tenths divided by 3 tenths equals 8.', 'Remember: an estimate catches a misplaced decimal point.', 'grid']
};
function lessonForConcept(concept, chapterLesson) { const lesson = conceptLessons[concept]; return lesson ? `<p class="lesson-copy"><strong>What it means:</strong> ${lesson[0]}</p><p class="lesson-copy"><strong>${lesson[1]}</strong></p><p class="lesson-copy"><strong>Remember:</strong> ${lesson[2].replace(/^Remember:\s*/, '')}</p>` : `<p class="lesson-copy"><strong>${concept}:</strong> ${chapterLesson}</p>`; }
const C = { navy: '#0B3954', teal: '#007C91', gold: '#F4B942', coral: '#FF876C', mint: '#57C9AE', sky: '#5AA9E6', lime: '#9BC53D', ink: '#173042', paper: '#ffffff' };
function fig(caption, inner, h = 158) { return `<figure class="concept-figure"><svg viewBox="0 0 440 ${h}" role="img" aria-label="${caption}"><rect x="1" y="1" width="438" height="${h - 2}" rx="12" fill="#eef7f4" stroke="#cfe6df"/>${inner}</svg><figcaption>${caption}</figcaption></figure>`; }
function dots(x, y, cols, rows, gap, r, fill) { let out = ''; for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) out += `<circle cx="${x + col * gap}" cy="${y + row * gap}" r="${r}" fill="${fill}" stroke="${C.ink}" stroke-width="1"/>`; return out; }
function conceptVisuals() {
  return {
    'Rounding': fig('Round down or up by the next digit', `<text x="22" y="24" font-size="11" font-weight="bold" fill="${C.navy}">Nearest thousand — check the hundreds digit</text><text x="22" y="48" font-size="12" font-weight="bold" fill="${C.coral}">386,499 → 386,000  (hundreds digit 4, round DOWN)</text><line x1="35" y1="72" x2="405" y2="72" stroke="${C.navy}" stroke-width="2"/><line x1="35" y1="66" x2="35" y2="78" stroke="${C.navy}" stroke-width="2"/><line x1="220" y1="66" x2="220" y2="78" stroke="#9fb3ad"/><line x1="405" y1="66" x2="405" y2="78" stroke="${C.navy}" stroke-width="2"/><text x="20" y="92" font-size="9" fill="${C.navy}">386,000</text><text x="200" y="92" font-size="9" fill="#5c7168">386,500</text><text x="378" y="92" font-size="9" fill="${C.navy}">387,000</text><circle cx="182" cy="72" r="6" fill="${C.coral}" stroke="${C.ink}"/><path d="M176 64 Q108 46 42 66" fill="none" stroke="${C.coral}" stroke-width="2.5"/><polygon points="40,66 51,61 50,71" fill="${C.coral}"/><text x="22" y="128" font-size="12" font-weight="bold" fill="${C.teal}">386,749 → 387,000  (hundreds digit 7, round UP)</text><line x1="35" y1="152" x2="405" y2="152" stroke="${C.navy}" stroke-width="2"/><line x1="35" y1="146" x2="35" y2="158" stroke="${C.navy}" stroke-width="2"/><line x1="220" y1="146" x2="220" y2="158" stroke="#9fb3ad"/><line x1="405" y1="146" x2="405" y2="158" stroke="${C.navy}" stroke-width="2"/><text x="20" y="172" font-size="9" fill="${C.navy}">386,000</text><text x="200" y="172" font-size="9" fill="#5c7168">386,500</text><text x="378" y="172" font-size="9" fill="${C.navy}">387,000</text><circle cx="316" cy="152" r="6" fill="${C.teal}" stroke="${C.ink}"/><path d="M322 144 Q372 124 402 146" fill="none" stroke="${C.teal}" stroke-width="2.5"/><polygon points="404,150 393,142 399,154" fill="${C.teal}"/><text x="22" y="200" font-size="11" font-weight="bold" fill="${C.ink}">Rule: hundreds digit 0–4 stays · 5–9 rounds up (386,500 rounds up)</text>`, 212),
    'Add & subtract': fig('Line up places and regroup', `<text x="150" y="44" font-size="13" fill="${C.coral}" font-weight="bold">1</text><text x="120" y="66" font-size="24" font-family="Arial" font-weight="bold" fill="${C.navy}">4,786</text><text x="110" y="96" font-size="24" font-family="Arial" font-weight="bold" fill="${C.navy}">+ 2,549</text><line x1="108" y1="106" x2="250" y2="106" stroke="${C.teal}" stroke-width="2.5"/><text x="120" y="134" font-size="24" font-family="Arial" font-weight="bold" fill="${C.teal}">7,335</text><text x="300" y="74" font-size="12" fill="${C.ink}">6 + 9 = 15</text><text x="300" y="96" font-size="12" fill="${C.ink}">write 5,</text><text x="300" y="114" font-size="12" fill="${C.ink}">carry 1 ten</text>`),
    'Arrays': fig('3 rows × 4 columns = 12', `${dots(96, 50, 4, 3, 32, 11, C.mint)}<text x="92" y="34" font-size="11" font-weight="bold" fill="${C.navy}">4 columns →</text><text x="44" y="96" font-size="11" font-weight="bold" fill="${C.navy}" transform="rotate(-90 44 96)">3 rows</text><text x="250" y="78" font-size="20" font-weight="bold" fill="${C.teal}">3 × 4 = 12</text><text x="250" y="104" font-size="12" fill="${C.ink}">count by rows or columns</text>`),
    'Area models': fig('23 × 4 = 80 + 12 = 92', `<rect x="60" y="52" width="210" height="60" fill="#fff" stroke="${C.teal}" stroke-width="2"/><line x1="216" y1="52" x2="216" y2="112" stroke="${C.teal}" stroke-width="2"/><text x="130" y="46" font-size="12" fill="${C.navy}">20</text><text x="230" y="46" font-size="12" fill="${C.navy}">3</text><text x="40" y="88" font-size="12" fill="${C.navy}">4</text><text x="118" y="88" font-size="20" font-weight="bold" fill="${C.teal}">80</text><text x="228" y="88" font-size="18" font-weight="bold" fill="${C.coral}">12</text><text x="300" y="88" font-size="16" font-weight="bold" fill="${C.navy}">= 92</text>`),
    'Multi-digit products': fig('1,426 × 3 = 4,278', `<text x="150" y="60" font-size="24" font-family="Arial" font-weight="bold" fill="${C.navy}">1,426</text><text x="158" y="90" font-size="24" font-family="Arial" font-weight="bold" fill="${C.navy}">×   3</text><line x1="150" y1="100" x2="270" y2="100" stroke="${C.teal}" stroke-width="2.5"/><text x="150" y="128" font-size="24" font-family="Arial" font-weight="bold" fill="${C.teal}">4,278</text><text x="300" y="86" font-size="12" fill="${C.ink}">estimate:</text><text x="300" y="104" font-size="12" fill="${C.ink}">≈ 4,200</text>`),
    'Equal groups': fig('84 shared into 6 equal groups of 14', `${[0,1,2,3,4,5].map(i => `<rect x="${40 + i * 62}" y="54" width="48" height="44" rx="7" fill="${C.sky}" stroke="${C.navy}" stroke-width="1.5"/><text x="${52 + i * 62}" y="82" font-size="16" font-weight="bold" fill="#fff">14</text>`).join('')}<text x="120" y="126" font-size="14" font-weight="bold" fill="${C.navy}">6 × 14 = 84</text>`),
    'Long division': fig('864 ÷ 4 = 216', `<text x="150" y="70" font-size="16" fill="${C.teal}" font-weight="bold">2  1  6</text><path d="M120 78 h150" stroke="${C.navy}" stroke-width="2"/><text x="95" y="96" font-size="26" font-family="Arial" font-weight="bold" fill="${C.navy}">4</text><path d="M118 74 q10 20 0 40" fill="none" stroke="${C.navy}" stroke-width="2"/><text x="128" y="98" font-size="26" font-family="Arial" font-weight="bold" fill="${C.navy}">864</text><text x="300" y="82" font-size="12" fill="${C.ink}">divide, multiply,</text><text x="300" y="100" font-size="12" fill="${C.ink}">subtract, bring down</text>`),
    'Remainders': fig('29 ÷ 6 = 4 remainder 5', `${[0,1,2,3].map(i => `<rect x="${40 + i * 56}" y="52" width="44" height="40" rx="6" fill="${C.mint}" stroke="${C.navy}"/><text x="${52 + i * 56}" y="78" font-size="15" font-weight="bold" fill="#fff">6</text>`).join('')}<rect x="272" y="52" width="44" height="40" rx="6" fill="${C.coral}" stroke="${C.navy}"/><text x="288" y="78" font-size="15" font-weight="bold" fill="#fff">5</text><text x="60" y="120" font-size="13" font-weight="bold" fill="${C.navy}">4 full groups, remainder 5</text>`),
    'Multi-step plans': fig('6 × 24 = 144, then 144 − 17 = 127', `<rect x="30" y="60" width="110" height="40" rx="8" fill="#fff" stroke="${C.teal}" stroke-width="2"/><text x="42" y="85" font-size="14" font-weight="bold" fill="${C.navy}">6 × 24 = 144</text><path d="M145 80 h40" stroke="${C.navy}" stroke-width="2"/><polygon points="187,80 177,75 177,85" fill="${C.navy}"/><rect x="190" y="60" width="120" height="40" rx="8" fill="#fff" stroke="${C.teal}" stroke-width="2"/><text x="200" y="85" font-size="14" font-weight="bold" fill="${C.navy}">144 − 17 = 127</text><path d="M315 80 h30" stroke="${C.navy}" stroke-width="2"/><polygon points="347,80 337,75 337,85" fill="${C.navy}"/><text x="352" y="86" font-size="18" font-weight="bold" fill="${C.teal}">127</text>`),
    'Variables': fig('n + 36 = 91, so n = 55', `<line x1="80" y1="112" x2="360" y2="112" stroke="${C.navy}" stroke-width="3"/><polygon points="220,70 205,100 235,100" fill="${C.gold}" stroke="${C.ink}"/><rect x="120" y="76" width="60" height="26" rx="6" fill="${C.mint}" stroke="${C.navy}"/><text x="138" y="95" font-size="15" font-weight="bold" fill="#fff">n+36</text><rect x="262" y="76" width="52" height="26" rx="6" fill="${C.sky}" stroke="${C.navy}"/><text x="278" y="95" font-size="15" font-weight="bold" fill="#fff">91</text><text x="150" y="140" font-size="13" font-weight="bold" fill="${C.teal}">91 − 36 = 55</text>`),
    'Factors': fig('Factor pairs of 24', `${[['1 × 24',40],['2 × 12',150],['3 × 8',260],['4 × 6',350]].map(([t,x]) => `<rect x="${x}" y="58" width="72" height="34" rx="7" fill="${C.sky}" stroke="${C.navy}"/><text x="${x+10}" y="80" font-size="13" font-weight="bold" fill="#fff">${t}</text>`).join('')}<text x="120" y="124" font-size="13" font-weight="bold" fill="${C.navy}">Each pair multiplies to 24</text>`),
    'Unit conversions': fig('4 feet = 48 inches', `<rect x="40" y="60" width="360" height="26" fill="#fff" stroke="${C.navy}"/>${[0,1,2,3].map(i => `<line x1="${40 + i * 90}" y1="60" x2="${40 + i * 90}" y2="86" stroke="${C.teal}" stroke-width="2"/><text x="${64 + i * 90}" y="104" font-size="11" fill="${C.navy}">1 ft</text>`).join('')}<text x="120" y="46" font-size="14" font-weight="bold" fill="${C.teal}">4 ft × 12 = 48 inches</text><text x="150" y="130" font-size="12" fill="${C.ink}">smaller unit → bigger number</text>`),
    'Time and volume': fig('3 kilograms = 3,000 grams', `<circle cx="120" cy="80" r="44" fill="#fff" stroke="${C.navy}" stroke-width="2"/><line x1="120" y1="80" x2="120" y2="44" stroke="${C.coral}" stroke-width="3"/><text x="98" y="140" font-size="13" font-weight="bold" fill="${C.navy}">3 kg</text><text x="210" y="76" font-size="16" font-weight="bold" fill="${C.teal}">× 1,000</text><text x="210" y="104" font-size="16" font-weight="bold" fill="${C.navy}">= 3,000 g</text>`),
    'Area & perimeter': fig('7 × 4 rectangle: area 28, perimeter 22', `<rect x="120" y="46" width="200" height="66" fill="#eafaf4" stroke="${C.teal}" stroke-width="3"/><text x="205" y="40" font-size="13" font-weight="bold" fill="${C.navy}">7 m</text><text x="326" y="84" font-size="13" font-weight="bold" fill="${C.navy}">4 m</text><text x="150" y="86" font-size="15" font-weight="bold" fill="${C.teal}">Area = 28</text><text x="120" y="138" font-size="13" fill="${C.ink}">Perimeter = 7+4+7+4 = 22 m</text>`),
    'Equivalent fractions': fig('1/2 = 2/4 (same amount)', `<rect x="60" y="46" width="200" height="30" fill="#fff" stroke="${C.navy}"/><rect x="60" y="46" width="100" height="30" fill="${C.gold}" stroke="${C.navy}"/><text x="270" y="68" font-size="16" font-weight="bold" fill="${C.navy}">1/2</text><rect x="60" y="92" width="200" height="30" fill="#fff" stroke="${C.navy}"/><rect x="60" y="92" width="100" height="30" fill="${C.gold}" stroke="${C.navy}"/><line x1="110" y1="92" x2="110" y2="122" stroke="${C.navy}"/><line x1="210" y1="92" x2="210" y2="122" stroke="${C.navy}"/><text x="270" y="114" font-size="16" font-weight="bold" fill="${C.navy}">2/4</text>`),
    'Adding fractions': fig('3/8 + 2/8 = 5/8', `<rect x="50" y="58" width="320" height="34" fill="#fff" stroke="${C.navy}"/>${[0,1,2,3,4,5,6,7].map(i => `<line x1="${50 + i * 40}" y1="58" x2="${50 + i * 40}" y2="92" stroke="${C.navy}"/>`).join('')}${[0,1,2].map(i => `<rect x="${50 + i * 40}" y="58" width="40" height="34" fill="${C.mint}"/>`).join('')}${[3,4].map(i => `<rect x="${50 + i * 40}" y="58" width="40" height="34" fill="${C.gold}"/>`).join('')}<text x="150" y="122" font-size="15" font-weight="bold" fill="${C.navy}">3 eighths + 2 eighths = 5/8</text>`),
    'Subtracting fractions': fig('7/10 − 3/10 = 4/10', `<rect x="40" y="58" width="360" height="34" fill="#fff" stroke="${C.navy}"/>${Array.from({length:10}).map((_,i) => `<line x1="${40 + i * 36}" y1="58" x2="${40 + i * 36}" y2="92" stroke="${C.navy}"/>`).join('')}${[0,1,2,3].map(i => `<rect x="${40 + i * 36}" y="58" width="36" height="34" fill="${C.sky}"/>`).join('')}${[4,5,6].map(i => `<rect x="${40 + i * 36}" y="58" width="36" height="34" fill="#f2c9c0"/><line x1="${40 + i * 36}" y1="58" x2="${76 + i * 36}" y2="92" stroke="${C.coral}"/>`).join('')}<text x="120" y="122" font-size="14" font-weight="bold" fill="${C.navy}">take away 3, keep 4/10</text>`),
    'Fraction groups': fig('3 × 2/5 = 6/5 = 1 1/5', `${[0,1,2].map(g => `<rect x="${40 + g * 130}" y="56" width="100" height="30" fill="#fff" stroke="${C.navy}"/>${[0,1].map(i => `<rect x="${40 + g * 130 + i * 20}" y="56" width="20" height="30" fill="${C.gold}"/>`).join('')}${[2,3,4].map(i => `<line x1="${40 + g * 130 + i * 20}" y1="56" x2="${40 + g * 130 + i * 20}" y2="86" stroke="${C.navy}"/>`).join('')}<text x="${72 + g * 130}" y="106" font-size="12" fill="${C.navy}">2/5</text>`).join('')}<text x="150" y="134" font-size="13" font-weight="bold" fill="${C.teal}">3 groups of 2/5 = 6/5</text>`),
    'Tenths & hundredths': fig('0.7 = 7/10 and 0.35 = 35/100', `<rect x="40" y="42" width="150" height="30" fill="#fff" stroke="${C.navy}"/>${Array.from({length:10}).map((_,i) => `<rect x="${40 + i * 15}" y="42" width="15" height="30" fill="${i < 7 ? C.mint : '#fff'}" stroke="${C.navy}"/>`).join('')}<text x="200" y="64" font-size="14" font-weight="bold" fill="${C.navy}">0.7 = 7/10</text><g>${Array.from({length:100}).map((_,i) => `<rect x="${40 + (i % 10) * 8}" y="${86 + Math.floor(i / 10) * 6}" width="8" height="6" fill="${i < 35 ? C.gold : '#fff'}" stroke="#ccd"/>`).join('')}</g><text x="200" y="118" font-size="14" font-weight="bold" fill="${C.navy}">0.35 = 35/100</text>`),
    'Compare decimals': fig('0.75 > 0.70', `<rect x="50" y="50" width="150" height="28" fill="#fff" stroke="${C.navy}"/><rect x="50" y="50" width="112" height="28" fill="${C.mint}"/><text x="90" y="98" font-size="15" font-weight="bold" fill="${C.navy}">0.75</text><text x="212" y="74" font-size="30" font-weight="bold" fill="${C.coral}">&gt;</text><rect x="250" y="50" width="150" height="28" fill="#fff" stroke="${C.navy}"/><rect x="250" y="50" width="105" height="28" fill="${C.sky}"/><text x="292" y="98" font-size="15" font-weight="bold" fill="${C.navy}">0.70</text><text x="120" y="132" font-size="12" fill="${C.ink}">75 hundredths beats 70 hundredths</text>`),
    'Lines': fig('Parallel and perpendicular lines', `<line x1="40" y1="58" x2="180" y2="58" stroke="${C.teal}" stroke-width="3"/><line x1="40" y1="92" x2="180" y2="92" stroke="${C.teal}" stroke-width="3"/><text x="66" y="118" font-size="12" font-weight="bold" fill="${C.navy}">parallel</text><line x1="300" y1="40" x2="300" y2="110" stroke="${C.navy}" stroke-width="3"/><line x1="255" y1="86" x2="360" y2="86" stroke="${C.navy}" stroke-width="3"/><rect x="300" y="76" width="10" height="10" fill="none" stroke="${C.coral}" stroke-width="2"/><text x="252" y="128" font-size="12" font-weight="bold" fill="${C.navy}">perpendicular</text>`),
    'Angles': fig('Acute (45°), right (90°), and obtuse (120°)', `<line x1="55" y1="104" x2="55" y2="50" stroke="${C.navy}" stroke-width="2.5"/><line x1="55" y1="104" x2="102" y2="75" stroke="${C.teal}" stroke-width="2.5"/><path d="M55 84 A20 20 0 0 1 73 94" fill="none" stroke="${C.gold}" stroke-width="2"/><text x="62" y="72" font-size="11" font-weight="bold" fill="${C.teal}">45°</text><text x="36" y="126" font-size="11" fill="${C.navy}">acute</text><line x1="195" y1="104" x2="195" y2="50" stroke="${C.navy}" stroke-width="2.5"/><line x1="195" y1="104" x2="248" y2="104" stroke="${C.navy}" stroke-width="2.5"/><rect x="195" y="92" width="12" height="12" fill="none" stroke="${C.coral}" stroke-width="2"/><text x="212" y="84" font-size="11" font-weight="bold" fill="${C.coral}">90°</text><text x="188" y="126" font-size="11" fill="${C.navy}">right</text><line x1="340" y1="104" x2="340" y2="50" stroke="${C.navy}" stroke-width="2.5"/><line x1="340" y1="104" x2="400" y2="122" stroke="${C.gold}" stroke-width="2.5"/><path d="M340 78 A26 26 0 0 1 360 100" fill="none" stroke="${C.coral}" stroke-width="2"/><text x="346" y="72" font-size="11" font-weight="bold" fill="${C.gold}">120°</text><text x="330" y="138" font-size="11" fill="${C.navy}">obtuse</text>`),
    'Symmetry': fig('A line of symmetry makes matching halves', `<line x1="220" y1="34" x2="220" y2="124" stroke="${C.coral}" stroke-width="2" stroke-dasharray="5 4"/><polygon points="220,44 150,80 175,116 220,104" fill="${C.sky}" stroke="${C.navy}"/><polygon points="220,44 290,80 265,116 220,104" fill="${C.mint}" stroke="${C.navy}"/><text x="140" y="140" font-size="12" fill="${C.ink}">both sides match when folded</text>`),
    'Expressions': fig('(8 + 2) × 5 = 50', `<rect x="70" y="54" width="90" height="40" rx="8" fill="#fff8e0" stroke="${C.gold}" stroke-width="2"/><text x="82" y="80" font-size="18" font-weight="bold" fill="${C.navy}">8 + 2</text><text x="168" y="80" font-size="18" font-weight="bold" fill="${C.ink}">× 5</text><path d="M115 98 v14 h120" fill="none" stroke="${C.teal}" stroke-width="2"/><text x="245" y="118" font-size="16" font-weight="bold" fill="${C.teal}">10 × 5 = 50</text><text x="70" y="132" font-size="12" fill="${C.ink}">solve inside parentheses first</text>`),
    'Perimeter': fig('Perimeter traces every side', `<rect x="120" y="46" width="200" height="60" fill="none" stroke="${C.coral}" stroke-width="4"/><text x="200" y="40" font-size="12" fill="${C.navy}">6</text><text x="326" y="82" font-size="12" fill="${C.navy}">4</text><text x="120" y="130" font-size="13" font-weight="bold" fill="${C.navy}">6 + 4 + 6 + 4 = 20 units</text>`),
    'Area': fig('Area fills the inside with unit squares', `${Array.from({length:24}).map((_,i) => `<rect x="${130 + (i % 6) * 28}" y="${50 + Math.floor(i / 6) * 18}" width="28" height="18" fill="${C.mint}" stroke="#fff" stroke-width="1"/>`).join('')}<text x="186" y="44" font-size="11" font-weight="bold" fill="${C.navy}">6 units across</text><text x="120" y="96" font-size="11" font-weight="bold" fill="${C.navy}" transform="rotate(-90 120 96)">4 units</text><text x="150" y="140" font-size="13" font-weight="bold" fill="${C.teal}">6 × 4 = 24 square units</text>`),
    'Whole numbers': fig('Add in matching place-value columns', `${['Thousands','Hundreds','Tens','Ones'].map((t,i) => `<rect x="${60 + i * 82}" y="46" width="76" height="24" fill="#fff" stroke="${C.teal}"/><text x="${64 + i * 82}" y="62" font-size="9" font-weight="bold" fill="${C.navy}">${t}</text>`).join('')}<text x="70" y="96" font-size="18" font-weight="bold" fill="${C.navy}">47,891 + 23,109</text><text x="120" y="130" font-size="16" font-weight="bold" fill="${C.teal}">= 71,000</text>`),
    'Decimals': fig('Line up the decimal points', `<text x="150" y="58" font-size="24" font-family="Arial" font-weight="bold" fill="${C.navy}">3.40</text><text x="132" y="88" font-size="24" font-family="Arial" font-weight="bold" fill="${C.navy}">+ 0.65</text><line x1="130" y1="98" x2="240" y2="98" stroke="${C.teal}" stroke-width="2.5"/><text x="150" y="126" font-size="24" font-family="Arial" font-weight="bold" fill="${C.teal}">4.05</text><line x1="196" y1="40" x2="196" y2="130" stroke="${C.coral}" stroke-width="1.5" stroke-dasharray="4 3"/>`),
    'Straight lines': fig('70° + 110° = 180° on a straight line', `<line x1="40" y1="96" x2="400" y2="96" stroke="${C.navy}" stroke-width="3"/><line x1="220" y1="96" x2="150" y2="50" stroke="${C.teal}" stroke-width="3"/><text x="150" y="80" font-size="13" font-weight="bold" fill="${C.teal}">70°</text><text x="250" y="82" font-size="13" font-weight="bold" fill="${C.gold}">110°</text><text x="130" y="128" font-size="13" font-weight="bold" fill="${C.navy}">70 + 110 = 180 degrees</text>`),
    'Polygons': fig('A hexagon has 6 sides and 6 vertices', `<polygon points="220,42 280,68 280,110 220,136 160,110 160,68" fill="${C.sky}" stroke="${C.navy}" stroke-width="2.5"/>${[[220,42],[280,68],[280,110],[220,136],[160,110],[160,68]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${C.coral}" stroke="${C.ink}"/>`).join('')}<text x="300" y="94" font-size="13" font-weight="bold" fill="${C.navy}">6 sides</text>`),
    'Addition': fig('1/3 + 1/6 = 2/6 + 1/6 = 1/2', `<rect x="50" y="52" width="150" height="30" fill="#fff" stroke="${C.navy}"/><rect x="50" y="52" width="50" height="30" fill="${C.mint}"/><text x="205" y="74" font-size="13" fill="${C.navy}">1/3 = 2/6</text><rect x="50" y="92" width="150" height="30" fill="#fff" stroke="${C.navy}"/><rect x="50" y="92" width="25" height="30" fill="${C.gold}"/><text x="205" y="114" font-size="13" fill="${C.navy}">+ 1/6 → 3/6 = 1/2</text>`),
    'Subtraction': fig('3/4 − 1/4 = 2/4 = 1/2', `<rect x="50" y="56" width="300" height="34" fill="#fff" stroke="${C.navy}"/>${[0,1,2,3].map(i => `<line x1="${50 + i * 75}" y1="56" x2="${50 + i * 75}" y2="90" stroke="${C.navy}"/>`).join('')}${[0,1].map(i => `<rect x="${50 + i * 75}" y="56" width="75" height="34" fill="${C.mint}"/>`).join('')}<rect x="200" y="56" width="75" height="34" fill="#f2c9c0"/><line x1="200" y1="56" x2="275" y2="90" stroke="${C.coral}"/><text x="120" y="120" font-size="14" font-weight="bold" fill="${C.navy}">take away 1/4, keep 2/4</text>`),
    'Volume': fig('4 × 3 × 2 = 24 cubic units', `<polygon points="120,70 240,70 300,46 180,46" fill="${C.sky}" stroke="${C.navy}"/><polygon points="240,70 240,120 300,96 300,46" fill="${C.teal}" stroke="${C.navy}"/><rect x="120" y="70" width="120" height="50" fill="#bfe6f2" stroke="${C.navy}"/><text x="150" y="100" font-size="12" fill="${C.navy}">L 4 × W 3</text><text x="255" y="92" font-size="12" fill="#fff">H 2</text><text x="150" y="142" font-size="13" font-weight="bold" fill="${C.navy}">= 24 cubic units</text>`),
    'Conversions': fig('3 feet = 36 inches', `<rect x="40" y="62" width="330" height="24" fill="#fff" stroke="${C.navy}"/>${[0,1,2].map(i => `<line x1="${40 + i * 110}" y1="62" x2="${40 + i * 110}" y2="86" stroke="${C.teal}" stroke-width="2"/><text x="${72 + i * 110}" y="104" font-size="11" fill="${C.navy}">1 ft</text>`).join('')}<text x="120" y="48" font-size="14" font-weight="bold" fill="${C.teal}">3 × 12 = 36 inches</text>`),
    'Layers': fig('12 per layer × 3 layers = 36', `${[0,1,2].map(l => `<g transform="translate(${l * 18},${-l * 26})"><rect x="120" y="80" width="150" height="30" fill="${['#bfe6f2',C.sky,C.teal][l]}" stroke="${C.navy}"/><text x="278" y="100" font-size="11" fill="${C.navy}">layer ${l + 1}</text></g>`).join('')}<text x="90" y="140" font-size="13" font-weight="bold" fill="${C.navy}">12 cubes × 3 layers = 36</text>`),
    'Integers': fig('Integers on a number line', `<line x1="24" y1="80" x2="416" y2="80" stroke="${C.navy}" stroke-width="2"/><polygon points="418,80 408,75 408,85" fill="${C.navy}"/><polygon points="22,80 32,75 32,85" fill="${C.navy}"/>${Array.from({length:11}).map((_,i) => { const v = i - 5; const x = 40 + i * 36; return `<line x1="${x}" y1="73" x2="${x}" y2="87" stroke="${C.navy}"/><text x="${x}" y="104" font-size="10" text-anchor="middle" fill="${v === 0 ? C.coral : C.navy}" font-weight="${v === 0 ? 'bold' : 'normal'}">${v}</text>`; }).join('')}<circle cx="40" cy="80" r="5" fill="${C.coral}" stroke="${C.ink}"/><circle cx="364" cy="80" r="5" fill="${C.teal}" stroke="${C.ink}"/><text x="110" y="46" font-size="12" font-weight="bold" fill="${C.teal}">← smaller     0 in the middle     greater →</text>`),
    'Absolute value': fig('|−5| = 5 (distance from zero)', `<line x1="24" y1="90" x2="416" y2="90" stroke="${C.navy}" stroke-width="2"/><polygon points="418,90 408,85 408,95" fill="${C.navy}"/><polygon points="22,90 32,85 32,95" fill="${C.navy}"/>${Array.from({length:11}).map((_,i) => { const v = i - 5; const x = 40 + i * 36; return `<line x1="${x}" y1="84" x2="${x}" y2="96" stroke="${C.navy}"/><text x="${x}" y="112" font-size="10" text-anchor="middle" fill="${v === 0 ? C.coral : C.navy}" font-weight="${v === 0 ? 'bold' : 'normal'}">${v}</text>`; }).join('')}<circle cx="40" cy="90" r="6" fill="${C.coral}" stroke="${C.ink}"/><line x1="40" y1="66" x2="220" y2="66" stroke="${C.teal}" stroke-width="2.5"/><polygon points="38,66 48,61 48,71" fill="${C.teal}"/><text x="96" y="58" font-size="13" font-weight="bold" fill="${C.teal}">5 steps to zero</text>`),
    'Coordinate plane': fig('Coordinate grid: axes, origin, and four quadrants', `${[-4,-3,-2,-1,0,1,2,3,4].map(i => `<line x1="${220+i*30}" y1="30" x2="${220+i*30}" y2="210" stroke="#d7e6e0"/>`).join('')}${[-3,-2,-1,0,1,2,3].map(j => `<line x1="100" y1="${120-j*30}" x2="340" y2="${120-j*30}" stroke="#d7e6e0"/>`).join('')}<line x1="92" y1="120" x2="348" y2="120" stroke="${C.navy}" stroke-width="2"/><line x1="220" y1="22" x2="220" y2="218" stroke="${C.navy}" stroke-width="2"/><polygon points="350,120 340,115 340,125" fill="${C.navy}"/><polygon points="90,120 100,115 100,125" fill="${C.navy}"/><polygon points="220,20 215,30 225,30" fill="${C.navy}"/><polygon points="220,220 215,210 225,210" fill="${C.navy}"/><text x="354" y="124" font-size="11" font-weight="bold" fill="${C.navy}">x</text><text x="214" y="18" font-size="11" font-weight="bold" fill="${C.navy}">y</text>${[-4,-3,-2,-1,1,2,3,4].map(i => `<text x="${220+i*30}" y="134" font-size="8" fill="${C.navy}" text-anchor="middle">${i}</text>`).join('')}${[-3,-2,-1,1,2,3].map(j => `<text x="211" y="${120-j*30+3}" font-size="8" fill="${C.navy}" text-anchor="middle">${j}</text>`).join('')}<text x="207" y="133" font-size="8" fill="${C.navy}">O</text><text x="312" y="52" font-size="13" font-weight="bold" fill="${C.teal}">I</text><text x="300" y="66" font-size="9" fill="${C.ink}">(+, +)</text><text x="118" y="52" font-size="13" font-weight="bold" fill="${C.teal}">II</text><text x="104" y="66" font-size="9" fill="${C.ink}">(−, +)</text><text x="114" y="188" font-size="13" font-weight="bold" fill="${C.teal}">III</text><text x="104" y="174" font-size="9" fill="${C.ink}">(−, −)</text><text x="300" y="140" font-size="13" font-weight="bold" fill="${C.teal}">IV</text><text x="300" y="154" font-size="9" fill="${C.ink}">(+, −)</text><line x1="220" y1="120" x2="310" y2="120" stroke="${C.teal}" stroke-width="2.5" stroke-dasharray="4 3"/><line x1="310" y1="120" x2="310" y2="180" stroke="${C.gold}" stroke-width="2.5" stroke-dasharray="4 3"/><text x="244" y="114" font-size="9" font-weight="bold" fill="${C.teal}">right 3</text><text x="314" y="158" font-size="9" font-weight="bold" fill="${C.gold}">down 2</text><circle cx="310" cy="180" r="6" fill="${C.coral}" stroke="${C.ink}"/><text x="268" y="200" font-size="11" font-weight="bold" fill="${C.navy}">Point (3, −2) is in Quadrant IV</text>`, 224),
    'Fraction multiplication': fig('3/4 × 4 = 12/4 = 3', `${[0,1,2,3].map(g => `<rect x="${40 + g * 96}" y="56" width="80" height="30" fill="#fff" stroke="${C.navy}"/>${[0,1,2].map(i => `<rect x="${40 + g * 96 + i * 20}" y="56" width="20" height="30" fill="${C.gold}"/>`).join('')}<line x1="${40 + g * 96 + 60}" y1="56" x2="${40 + g * 96 + 60}" y2="86" stroke="${C.navy}"/>`).join('')}<text x="120" y="118" font-size="14" font-weight="bold" fill="${C.teal}">4 groups of 3/4 = 3 wholes</text>`),
    'Decimal operations': fig('2.4 ÷ 0.3 = 8', `<text x="70" y="82" font-size="26" font-family="Arial" font-weight="bold" fill="${C.navy}">2.4 ÷ 0.3</text><text x="270" y="82" font-size="26" font-family="Arial" font-weight="bold" fill="${C.teal}">= 8</text><text x="70" y="118" font-size="13" fill="${C.ink}">24 tenths ÷ 3 tenths = 8</text>`)
  };
}
const conceptVisualMap = conceptVisuals();
function visualForConcept(concept) { return conceptVisualMap[concept] || fig(concept, `<text x="60" y="86" font-size="16" font-weight="bold" fill="${C.navy}">${concept}</text>`); }
const conceptCases = {
  'Place value': [['Zero as a placeholder', 'In 305,072 the 0 in the thousands place holds the spot so the other digits keep their value, even though it adds nothing.'], ['Compare same-length numbers', 'For 45,210 and 45,120, start at the left and stop at the first place that differs. Here 2 hundreds beats 1 hundred.'], ['Say it in words', '642,908 is six hundred forty-two thousand, nine hundred eight.']],
  'Rounding': [['Round down', '386,499 to the nearest thousand is 386,000 because the hundreds digit 4 is less than 5.'], ['Round up', '386,749 to the nearest thousand is 387,000 because the hundreds digit is 7.'], ['The exact-5 rule', '386,500 rounds up to 387,000. A 5 in the checking place always rounds up.'], ['A 9 that carries', '386,950 to the nearest hundred becomes 387,000 because the extra hundred rolls into the thousands.']],
  'Add & subtract': [['Regroup once', '4,786 + 2,549: the ones make 15, so write 5 and carry 1 ten.'], ['Subtract across zeros', '5,003 − 1,478 has no tens or hundreds to borrow, so regroup from the thousands first.'], ['No regrouping', '5,321 + 2,146 needs no carrying because no column reaches ten.']],
  'Arrays': [['Turn it around', '3 × 4 and 4 × 3 both equal 12. Rotating the array keeps the total.'], ['A single row', '1 × 7 is just one row of 7.'], ['Build up', '5 rows of 6 is 5 × 6 = 30.']],
  'Area models': [['Two-digit by one-digit', '23 × 4 = (20×4) + (3×4) = 80 + 12 = 92.'], ['Two-digit by two-digit', '24 × 13 = (24×10) + (24×3) = 240 + 72 = 312.'], ['Add every part', 'Every rectangle counts; add all partial products.']],
  'Multi-digit products': [['Regroup as you go', '1,426 × 3: multiply each place and carry when a product passes nine.'], ['A zero inside', '1,206 × 4: the 0 tens still gets multiplied, giving 0 plus any carry.'], ['Estimate to check', '1,426 × 3 ≈ 1,400 × 3 = 4,200, so 4,278 is reasonable.']],
  'Equal groups': [['Shares evenly', '84 ÷ 6 = 14 with nothing left over.'], ['Leftover pieces', '85 ÷ 6 = 14 remainder 1.'], ['Check by multiplying', '6 × 14 = 84 proves the quotient.']],
  'Long division': [['Standard case', '864 ÷ 4 = 216, dividing hundreds, tens, then ones.'], ['Zero in the quotient', '816 ÷ 4 = 204, because 1 ten cannot be shared into 4 groups.'], ['Ends with a remainder', '865 ÷ 4 = 216 remainder 1.']],
  'Remainders': [['Round up', '29 students in vans of 6 need 5 vans, because the leftover 5 still ride.'], ['Drop it', '29 candies shared by 6 friends is 4 each; the extra 5 are set aside.'], ['Share as a fraction', '29 ÷ 6 can be written as 4 5/6 when the remainder is split.']],
  'Multi-step plans': [['Multiply then subtract', '6 boxes × 24 pencils = 144, then 144 − 17 = 127.'], ['Add then divide', '(12 + 18) ÷ 5 = 30 ÷ 5 = 6.'], ['Label each step', 'Write a small equation per step so you do not lose track.']],
  'Variables': [['Addition equation', 'n + 36 = 91 → n = 91 − 36 = 55.'], ['Subtraction equation', 'n − 12 = 30 → n = 30 + 12 = 42.'], ['Multiplication equation', '4n = 24 → n = 24 ÷ 4 = 6.']],
  'Factors': [['Composite', '24 has many factors, so it is composite.'], ['Prime', '23 has only 1 and 23, so it is prime.'], ['Special number 1', '1 has a single factor, so it is neither prime nor composite.']],
  'Unit conversions': [['Bigger to smaller', '4 feet × 12 = 48 inches; the number grows.'], ['Smaller to bigger', '48 inches ÷ 12 = 4 feet; the number shrinks.'], ['Write the fact first', 'Start with the relationship, like 1 foot = 12 inches.']],
  'Time and volume': [['Time', '3 minutes = 3 × 60 = 180 seconds.'], ['Mass', '3 kilograms = 3,000 grams.'], ['Capacity', '2 gallons = 8 quarts.']],
  'Area & perimeter': [['Find both', 'A 7 × 4 rectangle has area 28 and perimeter 22.'], ['Same perimeter, different area', 'A 6×2 and a 4×4 both have perimeter 16, but areas 12 and 16.'], ['Find a missing side', 'Area 28 with width 4 means length 28 ÷ 4 = 7.']],
  'Equivalent fractions': [['Build up', '1/2 = 2/4 = 4/8 by multiplying top and bottom.'], ['Simplify down', '6/8 = 3/4 by dividing top and bottom by 2.'], ['Compare fairly', '1/2 and 3/5 become 5/10 and 6/10, so 3/5 is greater.']],
  'Adding fractions': [['Like denominators', '3/8 + 2/8 = 5/8.'], ['Past one whole', '5/6 + 3/6 = 8/6 = 1 1/3.'], ['Keep the size', 'The denominator never changes when denominators already match.']],
  'Subtracting fractions': [['Like denominators', '7/10 − 3/10 = 4/10 = 2/5.'], ['From one whole', '1 − 3/8 = 8/8 − 3/8 = 5/8.'], ['Simplify', '4/10 shares a factor of 2, so it becomes 2/5.']],
  'Fraction groups': [['Whole-number result', '3 × 2/5 = 6/5 = 1 1/5.'], ['Stays a fraction', '2 × 1/6 = 2/6 = 1/3.'], ['Model the groups', 'Draw the fraction that many times, then combine.']],
  'Tenths & hundredths': [['Tenths', '0.7 means 7/10.'], ['Hundredths', '0.35 means 35/100.'], ['Equal decimals', '0.3 and 0.30 name the same amount.']],
  'Compare decimals': [['Same length', '0.75 > 0.70 because 75 hundredths beats 70.'], ['Different lengths', '0.6 vs 0.06: line up as 0.60 and 0.06, so 0.60 is greater.'], ['Equal values', '0.5 = 0.50 after adding a placeholder zero.']],
  'Lines': [['Name the figure', 'A line has two arrows, a segment two endpoints, a ray one endpoint.'], ['Parallel', 'Two lines that never meet, like train tracks.'], ['Perpendicular', 'Two lines that cross at a square 90° corner.']],
  'Angles': [['Acute', 'Smaller than a square corner, like 45°.'], ['Right', 'Exactly a square corner, 90°.'], ['Obtuse and straight', 'Obtuse is between 90° and 180°; a straight angle is exactly 180°.']],
  'Symmetry': [['No lines', 'A scalene triangle has 0 lines of symmetry.'], ['One line', 'An isosceles triangle has exactly 1 line of symmetry.'], ['Many lines', 'A square has 4 lines of symmetry.']],
  'Expressions': [['Parentheses first', '(8 + 2) × 5 = 10 × 5 = 50.'], ['No parentheses', '8 + 2 × 5 = 8 + 10 = 18, because you multiply before adding.'], ['Work inside out', 'Solve the innermost group first.']],
  'Perimeter': [['Add all sides', 'A 6 by 4 rectangle: 6+4+6+4 = 20.'], ['Square shortcut', 'A square with side 5 is 4 × 5 = 20.'], ['Irregular shape', 'Add every side length, even the short ones.']],
  'Area': [['Rectangle', '6 × 4 = 24 square units.'], ['Square', 'Side 5 gives 5 × 5 = 25 square units.'], ['Missing side', 'Area 24 with length 6 means width 24 ÷ 6 = 4.']],
  'Whole numbers': [['Add in columns', '47,891 + 23,109 = 71,000.'], ['Subtract across zeros', '40,000 − 12,345 borrows through the zeros.'], ['Estimate first', 'Round to check that the answer is sensible.']],
  'Decimals': [['Add', '3.40 + 0.65 = 4.05.'], ['Subtract', '5.20 − 1.75 = 3.45.'], ['Different lengths', 'Line up points and add zeros: 3.4 becomes 3.40.']],
  'Straight lines': [['Find the partner', 'If one angle is 70°, the other is 110°.'], ['Check the total', 'The two angles must add to exactly 180°.'], ['Right-angle split', 'Two 90° angles also make a straight line.']],
  'Polygons': [['Name by sides', '3 sides is a triangle, 4 a quadrilateral, 5 a pentagon, 6 a hexagon.'], ['Regular vs irregular', 'A regular hexagon has equal sides; an irregular one does not.'], ['Not a polygon', 'A shape with a curve or a gap is not a polygon.']],
  'Addition': [['Common denominator', '1/3 + 1/6 = 2/6 + 1/6 = 1/2.'], ['Sum to one', '1/4 + 3/4 = 4/4 = 1.'], ['Rename first', 'Change unlike denominators before adding.']],
  'Subtraction': [['Common denominator', '3/4 − 1/4 = 2/4 = 1/2.'], ['Unlike denominators', '5/6 − 1/3 = 5/6 − 2/6 = 1/2.'], ['Simplify', 'Reduce the final fraction when possible.']],
  'Volume': [['Multiply three', '4 × 3 × 2 = 24 cubic units.'], ['Count cubes', 'A layer of 12 with 2 layers is 24.'], ['Missing dimension', 'Volume 24 with a base of 12 means height 24 ÷ 12 = 2.']],
  'Conversions': [['Length', '3 feet = 36 inches.'], ['Capacity', '2 liters = 2,000 milliliters.'], ['Direction', 'Bigger to smaller multiplies; smaller to bigger divides.']],
  'Layers': [['Equal layers', '12 cubes per layer × 3 = 36 cubic units.'], ['More layers', '12 × 5 = 60 cubic units.'], ['Find layers', '36 cubes with 12 per layer means 3 layers.']],
  'Integers': [['Order', '−3 is left of 0 and less than 4.'], ['Compare negatives', '−2 > −5 because it is closer to zero.'], ['Zero', 'Zero is neither positive nor negative.']],
  'Absolute value': [['Negative input', '|−5| = 5.'], ['Positive input', '|5| = 5.'], ['Zero', '|0| = 0, since it sits on zero.']],
  'Coordinate plane': [['Quadrant I', '(3, 2) is right and up.'], ['Quadrant IV', '(3, −2) is right and down.'], ['On an axis', '(0, 4) sits on the y-axis; (−5, 0) sits on the x-axis.']],
  'Fraction multiplication': [['Whole result', '3/4 × 4 = 12/4 = 3.'], ['Mixed result', '2/3 × 5 = 10/3 = 3 1/3.'], ['Simplify', 'Reduce or convert to a mixed number at the end.']],
  'Decimal operations': [['Divide', '2.4 ÷ 0.3 = 8.'], ['Multiply', '2.4 × 3.5 = 8.40.'], ['Estimate', 'Estimate first so the decimal point lands correctly.']]
};
function casesForConcept(concept) { const cases = conceptCases[concept]; return cases ? `<div class="concept-cases"><p class="cases-heading">Explore every case</p><div class="case-grid">${cases.map(([title, text]) => `<div class="case-card"><b>${title}</b><span>${text}</span></div>`).join('')}</div></div>` : ''; }
function startChapter(index) { state.chapter = index; state.concept = null; state.question = 0; state.attempts = 0; const key = `${state.subject}-${state.grade}-${index}`; if (!state.started.includes(key)) { state.started.push(key); save(); } $('#emptyState').hidden = true; $('#lessonView').hidden = false; renderConceptPicker(); renderChapters(); $('#playground').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function renderConceptPicker() { const chapter = currentChapter(); const completed = chapter[1].filter((_, index) => isConceptComplete(index)).length; const earnedChapterCoin = chapterCoin(state.chapter); const intro = earnedChapterCoin ? `<span class="chapter-coin ${earnedChapterCoin.toLowerCase()}">${coinSymbols[earnedChapterCoin]} ${earnedChapterCoin} chapter coin earned</span>` : isReading() ? `Read all ${chapter[1].length} stories to complete this collection. ${completed} of ${chapter[1].length} stories complete.` : isSocial() ? `Read the detailed chapter lesson, then answer 20 questions. ${completed} of ${chapter[1].length} chapters complete.` : `Complete all three skill missions to finish this chapter. ${completed} of ${chapter[1].length} sections complete.`; const cards = chapter[1].map((concept,index) => { const coin = sectionCoin(index); const title = isReading() ? concept.title : isSocial() ? `${chapter[0]} Lesson` : concept; const subtitle = coin ? `${coin} coin earned - practice again` : isReading() ? 'Read story + 5 questions' : isSocial() ? 'Detailed lesson + 20 questions' : '20-question mission, easy to expert'; const thumbnail = isReading() ? readingVisualMarkup(concept, chapter[0], true) : ''; return `<button class="concept-choice ${coin ? 'section-complete' : ''}" data-start-concept="${index}">${thumbnail}<span>${coin ? coinSymbols[coin] : index + 1}</span><strong>${title}</strong><small>${subtitle}</small></button>`; }).join(''); $('#lessonView').innerHTML = `<section class="lesson-panel concept-picker ${isReading() ? 'reading-library' : ''}"><p class="chapter-label">Chapter ${state.chapter + 1}</p><h2>${chapter[0]}</h2><p class="lesson-copy">${intro}</p><div class="concept-choice-grid">${cards}</div></section>`; document.querySelectorAll('[data-start-concept]').forEach(button => button.addEventListener('click', () => { state.concept=Number(button.dataset.startConcept); state.question=0; state.attempts=0; state.answers={}; state.wrongChoices={}; renderLesson(); })); }
function placeValueVisual() { return `<div class="place-chart"><div class="chart-number">582,641</div><div class="chart-row"><b>Hundred-thousands</b><b>Ten-thousands</b><b>Thousands</b><b>Hundreds</b><b>Tens</b><b>Ones</b></div><div class="chart-row chart-values"><span>5<br><small>500,000</small></span><span class="focus">8<br><small>80,000</small></span><span>2<br><small>2,000</small></span><span>6<br><small>600</small></span><span>4<br><small>40</small></span><span>1<br><small>1</small></span></div></div>`; }
function renderLesson() {
  state.processingAnswer = false;
  const chapter = currentChapter(), story = currentStory(), question = currentQuestion(), concept = currentConceptName(), complete = state.answers[state.question], completedQuestions = Object.keys(state.answers).length, missionTotal = currentQuestions().length, reading = isReading();
  const socialLesson = `<article class="social-lesson"><p class="reading-label">Chapter overview</p><p>${chapter[2]}</p><div class="social-facts">${socialFacts().map(([topic, detail, importance]) => `<section><h3>${topic}</h3><p>${detail}</p><p><strong>Why it matters:</strong> ${importance}.</p></section>`).join('')}</div></article>`;
  const lesson = reading ? `${readingVisualMarkup(story, chapter[0])}<article class="reading-passage"><p class="reading-label">Read the story carefully</p>${story.passage.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}</article>` : isSocial() ? socialLesson : state.grade === 4 && state.chapter === 0 && state.concept === 0 ? '<p class="lesson-copy"><strong>Place value tells us what a digit is worth because of where it sits.</strong> The digit 8 in 582,641 is not worth eight. It is in the ten-thousands place, so it is worth 80,000. Each step left is 10 times greater; each step right is 10 times smaller.</p>' + placeValueVisual() + '<p class="lesson-copy"><strong>Read it in chunks:</strong> 582,641 is five hundred eighty-two thousand, six hundred forty-one. Use the chart to name a digit, write a number, compare numbers, or build expanded form.</p>' + casesForConcept('Place value') : `${lessonForConcept(concept, chapter[2])}${visualForConcept(concept)}${casesForConcept(concept)}`;
  const previousLabel = reading ? '← Previous story' : isSocial() ? '← Previous chapter' : '← Previous concept', nextLabel = reading ? 'Next story →' : isSocial() ? 'Next chapter →' : 'Next concept →', libraryLabel = reading ? '← All stories' : isSocial() ? '← All chapters' : '← All concepts', missionLabel = reading ? 'Reading comprehension' : isSocial() ? 'Social Studies lesson' : 'Concept mission', tip = reading ? 'Read the passage again and use details from the text to support your answer.' : isSocial() ? 'Review each bold concept and use the chapter details to support your answer.' : 'Use the model, then explain to yourself why the answer makes sense.';
  $('#lessonView').innerHTML = `<div class="lesson-layout"><section class="lesson-panel"><p class="chapter-label">Chapter ${state.chapter + 1} · ${missionLabel}</p><div class="concept-mission-nav"><button class="text-button" id="backToConcepts">${libraryLabel}</button><span>${state.concept + 1} of ${chapter[1].length}</span></div><h2>${concept}</h2>${lesson}<p class="lesson-copy"><strong>Mission tip:</strong> ${tip}</p><div class="concept-arrows"><button class="primary-button muted-button" id="previousConcept" ${state.concept===0?'disabled':''}>${previousLabel}</button><button class="primary-button" id="nextConcept" ${state.concept===chapter[1].length-1?'disabled':''}>${nextLabel}</button></div></section><section class="question-panel"><div class="question-meta"><span>Question ${state.question + 1} of ${missionTotal}</span><span class="level-badge level-${question.level.toLowerCase()}">${question.level}</span><span class="attempt-dots">${[0, 1, 2].map(index => `<i class="${index < state.attempts ? 'used' : ''}"></i>`).join('')}</span></div><div class="section-progress"><strong>${completedQuestions} / ${missionTotal} completed</strong><span>${completedQuestions === missionTotal ? 'Section complete!' : 'Keep going - every question counts.'}</span></div><div class="question-nav">${currentQuestions().map((_,index) => `<button data-go="${index}" class="nav-dot ${index===state.question?'active':''} ${state.answers[index]?'done':''}" title="Question ${index + 1}">${index + 1}</button>`).join('')}</div><h2>${question.question}</h2>${answerMarkup(question, complete)}<p class="feedback" id="feedback">${complete ? 'Completed! Choose another question or continue your section.' : reading ? 'Choose the answer best supported by the passage.' : 'Choose the answer that makes the math story true.'}</p><div class="question-arrows"><button class="icon-button" id="previousQuestion" ${state.question===0?'disabled':''} title="Previous question">←</button><button class="icon-button" id="nextQuestion" ${state.question===missionTotal-1?'disabled':''} title="Next question">→</button></div></section></div>`;
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => { state.question=Number(button.dataset.go); state.attempts=0; renderLesson(); }));
  $('#previousQuestion').addEventListener('click', () => { state.question--; state.attempts=0; renderLesson(); }); $('#nextQuestion').addEventListener('click', () => { state.question++; state.attempts=0; renderLesson(); });
  $('#backToConcepts').addEventListener('click', renderConceptPicker);
  $('#previousConcept').addEventListener('click', () => { state.concept--; state.question=0; state.attempts=0; state.answers={}; state.wrongChoices={}; renderLesson(); });
  $('#nextConcept').addEventListener('click', () => { state.concept++; state.question=0; state.attempts=0; state.answers={}; state.wrongChoices={}; renderLesson(); });
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => checkAnswer(button, question)));
}
const celebrations = ['🎉 Correct! You nailed it!', '🏆 Champion move! Keep going!', '⭐ Star work! That was sharp!', '🌟 Brilliant! Your brain is glowing!', '✨ Magical math! Well done!', '🚀 Blast off! Straight to the answer!', '💪 Strong thinking! You have got this!', '🔥 On fire! That was hot!', '👏 Bravo! Perfectly solved!', '🥳 Woohoo! You did it!', '🎯 Bullseye! Right on target!', '🧠 Big brain energy! Nice!', '💡 Bright idea! Spot on!', '👍 Thumbs up! Great choice!', '😎 Cool and correct!', '🙌 High five! Amazing!', '🏅 Gold-medal math!', '💯 One hundred percent right!', '⚡ Lightning fast and correct!', '🌈 Beautiful work!', '🦄 Magically correct!', '🎊 Party time! You got it!', '🍀 Lucky and smart!', '👑 Math royalty! Superb!', '💎 A diamond answer!', '🚩 Flag it — that is a win!', '🎉 Yes! Exactly right!', '🏆 Winner! Keep climbing!', '⭐ Shining bright! Correct!', '🌟 Superstar solving!', '✨ Sparkling smart!', '🚀 You are rocketing ahead!', '💪 Powerful thinking!', '🔥 Red hot and right!', '👏 Clap clap! Well earned!', '🥳 Celebrate — you are correct!', '🎯 Dead center! Nice aim!', '🧠 Smart cookie! Correct!', '💡 Lightbulb moment! Yes!', '👍 Nailed it! Great job!', '😎 Smooth solving!', '🙌 Fantastic! Keep it up!', '🏅 Medal-worthy answer!', '💯 Perfect! Totally right!', '⚡ Zap! Correct in a flash!', '🌈 Colorful thinking! Yes!', '🦄 One-of-a-kind smart!', '🎊 Confetti for you!', '🍀 Clever clover! Correct!', '👑 You rule this math!', '💎 Precious and precise!', '🎉 Hooray! You solved it!', '🏆 Top of the class!', '⭐ You earned a star!', '🌟 Glowing with genius!', '✨ Pure math magic!', '🚀 Sky-high skills!', '💪 Muscle up — correct!', '🔥 Blazing brilliant!', '👏 Give yourself a hand!', '🥳 Big win! Yes!', '🎯 Right on the mark!', '🧠 Genius alert! Correct!', '💡 So bright! Well done!', '👍 Great pick! Correct!', '😎 You made it look easy!', '🙌 Way to go!', '🏅 A winner answer!', '💯 Flawless! Correct!', '⚡ Super quick and right!', '🌈 Over the rainbow!', '🦄 Unbelievably good!', '🎊 Time to celebrate!', '🍀 Fortune favors the smart!', '👑 Crowned correct!', '💎 Shiny and correct!', '🎉 That is the one! Yes!', '🏆 Trophy-level thinking!', '⭐ You are a star solver!', '🌟 Dazzling! Correct!', '✨ Twinkling talent!', '🚀 Full speed to success!', '💪 Mighty math move!', '🔥 You are heating up!', '👏 Standing ovation!', '🥳 Party for your brain!', '🎯 Perfect aim again!', '🧠 Brainpower unlocked!', '💡 Genius spark! Correct!', '👍 Right again! Awesome!', '😎 Effortlessly correct!', '🙌 You are unstoppable!', '🏅 Champion answer!', '💯 Spot-on! Correct!', '⚡ Electric! Right answer!', '🌈 Bright and correct!', '🦄 Rare brilliance!', '🎊 Cheers to you!', '🍀 Smartly done!', '🌟 Amazing! On to the next!'];
function celebrate() { return celebrations[Math.floor(Math.random() * celebrations.length)]; }
function checkAnswer(button, question) {
  if (state.processingAnswer) return;
  state.processingAnswer = true;
  const right = question.correct;
  if (button.dataset.answer === right) {
    button.classList.add('correct'); document.querySelectorAll('[data-answer]').forEach(answer => answer.disabled = true); state.sparks += 1; state.answers[state.question]='correct'; save(); $('#sparkCount').textContent = `${state.sparks} sparks`; $('#feedback').innerHTML = `<span class="cheer">${celebrate()}</span>`; if (Object.keys(state.answers).length === currentQuestions().length) setTimeout(showResults, 700); return;
  }
  const wrongAnswer = button.dataset.answer;
  const wrongChoices = state.wrongChoices[state.question] || [];
  if (wrongChoices.includes(wrongAnswer)) return;
  wrongChoices.push(wrongAnswer);
  state.wrongChoices[state.question] = wrongChoices;
  button.classList.add('wrong'); button.disabled = true; state.attempts = wrongChoices.length;
  if (state.attempts === 1) setTimeout(() => { state.processingAnswer = false; }, 0);
  if (state.attempts >= 2 && state.attempts < 3) { const concept = currentConceptName(); document.querySelectorAll('[data-answer]').forEach(answer => answer.disabled = true); $('#reteachTitle').textContent = 'Let’s look at the idea again'; $('#reteachModal').hidden = false; $('#reteachContent').innerHTML = isReading() ? `<article class="reading-passage"><p class="reading-label">Read this part again</p><p>${currentStory().passage}</p></article><p class="lesson-copy"><strong>Try a fresh approach:</strong> Find a detail in the passage that supports the best answer.</p>` : `${lessonForConcept(concept, currentChapter()[2])}${visualForConcept(concept)}<p class="lesson-copy"><strong>Try a fresh approach:</strong> Look at the picture, then match the numbers in the question to the model.</p>`; }
  else { document.querySelectorAll('[data-answer]').forEach(answer => answer.disabled = true); $('#feedback').innerHTML = `<strong>The answer is ${right}.</strong><div class="solution-box">${explain(question)}</div><button class="primary-button" id="continueButton">Continue to the next challenge</button>`; $('#continueButton').addEventListener('click', () => { state.answers[state.question] = 'guided'; state.attempts = 0; const total = currentQuestions().length; if (Object.keys(state.answers).length === total) showResults(); else { state.question = Math.min(state.question + 1, total - 1); renderLesson(); } }); }
}
function explain(question) { return `Use the concept model step by step. The answer that fits the question is <strong>${question.correct}</strong>.`; }
function showResults() { const total = currentQuestions().length; const correct = Object.values(state.answers).filter(result => result === 'correct').length; const tier = correct >= total * 0.9 ? ['Diamond','◆','Outstanding precision. You are ready for a tougher mission.'] : correct >= total * 0.7 ? ['Gold','★','Excellent work. Your practice is paying off.'] : correct >= total * 0.5 ? ['Silver','●','Strong persistence. Keep building this skill.'] : ['Bronze','▲','You stayed with it. Practice turns effort into power.']; const key = completedConceptKey(), title = currentConceptName(); if (!state.completedConcepts.includes(key)) { state.completedConcepts.push(key); state.trophies.push({ tier:tier[0], symbol:tier[1], concept:title }); } state.sectionRewards[sectionRewardKey()] = tier[0]; save(); renderChapters(); const chapter = currentChapter(); const earnedChapterCoin = chapterCoin(state.chapter); const nextTitle = state.concept < chapter[1].length - 1 ? (isReading() ? chapter[1][state.concept + 1].title : chapter[1][state.concept + 1]) : ''; const nextLabel = state.concept < chapter[1].length - 1 ? `Start next ${isReading() ? 'story' : 'section'}: ${nextTitle} →` : 'View completed sections'; $('#lessonView').innerHTML=`<section class="lesson-panel success-card"><div class="trophy ${tier[0].toLowerCase()}">${tier[1]}</div><p class="eyebrow">${isReading() ? 'Story' : 'Section'} complete</p><h2>${tier[0]} coin earned</h2><div class="marks-card"><strong>Mark: ${correct} / ${total}</strong><span>Completed: ${title}</span></div><p class="lesson-copy">${tier[2]}</p><p class="lesson-copy">This ${isReading() ? 'story' : 'section'} now carries its ${tier[0]} coin in the chapter list. ${earnedChapterCoin ? `All items are complete - your chapter earned a ${earnedChapterCoin} coin!` : `Complete the remaining ${isReading() ? 'stories' : 'sections'} to earn the chapter coin.`}</p><div class="result-actions"><button class="primary-button" id="nextSection">${nextLabel}</button><button class="primary-button muted-button" id="backToConcepts">All ${isReading() ? 'stories' : 'sections'}</button></div></section>`; $('#backToConcepts').addEventListener('click',renderConceptPicker); $('#nextSection').addEventListener('click', () => { if (state.concept < chapter[1].length - 1) { state.concept++; state.question=0; state.attempts=0; state.answers={}; state.wrongChoices={}; renderLesson(); } else renderConceptPicker(); }); }
const rewardValues = Object.freeze({ Diamond: 40, Gold: 25, Silver: 12, Bronze: 5 });
function rewardMessage(tier, count) { const amount = count * rewardValues[tier]; const total = state.trophies.reduce((sum, trophy) => sum + rewardValues[trophy.tier], 0); return `${tier} coin reward: $${amount}. You have earned ${count} ${tier.toLowerCase()} ${count === 1 ? 'coin' : 'coins'} so far. Ask your parents to consider setting aside $${amount} from this reward toward your future education fund. Your total learning fund is now $${total}.`; }
function renderRewards() { const counts = ['Diamond','Gold','Silver','Bronze'].map(tier => [tier, state.trophies.filter(item => item.tier === tier).length]); const total = counts.reduce((sum, [tier, count]) => sum + count * rewardValues[tier], 0); $('#rewardsContent').innerHTML = `<section class="learning-fund"><p>Future learning fund</p><strong>$${total}</strong><span>Built from your completed skill rewards</span></section><div class="reward-totals">${counts.map(([tier,count]) => `<button class="reward-coin ${tier.toLowerCase()}" data-reward-tier="${tier}"><span>${tier === 'Diamond' ? '◆' : tier === 'Gold' ? '★' : tier === 'Silver' ? '●' : '▲'}</span><b>${tier}</b><strong>${count}</strong><small>$${count * rewardValues[tier]}</small></button>`).join('')}</div><div id="rewardMessage" class="reward-message">Choose a coin to see how its reward can grow your future learning fund.</div>${state.trophies.length ? `<div class="trophy-list">${state.trophies.slice().reverse().map(item => `<div class="trophy-item ${item.tier.toLowerCase()}"><span>${item.symbol}</span><div><b>${item.tier} trophy</b><small>${item.concept}</small></div></div>`).join('')}</div>` : '<p class="lesson-copy">Your cabinet is waiting. Complete a 20-question concept mission to earn your first trophy.</p>'}`; document.querySelectorAll('[data-reward-tier]').forEach(button => button.addEventListener('click', () => { const tier = button.dataset.rewardTier; const count = state.trophies.filter(item => item.tier === tier).length; $('#rewardMessage').textContent = rewardMessage(tier, count); document.querySelectorAll('[data-reward-tier]').forEach(item => item.classList.toggle('selected', item === button)); })); }
$('#tryAgain').addEventListener('click', () => { $('#reteachModal').hidden = true; renderLesson(); });
$('#openRewards').addEventListener('click', () => { renderRewards(); $('#rewardsModal').hidden = false; });
$('#closeRewards').addEventListener('click', () => { $('#rewardsModal').hidden = true; });
$('#resetProgress').addEventListener('click', () => { state.sparks = 0; state.started = []; state.completedConcepts = []; state.sectionRewards = {}; state.trophies = []; save(); $('#sparkCount').textContent = '0 sparks'; renderChapters(); });
window.NumberQuestTestAPI = Object.freeze({
  course,
  readingCourse,
  socialCourse,
  conceptLessons,
  conceptCases,
  conceptVisualMap,
  missionQuestionsFor,
  readingQuestionsFor,
  readingVisualFor,
  forceReadingImageLoad,
  socialQuestionsFor
});
const schoolButton = $('#schoolButton');
const schoolMenu = $('#schoolMenu');
schoolButton.addEventListener('click', () => {
  const open = schoolMenu.hidden;
  schoolMenu.hidden = !open;
  schoolButton.setAttribute('aria-expanded', String(open));
});
function selectSchoolLevel(level) {
  state.schoolLevel = level;
  document.querySelectorAll('[data-school]').forEach(item => item.classList.toggle('active', item.dataset.school === level));
  const isHigh = level === 'high';
  $('#subjectNav').hidden = isHigh;
  $('#chapterSection').hidden = isHigh;
  $('#playground').hidden = isHigh;
  $('#apSection').hidden = !isHigh;
  if (isHigh) {
    renderApCatalog();
  } else {
    const range = currentGradeRange();
    if (!range.includes(state.grade)) state.grade = range.find(grade => gradeHasContent(grade)) || range[0];
    if (!subjectHasContent(state.subject, state.grade)) state.subject = (subjects.find(subject => chaptersFor(subject.id, state.grade)) || {}).id || subjects[0].id;
    resetToChapters(); renderGradeRail(); renderSubjectTabs(); renderChapters();
  }
  schoolMenu.hidden = true;
  schoolButton.setAttribute('aria-expanded', 'false');
}
document.querySelectorAll('[data-school]').forEach(item => item.addEventListener('click', event => {
  event.preventDefault();
  selectSchoolLevel(item.dataset.school);
}));
document.addEventListener('click', event => {
  if (event.target.closest('.school-menu')) return;
  schoolMenu.hidden = true;
  schoolButton.setAttribute('aria-expanded', 'false');
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  schoolMenu.hidden = true;
  schoolButton.setAttribute('aria-expanded', 'false');
});
$('#sparkCount').textContent = `${state.sparks} sparks`; renderSubjectTabs(); renderGradeRail(); renderChapters();