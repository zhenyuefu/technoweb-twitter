import React from "react";

import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { ClearRounded } from "@mui/icons-material";
import ReactZmage from "react-zmage";

type Props = {
  img_list: Array<string>;
  handleDelete: (index: number) => void;
};

const ImgBox = (props: Props) => {
  const img_set: { src: string; alt: string }[] = [];
  props.img_list.map((img) => {
    img_set.push({ src: img, alt: "" });
  });

  return (
    <div className="imgBox">
      <ImageList sx={{ maxWidth: "600px" }} cols={2} rowHeight={150}>
        {props.img_list.map((item, index) => (
          <ImageListItem key={index} sx={{ maxWidth: "300px" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                color: "white",
                padding: "3px",
                margin: "3px",
                backgroundColor: "rgba(15, 20, 25, 0.75)",
                ":hover": {
                  backgroundColor: "rgba(39, 44, 48, 0.75)",
                },
              }}
              onClick={(event) => {
                event.stopPropagation();
                props.handleDelete(index);
              }}
            >
              <ClearRounded
                sx={{
                  padding: "0px",
                }}
              />
            </IconButton>
            <ReactZmage
              src={item}
              alt="img"
              defaultPage={index}
              set={img_set}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImgBox;
