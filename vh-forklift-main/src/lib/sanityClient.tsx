// client.js (or a similar file in your project)
import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'xgcso16r', // find this at manage.sanity.io or in your sanity.json
  dataset: 'production', // or the name of your dataset
  useCdn: false, // `false` if you want to ensure fresh data
});
