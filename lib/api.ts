import { Course, CourseFormData } from "./types";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
const API_BASE_URL = "https://api.techacademy.com";

export const api = {
  // Fetch all courses
  getCourses: async (): Promise<Course[]> => {
    await delay(500); // Simulate network delay
    return mockCourses;
  },

  // Add a new course
  addCourse: async (course: CourseFormData): Promise<Course> => {
    await delay(500);
    const newCourse: Course = {
      ...course,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockCourses.push(newCourse);
    return newCourse;
  },

  // Update a course
  updateCourse: async (id: string, course: CourseFormData): Promise<Course> => {
    await delay(500);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");
    
    mockCourses[index] = { ...mockCourses[index], ...course };
    return mockCourses[index];
  },

  // Delete a course
  deleteCourse: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");
    
    mockCourses.splice(index, 1);
  },
};

// Mock data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming with JavaScript",
    instructorName: "John Doe",
    duration: "8 weeks",
  },
  {
    id: "2",
    title: "Advanced React Development",
    description: "Master React with advanced patterns and best practices",
    instructorName: "Jane Smith",
    duration: "12 weeks",
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Comprehensive guide to data structures and algorithms",
    instructorName: "Mike Johnson",
    duration: "10 weeks",
  },
]; 