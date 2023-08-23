import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import formatPhoneNumber from "../utils/formatPhoneNumber";

const UserInfo = ({ user }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={user.avatar} />}
        title={user.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Имя: {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Возраст: {user.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Город: {user.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Контакты: {user.contacts?.map((number) => number)?.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
