import type { ResumeData } from "./types";

export const mockResumeData: ResumeData = {
  personal: {
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
  },
  summary:
    "Experienced frontend developer with over 6 years of experience building responsive and accessible web applications. Specialized in React, TypeScript, and modern frontend frameworks. Passionate about creating intuitive user interfaces and optimizing web performance.",
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: "Present",
      description:
        "Lead the frontend development team in building a SaaS platform used by over 50,000 customers. Implemented performance optimizations that improved page load times by 40%. Mentored junior developers and established coding standards.",
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions Co.",
      location: "Oakland, CA",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description:
        "Developed responsive web applications using React and Redux. Collaborated with designers to implement pixel-perfect UIs. Integrated RESTful APIs and implemented state management solutions.",
    },
    {
      title: "Junior Web Developer",
      company: "Digital Creations",
      location: "San Jose, CA",
      startDate: "Jun 2016",
      endDate: "Feb 2018",
      description:
        "Built and maintained client websites using HTML, CSS, and JavaScript. Worked with WordPress and custom PHP solutions. Assisted in UX research and A/B testing.",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2012",
      endDate: "2016",
    },
    {
      degree: "Web Development Bootcamp",
      school: "Coding Academy",
      location: "San Francisco, CA",
      startDate: "2016",
      endDate: "2016",
    },
  ],
  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "HTML5 & CSS3",
    "Tailwind CSS",
    "Redux",
    "GraphQL",
    "Jest & Testing Library",
    "Webpack",
    "Git & GitHub",
    "Responsive Design",
    "Web Accessibility (WCAG)",
  ],
};
