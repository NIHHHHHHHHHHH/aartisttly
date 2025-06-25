import {Button} from '../ui/Button';

/**
 * Dialog Component
 *
 * This component renders a customizable modal dialog that can function as either
 * an alert (single action) or a confirmation (two actions). It controls its visibility
 * based on the `isOpen` prop and provides slots for a title, message, and action handlers.

 * - 'alert': Displays a single "OK" button.
 * - 'confirm': Displays "Cancel" and "Confirm" buttons.
 */
export default function Dialog ({ isOpen, title, message, onConfirm, onClose, type = 'alert' }) {
  // If the dialog is not open, render nothing.
  if (!isOpen) return null;

  return (
    // Overlay for the dialog, covering the entire screen with a semi-transparent black background.
    // It uses fixed positioning, high z-index, and flexbox for centering.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      {/* Dialog content container.
          Styled with white background, rounded corners, shadow, and responsive width.
          Includes transition for smooth appearance/disappearance. */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 opacity-100">
        {/* Dialog title. */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
        {/* Dialog message content. */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        {/* Button container, aligned to the right with spacing between buttons. */}
        <div className="flex justify-end gap-3">
          {/*
            Cancel button:
            Conditionally rendered only when the dialog type is 'confirm'.
            Uses an 'outline' variant from the Button component and triggers the `onClose` callback.
          */}
          {type === 'confirm' && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          {/*
            Primary action button:
            Text changes based on dialog type ('Confirm' for 'confirm', 'OK' for 'alert').
            Triggers `onConfirm` if provided (for 'confirm' type), otherwise triggers `onClose`.
          */}
          <Button onClick={onConfirm || onClose}>
            {type === 'confirm' ? 'Confirm' : 'OK'}
          </Button>
        </div>
      </div>
    </div>
  );
};