import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../atoms/Button.jsx';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rust-500/10 mb-6">
            <AlertTriangle className="w-10 h-10 text-rust-500" />
          </div>
          <h1 className="text-6xl font-bold text-rust-500 mb-4 font-mono">404</h1>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Page Not Found</h2>
          <p className="text-zinc-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/month1/week1')}
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go to Home
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500 font-mono">
            <span className="text-rust-500">rustacean-roadmap</span> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
