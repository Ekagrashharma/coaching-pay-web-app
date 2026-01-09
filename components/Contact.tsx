import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, CheckCircle, ArrowRight, GraduationCap } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Contact = () => {
    return (
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
    )
}

export default Contact
