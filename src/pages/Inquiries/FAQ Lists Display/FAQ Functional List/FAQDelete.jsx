import React, { useState, useEffect } from "react";
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
import { useHttp } from '../../../../hooks/http-hook';

function FAQDelete() {
  const [selectedId, setSelectedID] = useState();
  const [inquiries, setInquiries] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const { sendRequest } = useHttp(); 

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/fetch`
        });

        if (!response) {
          throw new Error('Failed to fetch data');
        }

        const data = await response;
        console.log("data: ", data);
        setInquiries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    // Set filteredQuestions to inquiries initially
    setFilteredQuestions(inquiries);
  }, [inquiries]);
  
  const filterQuestions = (searchText) => {
    if (searchText.trim() === "") {
      // If searchText is empty, display all inquiries
      setFilteredQuestions(inquiries);
    } else {
      const filtered = inquiries.filter(item =>
        item.faq_title && item.faq_title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  };

  

  const handleDeleteFAQ = async () => {
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/delete`,
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json", // Specify that you are sending JSON data
      // },
      body: JSON.stringify({
        faqId: selectedId,
      }),
    });

    console.log(selectedId);

    if (res.message === "Faq is deleted.") {
      handleCloseModal();
      // showSnackbar("Blog Deleted Successfully", "success");
      window.location.reload();
    } else {
      console.error('Error deleting FAQ:', "error" );
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
            <div className="w-full mt-4">
            <form>          
              <div className='max-w-xl mx-auto sm:w-2/4'>
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border border-slate-500 overflow-hidden h-9">
            <div className="grid place-items-center h-full w-12 text-gray-300 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-black pr-2 bg-white"
              type="text"
              id="search"
              placeholder="Search something.."
              onChange={(e) => filterQuestions(e.target.value)}
            />
          </div>
        </div>
      </form>
      </div>
          </div>
          <div className="flex flex-col items-center">
          {filteredQuestions.map((item) => {
  const { faq_id: id, faq_title: title, faq_content: content } = item;
  return (
              <div
                className="flex w-[80%] flex-row items-start my-7 rounded bg-darkWhite "
                key={item.faq_id}
              >
                {/* content layout */}
                <div className="flex flex-col grow">
                  <h1 className="font-bold mb-2">{item.faq_title}</h1>
                  <p>{item.faq_content}</p>
                </div>
                <Stack
                  direction="row"
                  alignItems="center"
                  margin={"0 20px"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedID(item.faq_id);
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
  );
})}
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default FAQDelete;
