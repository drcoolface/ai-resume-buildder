import type { ResumeData } from "@/lib/types";
import { EditableField } from "@/components/resume/editable-field";

interface CreativeTemplateProps {
  data: ResumeData;
  isEditing: boolean;
  onFieldChange: (path: string, value: string) => void;
  onFieldFocus?: () => void;
}

export function CreativeTemplate({
  data,
  isEditing,
  onFieldChange,
  onFieldFocus,
}: CreativeTemplateProps) {
  return (
    <div className="font-sans">
      {/* Header with accent color */}
      <div className="bg-primary text-primary-foreground p-6 rounded-lg mb-6">
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
          className="text-xl opacity-90"
        />
      </div>

      {/* Three column layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Contact */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 border-b pb-2">Contact</h3>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <EditableField
                  value={data.personal.email}
                  path="personal.email"
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="text-sm"
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <EditableField
                  value={data.personal.phone}
                  path="personal.phone"
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="text-sm"
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
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
                <div>
                  <div className="text-xs text-muted-foreground">Website</div>
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
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 border-b pb-2">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <EditableField
                    value={skill}
                    path={`skills.${index}`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 border-b pb-2">Education</h3>
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
                  <div className="text-xs text-muted-foreground">
                    <EditableField
                      value={`${edu.startDate} - ${edu.endDate}`}
                      path={`education.${index}.date`}
                      isEditing={isEditing}
                      onChange={(path, value) => {
                        const [start, end] = value.split(" - ");
                        onFieldChange(`education.${index}.startDate`, start);
                        onFieldChange(`education.${index}.endDate`, end);
                      }}
                      onFocus={onFieldFocus}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="col-span-8 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-lg font-bold mb-3 border-b border-primary pb-2 inline-block">
              About Me
            </h3>
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
            <h3 className="text-lg font-bold mb-3 border-b border-primary pb-2 inline-block">
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-muted"
                >
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <EditableField
                    value={exp.title}
                    path={`experience.${index}.title`}
                    isEditing={isEditing}
                    onChange={onFieldChange}
                    onFocus={onFieldFocus}
                    className="font-bold"
                  />
                  <div className="flex justify-between items-center mb-1">
                    <EditableField
                      value={exp.company}
                      path={`experience.${index}.company`}
                      isEditing={isEditing}
                      onChange={onFieldChange}
                      onFocus={onFieldFocus}
                      className="text-sm font-medium"
                    />
                    <div className="text-xs bg-muted px-2 py-1 rounded">
                      <EditableField
                        value={`${exp.startDate} - ${exp.endDate}`}
                        path={`experience.${index}.date`}
                        isEditing={isEditing}
                        onChange={(path, value) => {
                          const [start, end] = value.split(" - ");
                          onFieldChange(`experience.${index}.startDate`, start);
                          onFieldChange(`experience.${index}.endDate`, end);
                        }}
                        onFocus={onFieldFocus}
                      />
                    </div>
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
