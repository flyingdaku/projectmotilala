from __future__ import annotations

from dataclasses import dataclass, field
import re
from typing import Literal


FIELD_MAP: dict[str, str] = {
    "price": "ti.close",
    "close": "ti.close",
    "last": "ti.close",
    "c": "ti.close",
    "open": "ti.open",
    "o": "ti.open",
    "high": "ti.high",
    "h": "ti.high",
    "low": "ti.low",
    "l": "ti.low",
    "volume": "ti.volume",
    "v": "ti.volume",
    "prev_close": "ti.prev_close",
    "prev_high": "ti.prev_high",
    "prev_low": "ti.prev_low",
    "prev_open": "ti.prev_open",
    "prev_volume": "ti.prev_volume",
    "cap": "cr.market_cap_cr",
    "mcap": "cr.market_cap_cr",
    "avol": "ti.volume_ma_20",
    "advol": "(ti.close * ti.volume_ma_20 / 1000000.0)",
    "rvol": "ti.rvol",
    "chopen": "ti.chopen_pct",
    "change": "ti.change_1d_pct",
    "change_1d": "ti.change_1d_pct",
    "change_5d": "ti.change_5d_pct",
    "change_21d": "ti.change_21d_pct",
    "gapup": "ti.gap_pct",
    "gapdn": "(-1 * ti.gap_pct)",
    "sma_20": "ti.sma_20",
    "sma_50": "ti.sma_50",
    "sma_200": "ti.sma_200",
    "sma20": "ti.sma_20",
    "sma50": "ti.sma_50",
    "sma200": "ti.sma_200",
    "ema_9": "ti.ema_9",
    "ema_21": "ti.ema_21",
    "ema_50": "ti.ema_50",
    "ema_200": "ti.ema_200",
    "rsi_14": "ti.rsi_14",
    "rsi14": "ti.rsi_14",
    "macd_line": "ti.macd_line",
    "macd_signal": "ti.macd_signal",
    "macd_hist": "ti.macd_hist",
    "stoch_k": "ti.stoch_k",
    "stoch_d": "ti.stoch_d",
    "stoch_rsi": "ti.stoch_rsi",
    "cci_20": "ti.cci_20",
    "williams_r_14": "ti.williams_r_14",
    "momentum_12": "ti.momentum_12",
    "roc_10": "ti.roc_10",
    "adx_14": "ti.adx_14",
    "di_plus": "ti.di_plus_14",
    "di_minus": "ti.di_minus_14",
    "psar": "ti.psar",
    "supertrend": "ti.supertrend",
    "supertrend_dir": "ti.supertrend_dir",
    "atr_14": "ti.atr_14",
    "natr_14": "ti.natr_14",
    "bb_upper": "ti.bb_upper",
    "bb_middle": "ti.bb_middle",
    "bb_lower": "ti.bb_lower",
    "bb_pct_b": "ti.bb_pct_b",
    "bb_width": "ti.bb_width",
    "keltner_upper": "ti.keltner_upper",
    "keltner_lower": "ti.keltner_lower",
    "donchian_upper": "ti.donchian_upper",
    "donchian_lower": "ti.donchian_lower",
    "obv": "ti.obv",
    "cmf_20": "ti.cmf_20",
    "mfi_14": "ti.mfi_14",
    "volume_ma_20": "ti.volume_ma_20",
    "risunvol": "ti.flag_risunvol",
    "higher_highs_3": "ti.flag_hh3",
    "higher_closes_3": "ti.flag_hc3",
    "high_52w": "ti.high_52w",
    "low_52w": "ti.low_52w",
    "pct_from_52w_high": "ti.pct_from_52w_high",
    "pct_from_52w_low": "ti.pct_from_52w_low",
    "pct_52w_high": "ti.pct_from_52w_high",
    "pct_52w_low": "ti.pct_from_52w_low",
    "pe": "cr.pe_ttm",
    "pb": "cr.pb",
    "ev_ebitda": "cr.ev_ebitda",
    "enterprise_ebitda": "cr.ev_ebitda",
    "dvd_yield": "cr.dividend_yield",
    "div_yield": "cr.dividend_yield",
    "roce": "cr.roce",
    "roe": "cr.roe",
    "roic": "cr.roic",
    "eps": "cr.eps_ttm",
    "ebitda": "cr.ebitda_ttm",
    "pat_margin": "cr.pat_margin",
    "op_margin": "cr.operating_margin",
    "gross_margin": "cr.gross_margin",
    "debt_equity": "cr.debt_equity",
    "de": "cr.debt_equity",
    "price_book_ratio": "cr.pb",
    "current_ratio": "cr.current_ratio",
    "quick_ratio": "cr.quick_ratio",
    "interest_coverage": "cr.interest_coverage",
    "ic": "cr.interest_coverage",
    "quality_score": "cr.quality_score",
    "piotroski_f_score": "cr.piotroski_f_score",
    "altman_z_score": "cr.altman_z",
    "altman_z": "cr.altman_z",
    "beneish_m_score": "cr.beneish_m",
    "beneish_m": "cr.beneish_m",
    "rev_g1y": "cr.revenue_growth_1y",
    "rev_g3y": "cr.revenue_growth_3y",
    "rev_growth_1y": "cr.revenue_growth_1y",
    "rev_growth_3y": "cr.revenue_growth_3y",
    "pat_g1y": "cr.pat_growth_1y",
    "pat_g3y": "cr.pat_growth_3y",
    "pat_growth_1y": "cr.pat_growth_1y",
    "pat_growth_3y": "cr.pat_growth_3y",
    "eps_g1y": "cr.eps_growth_1y",
    "eps_growth_1y": "cr.eps_growth_1y",
    "fcf": "cr.free_cash_flow",
    "book_value": "cr.book_value_per_share",
    "promoter_pct": "cr.promoter_holding",
    "pledged_pct": "cr.pledged_shares_pct",
    "eps_yoy": "cr.eps_growth_1y",
    "revenue_qoq": "cr.revenue_growth_1q",
    "net_income_5y_growth": "cr.pat_growth_5y",
    "dvd_payout_ratio": "cr.dividend_payout",
    "buyback_yield_5y_avg": "cr.buyback_yield",
    "ff_beta": "ff.market_beta",
    "ff_smb": "ff.smb_loading",
    "ff_hml": "ff.hml_loading",
    "ff_wml": "ff.wml_loading",
    "ff_alpha": "ff.alpha",
    "ff_r2": "ff.r_squared",
    "quality": "cr.quality_score",
}

