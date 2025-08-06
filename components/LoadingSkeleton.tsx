'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LoadingSkeletonProps {
  type?: 'summary' | 'table' | 'header' | 'full';
}

export default function LoadingSkeleton({ type = 'full' }: LoadingSkeletonProps) {
  if (type === 'summary') {
    return <SummaryCardsSkeleton />;
  }

  if (type === 'table') {
    return <TableSkeleton />;
  }

  if (type === 'header') {
    return <HeaderSkeleton />;
  }

  return (
    <div className="space-y-6">
      <HeaderSkeleton />
      <SummaryCardsSkeleton />
      <TableSkeleton />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="bg-white border-b border-gray-200 px-3 py-3 sm:px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-24 sm:h-8 sm:w-32" />
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function SummaryCardsSkeleton() {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-secondary border-border min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-2 sm:px-3 lg:px-4 pt-2 sm:pt-3 lg:pt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent className="px-2 sm:px-3 lg:px-4 pb-2 sm:pb-3 lg:pb-4">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-primary/5 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-2 sm:px-4 py-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-16" />
              ))}
            </div>
          </div>
          
          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="border-b border-gray-200">
              <div className="grid grid-cols-5 gap-4 px-2 sm:px-4 py-3">
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-4 w-20" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 