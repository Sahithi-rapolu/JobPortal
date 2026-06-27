import DashboardLayout from "../../components/common/DashboardLayout";

function StudentDashboard() {
  return (
    <DashboardLayout role="student">

      <h3>Welcome Student 👋</h3>
      <p className="text-muted">
        Find jobs and track applications easily.
      </p>

      <div className="card p-3 shadow">
        Start exploring jobs from sidebar 🚀
      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;