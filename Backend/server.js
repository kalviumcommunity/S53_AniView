const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const app = express();
const router = require("./routes")
const port = 6969;
require("dotenv").config()



async function main() {
  await mongoose.connect(
    process.env.MONGO_LINK
  );
}

const posts = [
  new Post({
    title: "Naruto",
    image:"https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9161972_b_h10_aa.jpg",
    category: "Action",
  }),

  new Post({
    title: "One piece",
    image: "https://p1.hiclipart.com/preview/328/969/307/one-piece-anime-icon-v2-one-piece-png-icon-thumbnail.jpg", 
    category: "Adventure",
  }),

  new Post({
    title: "Death Note",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmVA8aRtibBl1baF047UlrzH76nf2dgmG3NA&usqp=CAU",
    category: "Psychological",
  }),

  new Post({
    title: "MHA",
    image: "https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1OTc5ODg0MGEyXkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_FMjpg_UX1000_.jpg",
    category: "Action",
  }),

  new Post({
    title: "JJK",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7xZso_erLTGrQceK95SmWfPZhdOqn9iPUPg&usqp=CAU", 
    category: "Thriller",
  }),

  new Post({
    title: "Doraemon",
    image: "https://images.pexels.com/photos/6567953/pexels-photo-6567953.jpeg?cs=srgb&dl=pexels-loifotos-6567953.jpg&fm=jpg", 
    category: "Slice of Life",
  }),

  new Post({
    title: "Shinchan",
    image: "https://media.assettype.com/freepressjournal/2023-10/b8bbe800-2660-453e-a10c-d45be17ba24d/Untitled_design___2023_10_17T100150_104.jpg", 
    category: "Comedy",
  }),

  new Post({
    title: "Pokemon",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQq2y0ZlWCj0gkMAYWh-DrVmvjNs7c8pkLrs6gkVQjHg21D3B5cmbP6uWJuYF-LL20qM&usqp=CAU", 
    category: "Action",
  }),

  new Post({
    title: "Bleach",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFdKZoAEMjL49HegLvGo92u1jGSC9m9LEhw&usqp=CAU",
    category: "Action",
  }),

  new Post({
    title: "Demon Slayer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOwPQosOvK-g4V05gZQhZ_uJlvKKaDvJN6w&usqp=CAU",
    category: "Demons",
  }),
];

// Post.insertMany(posts)
//   .then((docs) => {
//     console.log("posts inserted successfully");
//   })
//   .catch((err) => {
//     console.error(err);
// });

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  main()
  .then(() => {
    res.send("Connection Successful!");
  })
  .catch((err) => res.send(err));
});

app.use("/list",router)

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
