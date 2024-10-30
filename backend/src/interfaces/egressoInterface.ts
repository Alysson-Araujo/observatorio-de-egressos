interface Egresso {
  name: string;
  email: string;
  year_of_entry: string;
  course: string;
  matricula: string;
}

interface EgressoRequest {
  name: string;
  email: string;
  year_of_entry: string;
  year_of_conclusion: string;
  matricula: string;
  course: string;
}

export {Egresso, EgressoRequest}