import { getDb } from "../db";
import type { Db, Row } from "../db";

export abstract class BaseRepository {
    protected get db(): Db {
        return getDb();
    }
}
