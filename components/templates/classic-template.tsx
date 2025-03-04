import type { ResumeData } from "@/lib/types";
import { EditableField } from "@/components/resume/editable-field";

interface ClassicTemplateProps {
  data: ResumeData;
  isEditing: boolean;
  onFieldChange: (path: string, value: string) => void;
  onFieldFocus?: () => void;
}

export function ClassicTemplate({
  data,
  isEditing,
  onFieldChange,
  onFieldFocus,
}: ClassicTemplateProps) {
  return (
    <div className="font-serif">
      {/* Header */}
      <div className="text-center mb-8">
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
          className="text-xl mb-4"
        />
        <div className="flex justify-center space-x-4 text-sm">
          <EditableField
            value={data.personal.email}
            path="personal.email"
            isEditing={isEditing}
            onChange={onFieldChange}
            onFocus={onFieldFocus}
          />
          <span>|</span>
          <EditableField
            value={data.personal.phone}
            path="personal.phone"
            isEditing={isEditing}
            onChange={onFieldChange}
            onFocus={onFieldFocus}
          />
          <span>|</span>
          <EditableField
            value={data.personal.location}
            path="personal.location"
            isEditing={isEditing}
            onChange={onFieldChange}
            onFocus={onFieldFocus}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-3">
          Summary
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
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-3">
          Experience
        </h3>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <EditableField
                  value={exp.title}
                  path={`experience.${index}.title`}
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="font-bold"
                />
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
                  className="text-sm"
                />
              </div>
              <EditableField
                value={exp.company}
                path={`experience.${index}.company`}
                isEditing={isEditing}
                onChange={onFieldChange}
                onFocus={onFieldFocus}
                className="italic mb-2"
              />
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

      {/* Education */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-3">
          Education
        </h3>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <EditableField
                  value={edu.degree}
                  path={`education.${index}.degree`}
                  isEditing={isEditing}
                  onChange={onFieldChange}
                  onFocus={onFieldFocus}
                  className="font-bold"
                />
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
                  className="text-sm"
                />
              </div>
              <EditableField
                value={edu.school}
                path={`education.${index}.school`}
                isEditing={isEditing}
                onChange={onFieldChange}
                onFocus={onFieldFocus}
                className="italic"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-3">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              <EditableField
                value={skill}
                path={`skills.${index}`}
                isEditing={isEditing}
                onChange={onFieldChange}
                onFocus={onFieldFocus}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
