import express, { Request, Response } from "express";
import { createUserEndpoint } from "./endpoints/users/createUser";
import { loginUserEndpoint } from "./endpoints/users/loginUser";
import { getUserInfoEndpoint } from "./endpoints/users/getUserInfo";
import { createRecipeEndpoint } from "./endpoints/recipes/createRecipeEndpoint";
import { followUserEndpoint } from "./endpoints/users/followUser";
import { getFeedEndpoint } from "./endpoints/recipes/GetFeedEndPoint";
import { UpdateUserPasswordEndpoint } from "./endpoints/users/updateUserPassword";
import { updateUserPasswordEndpoint } from "./endpoints/users/updateUserInfos";

const app = express();
app.use(express.json());

//Users

app.post("/signup", createUserEndpoint);
app.post("/login", loginUserEndpoint);
app.get("/userInfo", getUserInfoEndpoint);
app.post("/user/follow", followUserEndpoint);
app.post("/user/updatepassword", UpdateUserPasswordEndpoint);
app.post("/user/updateUserInfos", updateUserPasswordEndpoint);

// Recepies

app.post("/createRecipe", createRecipeEndpoint);
app.get("/feed", getFeedEndpoint);

export default app;
