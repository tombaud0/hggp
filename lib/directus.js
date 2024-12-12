import { createDirectus, rest} from '@directus/sdk';
const directus = createDirectus('https://dir3.databeam.eu').with(rest());
export default directus;
