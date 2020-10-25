import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import { toast } from "react-toastify";
import * as authorActions from "../actions/authorActions";
import authorStore from "../stores/authorsStore";
import courseStore from "../stores/courseStore";
import { loadAuthors } from "../actions/authorActions";
import { loadCourses } from "../actions/courseActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [courses, setCourses] = useState(courseStore.getCourses());

  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChangeCourses);
    if (courses.length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChangeCourses);
  }, [courses.length]);

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuth);
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (slug) {
      if (authorStore.getAuthorBySlug(slug) !== undefined) {
        console.log("object");
        setAuthor(authorStore.getAuthorBySlug(slug));
      } else {
        props.history.push("/notfound");
      }
    }
    return () => courseStore.removeChangeListener(onChangeAuth);
  }, [authors.length, props.match.params.slug, props.history]);

  function onChangeAuth() {
    setAuthors(authorStore.getAuthors());
  }
  function onChangeCourses() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    setAuthor({
      ...author,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!author.name) _errors.name = "Name is required";
    if (author.name.length > 100)
      _errors.name =
        "Name is too long. It should contain less than 100 characters.";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) return;
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved.");
    });
  }

  return (
    <>
      <h2>Manage Author</h2>
      <AuthorForm
        errors={errors}
        courses={courses}
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
