import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    onChange([
      ...data,
      {
        name: '',
        description: '',
        technologies: '',
        link: '',
      },
    ]);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {data.map((project, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Project {index + 1}</CardTitle>
            <Button
              onClick={() => removeProject(index)}
              variant="ghost"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  placeholder="Project Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input
                value={project.link}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                placeholder="Describe your project, its purpose, and key features..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};