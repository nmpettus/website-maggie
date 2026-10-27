import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, MessageCircle, ArrowRight, Loader2, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import rileyImg from "@/assets/riley.png";
import artieImg from "@/assets/artie.png";

const Hero = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isActive, loading: subLoading } = useSubscription();
  const [showReadingClubModal, setShowReadingClubModal] = useState(false);
  const [signInConfirmed, setSignInConfirmed] = useState(false);
  const [matteoFront, setMatteoFront] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerPaused, setBannerPaused] = useState(false);
  useEffect(() => {
    if (bannerPaused) return;
    const id = window.setInterval(() => setBannerIndex((i) => (i + 1) % 2), 6000);
    return () => window.clearInterval(id);
  }, [bannerPaused]);

  const handleReadingClubClick = () => {
    setSignInConfirmed(false);
    setShowReadingClubModal(true);
  };

  const handleSignIn = () => {
    setShowReadingClubModal(false);
    navigate("/auth");
  };

  const handleGoToLibrary = () => {
    setShowReadingClubModal(false);
    navigate("/members");
  };

  const handleStartTrial = () => {
    setShowReadingClubModal(false);
    navigate("/join");
  };

  const isChecking = authLoading || subLoading;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-24 px-4 sm:px-8"
    >
      {/* Background ambient glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl gpu-layer-opacity" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl gpu-layer-opacity" />

      <div className="container mx-auto relative z-10">
        {/* Rotating announcement banner */}
        <div
          className="relative mb-6"
          onMouseEnter={() => setBannerPaused(true)}
          onMouseLeave={() => setBannerPaused(false)}
          onFocus={() => setBannerPaused(true)}
          onBlur={() => setBannerPaused(false)}
        >
        <a
          href="https://booksbymaggie.com/pilgrim"
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden={bannerIndex !== 0}
          tabIndex={bannerIndex !== 0 ? -1 : undefined}
          className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold via-rose to-primary p-[2px] shadow-book transition-transform duration-300 hover:-translate-y-0.5 animate-fade-in ${bannerIndex === 0 ? "flex" : "hidden"}`}
        >
          <div className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-sage-dark px-4 py-2.5 sm:gap-4 sm:px-5">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-rose text-background shadow-elegant">
              <Compass className="h-5 w-5" />
            </div>
            <div className="relative flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5">
                <Sparkles className="h-3 w-3 animate-sparkle text-gold motion-reduce:animate-none" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  New Game!
                </span>
              </span>
              <span className="truncate font-display text-sm font-bold text-foreground sm:text-base">
                Maggie's Pilgrim's Progress Adventure — Journey to the Celestial City, for a limited time!
              </span>
            </div>
            <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-rose px-3 py-1.5 text-xs font-bold text-background shadow-elegant transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none sm:px-4 sm:text-sm">
              Play Now — Limited Time
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </div>
        </a>

        {/* New book banner: God's Love for Little Hearts */}
        <a
          href="https://a.co/d/04VDSUkx"
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden={bannerIndex !== 1}
          tabIndex={bannerIndex !== 1 ? -1 : undefined}
          className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose via-primary to-gold p-[2px] shadow-book transition-transform duration-300 hover:-translate-y-0.5 animate-fade-in ${bannerIndex === 1 ? "flex" : "hidden"}`}
        >
          <div className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-card px-4 py-2.5 sm:gap-4 sm:px-5">
            <img
              src="/images/gllh-cover.jpg"
              alt="God's Love for Little Hearts book cover"
              className="h-12 w-12 shrink-0 rounded-lg object-cover shadow-elegant"
              loading="eager"
            />
            <div className="relative flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-rose/15 px-2 py-0.5">
                <BookOpen className="h-3 w-3 text-rose" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose">New Book!</span>
              </span>
              <span className="truncate font-display text-sm font-bold text-foreground sm:text-base">
                God's Love for Little Hearts — Maggie's newest story for little ones
              </span>
            </div>
            <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-rose to-gold px-3 py-1.5 text-xs font-bold text-background shadow-elegant transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none sm:px-4 sm:text-sm">
              Get the Book
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </div>
        </a>
        <div className="mt-2 flex justify-center gap-2">
          {["Pilgrim's Progress game", "God's Love for Little Hearts"].map((label, i) => (
            <button
              key={label}
              type="button"
              aria-label={`Show ${label} announcement`}
              aria-current={bannerIndex === i}
              onClick={() => setBannerIndex(i)}
              className={`h-2 rounded-full transition-all ${bannerIndex === i ? "w-6 bg-gold" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"}`}
            />
          ))}
        </div>
        </div>

        {/* Editorial hero card */}
        <div className="relative max-w-7xl mx-auto bg-card/40 backdrop-blur-sm border border-white/5 rounded-[2.5rem] shadow-2xl p-8 lg:p-16 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left content column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-[1.1]">
                Discover Bible Stories with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-primary italic">
                  Maggie
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-indigo-100/70 max-w-xl leading-relaxed font-body mx-auto lg:mx-0">
                Beautiful, illustrated Bible stories narrated by Maggie the dog. Perfect for bedtime reading,
                family devotions, and nurturing faith in young hearts.
              </p>

              {/* Primary CTA: Books */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold to-rose text-background font-extrabold px-10 h-16 text-lg rounded-2xl shadow-elegant transition-all hover:scale-105 motion-reduce:hover:scale-100"
                  onClick={() => document.getElementById("books")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <BookOpen className="w-6 h-6 mr-2" />
                  Shop Maggie's Books
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="font-semibold rounded-xl border-white/15 text-white hover:bg-white/5 hover:text-white"
                  >
                    <Link to="/online-library">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read a Free Story
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="font-semibold rounded-xl border-white/15 text-white hover:bg-white/5 hover:text-white"
                  >
                    <Link to="/ask-maggie">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask Maggie
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Reading Club CTA */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-xl mx-auto lg:mx-0">
                <div className="flex-1 text-left">
                  <p className="font-bold text-white text-lg font-heading">📚 Join Maggie's Reading Club</p>
                  <p className="text-sm text-indigo-200/60 font-body">
                    Read every book online with read-aloud narration.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="font-bold whitespace-nowrap bg-secondary hover:bg-secondary/90 text-white rounded-2xl"
                  onClick={handleReadingClubClick}
                >
                  Join Now
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 border-t border-white/10">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-card bg-indigo-900 flex items-center justify-center text-[10px] text-white font-body">
                    JD
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-card bg-indigo-700 flex items-center justify-center text-[10px] text-white font-body">
                    SK
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-card bg-primary flex items-center justify-center text-[10px] text-white font-body">
                    MR
                  </div>
                </div>
                <div className="text-sm text-indigo-200/60 font-body text-left">
                  <strong className="text-white block">Loved by 5,000+ families</strong>
                  Rated 5.0/5 stars for Bible storytelling
                </div>
              </div>
            </div>

            {/* Right visual column */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-square">
                {/* Magazine-style backdrop card */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background rounded-3xl rotate-3 shadow-2xl border border-white/5" />

                {/* Maggie card — larger, dominant */}
                <a
                  href="#maggie"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('maggie');
                    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group absolute -top-4 -left-4 w-[52%] h-[52%] bg-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform -rotate-6 block transition-transform duration-500 hover:animate-hero-maggie-jump hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] z-20 motion-reduce:hover:animate-none"
                >
                  <img
                    src="/lovable-uploads/MaggieNewNBP.png"
                    alt="Maggie the dog - Your faith adventure guide"
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <span className="text-white font-bold text-sm uppercase tracking-tighter font-body">
                      Meet Maggie
                    </span>
                  </div>
                </a>

                {/* Matteo card — smaller, supporting */}
                <Link
                  to="/matteo"
                  aria-label="Meet Matteo the Yorkie puppy"
                  onPointerDown={() => setMatteoFront(true)}
                  onPointerUp={() => setMatteoFront(false)}
                  onPointerLeave={() => setMatteoFront(false)}
                  className={`group absolute bottom-0 -right-4 w-[44%] h-[44%] bg-secondary rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform rotate-6 block transition-transform duration-500 hover:animate-hero-matteo-fetch hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] ${matteoFront ? 'z-30' : 'z-10'} motion-reduce:hover:animate-none`}
                >
                  <img
                    src="/lovable-uploads/MatteoFront.png"
                    alt="Matteo the puppy - Maggie's successor"
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="text-white font-bold text-xs uppercase tracking-tighter font-body">
                      Adventures with Matteo
                    </span>
                  </div>
                </Link>

                {/* Artie card — small, top right */}
                <Link
                  to="/artie"
                  aria-label="Meet Artie the AI robot"
                  className="group absolute top-0 right-0 w-[36%] h-[36%] bg-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform rotate-3 block transition-transform duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] z-10"
                >
                  <img
                    src={artieImg}
                    alt="Artie the AI robot"
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <span className="text-white font-bold text-[10px] uppercase tracking-tighter font-body">
                      Meet Artie
                    </span>
                  </div>
                </Link>

                {/* Riley card — small, bottom left */}
                <Link
                  to="/riley"
                  aria-label="Meet Riley the tech-curious kid"
                  className="group absolute bottom-[2%] left-0 w-[36%] h-[36%] bg-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform -rotate-3 block transition-transform duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] z-10"
                >
                  <img
                    src={rileyImg}
                    alt="Riley the tech-curious kid"
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <span className="text-white font-bold text-[10px] uppercase tracking-tighter font-body">
                      Meet Riley
                    </span>
                  </div>
                </Link>

                {/* Central glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary opacity-20 blur-[80px] gpu-layer-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Club subscription check modal */}
      <Dialog open={showReadingClubModal} onOpenChange={setShowReadingClubModal}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-white">Maggie's Reading Club</DialogTitle>
            <DialogDescription className="text-indigo-200/60 font-body">
              Let's check your account so we can get you to the right place.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {isChecking ? (
              <div className="flex items-center gap-3 text-muted-foreground font-body">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Checking your account...</span>
              </div>
            ) : !user ? (
              <p className="text-foreground font-medium font-body">
                Please sign in first. Once you're signed in we'll check whether you already have a Reading Club subscription.
              </p>
            ) : !signInConfirmed ? (
              <p className="text-foreground font-medium font-body">
                You're signed in as {user.email}. Continue with this account, or sign in with a different one.
              </p>
            ) : isActive ? (
              <p className="text-foreground font-medium font-body">
                You already have an active subscription. Enjoy the library!
              </p>
            ) : (
              <p className="text-foreground font-medium font-body">
                You don't have an active subscription yet. Join the Reading Club today.
              </p>
            )}
          </div>

          <DialogFooter>
            {isChecking ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : !user ? (
              <Button onClick={handleSignIn}>Sign In</Button>
            ) : !signInConfirmed ? (
              <>
                <Button variant="outline" onClick={handleSignIn}>Use another account</Button>
                <Button onClick={() => setSignInConfirmed(true)}>Continue</Button>
              </>
            ) : isActive ? (
              <Button onClick={handleGoToLibrary}>Go to Library</Button>
            ) : (
              <Button onClick={handleStartTrial}>Join the Reading Club</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
