import React from "react";
import Link from "next/link";
import MainContents from "../components/templates/MainContents";
import SubContents from "../components/templates/SubContents";
import Draftcard from "../components/cards/Draftcard";
import jobs from "../data/jobs";

const drafts = () => {
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

          {jobs.map((job) => {
            return (
              <Draftcard
                title={job.title}
                posted={job.created_at}
                deadline={job.close_date}
                link={`/jobs/${job.id}`}
              ></Draftcard>
            );
          })}
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
