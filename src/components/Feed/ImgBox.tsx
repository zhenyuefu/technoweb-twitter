import { IconButton, ImageList, ImageListItem } from "@mui/material";
import ReactZmage from "react-zmage";
import { ClearRounded } from "@mui/icons-material";

type Props = {
  img_list: Array<string>;
  handleDelete: Function;
};

const ImgBox = (props: Props) => {
  return (
    <div className="imgBox">
      <ImageList sx={{ maxWidth: "650px" }} cols={2} rowHeight={150}>
        {props.img_list.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => ReactZmage.browsing({ src: item })}
          >
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
            <img src={item} alt="img" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImgBox;
