import { useState } from "react";

export default function Course({
  title,
  duration,
  instructor,
  classroom,
  schedule,
  description
}) {
  const [students, setStudents] = useState(0);

  function decrease() {
    setStudents((n) => Math.max(0, n - 1));
  }

  function increase() {
    setStudents((n) => n + 1);
  }

  return (
    <div className="courseCard">
      <h2 className="courseTitle">{title}</h2>
      <p className="courseMeta">
        <strong>Duration:</strong> {duration}
      </p>
      <p className="courseMeta">
        <strong>Instructor:</strong> {instructor}
      </p>
      <p className="courseMeta">
        <strong>Classroom:</strong> {classroom}
      </p>
      <p className="courseMeta">
        <strong>Schedule:</strong> {schedule}
      </p>
      <p className="courseDesc">{description}</p>

      <div className="courseControls">
        <button type="button" className="btn" onClick={decrease}>
          -
        </button>
        <button type="button" className="btn" onClick={increase}>
          +
        </button>
      </div>

      <p className="courseStudents">
        There are <strong>{students}</strong> students choosing the course.
      </p>
    </div>
  );
}

