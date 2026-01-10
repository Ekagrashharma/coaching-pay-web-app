"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GraduationCap, LogOut, FileText, IndianRupee, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import {
  getCurrentUser,
  logout,
  getApplications,
  getPayments,
  updateApplication,
  updatePayment,
  type Application,
  type Payment,
} from "@/lib/data-store"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [applications, setApplications] = useState<Application[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/admin/login")
      return
    }
    loadData()
  }, [user, router])

  const loadData = () => {
    setApplications(getApplications())
    setPayments(getPayments())
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

/* const handleApplicationAction = (id: string, status: "approved" | "rejected") => {
    updateApplication(id, { status })
    loadData()
    setSelectedApplication(null)
  }

  const handlePaymentAction = (id: string, status: "verified" | "rejected") => {
    updatePayment(id, { status })
    loadData()
    setSelectedPayment(null)
  }*/

  if (!user || user.role !== "admin") {
    return null
  }

  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter((a) => a.status === "pending").length,
    approvedApplications: applications.filter((a) => a.status === "approved").length,
    totalPayments: payments.length,
    pendingPayments: payments.filter((p) => p.status === "pending").length,
    verifiedPayments: payments.filter((p) => p.status === "verified").length,
    totalRevenue: payments.filter((p) => p.status === "verified").reduce((sum, p) => sum + p.amount, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Adhyan Insitute </span>
            <Badge variant="secondary" className="ml-2">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage applications and payments</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">
              Applications
              {stats.pendingApplications > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
                  {stats.pendingApplications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payments">
              Payments
              {stats.pendingPayments > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
                  {stats.pendingPayments}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold">{stats.totalApplications}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-3xl font-bold">{stats.pendingApplications}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Verified Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-3xl font-bold">{stats.verifiedPayments}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString("en-IN")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest admission applications</CardDescription>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No applications yet</p>
                  ) : (
                    <div className="space-y-3">
                      {applications.slice(0, 5).map((app) => (
                        <div key={app.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{app.studentName}</p>
                            <p className="text-sm text-muted-foreground">{app.courseName}</p>
                          </div>
                          <Badge
                            variant={
                              app.status === "approved"
                                ? "default"
                                : app.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest fee payments</CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No payments yet</p>
                  ) : (
                    <div className="space-y-3">
                      {payments.slice(0, 5).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{payment.studentName}</p>
                            <p className="text-sm text-muted-foreground">₹{payment.amount.toLocaleString("en-IN")}</p>
                          </div>
                          <Badge
                            variant={
                              payment.status === "verified"
                                ? "default"
                                : payment.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Review and manage student applications</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No applications submitted yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-mono text-xs">{app.id}</TableCell>
                            <TableCell className="font-medium">{app.studentName}</TableCell>
                            <TableCell className="text-sm">{app.courseName}</TableCell>
                            <TableCell className="text-sm">{app.email}</TableCell>
                            <TableCell className="text-sm">{app.phone}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  app.status === "approved"
                                    ? "default"
                                    : app.status === "rejected"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" onClick={() => setSelectedApplication(app)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>All Payments</CardTitle>
                <CardDescription>Verify and manage fee payments</CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No payments submitted yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                            <TableCell className="font-medium">{payment.studentName}</TableCell>
                            <TableCell className="text-sm">{payment.courseName}</TableCell>
                            <TableCell className="font-semibold">₹{payment.amount.toLocaleString("en-IN")}</TableCell>
                            <TableCell className="font-mono text-xs">{payment.transactionId}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  payment.status === "verified"
                                    ? "default"
                                    : payment.status === "rejected"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" onClick={() => setSelectedPayment(payment)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Modal */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>Review the complete application information</DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              {selectedApplication.photo && (
                <div className="flex justify-center">
                  <img
                    src={selectedApplication.photo || "/placeholder.svg"}
                    alt="Student"
                    className="w-32 h-32 rounded-lg object-cover border-2"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Application ID</p>
                  <p className="font-mono font-medium">{selectedApplication.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedApplication.status === "approved"
                        ? "default"
                        : selectedApplication.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {selectedApplication.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{new Date(selectedApplication.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium capitalize">{selectedApplication.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{selectedApplication.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Father's Name</p>
                  <p className="font-medium">{selectedApplication.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mother's Name</p>
                  <p className="font-medium">{selectedApplication.motherName}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {selectedApplication.address}, {selectedApplication.city}, {selectedApplication.state} -{" "}
                    {selectedApplication.pincode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Class</p>
                  <p className="font-medium">{selectedApplication.class}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Percentage</p>
                  <p className="font-medium">{selectedApplication.percentage}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">School/College</p>
                  <p className="font-medium">{selectedApplication.school}</p>
                </div>
              </div>

              {selectedApplication.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => handleApplicationAction(selectedApplication.id, "approved")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={() => handleApplicationAction(selectedApplication.id, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Detail Modal */}
      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>Review and verify payment information</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Payment ID</p>
                  <p className="font-mono font-medium">{selectedPayment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedPayment.status === "verified"
                        ? "default"
                        : selectedPayment.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {selectedPayment.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{selectedPayment.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{selectedPayment.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-bold text-primary">₹{selectedPayment.amount.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted At</p>
                  <p className="font-medium">{new Date(selectedPayment.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">UPI ID</p>
                  <p className="font-mono font-medium">{selectedPayment.upiId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-mono font-medium">{selectedPayment.transactionId}</p>
                </div>
              </div>

              {selectedPayment.screenshot && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Payment Screenshot</p>
                  <div className="border rounded-lg p-2">
                    <img
                      src={selectedPayment.screenshot || "/placeholder.svg"}
                      alt="Payment screenshot"
                      className="max-h-96 mx-auto"
                    />
                  </div>
                </div>
              )}

              {selectedPayment.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" onClick={() => handlePaymentAction(selectedPayment.id, "verified")}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify Payment
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={() => handlePaymentAction(selectedPayment.id, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Payment
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
