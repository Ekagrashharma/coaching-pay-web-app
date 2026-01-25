import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, CheckCircle, ArrowRight, GraduationCap } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { coursesData } from "../utils/Constant/course.constant"

const Course = () => {
    return (
        <section id="course" className="bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-7xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Courses</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Choose from our comprehensive range of courses designed to help you excel
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {coursesData.map((course) => (
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
                        {course.features.map((feature, id) => (
                        <div key={id} className="flex items-center gap-2 text-sm">
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
    )
}

export default Course
