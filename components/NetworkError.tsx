'use client';

import { WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

interface NetworkErrorProps {
  error: string;
  onRetry: () => void;
  type?: 'network' | 'server' | 'timeout';
}

export default function NetworkError({ error, onRetry, type = 'network' }: NetworkErrorProps) {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: WifiOff,
          title: 'Network Connection Error',
          description: 'Unable to connect to the server. Please check your internet connection and try again.',
          actionLabel: 'Retry Connection'
        };
      case 'server':
        return {
          icon: AlertTriangle,
          title: 'Server Error',
          description: 'The server is experiencing issues. Please try again in a few moments.',
          actionLabel: 'Try Again'
        };
      case 'timeout':
        return {
          icon: RefreshCw,
          title: 'Request Timeout',
          description: 'The request took too long to complete. Please try again.',
          actionLabel: 'Retry'
        };
      default:
        return {
          icon: AlertTriangle,
          title: 'Connection Error',
          description: error || 'An unexpected error occurred. Please try again.',
          actionLabel: 'Retry'
        };
    }
  };

  const content = getErrorContent();
  const IconComponent = content.icon;

  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <IconComponent className="h-8 w-8 text-red-500" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {content.title}
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-sm">
            {content.description}
          </p>
          
          <div className="flex gap-2">
            <Button 
              onClick={onRetry}
              className="bg-primary hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {content.actionLabel}
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Specialized network error components
export function NetworkConnectionError({ onRetry }: { onRetry: () => void }) {
  return (
    <NetworkError
      error="Network connection failed"
      onRetry={onRetry}
      type="network"
    />
  );
}

export function ServerError({ onRetry }: { onRetry: () => void }) {
  return (
    <NetworkError
      error="Server error occurred"
      onRetry={onRetry}
      type="server"
    />
  );
}

export function TimeoutError({ onRetry }: { onRetry: () => void }) {
  return (
    <NetworkError
      error="Request timeout"
      onRetry={onRetry}
      type="timeout"
    />
  );
} 