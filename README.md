# imMail Meet Embedding

The imMail Meet is a video conferencing web software compatible with WebRTC.

The main goal here is to show you a practical example of code in order to help during the imMail Meet embedding in your application.

## Prerequisites:

- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [NodeJS v14.x](https://nodejs.org/dist/latest-v14.x/)

## Clone the repository and install the dependencies

```
git clone https://github.com/immail/meet-embedding.git
npm i
```

## Generate the API Key

1. Once you are signed up to (immail.ca)[https://immail.ca] you have to be subscribed to the VIDEO CONFERENCE service in order to consume with the API Key the video conference routes on imMail's API. If you do know if you are subscribed, please contact us ( support@immail.ca ).
2. Go to Manage Domain on the top right corner menu and find the API Key.
3. Click on Generate API Key button (_and this API Key in a safe place. Only use that for server-to-server calls, never on the client-side._)
_If you are an imMail Partner, you are going find the API Key page on the Partner's Dashboard._

## Set the API Key and EMAIL Domain

1. Open the file `index.js`
2. Set for the constant `EMAIL_DOMAIN` at top of the file the **email domain of the company**.
```
E.g.:
EMAIL_DOMAIN="companyxpto.com"
```
3. Set for the constant `API_KEY` the api key that you just generated.
_Remember, this is only a example project, never set the API Key hard coded like this. For a production projet it's better keep it in a env variable._

## Run the app
```
node index.js
```

## Access in the browser
1. Go to the browser and access (https:/localhost:3000/)[https://localhost:3000]
2. 
