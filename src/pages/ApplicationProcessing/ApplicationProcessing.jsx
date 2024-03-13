import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import Back from "../../components/Back/Back";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Dropdown from "../../components/Dropdowmn/Dropdown";
import styles from "./ApplicationProcessing.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CustomModal from "../../components/CustomModal/CustomModal";
import ApplicationProcessingModal from "./ApplicationProcessingModal";
import ApplicationProcessingModalContent from "./ApplicationProcessingModalContent";
import ApplicationProcessingList from "./ApplicationProcessingList";
import axios from "axios";

import useHttp from "../../hooks/http-hook";
import Sidebar from "../../components/Sidebar/Sidebar";

const ApplicationProcessing = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [applications, setApplications] = useState([]);
  const [appDocs, setAppDocs] = useState(null);
  const { sendRequest } = useHttp();
  const location = useLocation(); // Get current location
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/application`,
      });
      setApplications(res);
    };
    loadData();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const appId = searchParams.get("appId");

    if (appId) {
      const fetchApplicationDetails = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_DOMAIN}/application/get/${appId}`
          );
          console.log("Application Details:", res.data[0]); // Log the fetched application details
          setAppDocs(res.data[0]);
          setModalType(1);
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      };
      fetchApplicationDetails();
    }
  }, [location.search]);

  const documentHandler = (type, application) => {
    setOpenModal(true);
    setModalType(type);
    setAppDocs(application);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="container">
        <div onClick={() => navigate(-1)}>
          <Back />
        </div>

        <div className={`${styles["title"]}`}>
          <h6 className={`${styles["application-processing-title"]}`}>
            Membership Application
          </h6>
        </div>

        {/* <div className={`${styles['filters']}`}> */}
        {/* <div className={`${styles['section_1']}`}>
                        <Dropdown />
                        <Dropdown />
                    </div> */}

        {/* <div>
                        <div>
                            <TextField
                                placeholder="Search"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    height: '35px',
                                    // width: '397px',
                                    '& input': {
                                        padding: '6px 0 6px 0', // Adjust the padding if needed
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                    },
                                }}
                            />
                        </div>
                    </div> */}
        {/* </div> */}

        <div className={`${styles["application-processing-table"]}`}>
          <table width={"100%"}>
            <thead>
              <tr className={`${styles["table-heading"]}`}>
                <th>Application ID</th>
                <th>Name of Institution</th>
                <th>Address</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={`${styles["table-body"]}`}>
              {applications?.map((app, index) => (
                <tr className={`${styles["table-row"]}`} key={index}>
                  <ApplicationProcessingList
                    application={app}
                    onOpenModal={documentHandler}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openModal && appDocs && (
        <ApplicationProcessingModal open={openModal} handleClose={handleClose}>
          <ApplicationProcessingModalContent
            appDocs={appDocs}
            type={modalType}
          />
        </ApplicationProcessingModal>
      )}
    </Fragment>
  );
};

export default ApplicationProcessing;
