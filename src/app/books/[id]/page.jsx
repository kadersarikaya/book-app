"use client";
import { Container, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BookDetail = () => {
  const params = useParams();
  const {id} = params;
  const router = useRouter();
  const [book, setBooks] = useState(null);
  const [comments, setComments] = useState([]); 

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/books/${id}`)
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => console.log(error));
    }
    const getComments = () => axios
    .get(`http://localhost:4000/comments/${id}`)
    .then((res)=> {
      setComments(res.data)
    })
    .catch((error) => console.log(error));

    getComments();
    
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Container sx={{
        display: "flex", 
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
      }} >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: "20px"
      }}  >
        <img
          width={300}
          height={400}
          src={book.image ? book.image : "https://picsum.photos/200/300"}
          alt={book.title}
          loading="lazy"
        />
        <Box sx={{ flexGrow: 1,
          padding: "20px",
          width: "50%",
        }}>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="h5">{book.author}</Typography>
          <Typography variant="h6">
            {book.currency} {book.price}
          </Typography>
          <Typography variant="body">{book.description}</Typography>
        </Box>
      </Box>
      <Box sx={{padding: 5}} >
        <Typography
         variant='h5'>
      Comments: 
        </Typography>
      <ul>
        <li>
          {comments.comment} ~ {comments.author}
        </li>
      </ul>
      </Box>
    </Container>
  );
};

export default BookDetail;
