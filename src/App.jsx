import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UsersList from "./components/UsersList";
import UserInfo from "./components/UserInfo";
import AddUserForm from "./components/AddUserForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  padding: 10,
};

function App() {
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  return (
    <>
      <Button
        style={{ display: "flex", marginLeft: "auto" }}
        onClick={() => setShowAddFormModal(true)}
      >
        Добавить пользователя
      </Button>
      <UsersList
        onOpen={() => setShowMoreInfo(true)}
        setSelectedUser={setSelectedUser}
      />
      <Modal open={showMoreInfo} onClose={() => setShowMoreInfo(false)}>
        <Box style={modalStyle}>
          <UserInfo user={selectedUser} />
        </Box>
      </Modal>
      <Modal open={showAddFormModal} onClose={() => setShowAddFormModal(false)}>
        <Box style={modalStyle}>
          <AddUserForm setShowAddFormModal={setShowAddFormModal} />
        </Box>
      </Modal>
    </>
  );
}

export default App;
