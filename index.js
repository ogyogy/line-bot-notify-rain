'use strict';
const line = require('@line/bot-sdk');
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

exports.handler = function (event, context) {
    const message = {
        'type': 'text',
        'text': 'hello'
    };
    client.pushMessage(process.env.USERID, message)
        .then((response) => {
            let lambdaResponse = {
                statusCode: 200,
                headers: { "X-Line-Status": "OK" },
                body: '{"result":"completed"}'
            };
            context.succeed(lambdaResponse);
        }).catch((err) => console.log(err));
};