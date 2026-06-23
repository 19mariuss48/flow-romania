import { createAuthClient } from "better-auth/react";
const client = createAuthClient();
console.log(client.forgetPassword ? "Client has forgetPassword" : "Client DOES NOT have forgetPassword");
