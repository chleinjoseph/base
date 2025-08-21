
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
            <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to Serleo Globals! These Terms of Service ("Terms") govern your use of our website located at [Your Website URL] and any related services provided by Serleo Globals. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access our services.
            </p>

            <h2>2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Serleo Globals and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Serleo Globals.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our Service. You are responsible for maintaining the confidentiality of your account and password.
            </p>

            <h2>4. Limitation Of Liability</h2>
            <p>
              In no event shall Serleo Globals, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2>5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>

            <h2>6. Changes To Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us through our <Link href="/collaborate">collaboration page</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
