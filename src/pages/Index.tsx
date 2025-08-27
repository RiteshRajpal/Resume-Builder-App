import { useAuth } from '@/hooks/useAuth';
import { Auth } from '@/components/Auth';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return <ResumeBuilder />;
};

export default Index;
