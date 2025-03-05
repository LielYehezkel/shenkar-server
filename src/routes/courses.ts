// server/src/routes/courses.ts
import { Router, Request, Response, RequestHandler, NextFunction, ErrorRequestHandler } from 'express';
import Course from '../models/Course';
import { ICourse, CourseStatus } from '../types/course'; // הוספנו את CourseStatus לייבוא

const router = Router();

interface ParamsWithId {
  id: string;
}

// Get all courses
const getAllCourses: RequestHandler = async (_req, res) => {
  try {
    console.log('Fetching all courses');
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
};

// Get marketing courses
const getMarketingCourses: RequestHandler = async (_req, res) => {
  try {
    console.log('Fetching marketing courses');
    // שינוי: מביא את כל הקורסים במקום רק אלו עם isMarketing=true
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching marketing courses:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
};

// Add new course
const addCourse: RequestHandler = async (req, res) => {
  try {
    console.log('Received new course data:', req.body);
    
    // הוספת שדות ברירת מחדל
    const courseData = {
      ...req.body,
      isMarketing: true, // תמיד מוגדר כקורס שיווקי
      leads: req.body.leads || 0,
      spentBudget: req.body.spentBudget || 0,
      dailyBudget: req.body.dailyBudget || 0,
      campaignBudget: req.body.campaignBudget || 0,
      conversionRate: 0
    };

    const course = new Course(courseData);
    console.log('Created course instance:', course);

    const newCourse = await course.save();
    console.log('Course saved successfully:', newCourse);

    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error saving course:', error);
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Failed to save course' 
    });
  }
};

// Update course
const updateCourse: RequestHandler<ParamsWithId> = async (req, res) => {
  try {
    console.log(`Updating course ${req.params.id} with data:`, req.body);
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body as Partial<ICourse>,
      { new: true }
    );

    if (!updatedCourse) {
      console.log(`Course ${req.params.id} not found`);
      return res.status(404).json({ message: 'Course not found' });
    }

    console.log('Course updated successfully:', updatedCourse);
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Failed to update course' 
    });
  }
};

// Delete course
const deleteCourse: RequestHandler<ParamsWithId> = async (req, res) => {
  try {
    console.log(`Deleting course ${req.params.id}`);
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      console.log(`Course ${req.params.id} not found`);
      return res.status(404).json({ message: 'Course not found' });
    }

    console.log('Course deleted successfully');
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to delete course' 
    });
  }
};

// Routes
router.get('/', getAllCourses);
router.get('/marketing', getMarketingCourses);
router.post('/', addCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);

// Error handler middleware
const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: err.message || 'An unknown error occurred' 
  });
};

router.use(errorHandler);

export default router;