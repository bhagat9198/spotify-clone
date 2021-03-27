const express = require("express");
const bodyParser = require("body-parser");
const SpotifyWebApiNode = require("spotify-web-api-node");
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());
// app.use(bodyParser.usrEncodes(true));

app.post("/login", (req, res, next) => {
	const code = req.body.code;

  const spotifyApi = new SpotifyWebApiNode({
    redirectUri: "http://localhost:3000",
    clientId: "4dc3bff3fc674b34a7e0016748cdc650",
    clientSecret: "c3c57a364c0143d0af97b20b8ba4bc81",
  });

	spotifyApi.authorizationCodeGrant(code).then(data => {
		console.log(data);
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in
		})
	}).catch(error => {
		console.log(error);
		res.status(400);
	})
});


app.post('/refresh', (req, res, next) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApiNode({
    redirectUri: "http://localhost:3000",
    clientId: "4dc3bff3fc674b34a7e0016748cdc650",
    clientSecret: "c3c57a364c0143d0af97b20b8ba4bc81",
		refreshToken,
  });

	spotifyApi.refreshAccessToken().then(data => {
			// console.log('The access token has been refreshed!');
			// spotifyApi.setAccessToken(data.body['access_token']);
			console.log(data.body);
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn
			})
		}).catch(error => {
			console.log('Could not refresh access token', error);
			res.status(400);
		})
})

app.listen(4000);