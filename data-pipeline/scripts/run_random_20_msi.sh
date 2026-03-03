#!/bin/bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline

# Let's run a loop for each symbol
SYMBOLS=("TAKE" "VINATIORGA" "OFSS" "IGPL" "MIDWESTLTD" "GPPL" "RELTD" "NIBL" "JYOTISTRUC" "SVLL" "DATAMATICS" "TOTAL" "VINCOFE" "VISASTEEL" "MUFTI" "VIKRAMSOLR" "JSWSTEEL" "RPGLIFE" "CONCOR" "MCLEODRUSS")

for sym in "${SYMBOLS[@]}"; do
    python3 scripts/scrape_msi.py --auth '3990+MarketSmithINDUID-Web0000000000+MarketSmithINDUID-Web0000000000+0+263712170209+-2787910421' --symbol "$sym" --db db/market_data.db
done
