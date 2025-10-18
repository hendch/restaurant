# Restaurant Analytics Platform

An open-source React application for embedding Power BI reports with organization authentication. Built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Router** for navigation
- **Power BI** embedded reports

## 🎨 Features

- **Dark Theme UI** with custom color palette
- **KPI Cards** with color-coded tones
- **Power BI Organization Embeds** (requires sign-in)
- **Responsive Design** with mobile support
- **Role-Based Dashboards** for Owner, Marketing, and Franchise views

## 📋 Prerequisites

- Node.js 18+ and npm
- Power BI account with access to reports
- Power BI report URLs (organization embed type)

## 🔧 Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Power BI organization embed URLs:
   ```env
   VITE_PBI_OWNER_ORG_URL="https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&..."
   VITE_PBI_MARKETING_ORG_URL="https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&..."
   VITE_PBI_FRANCHISE_ORG_URL="https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&..."
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080`

## 🔐 Power BI Authentication

This app uses **organization embed** URLs, which means:

- Users must be signed into Power BI in the same browser session
- Power BI will prompt for authentication if not already signed in
- Users must have appropriate permissions to view the embedded reports
- No additional tokens or authentication configuration needed in the app

## 🎨 Color Palette

The app uses a custom dark theme with these colors:

- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#10B981` (Green)
- **Tertiary**: `#F59E0B` (Amber)
- **Quaternary**: `#8B5CF6` (Purple)
- **Danger**: `#EF4444` (Red)
- **Text**: `#E6ECFF` (Light Blue/White)
- **Background**: `#0B1020` (Very Dark Blue)
- **Panel**: `#121A2A` (Dark Blue Panel)

## 📁 Project Structure

```
src/
├── components/
│   ├── KpiCard.tsx           # KPI metric card with tone variants
│   ├── PowerBIOrgIframe.tsx  # Power BI iframe embed component
│   ├── RoleCard.tsx          # Role selection cards
│   └── Navigation.tsx        # Top navigation bar
├── pages/
│   ├── Index.tsx             # Home page with role cards
│   ├── Owner.tsx             # Owner dashboard
│   ├── Marketing.tsx         # Marketing dashboard
│   └── Franchise.tsx         # Franchise dashboard
└── index.css                 # Design system tokens
```

## 🛠️ Components

### KpiCard

Display key performance indicators with color-coded tones:

```tsx
<KpiCard
  title="Average Overall"
  value="4.2"
  delta="+0.3"
  tone="primary"
/>
```

**Props:**
- `title`: string - KPI label
- `value`: string | number - Main metric value
- `delta?`: string - Change indicator (optional)
- `tone?`: "primary" | "secondary" | "tertiary" | "quaternary" | "danger"

### PowerBIOrgIframe

Embed Power BI reports with loading and error states:

```tsx
<PowerBIOrgIframe
  src={import.meta.env.VITE_PBI_OWNER_ORG_URL}
  title="Owner Dashboard Report"
/>
```

**Props:**
- `src`: string - Power BI embed URL
- `title`: string - Accessible iframe title

## 🌐 Pages

- **`/`** - Home page with role selection cards
- **`/owner`** - Operations & Performance dashboard
- **`/marketing`** - Consumer Insights & Campaign Performance
- **`/franchise`** - Growth Metrics & Network Performance

## 🔒 Security

The app includes:
- Content Security Policy header allowing Power BI iframes
- Iframe sandbox attributes for security
- No-referrer policy for privacy
- HTTPS-only communication with Power BI

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1400px)
- Touch-friendly interactive elements
- Optimized iframe sizes for different screens

## 🚀 Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## 📝 License

This project is open-source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Important Notes

1. **Power BI Access**: Users must have appropriate Power BI licenses and report permissions
2. **Browser Session**: Users must be signed into Power BI in the same browser
3. **Environment Variables**: Never commit `.env.local` to version control
4. **CORS**: Power BI handles CORS automatically for organization embeds

## 📚 Resources

- [Power BI Embedding Documentation](https://learn.microsoft.com/en-us/power-bi/developer/embedded/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
