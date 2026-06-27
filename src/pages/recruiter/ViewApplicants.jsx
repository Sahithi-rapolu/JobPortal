import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

function ViewApplicants() {

  const applicants = [

    {
      id: 1,
      name: "Rahul Sharma",
      job: "Frontend Developer",
      email: "rahul@gmail.com"
    },

    {
      id: 2,
      name: "Priya Singh",
      job: "Backend Developer",
      email: "priya@gmail.com"
    },

    {
      id: 3,
      name: "Aman Kumar",
      job: "Data Analyst",
      email: "aman@gmail.com"
    }

  ];

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Applicants
        </h2>

        <table className="table table-striped">

          <thead className="table-primary">

            <tr>

              <th>Name</th>

              <th>Applied For</th>

              <th>Email</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {applicants.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>{item.job}</td>

                <td>{item.email}</td>

                <td>

                  <span className="badge bg-warning text-dark">
                    Under Review
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Footer />
    </>
  );
}

export default ViewApplicants;