(() => {
  const chapter = (title, overview, facts) => ({ title, overview, facts });

  const grade4 = [
    chapter('Exploring the United States', 'The United States can be studied with maps, globes, climate data, and physical features. Geographers use tools to explain where places are, what the land is like, and how people adapt to their environment.', [
      ['Map keys and symbols', 'A map key explains what colors, shapes, and symbols mean on a map.', 'help readers understand map information correctly'],
      ['Cardinal directions', 'North, south, east, and west are cardinal directions used to describe location.', 'help people give clear directions'],
      ['Hemispheres', 'The United States is in the Northern Hemisphere and mostly in the Western Hemisphere.', 'place the country on a globe'],
      ['Landforms', 'Mountains, plains, plateaus, valleys, and coastal plains are major landforms.', 'shape where people travel, farm, and build communities'],
      ['Bodies of water', 'Rivers, lakes, oceans, and gulfs provide water, transportation, food, and recreation.', 'connect people and natural resources'],
      ['Climate', 'Climate is the usual weather pattern in a place over many years.', 'influence clothing, crops, homes, and daily activities'],
      ['Latitude and longitude', 'Latitude lines run east and west while longitude lines run north and south.', 'help locate an exact place on Earth'],
      ['Map scale', 'A map scale compares a distance on a map with a real distance.', 'help readers estimate how far places are apart'],
      ['Natural resources', 'Natural resources include water, soil, forests, minerals, sunlight, and wind.', 'provide materials and energy people use'],
      ['Human-environment interaction', 'People change environments by building roads, farms, dams, and cities, while environments affect human choices.', 'show the relationship between people and place']
    ]),
    chapter('The Northeast Region', 'The Northeast is a region with rocky coastlines, forests, busy cities, early European settlements, and important industries. Its location near the Atlantic Ocean shaped trade, fishing, and immigration.', [
      ['Location', 'The Northeast includes states in the northeastern part of the United States near the Atlantic Ocean and Great Lakes.', 'explain its connection to water routes and nearby markets'],
      ['Landforms', 'The Appalachian Mountains, rocky coasts, and river valleys are important Northeast landforms.', 'affect travel, settlement, and resources'],
      ['Natural resources', 'Forests, fishing grounds, granite, and waterways are important regional resources.', 'support jobs and trade'],
      ['Early settlement', 'Many early European settlements were built along the Atlantic coast and navigable rivers.', 'show why waterways were important to colonists'],
      ['Harbors', 'Deep natural harbors helped cities such as Boston and New York become trade centers.', 'allow ships to carry people and goods'],
      ['Economy', 'The region has manufacturing, finance, education, technology, fishing, and tourism.', 'show that a regional economy can use many different jobs'],
      ['Climate', 'The Northeast has four distinct seasons and can have cold, snowy winters.', 'affect farming, travel, and recreation'],
      ['Cities', 'Large cities grew where transportation routes, jobs, and ports brought people together.', 'make the region densely populated in many areas'],
      ['Immigration', 'Many immigrants arrived through Northeast ports and added languages, foods, skills, and traditions.', 'shape the culture of cities and towns'],
      ['Interdependence', 'Northeast businesses trade goods and services with other U.S. regions.', 'show how regions depend on one another']
    ]),
    chapter('The Southeast Region', 'The Southeast includes warm coastal areas, forests, rivers, farms, growing cities, and a complex history. Its geography and climate supported agriculture while its people built many modern industries.', [
      ['Location', 'The Southeast lies south of the Northeast and includes Atlantic and Gulf Coast states.', 'connect the region to warm waters and coastal trade'],
      ['Coastal plains', 'Broad coastal plains and wetlands stretch along much of the Southeast coast.', 'provide habitats, farmland, and ports'],
      ['Climate', 'Much of the Southeast has hot summers, mild winters, and frequent rain.', 'support a long growing season'],
      ['Agriculture', 'Cotton, peanuts, citrus, rice, poultry, and many other products have been important to the region.', 'show how climate and soil support farming'],
      ['Plantations and slavery', 'Some large plantations depended on enslaved labor, an unjust system that caused lasting harm.', 'help students understand the human cost behind parts of agricultural history'],
      ['Rivers', 'The Mississippi River and many smaller rivers have supported transportation, farming, and trade.', 'move goods and connect communities'],
      ['Natural resources', 'Forests, coal, water, fertile soil, and coastal fisheries are important resources.', 'support different kinds of work'],
      ['Modern industries', 'Tourism, health care, manufacturing, technology, ports, and entertainment are important modern industries.', 'show how regional economies change over time'],
      ['Weather hazards', 'Hurricanes, floods, and severe storms can affect coastal and inland communities.', 'require planning and emergency preparation'],
      ['Culture', 'Music, food, language, and traditions in the Southeast reflect Native American, African American, European, Caribbean, and Latin American influences.', 'show how many communities shape regional culture']
    ]),
    chapter('The Midwest Region', 'The Midwest is often called the nation’s heartland because of its fertile farms, major rivers, Great Lakes, manufacturing centers, and central location.', [
      ['Location', 'The Midwest is in the central and north-central United States.', 'place it between other major U.S. regions'],
      ['Great Plains', 'The Great Plains include broad, mostly flat grasslands west of the Mississippi River.', 'support ranching, farming, and wind energy'],
      ['Farming belts', 'Corn, wheat, soybeans, dairy, and livestock are important agricultural products in the Midwest.', 'make the region a major food producer'],
      ['Fertile soil', 'Rich soil formed by glaciers and grasslands helps many crops grow.', 'explain the strength of Midwest farming'],
      ['Great Lakes', 'The Great Lakes provide fresh water, transportation routes, fishing, and recreation.', 'connect Midwest cities to trade networks'],
      ['Mississippi River', 'The Mississippi River system carries goods between the Midwest and the Gulf of Mexico.', 'support river trade'],
      ['Manufacturing', 'Midwest cities have made automobiles, machinery, food products, and other goods.', 'create jobs beyond farming'],
      ['Transportation hubs', 'Railroads, highways, rivers, and airports make many Midwest cities transportation hubs.', 'move products and people across the country'],
      ['Climate', 'The Midwest can have hot summers, cold winters, and severe thunderstorms or tornadoes.', 'affect farming and daily life'],
      ['Interdependence', 'Midwest farms and factories supply food and products to people in other regions.', 'show why regions trade with each other']
    ]),
    chapter('The Southwest Region', 'The Southwest is known for deserts, canyons, mesas, Native American heritage, energy resources, and the challenge of managing water in dry places.', [
      ['Location', 'The Southwest includes states in the south-central and southwestern United States.', 'place it near Mexico and western deserts'],
      ['Deserts', 'The Mojave, Sonoran, and Chihuahuan deserts have dry climates and specially adapted plants and animals.', 'show how living things adapt to limited water'],
      ['Canyons and mesas', 'Canyons, mesas, and plateaus reveal layers of rock shaped by water and wind.', 'show how landforms tell Earth’s history'],
      ['Native American heritage', 'Many Native American nations have long histories, languages, governments, and traditions in the Southwest.', 'recognize that Native peoples are living communities with enduring cultures'],
      ['Water conservation', 'Communities use reservoirs, canals, irrigation, and conservation to manage limited water.', 'help people farm and live in dry areas'],
      ['Colorado River', 'The Colorado River is a major water source for farms, cities, and ecosystems.', 'show why water decisions can affect many states'],
      ['Oil and gas', 'Oil and natural gas have been important Southwest energy resources.', 'support energy jobs while raising environmental questions'],
      ['Solar energy', 'Sunny conditions make solar power an important growing energy source.', 'show how climate can support renewable energy'],
      ['Borderland culture', 'The region reflects Native American, Mexican, Spanish, and many other cultural influences.', 'shape food, language, art, and community traditions'],
      ['Modern cities', 'Cities such as Phoenix, Dallas, Albuquerque, and San Antonio have grown through trade, services, technology, and tourism.', 'show how cities adapt to regional conditions']
    ]),
    chapter('The West Region', 'The West includes high mountain ranges, Pacific coasts, forests, deserts, gold rush history, rich natural resources, and major technology centers.', [
      ['Location', 'The West includes Pacific Coast states, mountain states, and Alaska and Hawaii in many regional models.', 'show the region’s large geographic range'],
      ['Mountain ranges', 'The Rocky Mountains, Sierra Nevada, and Cascade Range shape climate, rivers, travel, and recreation.', 'affect settlement and natural resources'],
      ['Pacific resources', 'The Pacific Ocean supports ports, fishing, trade, tourism, and coastal ecosystems.', 'connect the United States to nations across the ocean'],
      ['Gold rushes', 'Gold rushes brought rapid migration and economic change while also harming many Native communities and landscapes.', 'show that economic opportunities can have complicated effects'],
      ['National parks', 'Western parks protect mountains, forests, deserts, and wildlife.', 'preserve natural places for future generations'],
      ['Forests and timber', 'Forests provide habitats, wood products, clean water, and recreation.', 'require careful management'],
      ['Technology hubs', 'Places such as Silicon Valley became centers for technology companies and research.', 'show how education, investment, and ideas can grow industries'],
      ['Earthquakes and volcanoes', 'Parts of the West experience earthquakes, volcanic activity, wildfires, and drought.', 'require preparation and scientific monitoring'],
      ['Agriculture', 'California and other Western states grow fruits, vegetables, and nuts using irrigation and varied climates.', 'supply food to many other regions'],
      ['Cultural diversity', 'The West includes many Native nations, immigrant communities, and cultures connected to the Pacific.', 'shape regional life and traditions']
    ]),
    chapter('Citizen Rights and Government Functions', 'Citizens have rights and responsibilities, while local, state, and federal governments have different jobs. Understanding these levels helps people participate in their communities.', [
      ['Citizenship', 'Citizens participate in communities by following laws, voting when eligible, serving others, and staying informed.', 'connect rights with responsibilities'],
      ['Rights', 'The Bill of Rights protects freedoms such as speech, religion, press, assembly, and fair legal treatment.', 'limit government power and protect people'],
      ['Responsibilities', 'Responsibilities include obeying laws, respecting others, paying taxes, and helping communities.', 'support a safe and fair society'],
      ['Local government', 'Local governments manage services such as schools, parks, police, fire departments, and streets.', 'address needs close to home'],
      ['State government', 'State governments make laws for their states and manage state roads, courts, and many public services.', 'handle issues within state borders'],
      ['Federal government', 'The federal government handles national issues such as defense, money, immigration, and relations with other countries.', 'address issues that affect the whole nation'],
      ['Legislative branch', 'Legislatures make laws.', 'represent people and debate public rules'],
      ['Executive branch', 'Executives carry out and enforce laws.', 'put laws and public programs into action'],
      ['Judicial branch', 'Courts interpret laws and decide whether laws follow the Constitution.', 'protect the rule of law'],
      ['Checks and balances', 'The three branches can limit one another’s power.', 'prevent any one branch from becoming too powerful']
    ])
  ];

  const grade5 = [
    chapter('Our Land and First People', 'Grade 5 U.S. history begins with the land itself and the many Indigenous nations whose cultures developed long before European settlement.', [
      ['Early migrations', 'Ancestors of Native peoples reached the Americas over many generations by different routes.', 'explain the deep history of people in the Americas'],
      ['Diverse environments', 'Native nations adapted to forests, plains, deserts, coasts, rivers, and mountains.', 'show how geography shaped ways of life'],
      ['Northeast cultures', 'Northeast peoples used forests, rivers, farming, hunting, fishing, and trade.', 'connect environment to daily life'],
      ['Southeast cultures', 'Southeast peoples built farming communities and trade networks in warm, fertile regions.', 'show regional diversity'],
      ['Great Plains cultures', 'Plains peoples used bison, trade, farming, and later horses in many communities.', 'show adaptation to grassland environments'],
      ['Southwest cultures', 'Southwest peoples developed irrigation, adobe homes, trade, and farming in dry places.', 'show water management and cultural knowledge'],
      ['Northwest cultures', 'Northwest peoples used forests, rivers, and Pacific resources such as salmon.', 'show the importance of coastal resources'],
      ['Respectful language', 'Native American nations are diverse living communities, not a single group from the past.', 'encourage accurate and respectful history'],
      ['Oral traditions', 'Oral histories, stories, and teachings carry knowledge across generations.', 'show that history can be preserved in more than written records'],
      ['Land stewardship', 'Many Indigenous traditions emphasize responsibility to land, water, animals, and future generations.', 'connect history to environmental care']
    ]),
    chapter('Age of Exploration and Settlement', 'European exploration created new trade connections and encounters, but it also brought conquest, disease, forced labor, and major change for Native peoples.', [
      ['Motives for exploration', 'European nations sought trade routes, wealth, power, and religious influence.', 'explain why voyages were funded'],
      ['Navigation', 'Compasses, maps, ships, and knowledge of winds and stars helped sailors travel farther.', 'make ocean voyages more possible'],
      ['Columbian Exchange', 'Plants, animals, diseases, and ideas moved between hemispheres after European contact.', 'change diets, populations, and environments'],
      ['Disease', 'Diseases brought by Europeans caused devastating losses among Native peoples who had no immunity.', 'show a major consequence of contact'],
      ['Spanish settlements', 'Spain built missions, forts, and settlements in parts of the Americas.', 'expand Spanish control and influence'],
      ['French trade', 'French explorers and traders built relationships and trade networks, especially around rivers and fur regions.', 'connect geography to economic activity'],
      ['English settlements', 'English colonies grew along the Atlantic coast for trade, land, and self-government.', 'begin long-lasting British influence in North America'],
      ['Enslavement', 'European colonies forced millions of Africans into slavery, creating a system of violence and injustice.', 'explain a central cause of later conflict'],
      ['Global connections', 'Exploration connected North America to Africa, Europe, the Caribbean, and Asia through trade and migration.', 'show that early America was part of a wider world'],
      ['Different perspectives', 'Exploration can be described differently by explorers, settlers, enslaved people, and Native communities.', 'teach readers to consider multiple viewpoints']
    ]),
    chapter('The English Colonies', 'The English colonies developed different economies, cultures, and political traditions in New England, the Middle Colonies, and the Southern Colonies.', [
      ['New England', 'New England colonies had rocky soil, shipbuilding, fishing, trade, towns, and small farms.', 'show how environment shaped the economy'],
      ['Middle Colonies', 'The Middle Colonies had fertile farms, busy ports, and diverse populations.', 'earn the nickname breadbasket colonies'],
      ['Southern Colonies', 'Southern colonies grew cash crops such as tobacco, rice, and indigo.', 'create plantation economies'],
      ['Colonial economies', 'Colonial economies included farming, trade, crafts, shipping, and services.', 'show that colonies were economically varied'],
      ['Enslaved labor', 'Enslaved Africans were forced to work in many colonial industries, especially plantation agriculture.', 'recognize the injustice behind colonial wealth'],
      ['Self-government', 'Colonists created assemblies and town meetings to make some local decisions.', 'build experience with representative government'],
      ['Religious diversity', 'Some colonies were founded partly for religious reasons, while others welcomed different groups.', 'shape community rules and culture'],
      ['Triangular trade', 'Ships carried goods and people among Europe, Africa, the Caribbean, and North America.', 'connect colonial economies to the Atlantic world'],
      ['Daily life', 'Colonial children and adults worked at home, on farms, in shops, and in trades.', 'show how work supported families and communities'],
      ['Regional differences', 'Climate, land, resources, and settlement patterns made the three colonial regions different.', 'help compare historical regions']
    ]),
    chapter('The American Revolution', 'The American Revolution grew from disagreements about taxes, representation, rights, and British control, then became a war for independence.', [
      ['Taxes and representation', 'Many colonists objected to British taxes because they had no representatives in Parliament.', 'explain a major source of conflict'],
      ['Protests', 'Groups protested policies through speeches, boycotts, petitions, and public actions.', 'show how people expressed disagreement'],
      ['Boston Tea Party', 'Protesters destroyed tea to oppose British tea policies.', 'become a symbol of colonial resistance'],
      ['Intolerable Acts', 'Britain passed harsh laws after the Boston Tea Party.', 'increase colonial anger and unity'],
      ['Continental Congress', 'Colonial leaders met to discuss shared problems and organize resistance.', 'coordinate action among colonies'],
      ['Declaration of Independence', 'The Declaration explained why the colonies claimed independence in 1776.', 'state ideals about rights and government'],
      ['Patriots and Loyalists', 'Some colonists supported independence while others remained loyal to Britain.', 'show that the Revolution divided communities'],
      ['Revolutionary War', 'The war lasted from 1775 to 1783 and involved soldiers, civilians, allies, and many hardships.', 'win independence from Britain'],
      ['French alliance', 'France provided important military and financial support to the American cause.', 'help change the course of the war'],
      ['Yorktown and treaty', 'The British surrender at Yorktown and the Treaty of Paris ended major fighting and recognized independence.', 'create a new nation']
    ]),
    chapter('Building a New Nation', 'After independence, Americans debated how to build a stronger government while protecting individual rights.', [
      ['Articles of Confederation', 'The first national government was too weak to solve many shared problems.', 'lead leaders to seek a stronger plan'],
      ['Constitutional Convention', 'Delegates met in Philadelphia in 1787 to write a new Constitution.', 'create a new framework for government'],
      ['Federalism', 'Federalism divides power between national and state governments.', 'balance local and national needs'],
      ['Three branches', 'Legislative, executive, and judicial branches share government power.', 'prevent one group from controlling everything'],
      ['Checks and balances', 'Each branch can limit parts of the others’ power.', 'protect the balance of government'],
      ['Bill of Rights', 'The first ten amendments protect individual freedoms and legal rights.', 'answer concerns about federal power'],
      ['Ratification', 'States had to approve the Constitution before it became the law of the land.', 'show that debate was part of the process'],
      ['First presidency', 'George Washington set traditions for the new executive branch.', 'shape how later presidents would serve'],
      ['National capital', 'A permanent capital was created to serve the federal government.', 'give national government a stable home'],
      ['Civic participation', 'Citizens influence government through voting, discussion, service, and learning about issues.', 'keep a democracy active']
    ]),
    chapter('Westward Expansion', 'Westward expansion brought new land, migration, innovation, and opportunity, but it also caused displacement and conflict for Native peoples.', [
      ['Louisiana Purchase', 'The United States bought a vast territory from France in 1803.', 'double the nation’s land area'],
      ['Lewis and Clark', 'The expedition explored parts of the Louisiana Purchase with important help from Sacagawea and Native guides.', 'gather information about western lands'],
      ['Indian Removal', 'U.S. policies forced many Native nations from their homelands, including on the Trail of Tears.', 'show the human cost of expansion'],
      ['Oregon Trail', 'Pioneers traveled west by wagon through difficult conditions.', 'seek land and new opportunities'],
      ['California Gold Rush', 'Gold discoveries brought rapid migration to California.', 'change the population and economy of the West'],
      ['Texas and the Southwest', 'Conflicts and agreements changed control of Texas and other southwestern lands.', 'expand U.S. territory'],
      ['Homestead Act', 'The federal government offered land to some settlers who improved it.', 'encourage settlement while affecting Native lands'],
      ['Railroads', 'Railroads connected distant regions and moved goods and people faster.', 'support industry and migration'],
      ['Industrial innovations', 'Telegraphs, machines, and factories changed communication and production.', 'link expansion to technological change'],
      ['Environmental impact', 'Farming, mining, railroads, and settlement changed rivers, forests, grasslands, and wildlife.', 'show that growth has environmental effects']
    ]),
    chapter('A Nation Divided', 'The Civil War and Reconstruction were shaped by slavery, sectional conflict, leadership, military struggle, emancipation, and debates about citizenship.', [
      ['Slavery', 'Slavery was a system in which enslaved people were denied freedom and forced to work.', 'understand the central injustice behind the conflict'],
      ['Sectional differences', 'Northern and Southern economies and views about slavery differed sharply.', 'increase political conflict'],
      ['Secession', 'Several Southern states left the Union after Abraham Lincoln was elected.', 'begin the Civil War crisis'],
      ['Abraham Lincoln', 'Lincoln led the Union and argued that the nation should remain united.', 'provide leadership during war'],
      ['Emancipation Proclamation', 'Lincoln declared freedom for enslaved people in areas under rebellion.', 'change the purpose and meaning of the war'],
      ['Military life', 'Soldiers and families faced hardship, loss, shortages, and difficult choices.', 'show the human cost of war'],
      ['Gettysburg', 'The Battle of Gettysburg was a turning point in the war.', 'weaken the Confederate army'],
      ['Thirteenth Amendment', 'The Thirteenth Amendment abolished slavery in the United States.', 'end the legal institution of slavery'],
      ['Reconstruction', 'Reconstruction tried to rebuild the South and define rights after the war.', 'address freedom, citizenship, and political power'],
      ['Fourteenth and Fifteenth Amendments', 'These amendments defined citizenship, equal protection, and voting rights for Black men.', 'expand constitutional protections']
    ]),
    chapter('Modern America and the Question of Equality', 'Modern America has been shaped by immigration, industrial growth, reform movements, civil rights struggles, and continuing debates about equality.', [
      ['Industrial growth', 'Factories, railroads, and new technologies created jobs and wealth while also creating difficult working conditions.', 'change American cities and work'],
      ['Immigration waves', 'People from many countries came to the United States seeking safety, jobs, and opportunity.', 'make communities more diverse'],
      ['Urbanization', 'Cities grew quickly as people moved for factory jobs and services.', 'create new opportunities and new challenges'],
      ['Labor movement', 'Workers organized for safer conditions, fair pay, and reasonable hours.', 'improve workplace rights'],
      ['Great Migration', 'Many Black Americans moved from the South to other regions for jobs and safety.', 'reshape culture and cities'],
      ['Civil Rights Movement', 'People used court cases, organizing, and nonviolent protest to challenge segregation and discrimination.', 'seek equal rights under law'],
      ['Brown v. Board of Education', 'The Supreme Court ruled that segregated public schools were unconstitutional.', 'challenge legal school segregation'],
      ['Civil Rights Act', 'The Civil Rights Act of 1964 banned many forms of discrimination.', 'strengthen equal treatment in public life'],
      ['Voting Rights Act', 'The Voting Rights Act of 1965 challenged barriers that kept many citizens from voting.', 'protect access to elections'],
      ['Ongoing equality', 'Americans continue to debate how to make rights, opportunity, and participation more equal.', 'show that history connects to current civic questions']
    ])
  ];

  window.SocialStudiesCourses = Object.freeze({ 4: grade4, 5: grade5 });
})();
