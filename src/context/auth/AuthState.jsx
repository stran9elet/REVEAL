import React from "react";
import AuthContext from "./AuthContext";

export default function AuthState(props) {
	const [authToken, setAuthToken] = React.useState("");

	return <AuthContext.Provider value={{ authToken, setAuthToken }}>{props.children}</AuthContext.Provider>;
}
