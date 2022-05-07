import React, { useState } from "react";
import { Button, Grid, Slider } from "@arco-design/web-react";
import {
  IconMinus,
  IconPlus,
  IconRotateLeft,
} from "@arco-design/web-react/icon";
import EasyCropper, { Area } from "react-easy-crop";

async function _getCroppedImg(url: string, pixelCrop: Area, rotation = 0) {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx || !image) {
    return null;
  }
  const imageSize =
    2 * ((Math.max(image.width, image.height) / 2) * Math.sqrt(2));
  canvas.width = imageSize;
  canvas.height = imageSize;

  if (rotation) {
    ctx.translate(imageSize / 2, imageSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-imageSize / 2, -imageSize / 2);
  }

  ctx.drawImage(
    image,
    imageSize / 2 - image.width / 2,
    imageSize / 2 - image.height / 2
  );
  const data = ctx.getImageData(0, 0, imageSize, imageSize);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - imageSize / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - imageSize / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });
}

interface IProps {
  file: File;
  onOk: (file: File) => void;
  onCancel: () => void;
}

export const Cropper = (props: IProps) => {
  const { file } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(360);
  const [newFile, setNewFile] = useState(file);

  const url = React.useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  return (
    <div>
      <div style={{ width: "100%", height: 280, position: "relative" }}>
        <EasyCropper
          style={{ containerStyle: { width: "100%", height: 280 } }}
          cropSize={{ width: 280, height: 280 }}
          aspect={4 / 4}
          image={url}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          cropShape="round"
          showGrid={false}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={async (_, pixels) => {
            // console.log(pixels);
            const blob = await _getCroppedImg(url || "", pixels, rotation);
            if (blob) {
              const newFile = new File([blob], file.name || "image", {
                type: file.type || "image/*",
              });
              setNewFile(newFile);
            }
          }}
        />
      </div>
      <Grid.Row
        justify="space-between"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Grid.Row style={{ flex: 1, marginLeft: 12, marginRight: 12 }}>
          <IconMinus
            style={{ marginRight: 10 }}
            onClick={() => {
              setZoom(Math.max(1, zoom - 0.1));
            }}
          />
          <Slider
            style={{ flex: 1 }}
            step={0.1}
            value={zoom}
            onChange={(v) => {
              setZoom(v as number);
            }}
            min={0.8}
            max={3}
          />
          <IconPlus
            style={{ marginLeft: 10 }}
            onClick={() => {
              setZoom(Math.min(3, zoom + 0.1));
            }}
          />
        </Grid.Row>
        <IconRotateLeft
          onClick={() => {
            setRotation(rotation - 90);
          }}
        />
      </Grid.Row>

      <Grid.Row justify="end">
        <Button onClick={props.onCancel} style={{ marginRight: 20 }}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => {
            props.onOk(newFile);
          }}
        >
          Ok
        </Button>
      </Grid.Row>
    </div>
  );
};
