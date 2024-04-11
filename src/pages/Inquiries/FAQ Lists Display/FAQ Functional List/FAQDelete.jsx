import React, { useState } from "react";
import Inquiries from "../FAQ_data";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Fragment } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import useCustomModal from "../../../../hooks/useCustomModal";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

function FAQDelete() {
  const [selectedId, setSelectedID] = useState();
  const [faqId, setFaqId] = useState();
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();

  const handleDeleteFAQ = async () => {
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/delete`,
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you are sending JSON data
      },
      body: JSON.stringify({
        faqId: selectedId,
      }),
    });

    if (res.message === "FAQ deleted successfully") {
      handleCloseModal();
      showSnackbar("Blog Deleted Successfully", "success");
      window.location.reload();
    } else {
      showSnackbar("Delete Unsuccessful", "error");
    }
  };

  return (
    <>
      <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="w-full m-0">
              <center>
                <h1 className="text-3xl font-bold mb-2">
                  Are you sure you want to delete?
                </h1>
                <h3 className="text-lg">
                  The content will be permanently deleted from this section
                </h3>
                <div className="flex flex-row">
                  <Button
                    sx={{
                      marginTop: "20px",
                      border: "1px solid #5C9FEF",
                      width: "50%",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#5C9FEF",
                      "&:hover": {
                        background: "#5C9FEF",
                        color: "#fff",
                      },
                    }}
                    onClick={handleCloseModal}
                    // disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      background: "#EB5858",
                      border: "1px solid #EB5858",
                      padding: "10px 20px",
                      width: "50%",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "#E20000",
                      },
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      handleDeleteFAQ();
                    }}
                    // disabled={isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </center>
            </div>
          </Fragment>
        }
      />
      <Fragment>
        <Sidebar />
        <div className="flex flex-col items-center container m-10 bg-darkWhite">
          <div className="flex items-end justify-end w-full">
            <div className="flex items-center justify-end mx-12 mb-8">
              <Link to="/inquiries">
                <button className="bg-primary rounded-lg text-white px-4 py-1">
                  Done
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center text-5xl font-bold text-primary justify-center w-full">
            Frequently Asked Question
            <SearchBar />
          </div>
          <div className="flex flex-col items-center">
            {Inquiries.map((item) => (
              // card design
              <div
                className="flex w-[80%] flex-row items-start my-7 rounded bg-darkWhite "
                key={item.id}
              >
                {/* content layout */}
                <div className="flex flex-col grow">
                  <h1 className="font-bold mb-2">{item.title}</h1>
                  <p>{item.inquiry}</p>
                </div>
                <Stack
                  direction="row"
                  alignItems="center"
                  margin={"0 20px"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedID(item.id);
                    handleOpenModal();
                  }}
                >
                  <IconButton
                    aria-label="Edit"
                    size="large"
                    style={{
                      backgroundColor: "#EB5858",
                      color: "#fff",
                      borderRadius: "15px",
                    }}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </Stack>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default FAQDelete;
