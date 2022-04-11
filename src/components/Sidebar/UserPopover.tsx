import React from "react";
import { useRecoilState } from "recoil";
import { authAtom } from "../../context/auth";

const UserPopover = () => {
  return (
    <div className="userpopover">
      <svg className="userpopover__icon" viewBox="0 0 24 24">
        <path d="M 12.538 6.478 c -0.14 -0.146 -0.335 -0.228 -0.538 -0.228 s -0.396 0.082 -0.538 0.228 l -9.252 9.53 c -0.21 0.217 -0.27 0.538 -0.152 0.815 c 0.117 0.277 0.39 0.458 0.69 0.458 h 18.5 c 0.302 0 0.573 -0.18 0.69 -0.457 c 0.118 -0.277 0.058 -0.598 -0.152 -0.814 l -9.248 -9.532 Z" />
      </svg>
    </div>
  );
};

export default UserPopover;
