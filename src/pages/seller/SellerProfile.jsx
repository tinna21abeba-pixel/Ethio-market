import { useAuth } from "../../context/AuthContext";

function SellerProfile() {
  const { user } = useAuth();

  return (
    <main>
      <h1>Seller Profile</h1>

      <p>Name: {user.name}</p>

      <p>Email: {user.email}</p>

      <p>Account Type: {user.role}</p>
    </main>
  );
}

export default SellerProfile;