import express, { json } from "express";
import axios from "axios";
// All Imports
import OpenAI from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// const express = require('express');
const app = express();

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
// set access control headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // res.setHeader("Access-Control-Allow-Headers", "localhost:3000");
  next();
});

// app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listning at port 5000........");
});
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

// api
// Regestration Api's

const runFun = async (request, res) => {
  console.log("runFun");
  // console.log(request);
  console.log(request.body);
  const reqBody = JSON.parse(request.body.body);
  let prompt = reqBody.prompt;
  console.log(prompt);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    max_tokens: 64,
    n: 1,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  //   console.log(response.data.choices);
  console.log(response.choices[0].message);
  const result = response.choices[0].message.content;
  console.log(result);
  res.send(result);
};

app.post("/api/chatgpt", runFun);
