import { UserManager, UserManagerSettings } from "oidc-client";

export const config: UserManagerSettings = {
    authority: "https://localhost:5001",
    client_id: "spa",
    // redirect_uri: "https://localhost:5003/callback.html",
    redirect_uri: "http://localhost:4200/#/dashboard",
    response_type: "code",
    scope:"openid profile api api1",
    // post_logout_redirect_uri : "https://localhost:5003/index.html",
    post_logout_redirect_uri : "http://localhost:4200/#/dashboard",
  };

export const mgr = new UserManager(config);