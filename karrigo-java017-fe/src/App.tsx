import "./App.css";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Paystack from "./pages/paymentPage/Paystack";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordEmail from "./pages/resetPassword/ResetPasswordEmail";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import EmailVerification from "./pages/EmailverificationMessage";
import Overview from "./pages/Overview";
import CreateNewOrder from "./pages/CreateNewOrder";
import History from "./pages/History";
import FindTrack from "./pages/FindTrack";
import DriverOverview from "./driver/pages/DriverOverview";
import DriverHistory from "./driver/pages/DriverHistory";
import DriverFindTrack from "./driver/pages/DriverFindTrack";
import UserProfile from "./pages/profile/UserProfile";
import DriverProfile from "./driver/pages/profile/DriverProfile";
import DriverLoginPage from "./driver/pages/DriverLoginPage";
import DriverChangePassword from "./driver/pages/ChangePassword";
import UserChangePassword from "./pages/UserChangePassword";
import EmailverificationMessage from "./pages/EmailverificationMessage";
import AdminDriver from "./admin/AdminDriver";
import AdminLogin from "./admin/AdminLogin";
import AdminResetPasswordPage from "./admin/AdminResetPasswordEmail";
import AdminSignup from "./admin/AdminSignup";
import RegisterDriver from "./admin/RegisterDriver";
import SearchPage from "./admin/SearchPage";
import AdminOverview from "./admin/overview/AdminOverview";
import DriverResetPasswordPage from "./driver/pages/DriverResetPasswordEmail";
import AdminChangePassword from "./admin/AdminChangePassword";
import AdminProfile from "./admin/AdminProfile";
import AdminDeliveries from "./admin/AdminDeliveries";
import Notifications from "./components/Notifications";
import DriverNotifications from "./components/DriverNotifications";
import TaskUpdate from "./components/TaskUpdate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/reset_password" element={<ResetPasswordEmail />}></Route>
        <Route path="/notify" element={<Notifications />}></Route>
        <Route path="/updates" element={<DriverNotifications />}></Route>
        <Route
          path="/reset_password/email_verification"
          element={<ResetPassword />}
        ></Route>
        <Route
          path="/registration/email_verification"
          element={<EmailverificationMessage />}
        ></Route>
        <Route
          path="/home"
          element={
            <RequireAuth loginPath="/login">
              <Overview />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/paystack"
          element={
            <RequireAuth loginPath="/login">
              <Paystack />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/create_order"
          element={
            <RequireAuth loginPath="/login">
              <CreateNewOrder />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/history"
          element={
            <RequireAuth loginPath="/login">
              <History />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/find_track"
          element={
            <RequireAuth loginPath="/login">
              <FindTrack />
            </RequireAuth>
          }
        ></Route>
        <Route path="/home" element={<Overview />}></Route>
        <Route path="/create_order" element={<CreateNewOrder />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/find_track" element={<FindTrack />}></Route>
        <Route path="/edit_profile" element={<UserProfile />}></Route>
        <Route path="/change_password" element={<UserChangePassword />}></Route>

        {/*Driver Routes*/}

        <Route
          path="/driver/reset_password"
          element={<DriverResetPasswordPage />}
        ></Route>
        <Route path="/driver/login" element={<DriverLoginPage />}></Route>
        <Route
          path="/driver/change_password"
          element={<DriverChangePassword />}
        ></Route>
        <Route
          path="/driver/home"
          element={
            <RequireAuth loginPath="/driver/login">
              <DriverOverview />
            </RequireAuth>
          }
        ></Route>

        {/* <Route
          path="/driver/history"
          element={
            <RequireAuth loginPath="/driver/login">
              <DriverHistory />
            </RequireAuth>
          }
        ></Route> */}

        <Route
          path="/driver/find_track"
          element={
            <RequireAuth loginPath="/driver/login">
              <DriverFindTrack />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/driver/edit_profile"
          element={
            <RequireAuth loginPath="/driver/login">
              <DriverProfile />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/driver/change_password"
          element={
            <RequireAuth loginPath="/driver/login">
              <DriverChangePassword />
            </RequireAuth>
          }
        ></Route>
        <Route path="/driver/history" element={<DriverHistory />}></Route>
        <Route path="/driver/find_track" element={<DriverFindTrack />}></Route>
        <Route path="/driver/edit_profile" element={<DriverProfile />}></Route>
        <Route path="/driver/notification" element={<TaskUpdate/>}></Route>

        {/* for Admin */}

        {/* <Route path="/register_driver" element={<RegisterDriver />}></Route> */}
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/admin/signup" element={<AdminSignup />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route path="/admin/overview" element={<AdminOverview />}></Route>
        <Route path="/admin/drivers" element={<AdminDriver />}></Route>
        <Route
          path="/admin/change_password"
          element={<AdminChangePassword />}
        ></Route>
        <Route path="/admin/edit_profile" element={<AdminProfile />}></Route>
        <Route path="/admin/deliveries" element={<AdminDeliveries />}></Route>
        <Route
          path="/admin/reset_password"
          element={<AdminResetPasswordPage />}
        ></Route>

        <Route
          path="register_driver"
          element={
            <RequireAuth loginPath="/admin">
              <RegisterDriver />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
