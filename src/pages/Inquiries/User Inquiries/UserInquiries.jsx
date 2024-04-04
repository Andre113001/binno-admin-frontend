import React, { Fragment } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Back from "../../../components/Back/Back";
import UserInquiries from "./UserInquiries_data.jsx";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

function UserInquiries() {
  return (
    <>
      <Fragment>
        <Sidebar />
        <div className="flex container flex-col m-10 bg-darkWhite">
          <div className="flex justify-end">
            <Back />
          </div>
          <div className="flex flex-col items-center text-5xl font-bold text-primary justify-center w-[100%] ">
            Frequently Asked Question
          </div>
          {UserInquiries.map((item) => (
            <div className="flex flex-col items-center">
              <div
                className="flex w-[80%] flex-col my-7 rounded bg-darkWhite"
                key={item.id}
              >
                <h1>{item.email}</h1>
                <h1 className="font-bold">{item.title}</h1>
                <div className="flex justify-end items-center m-2">
                  <button className="bg-secondary color-white p-2">
                    <EmailRoundedIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    </>
  );
}

export default UserInquiries;
