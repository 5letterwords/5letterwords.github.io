// ============================================================
//  words-data.js  –  Word database for 5LetterWords app
// ============================================================

const WORDS_5 = [
  "ABOUT","ABOVE","ABUSE","ACTOR","ACUTE","ADMIT","ADOPT","ADULT","AFTER","AGAIN",
  "AGENT","AGILE","AGREE","AHEAD","AISLE","ALARM","ALBUM","ALERT","ALIGN","ALIKE",
  "ALIVE","ALLAY","ALLEY","ALLOW","ALONE","ALONG","ALOOF","ALOUD","ALTER","AMAZE",
  "AMBER","AMEND","ANGEL","ANGER","ANGLE","ANGRY","ANIME","ANKLE","ANNEX","ANNOY",
  "APART","APPLE","APPLY","ARENA","ARGUE","ARISE","ARMOR","AROMA","AROSE","ARRAY",
  "ARROW","ASSET","ATLAS","ATONE","ATTIC","AUDIT","AVOID","AWAKE","AWARD","AWARE",
  "AWFUL","BADLY","BASIC","BASIS","BATCH","BEACH","BEARD","BEAST","BEGIN","BEING",
  "BELOW","BENCH","BIBLE","BLACK","BLADE","BLAME","BLAND","BLANK","BLAST","BLAZE",
  "BLEED","BLEND","BLESS","BLIND","BLOCK","BLOOD","BLOWN","BOARD","BONUS","BOOST",
  "BOOTH","BOUND","BRAIN","BRAND","BRAVE","BREAD","BREAK","BREED","BRICK","BRIEF",
  "BRING","BRISK","BROAD","BROKE","BROOK","BROTH","BROWN","BRUSH","BUILD","BUILT",
  "BUNCH","BURST","BUYER","CABIN","CAMEL","CANDY","CAPED","CARGO","CARRY","CATCH",
  "CAUSE","CHAIN","CHAIR","CHALK","CHAOS","CHARD","CHARM","CHART","CHASE","CHEAT",
  "CHECK","CHEEK","CHEER","CHESS","CHEST","CHIEF","CHILD","CHILL","CHINA","CHOIR",
  "CLAIM","CLAMP","CLANG","CLASS","CLEAN","CLEAR","CLICK","CLIFF","CLIMB","CLING",
  "CLIP","CLOCK","CLONE","CLOSE","CLOTH","CLOUD","CLOVE","CLOWN","COACH","COAST",
  "COLOR","COMIC","COMMA","CORAL","COUNT","COURT","COVER","CRACK","CRAFT","CRANE",
  "CRASH","CRAZY","CREAM","CREEK","CRIME","CRISP","CROSS","CROWD","CROWN","CRUEL",
  "CRUSH","CURVE","CYCLE","DAILY","DANCE","DATUM","DEATH","DEBUG","DECAY","DECOY",
  "DELAY","DELTA","DENSE","DEPOT","DEPTH","DERBY","DEVIL","DIRTY","DISCO","DODGE",
  "DOING","DONOR","DOUBT","DOUGH","DRAFT","DRAIN","DRAMA","DRANK","DRAWN","DREAM",
  "DRESS","DRIFT","DRILL","DRINK","DRIVE","DRONE","DROVE","DROWN","DRYER","DUTCH",
  "DWARF","EAGER","EAGLE","EARLY","EARTH","EDGED","EIGHT","ELITE","EMBER","EMPTY",
  "ENEMY","ENJOY","ENTER","ENTRY","EQUAL","ERROR","ESSAY","ETHER","EVENT","EVERY",
  "EXACT","EXIST","EXTRA","FABLE","FAITH","FANCY","FAULT","FEAST","FENCE","FEVER",
  "FIBER","FIELD","FIFTH","FIFTY","FIGHT","FINAL","FIRST","FIXED","FLAME","FLASH",
  "FLEET","FLESH","FLOAT","FLOOD","FLOOR","FLOUR","FLUID","FLUTE","FOCAL","FOCUS",
  "FOLKS","FORCE","FORGE","FOUND","FRAME","FRANK","FRAUD","FRESH","FRONT","FROST",
  "FRUIT","FUNNY","GHOST","GIANT","GIVEN","GLASS","GLOSS","GLYPH","GRACE","GRADE",
  "GRAIN","GRAND","GRANT","GRAZE","GREED","GREEN","GREET","GRIEF","GRIND","GROAN",
  "GROWN","GUARD","GUESS","GUEST","GUIDE","GUILE","GUISE","GULCH","GUSTO","GYPSY",
  "HABIT","HAPPY","HARDY","HARSH","HAVEN","HEART","HEAVY","HEDGE","HENCE","HERBS",
  "HINGE","HIPPO","HIRED","HOIST","HOLLY","HOMER","HONOR","HORNS","HOTEL","HOUSE",
  "HUMAN","HUMID","HURRY","HYPER","IDEAL","IRATE","IRONY","IVORY","JAZZY","JEWEL",
  "JOINT","JUDGE","JUICY","JUMBO","KAYAK","KNACK","KNEEL","KNIFE","KNOCK","KNOWN",
  "LABEL","LANCE","LARGE","LASER","LATCH","LATER","LATTE","LAUGH","LAYER","LEARN",
  "LEASE","LEAST","LEGAL","LEMON","LEVEL","LIGHT","LIMIT","LINEN","LOCAL","LODGE",
  "LOGIC","LONELY","LOOSE","LOVER","LOYAL","LUCKY","LUNAR","LYRIC","MAGIC","MAPLE",
  "MARCH","MATCH","MAYOR","MEDIA","MERCY","MERIT","METAL","MIGHT","MINOR","MINUS",
  "MODEL","MONEY","MONTH","MORAL","MOTOR","MOUNT","MOUSE","MOUTH","MOVED","MOVIE",
  "MUSIC","NAIVE","NERVE","NIGHT","NOBLE","NOISE","NORTH","NOTED","NOVEL","NURSE",
  "NYMPH","OAKEN","OCCUR","OCEAN","OFTEN","OLIVE","ONSET","OPERA","OPTIC","ORBIT",
  "ORDER","OTHER","OUTER","OWNED","OXIDE","OZONE","PAINT","PANEL","PAPER","PARTY",
  "PASTA","PATCH","PAUSE","PEACE","PEARL","PENNY","PETAL","PHASE","PHONE","PHOTO",
  "PIANO","PIECE","PILOT","PITCH","PIXEL","PLACE","PLAIN","PLANE","PLANT","PLAQUE",
  "PLAZA","PLEAD","PLUCK","PLUME","PLUSH","POINT","POLAR","PORCH","POWER","PRESS",
  "PRICE","PRIDE","PRIME","PRINT","PRIOR","PRIZE","PROBE","PRONE","PROOF","PROSE",
  "PROUD","PROVE","PROWL","PROXY","PSALM","PUFFY","PULSE","PUNCH","PUPPY","PURSE",
  "QUEEN","QUERY","QUEST","QUEUE","QUICK","QUIET","QUITE","QUOTA","QUOTE","RADAR",
  "RADIO","RAISE","RALLY","RANGE","RAPID","RATIO","REACH","REALM","REBEL","REIGN",
  "RELAX","REMIX","REPAY","RESET","RIDER","RIDGE","RIFLE","RIGHT","RIGID","RISKY",
  "RIVER","ROAST","ROBOT","ROCKY","ROUGE","ROUGH","ROUND","ROVER","ROYAL","RUGBY",
  "RULER","RURAL","SADLY","SAFER","SAINT","SALAD","SAUCE","SCALE","SCARE","SCENE",
  "SCOPE","SCORE","SCOUT","SEIZE","SENSE","SERVE","SEVEN","SHADE","SHAKE","SHALL",
  "SHAME","SHAPE","SHARE","SHARP","SHIFT","SHINE","SHIRE","SHOCK","SHORE","SHORT",
  "SHOUT","SIGHT","SILLY","SINCE","SIXTH","SIXTY","SIZED","SKILL","SKULL","SKUNK",
  "SLATE","SLAVE","SLEEP","SLIDE","SLOPE","SLOTH","SMART","SMILE","SMOKE","SNAKE",
  "SOLAR","SOLID","SOLVE","SOUTH","SPACE","SPARK","SPEAK","SPEAR","SPEED","SPEND",
  "SPICE","SPILL","SPINE","SPOKE","SPOON","SPORT","SPRAY","SQUAD","STACK","STAFF",
  "STAGE","STAIN","STAIR","STAKE","STALE","STALL","STAMP","STAND","STARK","START",
  "STATE","STEAL","STEEL","STEEP","STEER","STERN","STICK","STILL","STOCK","STOMP",
  "STONE","STOOD","STORE","STORM","STORY","STOVE","STRAW","STRIP","STUCK","STUDY",
  "STUFF","STUMP","STYLE","SUGAR","SUITE","SUNNY","SUPER","SURGE","SWAMP","SWEAR",
  "SWEEP","SWEET","SWIFT","SWIPE","SWIRL","SWORD","SWORN","TABLE","TASTE","TEACH",
  "TEETH","TEMPO","TENSE","TENTH","TEPID","TERMS","THORN","THOSE","THREE","THREW",
  "THROW","TIGER","TIMER","TIRED","TITLE","TODAY","TOKEN","TOPIC","TOTAL","TOUCH",
  "TOUGH","TRACK","TRADE","TRAIN","TRAMP","TREND","TRIAL","TRIBE","TRICK","TRIED",
  "TRUCK","TRULY","TRUMP","TRUST","TRUTH","TULIP","TULSA","TUNER","TWICE","TWIST",
  "ULTRA","UNCLE","UNDER","UNION","UNITY","UNTIL","UPPER","UPSET","URBAN","USAGE",
  "USUAL","UTTER","VALID","VALUE","VALVE","VAPOR","VAULT","VEINS","VENUE","VERSE",
  "VIDEO","VIGOR","VIOLA","VIRAL","VISIT","VISTA","VIVID","VOCAL","VOICE","VOTER",
  "VULVA","WAGER","WAIST","WASTE","WATCH","WATER","WEARY","WEAVE","WEDGE","WEIRD",
  "WHALE","WHEAT","WHERE","WHICH","WHILE","WHITE","WHOLE","WHOSE","WITCH","WITTY",
  "WOMAN","WOMEN","WORLD","WORRY","WORSE","WORST","WORTH","WOUND","WRATH","WRITE",
  "WROTE","YACHT","YIELD","YOUNG","YOUTH","ZEBRA","ZINGY","ZIPPY","ZONAL","ZONED",
  // Extra common 5-letter words
  "ABBEY","ABHOR","ABIDE","ABLER","ABODE","ABORT","ABUZZ","ACTED","ADDED","ADEPT",
  "ADORE","ADORN","AFFIX","AFOOT","AFOUL","AFRESH","AIDED","AIRED","AITCH","ALGAE",
  "ALIBI","ALOFT","ALTAR","AMASS","AMBLE","AMPHI","AMPLE","AMUSE","ANNUL","ANTIC",
  "ANVIL","AORTA","APTLY","ARBOR","ARDOR","ARDUOUS","ARENA","ARID","AROSE","ASTER",
  "ATOLL","ATONE","ATTIC","BAKED","BALMY","BANJO","BARON","BASTE","BATTY","BEADY",
  "BIRCH","BLUNT","BOGGY","BOOZE","BUGLE","BUMPY","BUTCH","CACTI","CAIRN","CAKEY",
  "CAMEO","CARGO","CAROL","CASTE","CEDAR","CELLAR","CHAFE","CHAMP","CHANT","CHORE",
  "CLEAT","CLEFT","CLERK","CLIPT","CLUCK","CLUED","COBRA","COMET","COMMA","COMFY",
  "COMPLY","COOKY","COVEN","COVET","CREAK","CREST","CRIMP","CRONE","CUPID","CURLY",
  "CURVY","CUTIE","DAISY","DAUNT","DECAL","DECOR","DECRY","DEFER","DENIM","DEPOT",
  "DERBY","DIGBY","DIRGE","DISCO","DITSY","DIXIT","DODGY","DOMED","DOWDY","DOWNY",
  "DRAKE","DRAPE","DRAWL","DREGS","DROOL","DROOP","DUCHY","DUSKY","DUSTY","ELFIN",
  "ELBOW","EMBER","EPOXY","EQUIP","ESSAY","EVADE","EVOKE","EXPEL","EXTOL","EXULT",
  "FABLE","FARCE","FAUNA","FEIGN","FELON","FERRY","FETCH","FIEND","FINCH","FISHY",
  "FITLY","FLAIR","FLANK","FLARE","FLECK","FLICK","FLING","FLINCH","FLOCK","FLOP",
  "FLUNG","FLUNK","FOAMY","FOLLY","FORGO","FOYER","FRAIL","FRAME","FREAK","FRILL",
  "FROTH","FRUGAL","FUNGI","FUNKY","FUROR","FURRY","FUZZY","GABLE","GAUDY","GAUGE",
  "GAUNT","GAUZE","GAVEL","GHOUL","GIRLY","GIRTH","GLARE","GLEAM","GLIDE","GLINT",
  "GLOAT","GLOOM","GLOSS","GLOVE","GNARL","GNASH","GNOME","GODLY","GOOFY","GORGE",
  "GOUGE","GRABS","GRAFT","GRAIL","GRIPE","GRUFF","GULLY","GUSTO","GUSTO","GUTSY",
  "GAUDY","HAMMY","HASTY","HAUTE","HAWKY","HILLY","HIPPY","HOARY","HOBBIT","HOUND",
  "HOVEL","HOVER","HOWDY","HUFFY","HUSKY","HYENA","IMBUE","IMPEL","IMPLY","INEPT",
  "INFER","INGOT","INLAY","INPUT","INTER","INTRO","INURE","IRKED","ITCHY","JADED",
  "JAUNT","JIFFY","JUMPY","JUROR","KEBAB","KHAKI","KINKY","KITTY","KNAVE","KNELT",
  "LACED","LADEN","LANKY","LAPSE","LARVA","LATCH","LATENT","LAUD","LEAFY","LEAKY",
  "LEGGY","LEMUR","LITHE","LOFTY","LONER","LORRY","LOUSY","LUCID","LUMPY","LUSTY",
  "MADLY","MANOR","MANTLE","MANLY","MATEY","MEALY","MESSY","MILKY","MIMIC","MISTY",
  "MOIST","MOODY","MOSSY","MOUSY","MUDDY","MUGGY","MURKY","MUSHY","MUSTY","MYRRH",
  "NIFTY","NIMBLE","NINNY","NIPPY","NITTY","NOBLY","NODDY","NOISY","NOTCH","NUBBY",
  "NUTTY","OAKEN","OASIS","OBESE","OCTET","ODDLY","ONION","OOZES","OPINE","OVOID",
  "OVULE","PADDY","PALMY","PANSY","PANTY","PASTY","PATSY","PAVED","PEAKY","PEEVE",
  "PEPPY","PERKY","PETTY","PHONY","PINEY","PIOUS","PITHY","PIXIE","PLAID","PLANK",
  "PLASM","PLIABLE","PLIED","PLOYS","PLUNK","PODGY","POPPY","POTTY","POUTY","PRANK",
  "PRAWN","PRICY","PRIVY","PRIVY","PROSY","PUDGY","PULPY","PUPIL","PUTTY","QUAFF",
  "QUAFF","QUAKY","QUELL","QUERY","QUIRKY","QUOTA","RABID","RAINY","RASPY","RATTY",
  "REEDY","REEK","REEVE","REVEL","RIVET","ROCKY","ROOMY","ROSY","ROWDY","RUDDY",
  "RUNNY","RUSTY","SAUCY","SAVVY","SCOFF","SCOUR","SCRAM","SCULL","SEEDY","SEEP",
  "SERUM","SEVER","SEXTET","SHADY","SHADY","SHAKY","SHARD","SHEAF","SHEEN","SHEER",
  "SHELF","SHREW","SHRUG","SIEVE","SINEW","SKID","SKIMP","SKYLINE","SLANGY","SLEEK",
  "SLEET","SLICK","SLIME","SLIMY","SLINKY","SLOSH","SLUMPED","SOAPY","SOGGY","SOOTY",
  "SORRY","SOUPY","SPANK","SPASM","SPECK","SPIKY","SPINY","SPOOF","SPORE","SPUNK",
  "STAID","STANK","STEEP","STIFF","STING","STINK","STODGY","STOGY","STONY","STOZY",
  "STREW","STUFF","STUNG","STUNK","SUCKY","SUNLIT","SURER","SURLY","SWATHE","SWINDLE",
  "TACKY","TANGY","TAFFY","TALLY","TARDY","TAWNY","TEDDY","TEPID","TERSE","TETCHY",
  "THANE","THATCH","THIEF","TICKY","TIDY","TIPSY","TIZZY","TOADY","TOPSY","TORSO",
  "TOXIC","TROTH","TUBBY","TUFFY","TULLE","TUMBLE","TUNER","TUNIC","TUNNY","TURBO",
  "TUSKY","TWANG","TWERP","TIMID","UMBRA","UNFIT","UNIFY","UNRULY","UPBEAT","UPEND",
  "USURP","VAPID","VARVE","VEINY","VERGE","VERVE","VEXED","VICAR","VYING","WACKY",
  "WANED","WANLY","WASPISH","WAVER","WAXEN","WIZEN","WOOLY","WORMY","WRACK","WREST",
  "WRING","WROTE","WRUNG","YUCKY","YUMMY","ZIPPY","ZESTY","ZONES"
].map(w => w.trim().toUpperCase()).filter(w => w.length === 5 && /^[A-Z]+$/.test(w));

