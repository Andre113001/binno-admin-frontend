import React, { useState, useEffect } from "react";
import FAQEdit from "./FAQ Functional List/FAQEdit";
import FAQAdd from "./FAQ Functional List/FAQAdd";
import FAQDelete from "./FAQ Functional List/FAQDelete";
import { Stack } from "@mui/system";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { IconButton, Link } from "@mui/material";
import SearchBar from "../../../components/Search Bar/Searchbar";
import OptionButton from "../OptionButton";
import { useHttp } from '../../../hooks/http-hook';


function FAQList() {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isAddActive, setIsAddActive] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const { sendRequest } = useHttp(); 

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

  

  const handleDeleteClick = () => {
    setIsDeleteActive(true);
    setIsNavigationVisible(!isNavigationVisible);
  };

  const handleEditClick = () => {
    setIsEditActive(true);
    setIsNavigationVisible(!isNavigationVisible);
  };

  const handleAddClick = () => {
    setIsAddActive(true);
    setIsNavigationVisible(!isNavigationVisible);
  };

  return (
    <>
      {/* parent container */}
      <div className="flex flex-col w-full ">
        {/* default page */}

        <div className="flex flex-col w-full">
          {isNavigationVisible && (
            <div className="flex flex-col items-center text-5xl font-bold text-primary justify-center w-[100%] ">
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
          )}
          {/* list controls  */}
          {isNavigationVisible && (
            <div className="flex items-start my-2">
              <Stack direction="row">
                {/* for edit link */}
                <Link href="/inquiries/edit" underline="none">
                  <IconButton
                    onClick={handleEditClick}
                    aria-label="Edit"
                    size="large"
                  >
                    <EditNoteRoundedIcon />
                  </IconButton>
                </Link>
                {/* for delete link */}
                <Link href="/inquiries/delete" underline="none">
                  <IconButton
                    onClick={handleDeleteClick}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </Link>
                {/* for add link */}
                <Link href="/inquiries/add" underline="none">
                  <IconButton
                    onClick={handleAddClick}
                    aria-label="add"
                    size="large"
                  >
                    <AddBoxRoundedIcon />
                  </IconButton>
                </Link>
              </Stack>
            </div>
          )}

          {isEditActive && (
            <div className="flex w-[100%]  flex-col items-center">
              <FAQEdit />
            </div>
          )}

          {isDeleteActive && (
            <div className="flex w-[100%]  flex-col items-center">
              <FAQDelete />
            </div>
          )}

          {isAddActive && (
            <div className="flex w-[100%]  flex-col items-center">
              <FAQAdd />
            </div>
          )}

          {isNavigationVisible && (
            // conditionally render content when navigation is clicked
            <div className="flex flex-col items-center">
              {/* list cards */}
              {filteredQuestions.map((item, index) => {
  const { faq_id: id, faq_title: title, faq_content: content } = item;
  return (
    // card design
    <div
      className="flex w-[95%] flex-col my-7 rounded bg-darkWhite"
      key={id}
    >
      <h1 className="font-bold">{title}</h1>
      <p>{content}</p>
    </div>
  );
})}

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FAQList;
