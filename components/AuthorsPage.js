import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorsStore";
import AuthorList from "./AuthorsList";
import { Link } from "react-router-dom";
import { loadCourses } from "../actions/courseActions";
import { loadAuthors, deleteAuthor } from "../actions/authorActions";

function AuthorsPage() {
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
      <h2>Authors</h2>
      <Link className="btn btn-primary" to="/author">
        Add Author
      </Link>
      <AuthorList
        courses={courses}
        authors={authors}
        deleteAuthor={deleteAuthor}
      />
    </>
  );
}

export default AuthorsPage;
