const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const mongo = process.env.MONGODB_URI

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.listen()