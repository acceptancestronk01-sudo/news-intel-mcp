# News Intel MCP

**x402 Payment-Protected News Intelligence API**

Get the latest tech, crypto, AI, and business news with automated sentiment analysis. Perfect for AI agents doing market research, trend analysis, or staying informed.

## 🚀 Features

- **Multi-Source News Aggregation** - Latest articles from top sources
- **Sentiment Analysis** - Automatic positive/negative/neutral classification
- **Category Filtering** - Tech, Crypto, AI, Business
- **x402 Micropayments** - Pay $0.003 USDC per call on Base Mainnet
- **MCP Compatible** - Works with Claude and other AI agents

## 📡 Live Endpoint

**Base URL**: `https://news-intel-mcp.vercel.app`

### Get News

```bash
GET /api/news?category={CATEGORY}&limit={LIMIT}
```

**Parameters:**
- `category` (required): `tech`, `crypto`, `ai`, or `business`
- `limit` (optional): Number of articles (1-20, default: 10)

**Example:**
```bash
curl https://news-intel-mcp.vercel.app/api/news?category=tech&limit=5
```

**Response (402 Payment Required):**
```json
{
  "error": "Payment Required",
  "payment": {
    "scheme": "exact",
    "network": "eip155:8453",
    "price": "$0.003",
    "currency": "USDC",
    "payTo": "0xf081ee84c0d85278a6242bc265f0b312021ebeb1"
  }
}
```

## 🔍 Discovery Endpoints

- **Bazaar Discovery**: `/.well-known/x402`
- **MCP Metadata**: `/mcp/tools`
- **Health Check**: `/health`

## 💰 Payment Details

- **Network**: Base Mainnet (Chain ID: eip155:8453)
- **Currency**: USDC
- **Price**: $0.003 per API call
- **Protocol**: x402 "exact" scheme
- **Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## 🤖 Use with AI Agents

This MCP server is designed to work with Claude Code and other AI agents that support the Model Context Protocol (MCP) and x402 payments.

AI agents can:
1. Discover the service on x402 Bazaar
2. Pay via CDP Facilitator
3. Fetch news with sentiment analysis
4. Use insights for research and analysis

## 📦 Response Format

```json
{
  "category": "tech",
  "timestamp": "2026-09-04T17:11:39.803Z",
  "count": 5,
  "articles": [
    {
      "title": "AI Startup Raises $100M",
      "description": "Major breakthrough...",
      "url": "https://...",
      "source": "TechCrunch",
      "publishedAt": "2026-09-04T10:30:00Z",
      "sentiment": "positive"
    }
  ],
  "sentiment_summary": {
    "positive": 3,
    "negative": 1,
    "neutral": 1
  }
}
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Development mode with auto-reload
npm run dev
```

## 📝 License

MIT

## 🔗 Links

- **Live API**: https://news-intel-mcp.vercel.app
- **x402 Bazaar**: https://x402bazaar.app
- **MCP Protocol**: https://modelcontextprotocol.io

---

Built with ❤️ for the AI agent ecosystem
