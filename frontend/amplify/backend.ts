import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

// const tradeTable = backend.data.resources.tables["Trade"];
// const assetPriceTable = backend.data.resources.tables["AssetPrice"];

// backend.example.addEnvironment("KEY", tradeTable.tableName);
// (backend.example.resources.lambda as NodejsFunction).addEnvironment(
//   "MESSAGE",
//   tradeTable.tableName
// );

// const allowStreamTradePolicy = new Policy(
//   Stack.of(tradeTable),
//   "CaptureTradeDailyMetricsStreamingPolicy",
//   {
//     statements: [
//       new PolicyStatement({
//         effect: Effect.ALLOW,
//         actions: [
//           "dynamodb:DescribeStream",
//           "dynamodb:GetRecords",
//           "dynamodb:GetShardIterator",
//           "dynamodb:ListStreams",
//         ],
//         resources: ["*"],
//       }),
//     ],
//   }
// );
//backend.captureTradeDailyMetrics.resources.lambda.role?.attachInlinePolicy(allowStreamTradePolicy);

// give get-cswap-ada-price write permission to the AssetPrice table
// const allowUpdateAssetPricePolicy = new Policy(
//   Stack.of(assetPriceTable),
//   "GetCswapAdaPriceUpdatePolicy",
//   {
//     statements: [
//       new PolicyStatement({
//         effect: Effect.ALLOW,
//         actions: [
//           "dynamodb:GetItem",
//           "dynamodb:PutItem",
//           "dynamodb:UpdateItem",
//         ],
//         resources: ["*"],
//       })
//     ]
//   }
// );
// backend.getCswapAdaPrice.resources.lambda.role?.attachInlinePolicy(allowUpdateAssetPricePolicy);

// let f = backend.getCswapAdaPrice.resources.lambda as NodejsFunction;
// f.addEnvironment('TABLE_NAME', assetPriceTable.tableName);

// const mapping = new EventSourceMapping(
//   Stack.of(tradeTable),
//   "CaptureTradeDailyMetricsTradeEventStreamMapping",
//   {
//     target: backend.captureTradeDailyMetrics.resources.lambda,
//     eventSourceArn: tradeTable.tableStreamArn,
//     startingPosition: StartingPosition.LATEST,

//   }
// );
// mapping.node.addDependency(allowStreamTradePolicy);

// Re-enable this before production
// const { amplifyDynamoDbTables } = backend.data.resources.cfnResources;
// for (const table of Object.values(amplifyDynamoDbTables)) {
//   table.deletionProtectionEnabled = true;
// }
