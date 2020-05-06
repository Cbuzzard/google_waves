import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const axios = require("axios");
const fs = require("fs");

import {dialogflow, SimpleResponse, BasicCard, Button, Image} from 'actions-on-google';

const app = dialogflow({ debug: true });

const myUrl = 'https://magicseaweed.com/Clearwater-Surf-Report/60/';

const fetchPage = async function(url: any) {
    try {
        const result = await axios.get(url);
        const $ = cheerio.load(result.data);
        //const monday = $('.scrubber-bars-container').first();
        //const monday = $('.scrubber-bar.scrubber-graph').first();
        const monday = $('.text-lower.light').first();
        

        console.log(monday);

  //console.log(result.data)
  return result.data;
    } catch(err) {
    console.log(err);
    }
};

fetchPage(myUrl);



app.intent('Get Wave Date', async (conv) => {
    const data = await scrapePage();
    conv.close(new SimpleResponse({
        text: `Waves are awesome`,
        speech: `Waves are awesome`
    }));

    conv.close(new BasicCard({
        title: 'I think I will put a graph here?',
        image: new Image({
            url: 'http://buzzardsview.com/facebook.png',
            alt: 'http://buzzardsview.com/dean.png'
        }),
        buttons: new Button({
            title: 'waves',
            url: 'http://buzzardsview.com/'
        })
    }));
});










async function scrapePage(){
    const page = await fetch('https://magicseaweed.com/Clearwater-Surf-Report/60/');
    const html = await page.text();

    const $ = cheerio.load(html);

    const monday = $('.scrubber-bars-container').first();
    console.log(monday.find('.forecast-graph-text-container'));

    //return monday.attr();
    return monday;
};
// async function test() {
//     scrapePage().then(data => {
//         console.log(data);
//     })
// }
// scrapePage();
// monday.then(function(result) {
//     console.log(result);
// });


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
