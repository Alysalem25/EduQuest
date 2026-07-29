import { CheckCircle2, X, XCircle } from 'lucide-react';
import { ToastMessage } from '../types/Tutor';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`animate-fade-in flex items-start gap-3 rounded-xl border px-4 py-3 shadow-card-hover backdrop-blur-sm ${
            toast.type === 'success'
              ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
              : 'bg-red-50/95 border-red-200 text-red-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-emerald-500" />
          ) : (
            <XCircle size={20} className="mt-0.5 flex-shrink-0 text-red-500" />
          )}
          <p className="text-sm font-medium flex-1">{toast.message}</p>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-current opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
