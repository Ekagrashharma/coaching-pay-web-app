import Link from "next/link"
import {  GraduationCap } from "lucide-react"

import React from 'react'

const Footer = () => {
return (
    
<footer className="border-t">
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
            <div>
            <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-semibold">Adhyan Institute</span>
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
                <li>Bank of Baroda, Harunagla, Bareilly </li>
                <li>+91 98765 43210</li>
                <li>info@adhyaninstitute.com</li>
            </ul>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Adhyan institute . All rights reserved.</p>
        </div>
        </div>
    </footer>
  )
}

export default Footer
