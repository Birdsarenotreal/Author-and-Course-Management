/* eslint-disable no-unused-expressions */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function AuthorList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.authors.map((author) => {
          return (
            <tr key={author.id}>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    props.courses.find((obj) => obj.authorId === author.id) ===
                    undefined
                      ? (props.deleteAuthor(author.id),
                        toast.success("Deletion successful.", {
                          autoClose: 3000,
                        }))
                      : toast.error(
                          "You cant delete an author that still has courses!",
                          { autoClose: false }
                        );
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/author/" + author.slug}>{author.name}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

AuthorList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AuthorList;
