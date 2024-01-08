import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Modal: FunctionComponent = () => {
  const navigate = useNavigate();
  const onProfileTextClick = useCallback(() => {
    navigate("/edit_profile");
  }, []);

  const onChangePasswordTextClick = useCallback(() => {
    navigate("/change_password");
    // Please sync "Change password" to the project
  }, []);

  const onChangeLogoutTextClick = useCallback(() => {
    localStorage.clear();
    navigate("/login");
  }, []);

  return (
    <div className="relative rounded-lg bg-white shadow-[0px_4px_8px_rgba(0,_0,_0,_0.04)] top-[-140%] left-[350%] flex flex-col items-start justify-start py-6 px-3.5 box-border gap-[24px] max-w-full max-h-full overflow-auto text-left text-base text-main-text font-body-text-normal-16">
      <div
        className="relative tracking-[0.15px] leading-[140%] cursor-pointer"
        onClick={onProfileTextClick}
      >
        Profile
      </div>
      <div
        className="relative tracking-[0.15px] leading-[140%] cursor-pointer"
        onClick={onChangePasswordTextClick}
      >
        Change Password
      </div>
      <div className="relative tracking-[0.15px] leading-[140%] cursor-pointer"
      onClick={onChangeLogoutTextClick}
      >Logout</div>
    </div>
  );
};

export default Modal;
