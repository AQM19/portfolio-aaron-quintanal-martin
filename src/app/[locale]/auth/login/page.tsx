import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col-reverse lg:flex-col p-5 items-center pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm></LoginForm>
    </div>
  );
}