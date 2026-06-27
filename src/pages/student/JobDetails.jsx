import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import jobs from "../../data/jobs";

function JobDetails() {

  const { id } = useParams();

  const job = jobs.find(
    (item) => item.id === Number(id)
  );

  if (!job) {
    return <h2 className="text-center mt-5">Job Not Found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow p-5">

          <h2>{job.title}</h2>

          <h4 className="text-primary">
            {job.company}
          </h4>

          <hr />

          <p>
            <b>Location :</b> {job.location}
          </p>

          <p>
            <b>Experience :</b> {job.experience}
          </p>

          <p>
            <b>Job Type :</b> {job.type}
          </p>

          <p>
            <b>Salary :</b> {job.salary}
          </p>

          <p>
            {job.description}
          </p>

          <Link
            className="btn btn-success"
            to={`/apply/${job.id}`}
          >
            Apply Now
          </Link>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default JobDetails;