export interface TrainingModule {
  id: number;
  title: string;
  category: 'Leads' | 'Bookings' | 'Quotes' | 'Jobs';
  duration: string;
  accentColor: 'navy' | 'gold';
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string; // Optional real video URL
}

// Import local video assets
import newLeadVideo from '../assets/video/new lead.mp4';
import noAnswerVideo from '../assets/video/No Answer Call Pipeline - Automation .mp4';
import notReadyVideo from '../assets/video/Not Ready Yet  Pipeline - Automation Sense .mp4';
import unqualifiedVideo from '../assets/video/Unqualified Stage .mp4';
import callBookedVideo from '../assets/video/call book call no show.mp4';
import siteVisitVideo from '../assets/video/Site Visit Booked Stage .mp4';
import quoteSenTFollowup from '../assets/video/quotesentfollowup.mp4';
import quoteWon from '../assets/video/quotewon.mp4';
import jobInProgress from "../assets/video/Job In progress _ Job Completed .mp4";

export const trainingModules: TrainingModule[] = [
  {
    id: 1,
    title: "New Lead",
    category: "Leads",
    duration: "1m 55s",
    accentColor: "navy",
    iconName: "UserPlus",
    difficulty: "Beginner",
    videoUrl: newLeadVideo
  },
  {
    id: 2,
    title: "No Answer",
    category: "Leads",
    duration: "2m 7s",
    accentColor: "gold",
    iconName: "PhoneOff",
    difficulty: "Beginner",
    videoUrl: noAnswerVideo
  },
  {
    id: 3,
    title: "Not Ready Yet",
    category: "Leads",
    duration: "1m 44s",
    accentColor: "navy",
    iconName: "Clock",
    difficulty: "Intermediate",
    videoUrl: notReadyVideo
  },
  {
    id: 4,
    title: "Call Booked - Call No Show",
    category: "Bookings",
    duration: "3m 39s",
    accentColor: "gold",
    iconName: "CalendarCheck",
    difficulty: "Beginner",
    videoUrl: callBookedVideo
  },

  {
    id: 5,
    title: "Unqualified",
    category: "Leads",
    duration: "1m 10s",
    accentColor: "gold",
    iconName: "UserMinus",
    difficulty: "Intermediate",
    videoUrl: unqualifiedVideo
  },
  {
    id: 6,
    title: "Site Visit Booked",
    category: "Bookings",
    duration: "1m 39s",
    accentColor: "navy",
    iconName: "MapPin",
    difficulty: "Intermediate",
    videoUrl: siteVisitVideo
  },
  {
    id: 7,
    title: "Quote Sent - Quote Lost -Quote FollowUp",
    category: "Quotes",
    duration: "3m 28s",
    accentColor: "gold",
    iconName: "Send",
    difficulty: "Advanced",
    videoUrl: quoteSenTFollowup
  },

  {
    id: 8,
    title: "Quote Won",
    category: "Quotes",
    duration: "0m 50s",
    accentColor: "gold",
    iconName: "Award",
    difficulty: "Intermediate",
    videoUrl: quoteWon
  },

  {
    id: 9,
    title: "Job In Progress - Job Completed",
    category: "Jobs",
    duration: "1m 27s",
    accentColor: "gold",
    iconName: "Wrench",
    difficulty: "Advanced",
    videoUrl: jobInProgress
  }
];