// Remove duplicates
const WORDS_5_UNIQUE = [...new Set(WORDS_5)].sort();

// Scrabble letter values
const SCRABBLE_VALUES = {
  A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:5,L:1,M:3,
  N:1,O:1,P:3,Q:10,R:1,S:1,T:1,U:1,V:4,W:4,X:8,Y:4,Z:10
};

function getScrabbleScore(word) {
  return word.split('').reduce((s,c) => s + (SCRABBLE_VALUES[c]||0), 0);
}

function countVowels(word) {
  return (word.match(/[AEIOU]/g)||[]).length;
}

// Word of the day list with definitions
const WORD_OF_DAY_LIST = [
  { word:"STOKE", phonetic:"/stoʊk/", pos:"verb",   def:"To tend or fuel a fire; to stir up or excite.", example:"The exciting news helped stoke enthusiasm among the team." },
  { word:"VIVID", phonetic:"/ˈvɪvɪd/", pos:"adj",  def:"Producing powerful feelings or strong, clear images in the mind.", example:"She painted a vivid picture of life in the countryside." },
  { word:"QUIRK", phonetic:"/kwɜːrk/", pos:"noun",  def:"A peculiar behavioral habit or an unexpected twist.", example:"His little quirk of humming while working was endearing." },
  { word:"CRISP", phonetic:"/krɪsp/", pos:"adj",    def:"Firm, dry, and brittle; pleasantly cool and fresh.", example:"The crisp autumn air was invigorating." },
  { word:"PLUMB", phonetic:"/plʌm/", pos:"verb",    def:"To measure the depth of something; to examine deeply.", example:"Researchers sought to plumb the depths of the ocean." },
  { word:"ZESTY", phonetic:"/ˈzɛsti/", pos:"adj",   def:"Having a strong, pleasant and somewhat spicy flavor or character.", example:"The chef added a zesty lemon dressing to the salad." },
  { word:"BRISK", phonetic:"/brɪsk/", pos:"adj",    def:"Active, fast, and energetic; pleasantly lively.", example:"We took a brisk walk through the park." },
  { word:"LUMPY", phonetic:"/ˈlʌmpi/", pos:"adj",   def:"Full of or covered with lumps; not smooth.", example:"The lumpy mattress made sleeping uncomfortable." },
  { word:"GUSTO", phonetic:"/ˈɡʌstoʊ/", pos:"noun", def:"Enjoyment and enthusiasm in doing something.", example:"She sang the national anthem with great gusto." },
  { word:"WITTY", phonetic:"/ˈwɪti/", pos:"adj",    def:"Showing or characterized by quick and inventive verbal humor.", example:"His witty remarks kept the audience laughing all night." },
  { word:"PERKY", phonetic:"/ˈpɜːrki/", pos:"adj",  def:"Cheerful and lively; jaunty in manner.", example:"Despite the early hour, she was perky and full of energy." },
  { word:"LUSTY", phonetic:"/ˈlʌsti/", pos:"adj",   def:"Healthy and strong; full of vigor.", example:"The lusty cheers of the crowd filled the stadium." },
  { word:"VAPOR", phonetic:"/ˈveɪpər/", pos:"noun", def:"A substance diffused or suspended in the air; steam or mist.", example:"Morning vapor rose from the lake's surface." },
  { word:"GRUFF", phonetic:"/ɡrʌf/", pos:"adj",     def:"Abrupt or stern in manner; rough-voiced.", example:"Beneath his gruff exterior was a kind-hearted man." },
  { word:"MERIT", phonetic:"/ˈmɛrɪt/", pos:"noun",  def:"The quality of being particularly good or worthy; excellence.", example:"The proposal was accepted on its own merit." }
];

