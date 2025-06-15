export interface Specialist {
  id: string;
  name: string;
  title: string;
  expertise: string;
  rating: number;
  distance: string;
  availability: string;
  price: number;
  image?: string;
}

export const specialistsByCondition = {
  shoulder: [
    {
      id: "1",
      name: "Dr. Erik",
      title: "Orthopedic Surgeon",
      expertise:
        "Shoulder & rotator cuff specialist with 15+ years experience. Expert in minimally invasive procedures.",
      rating: 4.9,
      distance: "1.2 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "2",
      name: "Dr. Ingrid",
      title: "Sports Medicine Physician",
      expertise:
        "Specializes in shoulder injuries and rehabilitation. Former team doctor for Norwegian Olympic team.",
      rating: 4.8,
      distance: "2.1 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "3",
      name: "Dr. Lars",
      title: "Physiotherapy Specialist",
      expertise:
        "Expert in shoulder impingement treatment and recovery. Focus on non-surgical solutions.",
      rating: 4.7,
      distance: "0.8 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  abdomen: [
    {
      id: "4",
      name: "Dr. Maria",
      title: "Gastroenterologist",
      expertise:
        "Specialist in digestive disorders and abdominal pain. Expert in endoscopic procedures.",
      rating: 4.9,
      distance: "1.5 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "5",
      name: "Dr. Thomas",
      title: "Internal Medicine",
      expertise:
        "Comprehensive abdominal health specialist. Focus on gastritis and ulcer treatment.",
      rating: 4.8,
      distance: "2.3 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "6",
      name: "Dr. Anna",
      title: "General Surgeon",
      expertise:
        "Abdominal surgery specialist with focus on minimally invasive techniques.",
      rating: 4.7,
      distance: "1.8 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  knee: [
    {
      id: "7",
      name: "Dr. Olav",
      title: "Orthopedic Surgeon",
      expertise:
        "Knee specialist with focus on sports injuries and joint replacement. 20+ years experience.",
      rating: 4.9,
      distance: "1.1 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "8",
      name: "Dr. Kari",
      title: "Sports Medicine",
      expertise:
        "Knee injury rehabilitation specialist. Expert in non-surgical treatment options.",
      rating: 4.8,
      distance: "1.9 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "9",
      name: "Dr. Henrik",
      title: "Physiotherapist",
      expertise:
        "Knee pain and mobility specialist. Focus on patellofemoral syndrome treatment.",
      rating: 4.7,
      distance: "1.4 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  foot: [
    {
      id: "10",
      name: "Dr. Sofie",
      title: "Podiatrist",
      expertise:
        "Foot and ankle specialist. Expert in plantar fasciitis and heel pain treatment.",
      rating: 4.9,
      distance: "1.3 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "11",
      name: "Dr. Magnus",
      title: "Orthopedic Surgeon",
      expertise:
        "Foot and ankle surgery specialist. Focus on sports-related foot injuries.",
      rating: 4.8,
      distance: "2.0 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "12",
      name: "Dr. Lise",
      title: "Physical Therapist",
      expertise:
        "Foot biomechanics specialist. Expert in gait analysis and corrective therapy.",
      rating: 4.7,
      distance: "1.6 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
  "lower back": [
    {
      id: "13",
      name: "Dr. Bjørn",
      title: "Spine Specialist",
      expertise:
        "Lower back and spine specialist. Expert in sciatica and disc herniation treatment.",
      rating: 4.9,
      distance: "1.4 km",
      availability: "Available today",
      price: 1450,
    },
    {
      id: "14",
      name: "Dr. Astrid",
      title: "Neurologist",
      expertise:
        "Nerve pain specialist focusing on sciatica and lower back nerve issues.",
      rating: 4.8,
      distance: "1.7 km",
      availability: "Available tomorrow",
      price: 1450,
    },
    {
      id: "15",
      name: "Dr. Petter",
      title: "Chiropractor",
      expertise:
        "Spinal alignment specialist. Focus on non-invasive lower back pain treatment.",
      rating: 4.7,
      distance: "1.2 km",
      availability: "Available in 2 days",
      price: 1450,
    },
  ],
};
