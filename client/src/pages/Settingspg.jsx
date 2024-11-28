import React from 'react';
import './settingspg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Personalinfoupdate from '../components/Settings/Personal info/PersonalinfoForm';
import Passwordupdate from '../components/Settings/Password/Passwordupdate';
import Deleteaccount from '../components/Delete account/Deleteaccount';
import { useQuery } from 'react-query';
import useUserStore from '../store/userStore';
function Settingspg() {
  const userData = useUserStore((state) => state.user);
  const userId = userData.id;

  // Fetch user data with a 3-second refetch interval
  const { data, isLoading, error } = useQuery({
    queryKey: ["userData", userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/get-user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    },
    refetchInterval: 3000, // Refetch every 3 seconds
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <div className="overall-settings-page">
      <div className="settings-name-card card">
        <h2>SETTINGS</h2>
      </div>
      <div className="setting-content-div">
        {/* Personal Information Update Section */}
        <div className="Bookhut-account-card card">
          <div className="top-book-account-card">
            <h3 className="container-fluid">For When you Book</h3>
            <p className="container-fluid">
              This information is only used to autofill your details and make it quicker for you to book. Your details will
              be stored securely and won't be shared publicly.
            </p>
          </div>
          <div className="bottom-bookhut-account">
            <Personalinfoupdate
              fullName={data.fullName}
              userName={data.userName}
              email={data.email}
              id={userId}
            />
          </div>
        </div>

        {/* Password Update Section */}
        <div className="Bookhut-account-card card">
          <div className="top-book-account-card">
            <h3 className="container-fluid">Password</h3>
            <p className="container-fluid">
              This information is only used to autofill your details and make it quicker for you to book. Your details will
              be stored securely and won't be shared publicly.
            </p>
          </div>
          <div className="bottom-bookhut-account">
            <Passwordupdate />
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="Bookhut-account-card card">
          <div className="top-book-account-card">
            <h3 className="container-fluid text-danger">Delete Account</h3>
            <p className="container-fluid">
              Are you sure? Deleting your account is permanent and cannot be undone. All your data will be erased and
              cannot be recovered.
            </p>
          </div>
          <div className="bottom-bookhut-account">
            <Deleteaccount id={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settingspg;
