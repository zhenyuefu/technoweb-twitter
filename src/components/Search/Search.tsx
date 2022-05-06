import React from "react";
import "../../style/Search.css";
import {
  AutoComplete,
  Avatar,
  Empty,
  Input,
  Notification,
  Skeleton,
} from "@arco-design/web-react";

import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import { IPost, ISearchResults } from "../../types";
import { IconUser } from "@arco-design/web-react/icon";
import Post from "../Feed/Post";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const { data, isValidating, error } = useSWR<ISearchResults>(
    query ? `/api/search?text=${query}` : null,
    fetcher
  );

  if (error) {
    Notification.error(error.message);
  }

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="search">
      <div className="main__header">
        <h2 style={{ margin: 0, fontFamily: "inherit" }}>Search </h2>
      </div>
      <AutoComplete
        style={{
          width: "100%",
        }}
        data={data?.users?.map((user, index) => {
          return (
            <AutoComplete.Option
              key={index}
              value={user.username || ""}
              style={{ display: "flex", alignItems: "center", margin: 2 }}
            >
              <Avatar size={24} style={{ marginLeft: 6, marginRight: 12 }}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} />
                ) : (
                  <IconUser />
                )}
              </Avatar>
              {`${user.firstName} ${user.lastName}`}
              <span style={{ marginLeft: 12, color: "var(--color-text-3)" }}>
                @{user.username}
              </span>
            </AutoComplete.Option>
          );
        })}
        placeholder="Enter keyword to search"
        onSearch={handleSearch}
        onSelect={(value) => {
          navigate(`/${value}`);
        }}
        triggerElement={<Input.Search size="large" loading={isValidating} />}
      />
      <Skeleton loading={!data} image animation>
        {data?.posts && data.posts.length > 0 ? (
          data.posts.map((post: IPost) => <Post post={post} key={post._id} />)
        ) : (
          <Empty />
        )}
      </Skeleton>
    </div>
  );
}

export default Search;
