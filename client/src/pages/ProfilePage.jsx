import { useEffect, useState } from "react";
import { getProfile } from "../services/profile.service";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile(setProfile);
  }, []);

  return (
    <div>
      <div>{profile.fullname}</div>ProfilePage
    </div>
  );
};

export default ProfilePage;
