module.exports=[34703,e=>e.a(async(t,s)=>{try{var i=e.i(72842),a=t([i]);[i]=a.then?(await a)():a;let p={price:!0,results:!0,concall:!0,shareholding:!0,redFlags:!0};function n(e){let t=new Date;return t.setDate(t.getDate()-e),t.toISOString().split("T")[0]}function o(e){return{...p,...e??{}}}function r(e){if(!(null==e||Number.isNaN(e)))return`Rs ${e.toFixed(e>=1e3?0:1)} Cr`}async function d(e){return i.pgDb.queryOne(`SELECT id, nse_symbol, bse_code, name
     FROM assets
     WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
     LIMIT 1`,[e.toUpperCase()])}async function l(e){return i.pgDb.queryAll(`SELECT uf.asset_id,
            a.nse_symbol,
            a.bse_code,
            a.name,
            uf.alert_config
     FROM user_asset_follows uf
     JOIN assets a ON a.id = uf.asset_id
     WHERE uf.user_id = $1
     ORDER BY uf.updated_at DESC, a.name ASC`,[e])}async function _(e,t){if(0===t.length)return new Set;let s=await i.pgDb.queryAll(`SELECT feed_event_id
     FROM user_feed_reads
     WHERE user_id = $1 AND feed_event_id = ANY($2::text[])`,[e,t]);return new Set(s.map(e=>e.feed_event_id))}async function u(e){let t=await l(e);if(0===t.length)return[];let s=t.map(e=>e.asset_id),a=new Map(t.map(e=>[e.asset_id,o(e.alert_config)])),d=[],[u,c,E]=await Promise.all([i.pgDb.queryAll(`SELECT ca.id,
              ca.asset_id,
              ca.action_type,
              ca.ex_date,
              ca.record_date,
              ca.dividend_amount,
              ca.ratio_numerator,
              ca.ratio_denominator,
              ca.raw_announcement,
              a.nse_symbol,
              a.bse_code,
              a.name
       FROM corporate_actions ca
       JOIN assets a ON a.id = ca.asset_id
       WHERE ca.asset_id = ANY($1::text[])
         AND ca.ex_date >= $2
       ORDER BY ca.ex_date DESC
       LIMIT 200`,[s,n(365)]),i.tsDb.queryAll(`WITH ranked AS (
         SELECT q.asset_id,
                q.period_end_date::text AS period_end_date,
                q.revenue_ops,
                q.net_profit,
                q.sales_growth_yoy,
                q.pat_growth_yoy,
                q.basic_eps,
                a.nse_symbol,
                a.bse_code,
                a.name,
                ROW_NUMBER() OVER (PARTITION BY q.asset_id ORDER BY q.period_end_date DESC) AS rn
         FROM src_msi_quarterly q
         JOIN assets a ON a.id = q.asset_id
         WHERE q.asset_id = ANY($1::text[])
       )
       SELECT asset_id, period_end_date, revenue_ops, net_profit, sales_growth_yoy, pat_growth_yoy, basic_eps, nse_symbol, bse_code, name
       FROM ranked
       WHERE rn = 1`,[s]),i.tsDb.queryAll(`WITH ranked AS (
         SELECT sh.asset_id,
                sh.period_end_date::text AS period_end_date,
                sh.promoter_holding,
                sh.fii_holding,
                sh.dii_holding,
                sh.public_holding,
                sh.pledged_shares,
                a.nse_symbol,
                a.bse_code,
                a.name,
                ROW_NUMBER() OVER (PARTITION BY sh.asset_id ORDER BY sh.period_end_date DESC) AS rn
         FROM src_msi_shareholding sh
         JOIN assets a ON a.id = sh.asset_id
         WHERE sh.asset_id = ANY($1::text[])
       )
       SELECT asset_id, period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares, nse_symbol, bse_code, name
       FROM ranked
       WHERE rn <= 2
       ORDER BY asset_id, period_end_date DESC`,[s])]);for(let e of u){let t=a.get(e.asset_id)??p;(t.price||t.redFlags||t.results||t.shareholding||t.concall)&&d.push({id:`corp:${e.id}`,assetId:e.asset_id,nseSymbol:e.nse_symbol??void 0,bseCode:e.bse_code??void 0,stockName:e.name,eventType:"CORP_ACTION",title:"DIVIDEND"===e.action_type&&null!=e.dividend_amount?`Dividend announced: Rs ${e.dividend_amount}/share`:("BONUS"===e.action_type||"SPLIT"===e.action_type)&&e.ratio_numerator&&e.ratio_denominator?`${"BONUS"===e.action_type?"Bonus":"Split"} ${e.ratio_numerator}:${e.ratio_denominator}`:e.raw_announcement?.slice(0,120)||e.action_type.replaceAll("_"," "),severity:"SUSPENSION"===e.action_type?"WARNING":"INFO",eventDate:e.ex_date,isRead:!1,eventData:{actionType:e.action_type,...e.record_date?{recordDate:e.record_date}:{},...null!=e.dividend_amount?{dividendPerShare:e.dividend_amount}:{}}})}for(let e of c)(a.get(e.asset_id)??p).results&&d.push({id:`results:${e.asset_id}:${e.period_end_date}`,assetId:e.asset_id,nseSymbol:e.nse_symbol??void 0,bseCode:e.bse_code??void 0,stockName:e.name,eventType:"RESULT",title:function(e){let t=[],s=r(e.revenue_ops),i=r(e.net_profit);return s&&t.push(`Revenue ${s}`),i&&t.push(`PAT ${i}`),null!=e.pat_growth_yoy&&t.push(`PAT YoY ${e.pat_growth_yoy.toFixed(1)}%`),0===t.length&&null!=e.sales_growth_yoy&&t.push(`Sales YoY ${e.sales_growth_yoy.toFixed(1)}%`),t.length>0?`Quarterly results: ${t.join(" | ")}`:"Quarterly results updated"}(e),severity:null!=e.pat_growth_yoy&&e.pat_growth_yoy<0?"WARNING":"INFO",eventDate:e.period_end_date,isRead:!1,eventData:{...null!=e.revenue_ops?{revenueCr:e.revenue_ops}:{},...null!=e.net_profit?{patCr:e.net_profit}:{},...null!=e.pat_growth_yoy?{patGrowthYoy:e.pat_growth_yoy}:{},...null!=e.basic_eps?{eps:e.basic_eps}:{}}});let y=new Map;for(let e of E){let t=y.get(e.asset_id)??[];t.push(e),y.set(e.asset_id,t)}for(let[e,t]of y.entries()){let s=a.get(e)??p;if(!s.shareholding&&!s.redFlags)continue;let i=function(e){if(0===e.length)return null;let[t,s]=e,i=s&&null!=t.pledged_shares&&null!=s.pledged_shares?t.pledged_shares-s.pledged_shares:null,a=s&&null!=t.fii_holding&&null!=s.fii_holding?t.fii_holding-s.fii_holding:null,n=s&&null!=t.promoter_holding&&null!=s.promoter_holding?t.promoter_holding-s.promoter_holding:null,o={};null!=t.promoter_holding&&(o["Promoter %"]=t.promoter_holding.toFixed(2)),null!=t.fii_holding&&(o["FII %"]=t.fii_holding.toFixed(2)),null!=t.dii_holding&&(o["DII %"]=t.dii_holding.toFixed(2)),null!=t.pledged_shares&&(o["Pledged %"]=t.pledged_shares.toFixed(2)),null!=a&&(o["FII QoQ"]=`${a>=0?"+":""}${a.toFixed(2)}pp`),null!=n&&(o["Promoter QoQ"]=`${n>=0?"+":""}${n.toFixed(2)}pp`);let r="Shareholding updated",d="INFO";return null!=i&&i>.5?(r=`Pledged shares increased by ${i.toFixed(2)}pp`,d="WARNING"):null!=a&&Math.abs(a)>=1?r=`FII holding ${a>0?"rose":"fell"} by ${Math.abs(a).toFixed(2)}pp`:null!=n&&Math.abs(n)>=1&&(r=`Promoter holding ${n>0?"rose":"fell"} by ${Math.abs(n).toFixed(2)}pp`),{id:`shareholding:${t.asset_id}:${t.period_end_date}`,assetId:t.asset_id,nseSymbol:t.nse_symbol??void 0,bseCode:t.bse_code??void 0,stockName:t.name,eventType:"SHAREHOLDING_CHANGE",title:r,severity:d,eventDate:t.period_end_date,isRead:!1,eventData:o}}(t);i&&d.push(i)}d.sort((e,t)=>new Date(t.eventDate).getTime()-new Date(e.eventDate).getTime());let g=await _(e,d.map(e=>e.id));return d.map(e=>({...e,isRead:g.has(e.id)}))}function c(){return{stocks:{async search(e,t=10){let s=`%${e.toLowerCase()}%`,a=await i.pgDb.queryAll(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin
           FROM assets
           WHERE is_active = 1
             AND (LOWER(nse_symbol) LIKE $1 OR LOWER(name) LIKE $1 OR bse_code LIKE $1)
           ORDER BY CASE
             WHEN LOWER(nse_symbol) = LOWER($2) THEN 0
             WHEN LOWER(nse_symbol) LIKE LOWER($2)||'%' THEN 1
             ELSE 2
           END, name
           LIMIT $3`,[s,e,2*t]),n=new Set,o=[];for(let e of a){let s=e.nse_symbol??e.bse_code??"";if(!(!s||n.has(s))&&(n.add(s),o.push({id:e.id,symbol:s,name:e.name,exchange:e.nse_symbol?"NSE":"BSE",sector:e.sector??void 0,industryGroup:e.industry_group??void 0,industry:e.industry??void 0,subIndustry:e.sub_industry??void 0,isin:e.isin??void 0,assetClass:"EQUITY"}),o.length>=t))break}return o},async getById(e){let t=await i.pgDb.queryOne("SELECT id, nse_symbol, bse_code, name, sector FROM assets WHERE id = $1",[String(e)]);return t?{id:t.id,symbol:t.nse_symbol??t.bse_code??"",name:t.name,sector:t.sector??void 0,assetClass:"EQUITY"}:null},async getBySymbol(e){let t=await i.pgDb.queryOne(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`,[e.toUpperCase()]);return t?{id:t.id,symbol:t.nse_symbol??t.bse_code??e,name:t.name,exchange:t.nse_listed?"NSE":"BSE",sector:t.sector??t.msi_sector??void 0,industryGroup:t.industry_group??void 0,industry:t.industry??t.msi_industry_group??void 0,subIndustry:t.sub_industry??void 0,isin:t.isin??void 0,assetClass:"EQUITY"}:null},async getDetail(e){let t=await i.pgDb.queryOne(`SELECT id, nse_symbol, bse_code, name, sector, industry_group, industry, sub_industry, isin, nse_listed, msi_sector, msi_industry_group, listing_date, face_value
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`,[e.toUpperCase()]);if(!t)return null;let[s,a,o,r]=await Promise.all([i.tsDb.queryOne(`SELECT close, date, LAG(close) OVER (ORDER BY date) AS prev_close
             FROM daily_prices
             WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
             ORDER BY date DESC
             LIMIT 1`,[t.id]),i.tsDb.queryOne(`SELECT MAX(high) AS high52w, MIN(low) AS low52w
             FROM daily_prices
             WHERE asset_id = $1 AND date >= $2 AND source_exchange IN ('NSE','BSE')`,[t.id,n(365)]),i.pgDb.queryOne(`SELECT market_cap_cr, pe_ttm, pb, dividend_yield, roe, roce, debt_equity
             FROM computed_ratios
             WHERE asset_id = $1`,[t.id]),i.tsDb.queryOne(`SELECT volume
             FROM daily_prices
             WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
             ORDER BY date DESC
             LIMIT 1`,[t.id])]),d=s?.close??0,l=s?.prev_close&&s.prev_close>0?+((d/s.prev_close-1)*100).toFixed(2):0;return{id:t.id,symbol:t.nse_symbol??t.bse_code??e,nseSymbol:t.nse_symbol??void 0,bseCode:t.bse_code??void 0,name:t.name,exchange:t.nse_listed?"NSE":"BSE",sector:t.sector??t.msi_sector??void 0,industryGroup:t.industry_group??void 0,industry:t.industry??t.msi_industry_group??void 0,subIndustry:t.sub_industry??void 0,isin:t.isin??void 0,assetClass:"EQUITY",price:d,priceDate:s?.date??void 0,pctChange1d:l,high52w:a?.high52w??void 0,low52w:a?.low52w??void 0,marketCapCr:o?.market_cap_cr??void 0,pe:o?.pe_ttm??void 0,pb:o?.pb??void 0,dividendYield:o?.dividend_yield??void 0,roe:o?.roe??void 0,roce:o?.roce??void 0,debtEquity:o?.debt_equity??void 0,volume:r?.volume??void 0,faceValue:t.face_value??1,listedDate:t.listing_date??void 0}},async getPeers(e){let t=await i.pgDb.queryOne(`SELECT id, sector, screener_industry_code, msi_sector
           FROM assets
           WHERE (nse_symbol = $1 OR bse_code = $1) AND is_active = 1
           LIMIT 1`,[e.toUpperCase()]);if(!t)return[];let s=t.screener_industry_code?"screener_industry_code":t.sector?"sector":"msi_sector",a=t.screener_industry_code??t.sector??t.msi_sector;if(!a)return[];let n=await i.pgDb.queryAll(`SELECT id, nse_symbol, bse_code, name
           FROM assets
           WHERE ${s} = $1 AND id != $2 AND is_active = 1
           ORDER BY CASE WHEN nse_symbol IS NOT NULL THEN 0 ELSE 1 END, name
           LIMIT 12`,[a,t.id]);return(await Promise.all(n.map(async e=>{let[t,s]=await Promise.all([i.tsDb.queryOne(`SELECT close, date
               FROM daily_prices
               WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0
               ORDER BY date DESC
               LIMIT 1`,[e.id]),i.pgDb.queryOne(`SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield
               FROM computed_ratios
               WHERE asset_id = $1`,[e.id])]);return!t||t.close<=0?null:{symbol:e.nse_symbol??e.bse_code??"",nseSymbol:e.nse_symbol??void 0,name:e.name,marketCapCr:s?.market_cap_cr??null,peTtm:s?.pe_ttm??null,pb:s?.pb??null,evEbitda:s?.ev_ebitda??null,roce:s?.roce??null,roe:s?.roe??null,debtEquity:s?.debt_equity??null,patMargin:s?.pat_margin??null,operatingMargin:s?.operating_margin??null,price:t.close,revenueGrowth1y:s?.revenue_growth_1y??null,patGrowth1y:s?.pat_growth_1y??null,dividendYield:s?.dividend_yield??null}}))).filter(e=>null!==e)}},prices:{async getPrices(e,t){let s=t?.startDate??"2000-01-01",a=t?.endDate??new Date().toISOString().split("T")[0];!t?.startDate&&t?.range&&(s=n({"1W":7,"1M":30,"3M":90,"6M":180,"1Y":365,"3Y":1095,"5Y":1825,"10Y":3650,MAX:12e3}[t.range.toUpperCase()]??365));let o=await i.tsDb.queryAll(`SELECT date, open, high, low, close, volume, source_exchange
           FROM daily_prices
           WHERE asset_id = $1 AND date >= $2 AND date <= $3
           ORDER BY date ASC`,[String(e),s,a]),r=new Map;for(let e of o){let t="string"==typeof e.date?e.date:new Date(e.date).toISOString().slice(0,10);r.get(t)&&"NSE"!==e.source_exchange||r.set(t,e)}return[...r.values()].map(e=>({date:"string"==typeof e.date?e.date:new Date(e.date).toISOString().slice(0,10),open:e.open,high:e.high,low:e.low,close:e.close,volume:e.volume}))}},company:{async getProfile(e){let t=await i.pgDb.queryOne(`SELECT name, description, website_url, listing_date, management_json, nse_symbol
           FROM assets
           WHERE id = $1`,[e]),s={};if(t?.management_json)try{s=JSON.parse(t.management_json)}catch{s={}}return{description:t?.description??`${t?.name??"Company"} is a listed Indian company.`,descriptionShort:t?.description??`${t?.name??"Company"} is a listed Indian company.`,founded:t?.listing_date?.slice(0,4)??"N/A",foundedYear:t?.listing_date?Number(t.listing_date.slice(0,4)):null,website:t?.website_url??`https://www.${(t?.nse_symbol??"company").toLowerCase()}.com`,md:s.md??"N/A",chairman:s.chairman??"N/A",indexMemberships:[]}},getCorporateActions:async(e,t=20)=>(await i.pgDb.queryAll(`SELECT id, action_type, ex_date, record_date, dividend_amount
           FROM corporate_actions
           WHERE asset_id = $1
           ORDER BY ex_date DESC
           LIMIT $2`,[e,t])).map(e=>({id:0,actionType:e.action_type,exDate:e.ex_date,recordDate:e.record_date??void 0,dividendAmount:e.dividend_amount??void 0})),getEvents:async(e,t=10)=>[],getDocuments:async(e,t)=>[],async getFinancials(e,t){let s=t?.consolidated??!0,[a,n,o,r,d]=await Promise.all([i.tsDb.queryAll(`SELECT period_end_date, revenue_ops, operating_profit, finance_costs, depreciation, profit_before_tax, net_profit, basic_eps
             FROM ${s?"src_msi_quarterly":"src_msi_quarterly_standalone"}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 20`,[e]),i.tsDb.queryAll(`SELECT period_end_date, equity_capital, reserves, long_term_borrowings, short_term_borrowings, total_assets, cash_equivalents, fixed_assets, investments
             FROM ${s?"src_msi_balance_sheet":"src_msi_balance_sheet_standalone"}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 10`,[e]),i.tsDb.queryAll(`SELECT period_end_date, net_cash_operating, net_cash_investing, net_cash_financing, capex
             FROM ${s?"src_msi_cashflow":"src_msi_cashflow_standalone"}
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 10`,[e]),i.tsDb.queryAll(`SELECT period_end_date, roce, net_profit_margin, ebit_margin, debtor_days
             FROM src_msi_ratios
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 12`,[e]),i.tsDb.queryAll(`SELECT period_end_date, sales, operating_profit, pbt, net_profit, eps
             FROM src_screener_quarterly
             WHERE asset_id = $1
             ORDER BY period_end_date DESC
             LIMIT 20`,[e])]),l=a.length>0?a.map(e=>({periodEnd:e.period_end_date,revenue:e.revenue_ops??null,operatingProfit:e.operating_profit??null,interest:e.finance_costs??null,depreciation:e.depreciation??null,pbt:e.profit_before_tax??null,netProfit:e.net_profit??null,pat:e.net_profit??null,eps:e.basic_eps??null})):d.map(e=>({periodEnd:e.period_end_date,revenue:e.sales??null,operatingProfit:e.operating_profit??null,pbt:e.pbt??null,netProfit:e.net_profit??null,pat:e.net_profit??null,eps:e.eps??null})),_=n.map(e=>{let t=(e.equity_capital??0)+(e.reserves??0),s=(e.long_term_borrowings??0)+(e.short_term_borrowings??0);return{periodEnd:e.period_end_date,totalEquity:t||null,totalDebt:s||null,totalAssets:e.total_assets??null,cash:e.cash_equivalents??null,cashEquivalents:e.cash_equivalents??null,fixedAssets:e.fixed_assets??null,investments:e.investments??null,bookValue:t||null}}),u=o.map(e=>({periodEnd:e.period_end_date,operatingCf:e.net_cash_operating??void 0,investingCf:e.net_cash_investing??void 0,financingCf:e.net_cash_financing??void 0,capex:e.capex??void 0})),c=r.map(e=>({periodEndDate:e.period_end_date,debtorDays:e.debtor_days??null,inventoryDays:null,daysPayable:null,roce:e.roce??null,operatingMargin:e.ebit_margin??null,patMargin:e.net_profit_margin??null}));return{quarterly:l,annual:function(e){let t=new Map;for(let s of e){let e=s.periodEnd?.slice(0,4)??"unknown";t.has(e)||t.set(e,[]),t.get(e).push(s)}return[...t.entries()].filter(([,e])=>e.length>=2).map(([e,t])=>({periodEnd:`${e}-03-31`,revenue:t.reduce((e,t)=>e+(t.revenue??0),0)||null,operatingProfit:t.reduce((e,t)=>e+(t.operatingProfit??0),0)||null,netProfit:t.reduce((e,t)=>e+(t.netProfit??t.pat??0),0)||null,pat:t.reduce((e,t)=>e+(t.pat??t.netProfit??0),0)||null,eps:t.reduce((e,t)=>e+(t.eps??0),0)||null})).sort((e,t)=>(t.periodEnd??"").localeCompare(e.periodEnd??""))}(l),balanceSheet:_,cashFlow:u,ratios:c,anomalies:[]}},getOwnership:async e=>({shareholding:(await i.tsDb.queryAll(`SELECT period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares
           FROM src_msi_shareholding
           WHERE asset_id = $1
           ORDER BY period_end_date DESC
           LIMIT 8`,[e])).map(e=>({quarterEnd:e.period_end_date,promoterPct:e.promoter_holding??void 0,fiiPct:e.fii_holding??void 0,diiPct:e.dii_holding??void 0,publicPct:e.public_holding??void 0,pledgedPct:e.pledged_shares??void 0})),governance:{overall:null}}),async getAnalytics(e){let[t,s,a]=await Promise.all([i.tsDb.queryOne("SELECT close FROM daily_prices WHERE asset_id = $1 AND source_exchange IN ('NSE','BSE') AND close > 0 ORDER BY date DESC LIMIT 1",[e]),i.pgDb.queryOne(`SELECT market_cap_cr, pe_ttm, pb, ev_ebitda, roce, roe, debt_equity, pat_margin, operating_margin, revenue_growth_1y, pat_growth_1y, dividend_yield, quality_score
             FROM computed_ratios
             WHERE asset_id = $1`,[e]),i.pgDb.queryOne("SELECT composite_rating, pct_from_high FROM msi_company_data WHERE asset_id = $1",[e])]),n=t?.close??0;return{factorExposure:null,factorContext:{releaseTag:"",latestSnapshots:[],drawdowns:[]},earningsQuality:{overallScore:a?.composite_rating??null,cfoPatRatio:null,flags:[]},ratioHistory:[],ratios:{peTtm:s?.pe_ttm??void 0,pb:s?.pb??void 0,evEbitda:s?.ev_ebitda??void 0,marketCapCr:s?.market_cap_cr??void 0,price:n,pctFrom52wHigh:a?.pct_from_high??void 0,roe:s?.roe??void 0,roce:s?.roce??void 0,debtEquity:s?.debt_equity??void 0,dividendYield:s?.dividend_yield??void 0,patMargin:s?.pat_margin??void 0,operatingMargin:s?.operating_margin??void 0,revenueGrowth1y:s?.revenue_growth_1y??void 0,patGrowth1y:s?.pat_growth_1y??void 0,qualityScore:s?.quality_score??void 0}}}},follow:{async getStatus(e,t){let s=await d(t);if(!s)return{isFollowing:!1,followerCount:0,alertConfig:o()};let[a,n]=await Promise.all([i.pgDb.queryOne("SELECT alert_config FROM user_asset_follows WHERE user_id = $1 AND asset_id = $2",[e,s.id]),i.pgDb.queryOne("SELECT COUNT(*) AS follower_count FROM user_asset_follows WHERE asset_id = $1",[s.id])]);return{isFollowing:!!a,followerCount:Number(n?.follower_count??0),alertConfig:o(a?.alert_config)}},async follow(e,t,s){let a=await d(t);if(!a)throw Error(`Unknown asset: ${t}`);let n=o(s);await i.pgDb.queryOne(`INSERT INTO user_asset_follows (user_id, asset_id, alert_config)
           VALUES ($1, $2, $3::jsonb)
           ON CONFLICT (user_id, asset_id) DO UPDATE SET
             alert_config = EXCLUDED.alert_config,
             updated_at = NOW()
           RETURNING asset_id`,[e,a.id,JSON.stringify(n)])},async unfollow(e,t){let s=await d(t);s&&await i.pgDb.queryOne("DELETE FROM user_asset_follows WHERE user_id = $1 AND asset_id = $2 RETURNING asset_id",[e,s.id])}},feed:{getUserFeed:async(e,t=50,s=0)=>(await u(e)).slice(s,s+t),getUnreadCount:async e=>(await u(e)).filter(e=>!e.isRead).length,async markAsRead(e,t){for(let s of[...new Set(t.filter(Boolean))])await i.pgDb.queryOne(`INSERT INTO user_feed_reads (user_id, feed_event_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, feed_event_id) DO NOTHING
             RETURNING feed_event_id`,[e,s])}}}}e.s(["createPgAdapter",()=>c]),s()}catch(e){s(e)}},!1),44394,e=>e.a(async(t,s)=>{try{var i=e.i(34703),a=t([i]);[i]=a.then?(await a)():a;let o=null;async function n(){return o||(o=(0,i.createPgAdapter)()),o}e.s(["getDataAdapter",()=>n]),s()}catch(e){s(e)}},!1)];

//# sourceMappingURL=src_lib_data_23bc2f33._.js.map