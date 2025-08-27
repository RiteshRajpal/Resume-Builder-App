import { ResumeData } from './ResumeBuilder';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div id="resume-preview" className="bg-card p-8 min-h-[800px] shadow-lg rounded-lg">
      {/* Header */}
      <div className="text-center border-b border-border pb-6 mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {data.personal_info.fullName || 'Your Name'}
        </h1>
        <div className="text-muted-foreground space-y-1">
          <p>{data.personal_info.email}</p>
          <p className="flex justify-center gap-4 text-sm">
            {data.personal_info.phone && <span>{data.personal_info.phone}</span>}
            {data.personal_info.location && <span>{data.personal_info.location}</span>}
          </p>
          <p className="flex justify-center gap-4 text-sm">
            {data.personal_info.linkedin && (
              <span>LinkedIn: {data.personal_info.linkedin}</span>
            )}
            {data.personal_info.portfolio && (
              <span>Portfolio: {data.personal_info.portfolio}</span>
            )}
          </p>
        </div>
      </div>

      {/* Summary */}
      {data.personal_info.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-3 border-b border-border pb-1">
            Professional Summary
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {data.personal_info.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-3 border-b border-border pb-1">
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-foreground">{exp.position}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              <div className="text-muted-foreground mb-2">
                <span className="font-medium">{exp.company}</span>
                {exp.location && <span> • {exp.location}</span>}
              </div>
              {exp.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-3 border-b border-border pb-1">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-muted-foreground">
                    {edu.institution}
                    {edu.field && ` • ${edu.field}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-3 border-b border-border pb-1">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                {project.link && (
                  <span className="text-sm text-muted-foreground">{project.link}</span>
                )}
              </div>
              {project.technologies && (
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              )}
              {project.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-3 border-b border-border pb-1">
            Skills
          </h2>
          {data.skills.map((skillCategory, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold text-foreground">{skillCategory.category}:</span>
              <span className="text-muted-foreground ml-2">
                {skillCategory.items.join(', ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};