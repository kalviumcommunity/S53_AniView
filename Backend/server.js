const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {router,UserRouter} = require("./routes");
const port = 6969;

require("dotenv").config();
const cors = require("cors");
const List = require("./models/post");

async function main() {
  await mongoose.connect(process.env.MONGO_LINK);
}
app.use(cors());
const lists = [
  new List({
    title: "Barakamon",
    image:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9161972_b_h10_aa.jpg",
    description:
      "Barakamon follows the story of a calligrapher named Seishuu Handa, who moves to a remote island village after an incident. There, he experiences life-changing encounters and discovers new perspectives on art and creativity.",
    category: "Action",
  }),

  new List({
    title: "Hellsing",
    image:
      "https://p1.hiclipart.com/preview/328/969/307/one-piece-anime-icon-v2-one-piece-png-icon-thumbnail.jpg",
    description:
      "Hellsing chronicles the adventures of Monkey D. Luffy and his pirate crew as they search for the legendary treasure known as One Piece. Along the way, they encounter formidable foes, make new allies, and explore the vast and unpredictable world of the Grand Line.",
    category: "Adventure",
  }),

  new List({
    title: "Monster",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmVA8aRtibBl1baF047UlrzH76nf2dgmG3NA&usqp=CAU",
    description:
      "Monster follows the story of Light Yagami, a high school student who gains possession of a notebook that allows him to kill anyone whose name he writes in it. As he takes on the persona of 'Kira' and begins eliminating criminals, he attracts the attention of the enigmatic detective known only as L, leading to a high-stakes game of cat and mouse.",
    category: "Psychological",
  }),

  new List({
    title: "Erased",
    image:
      "https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1OTc5ODg0MGEyXkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_FMjpg_UX1000_.jpg",
    description:
      "Erased is set in a world where almost everyone possesses superpowers known as 'Quirks'. The story follows Izuku Midoriya, a Quirkless boy who dreams of becoming a hero. After a chance encounter with his idol, All Might, he inherits All Might's Quirk and enrolls in the prestigious U.A. High School to train as a hero.",
    category: "Action",
  }),

  new List({
    title: "Paranoia Agent",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7xZso_erLTGrQceK95SmWfPZhdOqn9iPUPg&usqp=CAU",
    description:
      "Paranoia Agent follows Yuji Itadori, a high school student who gains immense strength after ingesting a cursed object containing a powerful curse. He joins a secret organization of Jujutsu Sorcerers to combat curses and protect the world from supernatural threats.",
    category: "Thriller",
  }),

  new List({
    title: "Mushishi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQq2y0ZlWCj0gkMAYWh-DrVmvjNs7c8pkLrs6gkVQjHg21D3B5cmbP6uWJuYF-LL20qM&usqp=CAU",
    description:
      "Mushishi follows the adventures of Ash Ketchum, a young Pokemon Trainer from Pallet Town, and his loyal Pikachu. Together, they travel across various regions, catching Pokemon, battling other Trainers, and striving to become Pokemon Masters.",
    category: "Action",
  }),

  new List({
    title: "Bleach",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFdKZoAEMjL49HegLvGo92u1jGSC9m9LEhw&usqp=CAU",
    description:
      "Bleach follows the story of Ichigo Kurosaki, a teenager with the ability to see ghosts. After gaining the powers of a Soul Reaper, Ichigo must fulfill his duties of protecting the living world from malevolent spirits and guiding departed souls to the afterlife.",
    category: "Action",
  }),

  new List({
    title: "Demon Slayer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOwPQosOvK-g4V05gZQhZ_uJlvKKaDvJN6w&usqp=CAU",
    description:
      "Demon Slayer follows Tanjiro Kamado, a young boy who becomes a demon slayer after his family is slaughtered by demons, and his sister, Nezuko, is turned into a demon. Determined to avenge his family and cure his sister, Tanjiro embarks on a perilous journey to eliminate the demons and uncover the truth about their existence.",
    category: "Demons",
  }),
];

// List.insertMany(lists)
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

app.use("/list", router);
app.use("/user", UserRouter)
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
