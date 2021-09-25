require("dotenv").config();
import app from "./config/appConfig";
import chatRoute from "./routes/chatRoute";
import connexionRoute from "./routes/connexionRoute";
import userRoute from "./routes/userRoute";
import io from "./config/socketConfig";

app.use("/", connexionRoute);
app.use("/chat", chatRoute);
app.use("/user", userRoute);

app.listen(8080, () => console.log("listening"));
