import { json, redirect } from "@remix-run/node";
import jwt from "jsonwebtoken";
import { getUser } from "~/session.server";

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.API_TOKEN; // Make sure this is securely configured

export const loader = async ({ request }) => {
  try {
    const user = await getUser(request);

    if (!user) {
      return redirect("/login"); // Redirect if no user is found in the session
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role }, // Assuming user object has a role
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    return json({ token });
  } catch (error) {
    return json({ message: "Error generating JWT" }, { status: 500 });
  }
};
