const express = require("express");
const ImageKit = require("@imagekit/nodejs");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoConnect = require('./db.js');
const Chat = require('./models/chat.js')
const UserChats = require('./models/userChats.js')
const { requireAuth } = require("@clerk/express");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
  origin : process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
    
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// CORS HEADERS from imagekit docs
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-Width, Content-Type, Accept"
//   );
//   next();
// });

app.get("/api/auth", function (req, res) {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();

    res.send({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
});

// app.post("/api/chats",requireAuth(), async (req, res) => {
//   const userId = req.auth().userId;
//   const { title } = req.body;
//   console.log(title);

//   try {
//     // CREATE A NEW CHAT
//     const newChat = new Chat({
//       userId: userId,
//       history: [{ role: "user", parts: [{ title }] }],
//     });

//     const savedChat = await newChat.save();

//     // CHECK IF THE USERCHATS EXISTS
//     const userChats = await UserChats.find({ userId: userId });

//     // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
//     if (!userChats.length) {
//       const newUserChats = new UserChats({
//         userId: userId,
//         chats: [
//           {
//             _id: savedChat._id,
//             title: "hello",
//           },
//         ],
//       });

//       await newUserChats.save();
//     } else {
//       // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
//       await UserChats.updateOne(
//         { userId: userId },
//         {
//           $push: {
//             chats: {
//               _id: savedChat._id,
//               title: title,
//             },
//           },
//         }
//       );

//       res.status(201).send(newChat._id);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating chat!");
//   }
// });

app.post("/api/chats", requireAuth(), async (req, res) => {
  const userId = req.auth().userId;
  const { titleText } = req.body;

  try {
    //  Create the Chat
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text: titleText }] }]
    });
    
    
    const savedChat = await newChat.save();

    //  make sure UserChats 
    let userChats = await UserChats.findOne({ userId });

    // If userChats doesn't exist Create new chat
    if (!userChats) {
      userChats = new UserChats({
        userId,
        chats: [],
      });
    }

    //  chats array always exists
    if (!Array.isArray(userChats.chats)) {
      userChats.chats = [];
    }

    //  push the new chat safely
    userChats.chats.push({
      _id: savedChat._id,
      title: titleText,
    });

    await userChats.save();


    res.status(201).json({ id: savedChat._id });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

  app.get("/api/userchats",requireAuth(),  async (req, res) => {
  const userId = req.auth().userId;
 

  try {
    const userChats = await UserChats.find({ userId });
      
    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching userchats!");
  }
});

app.get("/api/chats/:id", requireAuth() , async (req, res) => {
  const userId = req.auth().userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});

app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth().userId;

  const { question, answer , image } = req.body;


  const newItems = [];

  // USER MESSAGE
  if (question) {
    newItems.push({
      role: "user",
      parts: [{ text: question }],
      img: image || null,
    });
  }

  // MODEL MESSAGE
  if (answer) {
    newItems.push({
      role: "model",
      parts: [{ text: answer }],
      img: null
    });
  }
  

  // const newItems = [
  //   ...(question
  //     ? [{ role: "user", parts: [{ text: question }], ...(image ? { image } : {}) }]
  //     : []),
  //   { role: "model", parts: [{ text: answer }] },
  // ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
});

// ERROR HANDLER MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});


// START THE SERVER & CONNECT TO MONGO DB
app.listen(port,()=>{
  mongoConnect();
  console.log(`Server: http://localhost:${port} 👍`);
})



 




