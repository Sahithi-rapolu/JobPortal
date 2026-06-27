import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ role, children }) {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Section */}
      <div className="w-100">

        {/* Top Navbar */}
        <Navbar role={role} />

        {/* Page Content */}
        <div className="p-3">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;