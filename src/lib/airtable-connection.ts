import Airtable, { Base, FieldSet, Record } from 'airtable';

// Environment variables and connection state interface
interface AirtableConnection {
  hasAirtableCredentials: boolean;
  airtableBase: Base | undefined;
  shouldUseMockData: boolean;
}

/**
 * Gets or initializes the Airtable base connection.
 * This centralizes the Airtable connection logic for reuse across the application.
 */
export function getAirtableBase(): AirtableConnection {
  // Environment variables for Airtable
  const apiKey =
    process.env.AIRTABLE_API_KEY || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const baseId =
    process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  const hasAirtableCredentials = !!(apiKey && baseId);

  // Determine if we should use mock data
  const shouldUseMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  // Initialize Airtable base connection if credentials exist
  let airtableBase: Base | undefined;

  if (hasAirtableCredentials) {
    const airtable = new Airtable({ apiKey });
    airtableBase = airtable.base(baseId!);
  }

  return {
    hasAirtableCredentials,
    airtableBase,
    shouldUseMockData,
  };
}

/**
 * Generic function to fetch data from Airtable with proper error handling and mock data fallback
 *
 * @template T The return type of the data
 * @template F The Airtable fields type
 * @param tableName The name of the Airtable table to fetch from
 * @param mockData Mock data to use as fallback
 * @param mapFunction Function to map Airtable records to the desired return type
 * @returns Promise with the fetched data or mock data
 */
export async function fetchAirtableData<T, F extends FieldSet>(
  tableName: string,
  mockData: T[],
  mapFunction: (record: Record<F>) => T | Promise<T>
): Promise<T[]> {
  const { hasAirtableCredentials, airtableBase, shouldUseMockData } =
    getAirtableBase();

  // If Airtable credentials are not available, return mock data
  if (!hasAirtableCredentials || !airtableBase) {
    console.log(`Using mock ${tableName} data (no Airtable credentials)`);
    return mockData;
  }

  // Use mock data if explicitly enabled through env vars
  if (shouldUseMockData) {
    console.log(`Using mock ${tableName} data (mock data enabled)`);
    return mockData;
  }

  try {
    console.log(`Fetching ${tableName} from Airtable...`);

    // Fetch records from Airtable
    const records = await airtableBase(tableName).select().all();
    console.log(
      `Successfully fetched ${records.length} ${tableName} records from Airtable`
    );

    // Map records to our data type with proper typing
    const typedRecords = records as unknown as Record<F>[];

    // Handle both synchronous and asynchronous mapper functions
    return await Promise.all(
      typedRecords.map(async (record) => {
        const result = mapFunction(record);
        return result instanceof Promise ? await result : result;
      })
    );
  } catch (error) {
    console.error(`Error fetching ${tableName} from Airtable:`, error);
    console.log(`Falling back to mock ${tableName} data`);
    return mockData;
  }
}
