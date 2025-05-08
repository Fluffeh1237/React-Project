import React, { useState, useEffect } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import InputField from '../components/shared/InputField';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: newNote.title,
          content: newNote.content,
          date: new Date().toLocaleDateString()
        }
      ]);
      setNewNote({ title: '', content: '' });
    }
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Notes</h1>
      
      <Card className="mb-4">
        <InputField
          label="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({...newNote, title: e.target.value})}
          placeholder="Enter note title..."
          className="mb-3"
        />
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            placeholder="Enter note content..."
            rows="3"
          />
        </div>
        <Button onClick={addNote}>Add Note</Button>
      </Card>

      <div className="row g-4">
        {notes.map(note => (
          <div key={note.id} className="col-md-6">
            <Card title={note.title}>
              <p className="text-muted small">{note.date}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
              <div className="text-end">
                <Button 
                  onClick={() => deleteNote(note.id)} 
                  variant="danger"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes; 