require("dotenv").config();
import app from "./config/appConfig";
import connexionRoute from "./routes/connexionRoute";
import userRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute";
import contactRoute from "./routes/contactRoute";
import io from "./config/socketConfig";

app.use("/", connexionRoute);
app.use("/user", userRoute);
app.use("/message", messageRoute);
app.use("/contact", contactRoute);
app.get("*", (req, res) => {
  res.status(404).send({ res: "Not found" });
});

app.listen(8080, () => console.log("listening"));
