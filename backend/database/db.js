const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Get absolute path to database
const dbPath = path.resolve(process.env.DB_PATH || './memories.db');
console.log('🔧 Database path:', dbPath);

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Created database directory:', dbDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    console.error('📁 Database file exists:', fs.existsSync(dbPath));
  } else {
    console.log('✅ Connected to SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Create memories table with error handling
  const createMemoriesTable = `
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      transcript TEXT,
      audio_path TEXT,
      year INTEGER,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.run(createMemoriesTable, (err) => {
    if (err) {
      console.error('❌ Error creating memories table:', err.message);
    } else {
      console.log('✅ Memories table ready');
      
      // Check if we have any memories, if not, add sample data
      db.get('SELECT COUNT(*) as count FROM memories', (err, result) => {
        if (!err && result.count === 0) {
          console.log('📝 Adding sample memories...');
          addSampleMemories();
        }
      });
    }
  });

  // Create photos table
  const createPhotosTable = `
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_id INTEGER,
      image_path TEXT,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(memory_id) REFERENCES memories(id) ON DELETE CASCADE
    )
  `;
  
  db.run(createPhotosTable, (err) => {
    if (err) {
      console.error('❌ Error creating photos table:', err.message);
    } else {
      console.log('✅ Photos table ready');
    }
  });
}

function addSampleMemories() {
  const sampleMemories = [
    {
      title: "My First Day at School",
      transcript: "I remember walking to school with my little red backpack. The building seemed so huge, and I was both excited and nervous to meet my teacher and new friends.",
      year: 1955,
      location: "Springfield Elementary"
    },
    {
      title: "Summer Vacation at the Lake",
      transcript: "Every summer we would drive up to the lake house. The smell of pine trees and the sound of crickets at night are memories I'll always cherish. We'd swim all day and roast marshmallows at night.",
      year: 1968,
      location: "Crystal Lake"
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO memories (title, transcript, year, location) 
    VALUES (?, ?, ?, ?)
  `);

  sampleMemories.forEach(memory => {
    insertStmt.run([memory.title, memory.transcript, memory.year, memory.location], (err) => {
      if (err) {
        console.error('Error inserting sample memory:', err);
      }
    });
  });

  insertStmt.finalize();
  console.log('✅ Sample memories added');
}

module.exports = db;