// Words by length data (counts approx)
const WORDS_BY_LENGTH = [
  { len:1, count:26,     examples:["A","I"],                                              desc:"Single-letter words — the most basic units of English." },
  { len:2, count:105,    examples:["AN","BE","DO","GO","HE","IN","IS","IT","ME","MY"],    desc:"Two-letter words are essential for Scrabble and crosswords." },
  { len:3, count:1015,   examples:["ACE","BAT","CAT","DOG","EGG","FLY","GUN","HAT"],     desc:"Three-letter words form the building blocks of sentences." },
  { len:4, count:3996,   examples:["ABLE","ACID","ALSO","BALL","BAND","BOOK","CAVE"],    desc:"Four-letter words are the backbone of everyday conversation." },
  { len:5, count:8500,   examples:["APPLE","BREAD","CHAIR","DREAM","EARTH","FLAME"],     desc:"Five-letter words are the most popular length for word games.", featured:true },
  { len:6, count:15000,  examples:["ABLAZE","BATTLE","CASTLE","DANGER","EASILY"],        desc:"Six-letter words offer more complexity for advanced puzzlers." },
  { len:7, count:23000,  examples:["ABANDON","BALANCE","CASCADE","DYNAMIC"],             desc:"Seven-letter words are Scrabble's holy grail (bingo words)." },
  { len:8, count:28000,  examples:["ABSOLUTE","BACKBONE","CALENDAR","DARKNESS"],         desc:"Eight-letter words demonstrate advanced vocabulary mastery." },
  { len:9, count:24000,  examples:["ABANDONED","BEAUTIFUL","CALCULATE","DANGEROUS"],     desc:"Nine-letter words show exceptional linguistic sophistication." },
];

