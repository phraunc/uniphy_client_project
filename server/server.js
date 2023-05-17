const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const foodRouter = require('./routes/food.router');
const occupationRouter = require('./routes/occupation.router')
const socialRouter = require('./routes/social.router');
const sleepRouter = require('./routes/sleep.router')
const movementRouter = require('./routes/movement.router')
const balancescoreRouter = require('./routes/balancescore.router')
const workRouter = require('./routes/work.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/api/occupation', occupationRouter)
app.use('/api/social', socialRouter);
app.use('/api/sleep', sleepRouter)
app.use('/api/movement', movementRouter);
app.use('/api/balancescore', balancescoreRouter);
app.use('/api/work',workRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
