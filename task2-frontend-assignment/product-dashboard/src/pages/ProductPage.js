import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Box, TextField, MenuItem, AppBar, Toolbar, Button, Pagination } from '@mui/material';

const API_BASE = process.env.REACT_APP_API_BASE;

const sortOptions = [
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
  { value: 'title', label: 'Name' },
];

const PAGE_SIZE = 12;

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    // Use DummyJSON search endpoint if search is present
    const url = search
      ? `${API_BASE}/products/search?q=${encodeURIComponent(search)}`
      : `${API_BASE}/products`;
    axios.get(url)
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
        setPage(1); // Reset to first page on new search
      });
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  // Sort products
  const sorted = [...products].sort((a, b) => {
    if (sort === 'price') return a.price - b.price;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  // Pagination
  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Product Dashboard</Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ bgcolor: 'white', borderRadius: 1, mr: 2 }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <TextField
            select
            label="Sort By"
            value={sort}
            onChange={e => setSort(e.target.value)}
            size="small"
            sx={{ bgcolor: 'white', borderRadius: 1, mr: 2 }}
          >
            {sortOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </TextField>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginated.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.thumbnail}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography color="text.secondary">${product.price}</Typography>
                      <Typography color="text.secondary">Rating: {product.rating}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductPage;
