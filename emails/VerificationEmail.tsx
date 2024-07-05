import React from 'react';
import { Html, Body, Container, Heading, Section, Text } from '@react-email/components';

interface EmailTemplateProps {
    username: string;
    otp: string;
}

const VerificationEmail: React.FC<Readonly<EmailTemplateProps>> = ({ username, otp }) => {
    return (
        <Html>
            <Body style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
                <Container style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Section style={{ textAlign: 'center' }}>
                        <Heading style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                            Email Verification
                        </Heading>
                    </Section>
                    <Section>
                        <Text style={{ fontSize: '16px', color: '#333' }}>Hi {username},</Text>
                        <Text style={{ fontSize: '16px', color: '#333', lineHeight: '1.5' }}>
                            Thanks for signing up with Ayojon! To complete your registration, please use the following
                            One-Time Password (OTP) to verify your email address:
                        </Text>
                        <Section style={{ textAlign: 'center', margin: '20px 0' }}>
                            <Text style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', display: 'inline-block', color: '#007bff' }}>
                                {otp}
                            </Text>
                        </Section>
                        <Text style={{ fontSize: '16px', color: '#333', lineHeight: '1.5' }}>
                            This OTP is valid for 10 minutes. If you did not request this verification, please ignore this email.
                        </Text>
                    </Section>
                    <Section style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                        <Text>Best regards,</Text>
                        <Text>The Ayojon Team</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

export default VerificationEmail;