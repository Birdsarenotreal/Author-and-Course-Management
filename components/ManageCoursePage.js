import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorsStore";
import * as courseActions from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuth);
    if (authors.length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChangeAuth);
  }, [authors.length]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      if (courseStore.getCourseBySlug(slug) !== undefined) {
        setCourse(courseStore.getCourseBySlug(slug));
      } else {
        props.history.push("/notfound");
      }
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug, props.history]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  function onChangeAuth() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (course.title.length > 100)
      _errors.title = "Title length should be shorter.";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";
    if (course.category.length > 100)
      _errors.category = "Category length should be shorter.";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
