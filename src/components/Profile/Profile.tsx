import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

type Props = {};

// const fetcher = (url: string) => {
//   fetch(url).then((res) => res.json());
// };

function Profile({}: Props) {
  const { username } = useParams();
  const usernameLower = username!.toLowerCase();
  // const { data, error } = useSWR(`/api/users/${usernameLower}`, fetcher);

  return (
    <div className="profile">
      <div className="profile__header"> {username}</div>
    </div>
  );
}

export default Profile;
