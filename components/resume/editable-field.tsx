"use client";

import { useEffect, useRef } from "react";

interface EditableFieldProps {
  value: string;
  path: string;
  isEditing: boolean;
  onChange: (path: string, value: string) => void;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  onFocus?: () => void;
}

export function EditableField({
  value,
  path,
  isEditing,
  onChange,
  as = "p",
  className = "",
  onFocus,
}: EditableFieldProps) {
  // We'll use this ref to track the current value in the DOM
  const elementRef = useRef<HTMLDivElement>(null);
  // Track previous editing state to detect changes
  const wasEditing = useRef(isEditing);

  // Initialize content when entering edit mode
  useEffect(() => {
    // Only update DOM when transitioning from non-editing to editing
    if (isEditing && !wasEditing.current && elementRef.current) {
      // Use innerHTML instead of innerText to preserve formatting
      elementRef.current.innerHTML = value;
    }

    // Update our tracking ref
    wasEditing.current = isEditing;

    // When exiting edit mode, save the content
    if (!isEditing && wasEditing.current && elementRef.current) {
      // Use innerHTML to preserve formatting
      onChange(path, elementRef.current.innerHTML);
    }
  }, [isEditing, value, path, onChange]);

  // When value changes from parent and we're not in edit mode, update the display
  useEffect(() => {
    if (!isEditing && elementRef.current) {
      // Use innerHTML to preserve formatting
      elementRef.current.innerHTML = value;
    }
  }, [value, isEditing]);

  const Element = as;

  return (
    <Element
      ref={elementRef}
      className={`${className} ${
        isEditing
          ? "border border-dashed border-gray-300 p-1 focus:outline-none focus:border-primary min-h-[1em] min-w-[1em]"
          : ""
      }`}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onFocus={() => {
        if (onFocus) onFocus();
      }}
      onBlur={() => {
        if (isEditing && elementRef.current) {
          // Use innerHTML to preserve formatting
          onChange(path, elementRef.current.innerHTML);
        }
      }}
    />
  );
}
