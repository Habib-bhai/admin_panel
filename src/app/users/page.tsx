"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Edit,
    Trash2,
    Shield,
    Download,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { client } from "@/lib/sanity"

interface User {
    _id: string
    name: string
    image: string
    email: string
    address: string
    state: string
    city: string
    zipCode: number
    phone: number
    role: string
    orders: string[]
    _createdAt: string
}

interface GeographicData {
    state: string
    count: number
}

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [sortConfig] = useState({ key: "name", direction: "asc" })
    const [geographicData, setGeographicData] = useState<GeographicData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Process geographic data
    const processGeographicData = (users: User[]) => {
        const stateCount = users.reduce((acc, user) => {
            acc[user.state] = (acc[user.state] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        return Object.entries(stateCount).map(([state, count]) => ({
            state,
            count,
        }))
    }

    // Sort users
    const sortUsers = (users: User[]) => {
        return [...users].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof User]
            const bValue = b[sortConfig.key as keyof User]

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue)
            }
            return 0
        })
    }

    // Fetch users data
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const response = await client.fetch<User[]>(`
          *[_type == "user"] {
            _id,
            name,
            email,
            image,
            address,
            state,
            city,
            zipCode,
            phone,
            role,
            orders[]->,
            _createdAt
          }
        `)
                setUsers(response)
                setFilteredUsers(response)
                setGeographicData(processGeographicData(response))
            } catch (error) {
                console.error("Error fetching users:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // Filter and search logic
    useEffect(() => {
        let result = [...users]

        if (search) {
            result = result.filter(
                user =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (roleFilter !== "all") {
            result = result.filter(user => user.role === roleFilter)
        }

        result = sortUsers(result)
        setFilteredUsers(result)
        // eslint-disable-next-line
    }, [search, roleFilter, sortConfig, users])

    // Handle user deletion
    const handleDeleteUser = async (userId: string) => {
        try {
            await client
                .delete(userId)
                .then(() => {
                    setUsers(prev => prev.filter(user => user._id !== userId))
                })
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    // Export users data
    const handleExportUsers = () => {
        const exportData = filteredUsers.map(user => ({
            Name: user.name,
            Email: user.email,
            Phone: user.phone,
            Location: `${user.city}, ${user.state}`,
            Role: user.role,
            Orders: user.orders?.length || 0
        }))

        const csvContent = "data:text/csv;charset=utf-8," +
            Object.keys(exportData[0]).join(",") + "\n" +
            exportData.map(row => Object.values(row).join(",")).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "users_export.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="container mx-auto py-8 users-container min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Header Section */}
                <div className="  flex flex-wrap justify-center md:justify-between items-center">
                    <div className="text-center md:text-start mb-5 md:mb-0">
                        <h1 className="text-2xl font-bold text-white">Users Management</h1>
                        <p className="text-gray-400">
                            {isLoading
                                ? "Loading users..."
                                : `${filteredUsers.length} users found`}
                        </p>
                    </div>
                    <Button
                        className="bg-[#098135] hover:bg-[#098135]/90"
                        onClick={handleExportUsers}
                        disabled={isLoading || filteredUsers.length === 0}
                    >
                        <Download className="mr-2 h-4 w-4" /> Export Users
                    </Button>
                </div>

                {/* Filters Section */}
                <Card className="glass-card bg-transparent">
                    <CardContent className="py-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-black/80 text-white border-[#098135]/30"
                                    disabled={isLoading}
                                />
                            </div>
                            <Select
                                value={roleFilter}
                                onValueChange={setRoleFilter}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="w-[150px] bg-black/80 text-white border-[#098135]/30">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent className="bg-black text-white">
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>


                {/* Users Table */}
                <Card className="glass-card">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto" >
                            <table className="w-full">
                                <thead>
                                    <tr className="table-header">
                                        <th className="px-4 py-3 text-left">User</th>
                                        <th className="px-4 py-3 text-left">Contact</th>
                                        <th className="px-4 py-3 text-left">Location</th>
                                        <th className="px-4 py-3 text-left">Role</th>
                                        <th className="px-4 py-3 text-left">Orders</th>
                                        <th className="px-4 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-black text-white">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                                Loading users...
                                            </td>
                                        </tr>
                                    ) : filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="table-row">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar>
                                                            <AvatarImage src={user.image} />
                                                            <AvatarFallback className="text-black">{user.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{user.name}</div>
                                                            <div className="text-sm text-gray-400">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">{user.phone}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">{`${user.city}, ${user.state}`}</div>
                                                    <div className="text-sm text-gray-400">{user.zipCode}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === "admin"
                                                            ? "bg-[#098135] text-white"
                                                            : "bg-gray-200 text-gray-800"
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">{user.orders?.length || 0}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="action-button text-[#098135] hover:text-[#098135]/90"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="action-button text-[#098135] hover:text-[#098135]/90"
                                                        >
                                                            <Shield className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="action-button text-red-500 hover:text-red-600"
                                                            onClick={() => handleDeleteUser(user._id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Geographic Distribution Chart */}
                <Card className="glass-card text-white bg-black">
                    <CardHeader>
                        <CardTitle>Geographic Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] ">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={geographicData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="state" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "none",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "#fff"
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#098135" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <style jsx>{`
          .users-container {
            background: linear-gradient(
              135deg,
              var(--color-black) 0%,
              #0a0a0a 40%,
              #111111 60%,
              var(--color-black) 100%
            );
          }

          .glass-card {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(9, 129, 53, 0.3);
            color: white;
          }

          .table-header {
            background: rgba(9, 129, 53, 0.1);
          }

          .table-row {
            border-bottom: 1px solid rgba(9, 129, 53, 0.2);
            transition: all 0.3s ease;
          }

          .table-row:hover {
            background: rgba(9, 129, 53, 0.1);
          }

          .action-button {
            transition: all 0.3s ease;
          }

          .action-button:hover {
            transform: translateY(-2px);
          }
        `}</style>
            </motion.div>
        </div>
    )
}

export default UsersPage