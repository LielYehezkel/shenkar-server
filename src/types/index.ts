// src/types/index.ts
export enum CourseStatus {
    NOT_MARKETING = 'NOT_MARKETING',
    IN_PROCESS = 'IN_PROCESS',
    PROBLEMATIC = 'PROBLEMATIC',
    OPENED = 'OPENED'
  }
  
  export interface Course {
    _id: string;
    name: string;
    startDate: string;
    postponed: number;
    registeredStudents: number;
    minStudents: number;
    maxStudents: number;
    status: CourseStatus;
  }
  
  export interface MarketingCourse extends Course {
    isMarketing: boolean;
    dailyBudget: number;
    spentBudget: number;
    campaignBudget: number;
    leads: number;
    conversionRate: number;
  }