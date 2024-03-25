import React, { useState } from "react";
import FAQEdit from "./FAQ Functional List/FAQEdit";
import FAQAdd from "./FAQ Functional List/FAQDelete";
import FAQDelete from "./FAQ Functional List/FAQDelete";
import Inquiries from "./FAQ_data";
import { Stack } from "@mui/system";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { IconButton } from "@mui/material";

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
      <div className="flex flex-col">
        {/* default page */}
        <div className="flex flex-col">
          {/* list controls  */}
          {isNavigationVisible && (
            <div className="flex items-start my-2 mx-20">
              <Stack direction="row">
                <IconButton
                  onClick={handleEditClick}
                  aria-label="Edit"
                  size="large"
                >
                  <EditNoteRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleDeleteClick}
                  aria-label="delete"
                  size="large"
                >
                  <DeleteRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleAddClick}
                  aria-label="add"
                  size="large"
                >
                  <AddBoxRoundedIcon />
                </IconButton>
              </Stack>
            </div>
          )}
          {isEditActive && (
            <div className="flex flex-col items-center">
              <FAQEdit />
            </div>
          )}

          {isDeleteActive && (
            <div className="flex flex-col items-center">
              <FAQDelete />
            </div>
          )}

          {isAddActive && (
            <div className="flex flex-col items-center">
              <FAQAdd />
            </div>
          )}

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
        </div>
        {/* Function display container*/}
      </div>
    </>
  );
}

export default FAQList;
