import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const GRADIENTS = [
  "from-violet-300 via-fuchsia-200 to-blue-400",
  "from-sky-300 via-cyan-200 to-emerald-300",
  "from-amber-200 via-orange-300 to-rose-300",
  "from-indigo-300 via-purple-200 to-pink-300",
  "from-teal-300 via-emerald-200 to-lime-300",
];

function Slide({ gradient, label }: { gradient: string; label: string }) {
  return (
    <CarouselItem>
      <div
        className={`flex size-full items-end bg-gradient-to-br ${gradient} p-4`}
      >
        <span className="rounded-full bg-black/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {label}
        </span>
      </div>
    </CarouselItem>
  );
}

const BASIC_CODE = `// fadeColor defaults to the theme background. Set it to match the
// surface behind the carousel so the side slides blend into it.
<Carousel slideWidth={300} defaultIndex={1} fadeColor="var(--color-background)">
  <CarouselItem>
    <img src="/photo-1.jpg" alt="" className="size-full object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/photo-2.jpg" alt="" className="size-full object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/photo-3.jpg" alt="" className="size-full object-cover" />
  </CarouselItem>
</Carousel>`;

const LOOP_CODE = `<Carousel slideWidth={280} loop autoPlay autoPlayInterval={3000}>
  <CarouselItem>{/* slide 1 */}</CarouselItem>
  <CarouselItem>{/* slide 2 */}</CarouselItem>
  <CarouselItem>{/* slide 3 */}</CarouselItem>
</Carousel>`;

export function CarouselShowcase() {
  return (
    <ComponentPage
      id="carousel"
      title="Carousel"
      description="A center-focused slider: the active slide sits full size in the middle while its neighbours peek in, scaled down. Navigate with the arrows, the dots, arrow keys, or by dragging."
    >
      <Subsection
        title="Center peek"
        description="The default look — a large active slide flanked by dimmed peeks, with arrows and a pill dot indicator."
      >
        <Demo code={BASIC_CODE} className="block p-8">
          <Carousel
            slideWidth={300}
            defaultIndex={1}
            fadeColor="var(--color-muted)"
          >
            {GRADIENTS.map((gradient, i) => (
              <Slide key={i} gradient={gradient} label={`Slide ${i + 1}`} />
            ))}
          </Carousel>
        </Demo>
      </Subsection>

      <Subsection
        title="Loop & autoplay"
        description="Set loop to wrap around and autoPlay to advance on a timer. Autoplay pauses on hover and while dragging."
      >
        <Demo code={LOOP_CODE} className="block p-8">
          <Carousel
            slideWidth={280}
            loop
            autoPlay
            autoPlayInterval={3000}
            fadeColor="var(--color-muted)"
          >
            {GRADIENTS.slice(0, 4).map((gradient, i) => (
              <Slide key={i} gradient={gradient} label={`Slide ${i + 1}`} />
            ))}
          </Carousel>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