INDIA_INDICES: dict[str, str] = {
    "nifty50": "NIFTY 50",
    "next50": "NIFTY NEXT 50",
    "nifty100": "NIFTY 100",
    "nifty200": "NIFTY 200",
    "nifty500": "NIFTY 500",
    "sensex": "BSE SENSEX",
    "niftybank": "NIFTY BANK",
    "midcap150": "NIFTY MIDCAP 150",
    "smallcap250": "NIFTY SMALLCAP 250",
    "nifty50i": "NIFTY 50",
    "sp500": "NIFTY 50",
    "nasdaq": "NIFTY 50",
    "nasdaq100": "NIFTY NEXT 50",
    "nasd100": "NIFTY NEXT 50",
}

TYPE_MAP: dict[str, str] = {
    "stock": "EQUITY",
    "equity": "EQUITY",
    "fund": "ETF",
    "etf": "ETF",
    "reit": "REIT",
    "invit": "INVIT",
}

TOKEN_IDENT = "IDENT"
TOKEN_NUMBER = "NUMBER"
TOKEN_STRING = "STRING"
TOKEN_EOF = "EOF"

UNIVERSE_FNS = {"index", "type", "exch", "sector", "ticker", "hist"}
OUTPUT_FNS = {"sortby", "show", "draw"}
AGG_FNS = {"max", "min", "avg", "abs"}


class DslParseError(ValueError):
    pass


@dataclass(slots=True)
class Token:
    kind: str
    value: str
    pos: int


@dataclass(slots=True)
class NumberNode:
    value: float


@dataclass(slots=True)
class IdentNode:
    name: str
    args: list["Node"] = field(default_factory=list)
    array_index: int | None = None
    shift: "ShiftSpec | None" = None


