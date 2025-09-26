# 🚀 Employee Management System (EMS)

The **Employee Management System (EMS)** is a comprehensive web application for managing employees, departments, payroll, attendance, performance, and more.  
Built with **React + Supabase**, it provides authentication, role-based access, secure file storage, and real-time features.

---

## 📌 Features

- **Authentication & Role-Based Access**
  - Secure login with Supabase Auth (Email/Password, OAuth, Magic Link)
  - Roles: **Admin, HR, Employee**
  - JWT sessions with Row Level Security (RLS)

- **Employee Management**
  - CRUD operations for employee records
  - Personal profile with documents & contact details
  - Upload ID proofs, resumes, and certificates to Supabase Storage

- **Department & Role Management**
  - Create/manage departments
  - Assign employees to roles (Developer, Manager, Intern, etc.)

- **Attendance & Leave Management**
  - Daily attendance tracking
  - Leave requests with approval/rejection flow
  - Leave balance & holiday calendar

- **Payroll System**
  - Store salary structure
  - Auto-calculation (basic, deductions, overtime, bonus)
  - Payslip generation (PDF)

- **Performance & Appraisals**
  - Define goals & KPIs
  - Record appraisal reviews
  - Track promotions

- **Reports & Dashboard**
  - Employee statistics per department
  - Salary expenditure trends
  - Attendance insights
  - Export CSV/PDF

- **Notifications & Communication**
  - Email notifications (leave approvals, announcements)
  - System-wide announcements

- **Additional Features**
  - Employee Self-Service Portal (ESSP)
  - Audit logs for compliance
  - Slack/Teams/Email integrations
  - Mobile app support with React Native / Flutter

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite  
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)  
- **UI Library:** TailwindCSS, ShadCN UI (optional)  
- **Charts & Reports:** Recharts / Chart.js  
- **PDF Generation:** Node.js / Next.js API routes  


---

## ⚡ Supabase Integration

- **Authentication:** Role-based access using Supabase Auth  
- **Database:** PostgreSQL with relational schema  
- **Storage:** Employee document uploads (ID, certificates, payslips)  
- **Real-Time:** Live dashboards and attendance updates  
- **Edge Functions:** Automated notifications and triggers  

---

## 📈 Development Plan

1. **Phase 1:** Authentication + Employee CRUD  
2. **Phase 2:** Department & Role Management  
3. **Phase 3:** Attendance & Leave System  
4. **Phase 4:** Payroll System  
5. **Phase 5:** Reports & Dashboard  
6. **Phase 6 (Optional):** Performance & Project Management  
7. **Final Phase:** Notifications, Settings & UI Polish  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- Supabase account → [https://supabase.com](https://supabase.com)  

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/Employee.git
cd employee-management-system

# Install dependencies
npm install

# Add your Supabase credentials
cp .env.example .env.local

# Start development server
npm run dev
