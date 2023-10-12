import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { addUserThunk, fetchUsers } from "../store";
import Skeleton from "./Skeleton";

function UsersList() {
  const [runThunk, isLoading, error] = useThunk(fetchUsers);
  const [createUserThunk, isCreatingUser, creatingUserError] = useThunk(addUserThunk);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    runThunk();
  }, [runThunk]);

  const handleAddUser = () => {
   createUserThunk();
  };

  if (isLoading) return <Skeleton times={6} className="h-10 w-full" />;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1>USERS</h1>
        <div>
          {isCreatingUser ? (
            <h1>"Creating AUser " </h1>
          ) : (
            <button onClick={handleAddUser} style={{ background: "gray" }}>
              Add user
            </button>
          )}
          {error && <h1>{JSON.stringify(creatingUserError)}</h1>}
        </div>
      </div>
      <br />
      <hr />
      {isLoading ? (
        <Skeleton times={6} className="h-10 w-full" />
      ) : (
        <div>
          {data &&
            data.map((user) => (
              <ul key={user.id}>
                <li>Name: {user.name} </li>
              </ul>
            ))}
        </div>
      )}
    </>
  );
}

export default UsersList;
