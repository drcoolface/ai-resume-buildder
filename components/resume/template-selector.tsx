"use client";
import { Card, CardContent } from "@/components/ui/card";
import type { Template } from "@/lib/types";
import Image from "next/image";

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const templates: { id: Template; name: string; description: string }[] = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional design with a modern touch",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional resume layout, perfect for formal applications",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Stand out with this unique and eye-catching design",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all max-h-72 ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary"
                : "hover:shadow-md"
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="px-2">
              <div className="min-h-32 relative mb-2 bg-muted rounded-md overflow-hidden">
                <Image
                  src={`/${template.id}.webp`}
                  alt={template.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-medium text-base">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
