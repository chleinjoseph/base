
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-start mb-8">
            <Button asChild variant="outline">
                <Link href="/">&larr; Back to Home</Link>
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us. For example, we collect information when you create an account, fill out a form, or communicate with us. The types of information we may collect include your name, email address, password, and any other information you choose to provide.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We may use the information we collect to:
            </p>
            <ul>
                <li>Provide, maintain, and improve our services;</li>
                <li>Process transactions and send you related information;</li>
                <li>Send you technical notices, updates, security alerts, and support and administrative messages;</li>
                <li>Respond to your comments, questions, and requests and provide customer service;</li>
                <li>Communicate with you about products, services, offers, and events offered by Serleo Globals and others, and provide news and information we think will be of interest to you;</li>
            </ul>

            <h2>3. Sharing of Information</h2>
            <p>
              We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>

            <h2>4. Data Security</h2>
            <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration, and destruction.
            </p>

             <h2>5. Your Choices</h2>
            <p>
              You may update, correct or delete information about you at any time by logging into your online account or emailing us. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our <Link href="/collaborate">collaboration page</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
