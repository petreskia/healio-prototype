"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bot, User, Send, Zap } from "lucide-react";

interface Message {
  id: number;
  type: "ai" | "user";
  content: string;
}

interface MedicalScenario {
  keywords: string[];
  condition: string;
  questions: string[];
  diagnosis: string;
  specialistType: string;
}

interface QuickAction {
  text: string;
  value: string;
  icon?: string;
}

const medicalScenarios: MedicalScenario[] = [
  {
    keywords: ["shoulder", "arm", "rotator", "cuff"],
    condition: "shoulder",
    questions: [
      "On a scale of 1-10, how would you rate the pain intensity?",
      "Does the pain worsen when you rotate your arm upward or to the side?",
      "When did you first notice this pain? Was it after a specific activity or injury?",
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
      "Do you experience pain after long periods of standing or walking?",
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
      "Is the pain worse when sitting, standing, or lying down?",
      "Do you experience any numbness, tingling, or weakness in your legs?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Lower Back Strain** or **Sciatica**. This condition involves irritation of the lower back muscles or sciatic nerve, causing pain that may radiate down your leg.",
    specialistType: "orthopedic",
  },
  {
    keywords: [
      "headache",
      "migraine",
      "head",
      "nerve",
      "dizziness",
      "tingling",
      "numbness",
    ],
    condition: "head and nerves",
    questions: [
      "On a scale of 1-10, how would you rate the intensity of your headaches or nerve symptoms?",
      "Do you experience any visual disturbances, nausea, or sensitivity to light during episodes?",
      "Have you noticed any patterns or triggers that seem to bring on your symptoms?",
    ],
    diagnosis:
      "Based on your symptoms, you might be experiencing **Tension Headaches**, **Migraines**, or **Peripheral Neuropathy**. These conditions can cause various neurological symptoms including headaches, nerve pain, tingling, and sensory disturbances.",
    specialistType: "neurology",
  },
];

// Quick action responses based on question patterns
const getQuickActions = (
  currentQuestion: string,
  condition: string
): QuickAction[] => {
  const question = currentQuestion.toLowerCase();

  // Pain intensity scale questions
  if (question.includes("scale of 1-10") && question.includes("intensity")) {
    return [
      { text: "Mild (3-4)", value: "The pain is mild, around 3-4 out of 10" },
      {
        text: "Moderate (5-6)",
        value: "The pain is moderate, around 5-6 out of 10",
      },
      {
        text: "Severe (7-8)",
        value: "The pain is severe, around 7-8 out of 10",
      },
      {
        text: "Very Severe (9-10)",
        value: "The pain is very severe, around 9-10 out of 10",
      },
    ];
  }

  // Shoulder-specific questions
  if (condition === "shoulder") {
    if (question.includes("rotate") && question.includes("upward")) {
      return [
        {
          text: "Yes, much worse",
          value:
            "Yes, the pain gets much worse when I rotate my arm upward or to the side",
        },
        {
          text: "Slightly worse",
          value: "The pain gets slightly worse with arm rotation",
        },
        {
          text: "No difference",
          value: "No, rotating my arm doesn't change the pain",
        },
      ];
    }
    if (question.includes("when did you first notice")) {
      return [
        {
          text: "After exercise",
          value: "I first noticed it after exercising or physical activity",
        },
        {
          text: "Gradual onset",
          value: "The pain developed gradually over time",
        },
        {
          text: "After injury",
          value: "It started after a specific injury or accident",
        },
        {
          text: "Woke up with it",
          value: "I woke up with the pain one morning",
        },
      ];
    }
  }

  // Abdomen-specific questions
  if (condition === "abdomen") {
    if (question.includes("localized") && question.includes("spread")) {
      return [
        {
          text: "Upper abdomen",
          value: "The pain is mainly in my upper abdomen",
        },
        {
          text: "Lower abdomen",
          value: "The pain is mainly in my lower abdomen",
        },
        {
          text: "Spreads across",
          value: "The pain spreads across my entire abdomen",
        },
        { text: "Around navel", value: "The pain is centered around my navel" },
      ];
    }
    if (question.includes("bloating") || question.includes("fever")) {
      return [
        {
          text: "Yes, bloating",
          value: "Yes, I've noticed bloating and discomfort",
        },
        {
          text: "Some fever",
          value: "I've had some fever and loss of appetite",
        },
        {
          text: "No other symptoms",
          value: "No, I haven't noticed bloating, fever, or appetite changes",
        },
      ];
    }
  }

  // Knee-specific questions
  if (condition === "knee") {
    if (question.includes("bend") && question.includes("straighten")) {
      return [
        {
          text: "When bending",
          value: "The pain occurs mainly when I bend my knee",
        },
        {
          text: "When straightening",
          value: "The pain occurs when I straighten my knee",
        },
        {
          text: "With weight",
          value: "The pain happens when I put weight on my knee",
        },
        {
          text: "All movements",
          value: "The pain occurs with all knee movements",
        },
      ];
    }
    if (question.includes("swelling") || question.includes("clicking")) {
      return [
        {
          text: "Yes, swelling",
          value: "Yes, I've noticed swelling around my knee",
        },
        {
          text: "Clicking sounds",
          value: "Yes, I hear clicking or popping sounds",
        },
        {
          text: "Stiffness",
          value: "Yes, my knee feels stiff, especially in the morning",
        },
        {
          text: "No other symptoms",
          value: "No, I haven't noticed swelling, clicking, or stiffness",
        },
      ];
    }
  }

  // Foot-specific questions
  if (condition === "foot") {
    if (question.includes("heel") && question.includes("arch")) {
      return [
        { text: "Heel pain", value: "The pain is mainly in my heel" },
        { text: "Arch pain", value: "The pain is in my foot arch" },
        { text: "Toe area", value: "The pain is in my toes or forefoot" },
        { text: "Ankle pain", value: "The pain is around my ankle" },
      ];
    }
    if (question.includes("standing") || question.includes("walking")) {
      return [
        {
          text: "After standing",
          value: "Yes, the pain gets worse after standing for long periods",
        },
        {
          text: "After walking",
          value: "Yes, the pain increases after walking",
        },
        {
          text: "In the morning",
          value: "The pain is worst when I first get out of bed",
        },
        {
          text: "No pattern",
          value: "The pain doesn't seem to follow a specific pattern",
        },
      ];
    }
  }

  // Lower back-specific questions
  if (condition === "lower back") {
    if (question.includes("sitting") && question.includes("standing")) {
      return [
        { text: "Worse sitting", value: "The pain is worse when sitting" },
        { text: "Worse standing", value: "The pain is worse when standing" },
        {
          text: "Worse lying down",
          value: "The pain is worse when lying down",
        },
        {
          text: "No difference",
          value: "The position doesn't seem to affect the pain much",
        },
      ];
    }
    if (question.includes("numbness") || question.includes("tingling")) {
      return [
        {
          text: "Yes, numbness",
          value: "Yes, I experience numbness in my legs",
        },
        {
          text: "Tingling sensation",
          value: "Yes, I have tingling sensations in my legs",
        },
        { text: "Leg weakness", value: "Yes, I feel weakness in my legs" },
        {
          text: "No nerve symptoms",
          value: "No, I don't have numbness, tingling, or weakness",
        },
      ];
    }
  }

  // Head and nerves-specific questions
  if (condition === "head and nerves") {
    if (
      question.includes("visual") ||
      question.includes("nausea") ||
      question.includes("light")
    ) {
      return [
        {
          text: "Yes, visual issues",
          value: "Yes, I experience visual disturbances during episodes",
        },
        {
          text: "Nausea and vomiting",
          value: "Yes, I have nausea and sometimes vomiting",
        },
        {
          text: "Light sensitivity",
          value: "Yes, I'm very sensitive to light during headaches",
        },
        {
          text: "No other symptoms",
          value: "No, I don't have visual issues, nausea, or light sensitivity",
        },
      ];
    }
    if (question.includes("patterns") || question.includes("triggers")) {
      return [
        {
          text: "Stress triggers",
          value: "Stress and anxiety seem to trigger my symptoms",
        },
        {
          text: "Food triggers",
          value: "Certain foods or drinks seem to trigger episodes",
        },
        {
          text: "Sleep related",
          value: "Poor sleep or changes in sleep pattern trigger symptoms",
        },
        {
          text: "No clear pattern",
          value: "I haven't noticed any clear patterns or triggers",
        },
      ];
    }
  }

  // Default quick actions for any question
  return [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
    { text: "Sometimes", value: "Sometimes" },
    { text: "Not sure", value: "I'm not sure" },
  ];
};

export default function ChatPage() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSpecialists, setShowSpecialists] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("patientName") || "";
    const desc = localStorage.getItem("problemDescription") || "";
    setPatientName(name);
    setDescription(desc);
  }, []);

  const scenario = useMemo(() => {
    return (
      medicalScenarios.find((s) =>
        s.keywords.some((k) =>
          description.toLowerCase().includes(k.toLowerCase())
        )
      ) || medicalScenarios[0]
    );
  }, [description]);

  useEffect(() => {
    if (!patientName || !description || !scenario) return;

    const intro = `Hi ${patientName}! I've reviewed your description about ${scenario.condition} symptoms. Let me ask you a few specific questions to better understand your condition.`;
    const firstQuestion = scenario.questions[0];

    setMessages([{ id: 1, type: "ai", content: intro }]);

    const timeout = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: 2, type: "ai", content: firstQuestion },
      ]);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [patientName, description, scenario]);

  // Auto-scroll to bottom when messages or typing change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (message?: string) => {
    const messageToSend = message || currentInput.trim();
    if (!messageToSend || !scenario) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const isLastQuestion = stepIndex >= scenario.questions.length - 1;

      if (!isLastQuestion) {
        const nextQuestion: Message = {
          id: messages.length + 2,
          type: "ai",
          content: scenario.questions[stepIndex + 1],
        };
        setMessages((prev) => [...prev, nextQuestion]);
        setStepIndex((prev) => prev + 1);
      } else {
        const diagnosis: Message = {
          id: messages.length + 2,
          type: "ai",
          content: scenario.diagnosis,
        };

        const specialistsMsg: Message = {
          id: messages.length + 3,
          type: "ai",
          content: `I've found 3 ${scenario.condition} specialists in Oslo who can help you.`,
        };

        setMessages((prev) => [...prev, diagnosis, specialistsMsg]);
        setShowSpecialists(true);
      }
    }, 1500);
  };

  const handleViewSpecialists = () => {
    const summary = {
      patientName,
      condition: scenario.condition,
      conditionName:
        scenario.diagnosis.split("**")[1]?.split("**")[0] || scenario.condition,
      symptoms: messages.filter((m) => m.type === "user").map((m) => m.content),
      aiAssessment: scenario.diagnosis,
      specialistType: scenario.specialistType,
    };

    localStorage.setItem("chatSummary", JSON.stringify(summary));
    router.push("/specialists");
  };

  const isInputDisabled = messages.some(
    (msg) =>
      msg.type === "ai" &&
      msg.content ===
        `I've found 3 ${scenario.condition} specialists in Oslo who can help you.`
  );

  // Get current question for quick actions
  const currentQuestion =
    messages.length > 0 ? messages[messages.length - 1]?.content || "" : "";
  const quickActions = useMemo(() => {
    if (isInputDisabled || showSpecialists) return [];
    return getQuickActions(currentQuestion, scenario.condition);
  }, [currentQuestion, scenario.condition, isInputDisabled, showSpecialists]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/describe")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            AI Health Assessment
          </h1>
        </div>

        {/* Chat */}
        <div className="max-w-4xl mx-auto">
          <Card className="h-96 mb-4 overflow-hidden">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                        msg.type === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          msg.type === "user" ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg text-sm whitespace-pre-line ${
                          msg.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="p-2 rounded-full bg-gray-200">
                        <Bot className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scroll anchor */}
                <div ref={bottomRef} />
              </div>

              {/* Quick Action Buttons */}
              {quickActions.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Zap className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600 font-medium">
                      Quick responses:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSend(action.value)}
                        className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Field */}
              <div className="flex items-center gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your answer or use quick responses above..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={isInputDisabled}
                />
                <Button
                  onClick={() => handleSend()}
                  className="bg-blue-600"
                  disabled={!currentInput.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>

              {/* View Specialists */}
              {showSpecialists && (
                <div className="text-center mt-4">
                  <Button
                    onClick={handleViewSpecialists}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    View Available Specialists
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
