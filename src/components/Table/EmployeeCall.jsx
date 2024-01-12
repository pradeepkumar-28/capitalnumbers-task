/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { TreeListTypes } from "devextreme-react/tree-list";
import React from "react";

const EmployeeCell = ({ data }) => {
  const { ID, Image, Full_Name } = data.data;

  // if (!ID) {
  //   return <span className="name">not assigned</span>;
  // }

  return (
    <React.Fragment>
      <div className="img">
        <img
          alt={`user-profile-${ID}`}
          src={Image}
          style={{ width: "50px", borderRadius: "50%" }}
        />
      </div>
      &nbsp;
      <span className="name">{Full_Name}</span>
    </React.Fragment>
  );
};

export default EmployeeCell;
