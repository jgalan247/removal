// Curriculum Data: Subject → Term → Topics
const curriculumData = {
    "Maths": {
        "Term 1": [
            "Place Value", "Estimation", "Addition (formal methods)", "Addition (mental methods)",
            "Subtraction (formal methods)", "Subtraction (mental methods)", "Perimeter",
            "Measurement", "Money", "Directed Addition", "Directed Subtraction", "Time"
        ],
        "Term 2": [
            "Area of Rectilinear Shapes", "Multiplication (1-digit × 4-digit)",
            "Multiplication (2-digit × 4-digit)", "Short Division", "Long Division",
            "Area of Triangles", "Area of Compound Shapes", "BIDMAS"
        ],
        "Term 3": [
            "Equivalent Fractions", "Simplifying Fractions", "Converting Fractions",
            "Adding Fractions", "Subtracting Fractions", "Multiplying Fractions",
            "Dividing Fractions", "Percentages of Quantities", "Fractions & Percentages Consolidation"
        ],
        "Term 4": [
            "Simplifying Algebraic Expressions", "Substitution", "Function Machines",
            "Sequences (finding terms)", "Sequences (finding nth term)", "BIDMAS Revision",
            "Algebra Consolidation"
        ],
        "Term 5": [
            "Angles up to 90°", "Angles up to 180°", "Angles up to 360°",
            "Properties of Triangles", "Properties of Quadrilaterals",
            "Combined Angle Problems", "Angles Consolidation"
        ],
        "Term 6": [
            "Tally Charts", "Bar Charts", "Pie Charts", "Data Analysis",
            "Data Handling Consolidation"
        ]
    },
    "English": {
        "Term 1": [
            "Narrative Writing (Character)", "Narrative Writing (Setting)", "Sentence Structure",
            "Punctuation Basics", "Reading Comprehension (Fiction)", "Vocabulary Building",
            "Spelling Patterns", "Grammar: Nouns and Verbs"
        ],
        "Term 2": [
            "Persuasive Writing", "Letter Writing (Formal)", "Letter Writing (Informal)",
            "Reading Comprehension (Non-fiction)", "Grammar: Adjectives and Adverbs",
            "Paragraphing", "Speech Marks and Dialogue", "Homophones"
        ],
        "Term 3": [
            "Poetry Analysis", "Poetry Writing", "Figurative Language (Similes)",
            "Figurative Language (Metaphors)", "Reading Comprehension (Poetry)",
            "Grammar: Conjunctions", "Prefixes and Suffixes", "Creative Descriptions"
        ],
        "Term 4": [
            "Report Writing", "Explanation Texts", "Instructions Writing",
            "Non-fiction Features", "Grammar: Tenses", "Active and Passive Voice",
            "Formal vs Informal Language", "Research Skills"
        ],
        "Term 5": [
            "Narrative Writing (Plot)", "Narrative Writing (Tension)", "Diary Entries",
            "Newspaper Reports", "Grammar: Clauses", "Complex Sentences",
            "Reading Comprehension (Inference)", "Editing and Proofreading"
        ],
        "Term 6": [
            "Playscripts", "Speeches and Presentations", "Debate and Discussion",
            "Reading Comprehension (Mixed)", "Grammar Consolidation", "Extended Writing",
            "SPaG Revision", "Creative Writing Portfolio"
        ]
    },
    "Science": {
        "Term 1": [
            "Living Things and Habitats", "Classification", "Food Chains", "Plant Structure",
            "Animal Adaptations", "Cells (Introduction)", "Microscopy", "Scientific Enquiry"
        ],
        "Term 2": [
            "Materials and Properties", "States of Matter", "Separating Mixtures",
            "Dissolving", "Reversible Changes", "Irreversible Changes",
            "The Particle Model", "Practical Investigations"
        ],
        "Term 3": [
            "Forces", "Gravity", "Friction", "Air Resistance", "Water Resistance",
            "Levers and Pulleys", "Balanced and Unbalanced Forces", "Force Diagrams"
        ],
        "Term 4": [
            "Electricity", "Circuits", "Conductors and Insulators",
            "Series and Parallel Circuits", "Voltage and Current",
            "Magnets and Magnetism", "Electromagnets", "Energy Transfer"
        ],
        "Term 5": [
            "Earth and Space", "The Solar System", "Day and Night", "Seasons",
            "The Moon", "Rocks and Soils", "Fossils", "The Rock Cycle"
        ],
        "Term 6": [
            "Human Body Systems", "Digestive System", "Circulatory System",
            "Respiratory System", "Skeleton and Muscles", "Health and Nutrition",
            "Reproduction (Age-appropriate)", "Science Consolidation"
        ]
    },
    "History": {
        "Term 1": [
            "Ancient Egypt", "Pharaohs and Pyramids", "Mummification",
            "Egyptian Daily Life", "Hieroglyphics", "The River Nile",
            "Egyptian Gods", "Using Historical Sources"
        ],
        "Term 2": [
            "Ancient Greece", "Greek City-States", "Athenian Democracy", "Sparta",
            "Greek Gods and Myths", "The Olympic Games", "Greek Philosophy",
            "Alexander the Great"
        ],
        "Term 3": [
            "The Romans", "Roman Britain", "The Roman Army", "Roman Society",
            "Hadrian's Wall", "Roman Roads and Buildings", "Roman Gods",
            "Fall of the Roman Empire"
        ],
        "Term 4": [
            "Anglo-Saxons", "Viking Invasions", "Viking Settlements",
            "Alfred the Great", "Anglo-Saxon Culture", "Viking Longships",
            "Danelaw", "1066 and the Norman Conquest"
        ],
        "Term 5": [
            "Medieval Britain", "The Feudal System", "Castles and Warfare",
            "Medieval Towns", "The Black Death", "Peasants' Revolt",
            "Medieval Church", "Magna Carta"
        ],
        "Term 6": [
            "The Tudors", "Henry VIII", "The Reformation", "Elizabeth I",
            "Tudor Daily Life", "Exploration and Discovery", "The Spanish Armada",
            "History Skills Consolidation"
        ]
    },
    "Geography": {
        "Term 1": [
            "Map Skills", "Compass Directions", "Grid References", "Scale and Distance",
            "OS Map Symbols", "UK Countries and Capitals", "Physical Features of the UK",
            "Human Features of the UK"
        ],
        "Term 2": [
            "Rivers", "The Water Cycle", "River Features", "Flooding",
            "River Management", "Coasts", "Coastal Erosion", "Coastal Management"
        ],
        "Term 3": [
            "Weather and Climate", "Measuring Weather", "Climate Zones",
            "Climate Change", "Extreme Weather", "Microclimates",
            "Weather Forecasting", "Climate Data Analysis"
        ],
        "Term 4": [
            "Europe", "European Countries", "European Climates", "European Landmarks",
            "The European Union", "Comparing European Regions", "Trade and Tourism",
            "Case Study: A European Country"
        ],
        "Term 5": [
            "Rainforests", "Rainforest Layers", "Rainforest Ecosystems",
            "Deforestation", "Sustainability", "Deserts", "Desert Adaptations",
            "Biomes Comparison"
        ],
        "Term 6": [
            "Settlement and Land Use", "Urban and Rural", "Population", "Migration",
            "Economic Activities", "Globalisation", "Fieldwork Investigation",
            "Geography Skills Consolidation"
        ]
    },
    "Computing": {
        "Term 1": [
            "E-Safety and Digital Citizenship", "Online Privacy", "Cyberbullying",
            "Reliable Sources", "Digital Footprint", "Password Security",
            "Screen Time and Wellbeing", "Reporting Concerns"
        ],
        "Term 2": [
            "Algorithms", "Decomposition", "Sequencing", "Selection (If statements)",
            "Iteration (Loops)", "Flowcharts", "Pseudocode", "Debugging"
        ],
        "Term 3": [
            "Block-based Programming", "Scratch Basics", "Sprites and Costumes",
            "Motion and Events", "Variables in Scratch", "Broadcast Messages",
            "Creating Games", "Creating Animations"
        ],
        "Term 4": [
            "Text-based Programming", "Python Basics", "Variables and Data Types",
            "Input and Output", "Operators", "Conditional Statements",
            "Loops in Python", "Simple Programs"
        ],
        "Term 5": [
            "Data and Information", "Spreadsheets", "Formulas and Functions",
            "Charts and Graphs", "Databases", "Searching and Sorting",
            "Data Collection", "Presenting Data"
        ],
        "Term 6": [
            "Computer Systems", "Hardware and Software", "Input and Output Devices",
            "Storage", "Networks and the Internet", "How the Web Works",
            "Binary Numbers", "Computing Consolidation"
        ]
    },
    "French": {
        "Term 1": [
            "Greetings and Introductions", "Numbers 1-31", "Days and Months",
            "Alphabet and Spelling", "Classroom Instructions", "Age and Birthdays",
            "Basic Pronunciation", "Simple Questions"
        ],
        "Term 2": [
            "Family Members", "Describing People", "Physical Descriptions",
            "Personality Adjectives", "Pets and Animals", "Avoir (to have)",
            "Être (to be)", "Adjective Agreement"
        ],
        "Term 3": [
            "School Subjects", "School Day Routine", "Telling the Time",
            "Opinions about School", "School Uniform", "Regular -ER Verbs",
            "Negatives (ne...pas)", "Connectives"
        ],
        "Term 4": [
            "Food and Drink", "At the Café", "Likes and Dislikes",
            "Healthy Eating", "French Mealtimes", "Partitive Articles",
            "Regular -IR and -RE Verbs", "Ordering Food"
        ],
        "Term 5": [
            "Town and Local Area", "Places in Town", "Directions",
            "Where I Live", "Transport", "Aller (to go)",
            "Prepositions of Place", "Future Plans (aller + infinitive)"
        ],
        "Term 6": [
            "Hobbies and Free Time", "Sports", "Music and Technology",
            "Weekend Activities", "Faire (to do/make)", "Past Tense (Introduction)",
            "Cultural Awareness", "French Consolidation"
        ]
    },
    "Spanish": {
        "Term 1": [
            "Greetings and Introductions", "Numbers 1-31", "Days and Months",
            "Alphabet and Spelling", "Classroom Instructions", "Age and Birthdays",
            "Basic Pronunciation", "Simple Questions"
        ],
        "Term 2": [
            "Family Members", "Describing People", "Physical Descriptions",
            "Personality Adjectives", "Pets and Animals", "Tener (to have)",
            "Ser and Estar (to be)", "Adjective Agreement"
        ],
        "Term 3": [
            "School Subjects", "School Day Routine", "Telling the Time",
            "Opinions about School", "School Uniform", "Regular -AR Verbs",
            "Negatives", "Connectives"
        ],
        "Term 4": [
            "Food and Drink", "At the Restaurant", "Likes and Dislikes",
            "Healthy Eating", "Spanish Mealtimes", "Gustar (to like)",
            "Regular -ER and -IR Verbs", "Ordering Food"
        ],
        "Term 5": [
            "Town and Local Area", "Places in Town", "Directions",
            "Where I Live", "Transport", "Ir (to go)",
            "Prepositions of Place", "Future Plans (ir a + infinitive)"
        ],
        "Term 6": [
            "Hobbies and Free Time", "Sports", "Music and Technology",
            "Weekend Activities", "Hacer (to do/make)", "Past Tense (Introduction)",
            "Cultural Awareness", "Spanish Consolidation"
        ]
    }
};

