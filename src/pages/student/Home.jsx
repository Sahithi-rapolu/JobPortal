import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import jobs from "../../data/jobs";
import JobCard from "../../components/common/JobCard";

function Home() {

  return (

    <>
      <Navbar />

      <section className="bg-primary text-white text-center py-5">

        <div className="container">

          <h1 className="display-4 fw-bold">

            Find Your Dream Job

          </h1>

          <p className="lead">

            5000+ Companies Hiring

          </p>

          <input
            className="form-control w-50 mx-auto mt-4"
            placeholder="Search Jobs..."
          />

        </div>

      </section>

      <div className="container mt-5">

        <h2 className="mb-4">

          Featured Jobs

        </h2>

        <div className="row">

          {jobs.map((job) => (

            <div
              className="col-lg-4 mb-4"
              key={job.id}
            >

              <JobCard job={job} />

            </div>

          ))}

        </div>

      </div>

      <Footer />

    </>

  );

}

export default Home;