@dataclass(slots=True)
class ShiftedNode:
    inner: "Node"
    shift: "ShiftSpec"


@dataclass(slots=True)
class BinaryArithNode:
    op: str
    left: "Node"
    right: "Node"


@dataclass(slots=True)
class CmpNode:
    op: str
    left: "Node"
    right: "Node"


@dataclass(slots=True)
class AndNode:
    children: list["Node"]


@dataclass(slots=True)
class OrNode:
    children: list["Node"]


@dataclass(slots=True)
class NotNode:
    child: "Node"


@dataclass(slots=True)
class SpecialNode:
    subject: "Node"
    op: str
    n: int | None = None


@dataclass(slots=True)
class AggNode:
    fn: str
    expr: "Node"
    period: int | None = None


@dataclass(slots=True)
class IffNode:
    cond: "Node"
    then_: "Node"
    else_: "Node"


@dataclass(slots=True)
class NoopNode:
    pass


@dataclass(slots=True)
class ShiftSpec:
    kind: Literal["bars", "range", "fixed", "tf", "ticker"]
    n: int | None = None
    from_: int | None = None
    to: int | None = None
    range_op: Literal["or", "and"] | None = None
    tf: str | None = None
    sym: str | None = None


Node = NumberNode | IdentNode | ShiftedNode | BinaryArithNode | CmpNode | AndNode | OrNode | NotNode | SpecialNode | AggNode | IffNode | NoopNode


def _strip_comments(src: str) -> str:
    src = re.sub(r"/\*[\s\S]*?\*/", " ", src)
    src = re.sub(r"//[^\n]*", " ", src)
    return src


def _tokenize(raw: str) -> list[Token]:
    src = _strip_comments(raw)
    tokens: list[Token] = []
    i = 0
    while i < len(src):
        if src[i].isspace():
            i += 1
            continue
        pos = i
        if src.startswith(">=", i):
            tokens.append(Token(">=", ">=", pos))
            i += 2
            continue
        if src.startswith("<=", i):
            tokens.append(Token("<=", "<=", pos))
            i += 2
            continue
        if src.startswith("..", i):
            tokens.append(Token("..", "..", pos))
            i += 2
            continue
        if src[i] in "()[]{}.,@!+-*/><=":
            tokens.append(Token(src[i], src[i], pos))
            i += 1
            continue
        if src[i].isdigit():
            j = i
            while j < len(src) and re.match(r"[0-9.]", src[j]):
                j += 1
            tokens.append(Token(TOKEN_NUMBER, src[i:j], pos))
            i = j
            continue
        if src[i] == "'":
            j = i + 1
            value_chars: list[str] = []
            while j < len(src) and src[j] != "'":
                value_chars.append(src[j])
                j += 1
            if j >= len(src):
                raise DslParseError(f"Unterminated string at pos {pos}")
            tokens.append(Token(TOKEN_STRING, "".join(value_chars), pos))
            i = j + 1
            continue
        if re.match(r"[A-Za-z_]", src[i]):
            j = i
            while j < len(src) and re.match(r"[A-Za-z0-9_]", src[j]):
                j += 1
            tokens.append(Token(TOKEN_IDENT, src[i:j].lower(), pos))
            i = j
            continue
        raise DslParseError(f"Unexpected character '{src[i]}' at pos {pos}")
    tokens.append(Token(TOKEN_EOF, "", len(src)))
    return tokens


def _nearest(period: float, available: list[int]) -> int:
    return min(available, key=lambda candidate: abs(candidate - period))