// Quick reference categories
const QUICK_REF = [
  { title:"🟩 Best Wordle Starters", words:["CRANE","SLATE","RAISE","CRATE","TRACE","STARE","SNARE","PARSE","LARES","CARES"] },
  { title:"🎲 Top Scrabble Words",   words:["JAZZY","QUAFF","JUMPY","BOXER","FIZZY","WALTZ","PROXY","VYING","ZINGY","CZAR"] },
  { title:"🅰️ Vowel-Heavy Words",    words:["AUDIO","ADIEU","LOUIE","QUEUE","OUIJA","URAEI","AERIE","LOOIE","OAKEN","OCEAN"] },
  { title:"✂️ Words ending in -LY",  words:["BADLY","DAILY","EARLY","FAIRLY","HOTLY","NEWLY","ODDLY","SADLY","TRULY","WITTY"] },
  { title:"🔠 Double Letters",       words:["ABBEY","FOGGY","HAPPY","HOBBY","JAZZY","KITTY","LLANO","MOMMY","NIPPY","OOZES"] },
  { title:"🌟 Common Nouns",         words:["BEACH","CLOCK","DANCE","EAGLE","FLAME","GLOBE","HEART","KNIFE","LEMON","MAPLE"] },
];

// FAQ data
const FAQ_DATA = [
  {
    q: "How many 5-letter words are in the English language?",
    a: "There are approximately 8,500–12,000 five-letter words in the English language depending on which dictionary you reference. The Official Scrabble Players Dictionary (OSPD) contains about 8,996 valid five-letter words, while broader dictionaries include over 12,000 including proper nouns and archaic terms."
  },
  {
    q: "What is the most common 5-letter word?",
    a: "The most frequently used five-letter words in English include ABOUT, THERE, THEIR, THESE, WHICH, WOULD, COULD, EVERY, AFTER, and OTHER. These words appear thousands of times per million words of text. In terms of Wordle, words like CRANE, RAISE, SLATE, and STARE are considered the best starting words due to their high-frequency letters."
  },
  {
    q: "What 5-letter word has the most vowels?",
    a: "Several five-letter words contain four vowels: AUDIO (A, U, D, I, O), ADIEU (A, D, I, E, U), LOUIE (L, O, U, I, E), AERIE (A, E, R, I, E), URAEI (U, R, A, E, I), and OUIJA (O, U, I, J, A). These are particularly useful in Wordle and Scrabble for using vowel-heavy letter sets."
  },
  {
    q: "What are good 5-letter words for Wordle?",
    a: "The best Wordle starting words contain common letters (E, A, R, I, O, T, N, S) without repeating. Top picks include CRANE, SLATE, RAISE, CRATE, TRACE, STARE, PARSE, AROSE, IRATE, and SNARE. These words cover the most frequent letters in the English language, giving you the best chance of finding green and yellow tiles quickly."
  },
  {
    q: "How do I use this 5-letter word finder?",
    a: "Our word finder has three modes: (1) Basic Search — enter starting letters, ending letters, letters the word must contain, and letters to exclude. (2) Pattern Search — enter known letters in specific positions, using ? for unknowns. (3) Wordle Helper — enter your guesses and mark each tile green/yellow/gray to get a filtered list of possible solutions."
  },
  {
    q: "What are 5-letter words with no vowels?",
    a: "True five-letter words with absolutely no vowels (A, E, I, O, U) are extremely rare in English. Words that appear vowel-less sometimes use Y as a vowel: CRYPT, GLYPH, LYMPH, NYMPH, PYGMY, RHYME, SYNTH, TRYST, THYMY, and GYPSY. These can be valuable in Scrabble when you have an unfavorable rack."
  },
  {
    q: "Are there 5-letter words that start with X?",
    a: "Yes, though uncommon. Valid five-letter words starting with X include XERIC (relating to dry conditions), XYLEM (plant tissue), XYLOL (a chemical solvent), XEBEC (a Mediterranean sailing vessel), XENON (noble gas, element 54), and XYSTE (a type of covered walkway). These are rarely used outside of word games but can be very valuable in Scrabble."
  },
  {
    q: "What are the highest scoring 5-letter Scrabble words?",
    a: "The highest scoring five-letter Scrabble words (before board bonuses) include JAZZY (35 pts), FIZZY (29 pts), FUZZY (29 pts), WHIZZ (29 pts), PIZZA (24 pts), JACKY (24 pts), JUMPY (22 pts), QUAKY (21 pts), QUAFF (21 pts), and ZLOTY (17 pts). These rely on high-value letters like J (8), Q (10), X (8), and Z (10)."
  },
  {
    q: "Can I use this tool as a Wordle cheat or helper?",
    a: "Absolutely! Our Wordle Helper tab is specifically designed for this. Enter each letter from your guesses, then click each tile to assign its color (green = correct position, yellow = wrong position, gray = not in word). The tool will filter our word list to show all remaining valid possibilities. It's a great way to learn from your guesses or get unstuck!"
  }
];

