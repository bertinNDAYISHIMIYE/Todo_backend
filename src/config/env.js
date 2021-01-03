import dotenv from 'dotenv';

dotenv.config();
const { JWTKEY } = process.env;
export default JWTKEY;
