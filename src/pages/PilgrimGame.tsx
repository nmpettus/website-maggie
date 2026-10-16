import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Compass, Download, Gamepad2, Heart, Mic, ScrollText, Sparkles, Star, Volume2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useSEO";
import { useAuth } from "@/hooks/useAuth";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
const cover = { url: "./images/pilgrim/Pilgrim1.webp" };
const pack = { url: "./images/pilgrim/Matteo_s_Pilgrim_Pack.webp" };
const s1 = { url: "./images/pilgrim/Image.webp" };
const s3 = { url: "./images/pilgrim/Image_3.webp" };
const s4 = { url: "./images/pilgrim/Image_4.webp" };
const s5 = { url: "./images/pilgrim/Image_5.webp" };
const s6 = { url: "./images/pilgrim/Image_6.webp" };
const s7 = { url: "./images/pilgrim/Image_7.webp" };

const gallery = [s1, s4, s5, s6, s7, s3].map((a, i) => ({ src: a.url, alt: `Scene ${i + 1} from the Pilgrim's Progress game` }));

const features = [
  { icon: ScrollText, title: "13 complete chapters", text: "From the City of Destruction, through the Slough of Despond and the Cross, all the way to the Celestial City." },
  { icon: Mic, title: "Maggie tells the story", text: "Every scene is voiced. Hear Maggie tell it in simple words, or read John Bunyan's own words from 1678." },
  { icon: Heart, title: "Matteo is the pilgrim", text: "Help Matteo carry his burden, choose the King's way and find the five promise scrolls in each chapter." },
  { icon: Star, title: "Gentle for every child", text: "Story Mode makes tricky parts easier, larger text and a calm screen are built in, and hints never cost points." },
];

const howTo = [
  "Walk Matteo with the arrow keys, WASD, or the touch stick on a phone or tablet.",
  "Tap Talk to meet characters, Jump to cross gaps, and Woof! for a happy bark.",
  "Follow the compass arrow at the top to find your next step on the road.",
  "Collect promise scrolls — each one holds a Bible verse in King James and Maggie's words.",
  "Stuck? Open the Menu and tap “Ask Art-I” or “Help me past this part.”",
  "Your journey saves as you go. Pick any chapter you've reached from Chapters.",
];

const points = [
  ["Find a promise scroll", "100"],
  ["Each new step of the story", "50"],
  ["Little tasks (light a lantern, bring a lamb home)", "25"],
  ["Choose the King's way the first time", "75"],
  ["Finish a chapter", "250"],
  ["Finish the whole journey", "1,000"],
];

