# Google Sheets Integration Setup

This guide explains how to set up Google Sheets integration for BBY-BOO CLOSET's admin panel.

## Step 1: Create Google Sheets Template

Create a new Google Sheet with the following columns (Row 1):

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | ID | Unique identifier | product-001 |
| B | Name | Product name | "Cute Baby Dress" |
| C | Price | Current price | 24.99 |
| D | Original Price | Original price (optional) | 34.99 |
| E | Image URL | Google Drive image URL | https://drive.google.com/uc?id=FILE_ID |
| F | Category | Product category | "Dresses" |
| G | Customizable | Is customizable (true/false) | true |
| H | Colors | Available colors (comma-separated) | "#ff0000,#00ff00,#0000ff" |
| I | Sizes | Available sizes (comma-separated) | "XS,S,M,L,XL" |
| J | Description | Product description | "Beautiful dress for kids" |
| K | Stock | Stock quantity | 50 |

## Step 2: Configure Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only

## Step 3: Share Your Sheet

1. Click "Share" button in your Google Sheet
2. Change permissions to "Anyone with the link can view"
3. Copy the sheet ID from the URL

## Step 4: Upload Images to Google Drive

1. Create a folder in Google Drive for product images
2. Upload images to this folder
3. Right-click each image → Get shareable link
4. Extract the FILE_ID from the URL
5. Use format: `https://drive.google.com/uc?id=FILE_ID`

## Step 5: Configure Admin Panel

1. Go to Admin Dashboard → Google Sheets tab
2. Enter your Google Sheets ID
3. Enter your API key
4. Click "Sync from Google Sheets"

## Sample Google Sheets Data

```
ID          | Name                    | Price | Original | Image URL                          | Category      | Customizable | Colors           | Sizes
product-001 | Cute Baby Summer Dress  | 24.99 | 34.99    | https://drive.google.com/uc?id=123 | Dresses       | true         | #ff69b4,#87ceeb  | XS,S,M,L
product-002 | School Polo Shirt       | 19.99 |          | https://drive.google.com/uc?id=456 | School Uniform| true         | #ffffff,#000080  | S,M,L,XL
```

## Automation Options

### Option 1: Manual Sync
- Admin clicks "Sync" button in admin panel
- Immediately pulls latest data from Google Sheets

### Option 2: Scheduled Sync (Future Enhancement)
- Set up automatic sync every hour/day
- Use Google Apps Script triggers
- Webhook notifications on sheet changes

## Security Notes

- Keep your API key secure
- Don't commit API keys to version control
- Use environment variables for production
- Regularly rotate API keys
- Monitor API usage in Google Cloud Console

## Troubleshooting

### Common Issues:

1. **"Sheet not found" error**
   - Check if sheet ID is correct
   - Ensure sheet is shared publicly

2. **"API key invalid" error**
   - Verify API key is correct
   - Check if Google Sheets API is enabled

3. **"Images not loading" error**
   - Ensure Google Drive images are public
   - Use correct Drive URL format

### Support

For technical support, contact the development team or check the project documentation.