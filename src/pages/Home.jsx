import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

export default function Home() {
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
      title: "Full Stack Developer",
      company: "Amazon",
      location: "Chennai",
      salary: "18 LPA",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Pune",
      salary: "10 LPA",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">
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