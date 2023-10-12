import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk, fetchUsers } from "../store";
import Skeleton from "./Skeleton";

function UsersList() {
  const dispatch = useDispatch();
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [CreatingUserError, setCreatingUserError] = useState(null);
  const { isLoading, data, error } = useSelector((state) => state.users);

  useEffect(() => {
    setIsLoadingUsers(true);
    console.log(dispatch(fetchUsers()));
    dispatch(fetchUsers())
      .unwrap()
      .then((res) => {
        console.log({ res });
      })
      .catch((error) => {
        setLoadingUsersError(error);
        setIsLoadingUsers(false);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, [dispatch]);

  const handleAddUser = () => {
    setIsCreatingUser(true);
    dispatch(addUserThunk())
      .unwrap()
      .catch((err) => setCreatingUserError(err))
      .finally(() => setIsCreatingUser(false));
  };

  // if(isLoading ) return <Skeleton times={6} className='h-10 w-full'/>;
  if (isLoadingUsers) return <Skeleton times={6} className="h-10 w-full" />;

  // if(error) return <div> Errors </div>;
  if (loadingUsersError) return <div> Errors </div>;

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
          {CreatingUserError && <h1>{JSON.stringify(CreatingUserError)}</h1>}
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
