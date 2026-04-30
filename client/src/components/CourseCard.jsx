const CourseCard = ({ course, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseCard;