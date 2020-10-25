import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import authorStore from "../stores/authorsStore";
import { loadAuthors } from "../actions/authorActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    if (courses.length === 0) loadCourses();

    return () => {
      courseStore.removeChangeListener(onChange);
    }; // cleanup on unmount
  }, [courses.length]);

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuth);
    if (authors.length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChangeAuth);
  }, [authors.length]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  function onChangeAuth() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>

      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
