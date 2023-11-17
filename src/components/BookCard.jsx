import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Edit } from "@mui/icons-material";
import Link from "next/link";

const BookCard = ({book}) => {
    const {id, title, author, image, price, currency, category, description} = book;
  return (
      <Card sx={{ maxWidth: 345 }}>
          <CardHeader
              avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {author[0]}
                  </Avatar>
              }
              title={title}
              subheader={author}
          />
          <CardMedia
              style={{height: "300px", 
                        width: "300px",
                        objectFit: "contain",
                        margin: "0 auto"
            }}
              component="img"
              height="194"
              image={image ? image : "https://picsum.photos/200/300"}
              alt="book image"
          />
          <CardContent>
              <Typography variant="body2" color="text.secondary">
                  {description.slice(0, 100) + "..."}
              </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Link href={`/edit-books/${id}`}>
              <IconButton aria-label="edit">
                  <Edit />
              </IconButton>
                <Typography
                variant="h6"
                >
                    {currency}{ price}
                </Typography>
            </Link>
          </CardActions> 
      </Card>
  )
};

export default BookCard;
