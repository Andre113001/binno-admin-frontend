import React, { useState, useEffect } from 'react';
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useHttp } from '../../../../hooks/http-hook';
import { Snackbar } from "@mui/material";

const FAQEdit = () => {
  const [inquiries, setInquiries] = useState([]);
  const [rowsState, setRowsState] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true); // Initially hidden
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);
  const { sendRequest, isLoading, error, clearError } = useHttp(); 

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
        const initialRows = data.map(() => ({ readOnly: true, showButtons: false }));
        setRowsState(initialRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
  
    const checkScreenSize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 768);
    };
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  const handleEditClick = (index) => {
    if (index < 0 || index >= rowsState.length) return; 
    setRowsState(prevState => {
      const newState = [...prevState];
      newState[index] = {
        readOnly: !prevState[index].readOnly, 
        showButtons: !prevState[index].showButtons,
      };
      return newState;
    });
  };

  const updateFaq = async (faqId, newTitle, newContent) => {
    try {
      const response = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/edit`,
        method: 'POST',
        body: JSON.stringify({
          faqId: faqId,
          title: newTitle,
          content: newContent,
        }),
      });

      console.log('Updated FAQ:', faqId, newTitle, newContent);
      console.log('Update FAQ response:', response);

    } catch (error) {
      console.error('Error updating FAQ:', error.message);
      throw new Error('Failed to update FAQ: ' + error.message); 
    } finally {
      clearError();
    }
  };

  const handleFaqUpdate = async (index, faqId) => {
    if (index < 0 || index >= inquiries.length) return; 

    const newTitle = inquiries[index].faq_title;
    const newContent = inquiries[index].faq_content;

    console.log('Updating FAQ:', faqId, newTitle, newContent);

    if (!newTitle || !newContent) {
      console.error('New title or new content is null.');
      return;
    }

    await updateFaq(faqId, newTitle, newContent);

    setInquiries(prevState => {
      const updatedInquiries = [...prevState];
      updatedInquiries[index] = {
        ...prevState[index],
        faq_title: newTitle,
        faq_content: newContent,
      };
      return updatedInquiries;
    });

    setRowsState(prevState => {
      const newState = [...prevState];
      newState[index] = {
        readOnly: true,
        showButtons: false
      };
      return newState;
    });
  };

  return (
    <>
      <Fragment>
        <div className="flex">
          <div className={`w-full ${showSidebar ? 'w-full' : ''}`}> {/* Adjust width based on sidebar visibility */}
            <div className="container m-10 bg-darkWhite">
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
              <div className="flex flex-col w-full items-center w-full">
                {inquiries.map((item, index) => (
                  <div key={item.faq_id} className="flex w-full flex-col items-center my-7 rounded bg-darkWhite ">
                    <div className="flex flex-row w-[80%] grow">
                      <div className="flex flex-col">
                        <h1 className="font-bold text-lg mr-5 mb-1">Title: </h1>
                        <h1 className="font-bold text-lg mr-5">Content: </h1>
                      </div>
                      <div className="flex flex-col w-full">
                        <textarea
                          readOnly={rowsState[index].readOnly}
                          rows="1"
                          style={{ resize: 'none', overflow: 'hidden' }}
                          className="mr-2 w-full p-1"
                          value={inquiries[index].faq_title || ""} // Ensure it's not null
                          onChange={(event) => {
                            const updatedInquiries = [...inquiries];
                            updatedInquiries[index].faq_title = event.target.value;
                            setInquiries(updatedInquiries);
                          }}
                        />

                        <textarea
                          readOnly={rowsState[index].readOnly}
                          rows="6"
                          style={{ resize: 'none', overflow: 'hidden' }}
                          className="mr-2 w-full p-1"
                          value={inquiries[index].faq_content || ""} // Ensure it's not null
                          onChange={(event) => {
                            const updatedInquiries = [...inquiries];
                            updatedInquiries[index].faq_content = event.target.value;
                            setInquiries(updatedInquiries);
                          }}
                        />
                      </div>
                      <IconButton
                        onClick={() => handleEditClick(index)}
                        aria-label="Edit"
                        size="large"
                        style={{
                          backgroundColor: "#5c9fef",
                          color: "#fff",
                          margin: "24px",
                          borderRadius: "15px",
                          width: "45px",
                          height: "45px ",
                          alignSelf: "center",
                        }}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                    </div>
                    {rowsState[index].showButtons && (
                      <div className="flex flex-row w-[80%] my-5">
                        <button
                          className="p-2 mx-2 w-[50%] border border-secondary font-bold text-secondary rounded-full"
                          onClick={() => handleEditClick(index)}
                        >
                          Cancel
                        </button>
                        <button
                          className="p-2 mx-2 w-[50%] border font-bold rounded-full text-white bg-secondary"
                          onClick={() => handleFaqUpdate(index, item.faq_id)}
                          disabled={isLoading} 
                        >
                          {isLoading ? 'Updating...' : 'Update FAQ'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar */}
          {!isTabletOrSmaller && showSidebar && <Sidebar />}
        </div>
        {isTabletOrSmaller && (
        <IconButton
          onClick={() => setShowSidebar(showSidebar)} 
          aria-label="Toggle Sidebar"
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: '1000', // Ensure it's above other content
          }}
        >
          <MenuIcon />
        </IconButton>
)}
      </Fragment>
    </>
  );
}

export default FAQEdit;
