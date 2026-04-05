'use client';

import { LoginForm } from '@/components/forms/login-form';
import Galaxy from '@/components/gradient-bg';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-6 md:p-10">
      {/* FULLSCREEN BACKGROUND */}
      <div className="fixed inset-0 w-screen h-screen -z-10 bg-black">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.5}
          glowIntensity={0.1}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.2}
          rotationSpeed={0}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.1}
          speed={0.7}
        />
      </div>

      {/* CONTENT */}
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
