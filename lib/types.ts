export interface Course {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  duration: number;
}

export interface CourseFormData {
  title: string;
  description: string;
  instructorName: string;
  duration: number;
} 