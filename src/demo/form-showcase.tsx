import { useState, type ReactNode } from "react";
import {
  CaretDown,
  CheckCircle,
  CurrencyDollar,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  FileText,
  Link as LinkIcon,
  MagnifyingGlass,
  Microphone,
  PaperPlaneRight,
  Paperclip,
} from "@phosphor-icons/react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

/* A thin vertical divider used between an addon and the input text. */
const Divider = () => <span className="h-5 w-px shrink-0 bg-border" />;

const SIZES = ["md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <Input size={size} label="Email" placeholder="example@gmail.com" />,
  code: `<Input size="${size}" label="Email" placeholder="example@gmail.com" />`,
}));

const validationCards: Atom[] = [
  {
    label: "error",
    node: (
      <Input
        label="Password"
        required
        type="password"
        defaultValue="hunter2"
        error="Must be at least 8 characters with 1 uppercase and 1 number"
      />
    ),
    code: `<Input
  label="Password"
  required
  type="password"
  error="Must be at least 8 characters with 1 uppercase and 1 number"
/>`,
  },
  {
    label: "success",
    node: (
      <Input
        label="Email"
        required
        success
        defaultValue="ada@rocket.dev"
        endContent={<CheckCircle weight="fill" className="text-success" />}
      />
    ),
    code: `<Input
  label="Email"
  required
  success
  defaultValue="ada@rocket.dev"
  endContent={<CheckCircle weight="fill" className="text-success" />}
/>`,
  },
];

const addonCards: Atom[] = [
  {
    label: "prefix",
    node: (
      <Input
        label="Website"
        placeholder="your-site"
        startContent={
          <>
            <span className="text-muted-foreground">https://</span>
            <Divider />
          </>
        }
      />
    ),
    code: `<Input
  label="Website"
  placeholder="your-site"
  startContent={
    <>
      <span className="text-muted-foreground">https://</span>
      <span className="h-5 w-px bg-border" />
    </>
  }
/>`,
  },
  {
    label: "suffix",
    node: (
      <Input
        label="Website"
        placeholder="example"
        endContent={
          <>
            <Divider />
            <span className="text-muted-foreground">.com</span>
          </>
        }
      />
    ),
    code: `<Input
  label="Website"
  placeholder="example"
  endContent={
    <>
      <span className="h-5 w-px bg-border" />
      <span className="text-muted-foreground">.com</span>
    </>
  }
/>`,
  },
  {
    label: "keyboard shortcut",
    node: (
      <Input
        label="Keyboard Shortcut"
        placeholder="Command"
        endContent={
          <kbd className="rounded-md bg-secondary/60 px-1.5 py-1 text-xs font-medium text-muted-foreground">
            ⌘K
          </kbd>
        }
      />
    ),
    code: `<Input
  label="Keyboard Shortcut"
  placeholder="Command"
  endContent={
    <kbd className="rounded-md bg-secondary/60 px-1.5 py-1 text-xs font-medium text-muted-foreground">
      ⌘K
    </kbd>
  }
/>`,
  },
];

const CURRENCIES = ["USD", "EUR", "GBP"] as const;

/** Price field with a currency picker built from DropdownMenu. */
function PriceField() {
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  return (
    <Input
      label="Set a price"
      defaultValue="150"
      startContent={<CurrencyDollar />}
      endContent={
        <>
          <Divider />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 text-foreground [&_svg]:size-4"
              >
                {currency}
                <CaretDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[7rem]">
              {CURRENCIES.map((c) => (
                <DropdownMenuItem key={c} onSelect={() => setCurrency(c)}>
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      }
    />
  );
}

const PRICE_CODE = `function PriceField() {
  const [currency, setCurrency] = useState("USD");
  return (
    <Input
      label="Set a price"
      defaultValue="150"
      startContent={<CurrencyDollar />}
      endContent={
        <>
          <span className="h-5 w-px bg-border" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="flex items-center gap-1 text-foreground">
                {currency}
                <CaretDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[7rem]">
              {["USD", "EUR", "GBP"].map((c) => (
                <DropdownMenuItem key={c} onSelect={() => setCurrency(c)}>
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      }
    />
  );
}`;

/** Password field with a show/hide toggle. */
function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <Input
      label="Password"
      required
      type={show ? "text" : "password"}
      defaultValue="hunter2"
      description="Must be at least 8 characters with 1 uppercase and 1 number"
      endContent={
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((v) => !v)}
          className="text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-[18px]"
        >
          {show ? <EyeSlash /> : <Eye />}
        </button>
      }
    />
  );
}

const PASSWORD_CODE = `function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <Input
      label="Password"
      required
      type={show ? "text" : "password"}
      description="Must be at least 8 characters with 1 uppercase and 1 number"
      endContent={
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeSlash /> : <Eye />}
        </button>
      }
    />
  );
}`;

