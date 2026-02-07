# VoiceReach AI - AI Voice Outreach Platform

This is a complete Micro-SaaS for automated AI voice calling.

## 🏗 System Architecture

### Frontend (User Interface)
- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS + custom UI components (Shadcn-like)
- **Routing**: React Router v6
- **State**: React Query + Context

### Backend (Serverless)
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth (Email + Google)
- **API**: Supabase Edge Functions (Node.js) for orchestrating calls.

### AI & Automation
- **Voice Provider**: Vapi.ai or Bland AI (recommended)
- **Orchestration**: `clawd.bot` or Supabase Edge Functions processing the call queue.

## 🚀 Getting Started

### 1. Setup Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

## 🗄 Database Setup

Run the SQL migration file located at `supabase/migrations/20240101_init.sql` in your Supabase SQL Editor. This will create:
- `profiles`: Stores user subscription data.
- `campaigns`: Groups contacts and voice settings.
- `contacts`: The list of people to call.
- `call_logs`: History of all AI calls.

## 🤖 Automation Logic

To implement the actual calling logic, deploy a Supabase Edge Function (or Node.js script) that:
1. Queries `contacts` where `status = 'pending'`.
2. Checks user's `credits_monthly` vs `credits_used`.
3. Calls the Voice AI API (e.g., Vapi/Bland).
4. Updates `contacts.status` to `calling`.
5. Receives webhook from Voice Provider upon completion to update status and transcript.

## 💰 Payments (Stripe)

1. Create products in Stripe matching the plans in `Landing.tsx`.
2. Use Supabase Edge Functions to handle Stripe Webhooks (`customer.subscription.created`, `invoice.payment_succeeded`).
3. Update `profiles.subscription_status` and `credits_monthly` based on the webhook events.
