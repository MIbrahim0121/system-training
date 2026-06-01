export interface TrainingModule {
  id: number;
  title: string;
  category: 'Leads' | 'Bookings' | 'Quotes' | 'Jobs';
  description: string;
  duration: string;
  accentColor: 'navy' | 'gold';
  iconName: string;
  objectives: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string; // Optional real video URL
}

export const trainingModules: TrainingModule[] = [
  {
    id: 1,
    title: "New Lead",
    category: "Leads",
    description: "Learn how to ingest, validate, and respond to fresh inbound inquiries within the critical 5-minute window.",
    duration: "4m 45s",
    accentColor: "navy",
    iconName: "UserPlus",
    objectives: [
      "Identify lead source channels (social, organic, paid)",
      "Verify email and phone records automatically",
      "Execute the 5-minute fast-response outreach protocol"
    ],
    difficulty: "Beginner",
    videoUrl: "https://youtu.be/uMI5cNeHTOc?si=EBZb3Q4qJxZaywKt"
  },
  {
    id: 2,
    title: "No Answer",
    category: "Leads",
    description: "Master the multi-channel voicemail, SMS, and email follow-up sequence when a lead does not answer the initial call.",
    duration: "5m 12s",
    accentColor: "gold",
    iconName: "PhoneOff",
    objectives: [
      "Leave a high-converting 20-second voicemail",
      "Send the automated 'no-answer' SMS template",
      "Schedule follow-up touchpoint in CRM"
    ],
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "Not Ready Yet",
    category: "Leads",
    description: "Set up long-term lead nurturing campaigns and educational touchpoints for prospects requesting later contact.",
    duration: "6m 30s",
    accentColor: "navy",
    iconName: "Clock",
    objectives: [
      "Categorize lead temperature and timeline",
      "Enroll prospects into the monthly newsletter drip",
      "Set quarterly follow-up reminders in CRM"
    ],
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Call Booked",
    category: "Bookings",
    description: "Prepare for discovery calls by conducting initial pre-call research and organizing qualification agendas.",
    duration: "7m 15s",
    accentColor: "gold",
    iconName: "CalendarCheck",
    objectives: [
      "Audit prospect website and social presence",
      "Send appointment confirmation and meeting agenda",
      "Log key pain points in lead card before the call"
    ],
    difficulty: "Beginner"
  },
  {
    id: 5,
    title: "Call No Show",
    category: "Bookings",
    description: "Execute the recovery protocol for missed discovery appointments to salvage the opportunity.",
    duration: "3m 50s",
    accentColor: "navy",
    iconName: "UserX",
    objectives: [
      "Wait 10 minutes before triggering recovery flow",
      "Send 'Sorry we missed you' email with booking link",
      "Log the attempt and reschedule priority"
    ],
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "Unqualified",
    category: "Leads",
    description: "Learn how to politely offramp unqualified leads while maintaining relationship equity and referral possibilities.",
    duration: "4m 10s",
    accentColor: "gold",
    iconName: "UserMinus",
    objectives: [
      "Evaluate client fit using BANT parameters",
      "Deliver the standard 'not-a-fit' script professionally",
      "Recommend alternative providers or resources"
    ],
    difficulty: "Intermediate"
  },
  {
    id: 7,
    title: "Site Visit Booked",
    category: "Bookings",
    description: "Coordinate on-site inspection logistics, safety checklists, and customer expectations for the site walkthrough.",
    duration: "8m 05s",
    accentColor: "navy",
    iconName: "MapPin",
    objectives: [
      "Confirm site access details and safety equipment",
      "Prepare site-survey documents and checklists",
      "Set visual markers and customer expectations"
    ],
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "Quote Sent",
    category: "Quotes",
    description: "Build premium digital quotes, itemize scopes of work, and present pricing in a professional, clear format.",
    duration: "9m 22s",
    accentColor: "gold",
    iconName: "Send",
    objectives: [
      "Structure multi-tier proposal pricing",
      "Outline project exclusions and timelines clearly",
      "Send quote via CRM with active tracking enabled"
    ],
    difficulty: "Advanced"
  },
  {
    id: 9,
    title: "Quote Followup",
    category: "Quotes",
    description: "Track prospect interaction with the proposal and execute timely, value-driven follow-ups to close the deal.",
    duration: "6m 15s",
    accentColor: "navy",
    iconName: "RotateCcw",
    objectives: [
      "Monitor CRM email open/view telemetry",
      "Address common pricing objections",
      "Offer limited-time incentive or resource schedule"
    ],
    difficulty: "Intermediate"
  },
  {
    id: 10,
    title: "Quote Won",
    category: "Quotes",
    description: "Transition a won quote into an active client project by initiating contracts, invoices, and handoff procedures.",
    duration: "5m 45s",
    accentColor: "gold",
    iconName: "Award",
    objectives: [
      "Generate and countersign the project agreement",
      "Collect deposit invoice via payment gateway",
      "Create client folder and kickoff documentation"
    ],
    difficulty: "Intermediate"
  },
  {
    id: 11,
    title: "Quote Lost",
    category: "Quotes",
    description: "Conduct lost-deal analysis to identify pricing or scoping mismatches and request feedback for team growth.",
    duration: "4m 30s",
    accentColor: "navy",
    iconName: "TrendingDown",
    objectives: [
      "Send brief exit feedback survey to prospect",
      "Log primary loss reasons (price, speed, scope)",
      "Conduct internal retrospective review"
    ],
    difficulty: "Beginner"
  },
  {
    id: 12,
    title: "Job In Progress",
    category: "Jobs",
    description: "Manage ongoing production stages, coordinate subcontractor schedules, and maintain client status communications.",
    duration: "10m 14s",
    accentColor: "gold",
    iconName: "Wrench",
    objectives: [
      "Monitor milestones against project schedule",
      "Send weekly progress reports to client",
      "Document scope changes using change-order forms"
    ],
    difficulty: "Advanced"
  },
  {
    id: 13,
    title: "Job Completed",
    category: "Jobs",
    description: "Conduct final inspections, complete client sign-offs, collect final invoices, and request positive reviews.",
    duration: "5m 55s",
    accentColor: "navy",
    iconName: "Trophy",
    objectives: [
      "Complete punch-list item validation with client",
      "Send and collect the final balance invoice",
      "Request reviews on Google and trust platforms"
    ],
    difficulty: "Intermediate"
  }
];