const AI_PROMPT_CODE = `<Textarea
  placeholder="Ask any question you like"
  rows={3}
  resize="none"
  footer={
    <>
      <Button
        size="sm"
        variant="soft"
        color="neutral"
        iconOnly
        aria-label="Attach"
        className="[&_svg]:size-[18px]"
      >
        <Paperclip />
      </Button>
      <Button size="sm" variant="outline" color="neutral" startIcon={<FileText />}>
        Generate document
      </Button>
      <div className="ml-auto flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          color="neutral"
          iconOnly
          aria-label="Voice"
          className="[&_svg]:size-[18px]"
        >
          <Microphone />
        </Button>
        <Button size="sm" iconOnly aria-label="Send">
          <PaperPlaneRight weight="fill" />
        </Button>
      </div>
    </>
  }
/>`;

export function FormShowcase() {
  return (
    <ComponentPage
      id="input"
      title="Input"
      description="Text fields for forms — with labels, validation states, helper text, icons, prefix/suffix addons and a matching multi-line Textarea. Built on one shared, token-driven control surface."
    >
      <Subsection
        title="Basic"
        description="A label, a control and an optional required marker. Fully controlled or uncontrolled."
      >
        <DemoGrid cols={2}>
          <Demo
            label="default"
            align="start"
            code={`<Input label="Email" required placeholder="example@gmail.com" />`}
          >
            <div className="w-full max-w-80">
              <Input label="Email" required placeholder="example@gmail.com" />
            </div>
          </Demo>
          <Demo
            label="with icon"
            align="start"
            code={`<Input
  label="Email"
  required
  placeholder="example@gmail.com"
  startContent={<EnvelopeSimple />}
/>`}
          >
            <div className="w-full max-w-80">
              <Input
                label="Email"
                required
                placeholder="example@gmail.com"
                startContent={<EnvelopeSimple />}
              />
            </div>
          </Demo>
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Height, padding and text scale together across md and lg."
      >
        <DemoGrid cols={2}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              <div className="w-full max-w-80">{a.node}</div>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Validation"
        description="Error shows a destructive border, red label and message. Success turns the border and label green."
      >
        <DemoGrid cols={2}>
          {validationCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              <div className="w-full max-w-80">{a.node}</div>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Prefix & suffix"
        description="Compose icons, static text, unit selectors or shortcuts into the start/end slots."
      >
        <DemoGrid cols={2}>
          <Demo label="price + currency" align="start" code={PRICE_CODE}>
            <div className="w-full max-w-80">
              <PriceField />
            </div>
          </Demo>
          {addonCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              <div className="w-full max-w-80">{a.node}</div>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Password"
        description="Compose a reveal toggle into the end slot for password fields."
      >
        <Demo align="start" code={PASSWORD_CODE}>
          <div className="w-full max-w-80">
            <PasswordField />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Search & disabled"
        description="Search field with a leading icon, and the disabled state."
      >
        <DemoGrid cols={2}>
          <Demo
            label="search"
            align="start"
            code={`<Input placeholder="Search…" startContent={<MagnifyingGlass />} />`}
          >
            <div className="w-full max-w-80">
              <Input placeholder="Search…" startContent={<MagnifyingGlass />} />
            </div>
          </Demo>
          <Demo
            label="disabled"
            align="start"
            code={`<Input
  label="Website"
  disabled
  defaultValue="www.example.com"
  startContent={<LinkIcon />}
/>`}
          >
            <div className="w-full max-w-80">
              <Input
                label="Website"
                disabled
                defaultValue="www.example.com"
                startContent={<LinkIcon />}
              />
            </div>
          </Demo>
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Textarea"
        description="The same control surface, multi-line. Vertically resizable by default."
      >
        <Demo align="start" code={`<Textarea label="Bio" placeholder="Tell us about yourself" rows={4} />`}>
          <div className="w-full max-w-lg">
            <Textarea label="Bio" placeholder="Tell us about yourself" rows={4} />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Textarea with toolbar"
        description="A prompt composer — the footer slot hosts a toolbar built from Buttons."
      >
        <Demo align="start" code={AI_PROMPT_CODE}>
          <div className="w-full max-w-lg">
            <Textarea
              placeholder="Ask any question you like"
              rows={3}
              resize="none"
              footer={
                <>
                  <Button
                    size="sm"
                    variant="soft"
                    color="neutral"
                    iconOnly
                    aria-label="Attach"
                    className="[&_svg]:size-[18px]"
                  >
                    <Paperclip />
                  </Button>
                  <Button size="sm" variant="outline" color="neutral" startIcon={<FileText />}>
                    Generate document
                  </Button>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      color="neutral"
                      iconOnly
                      aria-label="Voice"
                      className="[&_svg]:size-[18px]"
                    >
                      <Microphone />
                    </Button>
                    <Button size="sm" iconOnly aria-label="Send">
                      <PaperPlaneRight weight="fill" />
                    </Button>
                  </div>
                </>
              }
            />
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
