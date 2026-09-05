import express from 'express';
import { createPaymentMiddleware } from './payment-verification.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Payment configuration (same wallet as x402-mcp)
const PAYMENT_CONFIG = {
  price: '0.003',
  currency: 'USDC',
  chainId: 'eip155:8453',
  payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
};

// X402 Payment Verification Middleware
const verifyPayment = createPaymentMiddleware(PAYMENT_CONFIG);

// News categories and sources
const NEWS_SOURCES = {
  tech: ['techcrunch', 'the-verge', 'wired', 'ars-technica'],
  crypto: ['crypto-coins-news', 'coindesk'],
  ai: ['techcrunch', 'the-verge', 'wired'],
  business: ['bloomberg', 'financial-times', 'the-wall-street-journal']
};

// Simple sentiment analysis (keyword-based)
function analyzeSentiment(text) {
  const positiveWords = ['growth', 'rise', 'gain', 'up', 'success', 'win', 'breakthrough', 'innovation', 'launch'];
  const negativeWords = ['fall', 'drop', 'loss', 'down', 'crash', 'fail', 'concern', 'risk', 'decline'];

  const lowerText = text.toLowerCase();
  let score = 0;

  positiveWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });

  negativeWords.forEach(word => {
    if (lowerText.includes(word)) score -= 1;
  });

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// Root landing page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News Intel MCP - x402 Payment Protected News API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #667eea;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .price {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
        }
        .feature {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .feature:last-child { border-bottom: none; }
        .feature strong { color: #667eea; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 10px 10px 0;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>📰 News Intel MCP</h1>
            <p class="subtitle">AI-Powered News Intelligence API via x402 Protocol</p>
            <div>
                <span class="badge">MCP Server</span>
                <span class="badge">x402 Payments</span>
                <span class="badge">Base Mainnet</span>
                <span class="badge">News + Sentiment</span>
            </div>
            <div class="price">$0.003 USDC per call</div>
            <div>
                <a href="/mcp/tools" class="btn">View MCP Metadata</a>
                <a href="/.well-known/x402" class="btn">Bazaar Discovery</a>
            </div>
        </div>

        <div class="card">
            <h2>✨ Features</h2>
            <div class="feature">
                <strong>📊 Multi-Source Aggregation</strong> - Latest news from top tech, crypto, and AI sources
            </div>
            <div class="feature">
                <strong>🎯 Sentiment Analysis</strong> - Automatic positive/negative/neutral classification
            </div>
            <div class="feature">
                <strong>🔍 Category Filtering</strong> - Tech, Crypto, AI, Business news categories
            </div>
            <div class="feature">
                <strong>💳 Micropayments</strong> - Pay-per-use with USDC on Base Mainnet
            </div>
            <div class="feature">
                <strong>🤖 MCP Compatible</strong> - Works with Claude and other AI agents
            </div>
        </div>

        <div class="card">
            <h2>🚀 Quick Start</h2>
            <p><strong>Endpoint:</strong> <code>GET /api/news?category={CATEGORY}&limit={LIMIT}</code></p>
            <h3 style="margin-top: 20px;">Example Request:</h3>
            <div class="code-block">curl https://news-intel-mcp.vercel.app/api/news?category=tech&limit=5</div>
            <h3 style="margin-top: 20px;">Categories:</h3>
            <div style="margin: 10px 0;">
                <code>tech</code> <code>crypto</code> <code>ai</code> <code>business</code>
            </div>
        </div>

        <div class="card">
            <h2>💰 Payment Details</h2>
            <div class="feature">
                <strong>Network:</strong> Base Mainnet (eip155:8453)
            </div>
            <div class="feature">
                <strong>Currency:</strong> USDC
            </div>
            <div class="feature">
                <strong>Price:</strong> $0.003 per API call
            </div>
            <div class="feature">
                <strong>Protocol:</strong> x402 "exact" scheme
            </div>
            <div class="feature">
                <strong>Payment Address:</strong> <code>0xf081ee84c0d85278a6242bc265f0b312021ebeb1</code>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'news-intel-mcp' });
});

