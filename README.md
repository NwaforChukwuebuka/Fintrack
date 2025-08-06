# Fintrack Dashboard - Wallet Ledger

A modern, responsive dashboard application built with React, TypeScript, and Next.js for financial tracking and transaction management.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install**
   ```bash
   git clone [repository-url]
   cd fintrack
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📊 Features

### Dashboard Components
- **Header**: Navigation bar with logo, search, and user avatars
- **Summary Cards**: Total balance, credits, debits, and transaction count with trends
- **Transaction Table**: Sortable table with credit/debit transactions
- **Tab Navigation**: Overview and Transactions views

### Data Structure
```typescript
interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: 'Credit' | 'Debit';
}
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with Shadcn/ui components
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Color Coding**: Green for credits, red for debits
- **Interactive Elements**: Hover states and smooth transitions

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React hooks

## 🚀 Deployment

### Build Process
```bash
npm install
npm run build
npm start
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications

## 🧪 Quality Assurance

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Error Handling**: Graceful error states and loading indicators
- **Performance**: Lazy loading, memoization, and optimization

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License

## 🙏 Acknowledgments

- Shadcn/ui for component library
- Tailwind CSS for styling framework
- Next.js Team for React framework

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
