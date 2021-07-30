import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainContents from "../components/templates/MainContents";
import SubContents from "../components/templates/SubContents";
import Draftcard from "../components/cards/Draftcard";
import Pagination from "../components/pagination/Pagination";
import { API } from "../components/api";

const drafts = ({ data, error, page }) => {
  const [drafts, setDrafts] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (data) {
      setDrafts(data.jobs);
      setSize(data.jobs.length);
    }
    if (error) {
      setErrors(error);
    }
  }, []);

  let nextUrl = `/drafts?page=${
    page < Math.ceil(data?.pager.total / data?.pager.pageSize)
      ? data?.pager?.page + 1
      : data?.pager?.page
  }`;
  let prevUrl = `/drafts?page=${
    data?.pager.page > 1 ? data?.pager?.page - 1 : 1
  }`;

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
          {drafts.length > 0 &&
            drafts.map((draft, index) => <Draftcard draft={draft} key={index} />)}
          <Pagination
            size={size}
            pager={data?.pager}
            nextUrl={nextUrl}
            prevUrl={prevUrl}
          />
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

export async function getServerSideProps({ query }) {
  let data = null;
  let error = null;
  let page = 1;

  if (query?.page) page = query?.page;

  try {
    const res = await fetch(
      `${API}/jobs?page=${page}&pageSize=5&fields=name,title,created,id`
    );
    data = await res.json();
  } catch (err) {
    error = JSON.stringify(err);
  }

  return {
    props: {
      error,
      data,
      page,
    },
  };
}

export default drafts;
