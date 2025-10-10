import React, { useContext,useState ,useEffect} from 'react';

import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

// Direct imports of icons/images
import userIcon from '../../assets/user_icon.webp';
import emailIcon from '../../assets/email_icon.svg';
import lockIcon from '../../assets/lock_icon.svg';
import crossIcon from '../../assets/cross_icon.svg';

const LoginModal = () => {
  const { setShowLogin, setUser, setToken } = useContext(AppContext);

  const [mode, setMode] = useState('Login'); // Login, SignUp, Verify
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  // Just handle form submission with a placeholder action
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, just simulate success or add your front-end validation logic
    toast.info(`Form submitted for mode: ${mode}`);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md'
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium mb-1'>{mode}</h1>
        <p className='text-sm text-center mb-5'>
          {mode === 'Login' ? "Welcome back! Please sign in." : 
           mode === 'SignUp' ? "Create your account." : 
           "Enter the verification code sent to your email."}
        </p>

        {mode === 'SignUp' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
            <img src={userIcon} width={20} alt="User Icon" />
            <input
              type='text'
              placeholder='Full Name'
              className='outline-none text-sm w-full'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {mode !== 'Verify' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
            <img src={emailIcon} width={20} alt="Email Icon" />
            <input
              type='email'
              placeholder='Email'
              className='outline-none text-sm w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {mode !== 'Verify' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
            <img src={lockIcon} width={20} alt="Lock Icon" />
            <input
              type='password'
              placeholder='Password'
              className='outline-none text-sm w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'Verify' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
            <input
              type='text'
              placeholder='Enter OTP'
              className='outline-none text-sm w-full text-center'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'Login' && <p className='text-sm text-blue-600 my-4 cursor-pointer text-right'>Forgot password?</p>}

        <button className='bg-blue-600 text-white w-full py-2 rounded-full mb-3'>
          {mode === 'Login' ? 'Log in' : mode === 'SignUp' ? 'Create Account' : 'Verify'}
        </button>

        {mode === 'Login' ? (
          <p className='text-center text-sm'>
            Don't have an account?{' '}
            <span className='text-blue-600 cursor-pointer' onClick={() => setMode('SignUp')}>Sign up</span>
          </p>
        ) : mode === 'SignUp' ? (
          <p className='text-center text-sm'>
            Already have an account?{' '}
            <span className='text-blue-600 cursor-pointer' onClick={() => setMode('Login')}>Login</span>
          </p>
        ) : (
          <p className='text-center text-sm'>
            Didn't receive OTP?{' '}
            <span className='text-blue-600 cursor-pointer' onClick={() => setMode('SignUp')}>Resend</span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={crossIcon}
          alt="Close"
          className='absolute top-5 right-5 cursor-pointer'
        />
      </form>
    </div>
  );
};

export default LoginModal;
