import React, { useState, useEffect } from 'react';
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Fragment } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useHttp } from '../../../../hooks/http-hook';

const FAQEdit = () => {
  const [inquiries, setInquiries] = useState([]);
  const [rowsState, setRowsState] = useState([]);
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

  const updateFaq = async (faq_id, newTitle, newContent) => {
    try {
      const response = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/edit`,
        method: 'POST',
        body: JSON.stringify({
          faq_id: faq_id,
          faq_title: newTitle,
          faq_content: newContent
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }
  
      console.log('Update FAQ response:', response.data);
  
    } catch (error) {
      console.error('Error updating FAQ:', error.message);
      throw new Error('Failed to update FAQ: ' + error.message); 
    } finally {
      clearError();
    }
  };
  

  const handleFaqUpdate = async (index, faq_id) => {
    if (index < 0 || index >= inquiries.length) return; 

    const newTitle = inquiries[index].faq_title;
    const newContent = inquiries[index].faq_content;

    await updateFaq(faq_id, newTitle, newContent);
  
    // Update inquiries state (assuming successful response)
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
  value={inquiries[index].faq_title}
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
  value={inquiries[index].faq_content} 
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
      </Fragment>
    </>
  );
}

export default FAQEdit;
