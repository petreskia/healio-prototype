"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bot, User, Send } from "lucide-react";

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

const medicalScenarios: MedicalScenario[] = [
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
      "Based on your symptoms, you might be experiencing **Rotator Cuff Impingement**...",
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
      "Based on your symptoms, you might be experiencing **Gastritis** or **Peptic Ulcer Disease**...",
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
      "Based on your symptoms, you might be experiencing **Patellofemoral Pain Syndrome**...",
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
      "Based on your symptoms, you might be experiencing **Plantar Fasciitis**...",
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
      "Based on your symptoms, you might be experiencing **Lower Back Strain** or **Sciatica**...",
    specialistType: "orthopedic",
  },
];

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSpecialists, setShowSpecialists] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");

  // Load from localStorage after component mounts (client-only)
  useEffect(() => {
    const name = localStorage.getItem("patientName") || "";
    const desc = localStorage.getItem("problemDescription") || "";
    setPatientName(name);
    setDescription(desc);
  }, []);

  const scenario = useMemo(() => {
    const match = medicalScenarios.find((s) =>
      s.keywords.some((k) =>
        description.toLowerCase().includes(k.toLowerCase())
      )
    );
    return match || medicalScenarios[0];
  }, [description]);

  // Initialize conversation on first render
  useEffect(() => {
    if (!patientName || !description || !scenario) return;

    const intro = `Hi ${patientName}! I've reviewed your description about ${scenario.condition} pain. Let me ask you a few specific questions to better understand your condition.`;
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

  const handleSend = () => {
    if (!currentInput.trim() || !scenario) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: currentInput,
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
          content: `I've found 3 ${scenario.condition} specialists in Oslo who can help you. Would you like to see them?`,
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
                  <div className="text-sm text-gray-500">Typing...</div>
                )}
              </div>

              {/* Input Field */}
              <div className="flex items-center gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your answer..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} disabled={!currentInput.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* View Specialists */}
          {showSpecialists && (
            <div className="text-center">
              <Button onClick={handleViewSpecialists} className="mt-4">
                View Specialists
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
