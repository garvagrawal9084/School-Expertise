const TeacherCard = ({ teacher }) => {
  return (
    <div className="card">
      <h4>{teacher.userId?.name}</h4>
      <p>{teacher.bio}</p>
      <p>{teacher.specialization?.join(", ")}</p>
    </div>
  );
};

export default TeacherCard;