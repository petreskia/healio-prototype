"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimpleCalendar } from "@/components/ui/simple-calendar";
import { ArrowLeft, User, Clock, CreditCard } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface TimeSlot {
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "10:30", available: true },
  { time: "12:00", available: false },
  { time: "14:00", available: true },
  { time: "15:30", available: true },
  { time: "17:00", available: false },
];

const specialists = {
  // Shoulder specialists
  "1": {
    name: "Dr. Erik",
    title: "Orthopedic Surgeon",
    expertise: "Shoulder & rotator cuff specialist with 15+ years experience.",
    price: 1450,
  },
  "2": {
    name: "Dr. Ingrid",
    title: "Sports Medicine Physician",
    expertise: "Specializes in shoulder injuries and rehabilitation.",
    price: 1450,
  },
  "3": {
    name: "Dr. Lars",
    title: "Physiotherapy Specialist",
    expertise: "Expert in shoulder impingement treatment and recovery.",
    price: 1450,
  },

  // Abdomen specialists
  "4": {
    name: "Dr. Maria",
    title: "Gastroenterologist",
    expertise: "Specialist in digestive disorders and abdominal pain.",
    price: 1450,
  },
  "5": {
    name: "Dr. Thomas",
    title: "Internal Medicine",
    expertise: "Comprehensive abdominal health specialist.",
    price: 1450,
  },
  "6": {
    name: "Dr. Anna",
    title: "General Surgeon",
    expertise:
      "Abdominal surgery specialist with minimally invasive techniques.",
    price: 1450,
  },

  // Knee specialists
  "7": {
    name: "Dr. Olav",
    title: "Orthopedic Surgeon",
    expertise: "Knee specialist with focus on sports injuries.",
    price: 1450,
  },
  "8": {
    name: "Dr. Kari",
    title: "Sports Medicine",
    expertise: "Knee injury rehabilitation specialist.",
    price: 1450,
  },
  "9": {
    name: "Dr. Henrik",
    title: "Physiotherapist",
    expertise: "Knee pain and mobility specialist.",
    price: 1450,
  },

  // Foot specialists
  "10": {
    name: "Dr. Sofie",
    title: "Podiatrist",
    expertise: "Foot and ankle specialist.",
    price: 1450,
  },
  "11": {
    name: "Dr. Magnus",
    title: "Orthopedic Surgeon",
    expertise: "Foot and ankle surgery specialist.",
    price: 1450,
  },
  "12": {
    name: "Dr. Lise",
    title: "Physical Therapist",
    expertise: "Foot biomechanics specialist.",
    price: 1450,
  },

  // Lower back specialists
  "13": {
    name: "Dr. Bjørn",
    title: "Spine Specialist",
    expertise: "Lower back and spine specialist.",
    price: 1450,
  },
  "14": {
    name: "Dr. Astrid",
    title: "Neurologist",
    expertise: "Nerve pain specialist focusing on sciatica.",
    price: 1450,
  },
  "15": {
    name: "Dr. Petter",
    title: "Chiropractor",
    expertise: "Spinal alignment specialist.",
    price: 1450,
  },

  // Head and nerves specialists
  "16": {
    name: "Dr. Camilla",
    title: "Neurologist",
    expertise: "Headache and migraine specialist with 18+ years experience.",
    price: 1450,
  },
  "17": {
    name: "Dr. Fredrik",
    title: "Pain Management Specialist",
    expertise: "Specializes in nerve pain and neuropathy treatment.",
    price: 1450,
  },
  "18": {
    name: "Dr. Silje",
    title: "Headache Specialist",
    expertise: "Dedicated headache clinic specialist.",
    price: 1450,
  },
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const [patientName, setPatientName] = useState("");
  const router = useRouter();
  const params = useParams();
  const specialistId = params.specialistId as string;

  const specialist = specialists[specialistId as keyof typeof specialists];

  useEffect(() => {
    const name = localStorage.getItem("patientName");
    if (name) {
      setPatientName(name);
    } else {
      router.push("/");
    }

    if (!specialist) {
      router.push("/specialists");
    }
  }, [router, specialist]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      const bookingDetails = {
        specialist: specialist.name,
        date: selectedDate.toDateString(),
        time: selectedTime,
        price: specialist.price,
        patientName,
      };
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
      router.push("/confirmation");
    }, 2000);
  };

  if (!specialist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/specialists")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Specialists
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Book Consultation
          </h1>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Specialist Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">{specialist.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {specialist.title}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{specialist.expertise}</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  What&#39;s included:
                </h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• 45-minute consultation</li>
                  <li>• AI assessment report review</li>
                  <li>• Personalized treatment plan</li>
                  <li>• Follow-up recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>
                Choose your preferred appointment slot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div>
                <h4 className="font-medium mb-3">Select Date</h4>
                <SimpleCalendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date() || date < new Date(Date.now() - 86400000)
                  }
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h4 className="font-medium mb-3">Available Times</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={
                          selectedTime === slot.time ? "default" : "outline"
                        }
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="justify-center"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Book Button */}
              {selectedDate && selectedTime && (
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total:</span>
                    <span className="text-2xl font-bold">
                      {specialist.price} NOK
                    </span>
                  </div>
                  <Button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Book & Pay {specialist.price} NOK
                      </>
                    )}
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
