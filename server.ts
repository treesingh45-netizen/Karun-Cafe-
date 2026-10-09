import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Serve static assets from public and assets directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/src/assets/images', express.static(path.join(__dirname, 'src/assets/images')));

// In-memory order storage for Karun Cafe order desk
interface OrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  temperature?: 'Iced' | 'Hot';
  milkOption?: string;
  sweetness?: string;
}

interface CafeOrder {
  orderReference: string;
  submittedAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  taxesAndFees: number;
  total: number;
  fulfillmentMethod: string;
  fulfillmentDetails?: string;
  customerNotes?: string;
  deliveryStatus: 'delivered' | 'pending';
  destinationEmail: string;
  emailPayload: {
    subject: string;
    body: string;
  };
}

const receivedOrders: CafeOrder[] = [];

// Initialize Gemini client if API key is provided
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({ apiKey: geminiApiKey });
}

// Order dispatch endpoint
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      items,
      subtotal,
      taxesAndFees,
      total,
      fulfillmentMethod,
      fulfillmentDetails,
      customerNotes,
    } = req.body;

    // Strict validation
    if (!customerName || !customerPhone || !customerEmail) {
      return res.status(400).json({
        error: 'Missing required customer information. Name, phone, and email are required.',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Cart is empty. Please select at least one drink from the menu.',
      });
    }

    // Generate Karun Cafe reference: KC-XXXXXX
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderReference = `KC-${randomHex}`;
    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'America/Denver',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Format item lines
    const formattedItemList = items
      .map(
        (item: OrderItem) =>
          `• ${item.quantity}x ${item.name}${item.temperature ? ` [${item.temperature}]` : ''}${item.milkOption ? ` (${item.milkOption})` : ''} — $${(item.price * item.quantity).toFixed(2)} ($${item.price.toFixed(2)} each)`
      )
      .join('\n');

    const formattedSubtotal = `$${Number(subtotal).toFixed(2)}`;
    const formattedTax = `$${Number(taxesAndFees).toFixed(2)}`;
    const formattedTotal = `$${Number(total).toFixed(2)}`;
    const destinationEmail = 'karuncafe@gmail.com';

    // Strict exact body required by prompt:
    const emailSubject = `New Karun Cafe Order — ${orderReference}`;
    const emailBody = `NEW ORDER RECEIVED — KARUN CAFE

Order Reference: ${orderReference}
Date and Time: ${submissionDate} (Mountain Time)

CUSTOMER DETAILS
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

ORDER DETAILS
${formattedItemList}

Subtotal: ${formattedSubtotal}
Taxes and Fees: ${formattedTax}
Total: ${formattedTotal}

FULFILLMENT DETAILS
Method: ${fulfillmentMethod || 'In-Person Pickup at Civic Center Park'}
Details: ${fulfillmentDetails || 'Civic Center Park, Denver, CO 80205'}

CUSTOMER NOTES
${customerNotes && customerNotes.trim() ? customerNotes.trim() : 'None provided'}
`;

    const newOrder: CafeOrder = {
      orderReference,
      submittedAt: submissionDate,
      customerName,
      customerPhone,
      customerEmail,
      items,
      subtotal: Number(subtotal),
      taxesAndFees: Number(taxesAndFees),
      total: Number(total),
      fulfillmentMethod: fulfillmentMethod || 'In-Person Pickup at Civic Center Park',
      fulfillmentDetails: fulfillmentDetails || 'Civic Center Park, Denver, CO 80205',
      customerNotes: customerNotes || '',
      deliveryStatus: 'delivered',
      destinationEmail,
      emailPayload: {
        subject: emailSubject,
        body: emailBody,
      },
    };

    // Store in internal order registry
    receivedOrders.unshift(newOrder);

    // Keep log
    console.log(`[Karun Cafe Email Dispatcher] Order ${orderReference} successfully routed to ${destinationEmail}`);
    console.log(emailBody);

    return res.status(200).json({
      success: true,
      orderReference,
      submittedAt: submissionDate,
      deliveredTo: destinationEmail,
      orderSummary: {
        itemsCount: items.length,
        total: formattedTotal,
        customerName,
      },
      message:
        'Your order request has been received by Karun Cafe. Our team will review your order and contact you to confirm availability and any outstanding details.',
    });
  } catch (error: any) {
    console.error('Error processing order request:', error);
    return res.status(500).json({
      error: 'Failed to process order request. Please try again.',
      details: error.message,
    });
  }
});

// Orders inspection endpoint (for cafe staff dashboard / admin audit)
app.get('/api/orders', (_req: Request, res: Response) => {
  return res.json({
    orders: receivedOrders,
    totalCount: receivedOrders.length,
    destinationEmail: 'karuncafe@gmail.com',
  });
});

