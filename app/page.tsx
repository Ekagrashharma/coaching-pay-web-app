import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, CheckCircle, ArrowRight, GraduationCap } from "lucide-react"

export default function HomePage() {
  const courses = [
    {
      id: 1,
      name: "JEE Main & Advanced",
      duration: "2 Years",
      batch: "2024-2026",
      fee: "₹1,20,000",
      description: "Comprehensive program for engineering entrance preparation",
      features: ["Expert Faculty", "Daily Practice", "Mock Tests", "Study Material"],
    },
    {
      id: 2,
      name: "NEET UG Preparation",
      duration: "2 Years",
      batch: "2024-2026",
      fee: "₹1,00,000",
      description: "Complete medical entrance coaching with proven track record",
      features: ["NCERT Focus", "Test Series", "Doubt Sessions", "Online Resources"],
    },
    {
      id: 3,
      name: "Foundation Course (Class 9-10)",
      duration: "1 Year",
      batch: "2024-2025",
      fee: "₹50,000",
      description: "Build strong fundamentals for competitive exams",
      features: ["Board + Competitive", "Concept Building", "Regular Assessment", "Parent Meetings"],
    },
    {
      id: 4,
      name: "Class 11-12 CBSE",
      duration: "2 Years",
      batch: "2024-2026",
      fee: "₹60,000",
      description: "Board exam preparation with competitive edge",
      features: ["Board Pattern", "Sample Papers", "Revision Classes", "Career Guidance"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Excel Academy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#courses" className="text-sm font-medium hover:text-primary transition-colors">
              Courses
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/admin/login">Admin</Link>
            </Button>
            <Button asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Transform Your Future with Expert Coaching
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8">
            Join thousands of successful students who achieved their dreams with our proven teaching methodology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/apply">
                Apply for Admission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/payment">Submit Fee</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5000+</div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Expert Faculty</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Choose from our comprehensive range of courses designed to help you excel
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-balance">{course.name}</CardTitle>
                  <CardDescription className="text-balance">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Batch:</span>
                      <span className="font-medium">{course.batch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee:</span>
                      <span className="font-semibold text-primary">{course.fee}</span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-auto" asChild>
                    <Link href={`/apply?course=${course.id}`}>Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Experience excellence in education with our comprehensive approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-balance">
                  Learn from experienced teachers with proven track records in competitive exam coaching
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Small Batch Size</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-balance">
                  Personalized attention with limited students per batch for better learning outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-balance">
                  95% success rate with students securing top ranks in competitive exams
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Start Your Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Apply now and take the first step towards achieving your academic goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/apply">
                  Apply for Admission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="text-sm text-muted-foreground pt-3">
                Questions? Call us at <span className="font-medium text-foreground">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-semibold">Excel Academy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Leading coaching institute for competitive exam preparation
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#courses" className="hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-foreground">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Student Portal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/student/login" className="hover:text-foreground">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-foreground">
                    New Application
                  </Link>
                </li>
                <li>
                  <Link href="/payment" className="hover:text-foreground">
                    Pay Fees
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>123 Main Street, City</li>
                <li>+91 98765 43210</li>
                <li>info@excelacademy.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Excel Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
