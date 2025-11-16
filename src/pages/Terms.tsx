import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Terms & Conditions</h1>
        <p className="text-center text-muted-foreground mb-8">
          <strong>Last Updated:</strong> November 16, 2025
        </p>

        <Card className="mb-6">
          <CardContent className="pt-6 prose prose-sm max-w-none">
            <p>
              Welcome to <strong>BABY-BOO CLOSET</strong> ("we", "our", "us"). By accessing or using our website, you agree to follow these Terms & Conditions. If you do not agree, please do not use our website.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. About Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              BABY-BOO CLOSET is an online platform based in <strong>Greater Accra, Ghana</strong>, offering wholesale and retail clothing, underwear, and school uniforms. Users may also create accounts and upload items for sale.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Use of Our Website</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">By using our site, you agree that you will:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide accurate account information</li>
              <li>Not upload harmful, illegal, or offensive content</li>
              <li>Not attempt to hack, disrupt, or misuse our platform</li>
              <li>Not impersonate another person or business</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You must be <strong>18 years or older</strong> to create an account or upload items.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You are responsible for keeping your login details safe.</li>
              <li>Any activity conducted through your account is your responsibility.</li>
              <li>We may suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Uploading Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">Users may upload items for sale; however:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Items must be accurately described</li>
              <li>No counterfeit, illegal, or prohibited products</li>
              <li>We may remove any listing that violates our rules or laws</li>
              <li>We do <strong>NOT</strong> accept returned items delivered <strong>after 24 hours</strong></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We do our best to display accurate product images and pricing. However, slight differences in colour or sizing may occur.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Orders, Payments & Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Prices are listed in Ghanaian cedis (GH₵)</li>
              <li>Orders are confirmed only after payment</li>
              <li>Delivery fees may apply depending on location</li>
              <li>We do <strong>not</strong> accept returned items after <strong>24 hours</strong> of delivery</li>
              <li>Items must be returned unused and in original condition</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Refund & Return Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              You are allowed to return items <strong>within 24 hours</strong> of delivery only if:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>The item is defective</li>
              <li>The item received is different from what was ordered</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              After 24 hours, <strong>no returns or refunds</strong> are accepted.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. User-Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              By uploading content (photos, descriptions, etc.), you give BABY-BOO CLOSET permission to display and use that content on the platform. You are responsible for ensuring that anything you upload:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Is yours to upload</li>
              <li>Does not infringe on copyrights or trademarks</li>
              <li>Is not harmful, illegal, or misleading</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All content on BABY-BOO CLOSET — logos, text, images, layout — is owned by us. You may not copy, redistribute, or use our content without permission.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>10. Third-Party Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our website may contain links to third-party sites. We are not responsible for their content, actions, or privacy practices.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>11. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">We are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Loss of data</li>
              <li>Damaged devices</li>
              <li>Delays in shipping</li>
              <li>Errors caused by third-party services</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Our website is used <strong>at your own risk</strong>.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>12. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update these Terms at any time. Continued use of our website means you accept the updated Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>13. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of <strong>Ghana</strong>.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Terms;
