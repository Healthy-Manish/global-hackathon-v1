const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET all memories
router.get('/', (req, res) => {
  console.log('📖 Fetching memories from database...');
  
  const sql = `
    SELECT m.*, 
    (SELECT GROUP_CONCAT(p.image_path) FROM photos p WHERE p.memory_id = m.id) as photos 
    FROM memories m 
    ORDER BY m.year ASC, m.created_at DESC
  `;
  
  db.all(sql, (err, rows) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ 
        error: 'Failed to fetch memories',
        details: err.message 
      });
    }
    
    const memories = rows.map(row => ({
      id: row.id,
      title: row.title || 'Untitled Memory',
      transcript: row.transcript || 'No transcript available',
      year: row.year || new Date().getFullYear(),
      location: row.location || 'Unknown location',
      audio_path: row.audio_path,
      created_at: row.created_at || new Date().toISOString(),
      photos: row.photos ? row.photos.split(',') : []
    }));
    
    res.json({
      success: true,
      count: memories.length,
      memories: memories
    });
  });
});

// POST - Create new memory (MAKE SURE THIS EXISTS)
router.post('/', (req, res) => {
  console.log('💾 POST /api/memories - Creating new memory...', req.body);
  
  const { title, transcript, year, location } = req.body;
  
  // Validation
  if (!title || !transcript) {
    return res.status(400).json({ 
      success: false,
      error: 'Title and transcript are required' 
    });
  }

  if (!year) {
    return res.status(400).json({ 
      success: false,
      error: 'Year is required' 
    });
  }

  const sql = `INSERT INTO memories (title, transcript, year, location) VALUES (?, ?, ?, ?)`;
  
  db.run(sql, [title, transcript, year, location || ''], function(err) {
    if (err) {
      console.error('❌ Database insert error:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to create memory',
        details: err.message 
      });
    }

    console.log('✅ Memory created with ID:', this.lastID);
    
    res.status(201).json({
      success: true,
      message: 'Memory created successfully',
      memory: {
        id: this.lastID,
        title,
        transcript, 
        year,
        location: location || ''
      }
    });
  });
});

// POST test endpoint (keep this for now)
router.post('/test', (req, res) => {
  console.log('🧪 POST /api/memories/test - Creating test memory');
  
  const testMemory = {
    title: "Test Memory from API",
    transcript: "This is a test memory created via API call.",
    year: 2023,
    location: "Test Location"
  };
  
  db.run(
    `INSERT INTO memories (title, transcript, year, location) VALUES (?, ?, ?, ?)`,
    [testMemory.title, testMemory.transcript, testMemory.year, testMemory.location],
    function(err) {
      if (err) {
        console.error('❌ Error creating test memory:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Failed to create test memory',
          details: err.message 
        });
      }
      
      res.json({
        success: true,
        message: 'Test memory created successfully',
        memory: {
          id: this.lastID,
          ...testMemory
        }
      });
    }
  );
});

module.exports = router;