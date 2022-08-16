export function setCookie(key, value, exDays = 60) {
	const d = new Date();
	d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(key) {
	let name = key + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export function deleteCookie(key) {
	// just set the expiry date to be a previous value
	document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}
