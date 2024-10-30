export interface EgressoDataResponse {
  id: string;
  name: string;
  email: string;
  year_of_entry: string;
  year_of_conclusion: string | null;
  matricula: string;
  course: string;
  participatedInTheResearch: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface EgressoFormData {
  name: string;
  email: string;
  year_of_entry: string;
  year_of_conclusion: string;
  matricula: string;
  course: string;
}
