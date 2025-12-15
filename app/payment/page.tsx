"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, ArrowLeft, CheckCircle, Upload, Copy, Check } from "lucide-react"
import { getApplicationById, getCourses, savePayment, type Payment } from "@/lib/data-store"

export default function PaymentPage() {
  const [step, setStep] = useState<"lookup" | "payment" | "success">("lookup")
  const [applicationId, setApplicationId] = useState("")
  const [application, setApplication] = useState<any>(null)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [paymentId, setPaymentId] = useState("")
  const [screenshotPreview, setScreenshotPreview] = useState<string>("")

  const [paymentData, setPaymentData] = useState({
    upiId: "",
    transactionId: "",
  })

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault()
    const app = getApplicationById(applicationId)

    if (!app) {
      setError("Application ID not found. Please check and try again.")
      return
    }

    if (app.status !== "approved") {
      setError("Application is not approved yet. Please wait for admin approval.")
      return
    }

    setApplication(app)
    setError("")
    setStep("payment")
  }

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPayment: Payment = {
      id: `PAY${Date.now()}`,
      applicationId: application.id,
      studentName: application.studentName,
      courseName: application.courseName,
      amount: Number.parseInt(
        getCourses()
          .find((c) => c.id === application.courseId)
          ?.fee.replace(/[^0-9]/g, "") || "0",
      ),
      upiId: paymentData.upiId,
      transactionId: paymentData.transactionId,
      status: "pending",
      submittedAt: new Date().toISOString(),
      screenshot: screenshotPreview,
    }

    savePayment(newPayment)
    setPaymentId(newPayment.id)
    setStep("success")
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Excel Academy</span>
            </div>
          </div>
        </header>

        <div className="container py-12 md:py-24">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Payment Submitted Successfully!</CardTitle>
                <CardDescription className="text-balance">Your payment is under verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Payment Reference ID</p>
                  <p className="text-2xl font-bold text-primary">{paymentId}</p>
                  <p className="text-xs text-muted-foreground mt-2">Save this ID for future reference</p>
                </div>

                <div className="space-y-2 text-sm text-left">
                  <h3 className="font-semibold">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Our team will verify your payment within 24 hours</li>
                    <li>You will receive a confirmation email once verified</li>
                    <li>After verification, your admission will be confirmed</li>
                    <li>You will receive your student ID and login credentials</li>
                  </ol>
                </div>

                <div className="pt-4">
                  <Button className="w-full" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === "payment" && application) {
    const course = getCourses().find((c) => c.id === application.courseId)

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Excel Academy</span>
            </div>
            <Button variant="ghost" onClick={() => setStep("lookup")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </header>

        <div className="container py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Fee Payment</h1>
              <p className="text-muted-foreground">Complete your admission by paying the course fees</p>
            </div>

            <div className="space-y-6">
              {/* Application Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Application ID:</span>
                    <span className="font-medium">{application.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student Name:</span>
                    <span className="font-medium">{application.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course:</span>
                    <span className="font-medium">{application.courseName}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-primary">{course?.fee}</span>
                  </div>
                </CardContent>
              </Card>

              {/* UPI Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>UPI Payment Details</CardTitle>
                  <CardDescription>Pay using any UPI app (PhonePe, Google Pay, Paytm, etc.)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">UPI ID</p>
                        <p className="font-mono font-semibold">academy@paytm</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard("academy@paytm")}
                        className="bg-transparent"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Note: Use the exact UPI ID mentioned above to avoid payment delays
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription className="text-sm">
                      <strong>Important:</strong> After making the payment, enter your UPI ID and transaction ID below,
                      then upload a screenshot of the payment confirmation.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Payment Confirmation Form */}
              <form onSubmit={handlePaymentSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Confirmation</CardTitle>
                    <CardDescription>Enter your payment details for verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">Your UPI ID *</Label>
                      <Input
                        id="upiId"
                        value={paymentData.upiId}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, upiId: e.target.value }))}
                        placeholder="yourname@paytm"
                        required
                      />
                      <p className="text-xs text-muted-foreground">The UPI ID you used to make the payment</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transactionId">Transaction ID / UTR Number *</Label>
                      <Input
                        id="transactionId"
                        value={paymentData.transactionId}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, transactionId: e.target.value }))}
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
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Excel Academy</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <div className="container py-12 md:py-24">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Pay Admission Fees</CardTitle>
              <CardDescription>Enter your application ID to proceed with fee payment</CardDescription>
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
                    Enter the Application ID you received after submitting your application
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
        </div>
      </div>
    </div>
  )
}