// SEND Adaptation Guidelines
const sendGuidelines = {
    "Autism": "predictable structure, minimal distractions, visual cues, consistent formatting, clear expectations, numbered steps, avoid ambiguous language, use literal instructions",
    "Dyslexia": "short sentences, highlighted keywords, avoid dense text, use sans-serif font, good line spacing, bullet points, avoid italics, use bold for emphasis instead",
    "ADHD": "short focused tasks, engaging real-world contexts, step-by-step instructions, varied question styles, chunked information, clear start/end points for each task",
    "Slow Processing": "simplified wording, chunked steps, consistent moderate white space (not excessive), 4-5 questions per page, bordered working boxes instead of blank space, clear visual structure",
    "Anxiety": "encouraging tone, confidence-building language, low-stakes practice, positive reinforcement, gentle difficulty progression, include reassuring prompts like 'Try your best'"
};

// Subject-specific formatting notes
const subjectFormatting = {
    "Maths": "Use LaTeX notation for mathematical expressions (e.g., \\frac{1}{2}, x^2, \\times, \\div)",
    "English": "Include text extracts where relevant, use clear formatting for writing frames",
    "Science": "Include diagram descriptions where helpful, use scientific terminology appropriately",
    "History": "Include source material references where relevant, use chronological ordering",
    "Geography": "Reference maps and diagrams where appropriate, include case study examples",
    "Computing": "Use code blocks for any programming examples, include pseudocode where helpful",
    "French": "Include French text with English translations in brackets, use accent marks correctly",
    "Spanish": "Include Spanish text with English translations in brackets, use accent marks and ñ correctly"
};

// Subject-specific visual support
const visualSupport = {
    "Maths": "Include diagrams of shapes (triangles, rectangles, circles), number lines, bar models, fraction diagrams, graphs, or tables as needed for each question. Draw the shapes/diagrams directly in the worksheet.",
    "English": "Include text boxes for extracts, graphic organisers, story maps, or writing frames where appropriate to support comprehension and writing tasks.",
    "Science": "Include labelled diagrams of experiments, organisms, body parts, circuits, or scientific processes. Diagrams should be clear and annotated.",
    "History": "Include timelines, source images descriptions, or historical artefact illustrations to help students engage with historical evidence.",
    "Geography": "Include simple maps, climate graphs, or diagrams showing geographical features. Use annotated diagrams for processes like the water cycle.",
    "Computing": "Include flowcharts, pseudocode boxes, or screen layout diagrams to visualise algorithms and processes.",
    "French": "Include images depicting vocabulary items, speech bubbles for dialogue practice, or visual scenarios to support language learning.",
    "Spanish": "Include images depicting vocabulary items, speech bubbles for dialogue practice, or visual scenarios to support language learning."
};
