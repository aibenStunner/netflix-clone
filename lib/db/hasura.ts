export async function createNewUser(token: string, metadata: any) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );

  return response;
}

export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
}

async function queryHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: any,
  token: string
) {
  const grapqlURL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL as string;

  const result = await fetch(grapqlURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
