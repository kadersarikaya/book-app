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
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { useRouter } from "next/navigation";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookCard = ({book, setBooks, books}) => {
    const {id, title, author, image, price, currency, category, description} = book;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();

    const handleDelete = async (id) => {
        try {
           const res = await axios.delete(`http://localhost:4000/books/${id}`);
           console.log(res);
           if(res) {
            const filtered = books.filter((book)=> book.id !== id );
            setBooks(filtered);
           } 
           setOpen(false);
            setBooks(...res.data);
        } catch (error) {
            console.log(error);
        }
        // await axios.delete(`http://localhost:4000/books/${id}`);
        // Silme işlemi başarılı olduktan sonra sayfayı yeniden yükle.
    };
  return (
    <div className="">
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
        <CardActions sx={{display:"flex", justifyContent:"space-between" }} disableSpacing>
            <Link href={`/books/${book.id}`}>
                <Button variant="" color="primary">
                    View
                </Button>
            </Link>
        <Link href={`/edit-books/${id}`}>
            <IconButton aria-label="edit">
                <Edit />
            </IconButton>
        </Link>
            <IconButton onClick={handleOpen}>
            <Delete />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete this book?
                    </Typography>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleDelete(id)}>Delete</Button>
                </Box>
            </Modal>
            <Typography
            variant="h6"
            >
            {price} {currency } 
            </Typography>            
        </CardActions> 
        </Card>
    </div>
  )
};

export default BookCard;
