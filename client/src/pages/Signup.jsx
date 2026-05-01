import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    teacherRequest: false,
    message: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);

      if (form.avatar) {
        data.append("avatar", form.avatar);
      }

      if (form.teacherRequest) {
        data.append("teacherRequest", "true");
        data.append("message", form.message);
      }

      await API.post("/users/register", data);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] px-4">

      <div className="w-full max-w-md bg-white dark:bg-[#1e293b] rounded-xl shadow overflow-hidden">

        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-6 text-center">
          <h2 className="text-xl font-semibold">
            Join the Network
          </h2>
          <p className="text-sm mt-1 opacity-90">
            Create your educator profile and map your expertise.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6">

          {/* NAME */}
          <label className="text-xs text-gray-500">FULL NAME</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full border rounded-lg p-3 mt-1 mb-4"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* EMAIL */}
          <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
          <input
            type="email"
            required
            placeholder="educator@school.edu"
            className="w-full border rounded-lg p-3 mt-1 mb-4"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <label className="text-xs text-gray-500">PASSWORD</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full border rounded-lg p-3 mt-1 mb-1"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <p className="text-xs text-gray-400 mb-4">
            Must be at least 8 characters
          </p>

          {/* AVATAR */}
          <label className="text-xs text-gray-500">UPLOAD AVATAR</label>

          <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
            <input
              type="file"
              accept="image/*"
              id="avatarUpload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setForm({ ...form, avatar: file });

                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            <label htmlFor="avatarUpload" className="cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20 object-cover mx-auto rounded-full"
                />
              ) : (
                <>
                  <p className="text-indigo-600 font-medium">
                    Upload a file
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG up to 10MB
                  </p>
                </>
              )}
            </label>
          </div>

          {/* TEACHER CHECKBOX */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={form.teacherRequest}
              onChange={(e) =>
                setForm({ ...form, teacherRequest: e.target.checked })
              }
            />
            <span className="text-sm">Register as Teacher</span>
          </div>

          {/* MESSAGE */}
          {form.teacherRequest && (
            <textarea
              placeholder="Write a message for admin..."
              className="w-full border rounded-lg p-3 mb-4"
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {loading ? "Creating..." : "Signup →"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600">
              Login
            </Link>
          </p>

        </form>
      </div>

    </div>
  );
};

export default Signup;