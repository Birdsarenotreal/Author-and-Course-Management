import React from "react";
import TextInput from "./common/TextInput";

function AuthorForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="name"
        label="Name"
        onChange={props.onChange}
        name="name"
        value={props.author.name}
        error={props.errors.name}
      />
      <div className="form-group">
        <label htmlFor="courses">Courses by author.</label>
        <div>
          <select
            id="courses"
            name="courses"
            onChange={props.onChange}
            className="form-control"
          >
            <option value="" selected disabled hidden>
              See courses.
            </option>
            {props.courses
              .filter((item) => item.authorId === props.author.id)
              .map((obj) => (
                <option key={obj.id}>{obj.title}</option>
              ))}
          </select>
        </div>
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

export default AuthorForm;
