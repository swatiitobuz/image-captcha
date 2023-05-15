import express from "express";
const router = express.Router();
const app = express();
import cors from "cors";
import axios from "axios";
require("dotenv").config();
const port = process.env.PORT || 2000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

router.post("/post", async (req, res) => {
  const { token, inputVal } = req.body;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );
    if (response.data.success) {
      res.send({
        status: 200,
        message: "Human",
        data: data,
      });
    } else {
      res.send({ status: 400, message: "Robot", data: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
