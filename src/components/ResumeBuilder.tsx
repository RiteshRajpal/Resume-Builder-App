import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './resume-forms/PersonalInfoForm';
import { EducationForm } from './resume-forms/EducationForm';
import { ExperienceForm } from './resume-forms/ExperienceForm';
import { ProjectsForm } from './resume-forms/ProjectsForm';
import { SkillsForm } from './resume-forms/SkillsForm';
import { ResumePreview } from './ResumePreview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Download, Save, Sparkles, LogOut } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

export interface ResumeData {
  personal_info: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
}

const initialResumeData: ResumeData = {
  personal_info: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  useEffect(() => {
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const resume = data[0];
        setResumeData({
          personal_info: resume.personal_info as any,
          education: resume.education as any,
          experience: resume.experience as any,
          projects: resume.projects as any,
          skills: resume.skills as any,
        });
      }
    } catch (error: any) {
      console.error('Error loading resume:', error);
    }
  };

  const saveResumeData = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('resumes')
        .upsert({
          user_id: user.id,
          personal_info: resumeData.personal_info,
          education: resumeData.education,
          experience: resumeData.experience,
          projects: resumeData.projects,
          skills: resumeData.skills,
        });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Resume saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const enhanceWithAI = async () => {
    setEnhancing(true);
    try {
      // This would integrate with an LLM API like OpenAI
      // For now, we'll simulate enhancement
      const enhancedSummary = resumeData.personal_info.summary + " Enhanced with AI insights for better professional impact.";
      
      setResumeData(prev => ({
        ...prev,
        personal_info: {
          ...prev.personal_info,
          summary: enhancedSummary
        }
      }));

      toast({
        title: 'Enhanced!',
        description: 'Resume enhanced with AI suggestions.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to enhance resume with AI.',
        variant: 'destructive',
      });
    } finally {
      setEnhancing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
          <div className="flex gap-2">
            <Button
              onClick={enhanceWithAI}
              variant="outline"
              size="sm"
              disabled={enhancing}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Enhance with AI
            </Button>
            <Button
              onClick={saveResumeData}
              variant="outline"
              size="sm"
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={() => generatePDF(resumeData)}
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6">
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => updateResumeData('personal_info', data)}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => updateResumeData('education', data)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-6">
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) => updateResumeData('experience', data)}
                  />
                </TabsContent>

                <TabsContent value="projects" className="mt-6">
                  <ProjectsForm
                    data={resumeData.projects}
                    onChange={(data) => updateResumeData('projects', data)}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) => updateResumeData('skills', data)}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumePreview data={resumeData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};