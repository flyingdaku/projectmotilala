import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0',
    'Cookie': 'msAuth=GSlpWKGwZk2EYi9SLijnd5XQxZkY99vUAZ4pnX9w3DwThqgEhfD//fvnIQ19HJf1NwmPyQdLC2kFAvVrTwyyTb4Ts6K0atcWuQpevxn3FIs6RHfFLQ2Aa9hIt/A2fhhNR6YdBt/rnciwDvJF6lPubTPAXvBQFYUiSZzYEpckngUSy1njfNp7kqcmHqZiElYRNH4+OGqgEwDoGSdPQjj1U3d13KWaaeCATY8rF7l2P3Nx+g9bfqntcHbkWTUn79YqjH9A26QoWdM42IyvUvKg5R/4P/HC9QlZDbjob5nkWGd2KCnvPyzXdRp85U1pftdSx6suAQPBaahiSSFusjvdjJFfSG/VqmHCXGE7N4ZLogbL8UkLQtjocREiAl+Og9TtXnj+0pEFarjM/kWsU+c9/NvdOGhHO4Ibe2HQ9p1snY66x6kyMr6sN/hf//2RiUp81QI+48E2i0yPmaeDvgBNyhOCAjCFZ6JzaMf4JOpnJnZPg0SvWNYd89B5gHKjL0CWWj4E5/Q2xg75DfcdRfZ/z6U/3gmb8oCBrsN1wBtUXnxrdLHI0mY4/VniXZOOX7Fn/EzdEnly6EMHHq6pIu5TECqGrYUdbP6LyhXI7Kf/QVFuFiG0B8f23RcQB/d/j1dzcWo+F9bzMzf+61uaGKQZEg==; MSSESSIONID=3990+MarketSmithINDUID-Web0000000000+MarketSmithINDUID-Web0000000000+0+263712170209+-2787910421'
}

url = "https://marketsmithindia.com/gateway/simple-api/ms-india/instr/0/3023127/financeDetails.json?isConsolidated=true&ms-auth=3990+MarketSmithINDUID-Web0000000000+MarketSmithINDUID-Web0000000000+0+263712170209+-2787910421"
resp = requests.get(url, headers=headers).json()
print("RELIANCE Consolidated Data Check:")
print("incAnnualData length:", len(resp.get('incAnnualData', [])))
if len(resp.get('incAnnualData', [])) > 0:
    print(json.dumps(resp.get('incAnnualData', [])[0], indent=2))
