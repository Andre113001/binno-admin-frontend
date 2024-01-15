import { useState } from "react";
import "./App.css";

import { Routes, Route, Outlet } from "react-router-dom";

// Hooks
import { AuthProvider } from "./hooks/AuthContext";

// Pages
import Login from "./pages/Login";
import Members from "./pages/Members";
import Dashboard from "./pages/Dashboard";
import SystemSettings from "./pages/SystemSettings";
import Announce from "./pages/Announce";
import Contents from "./pages/Contents";
import TestComponents from "./pages/TestComponents";
import Missing from "./pages/Missing";
import Requests from "./pages/Requests";
import Calendar from "./pages/Calendar";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ApplicationProcessing from "./pages/ApplicationProcessing/ApplicationProcessing";
import MembershipManagement from "./pages/MembershipManagement/MembershipManagement";
import ViewActivities from "./pages/MembershipManagement/ViewActivities";
import AdminDashbaord from './pages/Dashboard/Dashboard';
import ActivityMonitoring from "./pages/ActivityMonitoring/ActivityMonitoring";

function App() {
    const [authenticated, setAuthenticated] = useState(false); // You can set this based on the user's authentication status

    return (
        <>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/test" element={<TestComponents />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/announce" element={<Announce />} />
                    <Route
                        path="/admin/application_processing"
                        element={<ApplicationProcessing />}
                    />
                    <Route
                        path="/admin/membership_management"
                        element={<MembershipManagement />}
                    />
                    <Route
                        path="/admin/membership_management/members"
                        element={<ViewActivities />}
                    />
                    <Route path="/dashboard" element={<AdminDashbaord />} />
                    <Route
                        path="/admin/activity_monitoring"
                        element={<ActivityMonitoring />}
                    />

                    <Route
                        path="/private" // Define a common parent route for private routes
                        element={
                            <Outlet>
                                {/* Private Routes */}
                                {/* <PrivateRoute path="members" element={<Members />} authenticated={authenticated} />
                <PrivateRoute path="dashboard" element={<Dashboard />} authenticated={true} />
                <PrivateRoute path="contents" element={<Contents />} authenticated={authenticated} />
                <PrivateRoute path="settings" element={<SystemSettings />} authenticated={authenticated} />
                <PrivateRoute path="announce" element={<Announce />} authenticated={authenticated} />
                <PrivateRoute path="members/requests" element={<Requests />} authenticated={authenticated} />
                <PrivateRoute path="calendar" element={<Calendar />} authenticated={authenticated} /> */}
                            </Outlet>
                        }
                    />

                    {/* Catch */}
                    <Route path="/missing" element={<Missing />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
