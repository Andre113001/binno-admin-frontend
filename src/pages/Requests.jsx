import React, { useState, useEffect } from "react";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import Back from "../components/Back/Back";
import MemberNav from "../components/MemberNav/MemberNav";
import CustomModal from "../components/CustomModal/CustomModal";
import {
  Visibility as VisibilityIcon,
  IosShare as IosShareIcon,
  CalendarMonth as CalendarIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

function Requests() {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = (option) => {
    setShowDropdown(false);
    console.log(option);
  };

  useEffect(() => {
    fetch("/api/getAppRequests")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Sidebar />
      <CustomModal
        open={open}
        handleClose={handleClose}
        modalHeading={"From Request"}
        modalDescription={"Description from Request"}
        content={
          <div className="overflow-auto">
            {/* Request ID */}
            <span className="sm">111-222-333</span>
            {/* Full Name */}
            <h1 className="text-3xl font-bold">Marcus Andre Genorga</h1>
            {/* Address */}
            <span className="text-xl">Hidhid, Matnog, Sorsogon</span>
            <br />
            {/* Email */}
            <span className="text-lg">1130marcusa@gmail.com</span>

            {/* Request Body */}
            <div className="overflow-y-auto h-[400px] max-h-[500px]">
              {/* Request Letter */}
              <p className="mt-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                laoreet, sapien id egestas rhoncus, diam lectus blandit felis, a
                ultrices enim metus non ex. Aenean imperdiet eget sem non
                imperdiet. Cras eget varius risus, quis scelerisque felis.
                Mauris et auctor nisl. Ut felis magna, hendrerit et felis at,
                consequat fringilla odio. Nunc nec sem lorem. Sed eget ex
                varius, sollicitudin elit consectetur, tincidunt justo. Etiam ac
                dolor eget metus gravida malesuada eget a ipsum. Sed vel
                eleifend felis. Sed ac cursus ex. Vivamus at nisl a felis
                tristique accumsan in posuere dui. Curabitur eu malesuada ex.
                Morbi sodales egestas nisi id maximus. Morbi in metus fermentum,
                tincidunt eros at, consectetur augue. Maecenas molestie nunc
                eget odio bibendum porta. In non nisl pellentesque ex suscipit
                suscipit ut quis erat. Suspendisse vitae sapien finibus,
                suscipit mi eget, ullamcorper mi. Nunc non semper nisi, quis
                eleifend urna. Donec congue lacus quis neque efficitur, eu
                bibendum sem mollis. Pellentesque scelerisque nunc arcu, quis
                aliquet risus suscipit vel. Nunc nec convallis libero. Duis in
                nisi lacus. Phasellus nec odio et eros malesuada rhoncus.
                Aliquam vel nisi lacus. Nunc elementum pellentesque ante ut
                semper. Suspendisse lacus dolor, imperdiet eget semper vitae,
                commodo sed mi. Ut vel purus lobortis, pharetra magna in,
                hendrerit diam.
              </p>

              {/* Image / Proof */}
              <img
                className="mt-2 rounded-[10px]"
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/Right_to_Care_Card_mockup_sample.png"
              />
            </div>
          </div>
        }
        additions={
          <button className="btn bg-purple-400 w-full mt-5 flex items-center justify-center">
            <CalendarIcon />
            <span>Schedule a meeting</span>
          </button>
        }
      />
      <div className="container">
        <Back link="/members" />
        <h1 className="heading-1">Requests</h1>
        <MemberNav />
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody className="border text-left">
            {data.map((item) => (
              <tr key={item.request_id}>
                <td>{item.request_id}</td>
                <td>{item.request_email}</td>
                <td>{item.request_fullname}</td>
                <td className="flex">
                  <div className="member_options flex items-center space-x-4">
                    <div
                      onClick={handleOpen}
                      className="member_option flex items-center space-x-1 cursor-pointer text-orange-400"
                    >
                      <VisibilityIcon />
                      <span>View Application</span>
                    </div>
                    <div
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => {
                        setTimeout(() => setShowDropdown(false), 200); // Delayed close on leave
                      }}
                      className="relative cursor-pointer text-teal-600"
                    >
                      <IosShareIcon />
                      <span>Respond</span>
                      {showDropdown && (
                        <div className="absolute z-10 py-2 px-3 bg-white border rounded-lg shadow-lg">
                          <div
                            onClick={() => handleDropdownClick("Accept")}
                            className="cursor-pointer flex hover:bg-gray-100 p-2 rounded text-"
                          >
                            <CheckIcon />
                            <span>Accept</span>
                          </div>
                          <div
                            onClick={() => handleDropdownClick("Decline")}
                            className="cursor-pointer flex hover:bg-gray-100 p-2 rounded text-red-400"
                          >
                            <ClearIcon />
                            <span>Decline</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Requests;
