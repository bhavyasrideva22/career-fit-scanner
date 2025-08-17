import { Question } from "@/types/assessment";

export const psychometricQuestions: Question[] = [
  {
    id: "psych_1",
    text: "I enjoy helping others fix technical issues.",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    construct: "helping_orientation"
  },
  {
    id: "psych_2",
    text: "I like being the go-to person when technology fails.",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    construct: "tech_leadership"
  },
  {
    id: "psych_3",
    text: "I remain calm under pressure when dealing with frustrated people.",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    construct: "emotional_stability"
  },
  {
    id: "psych_4",
    text: "I prefer following documented troubleshooting steps over inventing new methods.",
    type: "likert",
    category: "psychometric",
    subcategory: "cognitive_style",
    construct: "structured_approach"
  },
  {
    id: "psych_5",
    text: "Helping others with tech gives me a sense of purpose.",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    construct: "intrinsic_motivation"
  },
  {
    id: "psych_6",
    text: "I'm interested in long-term growth in tech support roles.",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    construct: "career_commitment"
  },
  {
    id: "psych_7",
    text: "I enjoy explaining complex technical concepts in simple terms.",
    type: "likert",
    category: "psychometric",
    subcategory: "communication",
    construct: "technical_communication"
  }
];

export const technicalQuestions: Question[] = [
  {
    id: "tech_1",
    text: "What does DNS stand for?",
    type: "multiple_choice",
    options: [
      "Domain Name System",
      "Dynamic Network Service", 
      "Direct Network Server",
      "Digital Name Storage"
    ],
    category: "technical",
    subcategory: "networking"
  },
  {
    id: "tech_2",
    text: "Which command is used to test network connectivity?",
    type: "multiple_choice",
    options: ["ping", "connect", "test", "network"],
    category: "technical",
    subcategory: "networking"
  },
  {
    id: "tech_3",
    text: "What does a 502 Bad Gateway error indicate?",
    type: "multiple_choice",
    options: [
      "The server received an invalid response from upstream server",
      "The client made a bad request",
      "The server is overloaded",
      "The DNS lookup failed"
    ],
    category: "technical",
    subcategory: "troubleshooting"
  },
  {
    id: "tech_4",
    text: "Which file system is commonly used in Windows?",
    type: "multiple_choice",
    options: ["NTFS", "EXT4", "HFS+", "ZFS"],
    category: "technical",
    subcategory: "operating_systems"
  },
  {
    id: "tech_5",
    text: "What port does HTTP typically use?",
    type: "multiple_choice",
    options: ["80", "443", "21", "22"],
    category: "technical",
    subcategory: "networking"
  },
  {
    id: "tech_6",
    text: "What is the purpose of a help desk ticketing system?",
    type: "multiple_choice",
    options: [
      "Track and manage support requests",
      "Monitor network performance",
      "Store user passwords",
      "Create user accounts"
    ],
    category: "technical",
    subcategory: "tools"
  }
];

export const aptitudeQuestions: Question[] = [
  {
    id: "apt_1",
    text: "A user can't connect to Wi-Fi. What should be your first step?",
    type: "multiple_choice",
    options: [
      "Check if Wi-Fi is enabled on their device",
      "Restart the router",
      "Reinstall network drivers",
      "Contact the ISP"
    ],
    category: "aptitude",
    subcategory: "problem_solving"
  },
  {
    id: "apt_2",
    text: "A customer calls frustrated that their email isn't working. How do you respond?",
    type: "multiple_choice",
    options: [
      "Acknowledge their frustration and assure them you'll help resolve it",
      "Immediately ask for technical details",
      "Tell them to restart their computer",
      "Transfer them to a specialist"
    ],
    category: "aptitude",
    subcategory: "communication"
  },
  {
    id: "apt_3",
    text: "You encounter an error you've never seen before. What do you do?",
    type: "multiple_choice",
    options: [
      "Research the error and consult documentation",
      "Guess based on similar errors",
      "Immediately escalate to senior staff",
      "Tell the user you can't help"
    ],
    category: "aptitude",
    subcategory: "learning_agility"
  },
  {
    id: "apt_4",
    text: "If A > B and B > C, which statement is always true?",
    type: "multiple_choice",
    options: ["A > C", "C > A", "A = C", "Cannot determine"],
    category: "aptitude",
    subcategory: "logical_reasoning"
  },
  {
    id: "apt_5",
    text: "A user reports their computer is 'running slow'. What information do you need first?",
    type: "multiple_choice",
    options: [
      "When did the slowness start and what were they doing",
      "Their computer specifications",
      "Their internet speed",
      "Their operating system version"
    ],
    category: "aptitude",
    subcategory: "diagnostic_thinking"
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: "wiscar_1",
    text: "I persist through difficult technical problems even when initial solutions don't work.",
    type: "likert",
    category: "wiscar",
    subcategory: "will",
    construct: "persistence"
  },
  {
    id: "wiscar_2",
    text: "I'm genuinely curious about how technology works and why it fails.",
    type: "likert",  
    category: "wiscar",
    subcategory: "interest",
    construct: "curiosity"
  },
  {
    id: "wiscar_3",
    text: "I have strong written and verbal communication skills.",
    type: "likert",
    category: "wiscar",
    subcategory: "skill",
    construct: "communication"
  },
  {
    id: "wiscar_4",
    text: "I can effectively multitask and prioritize multiple support requests.",
    type: "likert",
    category: "wiscar",
    subcategory: "cognitive",
    construct: "multitasking"
  },
  {
    id: "wiscar_5",
    text: "I actively seek feedback and use it to improve my performance.",
    type: "likert",
    category: "wiscar",
    subcategory: "ability",
    construct: "growth_mindset"
  },
  {
    id: "wiscar_6",
    text: "I would find daily technical support work engaging and rewarding.",
    type: "likert",
    category: "wiscar",
    subcategory: "realWorld",
    construct: "job_satisfaction"
  }
];

export const likertOptions = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];