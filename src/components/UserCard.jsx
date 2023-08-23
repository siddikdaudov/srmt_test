import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const UserCard = ({ name, avatar, style, onClick }) => {
  return (
    <Card sx={{ ...style }}>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={avatar} />}
        title={name}
      />
      <CardActions>
        <Button onClick={onClick}>Показать профиль</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