const PilgrimGame = () => {
  useSEO({
    title: "Pilgrim's Progress with Maggie — Game | Books by Maggie",
    description: "A voiced, 13-chapter family game of John Bunyan's The Pilgrim's Progress, told by Maggie with Matteo as the pilgrim.",
    keywords: ["Pilgrim's Progress game", "Christian kids game", "Maggie", "Matteo"],
    canonicalUrl: "https://booksbymaggie.com/#/pilgrim-game",
  });
  const { user } = useAuth();
  const { openCheckout, isOpen, closeCheckout, checkoutElement } = useStripeCheckout();
  const [zoom, setZoom] = useState<string | null>(null);
  const [params] = useSearchParams();
  const purchased = params.get("purchased") === "1";

  const buy = () =>
    openCheckout({
      priceId: "pilgrim_game_download",
      customerEmail: user?.email ?? undefined,
      userId: user?.id,
      returnUrl: `${window.location.origin}${window.location.pathname}#/pilgrim-game?purchased=1&session_id={CHECKOUT_SESSION_ID}`,
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PaymentTestModeBanner />
      <Navigation />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1 text-sm font-bold text-foreground">
              <Sparkles className="w-4 h-4" /> New family game
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-foreground leading-tight">Pilgrim's Progress with Maggie</h1>
            <p className="mt-4 text-xl text-foreground/80 font-semibold">
              Matteo carries a burden he cannot take off. Help him leave the City of Destruction and follow the shining light.
            </p>
            {purchased && (
              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 font-semibold text-foreground">
                Thank you! Your game is ready in <Link to="/members" className="underline">My Library</Link>.
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://booksbymaggie.com/pilgrim" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full text-lg"><Gamepad2 className="mr-2" /> Play online</Button>
              </a>
              {user ? (
                <Button size="lg" variant="secondary" className="rounded-full text-lg" onClick={buy}>
                  <Download className="mr-2" /> Buy the download — $2.99
                </Button>
              ) : (
                <Link to="/auth">
                  <Button size="lg" variant="secondary" className="rounded-full text-lg"><Download className="mr-2" /> Sign in to buy — $2.99</Button>
                </Link>
              )}
            </div>
            <p className="mt-3 text-base text-foreground/70">
              Reading Club members can also unlock it for 2 credits in <Link to="/members" className="underline font-semibold">My Library</Link>.
            </p>
          </div>
          <div className="relative">
            <img src={cover.url} alt="Pilgrim's Progress game cover" onClick={() => setZoom(cover.url)}
              className="w-full rounded-3xl shadow-2xl cursor-zoom-in animate-float motion-reduce:animate-none" />
            <img src={pack.url} alt="Matteo with his pilgrim pack" onClick={() => setZoom(pack.url)}
              className="absolute -bottom-8 -left-6 w-36 md:w-44 rounded-2xl border-4 border-background shadow-xl rotate-[-6deg] cursor-zoom-in transition-transform duration-500 hover:rotate-0 hover:scale-110" />
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 max-w-6xl mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className="rounded-3xl bg-card p-6 shadow-lg animate-fade-in transition-transform hover:-translate-y-2"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}>
              <f.icon className="w-9 h-9 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-foreground/80">{f.text}</p>
            </div>
          ))}
        </section>

        {/* Gallery */}
        <section className="container mx-auto px-6 max-w-6xl mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">A peek at the journey</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((g, i) => (
              <button key={g.src} onClick={() => setZoom(g.src)} className="group overflow-hidden rounded-2xl shadow-lg animate-fade-in"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}>
                <img src={g.src} alt={g.alt} loading="lazy"
                  className="w-full h-56 md:h-72 object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
              </button>
            ))}
          </div>
        </section>

        {/* How to play */}
        <section className="container mx-auto px-6 max-w-6xl mt-20 grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-card p-8 shadow-lg">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-foreground"><Compass className="text-primary" /> How to play</h2>
            <ol className="mt-5 space-y-3 list-decimal pl-6 text-lg text-foreground/90">
              {howTo.map((h) => <li key={h}>{h}</li>)}
            </ol>
            <p className="mt-5 flex items-center gap-2 text-foreground/80"><Volume2 className="w-5 h-5" /> Turn read-aloud, music and voices on or off in Settings.</p>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-lg">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-foreground"><Star className="text-primary" /> Earning points</h2>
            <ul className="mt-5 divide-y divide-border text-lg">
              {points.map(([k, v]) => (
                <li key={k} className="flex justify-between py-2 text-foreground/90"><span>{k}</span><b className="text-primary">{v}</b></li>
              ))}
            </ul>
            <p className="mt-4 text-foreground/70">Hints, Story Mode and “Help me past this part” never take points away.</p>
          </div>
        </section>

        <p className="container mx-auto px-6 max-w-3xl mt-12 text-center text-foreground/70">
          Based on John Bunyan's <i>The Pilgrim's Progress</i> (1678, public domain). Scripture from the King James Version,
          with Maggie's paraphrases. The download is a single file you open in any web browser — no install needed.
        </p>
      </main>
      <Footer />

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-5xl p-2">
          <DialogTitle className="sr-only">Full size image</DialogTitle>
          {zoom && <img src={zoom} alt="Full size" className="w-full max-h-[85vh] object-contain rounded-xl" />}
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={(o) => !o && closeCheckout()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle>Buy Pilgrim's Progress with Maggie</DialogTitle>
          {checkoutElement}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PilgrimGame;
