import { hashPW } from "./lib/auth-utils";
import {
  createEducationEntries,
  createUser,
  createUserProfile,
  createWorkExperience,
  createSkill,
  createProject,
  createResume,
  createSkills,
} from "./lib/data";

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Create multiple users with varied data
    const userSeedData = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: await hashPW("password123"),
        profile: {
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
          addressOne: "123 Main St",
          addressTwo: "Apt 1",
          email: "john@example.com",
          website: "https://johndoe.com",
          linkedin: "https://linkedin.com/in/johndoe",
          github: "https://github.com/johndoe",
          twitter: "https://twitter.com/johndoe",
          profilePictureUrl: "https://example.com/john.jpg",
        },
        education: [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            fieldOfStudy: "Computer Science",
            startDate: "2016-09-01",
            endDate: "2020-05-30",
            description: "Graduated with honors, focus on software engineering",
          },
        ],
        workExperiences: [
          {
            company: "TechInnovate Solutions",
            position: "Senior Software Engineer",
            location: "San Francisco, CA",
            startDate: "2020-06-15",
            endDate: "2023-12-31",
            description: "Led development of cloud-native applications",
            achievements: "Implemented microservices architecture",
          },
          {
            company: "DataDriven Inc.",
            position: "Full Stack Developer",
            location: "New York, NY",
            startDate: "2018-01-15",
            endDate: "2020-06-01",
            description: "Developed data visualization tools",
            achievements: "Reduced backend processing time by 40%",
          },
        ],
        skills: [
          { name: "JavaScript", proficiency: 5 },
          { name: "React", proficiency: 4 },
          { name: "Node.js", proficiency: 4 },
          { name: "TypeScript", proficiency: 3 },
        ],
        projects: [
          {
            title: "AI Resume Builder",
            description: "Advanced resume generation platform using AI",
            startDate: "2022-01-01",
            endDate: "2023-06-30",
            url: "https://github.com/johndoe/ai-resume-builder",
          },
          {
            title: "Personal Portfolio Tracker",
            description:
              "Web app to track and showcase professional achievements",
            startDate: "2021-07-01",
            endDate: "2021-12-31",
            url: "https://github.com/johndoe/portfolio-tracker",
          },
        ],
        resumes: [
          {
            jobTitle: "Senior Software Engineer",
            jobDescription: "Seeking a challenging role in cloud engineering",
            resumeContent: JSON.stringify({
              sections: [
                "Professional Summary",
                "Technical Skills",
                "Work Experience",
                "Education",
                "Projects",
              ],
            }),
            pdfUrl: "https://example.com/john-doe-resume.pdf",
          },
        ],
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: await hashPW("securepass456"),
        profile: {
          fullName: "Jane Smith",
          phoneNumber: "987-654-3210",
          addressOne: "456 Tech Lane",
          addressTwo: "Suite 200",
          email: "jane@example.com",
          website: "https://janesmith.dev",
          linkedin: "https://linkedin.com/in/janesmith",
          github: "https://github.com/janesmith",
          twitter: "https://twitter.com/janesmith",
          profilePictureUrl: "https://example.com/jane.jpg",
        },
        education: [
          {
            institution: "Stanford University",
            degree: "Master of Science in Machine Learning",
            fieldOfStudy: "Artificial Intelligence",
            startDate: "2018-09-01",
            endDate: "2020-05-30",
            description: "Specialized in deep learning and neural networks",
          },
        ],
        workExperiences: [
          {
            company: "AI Innovations Lab",
            position: "Machine Learning Engineer",
            location: "Palo Alto, CA",
            startDate: "2020-07-01",
            endDate: "Present",
            description: "Developing cutting-edge AI solutions",
            achievements: "Developed predictive models with 95% accuracy",
          },
        ],
        skills: [
          { name: "Python", proficiency: 5 },
          { name: "Machine Learning", proficiency: 5 },
          { name: "TensorFlow", proficiency: 4 },
          { name: "Data Science", proficiency: 4 },
        ],
        projects: [
          {
            title: "Sentiment Analysis Platform",
            description: "NLP-powered sentiment analysis tool",
            startDate: "2021-01-01",
            endDate: "2021-12-31",
            url: "https://github.com/janesmith/sentiment-analyzer",
          },
        ],
        resumes: [
          {
            jobTitle: "Machine Learning Engineer",
            jobDescription:
              "Exploring advanced AI and machine learning opportunities",
            resumeContent: JSON.stringify({
              sections: [
                "Research Interests",
                "Technical Skills",
                "Academic Projects",
                "Publications",
              ],
            }),
            pdfUrl: "https://example.com/jane-smith-resume.pdf",
          },
        ],
      },
    ];

    for (const userData of userSeedData) {
      // Create user
      const newUser = await createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      console.log(`Created user: ${newUser.name}`);

      // Create user profile
      const userProfile = await createUserProfile({
        userId: newUser.id,
        ...userData.profile,
      });

      console.log(
        `Created profile for user: ${newUser.name} as ${userProfile.id}`
      );

      // Create education entries
      if (userData.education.length > 0) {
        const entries = userData.education.map((edu) => ({
          userId: newUser.id,
          ...edu,
        }));
        const data = await createEducationEntries(entries);
        console.log(
          `Added education for user: ${newUser.name}${data.map(
            (edu) => ` as ${edu.id}`
          )}`
        );
      }

      // Create work experiences
      if (userData.workExperiences.length > 0) {
        const entries = userData.workExperiences.map((exp) => ({
          userId: newUser.id,
          ...exp,
        }));
        const data = await createWorkExperience(entries);
        console.log(
          `Added work experiences for user: ${newUser.name} as ${data.map(
            (exp) => ` as ${exp.id}`
          )}`
        );
      }

      // Create skills
      if (userData.skills.length > 0) {
        const entries = userData.skills.map((exp) => ({
          userId: newUser.id,
          ...exp,
        }));
        const data = await createSkills(entries);
        console.log(
          `Added skills for user: ${newUser.name} as ${data.map(
            (exp) => ` as ${exp.id}`
          )}`
        );
      }

      // Create projects
      for (const project of userData.projects) {
        await createProject({
          userId: newUser.id,
          ...project,
        });
      }
      console.log(`Added projects for user: ${newUser.name}`);

      // Create resumes
      for (const resume of userData.resumes) {
        await createResume({
          userId: newUser.id,
          ...resume,
        });
      }
      console.log(`Added resumes for user: ${newUser.name}`);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
};

seedDatabase();
