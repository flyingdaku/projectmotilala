import { BaseRepository } from "./base";
import type { CorporateAction } from "../types";

export class CorpActionRepository extends BaseRepository {
    public getLatestDividend(assetId: string): { dividend_amount: number; ex_date: string } | null {
        const lastDiv = this.db.queryOne<{ dividend_amount: number; ex_date: string }>(
            `SELECT dividend_amount, ex_date FROM corporate_actions
             WHERE asset_id = ? AND action_type LIKE '%DIVIDEND%'
             ORDER BY ex_date DESC LIMIT 1`,
            [assetId]
        );
        return lastDiv ?? null;
    }

    public getCorporateActions(assetId: string, limit = 20): CorporateAction[] {
        const rows = this.db.queryAll<{
            id: string;
            action_type: string;
            ex_date: string;
            record_date: string | null;
            dividend_amount: number | null;
            ratio_numerator: number | null;
            ratio_denominator: number | null;
            raw_announcement: string | null;
        }>(
            `SELECT id, action_type, ex_date, record_date, dividend_amount,
                  ratio_numerator, ratio_denominator, raw_announcement
             FROM corporate_actions
             WHERE asset_id = ?
             ORDER BY ex_date DESC LIMIT ?`,
            [assetId, limit]
        );

        return rows.map((r: any, i: number) => {
            const splitFactor =
                r.ratio_denominator && r.ratio_denominator > 0 && r.action_type.includes("SPLIT")
                    ? r.ratio_numerator! / r.ratio_denominator
                    : undefined;
            const bonusRatio =
                r.action_type.includes("BONUS") && r.ratio_numerator && r.ratio_denominator
                    ? `${r.ratio_numerator}:${r.ratio_denominator}`
                    : undefined;
            return {
                id: i + 1,
                actionType: r.action_type,
                exDate: r.ex_date,
                recordDate: r.record_date ?? undefined,
                dividendAmount: r.dividend_amount ?? undefined,
                splitFactor,
                bonusRatio,
                notes: undefined,
            };
        });
    }

    public getEvents(assetId: string, limit = 10) {
        // Currently no dedicated events table. Return recent corporate actions as events.
        const rows = this.db.queryAll<{
            id: string; action_type: string; ex_date: string; dividend_amount: number | null;
            ratio_numerator: number | null; ratio_denominator: number | null;
            raw_announcement: string | null;
        }>(
            `SELECT id, action_type, ex_date, dividend_amount, ratio_numerator,
                  ratio_denominator, raw_announcement
             FROM corporate_actions WHERE asset_id = ? ORDER BY ex_date DESC LIMIT ?`,
            [assetId, limit]
        );

        return rows.map((r: any) => {
            let title = r.action_type;
            if (r.dividend_amount) title = `Dividend ₹${r.dividend_amount}/share`;
            else if (r.ratio_numerator && r.ratio_denominator) {
                title = `${r.action_type}: ${r.ratio_numerator}:${r.ratio_denominator}`;
            }
            return {
                id: r.id,
                eventType: "CORP_ACTION" as const,
                title,
                eventDate: r.ex_date,
                severity: "INFO" as const,
            };
        });
    }
}
