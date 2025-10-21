export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'other';
export type PersonCompetenceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type PersonCompetence = {
  competenceId: string;
  level: PersonCompetenceLevel;
  yearsOfExperience?: number;
};

export type WorkExperience = {
  id: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location?: string;
  technologies?: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  achievements?: string[];
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
  competences?: PersonCompetence[];
  workExperience?: WorkExperience[];
  education?: Education[];
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
