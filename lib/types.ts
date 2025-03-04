export type Template = "modern" | "classic" | "creative";

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
  };
  summary: string;
  experience: {
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    location?: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
}
