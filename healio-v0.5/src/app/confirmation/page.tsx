"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Download } from "lucide-react";
import { useRouter } from "next/navigation";

type BookingDetails = {
  patientName: string;
  specialist: string;
  date: string;
  time: string;
  price: number;
};

export default function ConfirmationPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const details = localStorage.getItem("bookingDetails");
    if (details) {
      setBookingDetails(JSON.parse(details));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleNewBooking = () => {
    // Clear all stored data
    localStorage.clear();
    router.push("/");
  };

  if (!bookingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Your consultation has been successfully booked
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Appointment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{bookingDetails.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialist</p>
                  <p className="font-medium">{bookingDetails.specialist}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{bookingDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{bookingDetails.time}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Paid:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {bookingDetails.price} NOK
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-sm text-gray-600">
                      You&apos;ll receive a confirmation email with appointment
                      details
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">AI Report Shared</p>
                    <p className="text-sm text-gray-600">
                      Your AI assessment will be sent to the specialist before
                      your appointment
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Reminder Notification</p>
                    <p className="text-sm text-gray-600">
                      We&#39;ll send you a reminder 24 hours before your
                      appointment
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Appointment Details
            </Button>

            <Button
              onClick={handleNewBooking}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Book Another Consultation
            </Button>
          </div>

          {/* Contact Info */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Need to reschedule or have questions?
              </p>
              <p className="font-medium">Contact us: support@healio.no</p>
              <p className="text-sm text-gray-500">+47 123 45 678</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