def _resolve_call(name: str, args: list[float]) -> str | None:
    lc = name.lower()
    sma_avail = [20, 50, 200]
    ema_avail = [9, 21, 50, 200]
    if lc == "sma":
        return f"ti.sma_{_nearest(args[0] if args else 50, sma_avail)}"
    if lc == "ema":
        return f"ti.ema_{_nearest(args[0] if args else 50, ema_avail)}"
    if lc == "wma":
        return "ti.wma_50"
    if lc == "dema":
        return "ti.dema_50"
    if lc == "tema":
        return "ti.tema_50"
    if lc == "hma":
        return "ti.hma_50"
    if lc == "vwma":
        return "ti.vwma_20"
    if lc == "rsi":
        return "ti.rsi_14"
    if lc == "macd":
        return "ti.macd_line"
    if lc == "macds":
        return "ti.macd_signal"
    if lc == "macdh":
        return "ti.macd_hist"
    if lc in {"stoch", "slowk"}:
        return "ti.stoch_k"
    if lc == "slowd":
        return "ti.stoch_d"
    if lc == "cci":
        return "ti.cci_20"
    if lc in {"williams", "willr"}:
        return "ti.williams_r_14"
    if lc == "mom":
        return "ti.momentum_12"
    if lc == "roc":
        return "ti.roc_10"
    if lc == "ao":
        return "ti.ao"
    if lc == "adx":
        return "ti.adx_14"
    if lc == "di_plus":
        return "ti.di_plus_14"
    if lc == "di_minus":
        return "ti.di_minus_14"
    if lc == "psar":
        return "ti.psar"
    if lc == "atr":
        return "ti.atr_14"
    if lc == "natr":
        return "ti.natr_14"
    if lc == "bb":
        return "ti.bb_middle"
    if lc == "bbub":
        return "ti.bb_upper"
    if lc == "bblb":
        return "ti.bb_lower"
    if lc == "bbwidth":
        return "ti.bb_width"
    if lc == "bbpctb":
        return "ti.bb_pct_b"
    if lc == "bbmb":
        return "ti.bb_middle"
    if lc in {"avol", "vma"}:
        return "ti.volume_ma_20"
    if lc == "advol":
        return "(ti.close * ti.volume_ma_20 / 1000000.0)"
    if lc == "rvol":
        return "ti.rvol"
    if lc == "obv":
        return "ti.obv"
    if lc == "cmf":
        return "ti.cmf_20"
    if lc == "mfi":
        return "ti.mfi_14"
    if lc == "pe":
        return "cr.pe_ttm"
    if lc == "pb":
        return "cr.pb"
    if lc == "eps":
        return "cr.eps_ttm"
    if lc == "ebitda":
        return "cr.ebitda_ttm"
    if lc == "cap":
        return "cr.market_cap_cr"
    if lc == "dvd_yield":
        return "cr.dividend_yield"
    if lc == "book_value":
        return "cr.book_value_per_share"
    if lc == "fcf":
        return "cr.free_cash_flow"
    if lc == "promoter_pct":
        return "cr.promoter_holding"
    if lc == "pledged_pct":
        return "cr.pledged_shares_pct"
    if lc == "altman_z_score":
        return "cr.altman_z"
    if lc == "beneish_m_score":
        return "cr.beneish_m"
    if lc == "piotroski_f_score":
        return "cr.quality_score"
    if lc == "gross_margin":
        return "cr.gross_margin"
    if lc == "quick_ratio":
        return "cr.quick_ratio"
    if lc == "debt_equity":
        return "cr.debt_equity"
    if lc == "interest_coverage":
        return "cr.interest_coverage"
    if lc == "rev_g1y":
        return "cr.revenue_growth_1y"
    if lc == "rev_g3y":
        return "cr.revenue_growth_3y"
    if lc == "pat_g1y":
        return "cr.pat_growth_1y"
    if lc == "pat_g3y":
        return "cr.pat_growth_3y"
    if lc == "eps_g1y":
        return "cr.eps_growth_1y"
    if lc == "pat_margin":
        return "cr.pat_margin"
    if lc == "op_margin":
        return "cr.operating_margin"
    if lc == "book_value_per_share":
        return "cr.book_value_per_share"
    if lc == "pp":
        p = args[0] if args else 5
        if p <= 1:
            return "ti.change_1d_pct"
        if p <= 7:
            return "ti.change_5d_pct"
        return "ti.change_21d_pct"
    if lc == "fibo_ta23":
        return "ti.flag_fibo23"
    if lc == "fibo_ta38":
        return "ti.flag_fibo38"
    if lc == "fibo_ta50":
        return "ti.flag_fibo50"
    if lc in {"smarsi", "smasma"}:
        return None
    return None


