# Interiør Haven - Modern Interior Design Store

Welcome to Interiør Haven, a sophisticated e-commerce platform for premium interior design products. This project showcases a modern web application built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Browse curated interior design products
- 🛒 Shopping cart functionality
- 💳 Multiple payment options (Vipps and Klarna)
- 📱 Responsive design for all devices
- 🔐 User authentication
- 👤 Admin dashboard for product management

## Getting Started

### Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher) installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd style-haven-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration

4. Start the development server:
```bash
cd server
node index.js

open new terminal
cd src
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── pages/         # Page components
├── utils/         # Utility functions
└── types/         # TypeScript type definitions
```

## Testing

Run the test suite with:
```bash
npm test
```

This will execute both frontend and backend tests to ensure code integrity.

## Payment Integration

This project supports two payment methods:
- **Vipps**: Popular mobile payment solution in Norway
- **Klarna**: Flexible payment options including installments

To test payments:
1. Use test credentials provided in the development environment
2. For Vipps, use the test phone numbers listed in their documentation
3. For Klarna, use their test payment details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Tanstack Query

- **Backend**:
  - Express.js
  - Node.js
  - PostgreSQL
  - JWT Authentication


## License

This project is licensed under the MIT License - see the LICENSE file for details.
