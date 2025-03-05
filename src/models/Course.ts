// server/src/models/Course.ts
import mongoose from 'mongoose';
import { CourseStatus } from '../types/course';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required']
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required']
  },
  postponed: {
    type: Number,
    default: 0
  },
  registeredStudents: {
    type: Number,
    default: 0
  },
  minStudents: {
    type: Number,
    required: [true, 'Minimum students is required']
  },
  maxStudents: {
    type: Number,
    required: [true, 'Maximum students is required']
  },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.NOT_MARKETING
  },
  isMarketing: {
    type: Boolean,
    default: false
  },
  dailyBudget: {
    type: Number,
    default: 0
  },
  spentBudget: {
    type: Number,
    default: 0
  },
  campaignBudget: {
    type: Number,
    default: 0
  },
  leads: {
    type: Number,
    default: 0
  },
  conversionRate: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);