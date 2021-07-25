import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainContents from "../components/templates/MainContents";
import SubContents from "../components/templates/SubContents";
import Draftcard from "../components/cards/Draftcard";
// import jobs from "../data/jobs";
import axios from "axios";
import { API } from "../components/api";

const drafts = () => {
  const [drafts, setDrafts] = useState([]);

  const getDrafts = () => {
    axios
      .get(`${API}/jobs?page=1&pageSize=5`)
      .then((response) => {
        const draftBatch = response.data.jobs;
        setDrafts(draftBatch);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getDrafts();
  }, []);

  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>Drafts</span>
          </div>
          {console.log(drafts)}
          {drafts.length
            ? drafts.map((job) => {
                return (
                  <Draftcard
                    title={job.name}
                    posted={job.created}
                    deadline={job.close_date}
                    link={`/jobs/${job.id}`}
                  ></Draftcard>
                );
              })
            : null}
          {}
        </MainContents>

        <SubContents>
          <Link href="/jobs/new_job">
            <a className="sub_btn btn btn-primary">Add New Job</a>
          </Link>
          drafts filter to be added here below
        </SubContents>
      </div>
    </div>
  );
};

export default drafts;
