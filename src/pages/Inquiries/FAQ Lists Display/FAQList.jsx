import React, { useState } from "react";
import FAQEdit from "./FAQ Functional List/FAQEdit";
import FAQAdd from "./FAQ Functional List/FAQAdd";
import FAQDelete from "./FAQ Functional List/FAQDelete";
import Inquiries from "./FAQ_data";
import { Stack } from "@mui/system";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { IconButton, Link } from "@mui/material";
import SearchBar from "../../../components/Search Bar/Searchbar";
import StyledToggleButton from "../../../components/ToggleButton/StyledToggleButton";

function FAQList() {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isAddActive, setIsAddActive] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

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
        {isNavigationVisible && (
          <div className="flex w-full mx-5 mb-8">
            <StyledToggleButton />
            {/* done button container */}
          </div>
        )}
        <div className="flex flex-col w-full">
          {isNavigationVisible && (
            <div className="flex flex-col items-center text-5xl font-bold text-primary justify-center w-[100%] ">
              Frequently Asked Question
              <SearchBar />
            </div>
          )}
          {/* list controls  */}
          {isNavigationVisible && (
            <div className="flex items-start my-2 mx-20">
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
              {Inquiries.map((item) => (
                // card design
                <div
                  className="flex w-[80%] flex-col my-7 rounded bg-darkWhite"
                  key={item.id}
                >
                  <h1 className="font-bold">{item.title}</h1>
                  <p>{item.inquiry}</p>
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
