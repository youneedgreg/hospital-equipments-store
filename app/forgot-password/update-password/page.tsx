import { Suspense } from 'react';
import UpdatePasswordPageContent from './UpdatePasswordPageContent';
import { Loader2 } from "lucide-react";

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading password reset form...</p>
        </div>
      </div>
    }>
      <UpdatePasswordPageContent />
    </Suspense>
  );
}