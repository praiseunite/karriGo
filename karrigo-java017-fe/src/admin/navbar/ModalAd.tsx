import { FunctionComponent, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const ModalAd: FunctionComponent = () => {
  const onProfileTextClick =() => {
    navigate( "/admin/edit_profile");
   
  };

  const onChangePasswordTextClick = () => {
    navigate("/admin/change_password");
  };


  const navigate = useNavigate();
  const handleRegisterDriverClick = () => {
    
    navigate('/register_driver');
  };

  const onChangeLogoutTextClick = useCallback(() => {
    localStorage.removeItem("accessToken");
    navigate("/admin");
  }, []);


  return (
    <div className="relative rounded-lg bg-white shadow-[0px_4px_8px_rgba(0,_0,_0,_0.04)] top-[-100%] left-[370%] flex flex-col items-start justify-start py-6 px-3.5 box-border gap-[24px] max-w-full max-h-full overflow-auto text-left text-base text-main-text font-body-text-normal-16">
      <div
        className="relative tracking-[0.15px] leading-[140%] cursor-pointer"
        onClick={onProfileTextClick}
      >
        Profile
      </div>
      
      <div className=" cursor-pointer"
       onClick={handleRegisterDriverClick}>Register Driver</div>

      <div
        className="relative tracking-[0.15px] leading-[140%] cursor-pointer"
        onClick={onChangePasswordTextClick}
      >
        Change Password
      </div>
      <div className="relative tracking-[0.15px] leading-[140%] cursor-pointer" onClick={onChangeLogoutTextClick}>Logout</div>
    </div>
  );
};

export default ModalAd;
