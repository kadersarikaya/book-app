"use client"
import Image from 'next/image'
import './page.module.css'
import Link from 'next/link'
import BookCard from '@/components/BookCard'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {styled, alpha} from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Home() {
  const [books, setBooks] = useState([])
  const [query,setQuery] = useState("")

 useEffect(() => {
  axios
  .get('http://localhost:4000/books')
  .then(res => {
    setBooks(res.data)
 })
  .catch(err => console.log(err));
 }, [])

 useEffect(() => {
  const Search = () => {
    axios
    .get(`http://localhost:4000/books?q=${query}`)
    .then(res => {
      if(query) {
        setBooks(res.data)
      }
    }).catch(err => console.log(err));
  }

  Search();
 }, [query])

  return (
    <Box sx={{ flexGrow: 1, 
     padding: '20px', 
      margin: '0 auto', 
    }}>
      <Box sx={{ display: 'flex', justifyContent:
       'start', alignItems: 'center', marginY: '20px' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e)=>setQuery(e.target.value)}
          />
        </Search>
      </Box>
      <Grid container spacing={2}>
      {books &&
        books.map((book)=> (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
        </Grid>
      ))}
      </Grid>
    </Box>
  )
}
