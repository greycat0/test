import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import React from "react";

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  image,
  onDelete,
  onClick,
}) => {
  return (
    <Card
      sx={{ width: 200, display: "flex", flexDirection: "column" }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" image={image} alt="green iguana" />
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        sx={{ justifyContent: "flex-end", marginTop: "auto" }}
      >
        {onDelete && (
          <IconButton onClick={onDelete} sx={{ marginLeft: "auto" }}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

type ImageCardProps = {
  title: string;
  image: string;
  onDelete?: (event: any) => void;
  onClick?: (event: any) => void;
};

export default ImageCard;
