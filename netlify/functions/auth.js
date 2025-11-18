const axios = require('axios');

exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  // Handle initial auth request - redirect to GitHub
  if (!code) {
    const client_id = process.env.OAUTH_CLIENT_ID;
    const redirect_uri = `${process.env.URL}/.netlify/functions/auth`;
    const scope = 'repo,user';
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scope}`;
    
    return {
      statusCode: 302,
      headers: {
        Location: authUrl,
      },
    };
  }

  // Handle callback with code
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;

    // Return success page that posts message to opener
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authorization successful</title>
      </head>
      <body>
        <script>
          (function() {
            // *** FIX: Changed window.location.origin to '*' to allow cross-origin communication ***
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token: access_token, provider: 'github' })}',
              '*' 
            );
            window.close();
          })();
        </script>
      </body>
    </html>
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed', details: error.message }),
    };
  }
};
