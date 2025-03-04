import type { ResumeData } from "@/lib/types";
import { EditableField } from "@/components/resume/editable-field";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
  isEditing: boolean;
  onFieldChange: (path: string, value: string) => void;
  onFieldFocus?: () => void;
}

export function ModernTemplate({
  data,
  isEditing,
  onFieldChange,
  onFieldFocus,
}: ModernTemplateProps) {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="border-b-2 border-primary pb-4 mb-6">
        <EditableField
          value={data.personal.name}
          path="personal.name"
          isEditing={isEditing}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          as="h1"
          className="text-3xl font-bold mb-2"
        />
        <EditableField
          value={data.personal.title}
          path="personal.title"
          isEditing={isEditing}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          as="h2"
          className="text-xl text-muted-foreground"
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left column - Contact & Skills */}
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <EditableField
                  value={data.personal.email}
                  path="personal.email"
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="text-sm"
                />
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <EditableField
                  value={data.personal.phone}
                  path="personal.phone"
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="text-sm"
                />
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <EditableField
                  value={data.personal.location}
                  path="personal.location"
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="text-sm"
                />
              </div>
              {data.personal.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <EditableField
                    value={data.personal.website}
                    path="personal.website"
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Skills</h3>
            <ul className="space-y-1">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-sm">
                  <EditableField
                    value={skill}
                    path={`skills.${index}`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <EditableField
                    value={edu.degree}
                    path={`education.${index}.degree`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="font-medium"
                  />
                  <EditableField
                    value={edu.school}
                    path={`education.${index}.school`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="text-sm"
                  />
                  <div className="text-sm text-muted-foreground">
                    <EditableField
                      value={`${edu.startDate} - ${edu.endDate}`}
                      path={`education.${index}.date`}
                      isEditing={isEditing}
                      onChange={(path, value) => {
                        // This is a simplified approach - in a real app you'd parse the dates
                        const [start, end] = value.split(" - ");
                        onFieldChange(`education.${index}.startDate`, start);
                        onFieldChange(`education.${index}.endDate`, end);
                      }}
                      onFocus={onFieldFocus}
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Summary, Experience */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Summary</h3>
            <EditableField
              value={data.summary}
              path="summary"
              isEditing={isEditing}
              onChange={onFieldChange}
              onFocus={onFieldFocus}
              className="text-sm"
            />
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <EditableField
                    value={exp.title}
                    path={`experience.${index}.title`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="font-medium"
                  />
                  <EditableField
                    value={exp.company}
                    path={`experience.${index}.company`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="text-sm"
                  />
                  <div className="text-sm text-muted-foreground mb-2">
                    <EditableField
                      value={`${exp.startDate} - ${exp.endDate}`}
                      path={`experience.${index}.date`}
                      isEditing={isEditing}
                      onChange={(path, value) => {
                        // This is a simplified approach - in a real app you'd parse the dates
                        const [start, end] = value.split(" - ");
                        onFieldChange(`experience.${index}.startDate`, start);
                        onFieldChange(`experience.${index}.endDate`, end);
                      }}
                      onFocus={onFieldFocus}
                      className="text-sm"
                    />
                  </div>
                  <EditableField
                    value={exp.description}
                    path={`experience.${index}.description`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
