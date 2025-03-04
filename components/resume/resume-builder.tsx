"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateSelector } from "./template-selector";
import { ResumePreview } from "./resume-preview";
import { ResumeDownload } from "./resume-download";
import { mockResumeData } from "@/lib/mock-data";
import type { ResumeData, Template } from "@/lib/types";

export function ResumeBuilder() {
  // In a real app, this would come from your forms
  const [resumeData, setResumeData] = useState<ResumeData>(mockResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern");
  const [isEditing, setIsEditing] = useState(false);

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleTemplateChange = (template: Template) => {
    setSelectedTemplate(template);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template">Choose Template</TabsTrigger>
          <TabsTrigger value="preview">Preview & Edit</TabsTrigger>
          <TabsTrigger value="download">Download</TabsTrigger>
        </TabsList>

        <TabsContent value="template" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end mb-4">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={toggleEditing}
                >
                  {isEditing ? "Save Changes" : "Edit Resume"}
                </Button>
              </div>
              <ResumePreview
                data={resumeData}
                template={selectedTemplate}
                isEditing={isEditing}
                onDataChange={handleDataChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="download" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ResumeDownload data={resumeData} template={selectedTemplate} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
