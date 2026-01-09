import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, CheckCircle, ArrowRight, GraduationCap } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Hero = () => {
    return (
        
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
    )
}

export default Hero
