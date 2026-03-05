// Generated Sector and Industry Group Emojis Mapping
export const SECTOR_EMOJIS: Record<string, string> = {
  "Financial Svcs": "🏦",
  "Finance": "💳",
  "Banks": "🏛️",
  "Chemicals": "🧪",
  "Paper & Paper Products": "📜",
  "Apparel": "👕",
  "Food": "🍔",
  "Medical": "🏥",
  "Healthcare": "⚕️",
  "Bldg": "🏗️",
  "Leisure": "🏖️",
  "Auto Manufacturers": "🏭",
  "Auto/Truck": "🚙",
  "Agricultural Operations": "🚜",
  "Computer": "💻",
  "Computer Sftwr": "💾",
  "Comp Sftwr": "👨‍💻",
  "Insurance": "🛡️",
  "Electrical": "⚡",
  "Aerospace/Defense": "🚀",
  "Machinery": "⚙️",
  "Utility": "🔌",
  "Utilities": "💡",
  "Transportation": "🚆",
  "Transport": "🚚",
  "Comml Svcs": "🏢",
  "Cosmetics/Personal Care": "💄",
  "Oil&Gas": "🛢️",
  "Energy": "🔋",
  "Metal Proc & Fabrication": "🛠️",
  "Steel": "🔩",
  "Tobacco": "🚬",
  "Retail/Whlsle": "🏪",
  "Retail": "🛍️",
  "Wholesale": "📦",
  "Pollution Control": "♻️",
  "Hsehold": "🏠",
  "Hsehold/Office Furniture": "🪑",
  "Office Supplies Mfg": "🖇️",
  "Containers/Packaging": "🥡",
  "Real Estate Dvlpmt/Ops": "🏙️",
  "Mining": "⛏️",
  "Media": "📰",
  "Beverages": "🥤",
  "Telecom Svcs": "📡",
  "Telecom": "📱",
  "Diversified Operations": "🌐",
  "Consumer Svcs": "🛎️",
  "Elec": "🔌",
  "Trucks & Parts": "🚛",
  "Electronic": "📺",
  "Internet": "🌐",
  "Soap & Clng Preparatns": "🧼",
  "Security/Sfty": "🔒",
  "Consumer Prod": "🧴",
  "Metal Prds": "🔧",
  "Group Not Available": "❓",
  "Industrials": "🏗️",
  "Commodities": "🌾",
  "Financial Services": "🏦",
  "Information Technology": "💻",
  "Diversified": "🌐",
  "Services": "🛎️",
  "Consumer Discretionary": "🛍️",
  "Fast Moving Consumer Goods": "🛒",
  "Telecommunication": "📡"
};

export const INDUSTRY_GROUP_EMOJIS: Record<string, string> = {
  "Banks-Private Sector": "🏛️",
  "Banks-Public Sector": "🏦",
  "Finance-NBFC": "💳",
  "Finance-Housing": "🏠",
  "Software-Services": "👨‍💻",
  "IT-Services": "💻",
  "Chemicals-Specialty": "🧪",
  "Pharmaceuticals-Indian": "💊",
  "Banks-Money Center": "🏛️",
  "Computer-Tech Services": "💻",
  "Oil&Gas-Integrated": "🛢️",
  "Electronic-Consumer": "📺",
  "Internet-Services": "🌐",
  // Add fallback categories based on keywords if exact match isn't found
};

export function getSectorEmoji(sector: string | null): string {
  if (!sector) return "🏢";

  // Try exact match first
  if (SECTOR_EMOJIS[sector]) {
    return SECTOR_EMOJIS[sector];
  }

  // Fallback heuristics
  const s = sector.toLowerCase();
  if (s.includes("bank") || s.includes("financ")) return "🏦";
  if (s.includes("tech") || s.includes("soft") || s.includes("it")) return "💻";
  if (s.includes("health") || s.includes("pharm") || s.includes("medic")) return "🏥";
  if (s.includes("auto") || s.includes("motor")) return "🚗";
  if (s.includes("fmcg") || s.includes("food") || s.includes("beverag")) return "🛒";
  if (s.includes("chem")) return "🧪";
  if (s.includes("metal") || s.includes("steel")) return "🔩";
  if (s.includes("power") || s.includes("energy") || s.includes("gas") || s.includes("oil")) return "⚡";
  if (s.includes("infra") || s.includes("construct") || s.includes("real est")) return "🏗️";
  if (s.includes("telecom")) return "📡";
  if (s.includes("retail")) return "🛍️";
  if (s.includes("media") || s.includes("entertain")) return "🎬";

  return "🏭"; // Generic industry fallback
}

export function getIndustryGroupEmoji(group: string | null): string {
  if (!group) return "🏭";

  if (INDUSTRY_GROUP_EMOJIS[group]) {
    return INDUSTRY_GROUP_EMOJIS[group];
  }

  // Fallback heuristics for industry groups
  const g = group.toLowerCase();
  if (g.includes("bank")) return "🏛️";
  if (g.includes("financ") || g.includes("nbfc") || g.includes("credit") || g.includes("invest")) return "💳";
  if (g.includes("software") || g.includes("it-")) return "��";
  if (g.includes("pharm") || g.includes("bio") || g.includes("medic")) return "💊";
  if (g.includes("health") || g.includes("hosp")) return "🏥";
  if (g.includes("auto") || g.includes("vehic") || g.includes("tyre")) return "🚗";
  if (g.includes("chem") || g.includes("fertil") || g.includes("pestic")) return "🧪";
  if (g.includes("fmcg") || g.includes("food") || g.includes("agro") || g.includes("dairy")) return "🥐";
  if (g.includes("metal") || g.includes("steel") || g.includes("iron") || g.includes("alumin")) return "🔩";
  if (g.includes("power") || g.includes("electr") || g.includes("energy") || g.includes("utilit")) return "⚡";
  if (g.includes("gas") || g.includes("oil") || g.includes("petrol")) return "🛢️";
  if (g.includes("construct") || g.includes("infra") || g.includes("cement") || g.includes("build")) return "🏗️";
  if (g.includes("real est") || g.includes("realty")) return "🏙️";
  if (g.includes("telecom") || g.includes("cable")) return "📡";
  if (g.includes("retail") || g.includes("consum")) return "🛍️";
  if (g.includes("media") || g.includes("tv") || g.includes("cinema")) return "📺";
  if (g.includes("textil") || g.includes("apparel") || g.includes("cloth")) return "👕";
  if (g.includes("paper") || g.includes("wood") || g.includes("laminat")) return "📜";
  if (g.includes("travel") || g.includes("hotel") || g.includes("tourism") || g.includes("leisur")) return "🏖️";
  if (g.includes("transport") || g.includes("logist") || g.includes("ship") || g.includes("courier")) return "🚚";
  if (g.includes("plastic") || g.includes("packag") || g.includes("contain")) return "📦";
  if (g.includes("machin") || g.includes("equip") || g.includes("engin")) return "⚙️";

  return "🏭"; // Generic industry fallback
}
