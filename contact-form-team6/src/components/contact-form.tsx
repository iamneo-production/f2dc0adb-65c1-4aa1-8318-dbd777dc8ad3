import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, Container } from '@mui/material';
import "../index.css";
import axios from 'axios';
function ContactForm() {

  interface Item {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [items, setItems] = useState<Item[]>([]);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchItems = async () => {
    const response = await axios.get<Item[]>("https://ide-edecaacdccfedcaeecccddcbdecaacaebdefcfda.premiumproject.examly.io/proxy/8081/contact");
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const addContact = async () => {
    if (name.trim() === "") return;

    const newItem = { name: name, email: email, subject: subject, message: message };
    await axios.post("https://ide-edecaacdccfedcaeecccddcbdecaacaebdefcfda.premiumproject.examly.io/proxy/8081/contact", newItem);

    fetchItems();
  };

  const deleteContact = async (id: number) => {
    await axios.delete(`https://ide-edecaacdccfedcaeecccddcbdecaacaebdefcfda.premiumproject.examly.io/proxy/8081/contact/${id}`);
    fetchItems();
  };


  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };


  const handleSaveEdit = async () => {
    if (!selectedItem) return;


    await axios.put(`https://ide-edecaacdccfedcaeecccddcbdecaacaebdefcfda.premiumproject.examly.io/proxy/8081/contact/${selectedItem.id}`, selectedItem);


    setEditModalOpen(false);
    fetchItems();
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Contact Us
            </Typography>
            <div>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Subject"
                variant="outlined"
                name="subject"
                fullWidth
                margin="normal"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                label="Message"
                variant="outlined"
                name="message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" onClick={addContact}>
                Submit
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>

<br></br>
      <Container maxWidth="md" >
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                  onClick={() => handleEditItem(item)}
                  >
                    {/* <p>Edit</p> */}
                    <Button variant="contained" color="success">
                      Edit
                    </Button>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    {/* <p>Delete</p> */}
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Contact Details</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div>
              {/* Edit fields, pre-filled with selected item's details */}
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem((prev:any) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedItem.email}
                onChange={(e) =>
                  setSelectedItem((prev:any) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedItem.subject}
                onChange={(e) =>
                  setSelectedItem((prev:any) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedItem.message}
                onChange={(e) =>
                  setSelectedItem((prev:any) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
              {/* ... (other fields) */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactForm;