// SEO Accordion content by word length
const SEO_ACCORDION = [
  {
    title: "📝 1 & 2 Letter Words — The Building Blocks",
    content: `<p>One-letter and two-letter words are the shortest entries in the English dictionary, yet they are incredibly powerful. The single-letter words are just <strong>A</strong> and <strong>I</strong>, but two-letter words number over 100, including vital connectors like AN, BE, BY, DO, GO, HE, IF, IN, IS, IT, ME, MY, NO, OF, ON, OR, SO, TO, UP, US, WE.</p>
    <p>In Scrabble, two-letter words are essential for creating parallel plays, hooking onto existing words, and clearing difficult letter combinations. Memorizing all valid two-letter words (like AA, AE, AI, OE, OI, XI, XU) is considered a fundamental Scrabble skill.</p>
    <ul><li>26 valid 1-letter words in English</li><li>Over 100 valid 2-letter Scrabble words</li><li>Critical for crossword and Scrabble strategy</li></ul>`
  },
  {
    title: "📝 3 Letter Words — Short & Sweet",
    content: `<p>Three-letter words are the first "real" words most children learn and form the foundation of early literacy. There are approximately 1,015 common three-letter words in English, spanning every part of speech.</p>
    <p>Common examples include <strong>ACE, BIT, CAT, DOG, EGG, FLY, GUN, HIT, ICE, JAB, KEY, LAP, MAP, NAP, OAK, PAN, QAT, RAT, SAP, TAN, URN, VAN, WAX, YAK, ZAP</strong>.</p>
    <p>Three-letter words are essential in Scrabble for making efficient plays and in crossword puzzles for filling short spaces. Words like AXE (13 pts), ZAP (14 pts), and QUA (12 pts) can score surprisingly well in word games.</p>
    <ul><li>~1,015 common 3-letter words</li><li>First words learned in school</li><li>Key strategic plays in Scrabble</li></ul>`
  },
  {
    title: "📝 4 Letter Words — Everyday Language",
    content: `<p>Four-letter words are incredibly common in everyday English, numbering nearly 4,000 distinct words. They make up a large portion of casual conversation and everyday writing.</p>
    <p>Popular four-letter words include <strong>ABLE, BACK, CALL, DARK, EASY, FACE, GAME, HALF, IDEA, JUMP, KEEP, LAND, MAKE, NAME, OPEN, PART, RACE, SAID, TAKE, USED, VIEW, WALK, YEAR, ZERO</strong>.</p>
    <p>In word games, four-letter words are often used as bridges between longer words in Scrabble, and they commonly appear in every style of crossword puzzle. High-value four-letter words for Scrabble include JAZZ (29 pts), QUIZ (22 pts), and JINX (17 pts).</p>
    <ul><li>~3,996 common 4-letter English words</li><li>Make up ~15% of everyday speech</li><li>Essential for Scrabble board connections</li></ul>`
  },
  {
    title: "⭐ 5 Letter Words — The Sweet Spot (Most Popular)",
    content: `<p>Five-letter words are the most celebrated word length in the English language, largely thanks to the worldwide phenomenon of <strong>Wordle</strong>. With approximately 8,500 common five-letter words, this length strikes the perfect balance between accessibility and complexity.</p>
    <p>Five-letter words span every category: nouns (APPLE, BREAD, CHAIR, DANCE), verbs (BLINK, CHASE, DREAM, EXCEL), adjectives (CRISP, DIZZY, EAGER, FANCY), and adverbs (BADLY, EARLY, ODDLY, SADLY).</p>
    <p>For Scrabble players, five-letter words are ideal — long enough to score well but short enough to fit almost anywhere on the board. Strategic five-letter plays include JAZZY (35 pts), FIZZY (29 pts), and JUMPY (22 pts).</p>
    <ul><li>~8,500 common 5-letter words</li><li>Used daily in Wordle worldwide</li><li>Sweet spot for vocabulary expansion</li><li>Most common crossword answer length</li></ul>`
  },
  {
    title: "📝 6 Letter Words — Step Up Your Vocabulary",
    content: `<p>Six-letter words represent a significant step up in vocabulary complexity, numbering around 15,000 in common English usage. Mastering six-letter words is a great way to expand expressive range and improve word game performance.</p>
    <p>Common six-letter words include <strong>ABLAZE, BATTLE, CASTLE, DANGER, EASILY, FAMINE, GARLIC, HANDLE, INSECT, JIGSAW, KEEPER, LIVELY, MANAGE, NAMELY, OPENLY, PEPPER, RACKET, SAFETY, TANGLE, UNITED</strong>.</p>
    <p>In Scrabble, six-letter words can create high-value plays across premium squares. Six-letter bingo extensions (adding one tile to a five-tile rack) are a key advanced strategy.</p>
    <ul><li>~15,000 common 6-letter words</li><li>Ideal for expanding vocabulary</li><li>Important in advanced Scrabble play</li></ul>`
  },
  {
    title: "📝 7 Letter Words — The Scrabble Bingo",
    content: `<p>Seven-letter words are the holy grail of Scrabble — using all seven tiles earns a 50-point bonus called a "bingo." There are approximately 23,000 valid seven-letter words in Scrabble dictionaries.</p>
    <p>Common seven-letter words: <strong>ABANDON, BALANCE, CASCADE, DYNAMIC, ELEMENT, FANTASY, GRAVITY, HARMONY, INSPIRE, JOURNEY, KINDRED, LIBERTY, MANSION, NETWORK, OVERTLY, PLANETS</strong>.</p>
    <p>Competitive Scrabble players study "sevens" extensively — high-probability sets like SATINE, SATIRE, RETAINS, RETINAS, NASTIER, and ANESTRI are essential knowledge. The key to finding bingos is recognizing common seven-letter stems.</p>
    <ul><li>~23,000 valid 7-letter Scrabble words</li><li>Using all 7 tiles = 50-point bonus</li><li>Key for competitive Scrabble mastery</li></ul>`
  },
  {
    title: "📝 8 & 9 Letter Words — Advanced Vocabulary",
    content: `<p>Eight and nine-letter words represent the upper tiers of everyday vocabulary. While less common in casual speech, they are essential for formal writing, academic work, and advanced word gaming.</p>
    <p><strong>8-letter examples:</strong> ABSOLUTE, BACKBONE, CALENDAR, DARKNESS, EDUCATED, FAITHFUL, GRACEFUL, HERITAGE, INNOCENT, JOYFULLY, KEYBOARD, LANGUAGE, MANIFEST, OBSTACLE.</p>
    <p><strong>9-letter examples:</strong> ABANDONED, BEAUTIFUL, CALCULATE, DANGEROUS, ELSEWHERE, FANTASTIC, GENERALLY, HIGHLIGHT, IMPORTANT, JEWELLERY, KNOWLEDGE, LANDSCAPE, MEANWHILE, NECESSARY.</p>
    <p>In Scrabble, eight-letter bingos (+50 pts) are rare and impressive. Nine-letter words (using all 7 tiles plus two on the board) are considered expert-level plays. Many champion Scrabble players study eight and nine-letter word patterns extensively.</p>
    <ul><li>~28,000 common 8-letter words</li><li>~24,000 common 9-letter words</li><li>Essential for academic and formal writing</li><li>Eight-letter bingos score 50+ bonus points</li></ul>`
  },
];
