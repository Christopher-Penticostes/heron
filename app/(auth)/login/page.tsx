import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-linear-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
