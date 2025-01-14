import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import defaultBackground from "../assets/homepage.png";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

import Format from '@/components/Format';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const formRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const form = formRef.current;

        gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }
        );

        gsap.fromTo(
            form.querySelectorAll('input, button'),
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.3
            }
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!email || !oldPassword || !newPassword) {
            setError('Please fill in all fields.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/change-password', {
                email,
                currentPassword: oldPassword,
                newPassword,
            });

            setSuccess('Your password has been changed successfully.');
            setEmail('');
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to change password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
            <Format>
                <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12" style={{ backgroundImage: `url(${defaultBackground})`, backgroundBlendMode: 'overlay' }}>
                    <Card
                        ref={cardRef}
                        className="w-full max-w-md shadow-lg border-none bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
                    >
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">
                                Change Password
                            </CardTitle>
                            <CardDescription className="text-center">
                                Enter your email and password details below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="oldPassword">Current Password</Label>
                                    <Input
                                        id="oldPassword"
                                        type="password"
                                        placeholder="Enter your current password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Changing Password
                                        </>
                                    ) : (
                                        "Change Password"
                                    )}
                                </Button>
                            </form>
                            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                            {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
                        </CardContent>
                    </Card>
                </div>
            </Format>
            );
};

            export default ChangePassword;

