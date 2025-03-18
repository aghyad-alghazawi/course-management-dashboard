"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

function MobileCourseRow({ course, onEdit, onDelete }: { 
  course: Course; 
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <AccordionItem value={course.id} className="border-b">
      <AccordionTrigger className="flex items-center justify-between py-4 px-4 hover:bg-accent/50 transition-colors">
        <span className="font-medium">{course.title}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Description:</span>
            <p className="mt-1">{course.description}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Instructor:</span>
            <p className="mt-1">{course.instructorName}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Duration:</span>
            <p className="mt-1">{course.duration} hours</p>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(course)}
              className="h-8 w-8"
              aria-label={`Edit ${course.title}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(course.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
              aria-label={`Delete ${course.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
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
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {courses.map((course) => (
            <MobileCourseRow
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Accordion>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-md border">
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
                <TableCell>{course.duration} hours</TableCell>
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
    </>
  );
} 