def _resolve_special_ident(name: str) -> str | None:
    nh_match = re.fullmatch(r"nh_(\d+|all)", name)
    if nh_match:
        return f"ti.nh_{nh_match.group(1)}"
    pp_match = re.fullmatch(r"pp_(\d+)", name)
    if pp_match:
        days = int(pp_match.group(1))
        if days <= 1:
            return "ti.change_1d_pct"
        if days <= 7:
            return "ti.change_5d_pct"
        return "ti.change_21d_pct"
    if name.startswith("cdl_"):
        return f"ti.{name}"
    if name == "ln_art":
        return "ti.flag_above_trendline"
    return None


def _lag_column(sql_col: str, n: int) -> str | None:
    if n == 0:
        return sql_col
    base = re.sub(r"^(?:ti|cr)\.", "", sql_col)
    if n == 1:
        return f"ti.lag1_{base}"
    if n == 2:
        return f"ti.lag2_{base}"
    return None


class _Parser:
    def __init__(self, src: str) -> None:
        self.tokens = _tokenize(src)
        self.pos = 0

    def cur(self) -> Token:
        return self.tokens[self.pos]

    def peek(self, offset: int = 1) -> Token:
        idx = min(self.pos + offset, len(self.tokens) - 1)
        return self.tokens[idx]

    def advance(self) -> Token:
        token = self.tokens[self.pos]
        self.pos += 1
        return token

    def check(self, kind: str, value: str | None = None) -> bool:
        token = self.cur()
        return token.kind == kind and (value is None or token.value == value)

    def try_eat(self, kind: str, value: str | None = None) -> bool:
        if self.check(kind, value):
            self.advance()
            return True
        return False

    def eat(self, kind: str, value: str | None = None) -> Token:
        if not self.check(kind, value):
            token = self.cur()
            expected = value or kind
            raise DslParseError(f"DSL parse error at pos {token.pos}: Expected {expected} but got '{token.value}'")
        return self.advance()

    def parse(self) -> Node:
        node = self.parse_expr()
        if not self.check(TOKEN_EOF):
            token = self.cur()
            raise DslParseError(f"DSL parse error at pos {token.pos}: Unexpected token '{token.value}'")
        return node

    def parse_expr(self) -> Node:
        return self.parse_or()

    def parse_or(self) -> Node:
        node = self.parse_and()
        while self.check(TOKEN_IDENT, "or"):
            self.advance()
            right = self.parse_and()
            if isinstance(node, OrNode):
                node.children.append(right)
            else:
                node = OrNode([node, right])
        return node

    def parse_and(self) -> Node:
        node = self.parse_not()
        while self.check(TOKEN_IDENT, "and"):
            self.advance()
            right = self.parse_not()
            if isinstance(node, AndNode):
                node.children.append(right)
            else:
                node = AndNode([node, right])
        return node

    def parse_not(self) -> Node:
        if self.check("!") or self.check(TOKEN_IDENT, "not"):
            self.advance()
            return NotNode(self.parse_not())
        return self.parse_cmp()

    def parse_cmp(self) -> Node:
        if self.check(TOKEN_IDENT) and self.cur().value in UNIVERSE_FNS:
            return self.parse_universe_noop()
        if self.check(TOKEN_IDENT) and self.cur().value in OUTPUT_FNS:
            return self.parse_output_noop()
        left = self.parse_arith()
        special = self.try_parse_special(left)
        if special is not None:
            return special
        if self.check(">") or self.check(">=") or self.check("<") or self.check("<=") or self.check("="):
            op = self.advance().value
            right = self.parse_arith()
            return CmpNode(op, left, right)
        if self.check(TOKEN_IDENT, "ca") or self.check(TOKEN_IDENT, "cb"):
            op = self.advance().value
            right = self.parse_arith()
            return CmpNode(op, left, right)
        return left

    def try_parse_special(self, subject: Node) -> SpecialNode | None:
        if not self.check(TOKEN_IDENT):
            return None
        token = self.cur()
        if token.value in {"trend_up", "trend_dn", "higher_highs", "higher_closes"}:
            self.advance()
            n = int(float(self.advance().value)) if self.check(TOKEN_NUMBER) else (1 if "trend" in token.value else 3)
            return SpecialNode(subject=subject, op=token.value, n=n)
        if token.value in {"risunvol", "div_bull", "div_bear"}:
            self.advance()
            return SpecialNode(subject=subject, op=token.value)
        return None

    def parse_arith(self) -> Node:
        node = self.parse_term()
        while self.check("+") or self.check("-"):
            op = self.advance().value
            node = BinaryArithNode(op, node, self.parse_term())
        return node

    def parse_term(self) -> Node:
        node = self.parse_unary()
        while self.check("*") or self.check("/"):
            op = self.advance().value
            node = BinaryArithNode(op, node, self.parse_unary())
        return node

    def parse_unary(self) -> Node:
        if self.check("-"):
            self.advance()
            return BinaryArithNode("*", NumberNode(-1), self.parse_atom())
        return self.parse_atom()

    def parse_atom(self) -> Node:
        token = self.cur()
        if token.kind == "(":
            self.advance()
            inner = self.parse_expr()
            self.eat(")")
            while self.check("@"):
                self.advance()
                inner = ShiftedNode(inner=inner, shift=self.parse_shift_spec())
            return inner
        if token.kind == TOKEN_NUMBER:
            self.advance()
            return NumberNode(float(token.value))
        if token.kind == TOKEN_IDENT and token.value == "iff":
            return self.parse_iff()
        if token.kind == TOKEN_IDENT and token.value in AGG_FNS:
            return self.parse_agg()
        if token.kind == TOKEN_IDENT:
            return self.parse_ident_expr()
        raise DslParseError(f"DSL parse error at pos {token.pos}: Unexpected token '{token.value}'")

    def parse_ident_expr(self) -> IdentNode:
        name = self.eat(TOKEN_IDENT).value
        args: list[Node] = []
        if self.check("("):
            self.advance()
            if not self.check(")"):
                args.append(self.parse_arg())
                while self.try_eat(","):
                    args.append(self.parse_arg())
            self.eat(")")
        array_index: int | None = None
        if self.check("[") and self.peek().kind == TOKEN_NUMBER:
            self.advance()
            array_index = int(float(self.eat(TOKEN_NUMBER).value))
            self.eat("]")
        shift: ShiftSpec | None = None
        while self.check("@"):
            self.advance()
            shift = self.parse_shift_spec()
        return IdentNode(name=name, args=args, array_index=array_index, shift=shift)

    def parse_arg(self) -> Node:
        token = self.cur()
        if token.kind == TOKEN_STRING:
            self.advance()
            return IdentNode(name=token.value, args=[])
        return self.parse_arith()

    def parse_shift_spec(self) -> ShiftSpec:
        token = self.cur()
        if token.kind == "[":
            self.advance()
            start = int(float(self.eat(TOKEN_NUMBER).value))
            self.eat("..")
            end = int(float(self.eat(TOKEN_NUMBER).value))
            self.eat("]")
            return ShiftSpec(kind="range", from_=start, to=end, range_op="or")
        if token.kind == "{":
            self.advance()
            start = int(float(self.eat(TOKEN_NUMBER).value))
            self.eat("..")
            end = int(float(self.eat(TOKEN_NUMBER).value))
            self.eat("}")
            return ShiftSpec(kind="range", from_=start, to=end, range_op="and")
        if token.kind == TOKEN_IDENT and token.value == "fixed":
            self.advance()
            return ShiftSpec(kind="fixed")
        if token.kind == TOKEN_IDENT and token.value in {"daily", "weekly", "monthly", "hourly", "h4"}:
            self.advance()
            return ShiftSpec(kind="tf", tf=token.value)
        if token.kind == TOKEN_NUMBER:
            return ShiftSpec(kind="bars", n=int(float(self.advance().value)))
        if token.kind == TOKEN_IDENT:
            return ShiftSpec(kind="ticker", sym=self.advance().value)
        raise DslParseError(f"DSL parse error at pos {token.pos}: Expected shift specifier after @")

    def parse_universe_noop(self) -> NoopNode:
        self.advance()
        self.eat("(")
        depth = 1
        while depth > 0:
            token = self.advance()
            if token.kind == "(":
                depth += 1
            elif token.kind == ")":
                depth -= 1
            elif token.kind == TOKEN_EOF:
                raise DslParseError("Unexpected end of formula inside universe function")
        return NoopNode()

    def parse_output_noop(self) -> NoopNode:
        return self.parse_universe_noop()

    def parse_agg(self) -> AggNode:
        fn = self.eat(TOKEN_IDENT).value
        self.eat("(")
        expr = self.parse_arith()
        period: int | None = None
        if self.try_eat(","):
            period = int(float(self.eat(TOKEN_NUMBER).value))
        self.eat(")")
        return AggNode(fn=fn, expr=expr, period=period)

    def parse_iff(self) -> IffNode:
        self.eat(TOKEN_IDENT, "iff")
        self.eat("(")
        cond = self.parse_expr()
        self.eat(",")
        then_ = self.parse_arith()
        self.eat(",")
        else_ = self.parse_arith()
        self.eat(")")
        return IffNode(cond=cond, then_=then_, else_=else_)


