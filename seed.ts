import { db } from "@/db";
import {
  users,
  userProfiles,
  educationEntries,
  workExperiences,
  skills,
  projects,
} from "@/db/schema";
import { hashPW } from "./lib/auth-utils";

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Create a user
    const user = {
      email: "john@example.com",
      password: await hashPW("password"),
    };
    const [newUser] = await db
      .insert(users)
      .values(user)
      .returning({ id: users.id, email: users.email });
    console.log("User created:", newUser);

    // Create a user profile
    await db.insert(userProfiles).values({
      userId: newUser.id,
      fullName: "John Doe",
      phoneNumber: "123-456-7890",
      addressOne: "123 Main St",
      email: newUser.email,
      linkedin: "https://linkedin.com/in/johndoe",
    });
    console.log("Creating user Profile for :", newUser.id);

    // Create education entry
    await db.insert(educationEntries).values({
      userId: newUser.id,
      institution: "XYZ University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2015",
      endDate: "2019",
    });
    console.log("Adding education info for :", newUser.id);

    // Create work experience entry
    await db.insert(workExperiences).values({
      userId: newUser.id,
      company: "Tech Corp",
      position: "Software Engineer",
      startDate: "2020",
      endDate: "Present",
      description: "Developing scalable web applications.",
    });

    await db.insert(workExperiences).values({
      userId: newUser.id,
      company: "Tech Corp2",
      position: "Software Engineer2",
      startDate: "2024",
      endDate: "Present",
      description: "Developing scalable web applications.",
    });
    console.log("Adding work experience info for :", newUser.id);

    // Create skills
    // Create skills
    await db
      .insert(skills)
      .values({
        name: "JavaScript",
        userId: newUser.id,
        proficiency: 1,
      })
      .returning({ id: skills.id });

    console.log("Adding Skills info for :", newUser.id);

    // Create projects
    await db.insert(projects).values({
      userId: newUser.id,
      title: "AI Resume Builder",
      description: "A smart resume generator powered by AI.",
      startDate: "2021",
      endDate: "2022",
      url: "https://example.com",
    });
    console.log("Adding projexts for :", newUser.id);

    // // Create generated resume entry
    // await db.insert(generatedResumes).values({
    //   userId: newUser.id,
    //   jobTitle: "Software Engineer",
    //   jobDescription: "Building scalable web applications.",
    //   resumeContent: JSON.stringify({ sections: ["Experience", "Education"] }),
    //   pdfUrl: "https://example.com/resume.pdf",
    // });

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
};

seedDatabase();
