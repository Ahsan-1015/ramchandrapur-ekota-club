# 🏛️ Ramchandrapur Ekota Club — Digital Club Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.3.0-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-ef4444?style=flat-square&logo=turborepo)](https://turbo.build/)

> **Ramchandrapur Ekota Club (রামচন্দ্রপুর একতা ক্লাব)** is an enterprise-grade, digital club management platform designed for a modern village social organization in Chatmohar, Pabna, Bangladesh. Built with **Next.js 14 App Router**, **NestJS 10**, **MongoDB Atlas**, and **Turborepo**.

---

## 🌟 Key Features

### 🎨 1. Apple/Vercel-Inspired Master Home Page
- **Sticky Glassmorphism Header**: Blurred navigation bar with global search, notification center, and mobile drawer.
- **High-Impact Hero Section**: Vibrant dark-mode aesthetics, custom radial glows, and call-to-actions.
- **100% Financial Transparency Ledger**: Real-time summary of Total Income, Total Expenses, and Net Fund Balance directly from MongoDB Atlas.
- **Interactive FAQ Accordion**: Instant answers to common member inquiries.
- **Floating Emergency Blood Widgets**: Instant access to emergency blood donors and scroll progress bar.

### 🎛️ 2. Role-Based Access Control (RBAC) Dashboard System
Personalized dashboards, navigation menus, and widgets for **7 custom roles**:
1. **Super Admin**: Complete platform administration, user approvals, audit logs, system settings, and API keys.
2. **President**: Executive oversight, pending member approvals queue, committee meetings, read-only financial summary, and voting supervision.
3. **Secretary**: Daily club operations, registration approvals, notice broadcasting, and meeting resolutions.
4. **Treasurer**: Financial ledger management, income/expense voucher logging, donation summary, and digital receipt generation.
5. **Committee Member**: Assigned tasks, meeting schedules, upcoming events, and notice archive.
6. **Volunteer**: Field work tasks, QR event attendance logger, volunteer hours, and certificates.
7. **General Member**: Digital membership card with scannable QR token, blood donor status toggle, dues history, and notices.

---

## 🏗️ Monorepo Architecture

```
ramchandrapur-ekota-club/
├── apps/
│   ├── api/                     # NestJS 10 REST API Backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/        # JWT Authentication, Password Hashing & Cookies
│   │   │   │   ├── users/       # User Schemas & Role Scoping
│   │   │   │   ├── members/     # Member Directory & Blood Donor Search
│   │   │   │   └── finance/     # Financial Transactions & Balance Summary
│   │   │   └── database/
│   │   │       └── seed.ts      # Standalone MongoDB Atlas Seeder Script
│   └── web/                     # Next.js 14 App Router Frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── (public)/    # Home, About, Committee, Blood Donors, Contact
│       │   │   ├── (auth)/      # Login & Registration Pages
│       │   │   └── dashboard/   # Dynamic RBAC Dashboard Layout & Sub-modules
│       │   └── components/
│       │       └── home/        # Modular Home Page Components
├── packages/
│   ├── types/                   # Shared TypeScript Interfaces & Enums
│   └── validation/              # Shared Zod Validation Schemas
├── pnpm-workspace.yaml          # Monorepo Workspace Config
├── turbo.json                   # Turborepo Build Pipelines
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **pnpm**: v9.0.0 or higher (`npm install -g pnpm`)
- **MongoDB Atlas**: Connection URI

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Ahsan-1015/ramchandrapur-ekota-club.git
cd ramchandrapur-ekota-club
pnpm install
```

### 2. Configure Environment Variables

Create `apps/api/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://ramchandrapur-ekota-club:LSF8nso19Qo3vBzm@cluster0.xg04b.mongodb.net/ramchandrapur_ekota_club?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=7fP$2mL#vQ8!zX@9NkR&5HsWcT1bYpD4EaJ%uM6LgI^oF3sRzA8nVxCqJwE7KdBn
CLOUDINARY_CLOUD_NAME=ramchndrapur-ekota-club
CLOUDINARY_API_KEY=742445196267524
CLOUDINARY_API_SECRET=qdcGXL6JpZGxjDVEfCsn8I0V1jI
```

Create `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 3. Seed Database (Optional)
Populate MongoDB Atlas with Super Admin, test members, blood donors, and financial transactions:
```bash
npx pnpm --filter @ramchandrapur/api run seed
```

### 4. Run Development Server
```bash
npx pnpm dev
```

Open your browser at:
- 🌐 **Web Frontend**: [http://localhost:3000](http://localhost:3000)
- 🎛️ **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- 📚 **Swagger API Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 🔑 Default Accounts (Seeded)

| Role | Email | Password | Membership ID |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `aaaa.ahshanhabib@gmail.com` | `Admin@123456` | `REC-2026-0001` |

---

## 📄 License & Credits

Created for **Ramchandrapur Ekota Club**, Chatmohar, Pabna, Bangladesh.  
Developed by **Ahsan Habib**. All rights reserved.
