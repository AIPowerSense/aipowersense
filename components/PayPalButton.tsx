import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PayPalButtonProps {
  plan: string;
  amount?: string;
  description?: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

const PayPalButton = ({ 
  plan, 
  amount, 
  description,
  onSuccess,
  onError,
  className = ''
}: PayPalButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const getPlanId = (planName: string): string => {
    const planIds: { [key: string]: string } = {
      'alpha': 'P-ALPHA-PLAN-ID',
      'sigma': 'P-SIGMA-ENTERPRISE-ID',
      'enterprise': 'P-SIGMA-ENTERPRISE-ID',
      'omega': 'P-OMEGA-CUSTOM-ID',
    };
    return planIds[planName.toLowerCase()] || '';
  };
  const [showModal, setShowModal] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkError, setSdkError] = useState<Error | null>(null);

  const isFreeTier = plan.toLowerCase() === 'alpha' || amount === 'Free' || amount === '0';

  const renderPayPalButtons = () => {
    if (!containerRef.current || !window.paypal) return;
    // Clear previous buttons
    containerRef.current.innerHTML = '';

    const planId = getPlanId(plan);
    if (!planId) {
      // If no plan id is configured, show fallback
      containerRef.current.innerHTML = `
        <a href="/contact" class="block w-full py-4 text-center border border-white/20 hover:border-purple-500 hover:text-purple-400 transition-all font-display font-black text-[10px] uppercase tracking-widest">
          Contact Sales
        </a>
      `;
      return;
    }

    try {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'white',
          shape: 'rect',
          label: 'subscribe',
        },
        createSubscription: (data: any, actions: any) => {
          return actions.subscription.create({
            plan_id: planId,
            quantity: '1',
          });
        },
        onApprove: (data: any) => {
          if (onSuccess) {
            onSuccess({
              status: 'success',
              subscriptionID: data.subscriptionID,
              orderID: data.orderID,
            });
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setSdkError(err instanceof Error ? err : new Error(String(err)));
          if (onError) onError(err);
        },
      }).render(containerRef.current);
    } catch (err: any) {
      console.error('Failed to render PayPal Buttons:', err);
      setSdkError(err instanceof Error ? err : new Error(String(err)));
      if (onError) onError(err);
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    if (isFreeTier) {
      // free tier doesn't require PayPal SDK
      return;
    }

    if (!clientId) {
      console.error('PayPal Client ID not configured');
      setSdkError(new Error('PayPal Client ID not configured'));
      return;
    }

    // If SDK already exists, render buttons
    if (window.paypal) {
      setSdkLoaded(true);
      renderPayPalButtons();
      return;
    }

    // Load PayPal script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setSdkLoaded(true);
      renderPayPalButtons();
    };
    script.onerror = () => {
      const err = new Error('PayPal SDK failed to load');
      console.error(err);
      setSdkError(err);
      if (onError) onError(err);
    };
    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      // keep script available for the rest of the app; no removal
    };
  }, [plan, amount, onSuccess, onError]);

  // Handlers for free-tier modal
  const confirmFreeTier = () => {
    setShowModal(false);
    if (onSuccess) onSuccess({ status: 'free-tier' });
  };

  return (
    <>
      {isFreeTier ? (
        <div>
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`w-full py-4 bg-white/10 border border-white/20 hover:border-purple-500 hover:text-purple-400 transition-all font-display font-black text-[10px] uppercase tracking-widest ${className}`}
            onClick={() => setShowModal(true)}
          >
            Start Pilot
          </motion.button>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
              <div className="relative bg-black border border-white/10 rounded-lg p-6 w-[min(560px,90%)]">
                <h3 className="font-display text-lg font-black mb-3">Start Pilot</h3>
                <p className="text-sm text-white/60 mb-6">You're requesting access to the Alpha Pilot Program. A member of our team will reach out to schedule onboarding.</p>
                <div className="flex gap-4 justify-end">
                  <button className="px-4 py-2 border border-white/20 hover:border-purple-500 transition" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="px-4 py-2 bg-purple-500 text-black font-black uppercase" onClick={confirmFreeTier}>Confirm Start Pilot</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`paypal-button-container ${className}`}
          style={{ minHeight: '50px' }}
        >
          {/* If SDK failed or still loading, show fallback */}
          {!sdkLoaded && sdkError && (
            <div>
              <div className="text-sm text-white/60 mb-2">Unable to load PayPal. Please contact sales or try again later.</div>
              <a href="/contact" className="inline-block px-4 py-2 border border-white/20 hover:border-purple-500 transition font-display font-black text-[10px] uppercase">Contact Sales</a>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

// Extend Window interface for PayPal SDK
declare global {
  interface Window {
    paypal?: any;
  }
}

export default PayPalButton;