def _resolve_ident(node: IdentNode) -> str:
    if node.args:
        arg_vals: list[float] = []
        for arg in node.args:
            if isinstance(arg, NumberNode):
                arg_vals.append(arg.value)
            else:
                arg_vals.append(0.0)
        resolved = _resolve_call(node.name, arg_vals)
        if resolved is not None:
            return resolved
    mapped = FIELD_MAP.get(node.name.lower())
    if mapped is not None:
        return mapped
    special = _resolve_special_ident(node.name.lower())
    if special is not None:
        return special
    raise DslParseError(f"Unknown field: {node.name}")


def _with_shift(node: Node, shift: ShiftSpec, params: list[object]) -> str:
    if shift.kind == "bars":
        return _gen_expr_with_lag(node, shift.n or 0, params)
    if shift.kind == "range":
        parts = [_gen_expr_with_lag(node, lag, params) for lag in range(shift.from_ or 0, (shift.to or 0) + 1)]
        joiner = " OR " if shift.range_op == "or" else " AND "
        return f"({' '.join([])})" if not parts else f"({joiner.join(parts)})"
    if shift.kind == "fixed":
        return _gen(node, params)
    if shift.kind == "tf":
        return _gen(node, params)
    if shift.kind == "ticker":
        return _gen_regime_filter(node, shift.sym or "", params)
    raise DslParseError("Unsupported shift")


