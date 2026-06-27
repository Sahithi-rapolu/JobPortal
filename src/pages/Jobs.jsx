import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Hyderabad",
      salary: "12 LPA",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Microsoft",
      location: "Bangalore",
      salary: "15 LPA",
    },
    {
      id: 3,
      title: "Java Developer",
      company: "Infosys",
      location: "Pune",
      salary: "8 LPA",
    },
    {
      id: 4,
      title: "Python Developer",
      company: "TCS",
      location: "Chennai",
      salary: "9 LPA",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">Available Jobs</h2>

        <div className="row">

          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4 mb-4" key={job.id}>
              <JobCard job={job} />
            </div>
          ))}

        </div>

      </div>
    </>
  );
}