import { DateTime } from 'luxon'

const SNOWFLAKE_EPOCH = DateTime.fromObject({ year: 2021, month: 1, day: 1 }).toMillis()
const UNSIGNED_23BIT_MAX = 8388607 // (Math.pow(2, 23) - 1) >> 0

const SNOWFLAKE_TIMESTAMP_SHIFT = 23n

export const generateSnowflake = (
  ts = DateTime.now().toMillis(),
  randomBits = Math.round(Math.random() * UNSIGNED_23BIT_MAX),
  epoch = SNOWFLAKE_EPOCH
) => {
  return (BigInt(ts - epoch) << SNOWFLAKE_TIMESTAMP_SHIFT) + BigInt(randomBits).toString()
}
