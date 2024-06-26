import { useState } from "react";
import "./App.css";

import { Routes, Route, Outlet } from "react-router-dom";

// Hooks
import { AuthProvider } from "./hooks/AuthContext";

// Pages
import Login from "./pages/Login";
import Members from "./pages/Members";
// import Dashboard from "./pages/Dashboard";
import SystemSettings from "./pages/SystemSettings";
import Announce from "./pages/Announce";
import Contents from "./pages/Contents";
import TestComponents from "./pages/Test/PdfViewer";
import Missing from "./pages/Missing";
import Requests from "./pages/Requests";
import Calendar from "./pages/Calendar";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ApplicationProcessing from "./pages/ApplicationProcessing/ApplicationProcessing";
import MembershipManagement from "./pages/MembershipManagement/MembershipManagement";
import ViewActivities from "./pages/MembershipManagement/ViewActivities";
import AdminDashboard from "./pages/Dashboard/Dashboard";
import Notification from "./pages/Notification/Notification";
import ActivityMonitoring from "./pages/ActivityMonitoring/ActivityMonitoring";
import MemberView from "./pages/MembershipManagement/MemberView";
// import LabTabs from "./pages/Inquiries/OptionButton.jsx";
import MainFAQPage from "./pages/Inquiries/MainFAQPage.jsx";
import FAQAdd from "./pages/Inquiries/FAQ Lists Display/FAQ Functional List/FAQAdd.jsx";
import FAQDelete from "./pages/Inquiries/FAQ Lists Display/FAQ Functional List/FAQDelete.jsx";
import FAQEdit from "./pages/Inquiries/FAQ Lists Display/FAQ Functional List/FAQEdit.jsx";

import Reports from "./pages/Reports/Reports";

function App() {
  const [authenticated, setAuthenticated] = useState(false); // You can set this based on the user's authentication status

  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<TestComponents />} />
          <Route path="/reports" element={<Reports />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/announce" element={<Announce />} />
          <Route path="/applications" element={<ApplicationProcessing />} />
          <Route path="/membership" element={<MembershipManagement />} />
          <Route path="/membership/:member_id" element={<MemberView />} />
          <Route path="/activities" element={<ViewActivities />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/notification" element={<Notification />} />
          <Route
            path="/admin/activity_monitoring"
            element={<ActivityMonitoring />}
          />

          <Route path="/inquiries" element={<MainFAQPage />} />
          <Route path="/inquiries/edit" element={<FAQEdit />} />
          <Route path="/inquiries/add" element={<FAQAdd />} />
          <Route path="/inquiries/delete" element={<FAQDelete />} />

          {/* Catch */}
          <Route path="/missing" element={<Missing />} />
        </Routes>
      </AuthProvider>
    </>
  );

  // practice
  // return (
  //     <Routes>
  //         <Route path="/admin/application_processing" element={<ApplicationProcessing />} />
  //         <Route path="/admin/notification" element={<Notification />} />
  //         <Route path="/dashboard" element={<AdminDashbaord />} />
  //     </Routes>
  // )
}

export default App;
