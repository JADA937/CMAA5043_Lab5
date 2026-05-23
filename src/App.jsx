import { useMemo, useState } from "react";
import Course from "./course.js";
import Portfolio from "./Portfolio.jsx";
import Tutorials from "./Tutorials.jsx";
import TankGame from "./TankGame.jsx";
import "./App.css";

export default function App() {
  // Lab 3 / Lab 5: include tutorials + exercise pages
  const [tab, setTab] = useState("exercise1");

  const featuredCourses = useMemo(
    () => [
      {
        title: "Creative Prototyping",
        duration: "8 weeks",
        instructor: "Dr. (TBD)",
        classroom: "W4-205",
        schedule: "Mon 14:00–17:00",
        description:
          "Learn rapid prototyping workflows and turn ideas into testable experiences."
      },
      {
        title: "Interaction Design Fundamentals",
        duration: "6 weeks",
        instructor: "Prof. (TBD)",
        classroom: "W2-101",
        schedule: "Wed 10:00–12:00",
        description:
          "Design better interactions through structure, feedback, and usability thinking."
      }
    ],
    []
  );

  return (
    <div className="appShell">
      <div className="topBar">
        <div>
          <h1 className="appTitle">HKUST(GZ) Course Platform</h1>
          <p className="appSub">
            CMAA5043 — Labs 2–5 (portfolio + Lab 5 tank game / debugging)
          </p>
        </div>

        <div className="tabs">
          <button
            type="button"
            className={tab === "exercise1" ? "tab active" : "tab"}
            onClick={() => setTab("exercise1")}
          >
            Exercise 1
          </button>
          <button
            type="button"
            className={tab === "exercise2" ? "tab active" : "tab"}
            onClick={() => setTab("exercise2")}
          >
            Exercise 2
          </button>
          <button
            type="button"
            className={tab === "tutorials" ? "tab active" : "tab"}
            onClick={() => setTab("tutorials")}
          >
            Tutorials
          </button>
          {/* Lab 5: tab for tank canvas exercise (boundaries + new features) */}
          <button
            type="button"
            className={tab === "lab5" ? "tab active" : "tab"}
            onClick={() => setTab("lab5")}
          >
            Lab 5 Tank
          </button>
        </div>
      </div>

      {tab === "exercise1" ? (
        <div className="page">
          <div className="panel">
            <h2>System Notices</h2>
            <p>
              Course selection reminder: Please finalize your course list before
              Friday 18:00.
            </p>
            <p>Student orientation date: 2026-03-25 (Wed) 09:30.</p>
          </div>

          <div className="panel">
            <h2>Featured Courses</h2>
            <p>
              Below are featured courses for this term. Each course item shows
              details and supports student selection count.
            </p>

            <div className="coursesWrap">
              {featuredCourses.map((c) => (
                <Course
                  key={c.title}
                  title={c.title}
                  duration={c.duration}
                  instructor={c.instructor}
                  classroom={c.classroom}
                  schedule={c.schedule}
                  description={c.description}
                />
              ))}
            </div>
          </div>
        </div>
      ) : tab === "exercise2" ? (
        <div className="page">
          <div className="panel">
            <h2>Portfolio (React Version)</h2>
            <p>
              Lab 3: enhanced portfolio with Gallery + Dark Mode.
            </p>
          </div>
          <Portfolio />
        </div>
      ) : tab === "lab5" ? (
        <div className="page">
          <TankGame />
        </div>
      ) : (
        <div className="page">
          <Tutorials />
        </div>
      )}
    </div>
  );
}

