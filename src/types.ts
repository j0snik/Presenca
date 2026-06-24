export interface BudgetBreakdown {
  transport: number;
  lodging: number;
  food: number;
  localTransit: number;
}

export interface Campaign {
  id: string;
  patientName: string;
  patientAge: number;
  patientOrigin: string;
  hospitalName: string;
  procedureType: string;
  procedureDate: string;
  companionName: string;
  companionRelationship: string;
  budgetBreakdown: BudgetBreakdown;
  targetAmount: number;
  raisedAmount: number;
  story: string;
  status: 'active' | 'completed';
  createdAt: string;
  daysLeft: number;
  photoUrl?: string;
  thankYouMessage?: string;
}

export interface CaseSubmission {
  id: string;
  patientName: string;
  patientAge: number;
  companionName: string;
  companionRelationship: string;
  email: string;
  phone: string;
  hospitalName: string;
  procedureType: string;
  procedureDate: string;
  originCity: string;
  originState: string;
  story: string;
  budgetNeeds: {
    transport: boolean;
    lodging: boolean;
    food: boolean;
    localTransit: boolean;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  areasOfInterest: string[];
  availability: string;
  message: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
