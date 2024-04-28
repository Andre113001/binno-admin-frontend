import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useHttp } from '../../../hooks/http-hook';

function UserInquiries() {
  const navigate = useNavigate();
  const [userInquiries, setUserInquiries] = useState([]);
  const { sendRequest } = useHttp(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/uaq/fetch`
        });

        if (!response) {
          throw new Error('Failed to fetch data');
        }

        const data = await response;
        console.log("data: ", data);
        setUserInquiries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function cancelBtn() {
    navigate(-1);
  }
  return (
    <>
      <Fragment>
        <Sidebar />
        <div className="flex container w-full justify-center flex-col bg-darkWhite">
          <div className="flex flex-col my-5 text-5xl font-bold text-primary justify-center">
            Frequently Asked Question
          </div>
          {userInquiries.map((item) => (
            <div className="flex flex-col items-center justify-center border">
              <div
                className="flex w-[95%] flex-row my-7 rounded justify-center bg-darkWhite"
                key={item.uaq_id}
              >
                <div className="flex grow flex-col justify-center">
                  <h1>{item.uaq_email}</h1>
                  <h1 className="font-bold">{item.uaq_content}</h1>
                </div>
                <div className="flex items-center m-2">
                  <IconButton
                    aria-label="Email"
                    size="medium"
                    sx={{
                      color: "white",
                      backgroundColor: "#5C9FEF",
                      "&:hover": {
                        backgroundColor: "#3F8AE0", // Change background color on hover
                        cursor: "pointer", // Change cursor to pointer on hover
                      },
                      borderRadius: "15px",
                    }}
                  >

<a href={`mailto:${item.uaq_email}`}>
                    <EmailRoundedIcon fontSize="medium" />
                    </a>
                  </IconButton>
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
