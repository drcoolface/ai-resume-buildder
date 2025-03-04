"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  userProfiles,
  educationEntries,
  workExperiences,
  skills,
  projects,
} from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

// Define the types inferred from Drizzle schema
type UserProfile = InferInsertModel<typeof userProfiles>;
type EducationEntry = InferInsertModel<typeof educationEntries>;
type WorkExperience = InferInsertModel<typeof workExperiences>;
type Skill = InferInsertModel<typeof skills>;
type Project = InferInsertModel<typeof projects>;

type State = {
  step: number;
  profile: Partial<UserProfile>;
  education: EducationEntry[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
};

type Action =
  | { type: "STEP"; payload: number }
  | { type: "UPDATE_PROFILE"; payload: Partial<UserProfile> }
  | { type: "ADD_EDUCATION"; payload: EducationEntry }
  | { type: "REMOVE_EDUCATION"; payload: number }
  | { type: "ADD_WORK"; payload: WorkExperience }
  | { type: "REMOVE_WORK"; payload: number }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "REMOVE_SKILL"; payload: number }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "REMOVE_PROJECT"; payload: number };

const initialState: State = {
  step: 1,
  profile: {},
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
};

const ProfileContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function reducer(state: State, action: Action): State {
  const totalSteps = 5;
  let updatedState = state;

  switch (action.type) {
    case "STEP":
      updatedState = {
        ...state,
        step: Math.max(1, Math.min(action.payload, totalSteps)),
      };
      break;
    case "UPDATE_PROFILE":
      updatedState = {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
      break;
    case "ADD_EDUCATION":
      updatedState = {
        ...state,
        education: [...state.education, action.payload],
      };
      break;
    case "REMOVE_EDUCATION":
      updatedState = {
        ...state,
        education: state.education.filter(
          (_, index) => index !== action.payload
        ),
      };
      break;
    case "ADD_WORK":
      updatedState = {
        ...state,
        workExperience: [...state.workExperience, action.payload],
      };
      break;
    case "REMOVE_WORK":
      updatedState = {
        ...state,
        workExperience: state.workExperience.filter(
          (_, index) => index !== action.payload
        ),
      };
      break;
    case "ADD_SKILL":
      updatedState = { ...state, skills: [...state.skills, action.payload] };
      break;
    case "REMOVE_SKILL":
      updatedState = {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.payload),
      };
      break;
    case "ADD_PROJECT":
      updatedState = {
        ...state,
        projects: [...state.projects, action.payload],
      };
      break;
    case "REMOVE_PROJECT":
      updatedState = {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.payload),
      };
      break;
    default:
      return state;
  }
  return { ...updatedState };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
