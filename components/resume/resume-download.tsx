"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ResumeData, Template } from "@/lib/types";
import { ModernTemplate } from "../templates/modern-template";
import { ClassicTemplate } from "../templates/classic-template";
import { CreativeTemplate } from "../templates/creative-template";
import { Loader2 } from "lucide-react";

interface ResumeDownloadProps {
  data: ResumeData;
  template: Template;
}

export function ResumeDownload({ data, template }: ResumeDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return (
          <ModernTemplate
            data={data}
            isEditing={false}
            onFieldChange={() => {}}
          />
        );
      case "classic":
        return (
          <ClassicTemplate
            data={data}
            isEditing={false}
            onFieldChange={() => {}}
          />
        );
      case "creative":
        return (
          <CreativeTemplate
            data={data}
            isEditing={false}
            onFieldChange={() => {}}
          />
        );
      default:
        return <div>Template not found</div>;
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // In a real implementation, you would use a library like html2pdf.js or jsPDF
      // For this example, we'll simulate the PDF generation with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate download by creating a fake anchor element
      const link = document.createElement("a");
      link.download = `resume-${template}.pdf`;
      link.href = "#";
      link.click();

      // In a real implementation, you would do something like:
      // const element = document.getElementById('resume-to-print');
      // html2pdf().from(element).save(`resume-${template}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Download Your Resume</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Your resume is ready to download. Click the button below to save it as
          a PDF.
        </p>
        <Button size="lg" onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            "Download as PDF"
          )}
        </Button>
      </div>

      <div className="mt-8 border rounded-md p-4">
        <h3 className="text-lg font-medium mb-2">Preview</h3>
        <div
          id="resume-to-print"
          className="w-full max-w-[850px] min-h-[1100px] bg-white shadow-lg mx-auto p-8"
          style={{ aspectRatio: "8.5/11" }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
