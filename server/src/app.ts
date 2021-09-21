import app from "./config/appConfig";
import chatRoute from "./routes/chatRoute";
import connexionRoute from "./routes/connexionRoute";
import io from "./config/socketConfig";

app.use("/", connexionRoute);
app.use("/chat", chatRoute);

app.listen(8080, () => console.log("listening"));