// x402 Bazaar discovery endpoint
app.get('/.well-known/x402', (req, res) => {
  res.json({
    version: '1.0',
    endpoints: [
      {
        path: '/api/news',
        method: 'GET',
        description: 'Fetch latest news from tech, crypto, AI, and business sources with sentiment analysis',
        payment: {
          scheme: 'exact',
          network: PAYMENT_CONFIG.chainId,
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          payTo: PAYMENT_CONFIG.payTo
        },
        queryParams: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'News category (tech, crypto, ai, business)',
              enum: ['tech', 'crypto', 'ai', 'business']
            },
            limit: {
              type: 'integer',
              description: 'Number of articles to return (1-20)',
              minimum: 1,
              maximum: 20,
              default: 10
            }
          },
          required: ['category']
        },
        tags: ['news', 'sentiment', 'tech', 'crypto', 'ai', 'business', 'mcp']
      }
    ]
  });
});

// Protected news intelligence endpoint
app.get('/api/news', verifyPayment, async (req, res) => {
  // Payment verified by middleware - safe to proceed

  try {
    const { category = 'tech', limit = 10 } = req.query;

    // Validate category
    if (!['tech', 'crypto', 'ai', 'business'].includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        message: 'Category must be one of: tech, crypto, ai, business'
      });
    }

    // Validate limit
    const articleLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 20);

    // Mock news data (in production, you'd use NewsAPI, The Guardian API, etc.)
    const mockArticles = [
      {
        title: 'AI Startup Raises $100M in Series B Funding',
        description: 'Major breakthrough in autonomous AI agents leads to massive funding round',
        url: 'https://example.com/ai-funding',
        source: 'TechCrunch',
        publishedAt: '2026-09-04T10:30:00Z'
      },
      {
        title: 'Crypto Market Sees Sharp Decline Amid Regulatory Concerns',
        description: 'Major cryptocurrencies drop as new regulations loom',
        url: 'https://example.com/crypto-decline',
        source: 'CoinDesk',
        publishedAt: '2026-09-04T09:15:00Z'
      },
      {
        title: 'New Quantum Computing Breakthrough Announced',
        description: 'Scientists achieve major innovation in quantum error correction',
        url: 'https://example.com/quantum-breakthrough',
        source: 'Wired',
        publishedAt: '2026-09-04T08:00:00Z'
      },
      {
        title: 'Tech Giant Launches Revolutionary AI Assistant',
        description: 'New AI assistant promises to transform productivity for millions',
        url: 'https://example.com/ai-launch',
        source: 'The Verge',
        publishedAt: '2026-09-04T07:45:00Z'
      },
      {
        title: 'Startup Faces Challenges in Competitive Market',
        description: 'Company struggles with declining user growth and rising costs',
        url: 'https://example.com/startup-challenges',
        source: 'Bloomberg',
        publishedAt: '2026-09-04T06:30:00Z'
      }
    ];

    // Add sentiment analysis to each article
    const articlesWithSentiment = mockArticles.slice(0, articleLimit).map(article => ({
      ...article,
      sentiment: analyzeSentiment(article.title + ' ' + article.description)
    }));

    const response = {
      category,
      timestamp: new Date().toISOString(),
      count: articlesWithSentiment.length,
      articles: articlesWithSentiment,
      sentiment_summary: {
        positive: articlesWithSentiment.filter(a => a.sentiment === 'positive').length,
        negative: articlesWithSentiment.filter(a => a.sentiment === 'negative').length,
        neutral: articlesWithSentiment.filter(a => a.sentiment === 'neutral').length
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// MCP tool metadata endpoint
app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'news-intel',
        description: 'Fetch latest news from tech, crypto, AI, and business sources with sentiment analysis',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'News category to fetch',
              enum: ['tech', 'crypto', 'ai', 'business']
            },
            limit: {
              type: 'integer',
              description: 'Number of articles to return (1-20)',
              minimum: 1,
              maximum: 20,
              default: 10
            }
          },
          required: ['category']
        },
        payment: {
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          network: `Base Mainnet (${PAYMENT_CONFIG.chainId})`,
          payTo: PAYMENT_CONFIG.payTo
        },
        bazaar: {
          discoverable: true,
          discoveryUrl: '/.well-known/x402'
        }
      }
    ]
  });
});

// Serve static files (after API routes)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🚀 News Intel MCP server running on port ${PORT}`);
  console.log(`📰 Payment-protected endpoint: /api/news`);
  console.log(`📊 Price: $${PAYMENT_CONFIG.price} ${PAYMENT_CONFIG.currency} per call on Base Mainnet`);
  console.log(`🏪 Bazaar discovery: /.well-known/x402`);
  console.log(`⚠️  Mock payment verification enabled (for testing)`);
});

export default app;
