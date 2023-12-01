const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');

const path = require('path');
require('dotenv').config();
const router = express.Router();
// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-images');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Handle profile image upload
router.post('/upload-profile-image', upload.single('profileImage'), (req, res) => {
  const imageUrl = `/uploads/profile-images/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  filename: String,
  filepath: String
});
const Post = mongoose.model('Post', postSchema);

const commentSchema = new mongoose.Schema({
  text: String,
  postId: String,
  createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model('Comment', commentSchema);

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ 
      email: req.body.email, 
      username: req.body.username, 
      password: hashedPassword 
    });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error registering new user');
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    } else {
      res.status(401).send('Login failed: Incorrect email or password');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/forum/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

app.post('/api/forum/posts', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).send('User not found');

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: user.username,
      filename: req.file?.filename,
      filepath: req.file?.path
    });

    await newPost.save();
    res.status(201).send('Post created successfully');
  } catch (error) {
    console.error('Error creating a new post:', error);
    res.status(500).send('Error creating a new post');
  }
});

app.get('/api/userinfo', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching user info');
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error fetching comments');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
