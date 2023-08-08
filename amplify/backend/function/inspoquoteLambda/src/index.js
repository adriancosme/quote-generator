/* Amplify Params - DO NOT EDIT
    API_QUOTEGENERATOR_GRAPHQLAPIIDOUTPUT
    API_QUOTEGENERATOR_QUOTEAPPDATATABLE_ARN
    API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */

// AWS PACKAGES
import AWS from 'aws-sdk';
import sharp from 'sharp';
import fetch from 'node-fetch';
import path from 'path';
import { getFiles } from "./utilities/files.js";
import fs from "fs";

const API_URL = "https://zenquotes.io/api/random";
const IMAGE_WIDTH = 750;
const IMAGE_HEIGHT = 483;
const LINE_BREAK = 4;
const BACKGROUND_IMAGES = getFiles("./backgrounds");
const IMAGE_PATH = path.join('/tmp', 'quote-card.png')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Function to update DynamoDB table 
async function updateQuoteDDBObject() {
    const quoteTableName = process.env.API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME;
    const quoteObjectId = "1336f039-419f-41e2-b9b8-3dc8d4902aa5";
    try {
        const quoteParams = {
            TableName: quoteTableName,
            Key: {
                "id": quoteObjectId
            },
            UpdateExpression: "SET #quotesGenerated = #quotesGenerated + :inc",
            ExpressionAttributeValues: {
                ":inc": 1
            },
            ExpressionAttributeNames: {
                "#quotesGenerated": "quotesGenerated",
            },
            ReturnValues: "UPDATED_NEW"
        };
        const quoteResponse = await dynamoDb.update(quoteParams).promise();
        console.log('Quote updated successfully', quoteResponse);
        return quoteResponse;
    } catch (err) {
        console.log('Error updating DynamoDB table', err);
    }
}

async function getRandomQuote(apiUrl) {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("There's an error trying to get a quote");
    }
    const data = await response.json();
    const quoteText = data[0].q;
    const quoteAuthor = data[0].a;
    const tspanElements = await convertToTspan(quoteText);
    const svg = await buildSVG(tspanElements, quoteAuthor);
    await svgToImage(svg);
}

async function convertToTspan(quote) {
    const words = quote.split(" ");
    let newText = "";
    let tspanElements = "";
    for (let i = 0; i < words.length; i++) {
        newText += words[i] + " ";
        if ((i + 1) % LINE_BREAK === 0) {
            tspanElements += `<tspan x="${IMAGE_WIDTH / 2
                }" dy="1.2em">${newText}</tspan>`;
            newText = "";
        }
    }
    if (newText !== "") {
        tspanElements += `<tspan x="${IMAGE_WIDTH / 2
            }" dy="1.2em">${newText}</tspan>`;
    }
    return tspanElements;
}

async function buildSVG(tspans, author) {
    const svg = `<svg width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}">
          <style>
              .title {
                  fill: #fff;
                  font-size: 20px;
                  font-weight: 700;
              }
              .quoteAuthor {
                  font-size: 35px;
                  font-weight: 700;
                  padding: 50px;
              }
              .footer {
                  font-size: 20px;
                  font-weight: 700;
                  fill: lightgrey;
                  text-anchor: middle;
                  font-family: Verdana;
              }
          </style>
          <circle cx="382" cy="76" r="44" fill="rgba(255,255,255, 0.155)" />
          <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">“</text>
              <g>
                  <rect x="0" y="0" width="${IMAGE_WIDTH}" height="auto"></rect>
                  <text id="lastLineOfQuote" x="375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
                      ${tspans}
                      <tspan class="quoteAuthor" x="375" dy="1.8em">- ${author}</tspan>
                  </text>
              </g>
              <text x="${IMAGE_WIDTH / 2}" y="${IMAGE_HEIGHT - 10
        }" class="footer">
                  Developed by @adriancosme | Quotes from ZenQuotes.io
              </text>
      </svg>`;
    return svg;
}

async function svgToImage(svg) {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
    const selectedBG = BACKGROUND_IMAGES[randomIndex];

    const svgBuffer = Buffer.from(svg);
    console.log('Before save');
    const image = await sharp(selectedBG)
        .composite([{ input: svgBuffer, top: 0, left: 0 }])
        .resize({
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
        })
        .toFile(IMAGE_PATH);
    console.log('After save');
    try {
        updateQuoteDDBObject();
    } catch (err) {
        console.log('Error updating DynamoDB table', err);
    }
}

export async function handler(event) {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        await getRandomQuote(API_URL);
    } catch (err) {
        console.log('Error getting a quote', err);
    }
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Content-Type": "image/png",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: fs.readFileSync(IMAGE_PATH).toString('base64'),
        isBase64Encoded: true
    };
}
