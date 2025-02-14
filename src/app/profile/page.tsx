"use client"

import { motion } from "framer-motion"

import { Mail, MapPin, Phone, Package } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


// Styles
const styles = `
:root {
  --color-primary: #098135;
  --color-black: #000000;
  --color-white: #ffffff;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-bg {
  background: linear-gradient(
    135deg,
    var(--color-black) 0%,
    #0a0a0a 40%,
    #111111 60%,
    var(--color-black) 100%
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

.glass-card {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 15px;
  border: 1px solid rgba(9, 129, 53, 0.3);
  color: var(--color-white);
  box-shadow: 0 8px 32px rgba(9, 129, 53, 0.15);
  transition: all 0.4s ease;
}

.glass-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 32px rgba(9, 129, 53, 0.3);
}

.hover-lift {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.profile-header {
  background: linear-gradient(
    45deg,
    var(--color-black),
    var(--color-primary),
    var(--color-black)
  );
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

.card-content {
  animation: fadeIn 0.6s ease-out;
}

.badge {
  background: var(--color-primary);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.badge:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(9, 129, 53, 0.4);
}

.order-item {
  background: rgba(0, 0, 0, 0.4);
  border-left: 4px solid var(--color-primary);
  transition: all 0.3s ease;
}

.order-item:hover {
  background: rgba(9, 129, 53, 0.2);
  transform: scale(1.02);
}

.edit-button {
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(9, 129, 53, 0.3);
}

.edit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(9, 129, 53, 0.4);
  background: linear-gradient(45deg, var(--color-primary), #0ca344);
}
`

// interface UserData {
//   name: string
//   imageUrl: string
//   email: string
//   address: string
//   state: string
//   city: string
//   zipCode: number
//   phone: number
//   role: string
//   orders: Array<{
//     _id: string
//     total: number
//     status: string
//     _createdAt: string
//   }>
// }

export default function ProfilePage() {
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const Orders = [
    {
      _id: "1239dkfjjksk",
      _createdAt: "2024-12-29",
      total: 125,
      status: "pending"
    }
  ]

  return (
    <>
      <style>{styles}</style>
      <div className="my-10 rounded-xl md:px-10 container mx-auto py-10 gradient-bg min-h-screen overflow-x-hidden">
        <motion.div className="grid gap-6 md:grid-cols-2" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Card className="glass-card overflow-hidden hover-lift">
              <div className="h-32 profile-header" />
              <CardContent className="relative pt-10 pb-6 px-6 card-content">
                <Avatar className=" absolute -top-20 left-8 h-28 w-28 border-4 border-[var(--color-primary)]">
                  <AvatarImage src={"/images/myImg.jpeg"} alt={"Habib"} />
                  <AvatarFallback>{"Habib"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-shadow">{"Habib Ullah"}</h2>
                  <p className="text-muted-foreground flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Habibahmed918131@gmail.com
                  </p>
                  <Badge className="badge">
                    Admin
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-shadow">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 card-content">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-[var(--color-primary)]" />
                  <p>
                    {"Next.js city, React square near Mashoor bhai finger chips"}, {"Karachi"}, {"Sindh"} {"75010"}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-[var(--color-primary)]" />
                  <p>{"3343295024"}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-shadow">Recent Orders</CardTitle>
                <CardDescription className="text-gray-300">Your last 5 orders</CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <div className="space-y-4">
                  {Orders.slice(0, 5).map((order) => (
                    <motion.div
                      key={order._id}
                      className="order-item flex items-center justify-between p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-[var(--color-primary)] bg-opacity-20 p-2 rounded-full">
                          <Package className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="font-medium text-shadow">Order #{order._id.slice(-5)}</p>
                          <p className="text-sm text-gray-300">
                            {new Date(order._createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-shadow">${order.total.toFixed(2)}</p>
                        <Badge className={`badge ${getStatusVariant(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="mt-6 flex justify-center" variants={itemVariants} initial="hidden" animate="visible">
          <Button className="edit-button">
            Edit Profile
          </Button>
        </motion.div>
      </div>
    </>
  )
}

// function ProfileSkeleton() {
//   return (
//     <div className="container mx-auto py-10 gradient-bg min-h-screen">
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card className="glass-card overflow-hidden">
//           <div className="h-32 bg-[var(--color-primary)]" />
//           <CardContent className="relative pt-10 pb-6 px-6">
//             <Skeleton className="absolute -top-12 left-6 h-24 w-24 rounded-full bg-[var(--color-primary)]" />
//             <div className="space-y-2">
//               <Skeleton className="h-6 w-2/3 bg-[var(--color-primary)]" />
//               <Skeleton className="h-4 w-1/2 bg-[var(--color-primary)]" />
//               <Skeleton className="h-5 w-20 bg-[var(--color-primary)]" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="glass-card">
//           <CardHeader>
//             <Skeleton className="h-6 w-1/3 bg-[var(--color-primary)]" />
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Skeleton className="h-4 w-full bg-[var(--color-primary)]" />
//             <Skeleton className="h-4 w-2/3 bg-[var(--color-primary)]" />
//           </CardContent>
//         </Card>

//         <Card className="glass-card md:col-span-2">
//           <CardHeader>
//             <Skeleton className="h-6 w-1/4 bg-[var(--color-primary)]" />
//             <Skeleton className="h-4 w-1/3 bg-[var(--color-primary)]" />
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[...Array(5)].map((_, index) => (
//                 <div key={index} className="order-item flex items-center justify-between p-4 rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <Skeleton className="h-10 w-10 rounded-full bg-[var(--color-primary)]" />
//                     <div>
//                       <Skeleton className="h-4 w-20 bg-[var(--color-primary)]" />
//                       <Skeleton className="h-3 w-24 mt-1 bg-[var(--color-primary)]" />
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <Skeleton className="h-4 w-16 bg-[var(--color-primary)]" />
//                     <Skeleton className="h-5 w-20 mt-1 bg-[var(--color-primary)]" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="mt-6 flex justify-center">
//         <Skeleton className="h-10 w-32 bg-[var(--color-primary)]" />
//       </div>
//     </div>
//   )
// }

function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500 text-black"
    case "shipped":
      return "bg-blue-500 text-white"
    case "delivered":
      return "bg-[var(--color-primary)] text-white"
    case "returned":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}