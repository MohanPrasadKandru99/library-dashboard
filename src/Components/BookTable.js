import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, TableSortLabel, Paper, TextField, Button, Box, Typography
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { fetchBooks, fetchAuthor } from '../Services/ApiService';
import { useAuth } from '../Context/AuthContext';
import styled from '@emotion/styled';

const colors = [
  ['#f8bbd0', '#f48fb1'],
  ['#e1bee7', '#ce93d8'],
  ['#c5cae9', '#9fa8da'],
  ['#bbdefb', '#90caf9'],
  ['#b2dfdb', '#80cbc4'],
  ['#c8e6c9', '#a5d6a7'],
  ['#dcedc8', '#c5e1a5'],
  ['#fff9c4', '#fff59d'],
  ['#ffecb3', '#ffe082'],
  ['#ffe0b2', '#ffcc80']
];

const getGradient = (scrollPosition) => {
  const index = Math.floor((scrollPosition / window.innerHeight) % colors.length);
  const [startColor, endColor] = colors[index];
  return `linear-gradient(120deg, ${startColor}, ${endColor})`;
};

const BookTableContainer = styled(Paper)`
  transition: background 0.5s ease;
  padding: 20px;
  min-height: 100vh;
`;

const Watermark = styled(Typography)`
position: fixed;
bottom: 10px;
left: 25rem;
opacity: 0.1;
z-index: 1;
`;

const DeveloperCard = styled(Box)`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
`;

const BookTable = () => {
  const { logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [searchQuery, setSearchQuery] = useState('the lord of the rings');
  const [csvData, setCsvData] = useState([]);
  const [bgGradient, setBgGradient] = useState(getGradient(0));

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'author_name', label: 'Author Name' },
    { id: 'first_publish_year', label: 'First Publish Year' },
    { id: 'subject', label: 'Subject' },
    { id: 'ratings_average', label: 'Ratings Average' },
    { id: 'author_birth_date', label: 'Author Birth Date' },
    { id: 'author_top_work', label: 'Author Top Work' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchBooks(searchQuery, page + 1, rowsPerPage);
      const booksWithAuthors = await Promise.all(result.map(async (book) => {
        if (book.author_key && book.author_key.length > 0) {
          const author = await fetchAuthor(book.author_key[0]);
          return {
            ...book,
            author_birth_date: author.birth_date,
            author_top_work: author.top_work
          };
        }
        return book;
      }));
      setBooks(booksWithAuthors);
      setCsvData(booksWithAuthors.map(book => ({
        title: book.title,
        author_name: book.author_name?.join(', '),
        first_publish_year: book.first_publish_year,
        subject: book.subject?.join(', '),
        ratings_average: book.ratings_average,
        author_birth_date: book.author_birth_date,
        author_top_work: book.author_top_work
      })));
    };
    fetchData();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setBgGradient(getGradient(scrollPosition));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, rowsPerPage, searchQuery]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({top:0,behavior:'auto'})
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    fetchBooks(searchQuery, 1, rowsPerPage);
  };

  return (
    <BookTableContainer style={{ background: bgGradient }}>
      <Button variant="contained" color="secondary" onClick={logout} style={{ margin: '20px' }}>
        Logout
      </Button>
      <TextField
        label="Search by author"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: '20px 0' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginBottom: '20px' }}>
        Search
      </Button>
      <CSVLink data={csvData} filename={"books.csv"} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" style={{ marginBottom: '20px' }}>
          Download CSV
        </Button>
      </CSVLink>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.key}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author_name?.join(', ')}</TableCell>
                <TableCell>{book.first_publish_year}</TableCell>
                <TableCell>{book.subject?.join(', ')}</TableCell>
                <TableCell>{book.ratings_average}</TableCell>
                <TableCell>{book.author_birth_date}</TableCell>
                <TableCell>{book.author_top_work}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeveloperCard>
        <Typography variant="h6">Mohan S R Prasad Kandru</Typography>
        <Typography variant="body2">Software Engineer</Typography>
        <Typography variant="body2">
          <a href="https://www.linkedin.com/in/mohan-s-r-p-kandru-99b03516b/" target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </Typography>
      </DeveloperCard>
      <Watermark variant="h1">Nua Assignment</Watermark>
    </BookTableContainer>
  );
};

export default BookTable;
