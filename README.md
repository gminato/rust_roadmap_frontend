# Rustacean Roadmap

A structured 3-month interactive roadmap for learning Rust, starting with Fundamentals.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Firebase Admin SDK
- **Database**: Cloud Firestore
- **Authentication**: Google OAuth 2.0, JWT tokens
- **Hosting**: Firebase Hosting (Frontend), Google App Engine (Backend)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Google Cloud Project with Firebase enabled

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd practice_website_rust
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```env
   VITE_AUTH_API_URL=https://your-auth-microservice-url
   VITE_BACKEND_API_URL=https://your-backend-url
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building

```bash
npm run build
```

## Deployment

### Frontend (Firebase Hosting)
```bash
firebase deploy --only hosting
```

### Backend (Google App Engine)
Deploy the backend service separately from its repository.

## API Documentation

See [BACKEND_API.md](./BACKEND_API.md) for API details.

## Project Structure

```
├── components/          # React components
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── contexts/           # React contexts (Auth, etc.)
├── constants.js        # App constants and data
├── types.js            # TypeScript-like type definitions
└── dist/               # Built files (generated)
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test locally
4. Commit and push
5. Create a pull request

## Notes

- Progress data is stored in Firestore for authenticated users.
- Guest users can use the app with localStorage for progress.