import React from "react";
import {
  Avatar,
  Card,
  Result,
  Skeleton,
  Typography,
} from "@arco-design/web-react";
import { IconArrowRight, IconUser } from "@arco-design/web-react/icon";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

interface IProps {
  uid: string;
}

function UserCard(props: IProps) {
  const { data, error } = useSWR(`/api/user/profile?uid=${props.uid}`, fetcher);
  const navigate = useNavigate();

  return (
    <div>
      {error ? (
        <Result status="500" subTitle={error?.message} />
      ) : (
        <Card className="card-with-icon-hover" hoverable bordered={false}>
          <Skeleton
            style={{ display: "flex", alignItems: "center", marginTop: 4 }}
            loading={!data}
            image={{ shape: "circle" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar style={{ marginRight: 8 }}>
                  {data?.user?.avatar ? (
                    <img src={data?.user?.avatar} alt="avatar" />
                  ) : (
                    <IconUser />
                  )}
                </Avatar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontWeight: "bold", fontSize: "larger" }}
                  >{`${data?.user?.firstName} ${data?.user?.lastName}`}</Typography.Text>
                  <Typography.Text
                    style={{
                      fontSize: "smaller",
                      color: "var(--color-text-3)",
                    }}
                  >
                    @{data?.user?.username}
                  </Typography.Text>
                  <Typography.Text>{data?.user?.introduction}</Typography.Text>
                </div>
              </span>

              <span
                className="icon-hover"
                onClick={() => navigate(`/${data?.user?.username}`)}
              >
                <IconArrowRight style={{ cursor: "pointer" }} />
              </span>
            </div>
          </Skeleton>
        </Card>
      )}
    </div>
  );
}

export default UserCard;
