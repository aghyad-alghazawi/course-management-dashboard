import { Course, CourseFormData } from "./types";
import { mockCourses } from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const api = {
  // Fetch all courses
  getCourses: async (): Promise<Course[]> => {
    await delay(300); // Simulate network delay
    return mockCourses;
  },

  // Add a new course
  addCourse: async (course: CourseFormData): Promise<Course> => {
    // await delay(500);
    const newCourse: Course = {
      ...course,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockCourses.push(newCourse);
    return newCourse;
  },

  // Update a course
  updateCourse: async (id: string, course: CourseFormData): Promise<Course> => {
    // await delay(500);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");
    
    mockCourses[index] = { ...mockCourses[index], ...course };
    return mockCourses[index];
  },

  // Delete a course
  deleteCourse: async (id: string): Promise<void> => {
    // await delay(500);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");
    
    mockCourses.splice(index, 1);
  },
};