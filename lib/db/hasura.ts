/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: any
) {
  const grapqlURL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL as string;

  const result = await fetch(grapqlURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${undefined}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

function fetchMyQuery() {
  const operationsDoc = `
        query MyQuery {
          users {
            email
            id
            issuer
            publicAddress
          }
        }
      `;

  return queryHasuraGraphQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startFetchMyQuery();
