import { ResumeBuilder } from "@/components/resume/resume-builder";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Resume Builder</h1>
      <ResumeBuilder />
    </main>
  );
}
