import { useRef, useState, useEffect } from "react";
import Inquiries from "../FAQ_data";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import { Fragment } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../../hooks/http-hook";
import * as React from "react";
// import SuccessAlert from "../../../../components/Alerts/SuccessAlert";

function FAQAdd() {
  const { sendRequest, isLoading } = useHttp();
  const [inquiries, setInquiries] = useState([]);

  const faq_title = useRef();
  const faq_content = useRef();
  const navigate = useNavigate();

  function cancelBtn() {
    navigate(-1);
  }


  useEffect (() => {
    const fetchData = async () => {

    try{
       const response = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/fetch`,
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
},[] );

  const handleSubmit = async () => {
    const faqContent = faq_content.current.value;
    const faqTitle = faq_title.current.value;

    const data = {
      title: faqTitle,
      content: faqContent,
    };

    try {
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/faq/upload`,
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      

      console.log(res);

    
      // navigate("/inquiries");
    } catch (error) {
  
      console.error("Error occurred:", error.message);
    }
  };

  return (
    <>
      <Fragment>
        <Sidebar />
        {/* parent div */}
        <div className="flex flex-col items-center w-[100%] container m-10 bg-darkWhite">
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
          <div className="flex flex-col items-center w-full">
            {/* card container */}
            <div className="flex flex-row w-[80%]">
              {/* parent add container */}
              <div className="flex flex-col my-4 w-[100%]">
                {/* title container */}
                <div className="flex flex-row items-center mb-2">
                  <h1 className="font-bold text-2xl mr-5">Title: </h1>
                  <input
                    type="text"
                    id="title"
                    placeholder="Type your title here"
                    className=" font-bold text-2xl w-full outline-none"
                    ref={faq_title}
                  />
                </div>
                {/* content container */}
                <div className="flex flex-row">
                  {/* <h1 className=" font-bold text-xl mr-5">Content: </h1> */}
                  <h1 className="font-bold text-2xl mr-5">Content: </h1>
                  <textarea
                    className="outline-none items-center text-lg w-[95%]"
                    id="FAQContent"
                    placeholder="Type your content here"
                    rows="6"
                    ref={faq_content}
                  />
                </div>
                <div className="flex flex-row my-5">
                  <button
                    onClick={cancelBtn}
                    className="p-2 mx-2 w-[50%] border border-secondary font-bold text-secondary rounded-full "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="p-2 mx-2 w-[50%] border font-bold rounded-full text-white bg-secondary"
                    disabled={isLoading}
                  >
                    Add FAQ
                  </button>
                </div>
              </div>
            </div>
            {/* list cards */}
            {inquiries.map((item, index) => (
         
              <div
                className="flex w-[80%] flex-col my-7 rounded bg-darkWhite"
                key={item.faq_id}
              >
                <h1 className="font-bold">{item.faq_title}</h1>
                <p>{item.faq_content}</p>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    </>
  );
}
export default FAQAdd;