def _gen_regime_filter(node: Node, sym: str, params: list[object]) -> str:
    index_name = INDIA_INDICES.get(sym.lower())
    if index_name is None:
        return "TRUE"
    if not isinstance(node, IdentNode):
        return "TRUE"
    col = _resolve_ident(node)
    params.append(index_name)
    idx = len(params)
    return (
        f"(SELECT {col.replace('ti.', 'rti.')} "
        "FROM assets ra "
        "JOIN technical_indicators rti ON rti.asset_id = ra.id "
        "AND rti.computed_date = (SELECT MAX(computed_date) FROM technical_indicators) "
        f"WHERE ra.name = ${idx} LIMIT 1)"
    )


def _gen_expr_with_lag(node: Node, lag: int, params: list[object]) -> str:
    if lag == 0:
        return _gen(node, params)
    if isinstance(node, IdentNode):
        col = _resolve_ident(node)
        lagged = _lag_column(col, lag)
        return lagged or col
    if isinstance(node, BinaryArithNode):
        return f"({_gen_expr_with_lag(node.left, lag, params)} {node.op} {_gen_expr_with_lag(node.right, lag, params)})"
    if isinstance(node, NumberNode):
        return str(node.value)
    return _gen(node, params)


def _gen_crossed(left_sql: str, right_sql: str, left_node: Node, right_node: Node, direction: str) -> str:
    lag1_left = left_sql if isinstance(left_node, NumberNode) else (_lag_column(left_sql, 1) or left_sql)
    lag1_right = right_sql if isinstance(right_node, NumberNode) else (_lag_column(right_sql, 1) or right_sql)
    if direction == "above":
        return f"({left_sql} >= {right_sql} AND {lag1_left} < {lag1_right})"
    return f"({left_sql} <= {right_sql} AND {lag1_left} > {lag1_right})"


