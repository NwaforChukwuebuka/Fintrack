'use client';

import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface PerformanceMonitorProps {
  onMetrics?: (metrics: PerformanceMetrics) => void;
  enabled?: boolean;
}

const PerformanceMonitor = React.memo(function PerformanceMonitor({ 
  onMetrics, 
  enabled = process.env.NODE_ENV === 'development' 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime;
          setMetrics(prev => ({ ...prev, lcp } as PerformanceMetrics));
        }
      });
    });

    // Measure FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          const fcp = entry.startTime;
          setMetrics(prev => ({ ...prev, fcp } as PerformanceMetrics));
        }
      });
    });

    // Measure CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setMetrics(prev => ({ ...prev, cls: clsValue } as PerformanceMetrics));
        }
      });
    });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'first-input') {
          const eventEntry = entry as PerformanceEventTiming;
          const fid = eventEntry.processingStart - eventEntry.startTime;
          setMetrics(prev => ({ ...prev, fid } as PerformanceMetrics));
        }
      });
    });

    // Measure TTFB (Time to First Byte)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      setMetrics(prev => ({ ...prev, ttfb } as PerformanceMetrics));
    }

    // Start observing
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    fcpObserver.observe({ entryTypes: ['paint'] });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    fidObserver.observe({ entryTypes: ['first-input'] });

    return () => {
      observer.disconnect();
      fcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, [enabled]);

  useEffect(() => {
    if (metrics && onMetrics) {
      onMetrics(metrics);
    }
  }, [metrics, onMetrics]);

  // Only render in development
  if (!enabled || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>FCP: {metrics?.fcp?.toFixed(0)}ms</div>
      <div>LCP: {metrics?.lcp?.toFixed(0)}ms</div>
      <div>FID: {metrics?.fid?.toFixed(0)}ms</div>
      <div>CLS: {metrics?.cls?.toFixed(3)}</div>
      <div>TTFB: {metrics?.ttfb?.toFixed(0)}ms</div>
    </div>
  );
});

export default PerformanceMonitor; 