import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mystrymsgs.vercel.app';
  return (
    <Html>
      <Head>
        <title>Verification Code</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview> Here is your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text> 
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        <Row>
          <Button
            href={`${appUrl}/verify/${encodeURIComponent(username)}`}
            style={{ color: '#ffffff', background: '#000000', padding: '10px 16px', borderRadius: '12px' }}
          >
            Verify your account
          </Button>
        </Row>
      </Section>
    </Html>
  );
}
