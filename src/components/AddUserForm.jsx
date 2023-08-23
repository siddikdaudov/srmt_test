import { useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { API_URL } from "../constants";

const AddUserForm = ({ setShowAddFormModal }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    city: "",
    contacts: [""],
  });

  const addPhoneNumber = () => {
    setForm((current) => ({
      ...current,
      contacts: [...current.contacts, ""],
    }));
  };

  const createUser = (e) => {
    e.preventDefault();
    if (!form.age || !form.name || !form.city) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert("Пользователь добавлен");
        setShowAddFormModal(false);
        location.reload();
      })
      .catch(() => {
        alert("Что-то пошло не так!");
        setShowAddFormModal(false);
      });
  };

  return (
    <form>
      <Box style={{ marginBottom: "20px" }}>
        <Typography variant="body2" color="text.secondary">
          Данные пользователя
        </Typography>
      </Box>
      <TextField
        label={"Имя"}
        id="name"
        value={form.name}
        onChange={(e) =>
          setForm((current) => ({ ...current, name: e.target.value }))
        }
      />
      <Br />
      <TextField
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        label={"Возраст"}
        id="age"
        value={form.age}
        onChange={(e) =>
          setForm((current) => ({ ...current, age: e.target.value }))
        }
      />
      <Br />
      <TextField
        label={"Город"}
        id="city"
        onChange={(e) =>
          setForm((current) => ({ ...current, city: e.target.value }))
        }
      />
      <Br />
      {form.contacts.map((number, index) => (
        <Fragment key={`phone_${index}`}>
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label={"Номер"}
            id={`phone_${index}`}
            value={number.number}
            onChange={(e) => {
              setForm((current) => ({
                ...current,
                contacts: current.contacts.map((item, idx) => {
                  if (index === idx) {
                    return e.target.value;
                  } else {
                    return item;
                  }
                }),
              }));
            }}
          />
          <Br />
        </Fragment>
      ))}
      <Button onClick={addPhoneNumber}>Добавить еще номер</Button>
      <Button
        style={{ display: "flex", marginLeft: "auto" }}
        onClick={createUser}
      >
        Добавить пользователя
      </Button>
    </form>
  );
};

const Br = () => (
  <Box
    sx={{
      height: 20,
    }}
  />
);

export default AddUserForm;
