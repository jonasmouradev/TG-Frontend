import { DateTime } from 'luxon';

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'other';
export type PersonCompetenceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum DegreeType {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  TECHNICAL = 'TECHNICAL',
  ASSOCIATE = 'ASSOCIATE',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE',
  POSTGRADUATE = 'POSTGRADUATE',
  MBA = 'MBA',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER',
}

export type PersonCompetence = {
  id: string;
  person_id: string;
  competence_id: string;
  proficiency_level: ProficiencyLevel;
  years_of_experience: number;
  description: string;
  source_formation_id: string;
  created_at: Date;
  updated_at: Date;
};

export type WorkExperience = {
  personId: string;
  companyName: string;
  position: string;
  description: string | null;
  startDate: DateTime;
  endDate: DateTime | null;
  isCurrent: boolean;
  location: string | null;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Education = {
  id: string;
  personId: string;
  institutionName: string;
  degree: DegreeType;
  fieldOfStudy: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  grade: number | null;
  location: string | null;
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: Date | null;
};

export type Person = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  profilePicture?: string;
  bio?: string;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioUrl?: string;
  experiences: WorkExperience[];
  educations: Education[];
  competences: PersonCompetence[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePersonDto = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: Gender;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  profilePicture?: string;
  bio?: string;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioUrl?: string;
  userId?: string;
};

export type UpdatePersonDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: Gender;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  profilePicture?: string;
  bio?: string;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioUrl?: string;
};

export type PersonFilters = {
  firstName?: string;
  lastName?: string;
  email?: string;
  competences?: string;
  location?: string;
  page?: number;
  limit?: number;
};
