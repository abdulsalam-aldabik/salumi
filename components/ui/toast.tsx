"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-20 right-4 z-[70] max-w-md"
        >
          <div
            className={`flex items-center gap-3 rounded-lg p-4 shadow-xl ${
              type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {type === "success" ? (
              <CheckCircle className="h-6 w-6 flex-shrink-0" />
            ) : (
              <XCircle className="h-6 w-6 flex-shrink-0" />
            )}
            <p className="flex-1 font-medium">{message}</p>
            <button
              onClick={onClose}
              className="flex-shrink-0 transition-opacity hover:opacity-70"
              aria-label="Close notification"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
