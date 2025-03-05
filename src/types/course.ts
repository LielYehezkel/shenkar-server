// server/types/course.ts
export enum CourseStatus {
    NOT_MARKETING = 'NOT_MARKETING',
    IN_PROCESS = 'IN_PROCESS',
    PROBLEMATIC = 'PROBLEMATIC',
    OPENED = 'OPENED'
  }
  
  // שינינו את ההגדרה כך שלא תכלול _id
  export interface ICourse {
    name: string;
    startDate: string;
    postponed: number;
    registeredStudents: number;
    minStudents: number;
    maxStudents: number;
    status: CourseStatus;
    isMarketing?: boolean;
    dailyBudget?: number;
    spentBudget?: number;
    campaignBudget?: number;
    leads?: number;
    conversionRate?: number;
  }