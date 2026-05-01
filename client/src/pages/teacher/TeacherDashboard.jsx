import { useEffect, useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

const TeacherDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    bio: "",
    experience: "",
    specialization: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await API.get("/teacher/me");
      const data = res.data.data;

      setProfile(data);

      setForm({
        bio: data.bio || "",
        experience: data.experience || "",
        specialization: data.specialization?.join(", ") || "",
      });
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await API.get("/teacher/me/courses");
      setCourses(res.data.data || []);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    Promise.all([fetchProfile(), fetchCourses()]).finally(() =>
      setLoading(false),
    );
  }, []);

  // ================= UPDATE PROFILE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put("/teacher/me", {
        bio: form.bio,
        experience: Number(form.experience), // ✅ FIX
        specialization: form.specialization.split(",").map((s) => s.trim()),
      });

      toast.success("Profile updated");

      await fetchProfile(); // 🔥 refresh UI
    } catch {
      toast.error("Update failed");
    }
  };

  // ================= AVATAR UPLOAD =================
  const handleAvatarUpload = async () => {
    if (!avatarFile) return toast.error("Select an image");

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      await API.patch("/teacher/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Avatar updated");

      setAvatarFile(null);
      await fetchProfile(); // 🔥 refresh avatar
    } catch {
      toast.error("Avatar upload failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-8 mb-12">
        {/* AVATAR SECTION */}
        <div className="relative group">
          <img
            src={
              profile.avatar ||
              `https://ui-avatars.com/api/?name=${profile.name}&background=6366f1&color=fff`
            }
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />

          {/* HOVER OVERLAY */}
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition">
            <span className="text-white text-xs font-medium">Change</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
          </label>
        </div>

        {/* USER INFO */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{profile.name}</h1>

          <p className="text-gray-500 mt-1">{profile.email}</p>

          {/* ACTION BUTTON */}
          {avatarFile && (
            <button
              onClick={handleAvatarUpload}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
            >
              Save Avatar
            </button>
          )}
        </div>
      </div>

      {/* ================= PROFILE FORM ================= */}
      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow mb-10"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <textarea
          placeholder="Bio"
          className="w-full border p-2 rounded mb-3"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <input
          type="number"
          placeholder="Experience (years)"
          className="w-full border p-2 rounded mb-3"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <input
          type="text"
          placeholder="Specialization (comma separated)"
          className="w-full border p-2 rounded mb-4"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
        />

        <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700">
          Update Profile
        </button>
      </form>

      {/* ================= COURSES ================= */}
      <div>
        <h2 className="text-xl font-bold mb-4">My Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-500">No courses assigned</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {courses.map((c) => (
              <div
                key={c._id}
                className="border p-4 rounded-xl bg-gray-50 dark:bg-slate-900 hover:shadow"
              >
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-500">
                  {c.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
