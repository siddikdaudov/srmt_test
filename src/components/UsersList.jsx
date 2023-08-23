import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import UserCard from "./UserCard";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";
import { useGetUsers } from "../hooks/useGetUsers";

const TOTAL_PAGES = 5;

const UsersList = ({ onOpen, setSelectedUser }) => {
  const [page, setPage] = useState(1);
  const { users, isLoading, error } = useGetUsers(page);

  const rowRenderer = ({ key, index, style }) => {
    return (
      <Row
        key={key}
        index={index}
        style={style}
        user={users[index]}
        onClick={() => {
          setSelectedUser(users[index]);
          onOpen();
        }}
      />
    );
  };

  const isRowLoaded = ({ index }) => {
    return !!users[index];
  };

  const loadMoreRows =
    isLoading || page >= TOTAL_PAGES
      ? () => {}
      : () => setPage((current) => current + 1);

  return (
    <>
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={100}
              >
                {({ onRowsRendered, registerChild }) => (
                  <List
                    autoHeight
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={users.length}
                    rowHeight={150}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                  />
                )}
              </InfiniteLoader>
            )}
          </WindowScroller>
        )}
      </AutoSizer>
      {isLoading && (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Что-то пошло не так!</AlertTitle>
          {error}
        </Alert>
      )}
    </>
  );
};

const Row = ({ style, user, onClick }) => (
  <UserCard
    name={user.name}
    avatar={user.avatar}
    style={style}
    onClick={onClick}
  />
);

export default UsersList;
