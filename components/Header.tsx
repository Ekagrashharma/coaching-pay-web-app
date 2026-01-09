import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, CheckCircle, ArrowRight, GraduationCap } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
            <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold">Adhyan insitute</span>
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
                // issue in phone screen : admin btn is not showing 
                <Button variant="ghost" asChild className=" sm:inline-flex">
                <Link href="/admin/login">Admin</Link>
                </Button>
                <Button asChild>
                <Link href="/apply" className="hidden sm:inline-flex">Apply Now</Link>
                </Button>
            </div>
            </div>
        </header>

    )
}

export default Header
