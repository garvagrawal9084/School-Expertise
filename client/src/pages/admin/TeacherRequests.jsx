import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";

const TeacherRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = () => {
    API.get("/admin/requests")
      .then((res) => setRequests(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      setLoadingId(id);
      await API.post(`/admin/approve/${id}`);
      toast.success("Approved");
      fetchRequests();
    } catch {
      toast.error("Failed");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoadingId(id);
      await API.post(`/admin/reject/${id}`);
      toast.error("Rejected");
      fetchRequests();
    } catch {
      toast.error("Failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">Teacher Requests</h2>
        <p className="text-gray-500 text-sm">
          Review and approve teacher applications
        </p>
      </div>

      {/* EMPTY STATE */}
      {requests.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500">
            No pending requests 🎉
          </p>
        </div>
      ) : (

        /* REQUEST LIST */
        <div className="grid md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >

              {/* USER INFO */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                  {req.userId.name[0]}
                </div>

                <div>
                  <p className="font-medium">
                    {req.userId.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {req.userId.email}
                  </p>
                </div>

                <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                  Pending
                </span>
              </div>

              {/* MESSAGE */}
              {req.message && (
                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {req.message}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => handleApprove(req._id)}
                  disabled={loadingId === req._id}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg"
                >
                  {loadingId === req._id
                    ? "Approving..."
                    : "Approve"}
                </button>

                <button
                  onClick={() => handleReject(req._id)}
                  disabled={loadingId === req._id}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                >
                  {loadingId === req._id
                    ? "Rejecting..."
                    : "Reject"}
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;