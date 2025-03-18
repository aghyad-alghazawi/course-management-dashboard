"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  sortField: "title" | "instructorName" | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (field: "title" | "instructorName") => void;
}

export function CourseTable({ 
  courses, 
  onEdit, 
  onDelete, 
  sortField, 
  sortDirection,
  onSort 
}: CourseTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("title")}
            >
              <div className="flex items-center gap-2">
                Title
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "title" && (
                  <span className="text-xs">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("instructorName")}
            >
              <div className="flex items-center gap-2">
                Instructor
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "instructorName" && (
                  <span className="text-xs">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.instructorName}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(course)}
                    className="h-8 w-8"
                    aria-label={`Edit ${course.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(course.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    aria-label={`Delete ${course.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 