"use client";

import { useRef, useState } from "react";
import type { ResumeData, Template } from "@/lib/types";
import { ModernTemplate } from "@/components/templates/modern-template";
import { ClassicTemplate } from "@/components/templates/classic-template";
import { CreativeTemplate } from "@/components/templates/creative-template";
import { FormattingToolbar } from "@/components/resume/formatting-toolbar";

interface ResumePreviewProps {
  data: ResumeData;
  template: Template;
  isEditing: boolean;
  onDataChange: (data: ResumeData) => void;
}

export function ResumePreview({
  data,
  template,
  isEditing,
  onDataChange,
}: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [showFormatting, setShowFormatting] = useState(false);

  const handleFieldChange = (path: string, value: string) => {
    // Create a deep copy of the data
    const newData = JSON.parse(JSON.stringify(data));

    // Split the path into parts (e.g., "personal.name" -> ["personal", "name"])
    const pathParts = path.split(".");

    // Handle array indices in the path (e.g., "experience.0.title")
    let current = newData;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      // Check if the next part is a number (array index)
      if (!isNaN(Number(pathParts[i + 1]))) {
        // Ensure the current part is an array
        if (!Array.isArray(current[part])) {
          current[part] = [];
        }
      } else if (current[part] === undefined) {
        // Create an object if it doesn't exist
        current[part] = {};
      }
      current = current[part];
    }

    // Set the value at the final path
    current[pathParts[pathParts.length - 1]] = value;

    onDataChange(newData);
  };

  const handleFormatCommand = (command: string, value?: string) => {
    if (command === "fontSize") {
      // Handle font size increase/decrease
      if (value === "increase") {
        document.execCommand("fontSize", false, "4"); // Increase size
      } else if (value === "decrease") {
        document.execCommand("fontSize", false, "2"); // Decrease size
      }
    } else {
      // Handle other formatting commands
      document.execCommand(command, false);
    }
  };

  const renderTemplate = () => {
    const templateProps = {
      data,
      isEditing,
      onFieldChange: handleFieldChange,
      onFieldFocus: () => setShowFormatting(true),
    };

    switch (template) {
      case "modern":
        return <ModernTemplate {...templateProps} />;
      case "classic":
        return <ClassicTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={resumeRef}
        className="w-full max-w-[850px] min-h-[1100px] bg-white shadow-lg mx-auto p-8 relative"
        style={{ aspectRatio: "8.5/11" }}
        onClick={() => {
          if (isEditing) {
            setShowFormatting(true);
          }
        }}
      >
        {renderTemplate()}
      </div>

      {isEditing && (
        <FormattingToolbar
          isVisible={showFormatting}
          onFormatCommand={handleFormatCommand}
        />
      )}
    </div>
  );
}
