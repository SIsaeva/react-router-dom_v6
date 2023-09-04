import {
  NavLink,
  useParams,
  Outlet,
  Navigate,
  useRoutes,
} from "react-router-dom";

const usersList = [
  { id: 1, label: "User1" },
  { id: 2, label: "User2" },
  { id: 3, label: "User3" },
  { id: 4, label: "User4" },
  { id: 5, label: "User5" },
];

const setActive = ({ isActive }) => (isActive ? " active" : "");

const mainPageElement = (
  <>
    <h1>App Layout</h1>
    <NavLink to="/users" className={setActive}>
      Users list page
    </NavLink>
  </>
);

const usersLayoutElement = (
  <>
    <h1>Users Layout</h1>
    <NavLink to="/" className={setActive}>
      Main page
    </NavLink>
  </>
);

const MainPage = () => {
  return (
    <>
      {mainPageElement}
      <h1>Main Page</h1>
    </>
  );
};

const UsersListPage = () => {
  return (
    <>
      {mainPageElement}
      {usersLayoutElement}
      <h1>Users list</h1>
      {usersList.map((user) => (
        <NavLink key={user.id} to={`/users/${user.id}/profile`}>
          <h3>{user.label}</h3>
        </NavLink>
      ))}
    </>
  );
};

function UserProfilePage() {
  const params = useParams();
  const { userId } = params;

  return (
    <>
      {mainPageElement}
      {usersLayoutElement}
      <h1>UserPage</h1>
      <li>
        <NavLink to="/users" className={setActive}>
          Users list page
        </NavLink>
      </li>
      <li>
        <NavLink to={`/users/${userId}/edit`} className={setActive}>
          Edit this user
        </NavLink>
      </li>
      <div>userID:{userId}</div>
    </>
  );
}

const UserEditPage = () => {
  const params = useParams();
  const { userId } = params;
  if (userId) {
    return (
      <>
        {mainPageElement}
        {usersLayoutElement}
        <h1>Edit user page</h1>
        <li>
          <NavLink to={`/users/${userId}/profile`} className={setActive}>
            User profile page
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId + 1}/profile`} className={setActive}>
            Another user
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={setActive}>
            Users list page
          </NavLink>
        </li>
      </>
    );
  }
};

const allRoutes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "users",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <UsersListPage />,
      },
      {
        path: ":userId",
        element: <Outlet />,
        children: [
          { path: "profile", element: <UserProfilePage /> },
          { path: "edit", element: <UserEditPage /> },
          { index: true, element: <Navigate to="./profile" /> },
          { path: "*", element: <Navigate to="../profile" /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
];

function App() {
  const routes = useRoutes(allRoutes);
  return <div>{routes}</div>;
}

export default App;
