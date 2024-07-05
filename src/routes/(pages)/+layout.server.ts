import type { User } from "lucia";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	return event.locals.user as User
}