def _gen(node: Node, params: list[object]) -> str:
    if isinstance(node, NumberNode):
        return str(node.value)
    if isinstance(node, IdentNode):
        col = _resolve_ident(node)
        if node.array_index is not None and node.array_index > 0:
            return _lag_column(col, node.array_index) or col
        if node.shift is not None:
            return _with_shift(IdentNode(name=node.name, args=node.args), node.shift, params)
        return col
    if isinstance(node, ShiftedNode):
        return _with_shift(node.inner, node.shift, params)
    if isinstance(node, BinaryArithNode):
        return f"({_gen(node.left, params)} {node.op} {_gen(node.right, params)})"
    if isinstance(node, CmpNode):
        left_sql = _gen(node.left, params)
        right_sql = _gen(node.right, params)
        if isinstance(node.left, NumberNode):
            params.append(node.left.value)
            left_sql = f"${len(params)}"
        if isinstance(node.right, NumberNode):
            params.append(node.right.value)
            right_sql = f"${len(params)}"
        if node.op == "ca":
            return _gen_crossed(left_sql, right_sql, node.left, node.right, "above")
        if node.op == "cb":
            return _gen_crossed(left_sql, right_sql, node.left, node.right, "below")
        return f"{left_sql} {node.op} {right_sql}"
    if isinstance(node, AndNode):
        parts = [_gen(child, params) for child in node.children]
        parts = [part for part in parts if part and part != "TRUE"]
        if not parts:
            return "TRUE"
        if len(parts) == 1:
            return parts[0]
        return f"({' AND '.join(parts)})"
    if isinstance(node, OrNode):
        parts = [_gen(child, params) for child in node.children]
        parts = [part for part in parts if part and part != "TRUE"]
        if not parts:
            return "TRUE"
        if len(parts) == 1:
            return parts[0]
        return f"({' OR '.join(parts)})"
    if isinstance(node, NotNode):
        inner = _gen(node.child, params)
        return "FALSE" if inner == "TRUE" else f"NOT ({inner})"
    if isinstance(node, SpecialNode):
        subject_sql = _gen(node.subject, params)
        if node.op == "trend_up":
            lagged = _lag_column(subject_sql, node.n or 1) or _lag_column(subject_sql, 1)
            return f"({subject_sql} > {lagged})" if lagged else f"{subject_sql} IS NOT NULL"
        if node.op == "trend_dn":
            lagged = _lag_column(subject_sql, node.n or 1) or _lag_column(subject_sql, 1)
            return f"({subject_sql} < {lagged})" if lagged else f"{subject_sql} IS NOT NULL"
        if node.op == "higher_highs":
            return f"(ti.flag_hh_{node.n or 3} = 1)"
        if node.op == "higher_closes":
            return f"(ti.flag_hc_{node.n or 3} = 1)"
        if node.op == "risunvol":
            return "(ti.change_1d_pct > 0 AND ti.rvol > 1.5)"
        if node.op == "div_bull":
            return "(ti.flag_div_bull = 1)"
        if node.op == "div_bear":
            return "(ti.flag_div_bear = 1)"
        raise DslParseError(f"Unsupported special operator: {node.op}")
    if isinstance(node, AggNode):
        inner = _gen(node.expr, params)
        if node.fn == "abs":
            return f"ABS({inner})"
        return inner
    if isinstance(node, IffNode):
        return f"(CASE WHEN {_gen(node.cond, params)} THEN {_gen(node.then_, params)} ELSE {_gen(node.else_, params)} END)"
    if isinstance(node, NoopNode):
        return "TRUE"
    raise DslParseError("Unsupported DSL expression")


def parse_dsl_formula(formula: str, params: list[object]) -> str:
    trimmed = formula.strip()
    if not trimmed:
        raise DslParseError("Formula cannot be empty")
    parsed = _Parser(trimmed).parse()
    return _gen(parsed, params)


def validate_dsl_formula(formula: str) -> tuple[bool, str | None]:
    try:
        parse_dsl_formula(formula, [])
        return True, None
    except DslParseError as exc:
        return False, str(exc)
