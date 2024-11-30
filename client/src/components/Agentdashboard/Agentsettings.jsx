import React from 'react'
import './agentsetting.css'
import Personalinfoupdate from '../Settings/Personal info/PersonalinfoForm'
import Passwordupdate from '../Settings/Password/Passwordupdate'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useQuery } from 'react-query'
import Deleteaccount from '../Delete account/Deleteaccount'
import useUserStore from '../../store/userStore'

function Agentsettings() {
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
    <div className='overall-agent-settings-container container'>
        <h1>Settings</h1>
        <div className="agent-personal-information">
          <h2>Personal Information</h2>
          <Personalinfoupdate
              fullName={data.fullName}
              userName={data.userName}
              email={data.email}
              id={userId}
            />
        </div>
        <div className="agent-password-update">
          <h2>Password Update</h2>
          <Passwordupdate id={userId}/>
        </div>
        <div className="agent-delete-account">
          <h2>Delete</h2>
        <Deleteaccount id={userId} />
        </div>
    </div>
  )
}

export default Agentsettings