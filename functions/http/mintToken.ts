import jwt from "jsonwebtoken";

const kid = YEXT_PUBLIC_SIGNING_KEY_ID;
const key = YEXT_PUBLIC_SIGNING_KEY;
const externalIdentities = [
  {
    source: "google-drive", // Update based on your selected source
    identities: ["testuser1@test.com", "admin"],
  }
];

export default async function mintToken (request) {
  const token = jwt.sign(
    {
      aud: ["/v2/accounts/me/search"],
      query: {
        identity: JSON.stringify({
          externalIdentities: [...externalIdentities],
        }),
      },
    },
    key,
    {
      expiresIn: "1hr",
      header: { kid },
    }
  );
  return {
    body: token,
    headers: null,
    statusCode: 200
  }
};
