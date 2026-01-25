"use client";
export const dynamic = "force-dynamic";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Upload,
  Copy,
  Check,
  Download,
} from "lucide-react";
import {
  getApplicationById,
  getCourses,
  savePayment,
  type Payment,
} from "@/lib/data-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentPage() {
  const courses = getCourses()
  const [step, setStep] = useState<"lookup" | "payment" | "success">("lookup");
  const [applicationId, setApplicationId] = useState("");
  const [application, setApplication] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");
  const [isMonthlyFee, setIsMonthlyFee] = useState(false);
  const [monthlyFeeData, setMonthlyFeeData] = useState({
    applicationId: "",
    courseName: "",
  });
  const [paymentData, setPaymentData] = useState({
    upiId: "",
    transactionId: "",
  });

  const handleMonthlyFeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMonthlyFee(true);
    setApplication({
      id: monthlyFeeData.applicationId,
      studentName: "Existing Student",
      courseName: monthlyFeeData.courseName,
    });
    setError("");
    setStep("payment");
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const app = getApplicationById(applicationId);

    if (!app) {
      setError("Application ID not found. Please check and try again.");
      return;
    }

    if (app.status !== "approved") {
      setError(
        "Application is not approved yet. Please wait for admin approval.",
      );
      return;
    }
    // if (app.status !== "approved") {
    //   setError(
    //     "Application is not approved yet. Please wait for admin approval.",
    //   );
    //   return;
    // }

    setApplication(app);
    setError("");
    setIsMonthlyFee(false);
    setStep("payment");
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let paymentAmount = 0;
    if (isMonthlyFee) {
      paymentAmount = 10000; // Default monthly fee amount
    } else {
      paymentAmount = Number.parseInt(
        getCourses()
          .find((c) => c.id === application?.courseId)
          ?.fee.replace(/[^0-9]/g, "") || "0",
      );
    }

    const newPayment: Payment = {
      id: `PAY${Date.now()}`,
      applicationId: application.id,
      studentName: application.studentName,
      courseName: application.courseName,
      amount: paymentAmount,
      upiId: paymentData.upiId,
      transactionId: paymentData.transactionId,
      status: "pending",
      submittedAt: new Date().toISOString(),
      screenshot: screenshotPreview,
    };

    savePayment(newPayment);
    setPaymentId(newPayment.id);
    setStep("success");
  };

  const handleDownloadReceipt = () => {
    const displayAmount = isMonthlyFee
      ? "₹10,000"
      : getCourses().find((c) => c.id === application?.courseId)?.fee;

    const receiptContent = `
ADHYAN ACADEMY
Leading Coaching Institute

PAYMENT RECEIPT

Receipt ID:        ${paymentId}
Date:              ${new Date().toLocaleDateString("en-IN")}

STUDENT DETAILS:
${isMonthlyFee ? `Student ID:        ${application?.id}` : `Application ID:    ${application?.id}`}
${!isMonthlyFee ? `Student Name:      ${application?.studentName}` : ""}
Course:            ${application?.courseName}

PAYMENT DETAILS:
${isMonthlyFee ? "Monthly Fee:" : "Total Amount:"}       ${displayAmount}
UPI ID:            ${paymentData.upiId}
Transaction ID:    ${paymentData.transactionId}
Payment Status:    Pending Verification


This receipt confirms that your payment has been 
submitted and is under verification.

You will receive a confirmation email once the
payment is verified by our team within 24 hours.

For any queries, please contact:
Phone: +91 98765 43210
Email: info@excelacademy.com

Thank you for choosing Excel Academy!
`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-receipt-${paymentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  // const handleDownloadReceipt = () => {
  //   const displayAmount = isMonthlyFee
  //     ? "₹10,000"
  //     : getCourses().find((c) => c.id === application?.courseId)?.fee;

  //     const receiptContent = `
  // ADHYAN ACADEMY
  // Leading Coaching Institute
  // ================================================

  // PAYMENT RECEIPT
  // ================================================

  // Receipt ID:        ${paymentId}
  // Date:              ${new Date().toLocaleDateString("en-IN")}

  // STUDENT DETAILS:
  // ${isMonthlyFee ? `Student ID:        ${application?.id}` : `Application ID:    ${application?.id}`}
  // ${!isMonthlyFee ? `Student Name:      ${application?.studentName}` : ""}
  // Course:            ${application?.courseName}

  // PAYMENT DETAILS:
  // ${isMonthlyFee ? "Monthly Fee:" : "Total Amount:"}       ${displayAmount}
  // UPI ID:            ${paymentData.upiId}
  // Transaction ID:    ${paymentData.transactionId}
  // Payment Status:    Pending Verification

  // ================================================

  // This receipt confirms that your payment has been
  // submitted and is under verification.

  // You will receive a confirmation email once the
  // payment is verified by our team within 24 hours.

  // For any queries, please contact:
  // Phone: +91 98765 43210
  // Email: info@excelacademy.com

  // ================================================
  // Thank you for choosing Adhyan Academy!
  // `;
  const receiptContent = `
<div
  id="receipt-pdf"
  className="hidden p-8 w-200 bg-white text-black font-sans"
>
  <div className="text-center mb-6">
    <h1 className="text-2xl font-bold">ADHYAN ACADEMY</h1>
    <p className="text-sm">Leading Coaching Institute</p>
  </div>

  <hr className="my-4" />

  <h2 className="text-xl font-semibold text-center mb-4">
    PAYMENT RECEIPT
  </h2>

  <div className="space-y-2 text-sm">
    <p><b>Receipt ID:</b> {paymentId}</p>
    <p><b>Date:</b> {new Date().toLocaleDateString("en-IN")}</p>

    <hr />

    <p><b>Student ID:</b> {application?.id}</p>
    <p><b>Name:</b> {application?.studentName}</p>
    <p><b>Course:</b> {application?.courseName}</p>

    <hr />

    <p><b>Amount:</b> ₹{displayAmount}</p>
    <p><b>UPI:</b> {paymentData.upiId}</p>
    <p><b>Txn ID:</b> {paymentData.transactionId}</p>
    <p><b>Status:</b> Pending Verification</p>
  </div>

  <hr className="my-6" />

  <p className="text-xs text-center">
    This receipt confirms payment submission.<br />
    Verification within 24 hours.
  </p>

  <p className="mt-6 text-center font-medium">
    Thank you for choosing Adhyan Academy
  </p>
</div>

`;

  // const blob = new Blob([receiptContent], { type: "text/plain" });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = `payment-receipt-${paymentId}.txt`;
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);
  // URL.revokeObjectURL(url);

  const handleDownloadReceipt = () => {
    const element = document.getElementById("receipt-pdf");

    if (!element) return;

    const options = {
      margin: 0.5,
      filename: `receipt-${paymentId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Adhyan Insitute </span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">
                  Payment Submitted Successfully!
                </CardTitle>
                <CardDescription className="text-balance">
                  Your payment is under verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Payment Reference ID
                  </p>
                  <p className="text-2xl font-bold text-primary">{paymentId}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Save this ID for future reference
                  </p>
                </div>

                <div className="space-y-2 text-sm text-left">
                  <h3 className="font-semibold">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Our team will verify your payment within 24 hours</li>
                    <li>You will receive a confirmation email once verified</li>
                    <li>
                      After verification, your admission will be confirmed
                    </li>
                    <li>
                      You will receive your student ID and login credentials
                    </li>
                  </ol>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <Button
                    onClick={handleDownloadReceipt}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (step === "payment" && application) {
    
    const course = getCourses().find((c) => c.id === application?.courseId);
    const displayAmount = isMonthlyFee ? "₹10,000" : course?.fee;

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Adhyan Insitute </span>
            </div>
            <Button variant="ghost" onClick={() => setStep("lookup")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {isMonthlyFee ? "Monthly Fee Payment" : "Fee Payment"}
              </h1>
              <p className="text-muted-foreground">
                {isMonthlyFee
                  ? "Submit your monthly fee payment"
                  : "Complete your admission by paying the course fees"}
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isMonthlyFee ? "Payment Details" : "Application Details"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isMonthlyFee ? "Student ID:" : "Application ID:"}
                    </span>
                    <span className="font-medium">{application.id}</span>
                  </div>
                  {!isMonthlyFee && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Student Name:
                      </span>
                      <span className="font-medium">
                        {application.studentName}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course:</span>
                    <span className="font-medium">
                      {application.courseName}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">
                      {isMonthlyFee ? "Monthly Amount:" : "Total Amount:"}
                    </span>
                    <span className="font-bold text-primary">
                      {displayAmount}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UPI Payment Details</CardTitle>
                  <CardDescription>
                    Pay using any UPI app (PhonePe, Google Pay, Paytm, etc.)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <div className="flex flex-col items-center justify-between">
                      <div className="flex justify-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            UPI ID
                          </p>
                          <p className="font-mono font-semibold">
                            academy@paytm
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard("academy@paytm")}
                          className="bg-transparent item"
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard("academy@paytm")}
                        className="bg-transparent"
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Image
                        src="/QR.jpg" // inside 
                      <Image
                        src="/Untitled.jpeg" // inside
                        alt="Profile"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Note: Use the exact UPI ID mentioned above to avoid
                      payment delays
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription className="text-sm">
                      <strong>Important:</strong> After making the payment,
                      enter your UPI ID and transaction ID below, then upload a
                      screenshot of the payment confirmation.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <form onSubmit={handlePaymentSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Confirmation</CardTitle>
                    <CardDescription>
                      Enter your payment details for verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">Your UPI ID *</Label>
                      <Input
                        id="upiId"
                        value={paymentData.upiId}
                        onChange={(e) =>
                          setPaymentData((prev) => ({
                            ...prev,
                            upiId: e.target.value,
                          }))
                        }
                        placeholder="yourname@paytm"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        The UPI ID you used to make the payment
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transactionId">
                        Transaction ID / UTR Number *
                      </Label>
                      <Input
                        id="transactionId"
                        value={paymentData.transactionId}
                        onChange={(e) =>
                          setPaymentData((prev) => ({
                            ...prev,
                            transactionId: e.target.value,
                          }))
                        }
                        placeholder="e.g., 123456789012"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Find this in your payment app under transaction details
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="screenshot">Payment Screenshot *</Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            id="screenshot"
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotUpload}
                            required
                            className="flex-1"
                          />
                          {screenshotPreview && (
                            <div className="shrink-0">
                              <Upload className="h-5 w-5 text-green-600" />
                            </div>
                          )}
                        </div>
                        {screenshotPreview && (
                          <div className="border rounded-lg p-2">
                            <img
                              src={screenshotPreview || "/placeholder.svg"}
                              alt="Payment screenshot"
                              className="max-h-48 mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Payment Details
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Adhyan Insitute </span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="admission" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="admission">New Admission Fee</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Fee Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="admission">
              <Card>
                <CardHeader>
                  <CardTitle>Pay Admission Fees</CardTitle>
                  <CardDescription>
                    Enter your application ID to proceed with fee payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLookup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appId">Application ID</Label>
                      <Input
                        id="appId"
                        value={applicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                        placeholder="APP1234567890"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the Application ID you received after submitting
                        your application
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Fee Payment</CardTitle>
                  <CardDescription>
                    For existing students to pay monthly fees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMonthlyFeeSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationId">Application ID</Label>
                      <Input
                        id="applicationId"
                        value={monthlyFeeData.applicationId}
                        onChange={(e) =>
                          setMonthlyFeeData((prev) => ({
                            ...prev,
                            applicationId: e.target.value,
                          }))
                        }
                        placeholder="APP1234567890"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your Application ID provided after admission
                        confirmation
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="courseName">Enrolled Course</Label>
                      <Select
                        value={monthlyFeeData.courseName}
                        onValueChange={(value) => {
                          const selectedCourse = courses.find(
                            (course) => course.name === value,
                          );

                          setMonthlyFeeData((prev) => ({
                            ...prev,
                            courseName: value,
                            amount: selectedCourse?.fee || 0,
                          }));
                        }}
                        required
                      >
                        <SelectTrigger id="courseName">
                          <SelectValue placeholder="Select your course" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCourses().map((course) => (
                            <SelectItem key={course.id} value={course.name}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Select the course you are enrolled in
                      </p>
                    </div>

                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Note:</strong> Monthly fee amount is ₹10,000.
                        You will be directed to the payment page after
                        submitting this form.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
