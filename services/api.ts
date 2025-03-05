// src/services/api.ts
import axios from 'axios';
import { Course, MarketingCourse } from '../src/types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  getCourses: () => 
    axios.get<Course[]>(`${API_BASE_URL}/courses`),

  getMarketingCourses: () => 
    axios.get<MarketingCourse[]>(`${API_BASE_URL}/courses/marketing`),

  addCourse: (course: Partial<Course | MarketingCourse>) => 
    axios.post<Course | MarketingCourse>(`${API_BASE_URL}/courses`, course),

  updateCourse: (id: string, course: Partial<Course | MarketingCourse>) => 
    axios.patch<Course | MarketingCourse>(`${API_BASE_URL}/courses/${id}`, course),

  deleteCourse: (id: string) => 
    axios.delete(`${API_BASE_URL}/courses/${id}`)
};