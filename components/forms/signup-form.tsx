'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Google from '@/public/images/search.png';
import LoginPic from '@/public/images/Login-pic.png';
import Link from 'next/link';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name must be at least 1 characters.')
      .max(50, 'Name must be at most 50 characters.'),
    email: z.email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password must be maximum 15 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleLoginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  };

  const handleLoginWithEmail = async (data: z.infer<typeof formSchema>) => {
    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    form.reset();

    toast.success('Your account has been successfully created!');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={form.handleSubmit(handleLoginWithEmail)}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="m@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                          />
                          <InputGroupAddon
                            align="inline-end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="cursor-pointer"
                          >
                            {showPassword ? (
                              <Eye className="size-4 hover:text-black" />
                            ) : (
                              <EyeOff className="size-4 hover:text-black" />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    )}
                  />
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                          />
                          <InputGroupAddon
                            align="inline-end"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            className="cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <Eye className="size-4 hover:text-black" />
                            ) : (
                              <EyeOff className="size-4 hover:text-black" />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    )}
                  />
                </Field>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ fieldState }) => (
                    <>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ fieldState }) => (
                    <>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </>
                  )}
                />
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleLoginWithGoogle}
                  className="bg-white"
                >
                  <Image src={Google} alt="Image" width={19} height={19} />
                  Login with Google
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={LoginPic}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-gray-300">
        By clicking continue, you agree to our{' '}
        <Link href="#" className="hover:text-white!">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="hover:text-white!">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
