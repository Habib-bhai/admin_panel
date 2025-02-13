// lib/rbac.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const roles = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
}

export const checkRole = (allowedRoles: string[]) => {
  return async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role: string }
      if (!allowedRoles.includes(decoded.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  }
}