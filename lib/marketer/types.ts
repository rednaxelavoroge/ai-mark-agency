export type MarketerProfileBrief = {
  businessName: string;
  businessDescription: string;
  website: string | null;
  niche: string | null;
};

export type NicheResearch = {
  summary: string;
  market_trends: string[];
  competitors: { name: string; strengths: string; weaknesses: string }[];
};

export type AudienceAnalysis = {
  segments: {
    name: string;
    description: string;
    pains: string[];
    desires: string[];
  }[];
};

export type Strategy = {
  positioning: string;
  pillars: string[];
  targeting_ideas: string[];
};

export type ContentPlanItem = {
  day: number;
  kind: "post" | "reel" | "story";
  topic: string;
  goal: string;
};

export type ContentPlan = {
  period_days: number;
  items: ContentPlanItem[];
};
