import { Avatar } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { useViewport } from "../../context/viewportContext";
import { fetcher } from "../../utils/utils";

type Props = {
  username: string;
};

function SidebarUser({ username }: Props) {
  const { data, error } = useSWR(
    `/api/user/profile?username=${username}`,
    fetcher
  );
  const breakpoint = 768;
  const { width } = useViewport();

  return (
    <div className="sidebar__user">
      <div className="sidebar__user__avatar">
        <Avatar src={data?.user?.avatar} />
      </div>
      {width > breakpoint && (
        <div className="sidebar__user__info">
          <h4 style={{ margin: 0 }}>
            {data?.user?.firstName + " " + data?.user?.lastName}
          </h4>
          <p style={{ margin: 0, color: "gray" }}>@{username}</p>
        </div>
      )}
    </div>
  );
}

export default SidebarUser;
