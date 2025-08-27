import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Skill {
  category: string;
  items: string[];
}

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: number]: string }>({});

  const addSkillCategory = () => {
    onChange([
      ...data,
      {
        category: '',
        items: [],
      },
    ]);
  };

  const updateCategory = (index: number, category: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, category } : item
    );
    onChange(updated);
  };

  const addSkillItem = (categoryIndex: number) => {
    const skillText = newSkillInputs[categoryIndex]?.trim();
    if (!skillText) return;

    const updated = data.map((category, i) =>
      i === categoryIndex
        ? { ...category, items: [...category.items, skillText] }
        : category
    );
    onChange(updated);
    setNewSkillInputs({ ...newSkillInputs, [categoryIndex]: '' });
  };

  const removeSkillItem = (categoryIndex: number, skillIndex: number) => {
    const updated = data.map((category, i) =>
      i === categoryIndex
        ? { ...category, items: category.items.filter((_, j) => j !== skillIndex) }
        : category
    );
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent, categoryIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkillItem(categoryIndex);
    }
  };

  return (
    <div className="space-y-4">
      {data.map((skillCategory, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Skill Category {categoryIndex + 1}</CardTitle>
            <Button
              onClick={() => removeCategory(categoryIndex)}
              variant="ghost"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category Name *</Label>
              <Input
                value={skillCategory.category}
                onChange={(e) => updateCategory(categoryIndex, e.target.value)}
                placeholder="Programming Languages, Frameworks, Tools, etc."
              />
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skillCategory.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillItem(categoryIndex, skillIndex)}
                      className="hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSkillInputs[categoryIndex] || ''}
                  onChange={(e) =>
                    setNewSkillInputs({ ...newSkillInputs, [categoryIndex]: e.target.value })
                  }
                  onKeyPress={(e) => handleKeyPress(e, categoryIndex)}
                  placeholder="Type a skill and press Enter"
                />
                <Button
                  onClick={() => addSkillItem(categoryIndex)}
                  variant="outline"
                  size="sm"
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addSkillCategory} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Skill Category
      </Button>
    </div>
  );
};