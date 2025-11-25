import express from 'express';
import session from 'express-session';
import auth from 'easy-oauth';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Configure OAuth providers
auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }
  },
  redirectUri: `http://localhost:${PORT}/auth/callback`
});

// Extend session type
declare module 'express-session' {
  interface SessionData {
    user: any;
    oauthState: string;
  }
}

// Home page
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`
      <h1>Welcome, ${req.session.user.name}!</h1>
      <p>Email: ${req.session.user.email || 'N/A'}</p>
      <p>Provider: ${req.session.user.provider}</p>
      <img src="${req.session.user.avatar}" alt="Avatar" style="width: 100px; border-radius: 50%;">
      <br><br>
      <a href="/logout">Logout</a>
      <br><br>
      <pre>${JSON.stringify(req.session.user, null, 2)}</pre>
    `);
  } else {
    res.send(`
      <h1>Easy OAuth - Express Example</h1>
      <p>Login with:</p>
      <ul>
        <li><a href="/auth/login/google">Google</a></li>
        <li><a href="/auth/login/github">GitHub</a></li>
        <li><a href="/auth/login/facebook">Facebook</a></li>
      </ul>
    `);
  }
});

// Login route - redirect to provider
app.get('/auth/login/:provider', (req, res) => {
  try {
    const { provider } = req.params;
    
    // Generate and store state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    req.session.oauthState = state;
    
    // Get authorization URL and redirect
    const authUrl = auth.url(provider, state);
    res.redirect(authUrl);
  } catch (error: any) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

// OAuth callback route
app.get('/auth/callback/:provider', async (req, res) => {
  try {
    const { provider } = req.params;
    
    // Verify state parameter (CSRF protection)
    if (req.query.state !== req.session.oauthState) {
      throw new Error('Invalid state parameter');
    }
    
    // Handle OAuth callback
    const user = await auth.callback(provider, req);
    
    // Store user in session
    req.session.user = user;
    
    // Redirect to home page
    res.redirect('/');
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    res.status(400).send(`
      <h1>Authentication Failed</h1>
      <p>${error.message}</p>
      <a href="/">Try again</a>
    `);
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// API endpoint to get current user
app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Configured providers: ${auth.getConfiguredProviders().join(', ')}`);
});

