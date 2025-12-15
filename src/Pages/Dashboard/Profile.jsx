import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Profile = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-xl">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        My Profile
      </h2>

      <div className="flex items-center gap-4">
        <img
          src={user.photoURL}
          className="w-20 h-20 rounded-full border"
          alt=""
        />
        <div>
          <h3 className="font-semibold">{user.displayName}</h3>
          <p className="text-sm text-gray-500">
            {user.email}
          </p>
          <span className="text-xs text-green-600 font-medium">
            Active User
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
