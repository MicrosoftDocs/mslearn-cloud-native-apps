const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../config";
import Head from "next/head";

Home.getInitialProps = async function () {
  const { endpoint, key, database, container } = config;

  const client = new CosmosClient({ endpoint, key });

  const databaseID = client.database(database);
  const containerID = databaseID.container(container);

  if (endpoint) {
    console.log(`Querying container:\n${containerID}`);
    const querySpec = {
      query: "SELECT * FROM c",
    };

    const { resources: items } = await containerID.items
      .query(querySpec)
      .fetchAll();
    return { CosmoIoTData: items };
  }
};

export default function Home({ CosmoIoTData }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Next.js with Azure Cosmos DB IoT telemetry data</title>
        <meta name="title" content="Next.js with Azure Cosmos DB IoT telemetry data" />
        <meta
          name="description"
          content="Next.js with Azure Cosmos DB IoT telemetry data"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next.js with Azure Cosmos DB IoT telemetry data" />
        <meta
          property="og:description"
          content="Next.js with Azure Cosmos DB IoT telemetry data"
        />
      </Head>
      <div className="w-full text-center bg-blue-800 flex flex-wrap items-center">
        <div className="text-3xl w-1/2 text-white mx-2 md:mx-auto py-10">
          Next.js - Cosmos DB IoT telemetry data
        </div>
      </div>
      <div className="bg-gray-200 py-10">
        {CosmoIoTData.map(({id, pk, deviceId, timestamp, temperature }) => (
          <div
            className="flex bg-white shadow-lg rounded-lg mx-2 md:mx-auto mb-10 max-w-2xl"
            key={id}
          >
            <div className="flex items-start px-4 py-6">
              <div className="">
                <div className="inline items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 -mt-1">
                    {id}
                  </h2>
                  <small className="text-sm text-gray-700 object-right">
                    DeviceId: {deviceId}
                  </small>
                  <small className="ml-3 text-gray-700 text-sm">
                    Timestamp: {timestamp}
                  </small>
                  <small className="ml-3 text-gray-700 text-sm">
                    Temperature: {temperature}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}