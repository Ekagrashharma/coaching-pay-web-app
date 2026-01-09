import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, CheckCircle, ArrowRight, GraduationCap } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import React from 'react'

const About = () => {
    return (
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
    )
}

export default About
