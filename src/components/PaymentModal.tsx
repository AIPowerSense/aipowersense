import { useEffect, useRef, useState } from 'react';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: { name: string; price?: string; desc?: string } | null;
  anchorRect?: DOMRect | null;
  onSuccess?: (details: any) => void;
  onError?: (err: any) => void;
}

const FALLBACK_CLIENT_ID = 'AW8LwOyHYamK0tA4exHDNjZWcDzSp2Oazkp5k63SxyBqApaUlf4e3wYBk-uH_CvEOQtKDF8eFTDeM1OO';

const parseAmount = (price?: string) => {
  if (!price || price.toLowerCase() === 'free' || price.toLowerCase() === 'custom') return '0';
  const digits = price.replace(/[^0-9.]/g, '');
  return digits || '0';
};

const PaymentModal = ({ open, onClose, plan, anchorRect, onSuccess, onError }: PaymentModalProps) => {
  const paypalSubRef = useRef<HTMLDivElement | null>(null);
  const paypalCardRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkError, setSdkError] = useState<Error | null>(null);

  useEffect(() => {
    if (!open) return;
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || FALLBACK_CLIENT_ID;

    if ((window as any).paypal) {
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    // disable PayPal funding options we don't want (keep PayPal and card)
    const disableFunding = 'paylater,venmo';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=buttons&disable-funding=${disableFunding}`;
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    script.onerror = () => {
      const err = new Error('PayPal SDK failed to load');
      setSdkError(err);
      if (onError) onError(err);
    };
    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      // keep script for reuse; do not remove
    };
  }, [open]);

  useEffect(() => {
    if (!sdkLoaded || !open || !plan) return;

    const paypal = (window as any).paypal;
    const amount = parseAmount(plan.price);

    // render PayPal payment button for all plans
    if (paypalSubRef.current) {
      paypalSubRef.current.innerHTML = '';
      try {
        paypal.Buttons({
          fundingSource: paypal && paypal.FUNDING ? paypal.FUNDING.PAYPAL : undefined,
          style: { layout: 'vertical', color: 'white', shape: 'rect', label: 'pay' },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: amount,
                  },
                  description: plan.desc,
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture();
              if (onSuccess) onSuccess({ status: 'paid', ...details });
              onClose();
            } catch (err) {
              if (onError) onError(err);
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            if (onError) onError(err);
          },
        }).render(paypalSubRef.current);
      } catch (err) {
        console.error('Failed to render PayPal button:', err);
        if (onError) onError(err);
      }
    }

    // render card / debit payment button for all plans
    if (paypalCardRef.current) {
      paypalCardRef.current.innerHTML = '';
      try {
        paypal.Buttons({
          fundingSource: paypal && paypal.FUNDING ? paypal.FUNDING.CARD : undefined,
          style: { layout: 'vertical', color: 'white', shape: 'rect', label: 'pay' },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: amount,
                  },
                  description: plan.desc,
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture();
              if (onSuccess) onSuccess({ status: 'paid_card', ...details });
              onClose();
            } catch (err) {
              if (onError) onError(err);
            }
          },
          onError: (err: any) => {
            console.error('PayPal Card error:', err);
            if (onError) onError(err);
          },
        }).render(paypalCardRef.current);
      } catch (err) {
        console.error('Failed to render Card button:', err);
        if (onError) onError(err);
      }
    }
  }, [sdkLoaded, open, plan]);

  if (!open || !plan) return null;

  // Positioning: below pricing cards, centered and visible on screen
  const computeStyle = () => {
    if (anchorRect) {
      // Position modal below the pricing section with reasonable spacing
      const top = Math.min(anchorRect.top + 20, window.innerHeight - 400); // 20px below anchor, but not too close to bottom
      return { position: 'fixed' as const, top: `${top}px`, left: '50%', transform: 'translateX(-50%)' };
    }
    // Fallback position
    return { position: 'fixed' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  };

  const style = computeStyle();

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'transparent' }} onClick={onClose} />
      <div style={style as any} className="w-[480px] pointer-events-auto bg-black border border-white/10 rounded-lg overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-display text-lg font-black mb-1">{plan.name} — {plan.price}</h3>
              <p className="text-sm text-white/60">{plan.desc}</p>
            </div>
            <button className="text-white/40 hover:text-white text-lg" onClick={onClose}>×</button>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="mb-3 font-display font-black text-white">PayPal</div>
              <div className="bg-white/5 p-3 rounded">
                <div ref={paypalSubRef} />
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-lg">
              <div className="mb-3 font-display font-black text-white">Debit or Credit Card</div>
              <div className="bg-white/5 p-3 rounded">
                <div ref={paypalCardRef} />
              </div>
            </div>

            {!sdkLoaded && !sdkError && (
              <div className="text-sm text-white/60 mt-2 text-center">Loading payment options…</div>
            )}
            {sdkError && (
              <div className="text-sm text-red-400 mt-2 text-center">Unable to load PayPal. Please try again later.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
