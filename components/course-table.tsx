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
import { ArrowUpDown } from "lucide-react";

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
    <div className="rounded-md border shadow-sm" role="region" aria-label="Course list">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead 
              className="font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => onSort("title")}
              role="columnheader"
              aria-sort={sortField === "title" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
            >
              <div className="flex items-center gap-1">
                Title
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                {sortField === "title" && (
                  <span className="text-xs" aria-hidden="true">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead 
              className="font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => onSort("instructorName")}
              role="columnheader"
              aria-sort={sortField === "instructorName" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
            >
              <div className="flex items-center gap-1">
                Instructor
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                {sortField === "instructorName" && (
                  <span className="text-xs" aria-hidden="true">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead className="font-semibold">Duration</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow 
              key={course.id}
              className="transition-colors hover:bg-muted/50 cursor-pointer"
              role="row"
            >
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell className="max-w-[300px] truncate">{course.description}</TableCell>
              <TableCell>{course.instructorName}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(course)}
                    aria-label={`Edit ${course.title}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(course.id)}
                    aria-label={`Delete ${course.title}`}
                  >
                    Delete
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