import DashboardLayout from "../../components/common/DashboardLayout";

function RecruiterDashboard() {
  return (
    <DashboardLayout role="recruiter">

      <h3>Welcome Recruiter 🏢</h3>
      <p className="text-muted">
        Manage your job postings and applicants.
      </p>

      <div className="card p-3 shadow">
        Use sidebar to manage jobs 🚀
      </div>

    </DashboardLayout>
  );
}

export default RecruiterDashboard;