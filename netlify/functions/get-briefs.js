// Netlify Function to get briefs from Airtable
const Airtable = require('airtable');

exports.handler = async function(event, context) {
  console.log('Get Briefs function called');

  // Initialize Airtable with API key from environment variables
  // Try both naming conventions for environment variables
  const apiKey = process.env.AIRTABLE_API_KEY || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    console.error('Missing Airtable credentials');
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing Airtable credentials'
      })
    };
  }

  try {
    // Initialize Airtable
    const airtable = new Airtable({ apiKey });
    const base = airtable.base(baseId);

    // Get all briefs
    const records = await base('Briefs').select().all();
    console.log(`Found ${records.length} briefs`);

    // Map records to match your Airtable schema
    const briefs = records.map(record => ({
      id: record.id,
      ...record.fields
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ briefs })
    };
  } catch (error) {
    console.error('Error fetching briefs:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch briefs',
        details: error.message
      })
    };
  }
};
