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
              <SearchBar />
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
              {inquiries.map((item, index) => (
                // card design
                <div
                  className="flex w-[95%] flex-col my-7 rounded bg-darkWhite"
                  key={item.faq_id}
                >
                  <h1 className="font-bold">{item.faq_title}</h1>
                  <p>{item.faq_content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FAQList;
