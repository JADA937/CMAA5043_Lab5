import { useMemo, useState } from "react";

// Lab 3: Gallery component (image left, details right, expandable description)
export default function Gallery({ project }) {
  const [expanded, setExpanded] = useState(false);

  const previewText = useMemo(() => {
    const full = project.description ?? "";
    const limit = 140;
    if (full.length <= limit) return full;
    return `${full.slice(0, limit).trim()}…`;
  }, [project.description]);

  const descriptionToShow = expanded ? project.description : previewText;

  return (
    <div className="galleryCard">
      <div className="galleryImageWrap">
        <img
          className="galleryImage"
          src={project.imageSrc}
          alt={project.title}
        />
      </div>

      <div className="galleryInfo">
        <h2 className="galleryTitle">{project.title}</h2>
        <p className="galleryMeta">
          <strong>Author:</strong> {project.author}
        </p>
        <p className="galleryMeta">
          <strong>Source:</strong>{" "}
          <a href={project.sourceHref} target="_blank" rel="noreferrer">
            {project.sourceLabel}
          </a>
        </p>

        <p className="galleryDesc">{descriptionToShow}</p>

        {project.description?.length > 140 ? (
          <button
            type="button"
            className="moreBtn"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Less" : "More"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

