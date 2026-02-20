
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  icon: string;
  demandReason?: string;
  technologies?: string[];
  marketTrend?: { value: number; month?: string }[];
}
