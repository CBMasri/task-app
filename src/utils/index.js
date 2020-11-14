import { nanoid } from 'nanoid'

/**
 * Create an 8 character id.
 */
export function uuid() {
  return nanoid(8)
}