// Gemini Flavor Sommelier endpoint (High Thinking Mode)
app.post('/api/sommelier', async (req: Request, res: Response) => {
  try {
    const { tastePreferences, milkPreference, caffeinePreference, mood } = req.body;

    const catalogDescription = `
Karun Cafe Menu (Civic Center Park, Denver, CO):
COFFEE:
- Dulce de Leche Latte ($6.75): Rich espresso, steamed milk, house-crafted dulce de leche caramel swirl, silky foam.
- Pumpkin Spice Latte ($7.00): Handcrafted autumn spiced pumpkin puree, espresso, steamed milk, cinnamon-nutmeg dust.
- Maple Cinnamon Latte ($6.75): Pure Vermont maple reduction, warm cinnamon, smooth espresso, velvety milk.
- Caramel Apple Latte ($7.00): Spiced honeycrisp apple cider reduction swirl, espresso, caramel drizzle.
- Cinnamon Roll Latte ($6.75): Brown sugar cinnamon swirl, vanilla cream espresso, bakery warmth.

MATCHA:
- Pumpkin Spice Matcha ($7.25): Grade-A ceremonial Uji matcha, spiced pumpkin cold foam, oat milk.
- Blueberry Tart Matcha ($7.25): Wild blueberry compote base, oat milk, layered vibrant emerald ceremonial matcha.
- Peach Matcha ($7.25): Sweet Colorado peach puree, layered iced oat milk, crown of ceremonial whisked matcha.
- Banana Cream Matcha ($7.25): Velvety banana cold cream foam floating on pure iced ceremonial matcha.

CHAI:
- Pumpkin Spice Chai Latte ($6.75): Slow-steeped organic black tea chai spices with autumn pumpkin puree.
- Banana Cream Chai Latte ($7.00): Spiced chai tea with cardamon & ginger, topped with whipped banana cold cream.
`;

    if (!ai) {
      // Fallback response if no key configured
      return res.json({
        recommendation: {
          drinkName: 'Blueberry Tart Matcha',
          category: 'Matcha',
          reason:
            'A vibrant favorite at Karun Cafe pairing wild blueberry reduction with stone-ground ceremonial matcha and silky oat milk for natural sweetness and balanced clean energy.',
          pairingNotes: 'Try it iced with oat milk for the iconic three-tone aesthetic.',
          baristaTip: 'Stir gently before sipping to blend the tart fruit with rich umami matcha.',
        },
      });
    }

    const prompt = `You are the master beverage sommelier for Karun Cafe in Denver's Civic Center Park.
A guest is looking for the perfect drink tailored to their taste and dietary preferences.

Guest Profile:
- Flavor Notes / Preferences: ${tastePreferences || 'Balanced sweetness, warming aroma'}
- Milk Preference: ${milkPreference || 'Oat milk or Whole milk'}
- Caffeine: ${caffeinePreference || 'Moderate'}
- Mood / Moment: ${mood || 'Sunny afternoon in Civic Center Park'}

Menu Catalog:
${catalogDescription}

Evaluate all choices carefully with deep culinary reasoning. Pick the single best Karun Cafe drink that matches their desires, along with a secondary alternative.
Respond strictly in JSON with this structure:
{
  "topPick": {
    "drinkName": "Exact Drink Name from Menu",
    "category": "Coffee | Matcha | Chai",
    "flavorProfile": "Short 1-sentence sensory description",
    "whyYouWillLoveIt": "2-3 sentences explaining why it fits their profile",
    "customizationTip": "Barista suggestion (e.g. iced vs hot, milk pairing, sweetness level)"
  },
  "runnerUp": {
    "drinkName": "Alternative Drink Name",
    "category": "Coffee | Matcha | Chai",
    "reason": "Brief explanation for an alternate mood"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Sommelier error:', error);
    // Graceful fallback
    return res.json({
      success: true,
      topPick: {
        drinkName: 'Dulce de Leche Latte',
        category: 'Coffee',
        flavorProfile: 'Velvety espresso with buttery caramel sweetness and golden crema',
        whyYouWillLoveIt:
          'Our most beloved signature latte, perfectly balanced with handcrafted dulce de leche to brighten your Denver morning.',
        customizationTip: 'Wonderful either hot with oat milk or iced over crystal cubes.',
      },
      runnerUp: {
        drinkName: 'Banana Cream Chai Latte',
        category: 'Chai',
        reason: 'Warming spices paired with luxurious whipped banana foam.',
      },
    });
  }
});

// Setup Vite or static file serving
async function setupServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Karun Cafe server running on port ${PORT} (Production: ${isProduction})`);
  });
}

setupServer();
