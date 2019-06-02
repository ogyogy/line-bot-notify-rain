'use strict';
const line = require('@line/bot-sdk');
const request = require('request');
const xml2js = require("xml2js");
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

function getWeatherEmoji(weather) {
    const weathers = {
        '晴': '\u2600',
        'くもり': '\u2601',
        '雨': '\u2614'//,
        // '雪': '\u2744'
    }
    let emojis = [];
    for (let key in weathers) {
        let index = weather.indexOf(key);
        if (index != -1) {
            emojis.push({
                index: index,
                emoji: weathers[key]
            })
        }
    }
    emojis.sort(
        function (a, b) {
            if (a.index < b.index) return -1;
            else if (a.index > b.index) return 1;
            return 0;
        }
    )
    let emoji = '';
    for (let i in emojis) {
        emoji += emojis[i].emoji;
    }
    return emoji;
}

exports.handler = function (event, context) {
    // 天気情報を Japan Weather Forecast xml から取得
    // https://www.drk7.jp/weather/
    request.get({
        url: 'https://www.drk7.jp/weather/xml/14.xml',
    }, function (error, response, body) {
        xml2js.parseString(body.toString(), (err, res) => {
            try {
                let text = '';
                let today = res.weatherforecast.pref[0].area[0].info[0]
                // let date = today.$.date;
                let weather = today.weather[0];
                text += getWeatherEmoji(weather);
                let max_chance_rain = 0;
                // let max_chance_rain_hour = null;
                let periods = today.rainfallchance[0].period;
                let chance_rain_str = '';
                periods.forEach(function (value) {
                    // let hour = value.$.hour;
                    let chance_rain = Number(value._);
                    if (max_chance_rain < chance_rain) {
                        max_chance_rain = chance_rain;
                        // max_chance_rain_hour = hour;
                    }
                    chance_rain_str += value._ + '%/';
                });
                chance_rain_str = chance_rain_str.replace(/\/$/, '');
                text += ' ' + chance_rain_str;
                const message = {
                    'type': 'text',
                    'text': text
                };
                client.pushMessage(process.env.USERID, message);
            } catch (err) {
                client.pushMessage(process.env.USERID, {
                    'type': 'text',
                    'text': err.toString()
                });
            }
        });
    });
};