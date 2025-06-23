"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Zap, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickSymptom {
  category: string;
  icon: string;
  symptoms: string[];
  descriptions: string[];
}

const quickSymptoms: QuickSymptom[] = [
  {
    category: "Shoulder & Arm",
    icon: "💪",
    symptoms: ["Shoulder pain", "Arm pain", "Rotator cuff", "Frozen shoulder"],
    descriptions: [
      "I've been experiencing shoulder pain for the past week. It hurts when I lift my arm or reach overhead.",
      "I have pain in my shoulder that gets worse when I rotate my arm upward or to the side.",
      "My shoulder feels stiff and painful, especially in the morning. I think it might be a rotator cuff issue.",
      "I have a frozen shoulder that makes it difficult to move my arm in certain directions.",
    ],
  },
  {
    category: "Back & Spine",
    icon: "🦴",
    symptoms: ["Lower back pain", "Sciatica", "Upper back pain", "Neck pain"],
    descriptions: [
      "I've been having lower back pain that sometimes radiates down to my legs.",
      "I have sciatica pain that shoots down from my lower back to my leg, especially when sitting.",
      "My upper back and neck area has been painful and stiff, particularly after working at my desk.",
      "I have chronic neck pain that gets worse when I turn my head or look up.",
    ],
  },
  {
    category: "Knee & Leg",
    icon: "🦵",
    symptoms: ["Knee pain", "Leg pain", "Runner's knee", "Joint stiffness"],
    descriptions: [
      "My knee has been painful, especially when I bend it or put weight on it.",
      "I have knee pain that gets worse when walking up or down stairs.",
      "I think I have runner's knee - pain around my kneecap that started after exercising.",
      "My knee feels stiff and sometimes makes clicking sounds when I move it.",
    ],
  },
  {
    category: "Foot & Ankle",
    icon: "🦶",
    symptoms: ["Heel pain", "Foot pain", "Plantar fasciitis", "Ankle pain"],
    descriptions: [
      "I have heel pain that's worst when I first get out of bed in the morning.",
      "My foot arch hurts, especially after standing or walking for long periods.",
      "I think I have plantar fasciitis - sharp pain in my heel that's worse in the morning.",
      "My ankle has been painful and swollen, particularly after physical activity.",
    ],
  },
  {
    category: "Abdomen & Digestive",
    icon: "🫃",
    symptoms: ["Stomach pain", "Abdominal pain", "Digestive issues", "Nausea"],
    descriptions: [
      "I've been having stomach pain and digestive issues for the past few days.",
      "I have abdominal pain that gets worse after eating, along with some nausea.",
      "My stomach has been bothering me with pain in the upper abdomen area.",
      "I'm experiencing lower abdominal pain with some bloating and discomfort.",
    ],
  },
  {
    category: "Head & Nerves",
    icon: "🧠",
    symptoms: ["Headaches", "Migraines", "Nerve pain", "Dizziness"],
    descriptions: [
      "I've been getting frequent headaches that interfere with my daily activities.",
      "I suffer from migraines with severe pain, light sensitivity, and nausea.",
      "I have nerve pain that causes tingling and numbness in my hands or feet.",
      "I've been experiencing dizziness and balance issues that concern me.",
    ],
  },
];

export default function DescribePage() {
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("patientName");
    if (name) {
      setPatientName(name);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleContinue = () => {
    if (description.trim()) {
      localStorage.setItem("problemDescription", description);
      router.push("/chat");
    }
  };

  const handleQuickSymptom = (symptomDescription: string) => {
    setDescription(symptomDescription);
  };

  // const handleAddToDescription = (symptomDescription: string) => {
  //   if (description.trim()) {
  //     setDescription(description + " " + symptomDescription);
  //   } else {
  //     setDescription(symptomDescription);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Healio</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">
                Hello {patientName}! 👋
              </CardTitle>
              <CardDescription className="text-lg">
                We&#39;re here to help you find the right healthcare specialist.
                Let&#39;s start by understanding what&#39;s bothering you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {/* Quick Symptom Categories */}
              <div>
                <div className="flex items-center mb-4">
                  <Zap className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Quick symptom categories:
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {quickSymptoms.map((category, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedCategory === category.category
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.category
                            ? null
                            : category.category
                        )
                      }
                      className="h-auto p-2 sm:p-3 flex flex-col items-center space-y-1 text-xs w-full"
                    >
                      <span className="text-base sm:text-lg">
                        {category.icon}
                      </span>
                      <span className="font-medium text-center leading-tight">
                        {category.category}
                      </span>
                    </Button>
                  ))}
                </div>

                {/* Specific Symptoms for Selected Category */}
                {selectedCategory && (
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
                      Common {selectedCategory.toLowerCase()} issues:
                    </h4>
                    <div className="space-y-2">
                      {quickSymptoms
                        .find((cat) => cat.category === selectedCategory)
                        ?.descriptions.map((desc, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuickSymptom(desc)}
                              className="flex-1 justify-start text-left h-auto p-2 text-xs hover:bg-blue-50 min-h-[2.5rem] whitespace-normal"
                            >
                              <div className="flex gap-3 items-center">
                                <Plus className="h-3 w-3" />
                                <span className="break-words leading-relaxed">
                                  {desc}
                                </span>
                              </div>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Please describe your health concern or symptoms:
                </label>
                <Textarea
                  id="description"
                  placeholder="For example: I've been having pain in my shoulder for the past week. It hurts when I lift my arm or reach overhead..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-24 sm:min-h-32 w-full resize-none overflow-hidden"
                  rows={4}
                />
                {description.trim() && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-gray-500">
                    <span className="truncate">
                      {description.length} characters
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDescription("")}
                      className="text-xs text-gray-500 hover:text-gray-700 h-auto p-1 self-start sm:self-auto"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>Tip:</strong> Use the quick categories above to get
                  started, then add more details in the text area. The more
                  specific you are, the better our AI can help you.
                </p>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!description.trim()}
              >
                Continue to AI Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-800 mb-2">
                Need help describing your symptoms?
              </h3>
              <div className="text-green-700 text-sm space-y-1">
                <p>• Include when the symptoms started</p>
                <p>• Describe the type of pain (sharp, dull, throbbing)</p>
                <p>• Mention what makes it better or worse</p>
                <p>• Note any other symptoms you&#39;ve noticed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
