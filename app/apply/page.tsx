"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react"
import { getCourses, saveApplication, type Application } from "@/lib/data-store"

export default function ApplyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")

  const [submitted, setSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string>("")

  const courses = getCourses()
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    courseId: courseId || "",
    class: "",
    school: "",
    percentage: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const course = courses.find((c) => c.id === Number(formData.courseId))
    if (!course) return

    const newApplication: Application = {
      id: `APP${Date.now()}`,
      studentName: formData.studentName,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      courseId: course.id,
      courseName: course.name,
      class: formData.class,
      school: formData.school,
      percentage: formData.percentage,
      status: "pending",
      submittedAt: new Date().toISOString(),
      photo: photoPreview,
    }

    saveApplication(newApplication)
    setApplicationId(newApplication.id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Excel Academy</span>
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
                <CardTitle className="text-2xl">Application Submitted Successfully!</CardTitle>
                <CardDescription className="text-balance">
                  Your application has been received and is under review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Your Application ID</p>
                  <p className="text-2xl font-bold text-primary">{applicationId}</p>
                  <p className="text-xs text-muted-foreground mt-2">Save this ID for future reference</p>
                </div>

                <div className="space-y-2 text-sm text-left">
                  <h3 className="font-semibold">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>You will receive an email confirmation within 24 hours</li>
                    <li>Our team will review your application within 2-3 business days</li>
                    <li>Once approved, you can proceed with fee payment</li>
                    <li>After fee verification, your admission will be confirmed</li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="flex-1" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button className="flex-1 bg-transparent" variant="outline" asChild>
                    <Link href="/payment">Pay Fees Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
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

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admission Application</h1>
            <p className="text-muted-foreground">Fill in your details to apply for admission</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Course Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Selection</CardTitle>
                  <CardDescription>Choose the course you want to enroll in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="course">Select Course *</Label>
                    <Select
                      value={formData.courseId}
                      onValueChange={(value) => handleInputChange("courseId", value)}
                      required
                    >
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.name} - {course.fee}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter student details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Student Name *</Label>
                      <Input
                        id="studentName"
                        value={formData.studentName}
                        onChange={(e) => handleInputChange("studentName", e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange("gender", value)}
                        required
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo">Student Photo</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="flex-1"
                        />
                        {photoPreview && (
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange("fatherName", e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherName">Mother's Name *</Label>
                      <Input
                        id="motherName"
                        value={formData.motherName}
                        onChange={(e) => handleInputChange("motherName", e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How can we reach you?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="student@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="House/Flat no., Street, Locality"
                      rows={2}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="State name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Current education details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Current Class/Qualification *</Label>
                      <Input
                        id="class"
                        value={formData.class}
                        onChange={(e) => handleInputChange("class", e.target.value)}
                        placeholder="e.g., Class 10, 12th Pass"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="percentage">Last Exam Percentage *</Label>
                      <Input
                        id="percentage"
                        value={formData.percentage}
                        onChange={(e) => handleInputChange("percentage", e.target.value)}
                        placeholder="e.g., 85%"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school">School/College Name *</Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) => handleInputChange("school", e.target.value)}
                      placeholder="Current or last attended institution"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Application
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
