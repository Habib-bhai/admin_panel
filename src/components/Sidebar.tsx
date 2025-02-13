import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { Menu } from "lucide-react"


import React from 'react'

function Sidebar() {
    return (
        <>
            <Sheet>
                <SheetTrigger><Menu className="text-white"/></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-3xl font-bold">Dashboard</SheetTitle>
                     
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-10">
                            <Link className="font-semibold" href={"/"}>Dashboard</Link>
                            <Link className="font-semibold" href={"/products"}>Products</Link>
                            <Link className="font-semibold" href={"/profile"}>Profile</Link>
                            <Link className="font-semibold" href={"/users"}>Users</Link>
                            <Link className="font-semibold" href={"/calender"}>Calender</Link>
                            <Link className="font-semibold" href={"/orders"}>Orders</Link>
                            <Link className="font-semibold" href={"/reviews"}>Reviews</Link>
                        </div>
                </SheetContent>
            </Sheet>

        </>
    )
}

export default Sidebar