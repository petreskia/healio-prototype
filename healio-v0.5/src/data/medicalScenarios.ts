export interface MedicalScenario {
  keywords: string[];
  condition: string;
  questions: string[];
  diagnosis: string;
  specialistType: string;
}

export const medicalScenarios: MedicalScenario[] = [
  {
    keywords: ["shoulder", "arm", "rotator", "cuff"],
    condition: "shoulder",
    questions: [
      "On a scale of 1-10, how would you rate the pain intensity?",
      "Does the pain worsen when you rotate your arm upward or to the side?",
      "Have you noticed any swelling or stiffness in the shoulder area?",
      "When did you first notice this pain? Was it after a specific activity or injury?",
      "Do you experience pain at night or when lying on that shoulder?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Rotator Cuff Impingement** (also known as shoulder impingement syndrome). This is a common condition where the tendons in your shoulder get compressed, causing pain and limited mobility.",
    specialistType: "shoulder",
  },
  {
    keywords: ["abdomen", "stomach", "belly", "abdominal", "digestive"],
    condition: "abdomen",
    questions: [
      "On a scale of 1-10, how would you rate the abdominal pain intensity?",
      "Is the pain localized to a specific area or does it spread across your abdomen?",
      "Do you experience nausea, vomiting, or changes in bowel movements?",
      "Does the pain worsen after eating or drinking?",
      "Have you noticed any bloating, fever, or loss of appetite?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Gastritis** or **Peptic Ulcer Disease**. This condition involves inflammation of the stomach lining, which can cause abdominal pain and digestive issues.",
    specialistType: "gastroenterology",
  },
  {
    keywords: ["knee", "kneecap", "patella", "leg"],
    condition: "knee",
    questions: [
      "On a scale of 1-10, how would you rate the knee pain intensity?",
      "Does the pain occur when you bend, straighten, or put weight on your knee?",
      "Have you noticed any swelling, stiffness, or clicking sounds?",
      "Did the pain start after a specific injury or gradually over time?",
      "Do you experience pain when walking up or down stairs?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Patellofemoral Pain Syndrome** (also known as runner's knee). This condition involves pain around the kneecap, often caused by overuse or misalignment.",
    specialistType: "orthopedic",
  },
  {
    keywords: ["foot", "ankle", "heel", "toe", "plantar"],
    condition: "foot",
    questions: [
      "On a scale of 1-10, how would you rate the foot pain intensity?",
      "Is the pain located in your heel, arch, toes, or ankle area?",
      "Does the pain worsen when you first step out of bed in the morning?",
      "Do you experience pain after long periods of standing or walking?",
      "Have you noticed any swelling, numbness, or tingling sensations?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Plantar Fasciitis**. This is a common condition where the thick band of tissue supporting your foot arch becomes inflamed, causing heel and arch pain.",
    specialistType: "podiatry",
  },
  {
    keywords: ["back", "spine", "lower back", "lumbar", "sciatica"],
    condition: "lower back",
    questions: [
      "On a scale of 1-10, how would you rate the back pain intensity?",
      "Does the pain radiate down to your legs or buttocks?",
      "Is the pain worse when sitting, standing, or lying down?",
      "Do you experience any numbness, tingling, or weakness in your legs?",
      "Did the pain start suddenly or develop gradually over time?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Lower Back Strain** or **Sciatica**. This condition involves irritation of the lower back muscles or sciatic nerve, causing pain that may radiate down your leg.",
    specialistType: "orthopedic",
  },
];
