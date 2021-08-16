const express = require('express')
const cors = require('cors')
const path = require("path")
const axios = require('axios')
const port = 3000
const API_URL = 'https://stageapi.immailapp.ca'
const EMAIL_DOMAIN = 'companyxpto.com'
// const API_KEY = 'c6e235cf-329c-4a95-8d1b-8262c28b4a6b'
const API_KEY = 'cbed6859-d2a1-469a-8949-b5e3a0f2b9a9' // Go to immail.ca > Sign in > Manage domain > API Key

const app = express()

app.use(cors())

/**
 * Services
 */
const getAuthToken = async () => {
  const options = {
    method: 'POST',
    url:   `${API_URL}/auth/token`,
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': API_KEY,
    },
    data: { email_domain: EMAIL_DOMAIN }
  };

  const response = await axios(options);
  const { token } = response.data;
  return token;
}

const createMeetingRoom = async (authToken) => {
  const options = {
    method: 'POST',
    url:   `${API_URL}/v2/videoconference/schedule`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    data: {
      "topic": "Consulting",
      "start_at": "2021-11-29 10:15",
      "duration": 60
    }
  }

  const response = await axios(options);
  return response.data;
}

const getMeetToken = async (authToken, roomName, moderator = false) => {
  const options = {
    method: 'POST',
    url:   `${API_URL}/v2/videoconference/token`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    data: { room_name: roomName, moderator }
  };

  const response = await axios(options);
  const { token } = response.data;
  return token;
}

/**
 * Routes
 */
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/styles.css', function(request, response){
  response.sendFile(path.join(__dirname + '/css/styles.css'));
});

app.get('/room/create', async (req, res) => {
  try {
    const authToken = await getAuthToken()
    const room = await createMeetingRoom(authToken)
  
    res.status(200).json(room)
  } catch (err) {
    res.status(500).end(err.stack)
  }
})

app.get('/token/participant', async (req, res) => {
  try {
    const { roomName, moderator } = req.query;
    const authToken = await getAuthToken()
    const meetToken = await getMeetToken(authToken, roomName, moderator === 'true')
  
    res.status('200').json(meetToken);
  } catch (err) {
    res.status(500).end(err.stack);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})