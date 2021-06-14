import React from "react";
import Link from "next/link";
import MainContents from "../components/templates/MainContents";
import SubContents from "../components/templates/SubContents";
import Draftcard from "../components/cards/Draftcard";

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
          <Draftcard
            title={"Job one in the drafts"}
            posted={"2 days ago"}
            deadline={"In 28 days"}
            link={"/"}
          ></Draftcard>
          <Draftcard
            title={"Job two in the drafts"}
            posted={"2 days ago"}
            deadline={"In 28 days"}
            link={"/"}
          ></Draftcard>
          <Draftcard
            title={"Job three in the drafts"}
            posted={"2 days ago"}
            deadline={"In 28 days"}
            link={"/"}
          ></Draftcard>
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
