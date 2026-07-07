import { useState, type ReactNode } from "react";
import { InputOTP } from "@/components/ui/input-otp";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <InputOTP length={4} size={size} defaultValue="12" />,
  code: `<InputOTP length={4} size="${size}" />`,
}));

const stateCards: Atom[] = [
  {
    label: "filled",
    node: <InputOTP length={6} defaultValue="204815" />,
    code: `<InputOTP length={6} defaultValue="204815" />`,
  },
  {
    label: "error",
    node: <InputOTP length={6} defaultValue="2048" invalid />,
    code: `<InputOTP length={6} invalid />`,
  },
  {
    label: "disabled",
    node: <InputOTP length={6} defaultValue="204815" disabled />,
    code: `<InputOTP length={6} defaultValue="204815" disabled />`,
  },
  {
    label: "alphanumeric",
    node: <InputOTP length={6} type="alphanumeric" defaultValue="A1B2C3" />,
    code: `<InputOTP length={6} type="alphanumeric" />`,
  },
  {
    label: "masked",
    node: <InputOTP length={6} mask defaultValue="204815" />,
    code: `<InputOTP length={6} mask defaultValue="204815" />`,
  },
];

/** Verify-account flow with a resend link and completion feedback. */
function VerifyExample() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-foreground">Verify account</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a code to a****@gmail.com
        </p>
      </div>
      <InputOTP
        length={5}
        onComplete={() => setDone(true)}
        onChange={() => setDone(false)}
      />
      <p className="text-sm">
        {done ? (
          <span className="font-medium text-success">Code verified</span>
        ) : (
          <span className="text-muted-foreground">
            Didn&apos;t receive a code?{" "}
            <button
              type="button"
              className="font-medium text-info outline-none hover:underline"
            >
              Resend
            </button>
          </span>
        )}
      </p>
    </div>
  );
}

const VERIFY_CODE = `function VerifyExample() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-foreground">Verify account</p>
        <p className="text-sm text-muted-foreground">
          We've sent a code to a****@gmail.com
        </p>
      </div>
      <InputOTP
        length={5}
        onComplete={() => setDone(true)}
        onChange={() => setDone(false)}
      />
      <p className="text-sm">
        {done ? (
          <span className="font-medium text-success">Code verified</span>
        ) : (
          <span className="text-muted-foreground">
            Didn't receive a code?{" "}
            <button type="button" className="font-medium text-info hover:underline">
              Resend
            </button>
          </span>
        )}
      </p>
    </div>
  );
}`;

export function InputOTPShowcase() {
  return (
    <ComponentPage
      id="input-otp"
      title="Input OTP"
      description="A one-time-password input for verification codes and secure authentication. Handles typing, deletion, arrow navigation and full-code paste out of the box, with numeric or alphanumeric modes."
    >
      <Subsection
        title="Verify account"
        description="Compose a label, description, the code input and a resend action. Fires onComplete once every cell is filled."
      >
        <Demo align="start" code={VERIFY_CODE}>
          <VerifyExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Enter PIN"
        description="Any length works — here a 4-digit PIN."
      >
        <Demo align="start" code={`<InputOTP length={4} aria-label="PIN" />`}>
          <div className="flex flex-col gap-3">
            <p className="text-base font-medium text-foreground">Enter PIN</p>
            <InputOTP length={4} aria-label="PIN" />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Cell size and text scale together across sm, md and lg."
      >
        <DemoGrid cols={1}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="States & modes"
        description="Filled, error and disabled states, plus alphanumeric and masked input."
      >
        <DemoGrid cols={1}>
          {stateCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
